import React from "react";
import { purposeData } from "../constants";
import { useSearchStore } from "../features/store";
import Search from "./Search";

type Props = {
  showDateFilter?: boolean;
  dateField?: string;
  setDateField?: React.Dispatch<React.SetStateAction<string>>;
};

const Filtre = ({
  showDateFilter = false,
  dateField = "",
  setDateField,
}: Props) => {
  const { setPurposeQuery } = useSearchStore();
  return (
    <div className="flex items-center w-full">
      <Search />

      <select
        className="px-4 py-2 pl-10 ml-5 text-lg bg-white border border-gray-400 rounded-lg outline-none w-52 focus:border-green-600 focus:ring-green-600"
        id="purpose"
        autoComplete="off"
        data-testid="input"
        onChange={(e) => setPurposeQuery(e.target.value)}
      >
        <option value="">Touts les motifs</option>
        {purposeData.map((purpose) => (
          <option key={purpose} value={purpose}>
            {purpose}
          </option>
        ))}
      </select>
      {showDateFilter && setDateField ? (
        <input
          type="date"
          id="dateFiltre"
          className="px-4 py-2 pl-10 ml-5 text-lg placeholder-gray-600 border border-gray-400 rounded-lg outline-none w-52 focus:border-green-600 focus:ring-green-600"
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        />
      ) : null}
    </div>
  );
};

export default Filtre;
