import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVehicleStore } from "@/store/useVehicleStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Progress } from "@/components/ui/progress"; // Import the new Progress component
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import { Gauge, Zap, Route, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// This component will handle re-centering the map
function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function VehicleDetail() {
  const { id } = useParams();
  const {
    selectedVehicle,
    vehicleTrack,
    fetchVehicleById,
    fetchVehicleTrackById,
  } = useVehicleStore();

  useEffect(() => {
    if (id) {
      const vehicleId = Number(id);
      fetchVehicleById(vehicleId);
      fetchVehicleTrackById(vehicleId);
      const interval = setInterval(() => {
        fetchVehicleById(vehicleId);
        fetchVehicleTrackById(vehicleId);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, fetchVehicleById, fetchVehicleTrackById]);

  if (!selectedVehicle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading vehicle data...</p>
      </div>
    );
  }

  const {
    name,
    status,
    fuel_level,
    speed,
    odometer,
    latitude,
    longitude,
    updated_at,
    destination,
    traveled,
  } = selectedVehicle;

  const trackPositions: [number, number][] = vehicleTrack.map((p) => [
    p.latitude,
    p.longitude,
  ]);
  const currentPosition: [number, number] = [latitude, longitude];

  const createIcon = (iconUrl: string) =>
    new Icon({
      iconUrl,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  const greenIcon = createIcon(
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
  );
  const redIcon = createIcon(
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
  );
  const yellowIcon = createIcon(
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png"
  );

  const getStatusInfo = () => {
    switch (status) {
      case "ACTIVE":
        return {
          text: `Active - Heading to ${destination}`,
          color: "text-green-600",
          icon: greenIcon,
        };
      case "REFUELING":
        return {
          text: "Refueling",
          color: "text-yellow-600",
          icon: yellowIcon,
        };
      default:
        return {
          text: "Inactive",
          color: "text-red-600",
          icon: redIcon,
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className={`font-semibold ${statusInfo.color}`}>
            {statusInfo.text}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(updated_at).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fuel Level</CardTitle>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={fuel_level} className="h-3 flex-1" />
                <span className="text-lg font-bold">
                  {fuel_level.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Speed</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {status === "REFUELING" ? 0 : speed} km/h
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Odometer</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{odometer.toFixed(1)} km</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Route Progress
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{traveled.toFixed(2)} km</div>
              <p className="text-xs text-muted-foreground">
                traveled towards {destination}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-[500px]">
            <MapContainer
              center={currentPosition}
              zoom={10}
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
              <MapUpdater center={currentPosition} zoom={10} />
              <Marker position={currentPosition} icon={statusInfo.icon}>
                <Popup>
                  <strong>{name}</strong>
                  <br />
                  Status: {status}
                  <br />
                  Speed: {status === "REFUELING" ? 0 : speed} km/h
                  <br />
                  Destination: {destination}
                </Popup>
              </Marker>
              {trackPositions.length > 0 && (
                <Polyline positions={trackPositions} color="#3b82f6" />
              )}
            </MapContainer>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Route History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicleTrack
                      .slice()
                      .reverse()
                      .map((track) => (
                        <TableRow key={track.id}>
                          <TableCell>
                            {new Date(track.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>
                            {track.latitude.toFixed(4)},{" "}
                            {track.longitude.toFixed(4)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}