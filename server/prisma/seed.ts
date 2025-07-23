import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      {
        name: "Truck Alpha",
        status: "ACTIVE",
        fuel_level: 80,
        odometer: 12000,
        latitude: -6.200000,
        longitude: 106.816666,
        speed: 45,
      },
      {
        name: "Truck Beta",
        status: "INACTIVE",
        fuel_level: 40,
        odometer: 15000,
        latitude: -7.250445,
        longitude: 112.768845,
        speed: 0,
      },
    ],
  });
}

main()
  .then(() => console.log("Seeded successfully"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
