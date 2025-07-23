import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Get all vehicles
router.get("/", async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
});

// Get vehicle by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
  res.json(vehicle);
});

// Get vehicle track by ID
router.get("/:id/track", async (req, res) => {
  const id = parseInt(req.params.id);
  const track = await prisma.vehicleTrack.findMany({
    where: { vehicleId: id },
    orderBy: { timestamp: "asc" },
  });
  if (!track) return res.status(404).json({ error: "Track not found" });
  res.json(track);
});


// Protected: Create vehicle
router.post("/", authMiddleware, async (req, res) => {
  const { name, status, fuel_level, odometer, latitude, longitude, speed } = req.body;
  const vehicle = await prisma.vehicle.create({
    data: { name, status, fuel_level, odometer, latitude, longitude, speed },
  });
  res.json(vehicle);
});

export default router;