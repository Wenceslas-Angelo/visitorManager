import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { VisitorAPIResponse } from "../types";
import Button from "./Button";

type Props = {
  visitors: {
    data: InfiniteData<VisitorAPIResponse, unknown> | undefined;
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<
      InfiniteQueryObserverResult<
        InfiniteData<VisitorAPIResponse, unknown>,
        Error
      >
    >;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  };
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({ visitors, setCurrentPage, currentPage }: Props) => {
  const allVisitors = useAppSelector((state) => state.visitor.allVisitors);

  const handleNextPage = () => {
    if (allVisitors.currentPage !== allVisitors.totalPages) {
      console.log("Fetch next page");
      visitors.fetchNextPage();
      if (visitors.data?.pages[currentPage + 1]) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (allVisitors.currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-xl py-10 mx-auto my-5 text-center">
      <div className="w-20" onClick={() => handlePreviousPage()}>
        <Button
          type="button"
          variant={allVisitors.currentPage === 1 ? "disabled" : "primary"}
        >
          PREV
        </Button>
      </div>
      <div className="px-4 py-2 text-xl border border-green-600 rounded-md">
        {allVisitors.currentPage} / {allVisitors.totalPages}
      </div>
      <div className="w-20" onClick={() => handleNextPage()}>
        <Button
          type="button"
          variant={
            allVisitors.currentPage === allVisitors.totalPages
              ? "disabled"
              : "primary"
          }
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
