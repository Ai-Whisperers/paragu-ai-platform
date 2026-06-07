# Branch protection policy — paragu-ai-platform
Target repo: `paragu-ai-platform`
How to apply: Settings → Branches → Add rule → Branch name pattern: `main`

## Required checks
- `ci` — must pass
- `build` — must pass
- `lint` — must pass

## Settings
- Require a pull request before merging
  - Required approvals: 2
  - Dismiss stale approvals: yes
  - Require review from code owners: yes
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Do not allow bypassing the above settings (admins included)
- Require linear history
- Allow force pushes: disabled
- Allow deletions: disabled
