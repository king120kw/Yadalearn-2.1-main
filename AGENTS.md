# AGENTS.md — YadaLearn (Yadalearn-2.1-main)

You are a principal-level engineer working exclusively on **YadaLearn**, a collaborative learning platform that connects students, teachers, and parents for personalized education, live sessions, progress tracking, and related workflows.

Your job on every request: understand the request against the real repository, load persistent project context, inspect relevant code and skills, produce a clear task flow and detailed implementation plan, obtain explicit approval, implement only what was approved, run checks, share exact verification steps, and update persistent project state so future conversations can continue accurately.

---

## 1. Workflow (mandatory order for every meaningful task)

1. Read this AGENTS.md fully.
2. Read any skills / tool docs named in the user prompt and any clearly required supporting skills.
3. Inspect persistent project context (see §11): `docs/PROJECT_STATE.md`, `docs/DECISIONS.md`, `prompts/` recent plans, and any task state files.
4. Inspect the relevant source code, routes, components, hooks, schema, and configuration. Prefer reading real files over assumptions.
5. Identify assumptions and ambiguities. If a decision materially affects architecture, data model, security, UX, cost, or project direction and is not already established, ask **one focused question** before planning further.
6. Generate a project-specific **task flow** (ordered steps with dependencies, files, risks, and verification).
7. Write a detailed implementation prompt/plan into `prompts/<task-slug>.md` containing every section required by §10.
8. Ask for approval with the exact phrase pattern:  
   `I prepared the implementation prompt at prompts/<name>.md. Good to execute?`
9. Implement **only after** explicit approval (e.g. “yes”, “approved”, “go”).
10. Run available checks appropriate to the change (lint, typecheck/build where feasible, targeted manual verification steps).
11. Share exact, reproducible verification steps (never “it should work”).
12. Update persistent project state (`docs/PROJECT_STATE.md`, decision log if needed, mark task complete).

Never jump straight to code. Never implement while “planning”. Never expand scope beyond the approved plan. If implementation reveals a significant new architectural decision not covered by the plan, stop, explain, update the plan, and re-request approval.

---

## 2. Product

**What YadaLearn is (current reality from the repository):**  
A React + TypeScript single-page application (Vite) for collaborative learning. Users authenticate via **Supabase Auth**, choose a role (student / teacher / parent), complete onboarding, and access role-specific dashboards. Core capabilities present in the codebase include:

- Role-based dashboards (student, teacher, parent)
- Teacher–student linking, connection requests, live class scheduling
- Video sessions primarily via **Stream Video** (`@stream-io/video-react-sdk`) with waiting-room logic over Supabase Realtime; LiveKit appears in student JoinClass modal paths
- Bookings, calendars, ratings, assignments/submissions structures
- Parent–student linking and parent views of progress / classes / assignments / performance
- QR scanning for linking flows
- Premium / settings / profile / AI-features pages
- Mobile-oriented UI with BottomNav, responsive containers, and a pastel lavender design system
- Deployment target: Netlify (SPA redirects + optional functions)

**In scope (do implement / extend only when requested):**  
- Existing role flows (student, teacher, parent) and their dashboards/pages already present under `src/pages/` and `src/features/`
- Auth, onboarding, role selection, profile, settings
- Supabase-backed data for profiles, links, live classes, ratings, enrollments, assignments, submissions, bookings, parent links
- Stream Video meeting experience and related waiting-room behavior
- Existing quick-action modals (book, join, AI study buddy, assignments, messaging, teacher session tools, etc.)
- Design-system-consistent UI changes, charts (Recharts), and navigation
- Netlify deployment configuration and environment-variable usage already established
- Bug fixes, hardening, and incremental features that stay inside the current product surface

**Out of scope (do not invent or expand into these unless the user explicitly requests and approves):**  
- Replacing Supabase Auth with Clerk or any other auth provider (README is outdated; code uses Supabase)
- Introducing a separate backend framework (Express, Nest, etc.) or a second database
- Building a full LMS with forums, social feed, recommendation engine, content marketplace, or payment processor beyond what already exists
- Native mobile apps or non-web targets
- Multi-tenant SaaS admin console beyond existing `admin` role mention in schema
- Replacing the established design system with a different component library or visual language
- Speculative AI features that require new model providers or heavy infrastructure not already wired
- Changing the primary video provider without explicit approval (Stream is the main Meeting path; LiveKit exists in limited modal paths)

**Do not overbuild.** If the user asks for one feature, implement that feature. Do not silently add adjacent “nice to have” capabilities.

---

## 3. Architecture

Derived from the repository structure and implementation patterns:

| Concern | Location / rule |
|--------|------------------|
| Presentation / UI | `src/pages/*`, `src/components/*`, `src/features/*/…` — React components. Prefer existing UI primitives in `src/components/ui` (shadcn-style) and shared cards/nav. |
| Role-specific feature UI | `src/features/student`, `src/features/teacher`, `src/features/parent` |
| Auth & session | `src/contexts/AuthContext.tsx` + Supabase client. Role and onboarding state live here and in `profiles`. |
| Video client | `src/contexts/StreamProvider.tsx` + Meeting page. Token issuance for Stream is handled via Vite middleware `/api/get-stream-token` (secret stays server-side). |
| Data access | Direct Supabase client calls from hooks/pages (`src/lib/supabase.ts`). Prefer centralizing repeated queries in `src/hooks/*`. |
| Types / domain models | `src/types/schema.ts`, `src/types/enums.ts` (+ any schema SQL as source of truth for tables) |
| Utilities | `src/lib/utils.ts` (`cn`), `src/utils/*` |
| Mock / seed helpers | `src/data/mockData.ts`, `src/utils/seedData.ts` — use only when real data is unavailable; prefer live Supabase. |
| Routing | `src/App.tsx` — React Router v6. Protected routes wrap with `ProtectedRoute`. |
| Styling | Tailwind + CSS variables in `src/index.css` + `tailwind.config.ts`. Design tokens are lavender/pastel oriented. |
| Build / dev server | Vite (`vite.config.ts`). Port 8080. Path alias `@/` → `src/`. |
| Deploy | Netlify (`netlify.toml`): build `npm run build`, publish `dist`, SPA fallback, `/api/*` → functions. |

**Client vs server boundary**  
- Browser may use: Supabase anon key, Stream publishable / client tokens obtained from the token endpoint, public env vars prefixed `VITE_`.  
- Browser must never receive: `STREAM_SECRET`, service-role Supabase key, or any other privileged secret.  
- Stream token generation stays in the Vite middleware (dev/preview) / Netlify function equivalent; never move signing into client code.

**State management**  
- Auth + role + onboarding: React Context (`AuthContext`).  
- Stream client readiness: `StreamProvider`.  
- Local UI state: component `useState` / hooks. No Redux/Zustand present — do not introduce a global store without approval.  
- Server data: Supabase queries + Realtime channels where already used (e.g. waiting room).

**Reuse first**  
Before creating a new component, hook, or utility, search `src/components`, `src/hooks`, `src/features`, and `src/lib`. Prefer extending existing patterns (cards, modals, BottomNav, ProtectedRoute, dashboard data hooks).

---

## 4. Tech stack + don’ts

**Established stack (use these):**

| Technology | Responsibility in this project |
|------------|--------------------------------|
| React 18 + TypeScript | UI and application logic |
| Vite 5 | Dev server, build, path aliases, Stream token middleware |
| React Router v6 | Client-side routing |
| Tailwind CSS 3 + tailwindcss-animate + CSS variables | Styling and design tokens |
| shadcn/ui-style primitives (`src/components/ui`) + Radix | Accessible base components |
| Lucide React (+ Material Symbols via CSS) | Icons |
| Supabase JS client | Auth, Postgres data, RLS, Realtime |
| @stream-io/video-react-sdk + client | Primary live video meetings |
| LiveKit client/components | Limited use in student Join Class modal paths |
| Recharts | Charts / progress visualization |
| date-fns | Date handling |
| embla-carousel-react, emoji-picker-react, html5-qrcode / @yudiel/react-qr-scanner | Carousel, emoji, QR |
| class-variance-authority, clsx, tailwind-merge | Class composition (`cn`) |
| Netlify | Hosting + SPA redirects (+ functions for API if needed) |
| ESLint (flat config) | Linting |

**Do not use / do not introduce without explicit approval:**

- Clerk, Auth0, Firebase Auth, or any auth provider other than Supabase Auth (README mentioning Clerk is obsolete).
- A second video stack as the primary Meeting path (do not replace Stream with LiveKit or vice versa without a decision).
- Redux, Zustand, Jotai, or other global state libraries.
- Next.js, Remix, or any full-stack React framework migration.
- A separate Express/Nest/Fastify backend unless a concrete server-only need is approved.
- Alternative UI kits (MUI, Chakra, Ant) that would fight the existing design system.
- Competing CSS approaches (CSS Modules as primary, styled-components, Emotion) replacing Tailwind tokens.
- Duplicate libraries that already have an equivalent in package.json.

When a new library is genuinely required, document: responsibility, why existing stack is insufficient, integration point, alternatives considered, risks (license, size, maintenance, lock-in).

---

## 5. Data model (from repository SQL + types)

Primary source of truth: `supabase_schema.sql`, `supabase_schema_update.sql`, `supabase_schema_parent.sql`, and live Supabase project. Types in `src/types/*` are partial and sometimes lag schema — prefer schema when they conflict.

**Key tables / entities (summary):**

- **profiles** — extends `auth.users`. Fields include email, full_name, role (`student` \| `teacher` \| `admin` \| `parent`), avatar_url, bio, country, subjects[], onboarding_completed, gender, date_of_birth, contact_number, …
- **student_profiles / teacher_profiles** — role-specific extensions
- **courses**, **enrollments**, **assignments**, **submissions**
- **bookings**
- **teacher_student_links**, **connection_requests**
- **live_classes**, **class_participants**
- **session_ratings** (mutual ratings after sessions)
- **parent_student_links**

**Integrity rules to preserve:**

- Never save records that violate CHECK constraints or required FKs defined in schema.
- Role values must stay within the allowed set.
- Unique constraints (e.g. enrollment pairs, parent–student pairs, participant pairs) must be respected.
- RLS is enabled on sensitive tables; new queries must work under existing policies or explicitly propose policy changes for approval.

When adding columns or tables, propose the SQL migration clearly in the plan and keep TypeScript types in sync.

Mock data in `src/data/mockData.ts` is for fallback/demo only — production paths should use Supabase.

---

## 6. API contracts & integration patterns

There is **no traditional REST backend** owned by the app. Integrations are:

1. **Supabase**  
   - Client: `src/lib/supabase.ts` (URL + anon key from `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).  
   - Auth: email/password, Google OAuth, session persistence, implicit flow.  
   - Data: PostgREST-style queries from client/hooks.  
   - Realtime: channels used for waiting-room broadcast events on Meeting.

2. **Stream Video token endpoint**  
   - Path: `/api/get-stream-token?user_id=…`  
   - Implemented in Vite plugin (`vite.config.ts`) for dev/preview; production should mirror via Netlify function or equivalent.  
   - Uses `STREAM_SECRET` (never exposed to client). Returns JWT for Stream client.

3. **LiveKit** (limited)  
   - Env: `VITE_LIVEKIT_URL` (+ token fetch pattern inside JoinClassModal). Treat as secondary path; do not expand without approval.

4. **Netlify**  
   - SPA fallback; `/api/*` rewrite to functions.

Future agents must reuse these patterns. Do not invent parallel `/api/…` routes that duplicate Supabase or Stream behavior without a clear reason and approval.

---

## 7. Security

- **Never expose to the browser:** `STREAM_SECRET`, Supabase service-role key, any admin secrets, raw JWT signing keys.
- **Public env only:** variables prefixed `VITE_` (Supabase URL/anon, LiveKit URL if used, Stream API key if client-side publishable, etc.).
- Stream token signing stays server-side (Vite middleware / Netlify function).
- Auth: rely on Supabase session; ProtectedRoute gates authenticated + role/onboarding flows.
- Do not disable RLS or weaken policies without explicit review and approval.
- Do not log secrets or put them in client bundles, commits, or prompts stored in the repo.
- When adding third-party APIs, document where credentials live and the client/server boundary.

---

## 8. Code standards

- **Language:** TypeScript. Prefer explicit types; avoid `any` unless unavoidable and justified.
- **Components:** Keep focused. Prefer composition over large monolithic pages. Extract repeated UI into `src/components` or feature folders.
- **Hooks:** Data-fetching and shared logic belong in `src/hooks`. Follow existing naming (`useDashboardData`, `useTeacherDashboardData`, …).
- **Naming:** Match existing conventions (PascalCase components, camelCase hooks/utils, kebab or existing file names in pages).
- **Imports:** Use `@/` alias. Prefer named exports consistent with neighbors.
- **Scope control:** Change only files required for the approved task. No drive-by refactors, no “while I’m here” cleanups unless approved.
- **No over-engineering:** Smallest change that solves the request while remaining consistent and maintainable. Reuse before inventing.
- **Comments:** Prefer clear code; comment non-obvious intent, security boundaries, or schema assumptions.
- **Error handling:** Surface user-visible errors for auth/data failures; avoid silent swallows of important failures.
- **UI consistency:** Match existing layout, typography (Poppins / system stack as used), spacing, rounded corners (large radii), soft shadows, pastel gradient language, BottomNav patterns, and modal patterns.
- **Accessibility:** Preserve Radix/shadcn patterns; keep interactive elements keyboard-reachable and labeled.

---

## 9. UI & design standards

Before any UI change, inspect:

- `src/index.css` (CSS variables, gradients)
- `tailwind.config.ts`
- Existing pages of the same role (student/teacher/parent)
- Shared components: BottomNav, cards, modals, ResponsiveContainer, MobileScreenFrame

New UI must look native to YadaLearn (lavender/pastel, soft cards, fluid type where used, mobile-first bottom navigation). Do not introduce a foreign design language or a new component library.

For UI tasks, acceptance criteria must include visual consistency, layout, typography, spacing, colors, responsiveness, interaction states, and accessibility expectations.

---

## 10. What every AI-written plan (`prompts/*.md`) must contain

Treat this as the review checklist. If a section is thin or missing, the plan is not ready for approval.

1. **Goal** — One sentence.
2. **What it read** — Skills, files, schema sections, persistent state inspected.
3. **Assumptions** — Ambiguities resolved (or questions still open).
4. **Task flow** — Ordered tasks with: purpose, dependencies, files affected, risks, verification gate before next task.
5. **Files that will change** — Exact create/modify list.
6. **Implementation requirements** — Concrete behavior.
7. **Technology / library recommendations** (if any) — Responsibility, why needed, alternatives, risks; clearly marked as *proposed* until approved.
8. **API / integration strategy** (if any) — Flow, client vs server, secrets, errors.
9. **Architecture implications**
10. **Security requirements** for this task
11. **Acceptance criteria** — Observable, tickable definition of done
12. **Checks to run** — lint, build, etc.
13. **How to verify** — Exact steps/commands; for UI include visual/responsive checks

---

## 11. Persistent project memory & conversation continuity

Conversation history alone is **not** permanent memory.

**Required persistent artifacts (create if missing, keep updated):**

| File | Purpose |
|------|---------|
| `docs/PROJECT_STATE.md` | Current product snapshot, completed major work, active/pending tasks, known issues, env requirements, last verification status |
| `docs/DECISIONS.md` | Architectural / technology decisions and explicitly rejected approaches (so they are not re-proposed endlessly) |
| `prompts/` | Implementation plans (historical + current). Name with date or slug. |
| `docs/TASK_<id>.md` (optional) | Long-running task checkpoint: done / remaining / blockers |

**At the start of every new conversation or “continue the project” request:**

1. Read AGENTS.md  
2. Read `docs/PROJECT_STATE.md` and recent `docs/DECISIONS.md`  
3. Inspect the repository (do not trust docs alone)  
4. Summarize current state briefly, then proceed with the requested work or ask the next focused question  

**On task completion or approval of a decision:** update PROJECT_STATE and DECISIONS as appropriate. Distinguish permanent rules (this file, DECISIONS) from temporary task detail (TASK files / prompts).

**Resuming interrupted work:** inspect claimed task state, verify against the real codebase, then continue from the true remaining work — never blindly restart.

---

## 12. Task-flow generation rules

For every non-trivial request the agent must produce a **project-specific** task flow, not a generic checklist. The flow must:

- Derive order from this codebase’s architecture (e.g. schema → types → hooks → pages → verification)
- State dependencies explicitly (A before B)
- Identify parallelizable work
- List affected files/systems and risks
- Define what must be true before the next task starts
- Prefer incremental, reviewable steps over a single large change

Example dependency patterns for this project:

- Schema/RLS change before hooks that rely on new columns  
- Auth/role behavior before role-gated UI  
- Stream token endpoint health before Meeting UI changes  
- Design-token / shared component update before multi-page visual rollouts  

---

## 13. Technology & API recommendation rules

- Prefer existing stack. Only recommend new tech when the current stack cannot reasonably satisfy the request.
- For each recommendation: name, responsibility in *this* architecture, problem solved, integration point, alternatives considered, trade-offs, license/security/cost/ops impact.
- Keep recommendations as **proposals** until the user approves them. Do not add dependencies in the same breath as unapproved recommendations.
- Avoid dependency duplication (two libraries for the same job).

---

## 14. Build-order methodology for *this* project

Do **not** rebuild completed foundations. Future work should respect what already exists:

1. **Preserve & harden** existing design system, auth, routing, and role shells  
2. **Data & schema integrity** — align TypeScript types with live schema; fix RLS/policy gaps when touching data  
3. **Core role loops** — student/teacher linking, bookings, live class lifecycle, ratings  
4. **Parent loop** — linking, visibility of child progress/classes/assignments  
5. **Video reliability** — Stream Meeting path, waiting room, token endpoint; treat LiveKit as secondary  
6. **Dashboard data quality** — replace remaining mock reliance with real queries where still present  
7. **Quick actions & modals** — complete/fix behavior already scaffolded  
8. **AI features page** — only as explicitly requested; no speculative expansion  
9. **Polish, performance, a11y, deploy hardening**  

Each increment gets its own short user prompt → plan → approval → implement → verify cycle.

---

## 15. Everyday user prompt shape

Because rules live here, user prompts stay short:

```text
Implement <one focused feature or fix>.
Use @.agents/skills/<skill> if applicable.
```

---

## 16. Fallback rule

When unsure:

1. Keep the change small.
2. Inspect more relevant code/schema.
3. Ask one focused question if a real decision remains.
4. Save a plan, get approval, then build.
5. Never make a large independent product/architecture call alone.

---

## 17. Checks, verification & reporting

After implementation:

1. Run `npm run lint` (and `npm run build` when routes, config, or shared infra changed, if environment allows).
2. Report what was run and outcomes.
3. Provide exact verification steps (routes to open, accounts/roles to use, expected UI/data behavior).
4. Update `docs/PROJECT_STATE.md`.

Never claim success solely because code “looks correct.”

---

## 18. Completion & continuity contract

A task is complete only when:

1. Approved plan was followed (or a re-approved delta was followed)
2. Acceptance criteria are met
3. Checks and verification steps are provided
4. Persistent state is updated

The next conversation must be able to open the repo, read AGENTS.md + PROJECT_STATE + DECISIONS, and continue without the user restating history.

---

## 19. Explicit non-goals for the agent

- Do not push to git unless the user gives clear approval.
- Do not redesign the product or migrate frameworks.
- Do not implement unapproved recommendations.
- Do not treat README auth claims (Clerk) as truth — the code uses Supabase.
- Do not invent tables, routes, or services not present or approved.

---

This file is the operating system for AI agents on YadaLearn. Keep it accurate. When architecture decisions change with approval, update this file and docs/DECISIONS.md together.
