"use client";

import React, { useState, useMemo } from "react";
import { formatRFC7231 } from "date-fns";
import { Table as ReactTable, ColumnDef } from "@tanstack/react-table";

import { api } from "~/trpc/react";
import { Screenshot, ScreenshotData } from "~/lib/types";
import { HistoryTable } from "~/app/_components/HistoryTable";

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
          <HistoryTable
            {...{ data, columns }}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>
    </div>
  );
}
