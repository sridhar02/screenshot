"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";

export function Screenshot() {
  const [url, setUrl] = useState("");
  const utils = api.useUtils();

  const allScreenshots = api.screenshot.getAll.useQuery();

  const takeScreenshot = api.screenshot.create.useMutation({
    onSuccess: async () => {
      setUrl("");
      await utils.screenshot.getAll.invalidate();
    },
  });

  if (!allScreenshots.data) return null;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          takeScreenshot.mutate({ url });
        }}
        className="flex w-full flex-col justify-center"
      >
        <label htmlFor="url">
          URL:
          <input
            name="url"
            value={url}
            placeholder="Enter the URL"
            onChange={(e) => setUrl(e.target.value)}
            className="m-2 w-1/2 border-2 border-solid p-2"
          />
        </label>
        <button type="submit" className="w-40 rounded-md bg-blue-200 p-2">
          {takeScreenshot.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="">
        <div className="flex ">
          {allScreenshots.data.map((item, index) => (
            <div key={index} className="m-2 border-2 border-red-200 p-2">
              <h1>screenshot {index + 1}</h1>
              <img src={item.imageUrl} alt="asdas" className="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
