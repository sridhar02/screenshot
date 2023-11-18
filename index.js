const express = require("express");
const puppeteer = require("puppeteer");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// puppeteer.Mouse(
//   AdblockerPlugin({
//     blockTrackers: true,
//   })
// );

const takeScreenshot = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage({ headless: "new" });

  await page.setViewport({
    width: 2880,
    height: 1800,
    deviceScaleFactor: 2,
  });

  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const screenshot = await page.screenshot({
    fullPage: true,
    type: "jpeg",
    quality: 100,
  });
  await browser.close();
  return screenshot;
};

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
    res.status(500).send("Error generating screenshot");
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
