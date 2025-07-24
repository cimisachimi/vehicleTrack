Vehicle Tracker

A full-stack application for real-time vehicle tracking and fleet management. It features a live map, detailed vehicle status, route history, and a backend simulation for vehicle movement.

Live Demo

A live version of the frontend is deployed on Vercel and is available here:

https://vehicle-track-sooty.vercel.app/

The backend API is running on a server and exposed via ngrok:

    API Base URL: https://b119961ccb31.ngrok-free.app

    Note: This application uses a free ngrok tunnel for the demo, which may have uptime limitations. If the demo is unresponsive, the tunnel may be temporarily down.

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

📜 Available Scripts

Server (/server)

    pnpm dev: Starts the backend server in development mode with hot-reloading.

    pnpm build: Compiles the TypeScript code into JavaScript for production.

    pnpm start: Starts the compiled application for production.

    pnpm seed: Populates the database with initial vehicle data.

Client (/client)

    pnpm dev: Starts the Vite development server for the frontend.

    pnpm build: Builds the React app for production.

    pnpm preview: Serves the production build locally for testing.

☁️ Deployment

This application is configured for deployment on various platforms. The live demo uses the following setup:

    Frontend: The /client directory is deployed as a static site on Vercel.

    Backend: The /server directory is running on a remote server.

    Database: A managed PostgreSQL instance from Aiven.

For your own deployment, a similar setup is recommended.

📄 License

This project is licensed under the [MIT License](LICENSE).
