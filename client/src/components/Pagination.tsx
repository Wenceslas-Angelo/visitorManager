import React from "react";
import ReactPaginate from "react-paginate";
import { VisitorType } from "../types";
import VisitorTable from "./VisitorTable";
import { usePageStore } from "../features/store";

type Props = {
  data: VisitorType[];
  pageCount: number;
};

const Pagination = ({ data, pageCount }: Props) => {
  const { setPage } = usePageStore();
  return (
    <div>
      <VisitorTable visitorsData={data} />
      <div className="my-10">
        <ReactPaginate
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setPage(selected + 1)}
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
