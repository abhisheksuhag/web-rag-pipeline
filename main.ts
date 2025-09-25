import { scrapeWired } from "./src/scraper";
import { embedArticles } from "./src/embedder";
import { upsertArticles } from "./src/qdrant";
import * as fs from 'fs';

async function main() {
  try {
    console.log("Starting scraping step...");
    await scrapeWired();

    console.log("Starting embedding step...");
    const embeddedData = await embedArticles("wired_articles.json");

    console.log("Saving embedded data...");
    fs.writeFileSync("wired_articles_embedded.json", JSON.stringify(embeddedData, null, 2), "utf-8");

    console.log("Starting Qdrant upload...");
    await upsertArticles("wired_articles_embedded.json");

    console.log("All steps completed successfully!");
  } catch (error) {
    console.error("Pipeline error:", error);
  }
}

main();
