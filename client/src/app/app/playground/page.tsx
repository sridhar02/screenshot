"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import queryString from "query-string";
import { Copy, MoveDown, MoveUp, Scan } from "lucide-react";

export default function Page() {
  const baseUrl = "https://api.screenshot.com/screenshot";

  const [selectSections, setSelectSections] = useState({
    essentials: true,
    fullPage: false,
    viewport: false,
    imageOptions: false,
    blocking: false,
    requestOptions: false,
    caching: false,
    waitDelayOptions: false,
  });

  const [params, setParams] = useState({
    url: "https://stripe.com",
    fullPage: false,
    scroll: false,
    imgFormat: "jpg",
    imgQuality: 80,
    signedRequests: false,
    width: "1920",
    height: "1280",
    deviceScaleFactor: "1",
    omitBackground: false,
    blockAds: false,
    blockCookieBanners: false,
    blockBannnersByHeuristics: false,
    blockTrackers: false,
    cacheTTL: 14400,
    delay: 0,
    timeOut: 60,
  });

  const [response, setResponse] = useState();
  const utils = api.useUtils();

  const takeScreenshot = api.screenshot.create.useMutation({
    onSuccess: async (data: any) => {
      setResponse(data);
      // await utils.screenshot.getAll.invalidate();
    },
  });

  const handleSelect = (value: any) => {
    const updatedState = { ...selectSections, ...value };
    setSelectSections(updatedState);
  };

  const handleCapture = () => {
    takeScreenshot.mutate({ url: params.url });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update the params state based on the input type
    const updatedParams = {
      ...params,
      [name]: type === "checkbox" ? checked : value,
    };

    // Remove parameters that should not be included (e.g., unchecked switches)
    // Object.keys(updatedParams).forEach((key) => {
    //   if (!updatedParams[key]) {
    //     delete updatedParams[key];
    //   }
    // });

    setParams(updatedParams);

    // Generate the new query string and update the URL directly
    // const newQueryString = queryString.stringify(updatedParams);
    // const newUrl = `${baseUrl}?${newQueryString}`;
    // console.log("Updated URL:", newUrl); // Or use this URL as needed
  };

  return (
    <div className="p-4 px-8">
      <h1 className="text-xl font-semibold">Playground</h1>
      <div className="flex gap-2 py-6">
        <div className="my-4 flex-1 flex-col">
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800"
              onClick={() =>
                handleSelect(
                  selectSections.essentials
                    ? { essentials: false }
                    : { essentials: true },
                )
              }
            >
              Essentials {selectSections.essentials ? <MoveUp /> : <MoveDown />}
            </h2>
            {selectSections.essentials && (
              <div className="my-4">
                <label>URL</label>
                <input
                  name="url"
                  value={params.url}
                  placeholder="Enter the URL"
                  onChange={(e) => handleInputChange(e)}
                  className="my-2 mb-4 w-full rounded-md border-2  border-solid p-2 focus:border-2 focus:border-black"
                />
                <p className="my-1 text-gray-500">
                  Any website you want to take screenshot of.
                </p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800"
              onClick={() =>
                handleSelect(
                  selectSections.fullPage
                    ? { fullPage: false }
                    : { fullPage: true },
                )
              }
            >
              Full page {selectSections.fullPage ? <MoveUp /> : <MoveDown />}
            </h2>
            {selectSections.fullPage && (
              <div>
                <h3 className="py-2 text-lg">Full page coming soon ...</h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800"
              onClick={() =>
                handleSelect(
                  selectSections.viewport
                    ? { viewport: false }
                    : { viewport: true },
                )
              }
            >
              Viewport {selectSections.viewport ? <MoveUp /> : <MoveDown />}
            </h2>
            {selectSections.viewport && (
              <div>
                <h3 className="py-2 text-lg">Viewport Coming soon .... </h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800 "
              onClick={() =>
                handleSelect(
                  selectSections.imageOptions
                    ? { imageOptions: false }
                    : { imageOptions: true },
                )
              }
            >
              Image options
              {selectSections.imageOptions ? (
                <MoveUp size={20} />
              ) : (
                <MoveDown size={20} />
              )}
            </h2>
            {selectSections.imageOptions && (
              <div>
                <h3 className="py-2 text-lg">Image Options coming soon ....</h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800 "
              onClick={() =>
                handleSelect(
                  selectSections.blocking
                    ? { blocking: false }
                    : { blocking: true },
                )
              }
            >
              Blocking ads,banners and more{" "}
              {selectSections.blocking ? (
                <MoveUp size={20} />
              ) : (
                <MoveDown size={20} />
              )}
            </h2>
            {selectSections.blocking && (
              <div>
                <h3 className="py-2 text-lg">Blocking coming soon... </h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800 "
              onClick={() =>
                handleSelect(
                  selectSections.requestOptions
                    ? { requestOptions: false }
                    : { requestOptions: true },
                )
              }
            >
              Request options
              {selectSections.requestOptions ? (
                <MoveUp size={20} />
              ) : (
                <MoveDown size={20} />
              )}
            </h2>
            {selectSections.requestOptions && (
              <div>
                <h3 className="py-2 text-lg">
                  Request Options coming soon ...
                </h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800"
              onClick={() =>
                handleSelect(
                  selectSections.caching
                    ? { caching: false }
                    : { caching: true },
                )
              }
            >
              Caching {selectSections.caching ? <MoveUp /> : <MoveDown />}
            </h2>
            {selectSections.caching && (
              <div>
                <h3 className="py-2 text-lg">Caching coming soon ...</h3>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2
              className="inline-flex text-lg font-medium text-blue-800"
              onClick={() =>
                handleSelect(
                  selectSections.waitDelayOptions
                    ? { waitDelayOptions: false }
                    : { waitDelayOptions: true },
                )
              }
            >
              Wait and delay options{" "}
              {selectSections.waitDelayOptions ? <MoveUp /> : <MoveDown />}
            </h2>
            {selectSections.waitDelayOptions && (
              <div>
                <h3 className="py-2 text-lg">Coming soon ...</h3>
              </div>
            )}
          </div>
        </div>

        <div className="ml-8 flex-1">
          <div className="mb-8">
            <div className="mb-3 flex justify-end">
              <button className="inline-flex rounded-md border-2 p-3 text-lg">
                <Copy />
                <span className="ml-2">Copy</span>
              </button>
            </div>
            <div className="scroll h-[200px] overflow-scroll bg-gray-300 p-3">
              {baseUrl}
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              onClick={handleCapture}
              className="inline-flex rounded-md bg-blue-800 p-3 px-6 font-medium text-white"
            >
              <Scan />
              <span className="ml-2">Screenshot</span>
            </button>
          </div>

          <div className=" w-full rounded-lg shadow-lg">
            <div className="h-96 w-full overflow-scroll rounded-b-lg bg-gray-100">
              {response ? (
                <img src={response.imageUrl} alt="screenshot_url" />
              ) : (
                <div className="flex h-full items-center justify-center p-2">
                  {!takeScreenshot.isLoading
                    ? 'Play with options and click on "Screenshot" to render the website'
                    : "Taking screenshot..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
