"use client";

import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateSection from "./_components/TemplateSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-screen-lg mx-auto">
      {/* Search section */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />

      {/* Template Section */}
      <TemplateSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
