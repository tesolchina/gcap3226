---
name: Fall 2026 course setup
description: Fall 2026 course portal architecture — routes, sidebar, AI tutor, 10 topics seeded from Talia's 4 Jun 2026 email
type: feature
---
Fall 2026 (GCAP 3226) is the upcoming/active cohort. Spring 2026 is archived behind a password gate (reuses 'archive' secretCode, separate localStorage key `spring2026_archive_unlocked`).

Routes under `/fall-2026`:
- `/fall-2026` — home with topic grid + global tutor
- `/fall-2026/tutor` — dedicated global AI tutor
- `/fall-2026/topics` — all 10 topics
- `/fall-2026/topics/:slug` — single topic page with per-topic AI tutor
- `/fall-2026/syllabus`, `/fall-2026/weeks` — placeholders

Topics live in `src/data/fall2026-topics.ts`. Topics 1-3 from Talia (road-safety, typhoon, ev-charger). Topics 4-10 are placeholder drafts pending Talia confirmation.

AI tutor: single edge function `fall2026-tutor` (Lovable AI, `google/gemini-3-flash-preview`, streaming). One table `fall2026_chat_messages` with `scope` ('global'|'topic') and `topic_slug`. Realtime enabled. Component `Fall2026Chat` is reused for both global and topic threads. Style inspired by GCAP 3056's AI tutor — public threads, Socratic.
