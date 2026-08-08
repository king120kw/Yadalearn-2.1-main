# YadaLearn — Decision Log

Record approved architectural/technology decisions and explicitly rejected approaches so future agents do not re-propose the same mistakes.

Format:
YYYY-MM-DD — Short title
Status: Approved | Rejected
Context: …
Decision: …
Rationale: …

---

## 2026-08-07 — Auth provider truth

**Status:** Approved (align docs with code)

**Context:** README lists Clerk; implementation uses Supabase Auth throughout AuthContext and client setup.

**Decision:** Supabase Auth is the sole authentication system for YadaLearn. Do not introduce Clerk or alternate auth providers without a new explicit approval.

**Rationale:** Code and schema are already built around Supabase `auth.users` and profiles RLS.

---

## 2026-08-07 — Primary video provider

**Status:** Approved (current state)

**Context:** Both Stream Video and LiveKit appear in dependencies and source.

**Decision:** Stream Video is the primary Meeting experience (`/meeting/:id`, StreamProvider, token middleware). LiveKit remains limited to existing Join Class modal paths unless a future decision changes this.

**Rationale:** Meeting page and StreamProvider form the main live-session path; token signing is already wired for Stream.

---

## 2026-08-07 — No second global state library

**Status:** Approved

**Context:** State is handled via React Context (Auth, Stream) and local/hook state.

**Decision:** Do not introduce Redux, Zustand, or similar without explicit approval.

**Rationale:** Existing patterns are sufficient; extra global stores increase complexity without current need.

---

## 2026-08-07 — Design system ownership

**Status:** Approved

**Context:** Custom pastel/lavender tokens + Tailwind + shadcn-style primitives.

**Decision:** New UI must extend the existing design language. Do not adopt a competing UI kit (MUI, Chakra, etc.) as a replacement.

**Rationale:** Visual consistency across student/teacher/parent surfaces.
