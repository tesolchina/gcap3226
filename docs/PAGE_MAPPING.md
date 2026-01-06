# Page to File Mapping

This document maps each frontend page/route to its corresponding source files.

> **Last Updated:** 2026-01-06

---

## Route Structure

### Main Landing Page

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/` | `src/pages/Home.tsx` | Main landing page with semester selection |

### Spring 2026 Portal

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026` | `src/pages/Spring2026Home.tsx` | Spring 2026 course home page with roadmap |
| `/spring-2026/weeks/1` | `src/pages/Spring2026Week1.tsx` | Week 1: Course Introduction (detailed content) |
| `/spring-2026/weeks/2` | `src/pages/Spring2026Week.tsx` | Week 2 content page |
| `/spring-2026/weeks/3` | `src/pages/Spring2026Week.tsx` | Week 3 content page |
| `/spring-2026/weeks/3/in-class-exercise-1` | `src/pages/AssessmentPage.tsx` | In-class Exercise 1 |
| `/spring-2026/weeks/4` | `src/pages/Spring2026Week.tsx` | Week 4 content page |
| `/spring-2026/weeks/4/in-class-exercise-2` | `src/pages/AssessmentPage.tsx` | In-class Exercise 2 |
| `/spring-2026/weeks/5` | `src/pages/Spring2026Week.tsx` | Week 5 content page |
| `/spring-2026/weeks/5/reflective-essay-1` | `src/pages/AssessmentPage.tsx` | Reflective Essay 1 |
| `/spring-2026/weeks/6` | `src/pages/Spring2026Week.tsx` | Week 6 content page |
| `/spring-2026/weeks/7` | `src/pages/Spring2026Week.tsx` | Week 7 content page |
| `/spring-2026/weeks/7/reflective-essay-2` | `src/pages/AssessmentPage.tsx` | Reflective Essay 2 |
| `/spring-2026/weeks/8` | `src/pages/Spring2026Week.tsx` | Week 8 content page |
| `/spring-2026/weeks/8/reflective-essay-3` | `src/pages/AssessmentPage.tsx` | Reflective Essay 3 |
| `/spring-2026/weeks/9` | `src/pages/Spring2026Week.tsx` | Week 9 content page |
| `/spring-2026/weeks/10` | `src/pages/Spring2026Week.tsx` | Week 10 content page |
| `/spring-2026/weeks/11` | `src/pages/Spring2026Week.tsx` | Week 11 content page |
| `/spring-2026/weeks/11/presentation-1` | `src/pages/AssessmentPage.tsx` | In-Class Presentation 1 |
| `/spring-2026/weeks/12` | `src/pages/Spring2026Week.tsx` | Week 12 content page |
| `/spring-2026/weeks/12/human-ai-report` | `src/pages/AssessmentPage.tsx` | Human-AI Collaboration Report |
| `/spring-2026/weeks/13` | `src/pages/Spring2026Week.tsx` | Week 13 content page |
| `/spring-2026/weeks/13/final-presentation-report` | `src/pages/AssessmentPage.tsx` | Final Presentation & Report |
| `/spring-2026/syllabus` | `src/pages/Spring2026Placeholder.tsx` | Syllabus page with embedded PDF |
| `/spring-2026/resources` | `src/pages/Spring2026Placeholder.tsx` | Resources page (coming soon) |
| `/spring-2026/feedback` | `src/pages/Spring2026Placeholder.tsx` | Feedback page (coming soon) |

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

## Page Files Summary

| File | Used | Description |
|------|------|-------------|
| `Auth.tsx` | ✅ | Authentication/login page |
| `Fall2025Archive.tsx` | ✅ | Fall 2025 semester archive |
| `Home.tsx` | ✅ | Main landing page |
| `NotFound.tsx` | ✅ | 404 error page |
| `Spring2026Home.tsx` | ✅ | Spring 2026 home with course roadmap |
| `Spring2026Placeholder.tsx` | ✅ | Placeholder for syllabus/resources/feedback |
| `Spring2026Week.tsx` | ✅ | Generic week page (weeks 2-13) |
| `Spring2026Week1.tsx` | ✅ | Detailed Week 1 content |
| `TeamPage.tsx` | ✅ | Individual team pages |
| `Week13.tsx` | ✅ | Week 13 presentation page |

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
| Course Roadmap | `src/components/CourseRoadmap.tsx` | `Spring2026Home.tsx` |
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
