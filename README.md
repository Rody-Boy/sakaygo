# SakayGo Web

SakayGo is a production-oriented frontend MVP for **Smarter Tricycle Booking & Courier Services** in Kabankalan City. It uses mock data only while presenting realistic rider, driver, courier, and admin workflows.

## Features
- Mock authentication with Rider, Driver, and Admin roles persisted in local storage.
- Rider booking flow with fare quote, nearby driver matching, and simulated trip lifecycle.
- Driver workspace with trip and availability context.
- Courier request simulation with tracking code, ETA, and service fee.
- Admin operations dashboard with fleet status, courier SLA, feedback, notifications, and charts.
- Responsive mobile-first UI, accessible controls, loading states, and mock map fallback.

## Tech Stack
- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS
- shadcn/ui-inspired primitives
- Lucide React icons
- Zustand state management
- React Hook Form + Zod validation
- Framer Motion-ready architecture
- Recharts analytics

## Architecture
The app follows feature-based, service-oriented frontend architecture:

```txt
src/app          Routes and layouts
src/components   Shared UI and map shell
src/features     Feature ownership area for future expansion
src/services     Async mock service layer replacing backend APIs
src/mock         Kabankalan-focused mock datasets
src/hooks        Client state hooks
src/types        Shared TypeScript contracts
src/lib          Utilities
```

UI routes consume services; services consume mock data. This keeps business behavior out of components and makes later REST API replacement straightforward.

## Phased Delivery Plan

### Phase 1: Deployment foundation
- Pin dependency versions instead of using `latest`.
- Keep project metadata and scripts readable and Vercel-friendly.
- Verify `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build` whenever package registry access is available.
- Commit a lockfile once installation succeeds.

### Phase 2: Architecture cleanup
- Move route-level UI into `src/features/*` modules. ✅
- Add reusable loading, skeleton, empty, error, and retry components. ✅
- Expand UI primitives while keeping app pages thin. ✅

### Phase 3: Product workflow depth
- Enrich ride, driver, courier, feedback, notification, and admin datasets. ✅
- Simulate multi-step booking lifecycle over time. ✅
- Add a Google Maps abstraction that gracefully falls back to mock maps without keys. ✅

### Phase 4: Production polish
- Complete accessibility review, responsive QA, performance pass, documentation updates, and final Vercel deployment verification. ✅

## Run Locally
```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel
1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the **Next.js** framework preset.
4. Keep the install command as `npm install`.
5. Keep the build command as `npm run build`.
6. Leave the output directory as the default managed by Next.js.
7. Optionally add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` later; the app must remain functional without it through mock maps.

No database, backend, ORM, or required environment variable is needed for the MVP.

## Final QA Checklist
- Verify keyboard navigation starts with the skip link and reaches every primary route.
- Validate mobile layouts at 320px, 360px, 390px, 768px, 1024px, and 1440px.
- Confirm `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is optional and mock maps render without it.
- Before production deployment, run `npm install`, commit `package-lock.json`, then run `npm run lint`, `npm run typecheck`, and `npm run build`.
- In Vercel, use the Next.js preset, `npm install` as install command, and `npm run build` as build command.

## Backend Migration Strategy
Replace methods in `src/services/*Service.ts` with HTTP client calls while preserving the current return types in `src/types`. Mock data can then become seed fixtures or contract-test data.

## Development Guidelines
- Keep UI components focused on rendering and user events.
- Put business logic in services or utilities.
- Keep strict TypeScript enabled and avoid `any`.
- Add loading, empty, error, and retry states for every new async workflow.
