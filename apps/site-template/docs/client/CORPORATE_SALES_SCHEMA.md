# Corporate sales tracker schema

Core records for B2B outreach tracking.

## Tables

| Name | Purpose |
|---|---|
| `accounts` | Clinics, schools, companies |
| `contacts` | Decision-makers |
| `deals` | Active opportunities |
| `activities` | Calls, emails, demos |
| `proposals` | Documents and links |
| `renewals` | SLA terms and dates |

## Required fields
- `account_id`, `owner`, `stage`, `value`, `next_action_at`, `last_contact_at`

## SLA
- Hot lead response: < 15 minutes
- Demo follow-up: < 2 hours
- Proposal delivered: < 24 hours
- Renewal reminder: 30 days before expiry
