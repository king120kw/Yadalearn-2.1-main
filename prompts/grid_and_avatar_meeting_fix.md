# Implementation Plan: Fix Meeting Video Viewpoint, Camera Muted Profile, and Responsive Grid Layout

Align Stream Video meeting viewpoint, camera-muted profile avatar representation, and dynamic participant grid layout with Google Meet-style user reference specifications.

## What it read
- `AGENTS.md` - mandatory engineering workflow and checklist standards
- `.agents/skills/stream/SKILL.md` - Stream router skill guidelines
- `docs/PROJECT_STATE.md` & `docs/DECISIONS.md` - persistent project state and decisions
- `src/pages/Meeting.tsx` - current live classroom meeting component and participant layout
- `src/contexts/StreamProvider.tsx` - Stream Video client context
- `@stream-io/video-react-sdk` components - `ParticipantView`, `PaginatedGridLayout`, `SpeakerLayout`, `useCallStateHooks`

## Assumptions
- Stream Video SDK (`@stream-io/video-react-sdk`) is the primary video meeting provider as defined in `docs/DECISIONS.md`.
- When camera is turned OFF, the participant tile must display a centered circular profile avatar (photo or initials circle) with the user's display name positioned directly underneath it, matching the provided screenshot reference.
- Grid layout should dynamically calculate rows and columns based on total active participants ($N$) to utilize screen real estate cleanly (e.g., 6 columns x 4 rows for 24 participants).

## Task Flow
1. **Task 1: Build `CustomVideoPlaceholder` for Muted Camera State**
   - Purpose: Display centered circular avatar frame with user profile photo or initials circle, participant display name below avatar, top-right mute status icon, and active speaking highlight border.
   - Dependencies: `src/pages/Meeting.tsx`
   - Risk: None.
   - Verification Gate: Camera-off state displays circular avatar centered on dark tile background with name underneath instead of full-tile stretched image.

2. **Task 2: Build `CustomParticipantViewUI` for Active Camera State**
   - Purpose: Render clean top-right mute indicator badge, bottom-left participant name tag, and active speaking highlight ring on live video feeds.
   - Dependencies: `Task 1`
   - Risk: None.
   - Verification Gate: Video feeds render with non-obtrusive name pills and mute badges.

3. **Task 3: Implement Dynamic `ResponsiveGridLayout` for Participant Grid Alignment**
   - Purpose: Dynamically compute grid columns and rows based on total connected participants $N$, organizing tiles into clean rows/columns (e.g. 1x1, 2x1, 2x2, 3x2, 3x3, 4x3, 4x4, 5x4, 6x4) that fill the meeting container without overflow.
   - Dependencies: `Task 1`, `Task 2`
   - Risk: Video aspect ratios must fit properly without horizontal/vertical overflow.
   - Verification Gate: Participant tiles scale and align responsively according to participant count.

4. **Task 4: Integrate into `CallLayout` & Handle Screen Share Transition**
   - Purpose: Wire `ResponsiveGridLayout` into `CallLayout` in `src/pages/Meeting.tsx`, switching automatically to `SpeakerLayout` when screen sharing is active.
   - Dependencies: `Task 3`
   - Risk: None.
   - Verification Gate: Layout switches seamlessly between grid view and screen-share speaker view.

## Files that will change
- `src/pages/Meeting.tsx` [MODIFY]

## Implementation Requirements
- **Camera Muted Profile Representation**:
  - Background: Dark solid dark-zinc tile background (`bg-[#202124]`).
  - Centered circular avatar: `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg border-2 border-white/10`.
  - Color-coded initials fallback circle if profile image is unavailable.
  - Participant display name: Centered text below avatar (`text-white font-medium text-xs sm:text-sm text-center truncate mt-2 sm:mt-3`).
  - Mute status: Top-right `mic_off` icon badge overlay.
  - Speaking highlight: Active speaker gets blue ring (`ring-2 ring-blue-500` / `border-2 border-blue-500`) around the tile.
- **Dynamic Grid Layout Alignment**:
  - Compute columns (`cols`) and rows (`rows`) based on participant count ($N$):
    - $N = 1 \implies 1 \times 1$
    - $N = 2 \implies 2 \times 1$
    - $N \le 4 \implies 2 \times 2$
    - $N \le 6 \implies 3 \times 2$
    - $N \le 9 \implies 3 \times 3$
    - $N \le 12 \implies 4 \times 3$
    - $N \le 16 \implies 4 \times 4$
    - $N \le 20 \implies 5 \times 4$
    - $N \le 24 \implies 6 \times 4$
    - $N > 24 \implies 6 \times \text{auto}$
  - Container uses CSS Grid with dynamic `gridTemplateColumns` and `gridTemplateRows` filling $100\%$ viewport height/width cleanly.

## Technology / Library Recommendations
- Reuse `@stream-io/video-react-sdk` (`ParticipantView`, `useCallStateHooks`) with custom responsive CSS grid layout. No new external libraries needed.

## API / Integration Strategy
- Harness Stream Video's `useParticipants()` hook to reactively get active call participants.
- Query Supabase `profiles` table for profile avatar image caching when participant image is not preset in Stream participant object.

## Architecture Implications
- Keeps all changes contained within `Meeting.tsx` presentation layer without altering token endpoints, Supabase schema, or auth context.

## Security Requirements
- Client-side visual styling only. No security boundary changes or secret exposures.

## Acceptance Criteria
- [ ] Muted camera state displays a centered circular avatar photo (or initials circle) with participant name centered underneath.
- [ ] Mic mute status icon appears in top-right corner of each tile when participant is muted.
- [ ] Active speaker shows a clean blue highlight ring around their tile.
- [ ] Grid layout dynamically adjusts column and row count based on number of active participants.
- [ ] Video viewpoint fills tile viewport properly without clipping or distortion.
- [ ] Screen sharing automatically transitions to `SpeakerLayout`.

## Checks to run
- `npm run lint` or Vite build check to verify TypeScript compilation and zero syntax errors.

## How to verify
1. Launch app with dev server (`npm run dev`).
2. Open `/meeting/test-room` in browser.
3. Verify tile presentation when camera is muted (centered circular avatar + name below + top-right mute icon + blue speaking ring).
4. Verify dynamic grid scaling with single and multiple participants.
