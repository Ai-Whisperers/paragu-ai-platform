# Messaging AI Agent — Integration Plan

Mantra SPA — wellness. Messaging for bookings. AI can handle: service menu, pricing, appointment booking, gift certificates.

The AI Agent at `messaging-ai.sunstein.cloud` handles Messaging conversations using DeepSeek AI with per-client memory (LightRAG) and business tools.

## Connection

The AI Agent processes messages via Evolution API instances. When a customer messages the client's Messaging Business number, the AI responds with:
- Context from past conversations (LightRAG graph memory)
- Accurate business info (products, pricing, policies)
- Sales scripts or support protocols based on mode

## Integration Steps

1. **Create an Evolution instance** for the client's Messaging Business number
2. **Seed LightRAG** with: product catalog, FAQ, pricing, policies
3. **Configure AI mode** (`ventas` for sales, `soporte` for support, `default` for general)
4. **Replace static Messaging number** on the website with the AI-connected number

## API Reference

- **Create client:** `POST https://messaging-ai.sunstein.cloud/clients`
- **List clients:** `GET https://messaging-ai.sunstein.cloud/clients`
- **Health check:** `GET https://messaging-ai.sunstein.cloud/health`

See `/root/paragu-ai-builder/docs/messaging-ai-integration.md` for full documentation.
