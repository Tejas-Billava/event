import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.076, // Example: Latitude of Mumbai
  lng: 72.8777, // Example: Longitude of Mumbai
};

function VenueMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAyMYYVaYZgrvgMZwouWbGU4CaR5MrN4Ag">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default VenueMap;
