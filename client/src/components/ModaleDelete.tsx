import React from "react";
import { FaTimes } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { useDeleteModalStore } from "../features/store";
import { useDeleteVisitor } from "../hooks/useVisitorQuery";
import Button from "./Button";

const ModaleDelete = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { setDeleteModalIsOpen, setIdVisitorDeleted, idVisitorDeleted } =
    useDeleteModalStore();
  const handleClose = () => {
    setIdVisitorDeleted("");
    setDeleteModalIsOpen();
  };
  const deleteVisitor = useDeleteVisitor();
  const allVisitors = useAppSelector((state) => state.visitor.allVisitors);
  const visitorDeleted = idVisitorDeleted
    ? allVisitors.find((visitor) => idVisitorDeleted === visitor._id)
    : null;

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-screen bg-black/50 ">
      <div className="flex items-center justify-center h-full max-w-3xl mx-auto">
        <div className="w-full p-5 m-2 text-xl bg-white rounded-md">
          <div className="flex items-center justify-between my-5">
            <h2 className="text-2xl font-semibold">Visitors Details</h2>
            <div
              onClick={() => handleClose()}
              className="p-2 text-xl cursor-pointer text-rose-400 hover:text-rose-600"
            >
              <FaTimes />
            </div>
          </div>
          <div>
            <div>
              <p>
                <span className="font-semibold">Nom</span>:{" "}
                <span className="text-gray-600">{visitorDeleted?.name}</span>
              </p>
              <p>
                <span className="font-semibold">Prenom</span>:{" "}
                <span className="text-gray-600">
                  {visitorDeleted?.firstName}
                </span>
              </p>
              <p>
                <span className="font-semibold">Motif</span>:{" "}
                <span className="text-gray-600">{visitorDeleted?.purpose}</span>
              </p>
            </div>
            <div className="flex items-center justify-between px-5 mt-5">
              <div
                onClick={() => {
                  deleteVisitor.mutate({
                    token: user ? user.token : "",
                    idVisitor: idVisitorDeleted,
                  });
                  handleClose();
                }}
              >
                <Button type="submit" variant="danger">
                  Delete
                </Button>
              </div>
              <div onClick={() => handleClose()} className="">
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModaleDelete;
