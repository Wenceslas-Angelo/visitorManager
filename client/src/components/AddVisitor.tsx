import React from "react";
import { IoMdAdd } from "react-icons/io";
import useVisitorStore from "../stores/VisitorStore";
import Button from "./Button";

const AddVisitor = () => {
  const { setFormModalIsOpen } = useVisitorStore();
  return (
    <div className="mt-10 flex justify-end">
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

export default AddVisitor;
