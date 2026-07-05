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

## Run Locally
```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deployment
Deploy directly to Vercel from GitHub. No database, backend, or required environment variables are needed. A future Google Maps key can be added without breaking the mock map fallback.

## Backend Migration Strategy
Replace methods in `src/services/*Service.ts` with HTTP client calls while preserving the current return types in `src/types`. Mock data can then become seed fixtures or contract-test data.

## Development Guidelines
- Keep UI components focused on rendering and user events.
- Put business logic in services or utilities.
- Keep strict TypeScript enabled and avoid `any`.
- Add loading, empty, error, and retry states for every new async workflow.
