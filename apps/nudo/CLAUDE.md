# Nüdo — AI Agent Guide

## Quick Links
- **Live:** https://nudo.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/nudo
- **Docker service:** nudo_web (2 replicas)
- **Traefik:** Host(`nudo.paragu-ai.com`)

## Pages
Single-page app with sections: hero, about, music, lyrics, merch, events, contact

## Sections (components/sections/)
hero-section, about-section, music-section, lyrics-section, merch-section, events-section, contact-section, header-section, footer-section

## Build & Deploy
npm run build && docker build -t nudo:prod . && docker stack deploy -c docker-compose.yml nudo
