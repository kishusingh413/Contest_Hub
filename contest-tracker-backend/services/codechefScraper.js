import puppeteer from "puppeteer";

const CODECHEF_URL = "https://www.codechef.com/contests";


export const getCodeChefContests = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(CODECHEF_URL, { waitUntil: "networkidle2" });

        // Wait for contest table to appear
        await page.waitForSelector("div._flex__container_7s2sw_528", { timeout: 5000 });
        
        // Extract contest details
        const contests = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div._flex__container_7s2sw_528")).map(contest => {
                const nameElement = contest.querySelector("a span");
                const linkElement = contest.querySelector("a");
                const timeElements = contest.querySelectorAll("._timer__container_7s2sw_590 p");
        
                return {
                    name: nameElement ? nameElement.innerText.trim() : "Unknown Contest",
                    link: linkElement ? linkElement.href : "#",
                    startTime: timeElements.length > 0 ? Array.from(timeElements).map(el => el.innerText.trim()).join(" ") : "Unknown Time"
                };
            });
        });
        
    
        await browser.close();
        return contests;
    } catch (error) {
        if (browser) await browser.close();
        console.error("Error fetching CodeChef contests:", error.message);
        return [];
    }
};
