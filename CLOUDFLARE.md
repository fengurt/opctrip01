# Cloudflare Deployment Guide for opctrip01

## Prerequisites

1. **Cloudflare Account** with Pages and D1 enabled
2. **Wrangler CLI** installed: `npm i -g wrangler`
3. **GitHub repository** for CI/CD

## Initial Setup

### 1. Create D1 Database

```bash
wrangler d1 create opctrip01
```

Note the `database_id` from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "opctrip01"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 2. Run D1 Migrations

```bash
wrangler d1 migrations apply opctrip01 --local
```

### 3. Set Secrets

```bash
wrangler secret put JWT_SECRET
# Enter your JWT secret (min 32 characters)

wrangler secret put OAUTH_SERVER_URL
# Enter your OAuth server URL

wrangler secret put VITE_APP_ID
# Enter your App ID

wrangler secret put OWNER_OPEN_ID
# Enter the OpenID of the owner/admin user
```

### 4. Configure GitHub Secrets

In your GitHub repository settings, add these secrets:

- `CLOUDFLARE_API_TOKEN` - From Cloudflare dashboard
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `JWT_SECRET` - Your JWT secret
- `OAUTH_SERVER_URL` - OAuth server URL
- `VITE_APP_ID` - App ID
- `OWNER_OPEN_ID` - Owner OpenID
- `VITE_OAUTH_PORTAL_URL` - OAuth portal URL (for login redirect)

## Local Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Build for Cloudflare
pnpm build:cf

# Test locally with Cloudflare
pnpm start:cf
```

## Deployment

### Manual Deployment

```bash
pnpm deploy
```

### Automatic Deployment (GitHub Actions)

Push to `main` branch to trigger automatic deployment.

Pull requests get a preview deployment at `https://{branch}.opctrip01.pages.dev`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Session token signing secret | Yes |
| `OAUTH_SERVER_URL` | Manus OAuth server URL | Yes |
| `VITE_APP_ID` | OAuth App ID | Yes |
| `OWNER_OPEN_ID` | Admin user's OpenID | Yes |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal for login | Yes |

## Project Structure

```
├── functions/          # Cloudflare Pages Functions
│   └── _worker.ts      # Hono + tRPC API server
├── drizzle/            # Database schema & migrations
│   ├── cf-schema.ts    # Cloudflare D1 (SQLite) schema
│   └── migrations/     # SQL migrations
├── client/             # React frontend (Vite)
├── wrangler.toml       # Cloudflare config
└── .github/workflows/   # CI/CD
```
