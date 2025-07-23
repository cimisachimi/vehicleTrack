-- CreateTable
CREATE TABLE "VehicleTrack" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleTrack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehicleTrack" ADD CONSTRAINT "VehicleTrack_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
