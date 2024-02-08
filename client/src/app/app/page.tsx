"use client";

import { api } from "~/trpc/react";

import { ProgressBar } from "../_components/Progressbar";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  const allscreenshots = api.screenshot.getAll.useQuery();

  const groupByDate = (dataArray: any = []) => {
    return dataArray.reduce((acc: any, item: any) => {
      const dateKey =
        new Date(item.createdAt).toISOString().split("T")[0] || "";
      console.log(dateKey);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(item);
      return acc;
    }, {});
  };

  const grp = groupByDate(allscreenshots.data);

  const data = Object.keys(grp).map((date) => {
    return {
      date: date, // The date string
      items: grp[date], // All items associated with this date
    };
  });

  const count = allscreenshots.data?.length;

  const max = 300;

  return (
    <div className="p-4 px-8">
      <h1 className="mb-4 text-2xl font-medium">Dashboard</h1>
      <div className="flex flex-col">
        <div className="w-1/2 rounded-md border-2 p-8">
          <div className="mb-4 flex justify-between">
            <p>Usage will reset on Mar 02, 2024</p>
            <div>
              {count}/{max}
            </div>
          </div>

          <ProgressBar progress={count} max={max} />
        </div>
        {/* <div className="mt-4 rounded-md border-2 p-2">usage graph</div> */}
      </div>
    </div>
  );
}
