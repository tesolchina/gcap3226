# GCAP 3226 Course Portal - Architecture Guide

> **Last Updated:** 2026-01-11  
> **For:** External IDE developers working via GitHub sync

---

## Overview

This is a React + TypeScript web application for a university course portal. It uses:
- **Frontend:** React 18, Vite, TailwindCSS, shadcn/ui
- **Backend:** Supabase (Postgres + Edge Functions)
- **AI:** Lovable AI Gateway (RAG-enabled)

---

## Directory Structure

```
├── docs/                          # Documentation
│   ├── README.md                  # Quick reference
│   ├── ARCHITECTURE.md            # This file
│   ├── PAGE_MAPPING.md            # Route to file mapping
│   └── CHANGELOG.md               # Change log
│
├── public/                        # Static assets
│   ├── assets/                    # PDFs, public files
│   └── robots.txt
│
├── src/
│   ├── assets/                    # Images (imported via ES6)
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # shadcn/ui primitives
│   │   └── *.tsx                  # Feature components
│   ├── contexts/                  # React contexts
│   │   └── AuthContext.tsx        # Authentication state
│   ├── data/                      # Static data files
│   │   └── course-content.json    # RAG knowledge base source
│   ├── hooks/                     # Custom React hooks
│   ├── integrations/              # External service clients
│   │   └── supabase/
│   │       ├── client.ts          # ⚠️ AUTO-GENERATED - DO NOT EDIT
│   │       └── types.ts           # ⚠️ AUTO-GENERATED - DO NOT EDIT
│   ├── lib/                       # Utility functions
│   │   ├── ai-chat.ts             # AI streaming helpers
│   │   └── utils.ts               # General utilities
│   ├── pages/                     # Page components (one per route)
│   ├── App.tsx                    # Main app with routing
│   ├── index.css                  # Global styles + design tokens
│   └── main.tsx                   # Entry point
│
├── supabase/
│   ├── functions/                 # Edge functions (backend)
│   │   ├── ai-consultation/       # Legacy AI chat
│   │   ├── chat/                  # Generic AI chat
│   │   ├── generate-embeddings/   # RAG embedding generation
│   │   ├── project-ai-chat/       # RAG-enabled project chat
│   │   ├── search-knowledge/      # RAG semantic search
│   │   └── ...
│   ├── migrations/                # ⚠️ DO NOT EDIT - Managed by Supabase
│   └── config.toml                # Edge function configuration
│
├── tailwind.config.ts             # Tailwind configuration
└── vite.config.ts                 # Vite configuration
```

---

## Module Breakdown

### 1. Pages (`src/pages/`)

Each page corresponds to a route. Pages are organized by semester:

| Prefix | Semester | Layout |
|--------|----------|--------|
| `/` | Landing | No sidebar |
| `/spring-2026/*` | Current | Spring2026Sidebar |
| `/fall-2025/*` | Archive | ArchiveSidebar |

**Key Pages:**
- `Home.tsx` - Landing page with semester selection
- `Spring2026Home.tsx` - Course home with roadmap
- `Spring2026Week.tsx` - Dynamic weekly content (weeks 2-13)
- `Spring2026Topic.tsx` - Project group workspace (6 topics)
- `Spring2026Assessments.tsx` - Assessment overview

### 2. Components (`src/components/`)

**Layout Components:**
- `Spring2026Sidebar.tsx` - Navigation for current semester
- `ArchiveSidebar.tsx` - Navigation for archived semester
- `UserMenu.tsx` - User dropdown in header

**Feature Components:**
| Component | Purpose | Used In |
|-----------|---------|---------|
| `ProjectMessageBoard.tsx` | RAG-enabled group chat | `Spring2026Topic.tsx` |
| `ProjectMembership.tsx` | Team member management | `Spring2026Topic.tsx` |
| `ProjectMilestones.tsx` | Project milestone tracking | `Spring2026Topic.tsx` |
| `ProjectSessions.tsx` | Meeting scheduling | `Spring2026Topic.tsx` |
| `ProjectFileUpload.tsx` | File sharing | `Spring2026Topic.tsx` |
| `CourseRoadmap.tsx` | Visual timeline | `Spring2026Home.tsx` |
| `AIConsultationCorner.tsx` | Legacy AI chat | `TeamPage.tsx` |
| `MessageBoard.tsx` | Legacy discussion | `TeamPage.tsx` |
| `MCPoll.tsx` | Multiple choice polling | Week pages |

### 3. Contexts (`src/contexts/`)

- `AuthContext.tsx` - Manages authentication state and teacher role detection

### 4. Hooks (`src/hooks/`)

- `use-mobile.tsx` - Responsive breakpoint detection
- `use-toast.ts` - Toast notification hook

### 5. Library (`src/lib/`)

- `ai-chat.ts` - Streaming AI chat functions
  - `streamChat()` - Generic AI streaming
  - `streamProjectChat()` - RAG-enabled project chat
- `utils.ts` - Utility functions (cn, etc.)

### 6. Data (`src/data/`)

- `course-content.json` - Pre-extracted course content for RAG
  - Contains 30+ pages with metadata
  - Used by `generate-embeddings` edge function

---

## Edge Functions (`supabase/functions/`)

| Function | Purpose | JWT Required |
|----------|---------|--------------|
| `project-ai-chat` | RAG-enabled AI for project discussions | No |
| `generate-embeddings` | Create vector embeddings for content | No |
| `search-knowledge` | Semantic search over knowledge base | No |
| `chat` | Generic AI streaming | No |
| `ai-consultation` | Legacy AI with session tracking | No |
| `validate-secret-code` | Teacher authentication | No |
| `generate-presentation-order` | Randomize presentation order | No |
| `reset-presentation-order` | Clear presentation order | No |
| `perplexity-search` | Web search integration | No |
| `voice-transcribe` | Audio transcription | No |

### RAG System Architecture

```
User Query
    │
    ▼
┌─────────────────────────┐
│   project-ai-chat       │
│   Edge Function         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   generate embedding    │
│   (Lovable AI Gateway)  │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   search_course_knowledge    │
│   search_project_knowledge   │
│   (PostgreSQL + pgvector)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Build System Prompt   │
│   with RAG Context      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Lovable AI Gateway    │
│   (gemini-3-flash)      │
└───────────┬─────────────┘
            │
            ▼
        Stream Response
```

---

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `project_groups` | Project topics (6 groups) |
| `project_members` | Group membership |
| `project_messages` | Group discussion (realtime) |
| `project_milestones` | Project milestones |
| `project_sessions` | Meeting schedules |
| `project_files` | Uploaded files metadata |
| `project_knowledge` | Project-specific RAG content |
| `course_knowledge` | Course-wide RAG content |

### Legacy Tables (Fall 2025)

| Table | Purpose |
|-------|---------|
| `teams` | Team information |
| `messages` | Discussion board |
| `comments` | Document comments |
| `government_messages` | Policy documents |
| `student_submissions` | Form submissions |
| `chat_sessions` | AI consultation sessions |
| `chat_messages` | AI chat history |
| `user_roles` | Role management |
| `mc_questions` / `mc_responses` | Polling system |

---

## Design System

### CSS Variables (`src/index.css`)

All colors use HSL format. Key tokens:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--muted`, `--accent`
- `--card`, `--popover`, `--border`
- `--destructive`, `--success`

### Tailwind Config (`tailwind.config.ts`)

Extended with custom colors and animations. Uses shadcn/ui conventions.

### Component Library

Uses shadcn/ui components in `src/components/ui/`. Do not modify these directly.

---

## Development Workflow

### Making Changes via External IDE

1. **Clone the repository** from GitHub
2. **Install dependencies:** `bun install` or `npm install`
3. **Run locally:** `bun dev` or `npm run dev`
4. **Make changes** following the patterns below
5. **Push to GitHub** - Changes sync to Lovable automatically

### File Editing Rules

| File | Can Edit? | Notes |
|------|-----------|-------|
| `src/pages/*.tsx` | ✅ Yes | Add/modify page content |
| `src/components/*.tsx` | ✅ Yes | Add/modify features |
| `src/lib/*.ts` | ✅ Yes | Utilities and helpers |
| `src/data/*.json` | ✅ Yes | Static data |
| `supabase/functions/*/index.ts` | ✅ Yes | Backend logic |
| `src/integrations/supabase/*` | ❌ No | Auto-generated |
| `supabase/migrations/*` | ❌ No | Managed by Supabase |
| `package.json` | ❌ No | Use Lovable to add deps |

### Adding a New Page

1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add to sidebar if needed
4. Update `docs/PAGE_MAPPING.md`
5. Update `docs/CHANGELOG.md`

### Adding a New Component

1. Create `src/components/NewComponent.tsx`
2. Use existing patterns from similar components
3. Import in the page that uses it

### Adding an Edge Function

1. Create `supabase/functions/my-function/index.ts`
2. Add to `supabase/config.toml`:
   ```toml
   [functions.my-function]
   verify_jwt = false
   ```
3. Follow CORS pattern from existing functions

---

## Environment Variables

The `.env` file contains (auto-configured):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `VITE_SUPABASE_PROJECT_ID` - Project ID

Edge functions have access to:
- `SUPABASE_URL` - Supabase URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key
- `LOVABLE_API_KEY` - Lovable AI Gateway key

---

## Testing

### Local Testing

```bash
# Run dev server
bun dev

# Type checking
bun run typecheck

# Linting
bun run lint
```

### Edge Function Testing

Edge functions deploy automatically when pushed. Test via:
- Browser network tab
- curl commands
- Supabase dashboard logs

---

## Common Patterns

### Streaming AI Response

```typescript
import { streamProjectChat } from "@/lib/ai-chat";

await streamProjectChat({
  messages: [...history, { role: "user", content: userInput }],
  projectGroupId: groupId,
  topicTitle: "Topic Name",
  enableRAG: true,
  onDelta: (chunk) => setResponse(prev => prev + chunk),
  onDone: () => setLoading(false),
  onError: (err) => toast({ title: "Error", description: err }),
});
```

### Realtime Subscription

```typescript
const channel = supabase
  .channel(`table_${id}`)
  .on("postgres_changes", {
    event: "INSERT",
    schema: "public",
    table: "my_table",
    filter: `id=eq.${id}`,
  }, (payload) => handleNewRow(payload.new))
  .subscribe();

// Cleanup
return () => supabase.removeChannel(channel);
```

### localStorage for User State

```typescript
// Store user identification
localStorage.setItem(`project_member_${slug}`, memberId);

// Retrieve on mount
const stored = localStorage.getItem(`project_member_${slug}`);
```

---

## Troubleshooting

### Build Errors

- Check TypeScript errors with `bun run typecheck`
- Ensure imports match file paths (case-sensitive)
- Don't edit auto-generated files

### Edge Function Errors

- Check Supabase Edge Function logs
- Ensure CORS headers are included
- Verify `config.toml` has function entry

### Sync Issues

- Push changes to GitHub
- Wait for Lovable to sync (~30 seconds)
- Check GitHub Actions if sync fails

---

## Contact

For questions about the codebase architecture, check:
1. This documentation
2. Inline comments in code
3. Component props/interfaces
4. Edge function handlers
