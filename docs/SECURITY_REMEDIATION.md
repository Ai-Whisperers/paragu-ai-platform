# Security Remediation — Required Manual Actions

## Critical: 1 GitHub PAT leaked in git history

**Token:** `ghp_Rfi9...6irj` (masked)
**Compromised commits:**
- `928031f0` — standardization lock (apps/*/.npmrc touched)
- `44dfeee2` — security removal of cocodrilo-fitness/.npmrc
- `e3e4b412` — monorepo consolidation

### Steps to rotate:

1. **Go to GitHub → Settings → Developer settings → Personal access tokens**
2. **Revoke** the leaked PAT immediately
3. **Generate a new PAT** with `repo` scope
4. **Update root `.npmrc`** with the new token (env var `NODE_AUTH_TOKEN`)
5. **Push the updated .npmrc** to main
6. **Run `git filter-repo`** to scrub history (deferred — requires force push)

### Git history scrub command (when ready):
```bash
# Install git-filter-repo
pip install git-filter-repo

# Create a script to replace the token
echo 'ghp_Rfi9...6irj ==> FILTERED-PAT' > /tmp/replacements.txt

# Scrub history (CAREFUL: rewrites all commits)
cd /root/paragu-ai-platform
git filter-repo --replace-text /tmp/replacements.txt --force

# Force push (coordinate with team)
git push origin main --force-with-lease
```

## Status

- [x] Current working tree: clean (no leaked creds)
- [x] .npmrc files using env var pattern (no raw tokens)
- [ ] PAT rotation: **MANUAL ACTION REQUIRED**
- [ ] Git history scrub: **DEFERRED** (user decision)

## Supabase Keys

No Supabase service_role keys found in current git history scan. Previous `.env.bak` leak was removed. Verify in Supabase dashboard that the old key is still active and rotate if needed.
