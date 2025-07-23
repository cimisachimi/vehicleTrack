import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VehicleDetail() {
  const { id } = useParams();
  const { selectedVehicle, vehicleTrack, fetchVehicleById, fetchVehicleTrackById } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleById(Number(id));
      fetchVehicleTrackById(Number(id));
    }
  }, [id, fetchVehicleById, fetchVehicleTrackById]);

  if (!selectedVehicle) {
    return <p>Loading...</p>;
  }

  const { name, status, fuel_level, speed, odometer, latitude, longitude, updated_at } = selectedVehicle;
  const trackPositions: [number, number][] = vehicleTrack.map(p => [p.latitude, p.longitude]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <p className="text-sm text-gray-500">{status}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Fuel Level:</strong> {fuel_level}%</p>
              <p><strong>Speed:</strong> {speed} km/h</p>
              <p><strong>Odometer:</strong> {odometer} km</p>
              <p><strong>Current Location:</strong> {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
              <p className="text-xs text-gray-400">Updated at: {new Date(updated_at).toLocaleString()}</p>
            </CardContent>
          </Card>
          
          {/* Route History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Route History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Latitude</TableHead>
                    <TableHead>Longitude</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleTrack.map((track) => (
                    <TableRow key={track.id}>
                      <TableCell>{new Date(track.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{track.latitude.toFixed(4)}</TableCell>
                      <TableCell>{track.longitude.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-md">
          <MapContainer center={[latitude, longitude]} zoom={10} className="h-full w-full rounded-lg min-h-[400px]">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>Current location of {name}</Popup>
            </Marker>
            {trackPositions.length > 0 && <Polyline positions={trackPositions} color="blue" />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}