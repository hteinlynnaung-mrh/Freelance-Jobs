# Archer

Archer is a web-only freelance marketplace foundation. It connects clients and freelancers through project listings, profiles, proposals, engagements, messaging, notifications, and reviews. Payment processing, escrow, payouts, invoices, and currency conversion are intentionally not implemented.

## Repository layout

```text
app/   React + Vite website
api/   Express + Prisma 7 + SQLite API
```

The mobile project was removed from the scope. The website and API remain independently runnable.

## Technology

- Website: React, TypeScript, Vite, React Router, TanStack React Query, shadcn-compatible UI
- API: Express 5, TypeScript, Prisma 7, SQLite, JWT authentication, Zod validation
- Local currencies: USD and Thai Baht (`THB`/`฿`), stored explicitly without automatic conversion
- Local languages: English and Burmese

## Requirements

- Node.js 24 for the API (`api/.nvmrc`)
- pnpm

## Run locally

Install dependencies in each independent project:

```bash
pnpm --dir api install
pnpm --dir app install
```

Prepare the API database if needed:

```bash
pnpm --dir api db:generate
pnpm --dir api db:migrate --name init
pnpm --dir api db:seed
```

Start the API in one terminal:

```bash
pnpm --dir api dev
```

Start the website in another terminal:

```bash
pnpm --dir app dev
```

Open [http://localhost:5000](http://localhost:5000). The website forwards local `/api` requests to [http://localhost:5001](http://localhost:5001).

Verify the API with:

- [http://localhost:5001/health](http://localhost:5001/health)
- [http://localhost:5001/ready](http://localhost:5001/ready)

The API root is not a web page and may return `404`.

## Environment files

- `app/.env.example` documents `VITE_API_URL`. Leave it empty for the local Vite proxy.
- `api/.env.example` documents the API port, SQLite database, JWT secrets, token lifetimes, and CORS origins.
- Never commit production secrets. Replace the development JWT secret before deployment.

## Demo accounts

All seeded demo accounts use `ArcherDemo123!`:

- `admin@archer.local`
- `client1@archer.local`
- `freelancer1@archer.local`

## Useful checks

```bash
pnpm --dir app typecheck
pnpm --dir app build
pnpm --dir api typecheck
pnpm --dir api build
pnpm --dir api test
```

## Internationalization

Use the language switcher in the website to change between English and Burmese. Translation files are in `app/src/i18n/`. Burmese UI follows language-specific typography: it has more vertical space, avoids custom letter spacing, and keeps technical or familiar UI terms in English when that is clearer. See [the local i18n skill](.cursor/skills/burmese-i18n/SKILL.md) for implementation rules.

## Project status

See [TODO.md](TODO.md) for implemented and not-yet-implemented functionality. The API route inventory is documented in [api/README.md](api/README.md).
