"use client";

import { useState } from "react";
import { api } from "~/trpc/server";

export const Screenshot = () => {
  const [url, setUrl] = useState("");

  const takeScreenshot = api.screenshot.create.useMutation({
    onSuccess: () => {
      setUrl("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    takeScreenshot.mutate({ url });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
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
          Send
        </button>
      </form>
    </div>
  );
};
