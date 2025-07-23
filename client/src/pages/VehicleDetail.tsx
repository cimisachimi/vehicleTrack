import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

export default function VehicleDetail() {
  const { id } = useParams();
  const { selectedVehicle, fetchVehicleById } = useVehicleStore();

  useEffect(() => {
    if (id) fetchVehicleById(Number(id));
  }, [id, fetchVehicleById]);

  if (!selectedVehicle) return <p>Loading...</p>;

  const { name, status, fuel_level, speed, odometer, latitude, longitude, updated_at } =
    selectedVehicle;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <p className="text-sm text-gray-500">{status}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Fuel Level:</strong> {fuel_level}%</p>
            <p><strong>Speed:</strong> {speed} km/h</p>
            <p><strong>Odometer:</strong> {odometer} km</p>
            <p><strong>Location:</strong> {latitude}, {longitude}</p>
            <p className="text-xs text-gray-400">Updated at: {new Date(updated_at).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
