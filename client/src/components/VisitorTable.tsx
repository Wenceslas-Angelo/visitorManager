import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { VisitorType } from "../types";

type Props = {
  visitorsData: VisitorType[];
};

const VisitorTable = ({ visitorsData }: Props) => {
  const data = visitorsData;
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
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-lg text-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-white border-b">
                {row.getVisibleCells().map((cell) => (
                  <th
                    key={cell.id}
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </th>
                ))}
              </tr>
            ))
          ) : (
            <tr className="py-5 text-xl text-center">
              <th>NO RESULTS</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTable;
