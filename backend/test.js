import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Open browser in non-headless mode
    const page = await browser.newPage();

    await page.goto("https://www.codechef.com/contests", { waitUntil: "networkidle2" });

    // Wait for a few seconds to see if the page loads properly
    await new Promise(resolve => setTimeout(resolve, 5000));

    await browser.close();
})();
