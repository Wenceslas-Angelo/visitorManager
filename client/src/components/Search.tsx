import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LiaTimesCircle } from "react-icons/lia";

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

const Search = ({ setQuery, query }: Props) => {
  const [showTimes, setShowTimes] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowTimes(e.target.value ? true : false);
  };

  return (
    <form className="">
      <div className="relative w-64">
        <input
          type="text"
          name="search"
          value={query}
          id="search"
          placeholder="Rechercher"
          className="w-full px-4 py-2 pl-10 text-lg placeholder-gray-600 border border-gray-400 rounded-lg outline-none focus:border-green-600 focus:ring-green-600"
          onChange={(e) => handleChange(e)}
        />
        <div
          onClick={() => {
            setQuery("");
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
