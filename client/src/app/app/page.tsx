"use client";

import { api } from "~/trpc/react";

import { Screenshot,  } from "~/lib/types";
import { ProgressBar } from "../_components/Progressbar";


export default function Page() {
  const max = 300;

  const allscreenshots = api.screenshot.getAll.useQuery();
  const { data: screenshots =[] } = allscreenshots;
  
  const count = screenshots.length;

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
      </div>
    </div>
  );
}
