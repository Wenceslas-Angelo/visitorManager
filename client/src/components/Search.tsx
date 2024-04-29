import React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ setQuery }: Props) => {
  return (
    <form className="w-full mt-10">
      <div className="relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Rechercher"
          className="px-4 py-2 pl-10 text-lg placeholder-gray-600 border border-gray-400 rounded-lg outline-none focus:border-green-600 focus:ring-green-600"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute text-gray-400 left-2 font-bold text-xl top-[50%] translate-y-[-50%]">
          <FiSearch />
        </div>
      </div>
    </form>
  );
};

export default Search;
