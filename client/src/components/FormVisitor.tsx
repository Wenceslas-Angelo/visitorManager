import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorType } from "../types";
import Button from "./Button";
import Input from "./VisitorInput";

const FormVisitor = () => {
  const {
    register,
    formState: { errors },
  } = useForm<VisitorType>();
  const { setFormModalIsOpen } = useVisitorStore();
  return (
    <div className="text-xl p-5 bg-white rounded-md w-full">
      <div className="flex justify-between items-center my-5">
        <h2 className="font-semibold text-2xl">Visitors Details</h2>
        <div
          onClick={() => setFormModalIsOpen()}
          className="text-rose-400 text-xl p-2 cursor-pointer hover:text-rose-600"
        >
          <FaTimes />
        </div>
      </div>
      <form action="">
        <div className="flex">
          <Input
            type="text"
            placeholder="name"
            id="name"
            register={register}
            errors={errors}
            label="Name"
          />
          <Input
            type="text"
            placeholder="first name"
            id="firstName"
            register={register}
            errors={errors}
            label="First Name"
          />
        </div>
        <div className="flex">
          <Input
            type="number"
            placeholder="Purpose"
            id="purpose"
            register={register}
            errors={errors}
            label="Purpose"
          />
          <Input
            type="number"
            placeholder="National Number"
            id="firstName"
            register={register}
            errors={errors}
            label="National Number"
          />
        </div>
        <Input
          type="number"
          placeholder="Badge Number"
          id="firstName"
          register={register}
          errors={errors}
          label="Badge Number"
        />

        <div className="flex justify-between items-center mt-5 px-5">
          <div>
            <Button type="submit">Save</Button>
          </div>
          <div onClick={() => setFormModalIsOpen()} className="">
            <Button type="button" variant="secondary">
              Close
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormVisitor;
