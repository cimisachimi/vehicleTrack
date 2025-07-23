import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import VehicleDetail from "./pages/VehicleDetail";
import { ProtectedRoute } from "./components/ProtectedRoute";
import  VehiclePage  from './pages/VehiclePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Set Vehicle List as the main page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle"
          element={
            <ProtectedRoute>
              <VehiclePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicle/:id"
          element={
            <ProtectedRoute>
              <VehicleDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;