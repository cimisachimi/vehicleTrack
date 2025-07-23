import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getRandomOffset() {
  // Simulate a more noticeable movement for a 1-minute interval
  return (Math.random() - 0.5) * 0.05;
}

async function simulateMovement() {
  const vehicles = await prisma.vehicle.findMany();

  for (const vehicle of vehicles) {
    // Only simulate movement for ACTIVE vehicles
    if (vehicle.status === "ACTIVE") {
      const oldLatitude = vehicle.latitude;
      const oldLongitude = vehicle.longitude;
      const newLatitude = vehicle.latitude + getRandomOffset();
      const newLongitude = vehicle.longitude + getRandomOffset();

      console.log(
        `Updating ${vehicle.name}: [${oldLatitude.toFixed(4)}, ${oldLongitude.toFixed(4)}] -> [${newLatitude.toFixed(4)}, ${newLongitude.toFixed(4)}]`
      );

      await prisma.vehicle.update({
        where: { id: vehicle.id },
        data: {
          latitude: newLatitude,
          longitude: newLongitude,
          // You could also update speed here if you want it to be dynamic
        },
      });

      await prisma.vehicleTrack.create({
        data: {
          vehicleId: vehicle.id,
          latitude: newLatitude,
          longitude: newLongitude,
        },
      });
    } else {
      // If INACTIVE, ensure speed is 0
      if (vehicle.speed !== 0) {
        await prisma.vehicle.update({
          where: { id: vehicle.id },
          data: {
            speed: 0,
          },
        });
        console.log(`Set speed of inactive vehicle ${vehicle.name} to 0.`);
      }
    }
  }
}

export function startSimulation() {
  console.log("Vehicle movement simulation started (1-minute interval).");
  setInterval(simulateMovement, 5000); // 1 minute
}