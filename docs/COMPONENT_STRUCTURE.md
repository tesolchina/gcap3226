# Component Structure Guide

This document describes the organization and design patterns for components in the GCAP 3226 Course Portal.

## Folder Organization

### Modular Component Structure

Components are organized by feature/function:

```
src/components/
├── ui/                    # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
├── week1/                 # Week 1 course content
│   ├── index.ts           # Barrel file for exports
│   ├── Part1DataGovernance.tsx
│   ├── BusStopExample.tsx
│   └── FluShotExample.tsx
│
├── project/               # Project management features
│   └── index.ts           # Re-exports and shared types
│
├── [FeatureName].tsx      # Standalone feature components
└── ...
```

### File Size Guidelines

- **Maximum**: 300 lines per file
- **Ideal**: 150-200 lines
- **Split when**: Component has multiple distinct sections or responsibilities

## Component Patterns

### 1. Standard Component Template

```tsx
/**
 * ComponentName - Brief description
 * 
 * Detailed explanation of what this component does,
 * when to use it, and any important considerations.
 * 
 * @component
 */

import { useState } from "react";
// Group imports by type: React, libraries, components, utils, types

interface ComponentNameProps {
  /** Description of prop */
  propName: PropType;
}

const ComponentName = ({ propName }: ComponentNameProps) => {
  // State and hooks at top
  const [state, setState] = useState<StateType>(initialValue);

  // Event handlers and effects
  const handleEvent = () => {
    // Logic here
  };

  // Render
  return (
    <div>
      {/* JSX with comments for complex sections */}
    </div>
  );
};

export default ComponentName;
```

### 2. Barrel File Pattern (index.ts)

Use barrel files for clean imports:

```tsx
// src/components/week1/index.ts
export { default as Part1DataGovernance } from './Part1DataGovernance';
export { default as BusStopExample } from './BusStopExample';
export { default as FluShotExample } from './FluShotExample';
```

Usage:
```tsx
import { Part1DataGovernance, BusStopExample } from '@/components/week1';
```

### 3. Sub-Component Pattern

For large components, extract sub-components in the same file or separate files:

```tsx
// Same file (when tightly coupled)
const Header = () => <header>...</header>;
const Content = () => <main>...</main>;

const Page = () => (
  <>
    <Header />
    <Content />
  </>
);

// Separate files (when reusable or complex)
// Page/index.ts, Page/Header.tsx, Page/Content.tsx
```

## Component Categories

### 1. UI Components (`/ui`)

Base components from shadcn/ui. Do not modify directly.

### 2. Layout Components

Handle page structure and navigation:
- `Spring2026Sidebar.tsx` - Spring 2026 navigation
- `ArchiveSidebar.tsx` - Fall 2025 archive navigation
- `WeekLayout.tsx` - Weekly content layout wrapper
- `TopicLayout.tsx` - Project topic page layout

### 3. Feature Components

Implement specific functionality:
- `ProjectMembership.tsx` - Team join/approval workflow
- `ProjectMilestones.tsx` - Progress tracking
- `ProjectSessions.tsx` - Discussion sessions with voice
- `MCPoll.tsx` - Multiple choice polling

### 4. Course Content Components

Display course materials:
- `week1/` - Week 1 specific content
- `MermaidDiagram.tsx` - Flowchart rendering
- `CourseRoadmap.tsx` - Course timeline visualization

## State Management

### Local State

Use `useState` for component-specific state:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Context State

Use for cross-component state:

```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, isTeacher } = useAuth();
```

### Server State

Use React Query for data fetching:

```tsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['milestones', projectGroupId],
  queryFn: fetchMilestones,
});
```

## Error Handling in Components

Use the error handler utilities:

```tsx
import { handleError, withErrorHandling } from '@/lib/error-handler';

// In event handlers
const handleSubmit = async () => {
  try {
    await saveData();
  } catch (err) {
    handleError(err, { component: 'FormName' }, 'Failed to save');
  }
};

// Or wrap the function
const handleSubmit = withErrorHandling(
  async () => {
    await saveData();
  },
  { component: 'FormName' }
);
```

## Styling Guidelines

### Use Semantic Tokens

```tsx
// ✅ Good - uses design system tokens
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// ❌ Bad - hardcoded colors
<div className="bg-white text-black">
<button className="bg-blue-500 text-white">
```

### Responsive Design

Use Tailwind breakpoints consistently:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## Adding New Components

1. **Create file** in appropriate folder
2. **Add JSDoc comments** at top of file
3. **Export from barrel file** if in a module folder
4. **Update documentation** if significant
5. **Add changelog entry** for notable additions
