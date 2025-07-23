import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function VehicleList() {
  const { vehicles, fetchVehicles, loading } = useVehicleStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles(); // Fetch initial data
    const interval = setInterval(fetchVehicles, 4000); // Poll every 1 minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fetchVehicles]);

  const defaultCenter: [number, number] = [-6.2, 106.816666]; // Jakarta

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Vehicle List */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
          {loading && vehicles.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-100">
                    <td className="p-2">{v.name}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          v.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/vehicle/${v.id}`)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Map Simulation */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Map Simulation</h2>
          <MapContainer center={defaultCenter} zoom={6} className="h-96 w-full rounded-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {vehicles.map((v) => (
              <Marker key={v.id} position={[v.latitude, v.longitude]}>
                <Popup>
                  <strong>{v.name}</strong>
                  <br />
                  Status: {v.status}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}