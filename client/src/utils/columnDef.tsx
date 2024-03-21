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
      header: "Check in/out",
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
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Motif",
      accessorKey: "purpose",
    },
    {
      header: "Badge",
      accessorKey: "badgeNumber",
    },
  ];

  const columnsVisitorActive: ColumnDef<VisitorType>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "National ID",
      accessorKey: "nationalId",
    },
    {
      header: "Motif",
      accessorKey: "purpose",
    },
    {
      header: "Badge",
      accessorKey: "badgeNumber",
    },
    {
      header: "Check out",
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
