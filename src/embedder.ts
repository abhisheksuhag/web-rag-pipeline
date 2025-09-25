import axios from "axios";
import * as fs from 'fs';
import * as dotenv from "dotenv";

dotenv.config();

const JINA_API_KEY = process.env.JINA_API_KEY;
if(!JINA_API_KEY) throw new Error (" JINA_API_KEY not found in .env");

const JINA_EMBED_URL = "https://api.jina.ai/v1/embeddings";

type Article = {
    headline : string;
    summary : string;
};
type EmbeddingResult = {
    input: string;
    embedding: number[];
};

export async function embedArticles(path: string): Promise<Array<Article & { embedding: number[] }>> {
    const articles: Article[] = JSON.parse(fs.readFileSync(path, "utf-8"));
    const texts = articles.map(a => `${a.headline} ${a.summary}`);

    try {
        const response = await axios.post(
        JINA_EMBED_URL,
        {
            model: "jina-embeddings-v3",
            task: "text-matching",
            input: texts
        },
        {
            headers: {
            Authorization: `Bearer ${JINA_API_KEY}`,
            "Content-Type": "application/json"
            }
        }
        );

        const embeddings: EmbeddingResult[] = response.data.data;
        return articles.map((article, i) => ({
        ...article,
        embedding: embeddings[i]?.embedding || []
        }));
    } catch (error) {
        console.error("Error during embedding:", error);
        throw error; 
    }
}