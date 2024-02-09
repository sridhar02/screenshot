import React from "react";
import { Table as ReactTable } from "@tanstack/react-table";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";

type OwnProps = {
  table: ReactTable<unknown>;
};

export const HistoryFilter = (props: OwnProps) => {
  const { table } = props;

  return (
    <div className="mb-2 flex items-center justify-between gap-8 px-6 py-4">
      <div>Status Filter</div>
      <input
        type="text"
        placeholder="Filter Options"
        className="flex-1 rounded-md border-2 p-2"
      />
      <div>Date Filter</div>
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select> */}
      <select
        className="rounded-md border-2 bg-white p-2"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {/* <option value="">Per Page</option>{" "} */}
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            show {pageSize}
          </option>
        ))}
      </select>
      <button className="rounded-md border-2 bg-blue-500 p-2 px-8 text-lg text-white">
        Filter
      </button>
    </div>
  );
};
