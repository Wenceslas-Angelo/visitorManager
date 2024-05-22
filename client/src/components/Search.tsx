import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LiaTimesCircle } from "react-icons/lia";
import { useSearchStore } from "../features/store";

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [showTimes, setShowTimes] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowTimes(e.target.value ? true : false);
  };

  return (
    <form className="">
      <div className="relative">
        <input
          type="text"
          name="search"
          value={searchQuery}
          id="search"
          placeholder="Rechercher"
          className="px-4 py-2 pl-10 placeholder-gray-600 border border-gray-400 rounded-lg outline-none focus:border-green-600 focus:ring-green-600"
          onChange={(e) => handleChange(e)}
        />
        <div
          onClick={() => {
            setSearchQuery("");
            setShowTimes(false);
          }}
          className={`absolute ${
            showTimes ? "flex" : "hidden"
          } cursor-pointer text-rose-400 right-2 font-bold text-xl top-[50%] translate-y-[-50%]`}
        >
          <LiaTimesCircle />
        </div>
        <div className="absolute text-gray-400 left-2 font-bold text-xl top-[50%] translate-y-[-50%]">
          <FiSearch />
        </div>
      </div>
    </form>
  );
};

export default Search;
