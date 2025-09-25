# Web RAG Pipeline

A complete **web data Retrieval-Augmented Generation (RAG) pipeline** built with **TypeScript** and **Bun** that scrapes news articles using Selenium, embeds them with **Jina's cloud embeddings API**, and stores semantic vectors in **Qdrant** vector database for fast similarity search and AI-powered applications.

## Project Description
This project demonstrates an **end-to-end pipeline** that:

- Scrapes headlines and summaries from news websites (currently Wired) using Selenium-powered browser automation.
- Converts the scraped textual content into semantic vector embeddings via Jina's cloud neural embeddings API.
- Uploads and indexes these embeddings with metadata (headline and summary) into a Qdrant cloud-managed vector database optimized for similarity search.
- Enables downstream AI use cases such as semantic search, recommendation, or document retrieval over large volumes of web data.

## Features
- Modular scraper supporting expansion to multiple websites with clean separation.
- Easy-to-use Jina cloud API integration for fast and accurate embedding generation.
- Efficient, scalable storage and search with Qdrant vector database.
- TypeScript and Bun-powered for fast development and execution.
- Robust, production-ready practices including error handling and environment-based API configurations.

## Prerequisites
- Node.js or Bun installed (tested with Bun).
- Docker installed (optional, if you want local Qdrant).
- Jina.cloud API key.
- Qdrant cloud API key and URL.
- A modern browser and Chromedriver installed and accessible.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web-rag-pipeline.git
   cd web-rag-pipeline

2. Copy .env.example to .env and add your API keys:

  JINA_API_KEY=your_jina_api_key
  QDRANT_API_KEY=your_qdrant_api_key
  QDRANT_URL=https://your-qdrant-cloud-instance

3. Install dependencies:
  bun install

4. Run the full pipeline:
  bun run main.ts

## Project Structure
── main.ts           # Orchestrates scraping → embedding → DB storage 
src/
 ├── scraper.ts      # Selenium web scraping module
 ├── embedder.ts     # Jina cloud embedding API interface
 ├── qdrant.ts       # Qdrant cloud client and ingestion logic

.env                 # API keys and configs
package.json         # Scripts and dependencies

## Next Steps

Add more scrapers for other sources.
Implement query and retrieval functionality over Qdrant.
Add a frontend interface or API server for interactive search.
Explore advanced embedding techniques or hybrid search with metadata filtering.

## Summary

This pipeline serves as a foundational project for building powerful, scalable AI applications leveraging the synergy of web scraping, vector embedding, and similarity search.
