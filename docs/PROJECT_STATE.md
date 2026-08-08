# YadaLearn — Project State

> Living snapshot for AI agents and humans. Update after every meaningful completed task. Always verify against the repository — do not trust this file alone.

**Last updated:** 2026-08-08 (Updated Stream Video meeting camera-muted circular avatar presentation and dynamic participant grid layout)

## Product snapshot

- Collaborative learning web app: students, teachers, parents.
- Stack in code: React 18 + TS + Vite, Supabase Auth + Postgres/RLS, Stream Video (primary meetings), LiveKit (limited Join Class path), Tailwind + shadcn/ui-style components, Netlify deploy.
- README still mentions Clerk; **code uses Supabase** — treat code as truth.

## Major areas present in repo

- Auth, role selection, onboarding, ProtectedRoute
- Student / teacher / parent dashboards and related pages
- Teacher–student links, connection requests, live classes, ratings, bookings
- Parent–student links and parent views
- Meeting page (Stream) + waiting room via Supabase Realtime
- Quick-action modals under `src/features/*`
- Design system: lavender/pastel tokens in `src/index.css` + Tailwind config
- Schema SQL files at repo root (base, update, parent)

## Recent Completed Work

- Refactored `CustomVideoPlaceholder` in `src/pages/Meeting.tsx` to render a centered circular profile avatar photo (or initials circle fallback) with display name centered underneath, matching Google Meet specs.
- Added `React.forwardRef` to `CustomVideoPlaceholder` to resolve the React ref warning when attached by Stream's Video component.
- Added `useParticipantViewContext` fallback in `CustomParticipantViewUI` to cleanly resolve participant properties (`isMuted`, `isSpeaking`, `name`) directly from Stream context.
- Created `CustomResponsiveGridLayout` to dynamically calculate row and column matrix dimensions based on total active participants ($N$).

## Active / pending tasks

- None pending.

## Environment (expected)

Public (client): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, optional `VITE_LIVEKIT_URL`, Stream client-facing keys as used by the app.

Server-only: `STREAM_SECRET` (token signing).

## Last verification

- Ran `cmd /c npx tsc --noEmit` - 0 errors.
- Ran `cmd /c npm run build` - successful Vite production build output.

