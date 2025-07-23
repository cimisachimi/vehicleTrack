import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehicleStore } from "../store/useVehicleStore";

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const { selectedVehicle, fetchVehicleById, loading } = useVehicleStore();

  useEffect(() => {
    if (id) fetchVehicleById(Number(id));
  }, [id, fetchVehicleById]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!selectedVehicle) return <p>No vehicle found</p>;

  const v = selectedVehicle;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{v.name}</h1>
      <p>Status: {v.status}</p>
      <p>Fuel Level: {v.fuel_level}%</p>
      <p>Odometer: {v.odometer} km</p>
      <p>Speed: {v.speed} km/h</p>
      <p>
        Location: {v.latitude}, {v.longitude}
      </p>
      <p>Last Updated: {new Date(v.updated_at).toLocaleString()}</p>
    </div>
  );
}
