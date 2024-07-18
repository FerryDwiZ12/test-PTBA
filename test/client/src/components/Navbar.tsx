"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const lastSegment = pathname.split("/").pop() || "Home";

  const formattedSegment = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <nav className='bg-white shadow-md'>
      <div className='mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <h1 className='px-4 py-2 text-lg font-semibold text-gray-800'> {formattedSegment}</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
