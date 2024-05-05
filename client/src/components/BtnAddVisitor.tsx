import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useFormModalStore } from "../features/store";
import Button from "./Button";

const BtnAddVisitor = () => {
  const { setFormModalIsOpen } = useFormModalStore();
  return (
    <div className="flex justify-end">
      <div className="flex items-center" onClick={() => setFormModalIsOpen()}>
        <Button type="button" variant="primary" size="small">
          <div className="flex items-center justify-center">
            <span className="text-xl">
              <IoMdAdd />
            </span>
            <span>Ajouter</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BtnAddVisitor;
