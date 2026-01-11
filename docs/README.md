# GCAP 3226 Course Portal - Documentation

This folder contains documentation for the GCAP 3226 Participatory Policy Analysis course portal.

> **Last Updated:** 2026-01-11

## Documents

| File | Description |
|------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | **Start here** - Full architecture guide for external IDE developers |
| [PAGE_MAPPING.md](./PAGE_MAPPING.md) | Maps frontend pages/routes to source files |
| [CHANGELOG.md](./CHANGELOG.md) | Log of all changes made via Lovable or GitHub |

---

## Quick Reference

### Project Structure

```
src/
├── pages/              # Page components (one per route)
├── components/         # Reusable UI components
│   └── ui/             # shadcn/ui primitives (don't edit)
├── contexts/           # React contexts (Auth)
├── data/               # Static data (course-content.json for RAG)
├── hooks/              # Custom React hooks
├── integrations/       # Supabase client & types (auto-generated)
├── lib/                # Utilities (ai-chat.ts, utils.ts)
└── assets/             # Images and static files

supabase/
├── functions/          # Edge functions (backend logic)
│   ├── project-ai-chat/    # RAG-enabled AI chat
│   ├── generate-embeddings/ # Vector embedding generation
│   ├── search-knowledge/   # Semantic search
│   └── ...
├── migrations/         # Database migrations (don't edit)
└── config.toml         # Supabase configuration

docs/
├── README.md           # This file
├── ARCHITECTURE.md     # Full architecture guide
├── PAGE_MAPPING.md     # File-to-page mapping
└── CHANGELOG.md        # Change log
```

### Key Files

| File | Purpose | Editable? |
|------|---------|-----------|
| `src/App.tsx` | Routing configuration | ✅ Yes |
| `src/index.css` | Global styles + design tokens | ✅ Yes |
| `tailwind.config.ts` | Tailwind configuration | ✅ Yes |
| `src/lib/ai-chat.ts` | AI streaming helpers | ✅ Yes |
| `src/data/course-content.json` | RAG knowledge source | ✅ Yes |
| `src/integrations/supabase/types.ts` | Database types | ❌ Auto-generated |
| `src/integrations/supabase/client.ts` | Supabase client | ❌ Auto-generated |
| `supabase/migrations/*` | Database schema | ❌ Managed by Supabase |

---

## Development Workflow

### Making Changes in Lovable
1. Make changes via Lovable chat
2. Changes auto-sync to GitHub
3. Update `CHANGELOG.md` with summary

### Making Changes via GitHub/IDE
1. Clone repo and make changes locally
2. Run locally: `bun dev` or `npm run dev`
3. Push to GitHub
4. Changes auto-sync to Lovable (~30 seconds)
5. Update `CHANGELOG.md` with summary

### Before You Start
📖 **Read [ARCHITECTURE.md](./ARCHITECTURE.md)** for:
- Complete directory structure
- Module breakdown
- Edge function documentation
- Database schema
- Common patterns
- Troubleshooting

---

## Semester Structure

The portal supports multiple semesters:

| Route Prefix | Semester | Sidebar |
|-------------|----------|---------|
| `/` | Landing | None |
| `/spring-2026/*` | Current (Spring 2026) | `Spring2026Sidebar` |
| `/fall-2025/*` | Archive (Fall 2025) | `ArchiveSidebar` |

---

## Key Features

### RAG-Enabled AI Chat
Project discussions use Retrieval-Augmented Generation:
- Course content indexed in `course_knowledge` table
- Project-specific content in `project_knowledge` table
- Semantic search via `pgvector` extension
- Streaming responses via Lovable AI Gateway

### Project Workspaces
Each topic (`/spring-2026/topics/:slug`) has:
- **Overview** - Topic description, questions, SDGs
- **Team** - Member management
- **Meetings** - Session scheduling
- **Milestones** - Progress tracking
- **Discussion** - RAG-enabled AI chat
- **Files** - Document sharing

---

## Contact

For codebase questions, see [ARCHITECTURE.md](./ARCHITECTURE.md).
