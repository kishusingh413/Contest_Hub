import axios from "axios";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from 'uuid';
import puppeteer from "puppeteer";

const LEETCODE_URL = "https://leetcode.com/contest/";

export const getLeetCodeContests = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        );

        await page.goto(LEETCODE_URL, { waitUntil: "networkidle2" });

        // Wait for contest cards to appear
        await page.waitForSelector(".swiper-slide", { timeout: 5000 });

        // Extract contests
        const contests = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".swiper-slide")).map((card) => {
                const name = card.querySelector(".truncate")?.innerText.trim();
                const linkElement = card.querySelector("a[href^='/contest/']");
                const link = linkElement ? "https://leetcode.com" + linkElement.getAttribute("href") : null;
                const contestId = uuidv4() ;
                const startTime = "00:00 00/00/0000" ;
                const platform = "LeetCode" ;
                
                return { name, link ,contestId, startTime, platform};
            });
        });

       //  console.log("Extracted Contests:", contests);

        await browser.close();
        return contests;
    } catch (error) {
        if (browser) await browser.close();
        console.error("Error fetching LeetCode contests:", error.message);
        return [];
    }
};
