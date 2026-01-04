# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Initial docs folder structure
- PAGE_MAPPING.md for file-to-page documentation
- CHANGELOG.md for tracking changes

---

## [2026-01-04] - Semester Restructure

### Added
- **New landing page** (`/`) with semester selection cards
- **Spring 2026 portal** (`/spring-2026/*`) with MCCP-style structure
  - Weekly navigation sidebar (Weeks 1-13)
  - Course home page with instructor info and assessments
  - Week detail pages with objectives and activities
  - Placeholder pages for Syllabus, Resources, Feedback
- `Spring2026Sidebar.tsx` - Navigation component for Spring 2026
- `Spring2026Home.tsx` - Course landing page
- `Spring2026Week.tsx` - Dynamic weekly content pages
- `Spring2026Placeholder.tsx` - Placeholder for resource pages

### Changed
- Renamed `Home.tsx` → `Fall2025Archive.tsx` for archive content
- Created new `Home.tsx` as semester selection landing page
- Restructured `App.tsx` with conditional layouts based on route
- Fall 2025 routes now prefixed with `/fall-2025/*`
- Updated routing to support both semesters

### Removed
- `AppSidebar.tsx` - Replaced with semester-specific sidebars

---

## [2025-11-25] - Presentation Day Updates

### Changed
- Updated presentation date to November 25, 2025
- Updated class photo in Week 13 rundown
- CountdownTimer now shows "Nov 25" in display text

---

## [2025-11-XX] - Initial Release

### Added
- Course portal for GCAP 3226 Fall 2025
- 6 team pages with project-specific content
- Week 13 presentation rundown with timer
- AI Consultation Corner for student assistance
- Message Board for team discussions
- Government Messages section with comments
- Student submission forms
- Teacher authentication system
- Countdown timer to presentations

---

## How to Log Changes

When making changes via Lovable or GitHub IDE:

1. Add entry under `[Unreleased]` section
2. Use categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
3. Keep descriptions concise but clear
4. Include file names for significant changes
5. Move unreleased items to dated section when deploying

### Example Entry

```markdown
### Added
- New feature description (`src/components/NewComponent.tsx`)

### Changed
- Updated X to do Y (`src/pages/SomePage.tsx`)

### Fixed
- Bug where Z happened (#issue-number if applicable)
```
