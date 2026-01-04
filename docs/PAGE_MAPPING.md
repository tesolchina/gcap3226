# Page to File Mapping

This document maps each frontend page/route to its corresponding source files.

> **Last Updated:** 2026-01-04

---

## Route Structure

### Main Landing Page

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/` | `src/pages/Home.tsx` | Main landing page with semester selection |

### Spring 2026 Portal

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026` | `src/pages/Spring2026Home.tsx` | Spring 2026 course home page |
| `/spring-2026/weeks/:weekId` | `src/pages/Spring2026Week.tsx` | Weekly content pages (1, 2-4, 5-6, etc.) |
| `/spring-2026/syllabus` | `src/pages/Spring2026Placeholder.tsx` | Syllabus page (placeholder) |
| `/spring-2026/resources` | `src/pages/Spring2026Placeholder.tsx` | Resources page (placeholder) |
| `/spring-2026/feedback` | `src/pages/Spring2026Placeholder.tsx` | Feedback page (placeholder) |

### Fall 2025 Archive

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/fall-2025` | `src/pages/Fall2025Archive.tsx` | Fall 2025 course overview |
| `/fall-2025/week-13` | `src/pages/Week13.tsx` | Week 13 presentation rundown |
| `/fall-2025/team/:slug` | `src/pages/TeamPage.tsx` | Individual team pages |

### Utility Pages

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/auth` | `src/pages/Auth.tsx` | Authentication page |
| `/*` | `src/pages/NotFound.tsx` | 404 error page |

---

## Component Dependencies

### Layout Components

| Component | File | Used By |
|-----------|------|---------|
| Archive Sidebar | `src/components/ArchiveSidebar.tsx` | Fall 2025 routes |
| Spring 2026 Sidebar | `src/components/Spring2026Sidebar.tsx` | Spring 2026 routes |
| User Menu | `src/components/UserMenu.tsx` | All routes with header |

### Feature Components

| Component | File | Used By |
|-----------|------|---------|
| AI Consultation Corner | `src/components/AIConsultationCorner.tsx` | `TeamPage.tsx` |
| Countdown Timer | `src/components/CountdownTimer.tsx` | `Fall2025Archive.tsx` |
| Message Board | `src/components/MessageBoard.tsx` | `TeamPage.tsx` |
| Presentation Timer | `src/components/PresentationTimer.tsx` | `Week13.tsx` |
| Submission Form | `src/components/SubmissionForm.tsx` | `TeamPage.tsx` |

---

## Backend Functions (Edge Functions)

| Function | File | Purpose |
|----------|------|---------|
| AI Consultation | `supabase/functions/ai-consultation/index.ts` | AI chat for student consultations |
| Generate Presentation Order | `supabase/functions/generate-presentation-order/index.ts` | Randomize team presentation order |
| Reset Presentation Order | `supabase/functions/reset-presentation-order/index.ts` | Clear presentation order |
| Validate Secret Code | `supabase/functions/validate-secret-code/index.ts` | Teacher authentication |

---

## Database Tables

| Table | Primary Usage | Related Pages |
|-------|---------------|---------------|
| `teams` | Team information | `TeamPage.tsx`, `Week13.tsx` |
| `messages` | Discussion board | `MessageBoard.tsx` |
| `comments` | Government message comments | `TeamPage.tsx` |
| `government_messages` | Policy documents | `TeamPage.tsx` |
| `student_submissions` | Form submissions | `SubmissionForm.tsx` |
| `chat_sessions` | AI consultation sessions | `AIConsultationCorner.tsx` |
| `chat_messages` | AI chat history | `AIConsultationCorner.tsx` |
| `user_roles` | Teacher/student roles | `AuthContext.tsx` |

---

## Routing Configuration

Main routing is configured in: `src/App.tsx`

The app uses conditional rendering based on route prefixes:
- `/spring-2026/*` → Spring 2026 layout with sidebar
- `/fall-2025/*` → Archive layout with sidebar  
- `/` → Clean landing page without sidebar
