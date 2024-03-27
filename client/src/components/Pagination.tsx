import React from "react";
import useVisitorStore from "../stores/VisitorStore";
import Button from "./Button";

type Props = {
  totalPages: number;
  currentPage: number;
  token: string;
};

const Pagination = ({ totalPages, currentPage, token }: Props) => {
  const { readAllVisitors } = useVisitorStore();
  const handleNextPage = () => {
    if (currentPage !== totalPages) {
      readAllVisitors(token, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      readAllVisitors(token, currentPage - 1);
    }
  };
  return (
    <div className="w-full flex items-center justify-between max-w-xl py-10 mx-auto my-5 text-center">
      <div className="w-20" onClick={() => handlePreviousPage()}>
        <Button
          type="button"
          variant={currentPage === 1 ? "disabled" : "primary"}
        >
          PREV
        </Button>
      </div>
      <div className="px-4 py-2 text-xl border border-green-600 rounded-md">
        {currentPage}
      </div>
      <div className="w-20" onClick={() => handleNextPage()}>
        <Button
          type="button"
          variant={currentPage === totalPages ? "disabled" : "primary"}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
