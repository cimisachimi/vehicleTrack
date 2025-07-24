import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes = [
  [
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Bandung", lat: -6.9175, lon: 107.6191 },
    { name: "Semarang", lat: -6.9667, lon: 110.4167 },
    { name: "Yogyakarta", lat: -7.7972, lon: 110.3688 },
    { name: "Surabaya", lat: -7.2575, lon: 112.7521 }
  ]
];

const FUEL_CONSUMPTION_RATE = 0.05; // Fuel units consumed per 5-second interval when moving
const REFUEL_TIME_MINUTES = 5; // 5 minutes to refuel

// Haversine formula to calculate distance between two points on Earth
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Function to find a point between two coordinates
function interpolate(lat1: number, lon1: number, lat2: number, lon2: number, fraction: number) {
  return {
    lat: lat1 + (lat2 - lat1) * fraction,
    lon: lon1 + (lon2 - lon1) * fraction
  };
}

async function simulateMovement() {
  const vehicles = await prisma.vehicle.findMany();

  for (const vehicle of vehicles) {
    if (vehicle.status === "ACTIVE") {
      // --- Handle Fuel Consumption ---
      const newFuelLevel = vehicle.fuel_level - FUEL_CONSUMPTION_RATE;

      if (newFuelLevel <= 10) {
        // Low fuel, so we start refueling
        await prisma.vehicle.update({
          where: { id: vehicle.id },
          data: {
            status: "REFUELING",
            fuel_level: newFuelLevel,
            speed: 0, // Stop the vehicle
            refuelStartTime: new Date(), // Log when refueling starts
            updated_at: new Date()
          }
        });
        console.log(`Vehicle ${vehicle.name} has low fuel and is now refueling.`);
        continue; // Skip to the next vehicle
      }

      // --- Handle Movement ---
      const route = routes[0];
      let currentIndex = vehicle.routeIndex;
      let nextIndex = (currentIndex + 1) % route.length;

      const start = route[currentIndex];
      const end = route[nextIndex];

      const totalDistance = haversine(start.lat, start.lon, end.lat, end.lon);
      const speed = vehicle.speed || 60; // km/h
      const step = (speed / 3600) * 5; // Distance traveled in 5 seconds

      let traveled = vehicle.traveled + step;
      let newDestination = end.name;

      if (traveled >= totalDistance) {
        traveled = 0;
        currentIndex = nextIndex;
        nextIndex = (currentIndex + 1) % route.length;
        newDestination = route[nextIndex].name;
      }

      const fraction = totalDistance > 0 ? traveled / totalDistance : 0;
      const { lat, lon } = interpolate(start.lat, start.lon, end.lat, end.lon, fraction);

      // Update vehicle in the database
      await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: {
          latitude: lat,
          longitude: lon,
          traveled: traveled,
          routeIndex: currentIndex,
          destination: newDestination,
          fuel_level: newFuelLevel,
          odometer: vehicle.odometer + step, // Update the odometer with the precise step value
          updated_at: new Date()
        }
      });

      // Log the movement history
      await prisma.vehicleTrack.create({
        data: { vehicleId: vehicle.id, latitude: lat, longitude: lon }
      });

      console.log(`Vehicle ${vehicle.name}: now at [${lat.toFixed(4)}, ${lon.toFixed(4)}] heading to ${newDestination}. Fuel: ${newFuelLevel.toFixed(2)}%`);

    } else if (vehicle.status === "REFUELING") {
      // --- Handle Refueling Logic ---
      if (vehicle.refuelStartTime) {
        const timeSinceRefuelStart = new Date().getTime() - vehicle.refuelStartTime.getTime();
        const minutesPassed = timeSinceRefuelStart / (1000 * 60);

        if (minutesPassed >= REFUEL_TIME_MINUTES) {
          // Refueling finished
          await prisma.vehicle.update({
            where: { id: vehicle.id },
            data: {
              status: "ACTIVE",
              fuel_level: 100, // Full tank!
              refuelStartTime: null, // Clear the start time
              updated_at: new Date()
            }
          });
          console.log(`Vehicle ${vehicle.name} has finished refueling and is now active.`);
        } else {
          console.log(`Vehicle ${vehicle.name} is still refueling...`);
        }
      }
    }
  }
}

export function startSimulation() {
  console.log("Vehicle route simulation started (5-second interval).");
  setInterval(simulateMovement, 5000); // every 5 sec
}