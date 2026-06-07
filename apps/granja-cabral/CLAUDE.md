# Granja Cabral — AI Agent Guide

## Quick Links
- **Live:** https://granjacabral.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/granja-cabral
- **Docker service:** granja-cabral_web (1 replica)

## Pages (page-configs)
Home, Productos, Blog, Mayorista, Contacto, FAQ

## Content
es.json + pages-config/ per page. Images.json for 50+ product photos.

## Build & Deploy
npm run build && docker build -t granja-cabral:prod . && docker stack deploy -c docker-compose.yml granja-cabral

## Critical Patterns
Farm-to-table. B2C + B2B (mayorista). WhatsApp ordering. Image-heavy.
