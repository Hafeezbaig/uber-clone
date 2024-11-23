"use Client"

import React, { useContext, useEffect } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

function SearchSection() {
    const {source, setSource}=useContext(SourceContext);
    const {destination, setDestination}=useContext(DestinationContext);

    useEffect(()=>{
        if(source)
        {
            console.log(source);
        }
        if(destination)
        {
            console.log(destination);
        }
            

    },[source, destination])
  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />

        <button className="p-3 bg-black w-full mt-5 text-white rounded-lg hover:bg-slate-800">Search</button>
    </div>
  )
}

export default SearchSection