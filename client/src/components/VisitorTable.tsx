import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useAppSelector } from "../app/hooks";
import { useCheckOutVisitor } from "../hooks/useVisitorQuery";
import { VisitorType } from "../types";
import { columnDefVisitor } from "../utils/columnDef";

type Props = {
  visitorsData: VisitorType[];
  visitorActive?: boolean;
};

const VisitorTable = ({ visitorsData, visitorActive = false }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const checkOut = useCheckOutVisitor();
  const data = visitorsData;
  const columns = columnDefVisitor(
    visitorActive,
    user ? user.token : "",
    checkOut
  );
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-[16px] text-center"
                >
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
              <tr key={row.id} className="bg-white border-b hover:bg-gray-300">
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
