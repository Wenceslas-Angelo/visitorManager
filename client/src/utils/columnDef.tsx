import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { VisitorType } from "../types";

export const columnDefVisitor = (
  visitorActive = false,
  token: string,
  updateActiveVisitor: (token: string, visitorId: string) => void
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
        const formattedTimeOut = moment(row.getValue("endDateTime")).format(
          "HH:mm"
        );
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
            onClick={() => updateActiveVisitor(token, row.getValue("_id"))}
          />
        );
      },
    },
  ];

  return visitorActive ? columnsVisitorActive : columns;
};
