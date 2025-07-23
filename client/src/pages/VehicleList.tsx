import { useEffect } from "react";
import { useVehicleStore } from "../store/useVehicleStore";
import { Link } from "react-router-dom";

export default function VehicleList() {
  const { vehicles, fetchVehicles, loading } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {vehicles.map((v) => (
        <div key={v.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{v.name}</h2>
          <p>Status: {v.status}</p>
          <Link
            to={`/vehicle/${v.id}`}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-1 rounded"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
