"use client";

import React, { useState, useMemo } from "react";
import { formatRFC7231 } from "date-fns";
import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  Column,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";

import { api } from "~/trpc/react";
import { HistoryFilter } from "~/app/_components/HistoryFilter";
import { Screenshot, ScreenshotData } from "~/lib/types";

export default function Page() {
  const allScreenshots = api && api.screenshot.getAll.useQuery();
  const [statusFilter, setStatusFilter] = useState("");
  const { data: screenshots } = allScreenshots;

  const columns = useMemo<ColumnDef<ScreenshotData>[]>(
    () => [
      {
        accessorKey: "number",
        header: "S.No",
        footer: (props) => props.column.id,
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      // {
      //   accessorKey: "type",
      //   header: "Type",
      //   footer: (props) => props.column.id,
      // },
      {
        accessorKey: "host",
        header: "Host",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "options",
        header: "Options",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "timeSec",
        header: "Time Sec",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "size",
        header: "Size MB",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "timeStamp",
        header: "Timestamp",
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const memorizedScreenshots = useMemo(() => {
    if (!screenshots) return [];

    return screenshots.filter((item) => {
      if (statusFilter === "SUCCESS") {
        return item.status === "SUCCESS";
      } else if (statusFilter === "ERROR") {
        return item.status === "ERROR";
      } else if (statusFilter === "PENDING") {
        return item.status === "PENDING";
      } else {
        return true;
      }
    });
  }, [screenshots, statusFilter]);

  const transformData = (data: Screenshot[] = []) => {
    return data.map((item, index) => {
      return {
        number: index + 1,
        status: item?.status,
        type: "",
        host: item.userProvidedUrl,
        options: "",
        timeSec: "",
        size: "",
        timeStamp: formatRFC7231(item.createdAt),
      };
    });
  };

  const data = transformData(memorizedScreenshots as Screenshot[]);

  return (
    <div className="w-full p-4 px-8">
      <h1 className="mb-4 text-xl font-semibold">History</h1>
      <div className="flex w-full flex-col">
        <div className="flex-1 py-4">
          <Table {...{ data, columns }} setStatusFilter={setStatusFilter} />
        </div>
      </div>
    </div>
  );
}

function Table({
  data,
  columns,
  setStatusFilter,
}: {
  data: ScreenshotData[];
  columns: ColumnDef<ScreenshotData>[];
  setStatusFilter: (statusFilter: string) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="w-full">
      <HistoryFilter table={table} setStatusFilter={setStatusFilter} />
      <table className="w-full border-2">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-2">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 py-6"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowDownUp />,
                          desc: <ArrowUpDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-b-2">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="truncate... px-4 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-8 flex items-center gap-2">
        <button
          className="rounded-md border-2 bg-blue-500 p-2 px-6 text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className="rounded-md border-2 bg-blue-500 p-2 px-6 text-white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
