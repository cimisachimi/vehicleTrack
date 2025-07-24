Vehicle Tracker

A full-stack application for real-time vehicle tracking and fleet management. It provides live map visualization, detailed vehicle status, route history, and a backend simulation for vehicle movement, fuel consumption, and refueling.
Live Demo
Frontend (Vercel): https://vehicle-track-sooty.vercel.app

    Backend API: https://cimisachimi.online

Example Endpoints

    GET /vehicles → Fetch all vehicles

    POST /auth/register → Register a new user

    POST /auth/login → Log in a user

Screenshots

Dashboard View
Live map with permanent vehicle name labels and status-colored markers.
Dashboard View

Vehicle List View
Detailed table with responsive scrolling and fuel progress bars.
Vehicle List View
Features

    User Authentication – Secure registration and login using JWT and bcrypt.

    Automatic Login – Users are logged in immediately after registration.

    Real-Time Map View – Track all vehicles on an interactive map with color-coded markers:

        Green for Active

        Red for Inactive

        Yellow for Refueling

    Live Status Updates – Data refreshes every 5 seconds for the latest information.

    Detailed Vehicle Pages – Includes metrics, fuel progress bar, and historical routes.

    Responsive Design – Mobile-friendly layout with scrollable tables for medium screens.

    Backend Simulation – Simulates vehicle movement, fuel consumption, odometer updates, and a 5-minute refueling cycle.

Tech Stack

Frontend

    React, Vite, TypeScript

    Tailwind CSS, Shadcn/UI, Zustand

    React Leaflet for maps

Backend

    Node.js, Express (v4), TypeScript

    Prisma ORM, PostgreSQL

Deployment

    Frontend: Vercel

    Backend: VPS with Nginx reverse proxy and SSL

    Database: PostgreSQL on Aiven

Getting Started
Prerequisites

    Node.js (LTS recommended)

    pnpm (npm install -g pnpm)

    A running PostgreSQL database instance

1. Backend Setup

# Navigate to the server directory

cd server

# Install dependencies

pnpm install

# Create environment file

cp .env.example .env

Update .env with your database and JWT secret:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_super_long_and_random_jwt_secret"

Apply migrations, seed the database, and start the server:

# Apply Prisma migrations

npx prisma migrate dev

# Seed initial data

pnpm run seed

# Start development server

pnpm run dev

The backend runs at: http://localhost:5000 2. Frontend Setup

# Open a new terminal and navigate to the client directory

cd client

# Install dependencies

pnpm install

# Start development server

pnpm run dev

The frontend runs at: http://localhost:5173
Available Scripts
Backend (/server)

    pnpm dev – Start backend in development mode with hot reload

    pnpm build – Compile TypeScript to JavaScript

    pnpm start – Start compiled production build

    pnpm seed – Seed database with sample vehicle data

Frontend (/client)

    pnpm dev – Start Vite development server

    pnpm build – Build production-ready React app

    pnpm preview – Preview production build locally

License

This project is licensed under the MIT License.
