import { UseMutationResult } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { VisitorType } from "../types";

export const columnDefVisitor = (
  visitorActive = false,
  token: string,
  checkOut: UseMutationResult<
    VisitorType,
    Error,
    {
      token: string;
      idVisitor: string;
    },
    unknown
  >,
  setFormModalIsOpen: () => void,
  setIdVisitorUpdate: (idVisitor: string) => void,
  setDeleteModalIsOpen: () => void,
  setIdVisitorDelete: (idVisitor: string) => void
) => {
  const columns: ColumnDef<VisitorType>[] = [
    {
      header: "Date",
      accessorKey: "startDateTime",
      cell: ({ row }) => {
        const formattedDate = moment(row.getValue("startDateTime")).format(
          "YYYY-MM-DD"
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      header: "Arrivee-Depart",
      accessorKey: "endDateTime",
      cell: ({ row }) => {
        const formattedTimeIn = moment(row.getValue("startDateTime")).format(
          "HH:mm"
        );
        const formattedTimeOut = row.getValue("endDateTime")
          ? moment(row.getValue("endDateTime")).format("HH:mm")
          : "__:__";
        return (
          <span>
            {formattedTimeIn} - {formattedTimeOut}
          </span>
        );
      },
    },
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Prénom",
      accessorKey: "firstName",
    },
    {
      header: "Motif",
      accessorKey: "purpose",
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center px-2">
            <span
              className="p-2 mr-2 text-white bg-indigo-600 rounded-md cursor-pointer text-md hover:bg-indigo-500"
              onClick={() => {
                const idVisitor: string = row.getValue("_id");
                setIdVisitorUpdate(idVisitor);
                setFormModalIsOpen();
              }}
            >
              <BsPencilSquare />
            </span>
            <span
              className="p-2 ml-2 text-white rounded-md cursor-pointer bg-rose-600 text-md hover:bg-rose-500"
              onClick={() => {
                const idVisitor: string = row.getValue("_id");
                setIdVisitorDelete(idVisitor);
                setDeleteModalIsOpen();
              }}
            >
              <FaRegTrashCan />
            </span>
          </div>
        );
      },
    },
  ];

  const columnsVisitorActive: ColumnDef<VisitorType>[] = [
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Prénom",
      accessorKey: "firstName",
    },
    {
      header: "Motif",
      accessorKey: "purpose",
    },
    {
      header: "ID national",
      accessorKey: "nationalId",
    },

    {
      header: "Badge",
      accessorKey: "badgeNumber",
    },
    {
      header: "Check Out",
      accessorKey: "_id",
      cell: ({ row }) => {
        return (
          <input
            type="checkbox"
            onClick={() => {
              const idVisitor: string = row.getValue("_id");
              checkOut.mutate({ token, idVisitor });
            }}
          />
        );
      },
    },
  ];

  return visitorActive ? columnsVisitorActive : columns;
};
