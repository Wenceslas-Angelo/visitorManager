import React from "react";
import ReactPaginate from "react-paginate";
import { usePageStore } from "../features/store";
import { VisitorType } from "../types";
import VisitorTable from "./VisitorTable";

type Props = {
  data: VisitorType[];
  pageCount: number;
  visitorActive?: boolean;
};

const Pagination = ({ data, pageCount, visitorActive }: Props) => {
  const { setPage } = usePageStore();
  return (
    <div>
      <VisitorTable visitorsData={data} visitorActive={visitorActive} />
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
