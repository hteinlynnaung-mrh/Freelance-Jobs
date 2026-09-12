# Archer project instructions

## Project shape

- `app/` is the React/Vite website.
- `api/` is the independent Express/Prisma/SQLite API.
- The mobile project has been removed from scope.
- Keep the website and API independently runnable; integrate through the documented HTTP API.

## Local development

- Use Node 24 for the API, as recorded in `api/.nvmrc`.
- Use pnpm and install dependencies from the directory being worked on.
- Website: run `pnpm dev` in `app/`; it serves on port `5000`.
- API: run `pnpm dev` in `api/`; it serves on port `5001`.
- The website uses the Vite `/api` proxy in local development. Keep `app/.env` `VITE_API_URL` empty unless a remote API is intentional.
- Do not commit secrets. Use `.env.example` files as templates.

## Implementation standards

- Use TypeScript and preserve the existing React, React Router, TanStack React Query, Express, Prisma, and Zod patterns.
- Validate request input at API boundaries and enforce authorization in the API, not only in the UI.
- Keep API responses and errors consistent with the existing `/api/v1` contract.
- Store money with an explicit `USD` or `THB` currency and integer minor units. Do not add payment, exchange-rate, escrow, or payout behavior without an explicit request.
- Prefer small, focused changes and do not rewrite unrelated user work.

## English/Burmese i18n

- Follow the project-local skill at `.cursor/skills/burmese-i18n/SKILL.md` for translated UI work.
- Add user-facing copy to both locale dictionaries and use the existing i18n provider rather than hardcoded component strings.
- Do not translate every technical or well-known UI term when English is clearer.
- Burmese text must have font-appropriate vertical space and must not use custom `letter-spacing`.
- Avoid fixed heights, clipping, and single-line assumptions that can break Burmese text.

## Verification

Before handing off changes, run the narrowest relevant checks. For website changes:

```bash
pnpm --dir app typecheck
pnpm --dir app build
```

For API changes:

```bash
pnpm --dir api typecheck
pnpm --dir api build
pnpm --dir api test
```

When database schema or seed data changes, also run the appropriate Prisma generate, migration, and seed commands with care for existing local data.
