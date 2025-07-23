import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (error) {
    console.error("Failed to get vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    console.error(`Failed to get vehicle ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get vehicle track by ID
router.get("/:id/track", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const track = await prisma.vehicleTrack.findMany({
      where: { vehicleId: id },
      orderBy: { timestamp: "asc" },
    });
    // It's okay for a track to be empty, so we don't need a 404 here.
    res.json(track);
  } catch (error) {
    console.error(`Failed to get track for vehicle ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected: Create vehicle
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, status, fuel_level, odometer, latitude, longitude, speed } =
      req.body;
    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        status,
        fuel_level,
        odometer,
        latitude,
        longitude,
        speed,
      },
    });
    res.json(vehicle);
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;