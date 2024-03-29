import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useCreateVisitor } from "../hooks/useVisitorQuery";
import useAuthStore from "../stores/AuthStore";
import useVisitorStore from "../stores/VisitorStore";
import { VisitorType } from "../types";
import Button from "./Button";
import Input from "./VisitorInput";

const FormVisitor = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<VisitorType>();
  const { user } = useAuthStore();
  const createVisitorMutation = useCreateVisitor();
  const { setFormModalIsOpen } = useVisitorStore();

  const onSubmit: SubmitHandler<VisitorType> = async (data) => {
    if (user && user.token) {
      createVisitorMutation.mutate({
        visitorData: { ...data, userId: user.userId },
        token: user.token,
      });
    }
  };

  return (
    <div className="w-full p-5 m-2 text-xl bg-white rounded-md">
      <div className="flex items-center justify-between my-5">
        <h2 className="text-2xl font-semibold">Visitors Details</h2>
        <div
          onClick={() => setFormModalIsOpen()}
          className="p-2 text-xl cursor-pointer text-rose-400 hover:text-rose-600"
        >
          <FaTimes />
        </div>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
            placeholder="Purpose"
            id="purpose"
            register={register}
            errors={errors}
            label="Purpose"
          />
          <Input
            type="number"
            placeholder="National Number"
            id="nationalId"
            register={register}
            errors={errors}
            label="National Number"
          />
        </div>
        <Input
          type="number"
          placeholder="Badge Number"
          id="badgeNumber"
          register={register}
          errors={errors}
          label="Badge Number"
        />

        <div className="flex items-center justify-between px-5 mt-5">
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
