"use client";

import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GooglemapSection() {
  const [windowWidth, setWindowWidth] = useState(0);

  // Get window width after component mounts
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const containerStyle = {
    width: "100%",
    height: windowWidth * 0.45, // Dynamic height based on window width
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

  // Watch for changes to source and destination
  useEffect(() => {
    if (source && source.lat && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    if (source && destination && source.lat && destination.lat) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination && destination.lat && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if (source && destination && source.lat && destination.lat) {
      directionRoute();
    }
  }, [destination]);

  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result); // Pass the full result object
        } else {
          console.error("Directions request failed due to ", status);
        }
      }
    );
  };

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded && windowWidth ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "16da4d4aaafcde55" }}
    >
      {/* Source Marker */}
      {source && source.lat ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "https://utfs.io/f/WrQ6kuKulYjkKUiP5qwmMyZoKIUAq1hjw7ukVNrSxJv695e3",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {/* Destination Marker */}
      {destination && destination.lat ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "https://utfs.io/f/WrQ6kuKulYjktTcAc7vs7RmGvBKpE219a0rOlIgycoNkiudL",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[18px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {/* Directions Renderer */}
      {directionRoutePoints ? (
        <DirectionsRenderer
          directions={directionRoutePoints} // Pass the full result object
          options={{
            polylineOptions:{
                strokeColor:'#000',
                strokeWeight:5
            },
            suppressMarkers:true
          }}
        />
      ) : null}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

export default GooglemapSection;
