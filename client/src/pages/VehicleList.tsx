import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VehicleList() {
  const { vehicles, fetchVehicles, loading } = useVehicleStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000); // Match simulation interval
    return () => clearInterval(interval);
  }, [fetchVehicles]);

  const defaultCenter: [number, number] = [-6.2, 106.816666]; // Jakarta

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle List */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Live Vehicle Status</h2>
          {loading && vehicles.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Speed</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          v.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {v.status}
                      </span>
                    </TableCell>
                    <TableCell>{v.speed} km/h</TableCell>
                    <TableCell>{v.fuel_level}%</TableCell>
                    <TableCell>{v.destination}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/vehicle/${v.id}`)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Map Simulation */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Fleet Map (Updated Every 5 Second )</h2>
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
                  <br />
                  Speed: {v.speed} km/h
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}