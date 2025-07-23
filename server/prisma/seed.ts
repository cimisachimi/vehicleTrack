import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clean up existing vehicle data to prevent duplicates
  await prisma.vehicleTrack.deleteMany({});
  await prisma.vehicle.deleteMany({});

  // Seed new vehicle data
  await prisma.vehicle.createMany({
    data: [
      {
        name: "Truck Alpha",
        status: "ACTIVE",
        fuel_level: 80,
        odometer: 12000,
        latitude: -6.2088,
        longitude: 106.8456,
        speed: 60,
        routeIndex: 0,
        destination: "Bandung",
      },
      {
        name: "Truck Beta",
        status: "INACTIVE",
        fuel_level: 40,
        odometer: 15000,
        latitude: -7.2575,
        longitude: 112.7521,
        speed: 0,
        routeIndex: 4,
        destination: "Jakarta",
      },
      {
        name: "Van Gamma",
        status: "ACTIVE",
        fuel_level: 95,
        odometer: 8500,
        latitude: -6.9175,
        longitude: 107.6191,
        speed: 70,
        routeIndex: 1,
        destination: "Semarang",
      },
      {
        name: "Sedan Delta",
        status: "ACTIVE",
        fuel_level: 70,
        odometer: 22000,
        latitude: -6.9667,
        longitude: 110.4167,
        speed: 80,
        routeIndex: 2,
        destination: "Yogyakarta",
      },
      {
        name: "Bus Epsilon",
        status: "INACTIVE",
        fuel_level: 50,
        odometer: 31000,
        latitude: -7.7972,
        longitude: 110.3688,
        speed: 0,
        routeIndex: 3,
        destination: "Surabaya",
      },
    ],
  });
}

main()
  .then(() => console.log("Seeding completed successfully."))
  .catch((e) => console.error("Error during seeding:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });