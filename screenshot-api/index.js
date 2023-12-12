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

const takeScreenshot = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const screenshot = await page.screenshot({
    // fullPage: true,
    type: "jpeg",
    quality: 100,
  });
  await browser.close();
  return screenshot;
};

app.get("/status", (req, res) => {
  res.status(200).send({ Message: `website is working on ${port}` });
});

app.get("/screenshot", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL is required");
  }
  try {
    const screenshot = await takeScreenshot(url);
    res.setHeader("content-Type", "image/jpeg");
    res.send(screenshot);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error generating screenshot", error });
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
