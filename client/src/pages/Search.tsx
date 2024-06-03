import React from "react";
import FormVisitor from "../components/FormVisitor";
import ModaleDelete from "../components/ModaleDelete";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import Container from "../utils/Container";

const Search = () => {
  const { formModalIsOpen } = useFormModalStore();
  const { deleteModalIsOpen } = useDeleteModalStore();
  return (
    <Container>
      <div className="w-full my-5">search results</div>

      {formModalIsOpen ? <FormVisitor /> : null}
      {deleteModalIsOpen ? <ModaleDelete /> : null}
    </Container>
  );
};

export default Search;
