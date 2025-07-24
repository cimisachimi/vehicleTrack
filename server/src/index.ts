import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicle";
import { startSimulation } from "./simulation";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  'http://localhost:5173',
  'https://vehicle-track-sooty.vercel.app'
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

startSimulation();