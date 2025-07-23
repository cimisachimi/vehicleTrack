import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
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
} from "@/components/ui/card";

export default function VehicleList() {
  const { vehicles, fetchVehicles, loading } = useVehicleStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000); // Match simulation interval
    return () => clearInterval(interval);
  }, [fetchVehicles]);

  const defaultCenter: [number, number] = [-6.2, 106.816666]; // Jakarta

  const greenIcon = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block">
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
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {vehicles.map((v) => (
                  <Card key={v.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-base">{v.name}</CardTitle>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/vehicle/${v.id}`)}
                      >
                        Details
                      </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <p className="font-semibold">Status</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            v.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {v.status}
                        </span>
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
                        <p className="font-semibold">Destination</p>
                        <p>{v.destination}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Map Simulation */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">
            Fleet Map (Updated Every 5 Second )
          </h2>
          <MapContainer
            center={defaultCenter}
            zoom={6}
            className="h-96 w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {vehicles.map((v) => (
              <Marker
                key={v.id}
                position={[v.latitude, v.longitude]}
                icon={v.status === "ACTIVE" ? greenIcon : redIcon}
              >
                <Popup>
                  <strong>{v.name}</strong>
                  <br />
                  Status: {v.status}
                  <br />
                  Speed: {v.speed} km/h
                  <br />
                  Destination: {v.destination}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}