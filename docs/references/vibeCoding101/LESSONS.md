# Lessons from `tesolchina/vibeCoding101`

Cloned from https://github.com/tesolchina/vibeCoding101 (the closest match to
the requested but non-existent `vibecodingskills` repo).

The repo is **not** a JS/TS framework — it is a teaching collection of Python
scripts and AI-agent **instruction templates** used in Simon's Fall 2025
workshops (GCAP 3056, LANG 0036, PolyU guest lecture). Useful patterns
worth borrowing into the GCAP 3226 site below.

## 1. Instruction-driven agent pattern (the most reusable idea)

Every task folder ships a small `instructions.md` that the AI reads as the
single source of truth:

```
## Input Files
**Files**: AgentProcessAdvanced/lecture.vtt and AgentProcessAdvanced/article.pdf

## Processing Steps
1. Process both VTT and PDF files
2. Perform cross-source analysis
3. Generate comprehensive analysis and research insights

## Output Files
**Files**: AgentProcessAdvanced/comprehensive_analysis.md and
AgentProcessAdvanced/research_insights.md

## Instructions for AI Agent
Read this file and process both files according to the steps above.
```

Why it's good:
- Declarative input → steps → output, no hidden context
- Output paths are pre-declared so the next agent can chain
- A student or AI can both follow the same file

**How we can use it in GCAP 3226:** add a `docs/projects/<topic>/agent.md`
per project topic (road safety, EV chargers, typhoon…). The topic page's AI
Tutor system prompt already does this in code; the markdown version makes it
inspectable to students and reusable in Copilot/Codex sessions.

## 2. Orchestrator script (`master_process.py`)

`PolyUGuestLecture10Oct/Scripts/master_process.py` runs a citation-mapping
pipeline by calling sub-scripts in order with logging at each step. Pattern:
small focused scripts + one orchestrator. This mirrors how an **edge function
dispatcher** should look: thin router, fat task modules.

## 3. Real (if minimal) tests

`webSearchCrawl/test_crawler.py` is a 50-line smoke test that exercises:
- `robots.txt` compliance for known allow/deny URLs
- one real page crawl
- prints PASS/FAIL with check marks

Not a formal test framework, but it is the right MVP: a runnable script that
proves the unit works end-to-end before integrating. For our site, this maps
to **Deno tests for edge functions** (`supabase/functions/<fn>/<fn>_test.ts`)
which we currently do not have any of.

## 4. Modular layout per workshop

Each subfolder is self-contained: `README.md`, `data/`, scripts, output. No
shared utilities, no cross-folder imports. For teaching this is right — easy
to fork one folder. For our app this maps to the **"1 file per page"** rule
we already follow (see project memory).

## 5. Student / teacher copy split

`student_workshop.ipynb` vs `student_workshop teacher copy.ipynb` — same
notebook, teacher version has filled-in answers. We could do the same for
the road-safety notebook handover: ship a blank student notebook and keep a
teacher-only solution copy behind the existing presentation password gate.

---

## What was copied into `docs/references/vibeCoding101/`

- `patterns/instructions_advanced.md`, `instructions_pdf.md`,
  `instructions_vtt.md` — the agent-instruction triplet shown above.
- `patterns/processing_template.md`, `student_template.md` — fill-in
  templates for new workshop folders.
- `scripts/ofca_crawler.py`, `test_crawler.py`, `run_crawler.py`,
  `README_OFCA_Crawler.md` — `robots.txt`-respecting site crawler. Directly
  reusable if a GCAP 3226 team needs to scrape a HK gov portal that lacks an
  open dataset.
- `scripts/master_process.py`, `enhanced_pdf_to_md.py`, `map_citations.py`,
  `extract_all_references.py` — citation-mapping pipeline. Useful for the
  road-safety project's reference-paper extension (find every cited paper,
  fetch metadata, build a literature-map table).
- `scripts/citation_mapper_requirements.txt` — Python deps for those.

Skipped: PDFs/VTTs/Word docs (binary, large), Jupyter notebooks (not used
in the React app), course-specific lesson plans for LANG 0036.

## Suggested next steps for our project

1. Add a `docs/projects/road-safety/agent.md` mirroring the
   instructions-md pattern so the AI Tutor's context is editable by humans
   without redeploying the edge function.
2. Add one Deno smoke test for `fall2026-tutor` (allowlist enforcement +
   401/429 paths) — we have zero tests today.
3. If a team picks the citation-extension sub-question, hand them
   `scripts/master_process.py` + `map_citations.py` as a starting kit.
