import React from "react";
import { XCircle, HelpCircle, CheckCircle2 } from "lucide-react";
import { Table as ReactTable } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type OwnProps = {
  table: ReactTable<unknown>;
};

export const HistoryFilter = (props: OwnProps) => {
  const { table } = props;

  return (
    <div className="mb-2 flex items-center justify-between gap-8 py-4">
      <div>
        <Select
          onValueChange={(e) => {
            console.log(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status:All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="success">
              <div className="inline-flex items-center justify-center gap-2">
                <CheckCircle2 color="green" />
                Success
              </div>{" "}
            </SelectItem>
            <SelectItem value="error">
              <div className="inline-flex items-center justify-center gap-2">
                <XCircle color="red" /> Error
              </div>
            </SelectItem>
            <SelectItem value="pending">
              <div className="inline-flex items-center justify-center gap-2">
                <HelpCircle color="blue" /> Pending
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <input
        type="text"
        placeholder="Filter Options"
        className="flex-1 rounded-md border-2 p-2"
      />
      <div>Date Filter</div>

      <Select
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Per Page" />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={String(pageSize)}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <button className="rounded-md border-2 bg-blue-500 p-2 px-8 text-lg text-white">
        Filter
      </button> */}
    </div>
  );
};
