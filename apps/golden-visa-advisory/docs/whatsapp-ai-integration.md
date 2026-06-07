## WhatsApp AI Agent — Integration Plan

Golden Visa Advisory handles sensitive client inquiries about residency, business setup, and legal services. The AI Agent can:

- Answer FAQs about visa types and requirements
- Collect initial client information
- Qualify leads (budget, timeline, goals)
- Schedule consultations with Raul

### Connection

The AI Agent at `whatsapp-ai.sunstein.cloud` handles all AI processing.

### Integration Steps

1. **Create an Evolution instance** for the Golden Visa WhatsApp Business number (595981000000 placeholder → real number)
2. **Seed LightRAG** with: visa types, requirements, pricing, team info
3. **Configure mode** as `ventas` (sales qualification)
4. **Replace WhatsApp placeholder** in the website with the connected number

### Privacy Note

Golden Visa handles sensitive personal/financial data. The AI Agent:
- Logs conversations for quality (stored on our VPS, not third parties)
- Never shares client data between instances
- Can be configured to escalate sensitive topics to Raul directly

### API Reference

See `/root/paragu-ai-builder/docs/whatsapp-ai-integration.md` for full API docs.
