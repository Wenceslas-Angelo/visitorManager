import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { useFormModalStore } from "../features/store";
import { useCreateVisitor, useUpdateVisitor } from "../hooks/useVisitorQuery";
import { VisitorType } from "../types";
import Button from "./Button";
import Input from "./VisitorInput";

const FormVisitor = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<VisitorType>();

  const user = useAppSelector((state) => state.auth.user);
  const createVisitorMutation = useCreateVisitor();
  const updateVisitorMutation = useUpdateVisitor();
  const { setFormModalIsOpen, idVisitorUpdate, setIdVisitorUpdate } =
    useFormModalStore();
  const allVisitors = useAppSelector((state) => state.visitor.allVisitors);

  const visitorUpdated = idVisitorUpdate
    ? allVisitors.visitors.find((visitor) => idVisitorUpdate === visitor._id)
    : null;

  const onSubmit: SubmitHandler<VisitorType> = async (data) => {
    if (user && user.token) {
      idVisitorUpdate && visitorUpdated
        ? updateVisitorMutation.mutate({
            visitorData: {
              ...data,
              userId: user.userId,
              startDateTime: visitorUpdated.startDateTime,
              ...(visitorUpdated.endDateTime && {
                endDateTime: visitorUpdated.endDateTime,
              }),
            },
            token: user.token,
            visitorId: idVisitorUpdate,
          })
        : createVisitorMutation.mutate({
            visitorData: { ...data, userId: user.userId },
            token: user.token,
          });
    }
  };

  const handleCloseFormVisitor = () => {
    setIdVisitorUpdate("");
    setFormModalIsOpen();
  };

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-screen bg-black/50 ">
      <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
        <div className="w-full p-5 m-2 text-xl bg-white rounded-md">
          <div className="flex items-center justify-between my-5">
            <h2 className="text-2xl font-semibold">Détails du visiteurs</h2>
            <div
              onClick={() => handleCloseFormVisitor()}
              className="p-2 text-xl cursor-pointer text-rose-400 hover:text-rose-600"
            >
              <FaTimes />
            </div>
          </div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <Input
                type="text"
                placeholder="Nom"
                id="name"
                register={register}
                errors={errors}
                label="Nom"
                value={idVisitorUpdate ? visitorUpdated?.name : ""}
              />
              <Input
                type="text"
                placeholder="Prénom"
                id="firstName"
                register={register}
                errors={errors}
                label="Prénom"
                value={idVisitorUpdate ? visitorUpdated?.firstName : ""}
              />
            </div>
            <div className="flex">
              <Input
                type="text"
                placeholder=""
                id="purpose"
                register={register}
                errors={errors}
                label="Motif de la visite"
                value={idVisitorUpdate ? visitorUpdated?.purpose : ""}
              />
              <Input
                type="number"
                placeholder="Numero d' identite nationale du visiteur"
                id="nationalId"
                register={register}
                errors={errors}
                label="C. I. N."
                value={idVisitorUpdate ? visitorUpdated?.nationalId : ""}
              />
            </div>
            <Input
              type="number"
              placeholder="Numéro de badge"
              id="badgeNumber"
              register={register}
              errors={errors}
              label="Numéro de badge"
              value={idVisitorUpdate ? visitorUpdated?.badgeNumber : undefined}
            />

            <div className="flex items-center justify-between px-5 mt-5">
              <div>
                {idVisitorUpdate ? (
                  <Button type="submit">Modifier</Button>
                ) : (
                  <Button type="submit">Enregistrer</Button>
                )}
              </div>
              <div onClick={() => handleCloseFormVisitor()} className="">
                <Button type="button" variant="secondary">
                  Annuler
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormVisitor;
