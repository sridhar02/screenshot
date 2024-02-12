"use client";

import { api } from "~/trpc/react";

import { ProgressBar } from "../_components/Progressbar";

export default function Page() {
  const userMetrics = api.userMetrics.getCurrentMetrics.useQuery();
  const { data: metrics } = userMetrics;

  return (
    <div className="p-4 px-8">
      <h1 className="mb-4 text-2xl font-medium">Dashboard</h1>
      <div className="flex flex-col">
        <div className="w-1/2 rounded-md border-2 p-8">
          <div className="mb-4 flex justify-between">
            <p>Usage will reset on Mar 02, 2024</p>
            <div>
              {metrics?.screenshotTaken}/{metrics?.screenshotLimit}
            </div>
          </div>

          <ProgressBar
            progress={metrics?.screenshotTaken}
            max={metrics?.screenshotLimit}
          />
        </div>
      </div>
    </div>
  );
}
