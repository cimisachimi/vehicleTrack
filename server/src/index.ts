import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import the 'path' module
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import vehicleRoutes from "./routes/vehicle";
import { startSimulation } from "./simulation";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Add all domains your frontend will be on
const allowedOrigins = [
  'http://localhost:5173',
  'https://vehicle-track-sooty.vercel.app',
  'https://cimisachimi.online' // Add your custom domain
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

// --- Middleware ---
app.use(cors(corsOptions));
app.use(express.json());

// --- API Routes ---
app.use("/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);

// --- Serve Frontend ---
// This serves the built React app's static files (like CSS, JS, images)
app.use(express.static(path.join(__dirname, '../../client/dist')));

// This "catch-all" route sends the `index.html` file for any non-API request.
// This is the key to fixing the refresh error.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

startSimulation();