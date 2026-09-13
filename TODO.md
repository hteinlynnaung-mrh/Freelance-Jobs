# Archer project TODO

This is the current implementation checklist for Archer. It reflects the code that exists today; unchecked items are not implemented or are only partially implemented.

## Current foundation

- [x] Web app created in `app/` with React, Vite, React Router, TanStack React Query, and shadcn-compatible configuration.
- [x] API created in `api/` with Express, TypeScript, SQLite, Prisma, JWT authentication, and Zod validation.
- [x] Seeded development database with demo clients, freelancers, skills, categories, and projects.
- [x] Public project marketplace homepage and project detail route.
- [x] API integration with local Vite `/api` proxy.
- [x] English/Burmese UI translation files and language switcher.
- [x] USD and THB display support.
- [x] Demo sign-in/register screen.
- [x] Local development ports documented: web `5000`, API `5001`.
- [x] Mobile app re-introduced in `mobile/` with Expo SDK 52, Expo Router v4, TanStack Query v5, NativeWind, English/Burmese i18n, and secure auth session management.
- [x] Light/dark theme toggle with system-preference initialization, persistence, and browser theme-color support.

## Not implemented — highest priority

### Authentication and user sessions

- [ ] Attach access tokens to authenticated API requests from the web client.
- [ ] Implement automatic access-token refresh using the refresh token.
- [ ] Restore the authenticated user after a page reload.
- [ ] Add sign-out behavior and session-expiry handling in the web app.
- [ ] Add protected routes and role-aware navigation.
- [ ] Add password reset and email verification flows.

### Client experience

- [ ] Client dashboard with project overview and activity.
- [ ] Create-project form with draft, validation, currency, budget, skills, and deadline fields.
- [ ] Edit, publish, pause, close, archive, and delete project screens.
- [ ] Proposal review screen with shortlist, reject, and accept actions.
- [ ] Engagement management screen.
- [ ] Client profile and settings screen.

### Freelancer experience

- [ ] Freelancer dashboard with active proposals and engagements.
- [ ] Freelancer profile editor with headline, bio, rates, availability, skills, and portfolio.
- [ ] Freelancer discovery page and profile detail page.
- [ ] Proposal submission form with cover letter, amount, currency, and duration.
- [ ] Proposal withdrawal and proposal-status screens.
- [ ] Engagement delivery, completion, and cancellation screens.

### Marketplace interactions

- [ ] Make the project save/bookmark button functional.
- [ ] Make the “Apply to this project” button functional.
- [ ] Add a complete project browsing page with pagination.
- [ ] Add search, category, skill, budget, currency, experience, and status filters.
- [ ] Add sorting and saved-search support.
- [ ] Add empty, loading, retry, and authorization states for every marketplace route.

### Messaging and notifications

- [ ] Web conversation list and message thread UI.
- [ ] Send-message flow with optimistic updates and error recovery.
- [ ] In-app notification center.
- [ ] Read/unread notification state and notification preferences.
- [ ] Real-time updates or polling strategy for messages and notifications.

### Reviews and trust

- [ ] Review form after completed engagements.
- [ ] Public review display on freelancer and client profiles.
- [ ] Ratings summary and review moderation.
- [ ] Report-content and dispute intake flows.

## Not implemented — API and data platform

- [ ] Complete API contract documentation, preferably with OpenAPI.
- [ ] Request rate limiting for authentication, messaging, and report endpoints.
- [ ] Centralized audit logging for sensitive actions.
- [ ] Stronger production password, token, CORS, and security-header configuration.
- [ ] Pagination and filtering consistency across every list endpoint.
- [ ] Transactional email integration.
- [ ] File and image upload storage for avatars and portfolios.
- [ ] Background jobs for notifications, email, and cleanup tasks.
- [ ] Database backup and restore process.
- [ ] Production migration and seed strategy that cannot overwrite live data.
- [ ] API integration tests for every authorization rule and lifecycle transition.

## Not implemented — payments and finance

- [ ] Payment provider integration.
- [ ] Escrow and milestone payments.
- [ ] Invoices and receipts.
- [ ] Payouts and withdrawals.
- [ ] Refunds, disputes, and payment webhooks.
- [ ] Currency conversion.

Currency display for USD and THB exists, but payment execution and conversion are intentionally out of scope for the current MVP.

## Not implemented — internationalization

- [ ] Translate dynamic project, category, skill, and profile data.
- [ ] Translate API validation and error messages.
- [ ] Add Burmese copy review by a native speaker.
- [ ] Add locale-aware number, date, and currency tests.
- [ ] Add language coverage checks so new UI text cannot bypass translation files.
- [ ] Decide whether English or Burmese should be the default for production users.

## Not implemented — quality and accessibility

- [ ] Web unit and component tests.
- [ ] Route tests for login, protected routes, marketplace filters, and API failures.
- [ ] End-to-end smoke tests for client and freelancer journeys.
- [ ] Responsive testing across mobile, tablet, and desktop breakpoints.
- [ ] WCAG 2.2 AA accessibility review.
- [ ] Keyboard navigation and focus-state review.
- [ ] Screen-reader labels and translated accessibility text review.
- [ ] Verify WCAG contrast for both light and dark themes.
- [ ] Test light/dark themes together with English/Burmese typography across routes and responsive breakpoints.
- [ ] Error monitoring and client-side query-error reporting.
- [ ] Performance review for images, fonts, JavaScript bundle size, and query waterfalls.

## Not implemented — deployment and operations

- [ ] Production hosting for the web app.
- [ ] Production hosting for the API and database.
- [ ] Separate development, staging, and production environment files.
- [ ] Secret management for JWT and database credentials.
- [ ] CI checks for typecheck, tests, build, and dependency policy.
- [ ] Deployment and rollback instructions.
- [ ] Health checks, uptime monitoring, structured logs, and alerting.
- [ ] Custom domain and HTTPS configuration.

## Suggested implementation order

1. Finish authentication persistence, token refresh, protected routes, and sign-out.
2. Build client project creation and freelancer proposal submission.
3. Build dashboards, proposal acceptance, and engagement lifecycle screens.
4. Complete saved projects, messaging, notifications, reviews, and profiles.
5. Add tests, accessibility checks, security hardening, and deployment automation.
6. Add payment integration only after the marketplace lifecycle is stable.
