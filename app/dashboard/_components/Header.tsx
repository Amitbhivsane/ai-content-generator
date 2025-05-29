"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  const { isSignedIn } = useUser(); // Get login status

  return (
    <div className="p-5 shadow-sm border-b-2 bg-white flex justify-between items-center">
      {isSignedIn ? (
        <>
          {/* Search + Join + User Button when logged in */}
          <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg w-full md:w-auto">
            <Search />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-5">
            <h2 className="bg-blue-600 p-1 rounded-full text-white px-2 text-sm md:text-lg">
              Join Membership just for $9.99/Month
            </h2>
            <UserButton afterSignOutUrl="/" />
          </div>
        </>
      ) : (
        // Simple header when not logged in
        <h1 className="text-xl font-semibold text-indigo-600">
          AI Content Generator
        </h1>
      )}
    </div>
  );
}

export default Header;
