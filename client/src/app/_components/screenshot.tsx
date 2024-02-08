"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import ImageModal from "./ImageModal";

export function Screenshot({ gallery }: any) {
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

  // const handleScreenshot = async () => {
  //   top50.forEach((item, i) => {
  //     setTimeout(() => {
  //       console.log(item);
  //       takeScreenshot.mutate({ url: item });
  //     }, 15000 * i);
  //   });
  // };

  if (!allScreenshots.data) return null;

  return (
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
                <td className="px-4">{item.status}</td>
                <td className="px-6">{item.createdAt.toDateString()}</td>
                <td>
                  <button
                    className="rounded-md bg-blue-200 px-4 py-2"
                    onClick={() => openModal(item.imageUrl)}
                  >
                    View Image
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
  );
}
