import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function VehiclePage() {
  const { vehicles, fetchVehicles, loading } = useVehicleStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Vehicle Information</h1>
        {loading && vehicles.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fuel Level</TableHead>
                    <TableHead>Odometer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Speed</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>{v.id}</TableCell>
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
                      <TableCell>{v.fuel_level}%</TableCell>
                      <TableCell>{v.odometer} km</TableCell>
                      <TableCell>
                        {v.latitude.toFixed(4)}, {v.longitude.toFixed(4)}
                      </TableCell>
                      <TableCell>{v.speed} km/h</TableCell>
                      <TableCell>{v.destination}</TableCell>
                      <TableCell>
                        {new Date(v.updated_at).toLocaleString()}
                      </TableCell>
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
            </div>

            {/* Mobile View: Cards */}
            <div className="md:hidden space-y-4">
              {vehicles.map((v) => (
                <Card key={v.id}>
                  <CardHeader>
                    <CardTitle>#{v.id} - {v.name}</CardTitle>
                    <CardDescription>
                      Last updated: {new Date(v.updated_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Status</p>
                      <p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            v.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {v.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Speed</p>
                      <p>{v.speed} km/h</p>
                    </div>
                    <div>
                      <p className="font-semibold">Fuel</p>
                      <p>{v.fuel_level}%</p>
                    </div>
                    <div>
                      <p className="font-semibold">Odometer</p>
                      <p>{v.odometer} km</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Destination</p>
                      <p>{v.destination}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold">Location</p>
                      <p>
                        {v.latitude.toFixed(4)}, {v.longitude.toFixed(4)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => navigate(`/vehicle/${v.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}