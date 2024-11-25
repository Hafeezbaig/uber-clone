import { CarListData } from '@/utils/CarListData';
import React, { useState } from 'react';
import CarListItem from './CarListItem';

function CarListOptions({distance}) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
<div className="mt-1 p-3 overflow-auto h-[350px]">
  <h2 className="text-[22px] font-bold">Choose a ride</h2>
  {CarListData.map((item, index) => (
    <div
      key={item.id}
      className={`cursor-pointer p-1 pt-1 rounded-md border-black ${
        activeIndex === index ? 'border-[3px]' : ''
      }`}
      onClick={() => setActiveIndex(index)}
    >
      <CarListItem car={item} distance={distance} />
    </div>
  ))}

</div>


  );
}

export default CarListOptions;
