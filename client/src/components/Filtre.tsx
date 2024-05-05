import React from "react";
import { purposeData } from "../constants";
import Search from "./Search";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

const Filtre = ({ query, setQuery, setSelectedOption }: Props) => {
  return (
    <div className="flex items-center w-full">
      <Search query={query} setQuery={setQuery} />

      <select
        className="px-4 py-2 pl-10 ml-5 text-lg bg-white border border-gray-400 rounded-lg outline-none w-52 focus:border-green-600 focus:ring-green-600"
        id="purpose"
        autoComplete="off"
        data-testid="input"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="all">Touts les motifs</option>
        {purposeData.map((purpose) => (
          <option key={purpose} value={purpose}>
            {purpose}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtre;
