# Page to File Mapping

This document maps each frontend page/route to its corresponding source files.

> **Last Updated:** 2026-01-11

---

## Route Structure

### Main Landing Page

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/` | `src/pages/Home.tsx` | Main landing page with semester selection |
| `/teaser` | `src/pages/CourseTeaser.tsx` | Course teaser page |
| `/login` | `src/pages/Login.tsx` | Teacher login |
| `/teacher-dashboard` | `src/pages/TeacherDashboard.tsx` | Teacher admin dashboard |

### Spring 2026 Portal

#### Home & Navigation

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026` | `src/pages/Spring2026Home.tsx` | Spring 2026 course home page with roadmap |
| `/spring-2026/syllabus` | `src/pages/Spring2026Placeholder.tsx` | Syllabus page with embedded PDF |
| `/spring-2026/resources` | `src/pages/Spring2026Placeholder.tsx` | Resources page |
| `/spring-2026/feedback` | `src/pages/Spring2026Placeholder.tsx` | Feedback page |

#### Weekly Content

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026/weeks/1` | `src/pages/Spring2026Week1.tsx` | Week 1: Course Introduction (detailed) |
| `/spring-2026/weeks/:weekId` | `src/pages/Spring2026Week.tsx` | Weeks 2-13: Dynamic content |

#### Assessments

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026/assessments` | `src/pages/Spring2026Assessments.tsx` | Assessment overview |
| `/spring-2026/assessments/in-class-exercise-1` | `src/pages/Spring2026AssessmentInClass1.tsx` | In-Class Exercise 1 |
| `/spring-2026/assessments/in-class-exercise-2` | `src/pages/Spring2026AssessmentInClass2.tsx` | In-Class Exercise 2 |
| `/spring-2026/assessments/reflective-essay-1` | `src/pages/Spring2026ReflectiveEssay1.tsx` | Reflective Essay 1 |
| `/spring-2026/assessments/reflective-essay-2` | `src/pages/Spring2026ReflectiveEssay2.tsx` | Reflective Essay 2 |
| `/spring-2026/assessments/reflective-essay-3` | `src/pages/Spring2026ReflectiveEssay3.tsx` | Reflective Essay 3 |
| `/spring-2026/assessments/presentation-1` | `src/pages/Spring2026Presentation1.tsx` | In-Class Presentation 1 |
| `/spring-2026/assessments/presentation-2` | `src/pages/Spring2026Presentation2.tsx` | In-Class Presentation 2 |
| `/spring-2026/assessments/human-ai-collaboration` | `src/pages/Spring2026HumanAICollaborationReport.tsx` | Human-AI Report |
| `/spring-2026/assessments/final-report` | `src/pages/Spring2026FinalPresentationReport.tsx` | Final Presentation & Report |

#### Project Topics (Group Workspaces)

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026/topics` | `src/pages/Spring2026TopicSelection.tsx` | Topic selection page |
| `/spring-2026/topics/:topicSlug` | `src/pages/Spring2026Topic.tsx` | Project workspace (tabbed) |

**Available Topic Slugs:**
- `transport-equity` - Transport Equity & Accessibility
- `air-quality` - Air Quality & Environmental Justice
- `housing-affordability` - Housing Affordability
- `food-security` - Food Security & Nutrition
- `education-access` - Education Access & Equity
- `public-health` - Public Health & Healthcare Access

#### Resources

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/spring-2026/resources/government-info-requests` | `src/pages/Spring2026GovInfoRequests.tsx` | FOIA guide |
| `/spring-2026/resources/curating-public-data` | `src/pages/Spring2026CuratingPublicData.tsx` | Data curation guide |
| `/spring-2026/legco-submission` | `src/pages/Spring2026LegCoSubmission.tsx` | LegCo submission guide |

### Fall 2025 Archive

| Route | Page Component | Description |
|-------|----------------|-------------|
| `/fall-2025` | `src/pages/Fall2025Archive.tsx` | Fall 2025 course overview |
| `/fall-2025/week-13` | `src/pages/Week13.tsx` | Week 13 presentation rundown |
| `/fall-2025/team/:slug` | `src/pages/TeamPage.tsx` | Individual team pages |

---

## Component Dependencies

### Layout Components

| Component | File | Used By |
|-----------|------|---------|
| Spring 2026 Sidebar | `src/components/Spring2026Sidebar.tsx` | All `/spring-2026/*` routes |
| Archive Sidebar | `src/components/ArchiveSidebar.tsx` | All `/fall-2025/*` routes |
| User Menu | `src/components/UserMenu.tsx` | Header on all routes with sidebar |

### Project Space Components (Spring 2026 Topics)

| Component | File | Purpose |
|-----------|------|---------|
| ProjectMessageBoard | `src/components/ProjectMessageBoard.tsx` | RAG-enabled group chat |
| ProjectMembership | `src/components/ProjectMembership.tsx` | Team member management |
| ProjectMilestones | `src/components/ProjectMilestones.tsx` | Milestone tracking |
| ProjectSessions | `src/components/ProjectSessions.tsx` | Meeting scheduling |
| ProjectFileUpload | `src/components/ProjectFileUpload.tsx` | File sharing |

### Feature Components

| Component | File | Used By |
|-----------|------|---------|
| AI Consultation Corner | `src/components/AIConsultationCorner.tsx` | `TeamPage.tsx` |
| Countdown Timer | `src/components/CountdownTimer.tsx` | `Fall2025Archive.tsx` |
| Course Roadmap | `src/components/CourseRoadmap.tsx` | `Spring2026Home.tsx` |
| Message Board | `src/components/MessageBoard.tsx` | `TeamPage.tsx` |
| Presentation Timer | `src/components/PresentationTimer.tsx` | `Week13.tsx` |
| Submission Form | `src/components/SubmissionForm.tsx` | `TeamPage.tsx` |
| MC Poll | `src/components/MCPoll.tsx` | Week pages |

---

## Backend Functions (Edge Functions)

### RAG System

| Function | File | Purpose |
|----------|------|---------|
| project-ai-chat | `supabase/functions/project-ai-chat/index.ts` | RAG-enabled chat for projects |
| generate-embeddings | `supabase/functions/generate-embeddings/index.ts` | Create vector embeddings |
| search-knowledge | `supabase/functions/search-knowledge/index.ts` | Semantic search API |

### AI Chat

| Function | File | Purpose |
|----------|------|---------|
| chat | `supabase/functions/chat/index.ts` | Generic AI streaming |
| ai-consultation | `supabase/functions/ai-consultation/index.ts` | Legacy session-based chat |

### Utilities

| Function | File | Purpose |
|----------|------|---------|
| validate-secret-code | `supabase/functions/validate-secret-code/index.ts` | Teacher auth |
| generate-presentation-order | `supabase/functions/generate-presentation-order/index.ts` | Randomize order |
| reset-presentation-order | `supabase/functions/reset-presentation-order/index.ts` | Clear order |
| perplexity-search | `supabase/functions/perplexity-search/index.ts` | Web search |
| voice-transcribe | `supabase/functions/voice-transcribe/index.ts` | Audio transcription |

---

## Database Tables

### Project Space (Spring 2026)

| Table | Primary Usage | Related Components |
|-------|---------------|-------------------|
| `project_groups` | Project topics (6 groups) | `Spring2026Topic.tsx` |
| `project_members` | Group membership | `ProjectMembership.tsx` |
| `project_messages` | Group discussion | `ProjectMessageBoard.tsx` |
| `project_milestones` | Milestone tracking | `ProjectMilestones.tsx` |
| `project_sessions` | Meeting schedules | `ProjectSessions.tsx` |
| `project_files` | File metadata | `ProjectFileUpload.tsx` |
| `project_knowledge` | Project-specific RAG | `project-ai-chat` |
| `course_knowledge` | Course-wide RAG | `project-ai-chat` |

### Legacy (Fall 2025)

| Table | Primary Usage | Related Components |
|-------|---------------|-------------------|
| `teams` | Team information | `TeamPage.tsx`, `Week13.tsx` |
| `messages` | Discussion board | `MessageBoard.tsx` |
| `comments` | Document comments | `TeamPage.tsx` |
| `government_messages` | Policy documents | `TeamPage.tsx` |
| `student_submissions` | Form submissions | `SubmissionForm.tsx` |
| `chat_sessions` | AI consultation sessions | `AIConsultationCorner.tsx` |
| `chat_messages` | AI chat history | `AIConsultationCorner.tsx` |
| `user_roles` | Teacher/student roles | `AuthContext.tsx` |
| `mc_questions` | Poll questions | `MCPoll.tsx` |
| `mc_responses` | Poll responses | `MCPoll.tsx` |

---

## Routing Configuration

Main routing is configured in: `src/App.tsx`

The app uses conditional rendering based on route prefixes:
- `/spring-2026/*` → Spring 2026 layout with `Spring2026Sidebar`
- `/fall-2025/*` → Archive layout with `ArchiveSidebar`
- `/` → Clean landing page without sidebar

---

## Data Files

| File | Purpose | Used By |
|------|---------|---------|
| `src/data/course-content.json` | Pre-extracted course content for RAG | `generate-embeddings` edge function |
| `public/assets/GCAP3226_syllabus.pdf` | Course syllabus PDF | `Spring2026Placeholder.tsx` |
