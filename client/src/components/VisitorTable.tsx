import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { VisitorType } from "../types";

type Props = {
  visitorsData: VisitorType[];
};

const VisitorTable = ({ visitorsData }: Props) => {
  const data = visitorsData;
  const columns: ColumnDef<VisitorType>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "National Id",
      accessorKey: "nationalId",
    },
    {
      header: "Purpose",
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
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-center text-lg">
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
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-white border-b">
                  {row.getVisibleCells().map((cell) => (
                    <th
                      key={cell.id}
                      className="px-6 py-4  text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))
            : null}
          {/* <tr className="bg-white">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">$99</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTable;
