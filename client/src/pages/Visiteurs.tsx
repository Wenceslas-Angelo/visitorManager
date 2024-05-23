import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import Pagination from "../components/Pagination";
import {
  useDeleteModalStore,
  useFormModalStore,
  useSearchStore,
} from "../features/store";
import Container from "../utils/Container";

const Visiteurs = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  const { setTodayQuery } = useSearchStore();
  const allVisitor = useAppSelector((state) => state.visitor.allVisitors);

  useEffect(() => {
    setTodayQuery(false);
  }, [setTodayQuery]);

  return (
    <Container>
      <div className="w-full my-5">
        <Pagination
          pageCount={allVisitor.totalPages}
          data={allVisitor.visitors}
        />
      </div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Visiteurs;
