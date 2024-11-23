"use client"; // Ensures the file is treated as a client component

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

// Dynamically import GooglePlacesAutocomplete to avoid SSR
const GooglePlacesAutocomplete = dynamic(() =>
  import("react-google-places-autocomplete"), { ssr: false }
);

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    setPlaceholder(type === "source" ? "Pickup Location" : "Dropoff Location");
  }, [type]);

  const getLatAndLng = (place, type) => {
    if (!place || !place.value) {
      // Handle case where place is null
      console.warn("No place selected or invalid place object.");
      if (type === "source") {
        setSource(null);
      } else {
        setDestination(null);
      }
      return; // Exit if place is invalid
    }

    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails({ placeId }, (details, status) => {
      if (status === "OK" && details.geometry && details.geometry.location) {
        const location = {
          lat: details.geometry.location.lat(),
          lng: details.geometry.location.lng(),
          name: details.formatted_address,
          label: details.name,
        };

        if (type === "source") {
          setSource(location);
        } else {
          setDestination(location);
        }

        console.log("Location details:", location);
      } else {
        console.error("Failed to retrieve place details:", status);
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      {/* Conditional Image Source */}
      <Image
        src={
          type === "source"
            ? "https://utfs.io/f/WrQ6kuKulYjkyoiXZyh8helHDSZTKXcq5iWOv3C8zbE2LrV4"
            : "https://utfs.io/f/WrQ6kuKulYjkyoiXZyh8helHDSZTKXcq5iWOv3C8zbE2LrV4"
        }
        width={15}
        height={15}
        alt="icon"
      />

      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
        selectProps={{
          value: value,
          onChange: (place) => {
            setValue(place);
            getLatAndLng(place, type);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
}

export default InputItem;
