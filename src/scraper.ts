import { Builder , By, until} from "selenium-webdriver";
import * as fs from "fs";
require("chromedriver");

export async function scrapeWired() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.wired.com/category/gear/');
        await driver.sleep(3000);

        const articles = await driver.findElements(By.css('.SummaryItemWrapper-ircKXK'));
        const results: { headline: string; summary: string }[] = [];
        for (let i = 0; i < Math.min(20, articles.length); i++) {
            const article = articles[i];
            const headlineEl = await article.findElement(By.css('h3.SummaryItemHedBase-hnYOxl'));
            const headline = await headlineEl.getText();
            let summary = "";
            try {
                const summaryEl = await article.findElement(By.css('.SummaryItemDek-IjVzD'));
                summary = await summaryEl.getText();
            } catch {
                summary = "(No summary found)";
            }
            results.push({ headline, summary });
        }

        fs.writeFileSync("wired_articles.json", JSON.stringify(results, null, 2), "utf-8");
        console.log("Data saved to wired_articles.json");
    } finally {
        await driver.quit();
    }
};