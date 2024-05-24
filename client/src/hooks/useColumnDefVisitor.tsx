import { CellContext, ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegEye, FaRegTrashCan } from "react-icons/fa6";
import { useAppSelector } from "../app/hooks";
import { useDeleteModalStore, useFormModalStore } from "../features/store";
import { useCheckOutVisitor } from "../hooks/useVisitorQuery";
import { VisitorType } from "../types";

const formatDate = (date: string) => moment(date).format("YYYY-MM-DD");
const formatTime = (time: string) => moment(time).format("HH:mm");

const useColumnDefVisitor = (
  visitorActive = false
): ColumnDef<VisitorType>[] => {
  const user = useAppSelector((state) => state.auth.user);
  const token = user ? user.token : "";
  const checkOut = useCheckOutVisitor();
  const { setFormModalIsOpen, setIdVisitorUpdate } = useFormModalStore();
  const { setDeleteModalIsOpen, setIdVisitorDeleted } = useDeleteModalStore();

  const renderDateCell = ({ row }: CellContext<VisitorType, unknown>) => (
    <span>{formatDate(row.getValue("startDateTime"))}</span>
  );

  const renderTimeCell = ({ row }: CellContext<VisitorType, unknown>) => {
    const formattedTimeIn = formatTime(row.getValue("startDateTime"));
    const formattedTimeOut = row.getValue("endDateTime")
      ? formatTime(row.getValue("endDateTime"))
      : "__:__";
    return (
      <span>
        {formattedTimeIn} - {formattedTimeOut}
      </span>
    );
  };

  const renderActionCell = ({ row }: CellContext<VisitorType, unknown>) => {
    const idVisitor: string = row.getValue("_id");
    return (
      <div className="flex justify-center px-2">
        <span className="p-2 text-white bg-gray-600 rounded-md cursor-pointer hover:bg-gray-500">
          <FaRegEye />
        </span>
        <span
          className="p-2 mx-2 text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-500"
          onClick={() => {
            setIdVisitorUpdate(idVisitor);
            setFormModalIsOpen();
          }}
        >
          <BsPencilSquare />
        </span>
        <span
          className="p-2 text-white rounded-md cursor-pointer bg-rose-600 hover:bg-rose-500"
          onClick={() => {
            setIdVisitorDeleted(idVisitor);
            setDeleteModalIsOpen();
          }}
        >
          <FaRegTrashCan />
        </span>
      </div>
    );
  };

  if (visitorActive) {
    return [
      { header: "Nom", accessorKey: "name" },
      { header: "Prénom", accessorKey: "firstName" },
      { header: "Motif", accessorKey: "purpose" },
      { header: "C.I.N.", accessorKey: "nationalId" },
      { header: "Badge", accessorKey: "badgeNumber" },
      {
        header: "Sortie",
        accessorKey: "_id",
        cell: ({ row }) => (
          <input
            type="checkbox"
            onClick={() =>
              checkOut.mutate({ token, idVisitor: row.getValue("_id") })
            }
          />
        ),
      },
    ];
  }

  return [
    { header: "Date", accessorKey: "startDateTime", cell: renderDateCell },
    {
      header: "Arrivée-Départ",
      accessorKey: "endDateTime",
      cell: renderTimeCell,
    },
    { header: "Nom", accessorKey: "name" },
    { header: "Prénom", accessorKey: "firstName" },
    { header: "Motif", accessorKey: "purpose" },
    {
      header: "Action",
      accessorKey: "_id",
      cell: renderActionCell,
    },
  ];
};

export default useColumnDefVisitor;
