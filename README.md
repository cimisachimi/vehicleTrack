Vehicle Tracker

A full-stack application for real-time vehicle tracking and fleet management. It features a live map, detailed vehicle status, route history, and a backend simulation for vehicle movement.

Features

    User Authentication: Secure user registration and login system using JWT and bcrypt.

    Real-Time Map View: Track all vehicles simultaneously on an interactive map, with status-colored map pins (green for active, red for inactive).

    Live Status Updates: Data is refreshed every 5 seconds to provide the latest information on vehicle status, speed, fuel level, and destination.

    Detailed Vehicle Pages: View comprehensive information for each vehicle, including key metrics and a map showing its historical route.

    Responsive Design: A mobile-friendly interface ensures a seamless experience on all devices, from desktops to smartphones.

    Backend Data Simulation: A realistic vehicle movement simulation runs on the server to generate live tracking data.

Tech Stack

    Frontend: React, Vite, TypeScript, Tailwind CSS, Shadcn/UI, Zustand, React Leaflet.

    Backend: Node.js, Express, TypeScript.

    Database: PostgreSQL with Prisma ORM.

Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites

    Node.js (LTS version recommended)

    pnpm (npm install -g pnpm)

    A running PostgreSQL database instance

1. Backend Setup

Bash

# Navigate to the server directory

cd server

# Install dependencies

pnpm install

# Create an environment file

cp .env.example .env

Now, open the newly created .env file and add your database connection string and a JWT secret:

.env

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_super_long_and_random_jwt_secret"

Finally, set up the database and start the server:
Bash

# Apply database migrations

npx prisma migrate dev

# Seed the database with sample data

pnpm run seed

# Start the development server

pnpm run dev

The backend server will be running on http://localhost:5000.

2. Frontend Setup

Open a new terminal and navigate to the client directory:
Bash

# Navigate to the client directory

cd client

# Install dependencies

pnpm install

# Start the development server

pnpm run dev

The frontend will be running on http://localhost:5173 and will be configured to communicate with your local backend.

Available Scripts

Server (/server)

    pnpm dev: Starts the backend server in development mode with hot-reloading.

    pnpm build: Compiles the TypeScript code into JavaScript for production.

    pnpm start: Starts the compiled application for production.

    pnpm seed: Populates the database with initial vehicle data.

Client (/client)

    pnpm dev: Starts the Vite development server for the frontend.

    pnpm build: Builds the React app for production.

    pnpm preview: Serves the production build locally for testing.

Deployment

This application is configured for deployment on various platforms. A recommended setup is:

    Frontend: Deploy the /client directory as a static site on Vercel.

    Backend: Deploy the /server directory as a web service on a VPS or PaaS like Render.

    Database: Use a managed PostgreSQL provider like Aiven or Neon.

Detailed step-by-step deployment guides have been provided in the chat.

License

This project is unlicensed. Please add a LICENSE file if you wish to license it.
