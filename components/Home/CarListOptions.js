import { CarListData } from '@/utils/CarListData';
import React, { useState, useEffect } from 'react';
import CarListItem from './CarListItem';
import { useRouter } from 'next/navigation';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState({});
  const router = useRouter();

  // Automatically select the first car in the list on component mount
  useEffect(() => {
    if (CarListData.length > 0) {
      setActiveIndex(0); // Set the first car as the active option
      setSelectedCar(CarListData[0]); // Set the first car as the selected car
    }
  }, []);

  return (
    <div className="mt-1 p-3 overflow-auto h-[400px] flex flex-col">
      <h2 className="text-[22px] font-bold p-1">Choose a ride</h2>
      <div className="flex-1 overflow-auto">
        {CarListData.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer p-1 pt-1 rounded-md border-black ${
              activeIndex === index ? 'border-[3px]' : ''
            }`}
            onClick={() => {
              setActiveIndex(index);
              setSelectedCar(item);
            }}
          >
            <CarListItem car={item} distance={distance} />
          </div>
        ))}

        {/* Add space at the end of the list */}
        <div className="h-[40px]"></div>
      </div>

      {/* Payment Section */}
      {selectedCar.name && (
        <div className="flex justify-between bg-white p-3 shadow-lg w-full border-[1px] items-center rounded-lg mt-3">
          <h2 className="text-sm sm:text-base">Make Payment For</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={() =>
              router.push(
                '/payment?amount=' + (selectedCar.amount * distance).toFixed(2)
              )
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;

// the below code has issue with the request button for mobile screens

// import { CarListData } from '@/utils/CarListData';
// import React, { useState, useEffect } from 'react';
// import CarListItem from './CarListItem';
// import { useRouter } from 'next/navigation';

// function CarListOptions({ distance }) {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [selectedCar, setSelectedCar] = useState({});
//   const router=useRouter();

//   // Automatically select the first car in the list on component mount
//   useEffect(() => {
//     if (CarListData.length > 0) {
//       setActiveIndex(0); // Set the first car as the active option
//       setSelectedCar(CarListData[0]); // Set the first car as the selected car
//     }
//   }, []);

//   return (
//     <div className="mt-1 p-3 overflow-auto h-[350px]">
//       <h2 className="text-[22px] font-bold p-1">Choose a ride</h2>
//       {CarListData.map((item, index) => (
//         <div
//           key={item.id}
//           className={`cursor-pointer p-1 pt-1 rounded-md border-black ${
//             activeIndex === index ? 'border-[3px]' : ''
//           }`}
//           onClick={() => {
//             setActiveIndex(index);
//             setSelectedCar(item);
//           }}
//         >
//           <CarListItem car={item} distance={distance} />
//         </div>
//       ))}

//       {/* Add space at the end of the list */}
//       <div className="h-[40px]"></div>

//       {selectedCar.name ? (
//         <div
//           className="flex justify-between fixed bottom-5 bg-white p-3 shadow-lg w-full md:w-[30%] border-[1px] items-center rounded-lg"
//         >
//           <h2>Make Payment For</h2>
//           <button className="p-3 bg-black text-white rounded-lg text-center"
//           onClick={()=>router.push('/payment?amount='+(selectedCar.amount * distance).toFixed(2))}
//           >
//             Request {selectedCar.name}
//           </button>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default CarListOptions;
