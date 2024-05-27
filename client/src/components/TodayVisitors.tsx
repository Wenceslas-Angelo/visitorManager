import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import {
  useDeleteModalStore,
  useFormModalStore,
  useSearchStore,
} from "../features/store";
import Container from "../utils/Container";
import FormVisitor from "./FormVisitor";
import ModaleDelete from "./ModaleDelete";
import Pagination from "./Pagination";

type Props = {
  variant: "all" | "in" | "out";
  visitorActive?: boolean;
};

const TodayVisitors = ({ variant, visitorActive = false }: Props) => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const { setTodayQuery, setInTodayQuery, setOutTodayQuery, setDateQuery } =
    useSearchStore();
  const allVisitors = useAppSelector((state) => state.visitor.allVisitors);

  useEffect(() => {
    setTodayQuery(true);
    setDateQuery("");
    const inQuery = variant === "in";
    const outQuery = variant !== "all" && variant !== "in";

    setInTodayQuery(inQuery);
    setOutTodayQuery(outQuery);
  }, [setTodayQuery, setInTodayQuery, setOutTodayQuery, setDateQuery, variant]);

  return (
    <Container>
      <div className="w-full">
        <div className="w-full mt-10">
          <Pagination
            data={allVisitors.visitors}
            pageCount={allVisitors.totalPages}
            visitorActive={visitorActive}
          />
        </div>
        {formModalIsOpen ? <FormVisitor /> : null}
        {deleteModalIsOpen ? <ModaleDelete /> : null}
      </div>
    </Container>
  );
};

export default TodayVisitors;
