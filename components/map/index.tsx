import { LatLngExpression } from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "../../helpers/util";

function MapComponent({
  center,
  zoom,
  countries,
  caseType,
}: {
  center: LatLngExpression | undefined;
  zoom: number;
  countries: any;
  caseType: string;
}) {
  return (
    <div
      id="map"
      className="w-full h-[500px] bg-[whitesmoke] p-1 rounded-lg shadow-lg "
    >
      <MapContainer center={center} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, caseType)}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
