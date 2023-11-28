"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost({ allScreenshots }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const utils = api.useContext();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  const [url, setUrl] = useState("");

  const takeScreenshot = api.screenshot.create.useMutation({
    onSuccess: () => {
      // router.refresh();

      setUrl("");
      allScreenshots.invalidate();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    takeScreenshot.mutate({ url });
  };

  return (
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createPost.mutate({ name });
    //   }}
    //   className="flex flex-col gap-2"
    // >
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     className="w-full rounded-full px-4 py-2 text-black"
    //   />
    //   <button
    //     type="submit"
    //     className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
    //     disabled={createPost.isLoading}
    //   >
    //     {createPost.isLoading ? "Submitting..." : "Submit"}
    //   </button>
    // </form>
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
        {takeScreenshot.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
