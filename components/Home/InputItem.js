"use client"; // Ensures the file is treated as a client component

import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import GooglePlacesAutocomplete to avoid SSR
const GooglePlacesAutocomplete = dynamic(() =>
  import("react-google-places-autocomplete"), { ssr: false }
);

function InputItem({ type }) {
  const [value, setValue] = useState(null);

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
          onChange: setValue,
        }}
      />
    </div>
  );
}

export default InputItem;




{/* <input type="text" placeholder={type=='source'?"Pickup Location":'Drop Off Location'} className="bg-transparent w-full outline-none" /> */}
