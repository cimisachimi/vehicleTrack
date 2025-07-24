# Vehicle Tracker

A full-stack application for real-time vehicle tracking and fleet management. It provides live map visualization, detailed vehicle status, route history, and a backend simulation for vehicle movement, fuel consumption, and refueling.

---

### **Live Demo**

- **Frontend (Vercel):** [https://vehicle-track-sooty.vercel.app](https://vehicle-track-sooty.vercel.app)
- **Backend API:** `https://cimisachimi.online`

**Example Endpoints:**

- `GET https://cimisachimi.online/vehicles` → Fetch all vehicles
- `POST https://cimisachimi.online/auth/register` → Register a new user
- `POST https://cimisachimi.online/auth/login` → Log in a user

---

### 🖼️ **Screenshots**

**Dashboard View**
_Live map with permanent vehicle name labels and status-colored markers._
![Dashboard View](https://i.imgur.com/your_new_dashboard_image.png)

**Vehicle List View**
_Detailed table with responsive scrolling and fuel progress bars._
![Vehicle List View](https://i.imgur.com/your_vehicle_list_image.png)

---

### **Features**

- **User Authentication:** Secure user registration and login system using JWT and bcrypt.
- **Automatic Login:** Users are automatically logged in after a successful registration.
- **Real-Time Map View:** Track all vehicles simultaneously on an interactive map with status-colored map pins (🟢 for active, 🔴 for inactive, 🟡 for refueling).
- **Live Status Updates:** Data is refreshed every 5 seconds to provide the latest information on vehicle status, speed, fuel level, and destination.
- **Detailed Vehicle Pages:** View comprehensive information for each vehicle, including key metrics, a fuel progress bar, and a map showing its historical route.
- **Responsive Design:** A mobile-friendly interface ensures a seamless experience on all devices, with a scrollable table for medium screens.
- **Backend Data Simulation:** A realistic vehicle movement simulation runs on the server to generate live tracking data, including fuel consumption, odometer updates, and a 5-minute refueling cycle when fuel is low.

---

### **Tech Stack**

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn/UI, Zustand, React Leaflet
- **Backend:** Node.js, Express 4, TypeScript
- **Database:** PostgreSQL with Prisma ORM

**Deployment:**

- **Frontend:** Vercel
- **Backend:** VPS with Nginx as a reverse proxy and SSL
- **Database:** PostgreSQL hosted on Aiven

---

### **Getting Started**

**Prerequisites**

- Node.js (LTS recommended)
- pnpm (`npm install -g pnpm`)
- A running PostgreSQL database instance

#### **1️⃣ Backend Setup**

```bash
# Navigate to the server directory
cd server

# Install dependencies
pnpm install

# Create an environment file
cp .env.example .env

Update the newly created .env file with your database connection string and a JWT secret:

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

2️⃣ Frontend Setup

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

Backend (/server)

    pnpm dev: Starts the backend server in development mode with hot-reloading.

    pnpm build: Compiles the TypeScript code into JavaScript for production.

    pnpm start: Starts the compiled application for production.

    pnpm seed: Populates the database with initial vehicle data.

Frontend (/client)

    pnpm dev: Starts the Vite development server for the frontend.

    pnpm build: Builds the React app for production.

    pnpm preview: Serves the production build locally for testing.

📄 License

This project is licensed under the MIT License.
```
