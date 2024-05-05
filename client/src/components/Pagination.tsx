import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { VisitorType } from "../types";
import VisitorTable from "./VisitorTable";

type Props = {
  data: VisitorType[];
};

const Pagination = ({ data }: Props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const dataPerPage = 10;
  const pageVisited = pageNumber * dataPerPage;

  const displayData = data.slice(pageVisited, pageVisited + dataPerPage);

  return (
    <div>
      <VisitorTable visitorsData={displayData} />
      <div className="my-10">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(data.length / dataPerPage)}
          onPageChange={({ selected }) => setPageNumber(selected)}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDesabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default Pagination;
