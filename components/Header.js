import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: 'Ride',
      icon: 'https://utfs.io/f/WrQ6kuKulYjk3VfkjDYXqpSvLJ2ouDYPK1gRr6hVcxHFfmOZ',
    },
    {
      id: 2,
      name: 'Package',
      icon: 'https://utfs.io/f/WrQ6kuKulYjkJd83XwkzYUl5iTxg8ZnNcX9eBap0VEJFHur2',
    },
  ];

  return (
    <div className="p-4 border-b-[4px] border-gray-200 flex items-center justify-between w-full">
      {/* Left Section: Logo and Icons */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Image
          src="https://utfs.io/f/WrQ6kuKulYjkfSEgt1sX06nSk5ATbUilgdyxPBO2wcLpMVJH"
          width={50}
          height={50}
          alt="Logo"
          className="flex-shrink-0"
        />

        {/* Header Menu */}
        <div className="flex gap-4 items-center sm:gap-6">
          {headerMenu.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 items-center cursor-pointer text-center"
            >
              <Image src={item.icon} width={20} height={20} alt={`${item.name} icon`} />
              <h2 className="text-[14px] font-medium">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: User Button */}
      <div className="sm:flex items-center pt-2">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
