"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "./(context)/TotalUsageContext";
import { UserSubscriptionContext } from "./(context)/UserSubContext";
import { UpdateCreditUsageContext } from "./(context)/UpdateCreditUsageContext";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [usersubscription, setUserSubscription] = useState<boolean>(false);
  const [updatecreditusage, setUpdateCreditUsage] = useState<any>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Handler to close mobile sidebar
  const closeMobileSidebar = () => setShowMobileSidebar(false);

  // Handler to open mobile sidebar
  const openMobileSidebar = () => setShowMobileSidebar(true);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ usersubscription, setUserSubscription }}
      >
        <UpdateCreditUsageContext.Provider
          value={{ updatecreditusage, setUpdateCreditUsage }}
        >
          <div className="bg-slate-100 min-h-screen flex flex-col">
            {/* Header */}
            <div className="md:ml-64">{/* <Header /> */}</div>

            {/* Mobile Sidebar Toggle - only show when sidebar is closed */}
            {!showMobileSidebar && (
              <div className="md:hidden p-4 bg-white shadow-sm sticky top-0 z-50">
                <button
                  onClick={openMobileSidebar}
                  className="text-gray-800 flex items-center gap-2"
                >
                  <Menu size={24} />
                  <span>Menu</span>
                </button>
              </div>
            )}

            {/* Sidebar for desktop */}
            <div className="w-64 hidden md:block fixed top-0 left-0 h-full bg-white shadow-md z-40">
              <SideNav />
            </div>

            {/* Sidebar for mobile */}
            {showMobileSidebar && (
              <div
                className="fixed inset-0  bg-opacity-50 z-50 md:hidden"
                // Close sidebar when clicking outside the sidebar
                onClick={closeMobileSidebar}
              >
                <div
                  className="w-64 bg-white h-full p-4 shadow-md overflow-y-auto"
                  // Prevent click inside sidebar from closing it
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button on top */}
                  <button
                    onClick={closeMobileSidebar}
                    className="text-red-600 mb-4 font-semibold"
                  >
                    Close
                  </button>
                  {/* Pass the close handler to SideNav */}
                  <SideNav onItemClick={closeMobileSidebar} />
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="md:ml-64 p-4 max-w-full overflow-x-hidden">
              {children}
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}
