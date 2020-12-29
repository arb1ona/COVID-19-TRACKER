import React from "react";
import "./Map.css";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";

function Map({ countries, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop throuugh and draw circles on the screen-bigger or smaller */}
      </LeafletMap>
    </div>
  );
}

export default Map;
