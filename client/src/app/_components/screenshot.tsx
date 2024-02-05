"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import ImageModal from "./ImageModal";

export function Screenshot({ gallery }: any) {
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

  const handleScreenshot = async () => {
    top50.forEach((item, i) => {
      setTimeout(() => {
        console.log(item);
        takeScreenshot.mutate({ url: item });
      }, 15000 * i);
    });
  };

  if (!allScreenshots.data) return null;

  return (
    <div>
      <button onClick={handleScreenshot}>Get top 100 screenshots</button>
      {!gallery ? (
        <>
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
        </>
      ) : (
        <div className="flex flex-wrap p-2 ">
          {allScreenshots.data.map((item, index) => (
            <div className="m-2" key={index}>
              <h1 className="bg-blue-300 p-2 text-xl ">
                {item.userProvidedUrl}
              </h1>
              <img
                src={item.imageUrl}
                className="m-2 h-[400px] w-[500px]"
                alt={`screenshot ${index}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const top50 = [
  "youtube.com",
  "en.wikipedia.org",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "amazon.com",
  "whatsapp.com",
  "pinterest.com",
  "imdb.com",
  "play.google.com",
  "microsoft.com",
  "es.wikipedia.org",
  "apple.com",
  "linkedin.com",
  "globo.com",
  "de.wikipedia.org",
  "fandom.com",
  "nytimes.com",
  "tiktok.com",
  "fr.wikipedia.org",
  "reddit.com",
  "ja.wikipedia.org",
  "yahoo.co.jp",
  "uol.com.br",
  "translate.google.com",
  "spboss.blog",
  "satta-king-fixed-no.in",
  "mayoclinic.org",
  "it.wikipedia.org",
  "indeed.com",
  "nih.gov",
  "amazon.in",
  "netflix.com",
  "rakuten.co.jp",
  "yelp.com",
  "bbc.co.uk",
  "quora.com",
  "xosodaiphat.com",
  "booking.com",
  "detik.com",
  "etsy.com",
  "ru.wikipedia.org",
  "flipkart.com",
  "espn.com",
  "walmart.com",
  "tripadvisor.com",
  "indiatimes.com",
  "dpboss.services",
  "cricbuzz.com",
  "amazon.de",
  "mail.yahoo.com",
  "webmd.com",
  "xoso.com.vn",
  "ikea.com",
  "pt.wikipedia.org",
  "sarkariresult.com",
  "healthline.com",
  "amazon.co.jp",
  "canva.com",
  "amazon.co.uk",
  "britannica.com",
  "hurriyet.com.tr",
  "doeda.com",
  "ebay.com",
  "speedtest.net",
  "adobe.com",
  "ilovepdf.com",
  "byjus.com",
  "bbc.com",
  "id.wikipedia.org",
  "pl.wikipedia.org",
  "zh.wikipedia.org",
  "clevelandclinic.org",
  "merriam-webster.com",
  "homedepot.com",
  "allegro.pl",
  "samsung.com",
  "ar.wikipedia.org",
  "espncricinfo.com",
  "kompas.com",
  "snaptik.app",
  "cambridge.org",
  "investing.com",
  "nike.com",
  "medlineplus.gov",
  "yandex.com",
  "tokopedia.com",
  "roblox.com",
  "live.com",
  "target.com",
  "support.google.com",
  "spotify.com",
  "wiktionary.org",
  "mercadolivre.com.br",
  "trendyol.com",
  "sofascore.com",
  "tr.wikipedia.org",
  "cnn.com",
  "medicalnewstoday.com",
  "as.com",
];
