"use client";

import { Clipboard, EyeOff, Eye, ClipboardCheck } from "lucide-react";
import { useState } from "react";

import { api } from "~/trpc/react";

type keyTypeResponse = {
  data: {
    key: string;
  };
};

export default function Page() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("password");
  const [isCopied, setIsCopied] = useState(false);

  const keyResponse = api.apiKeys.getAPIKey.useQuery();

  const { data = { key: "" } } = keyResponse;

  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
    setShow(!show);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.key);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full p-4 px-8">
      <h1 className="my-5 text-xl font-semibold">Access</h1>
      <div className="w-full rounded-md border-2 p-5">
        <h2 className="text-lg font-medium">Access key</h2>
        <p className="text-md my-3 text-gray-500">
          Use your access key to access API
        </p>
        <div className="flex items-center gap-8">
          <input
            type={type}
            className="flex-auto border-2 p-2"
            value={data.key}
            readOnly
          />
          <div className="cursor-pointer" onClick={handleClick}>
            {!show ? <Eye /> : <EyeOff />}
          </div>
          <div className="cursor-pointer" onClick={handleCopy}>
            {!isCopied ? <Clipboard /> : <ClipboardCheck />}
          </div>
          {/* <button className="rounded-md bg-red-500 p-2 px-4 text-white">
            Regenerate
          </button> */}
        </div>
      </div>
    </div>
  );
}
