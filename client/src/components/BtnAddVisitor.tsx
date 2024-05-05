import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useFormModalStore } from "../features/store";
import Button from "./Button";

const BtnAddVisitor = () => {
  const { setFormModalIsOpen } = useFormModalStore();
  return (
    <div className="flex justify-end">
      <Button type="button" variant="primary" size="small">
        <div className="flex items-center" onClick={() => setFormModalIsOpen()}>
          <span className="text-xl">
            <IoMdAdd />
          </span>
          Add Visitor
        </div>
      </Button>
    </div>
  );
};

export default BtnAddVisitor;
