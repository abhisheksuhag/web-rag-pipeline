import { QdrantClient } from "@qdrant/js-client-rest";
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

if(!QDRANT_URL)throw new Error("QDRANT_URL is not present in .env");
if(!QDRANT_API_KEY) throw new Error("QDRANT_API_KEY is not present in .env");

const client = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
});

type EmbeddedArticle = {
    headline: string;
    summary: string;
    embedding: number[];
};

const COLLECTION_NAME = "new_articles";

export async function createCollection(VectorSize: number){

    const collections = await client.getCollections();
    const exists = collections.collections.some(collection => collection.name === COLLECTION_NAME);
    
    if (!exists) {
        await client.createCollection(COLLECTION_NAME, {
            vectors: {
                size: VectorSize,
                distance: "Cosine",
            },
        });
        console.log(`Qdrant collection '${COLLECTION_NAME}' created.`);
    } else {
        console.log(`Qdrant collection '${COLLECTION_NAME}' already exists.`);
    }
}

export async function upsertArticles(dataPath: string){
    const embeddedArticles: EmbeddedArticle[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    if( embeddedArticles.length === 0 ){
        console.log("No data to upsert");
        return;
    }   

    const points = embeddedArticles.map((article, idx) => ({
        id: idx,
        vector: article.embedding,
        payload: {
        headline: article.headline,
        summary: article.summary,
        },
    }));

    await createCollection(points[0].vector.length);

    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points: points,
    });
    console.log(`Upserted ${points.length} points into Qdrant collection '${COLLECTION_NAME}'.`);

}