# GCAP 3226 Course Portal - Documentation

This folder contains documentation for the GCAP 3226 Participatory Policy Analysis course portal.

## Documents

| File | Description |
|------|-------------|
| [PAGE_MAPPING.md](./PAGE_MAPPING.md) | Maps frontend pages/routes to source files |
| [CHANGELOG.md](./CHANGELOG.md) | Log of all changes made via Lovable or GitHub |

## Quick Reference

### Project Structure

```
src/
├── pages/              # Page components (one per route)
├── components/         # Reusable UI components
├── contexts/           # React contexts (Auth)
├── hooks/              # Custom React hooks
├── integrations/       # Supabase client & types
└── assets/             # Images and static files

supabase/
├── functions/          # Edge functions (backend logic)
└── config.toml         # Supabase configuration

docs/
├── README.md           # This file
├── PAGE_MAPPING.md     # File-to-page mapping
└── CHANGELOG.md        # Change log
```

### Key Files

- **Routing:** `src/App.tsx`
- **Styling:** `src/index.css`, `tailwind.config.ts`
- **Database Types:** `src/integrations/supabase/types.ts` (auto-generated)
- **Supabase Client:** `src/integrations/supabase/client.ts` (auto-generated)

## Development Workflow

### Making Changes in Lovable
1. Make changes via Lovable chat or visual editor
2. Changes auto-sync to GitHub
3. Update `CHANGELOG.md` with summary of changes

### Making Changes via GitHub/IDE
1. Clone repo and make changes locally
2. Push to GitHub
3. Changes auto-sync to Lovable
4. Update `CHANGELOG.md` with summary of changes

## Semester Structure

The portal supports multiple semesters:

- **Landing Page** (`/`): Semester selection
- **Spring 2026** (`/spring-2026/*`): Current semester
- **Fall 2025** (`/fall-2025/*`): Archived content

Each semester has its own sidebar navigation and page structure.
