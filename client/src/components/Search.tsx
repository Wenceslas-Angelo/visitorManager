import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <form className="mt-10 w-full">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Rechercher"
          className="outline-none border border-gray-400 rounded-lg text-lg px-4 py-2 pl-10 focus:border-green-600 focus:ring-green-600 placeholder-gray-600"
        />
        <div className="absolute text-gray-400 left-2 font-bold text-xl top-[50%] translate-y-[-50%]">
          <FiSearch />
        </div>
      </div>
    </form>
  );
};

export default Search;
