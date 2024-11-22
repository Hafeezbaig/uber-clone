import { SignUp } from '@clerk/nextjs'
import Image from 'next/image';


export default function Page() {
  return (
    <>
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Banner Image */}
      <Image
        src="https://utfs.io/f/WrQ6kuKulYjkPeu4o0y6vJGfV8KYQ6lpuNWM4OFyqbjPSCd7"
        layout="fill" // Ensures the image spans the entire viewport
        objectFit="cover" // Makes the image responsive
        alt="uberbanner"
      />

      {/* Uncomment below if the external image is not working */}
      {/* 
      <Image
        src="/uber-clone-project-banner.jpeg"
        layout="fill"
        objectFit="cover"
        alt="uberbanner"
      />
      */}

      {/* Sign-In Component */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:items-start md:top-10 md:right-10 p-5">
        <SignUp />
      </div>
    </div>
    </>
  );
}