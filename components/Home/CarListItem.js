import Image from 'next/image'
import React from 'react'
import { HiUser } from "react-icons/hi2";

function CarListItem({car, distance}) {
  return (
<div>
  <div className="flex items-center justify-between mt-3">
    <div className="flex items-center gap-3">
      {/* Adjust Image size and alignment */}
      <Image
        src={car.image}
        width={80} // Reduced width
        height={80} // Reduced height
        alt={car.name}
        className="flex-shrink-0" // Prevent image resizing issues
      />
      <div className="ml-0">
        {/* Name with Seats */}
        <h2 className="font-bold text-[16px] flex gap-2 items-center pb-1">
          {car.name}
          <span className="flex gap-1 font-normal items-center text-[14px] text-gray-600">
            <HiUser />
            {car.seat}
          </span>
        </h2>
        {/* Description */}
        <p className="text-[14px] text-gray-500">{car.desc}</p>
      </div>
    </div>
    {/* Amount */}
    <h2 className="text-[16px] font-bold pr-4">₹{(car.amount * distance).toFixed(2)}</h2>
  </div>
</div>

  )
}

export default CarListItem