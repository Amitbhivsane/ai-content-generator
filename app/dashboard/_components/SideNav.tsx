"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import UsageTrack from "./UsageTrack";

type SideNavProps = {
  onItemClick?: () => void; // optional callback to close sidebar on mobile
};

const MenuList = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "History", icon: FileClock, path: "/dashboard/history" },
  { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
  { name: "Setting", icon: Settings, path: "/dashboard/setting" },
];

export default function SideNav({ onItemClick }: SideNavProps) {
  const path = usePathname();

  return (
    <div className="h-full bg-white shadow-md w-64 p-4 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="logo" width={120} height={50} />
        </div>
        <hr className="mb-4" />

        {/* Menu Items */}
        <nav>
          {MenuList.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = path === menu.path;

            return (
              <Link
                key={index}
                href={menu.path}
                onClick={onItemClick}
                className={`flex items-center gap-3 mb-2 p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-base font-medium">{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Usage Tracker */}
      <div>
        <UsageTrack />
      </div>
    </div>
  );
}
