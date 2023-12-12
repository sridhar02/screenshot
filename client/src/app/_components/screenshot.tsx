"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import ImageModal from "./ImageModal";

export function Screenshot() {
  const [url, setUrl] = useState("");
  const utils = api.useUtils();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const openModal = (url: string) => {
    setModalVisible(true);
    setImageUrl(url);
  };

  const closeModal = () => {
    setModalVisible(false);
    setImageUrl("");
  };

  const allScreenshots = api.screenshot.getAll.useQuery();

  const takeScreenshot = api.screenshot.create.useMutation({
    onSuccess: async () => {
      setUrl("");
      await utils.screenshot.getAll.invalidate();
    },
  });

  const handleDownload = (url: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded_image.jpg"; // You can specify the filename here
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  if (!allScreenshots.data) return null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          takeScreenshot.mutate({ url });
        }}
        className="mt-4 flex w-full flex-col justify-center border-2 border-solid p-4"
      >
        <label htmlFor="url" className="text-lg">
          Enter Screenshot URL:
          <input
            name="url"
            value={url}
            placeholder="Enter the URL"
            onChange={(e) => setUrl(e.target.value)}
            className="my-2 mb-4 w-full border-2 border-solid p-2"
          />
        </label>
        <div className="flex justify-end">
          <button type="submit" className="w-40 rounded-md bg-blue-200 p-2">
            {takeScreenshot.isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="">
        <div className="">
          <table className="mt-8 w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>url</th>
                <th>status</th>
                <th>created on</th>
              </tr>
            </thead>
            <tbody>
              {allScreenshots.data.map((item, index) => (
                <tr key={index} className="p-4">
                  <td>{index + 1}</td>
                  <td className="px-4">
                    <a
                      className="hover:text-blue-500"
                      href={item.userProvidedUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.userProvidedUrl}
                    </a>
                  </td>
                  <td className="px-4">success</td>
                  <td className="px-6">{item.createdAt.toDateString()}</td>
                  <td>
                    <button
                      className="rounded-md bg-blue-200 px-4 py-2"
                      onClick={() => openModal(item.imageUrl)}
                    >
                      View Image
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDownload(item.imageUrl)}
                      className="mx-8 rounded-md bg-blue-200 px-4 py-2"
                    >
                      download
                    </button>
                  </td>
                  <td>
                    <button className="rounded-md bg-gray-200 px-4 py-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalVisible && (
            <ImageModal imageUrl={imageUrl} onClose={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
}
