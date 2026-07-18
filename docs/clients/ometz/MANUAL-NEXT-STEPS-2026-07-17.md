# Manual Next Steps — Ometz 2026-07-17

Everything below is **human action**. Once any of these lands, the rest auto-resumes.

---

## 🚨 #1 — Composio API key (Ivan, 2 min)

The 2026-07-14 leak burned the old key. The Composio MCP returns HTTP 410, blocking all FB/IG posting.

**Action:**
1. Go to **https://dashboard.composio.dev** → Settings → API Keys
2. Click **Re-generate API key** (or create a new one)
3. Copy the new key (`ck_…`)
4. In this terminal session, paste it via:

```bash
bash ~/.hermes/scripts/paste-secret.sh MCP_COMPOSIO_API_KEY
# then paste the key when prompted (NOT in this chat)
```

5. Verify with `bash ~/.hermes/scripts/validate-meta-stack.sh` — should show `composio: ✓`

After step 5, cron `social-queue-runner` (every 30 min) auto-picks up `~/.hermes/config/post-queue.jsonl` and schedules the 24 round-2 posts.

---

## #2 — Instagram reconnect (Ivan, 5 min · trap #18)

Currently Composio's IG token is for Ivan's personal IG (`ivan_weiss_van_der_pol`), not the Ometz business IG.

**Action:**
1. https://dashboard.composio.dev → Connected Accounts → Instagram → **Disconnect**
2. Open a new browser window; log out of all Instagram sessions
3. Log in to **`@dragabriellagp`** (Gaby's business IG)
4. Re-trigger Composio OAuth for Instagram
5. After OAuth completes: ask me to run `INSTAGRAM_GET_USER_INFO` to verify username is `dragabriellagp`
6. If still wrong: repeat from step 1

---

## #3 — Facebook Page UI (Gaby, 5 min)

These four cannot be programmatic (FB UI only):

| Step | Path | Value |
|---|---|---|
| 1 | Page Settings → Security → 2FA → Set up with phone | enable, save recovery codes |
| 2 | Page Settings → General → Username | `ometzdentalasuncion` |
| 3 | Page → "Add cover" → choose 1 of 3 candidates | (already uploaded, just select) |
| 4 | Page → Action Button → Try Messenger / WhatsApp | "Send WhatsApp Message", +595 981 146 759 |

---

## #4 — OG images (Ivan, ~10 min)

4 of 8 photos references in round-2 return 404 — without images the posts publish as text-only.

**Option A (recommended):** Top up fal.ai balance, then `image_generate` with the prompts in `docs/clients/ometz/posts/round-2/INDEX.md` → save → upload to ometzdental.com/og/

**Option B (offline):** Open Canva, generate at 1200×630, upload via Drive folder `Assets/` then I move them to /og/

---

## #5 — Google Business Profile (Gaby, 10 min)

Runbook: https://github.com/Ai-Whisperers/paragu-ai-platform/blob/main/docs/clients/ometz/google-business-profile-setup.md

Summary:
1. Open https://business.google.com → claim "Ometz Dental"
2. Verify via postcard (Google sends to Auditores de la Guerra del Chaco 617)
3. Reply here once code lands → I'll seed 5 Q&A and upload the same OG images as GBP photos

---

## ⏭️ Once #1 lands (Composio back), I will auto-pick-up:

| Action | Trigger |
|---|---|
| Schedule 24 round-2 posts (one per day Aug 10 → Sep 10) | cron `social-queue-runner` reads `~/.hermes/config/post-queue.jsonl` |
| Update FB About field with new copy | one Composio call |
| IG cross-post when posting to FB | hook in post creation |
| Cross-check first round-1 post analytics at Jul 22 | cron |

No further action from you required for these.

---

## 📋 Gaby's "when she's at consultorio" tasks

These need **Gaby in the office**, so list them here for the day she's there:

- 3-5 photos: consultorio, sala de espera, Gaby in lab coat (signed photo release)
- 30-sec vertical video: Gaby greeting + intro to consultorio (replaces TTS audio)
- Send all to Gaby's Drive folder, share to ai-whisperers@gmail.com
