import { Search } from "lucide-react";
import React from "react";

const SearchSection = ({ onSearchInput }: any) => {
  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex-col flex justify-center items-center text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Browse All Templates
      </h2>
      <p className="text-white mt-1 text-sm md:text-base">
        What would you like to create today?
      </p>

      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-sm"
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
