"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const navItems = [
  { name: "Transaksi", href: "/transaksi", segment: "transaksi" },
  { name: "Barang", href: "/barang", segment: "barang" },
];

export default function Sidebar() {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <div className=' w-[328px] space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
      <nav className='flex flex-col gap-2'>
        <h1 className='font-semibold text-2xl mb-5'>Tokoku</h1>
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className={`block py-3 px-4 rounded transition duration-200 ${activeSegment === item.segment ? "bg-blue-500 text-white" : "hover:bg-blue-400 hover:text-white"}`}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
