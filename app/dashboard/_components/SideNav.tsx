"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link"; // ✅ Add this
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen relative p-3 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo" width={120} height={50} />
      </div>
      <hr className="border" />

      <div className="mt-4">
        {MenuList.map((menu, index) => {
          const Icon = menu.icon;
          return (
            <Link key={index} href={menu.path}>
              <div
                className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
                  path === menu.path ? "bg-primary text-white" : ""
                }`}
              >
                <Icon className="h-6 w-6" />
                <h2 className="text-lg">{menu.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 w-fit">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
