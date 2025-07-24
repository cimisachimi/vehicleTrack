Vehicle Tracker

A full-stack application for real-time vehicle tracking and fleet management. It provides live map visualization, detailed vehicle status, route history, and a backend simulation for vehicle movement.
Live Demo

Frontend (Vercel): vehicle-track-sooty.vercel.app

Backend API: https://cimisachimi.online

Example Endpoints:

    GET https://cimisachimi.online/vehicles → Fetch all vehicles

    POST https://cimisachimi.online/auth/register → Register user

    POST https://cimisachimi.online/auth/login → User login

    
🖼 Screenshots
Dashboard View
<img width="889" height="928" alt="image" src="https://github.com/user-attachments/assets/736c0045-7181-4ac9-b8d2-e81f861951c4" />
Vehicle Details
<img width="890" height="759" alt="image" src="https://github.com/user-attachments/assets/dda4024c-208a-4f58-a1a4-e1b08fd11b0d" />

Features

    User Authentication: Secure registration and login with JWT & bcrypt.

    Real-Time Map View: Track vehicles on an interactive map with status indicators (green = active, red = inactive).

    Live Status Updates: Refresh every 5 seconds for up-to-date speed, fuel level, and destination info.

    Vehicle Details Page: Includes route history and key stats.

    Responsive Design: Mobile-first design for seamless experience.

    Backend Simulation: Simulates realistic vehicle movement in real time.

Tech Stack

    Frontend: React, Vite, TypeScript, Tailwind CSS, Shadcn/UI, Zustand, React Leaflet

    Backend: Node.js, Express, TypeScript

    Database: PostgreSQL with Prisma ORM

    Deployment:

        Frontend → Vercel

        Backend → VPS with Nginx + SSL

        Database → PostgreSQL

Getting Started
Prerequisites

    Node.js (LTS recommended)

    pnpm (npm install -g pnpm)

    PostgreSQL instance running

1️⃣ Backend Setup

# Navigate to backend directory
cd server

# Install dependencies
pnpm install

# Copy env file
cp .env.example .env

Update .env:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_super_secure_jwt_secret"

Run migrations and seed data:

npx prisma migrate dev
pnpm run seed

Start the backend:

pnpm run dev

Runs on: http://localhost:5000
2️⃣ Frontend Setup

# Navigate to frontend
cd client

# Install dependencies
pnpm install

# Start dev server
pnpm run dev

Runs on: http://localhost:5173
API Base URL

    Production: https://cimisachimi.online

    Local: http://localhost:5000

Available Scripts

Backend (/server):

    pnpm dev → Run development server

    pnpm build → Compile TypeScript

    pnpm start → Start production build

    pnpm seed → Seed database

Frontend (/client):

    pnpm dev → Start Vite dev server

    pnpm build → Build for production

    pnpm preview → Preview production build

Deployment

    Frontend → Vercel

    Backend → VPS with Nginx + SSL

    Domain → Managed via Cloudflare

📄 License

This project is licensed under the MIT License.
