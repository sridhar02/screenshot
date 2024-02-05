import express from "express";
import puppeteer from "puppeteer";
import morgan from "morgan";

// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(morgan("combined"));

// puppeteer.Mouse(
//   AdblockerPlugin({
//     blockTrackers: true,
//   })
// );

const takeScreenshot = async ({ url, options }) => {
  const {
    fullPage,
    deviceScaleFactor,
    width,
    height,
    delay,
    type,
    omitBackground,
  } = options;

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  await page.waitForTimeout(delay);

  await page.setViewport({
    width,
    height,
    deviceScaleFactor,
  });

  await page.goto(url, {
    // waitUntil: "networkidle2",
    waitUntil: ["load", "domcontentloaded"],
  });

  await scroll(page);

  const screenshot = await page.screenshot({
    fullPage,
    type,
    quality: 100,
    omitBackground,
  });
  await browser.close();
  return screenshot;
};

app.get("/status", (req, res) => {
  res.status(200).send({ Message: `website is working on ${port}` });
});

app.get("/screenshot", async (req, res) => {
  const {
    url,
    fullPage = false,
    deviceScaleFactor = 1,
    width = 1920,
    height = 1080,
    delay = 0,
    type = "jpeg",
    omitBackground = false,
  } = req.query;

  const options = {
    fullPage,
    deviceScaleFactor,
    width,
    height,
    delay,
    type,
    omitBackground,
  };

  if (!url) {
    return res.status(400).send("URL is required");
  }
  try {
    const screenshot = await takeScreenshot({ url, options });
    res.setHeader("content-Type", "image/jpeg");
    res.send(screenshot);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error generating screenshot", error });
  }
});

async function scroll(page) {
  return await page.evaluate(async () => {
    return await new Promise((resolve, reject) => {
      var i = setInterval(() => {
        window.scrollBy(0, window.innerHeight);
        if (
          document.scrollingElement.scrollTop + window.innerHeight >=
          document.scrollingElement.scrollHeight
        ) {
          window.scrollTo(0, 0);
          clearInterval(i);
          resolve();
        }
      }, 100);
    });
  });
}

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
