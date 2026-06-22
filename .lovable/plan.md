
## Three parallel work streams

### Stream 1 — Transport Department enquiry (this week)

**Goal:** before sending any question to TD, know what's already public so we don't waste our one shot.

1. Crawl & log (Firecrawl + web_search) — save raw findings to `docs/projects/trafficSafety/td-desk-research.md`:
   - td.gov.hk → Road Safety section, *Road Traffic Accident Statistics*, *Annual Transport Digest*
   - Road Safety Council annual reports (2015–2024)
   - LegCo Panel on Transport — written replies & papers mentioning "blackspot" / "黑點"
   - Audit Commission + Ombudsman reports touching road safety
   - HKPF traffic statistics portal
2. Compress 14 questions → **5 sharp ones** TD cannot easily deflect. Demote the rest to an appendix "if time permits".
3. Write internal briefing `docs/projects/trafficSafety/td-enquiry-prep.md`:
   - per question: predicted bureaucratic reply + our follow-up + fallback data source
   - cover-letter strategy (teacher signs, student CC) for higher response rate
4. Resend email to Talia/Kelly/Zehua, **CC simonwang@hkbu.edu.hk**, with link to briefing note (student-internal) and the trimmed question list (TD-facing).

### Stream 2 — Re-sequence 26-27 into a 10-week delivery window

**Constraint:** syllabus unchanged. Weeks 11–13 are effectively presentation/wrap-up only. All substantive student work must land by **end of Week 10**.

Proposed weekly rhythm — each week gets ONE Moodle task with a hard deadline (Sunday 23:59):

| Wk | Topic anchor | Moodle task (graded or checkpoint) |
|----|---|---|
| 1 | Course intro, data governance | Self-intro post + nickname + project preference (checkpoint) |
| 2 | Colab + Gemini + first plots | Notebook 1: open CSV in Colab, 3 plots, paste link (graded 5%) |
| 3 | Project team formation, framing | Project one-pager: question, dataset, decision (graded 5%) |
| 4 | Reflective essay 1 — *failure* | Essay 1 submission, Turnitin (graded 10%) |
| 5 | Code on Access draft | Public-data inventory + access plan (Workshop peer-review, 5%) |
| 6 | Mid-project checkpoint | Notebook 2: cleaned dataset + EDA (graded 10%) |
| 7 | Reflective essay 2 — *AI error* | Essay 2 submission (graded 10%) |
| 8 | LegCo / gov letter draft | Letter v1 upload (graded 10%) |
| 9 | Storyboard for final | Slide outline + 1 key chart (checkpoint) |
| 10 | **Hard stop**: final EL package + Human-AI report due | EL package + HAIC report upload (graded 25%) |
| 11 | Rehearsals only | Peer-review of recorded rehearsal (5%) |
| 12 | Public presentations | Attendance + Q&A participation (5%) |
| 13 | Reflective essay 3 — *ethics*, wrap | Essay 3 (graded 10%) |

Rationale notes for Simon stored in `docs/internal/2627-moodle-schedule.md` (not student-facing): which 2028-syllabus elements are folded in (pilot mindset → Wk 6, AI appendix → Wk 8+10, structured reflections → Wk 4/7/13).

### Stream 3 — Summer pre-build of reference answers (70-80% complete)

For every project, we produce a **teacher reference solution** before semester so we always have a defensible fallback. Stored in a single internal folder, never linked from student pages:

```
docs/internal/reference-solutions/
  road-safety/
    01-data-dictionary.md
    02-cleaned-dataset.parquet (or link)
    03-baseline-model.ipynb          ← Poisson + neg-binomial, 21 junctions
    04-chatham-rd-deepdive.ipynb     ← Talia's sub-project answer key
    05-policy-brief-draft.md
    99-known-gaps.md                 ← traffic volume, 2004-09 PDF parsing
  flu-shot/ …
  rodent/ …
  bus-stop-merge/ …
  cdcc/ …
  empf/ …
  colorectal/ …
```

Each project folder must contain, by **end of August**:
1. Data dictionary + cleaned dataset
2. One baseline analysis notebook that *runs end-to-end*
3. One "decision-relevant" output (chart / table / 1-page brief)
4. `known-gaps.md` — what students still need to discover (so we don't spoil)

Gate access via a single `docs/internal/README.md` that states: *internal, do not share with students; use only to unblock when teams stall*.

## Open decisions before I start

1. **TD enquiry signatory** — Talia alone, or teacher cover letter with Talia CC? (affects response rate a lot)
2. **Moodle grading weights** above are a draft — keep current syllabus weights and just *map* tasks onto them, or adjust?
3. **Reference-solution depth** — 70% (runs, has gaps) or 80% (publishable-quality)? More polish = less student discovery space.
4. Which project to pre-build **first** this week as the template (suggest: road safety, since data is most mature)?

## Technical / file deliverables

- New: `docs/projects/trafficSafety/td-desk-research.md`
- New: `docs/projects/trafficSafety/td-enquiry-prep.md`
- New: `docs/internal/2627-moodle-schedule.md`
- New: `docs/internal/reference-solutions/README.md` + per-project skeletons
- Update: handover.md cross-links
- Resend Gmail with CC simonwang@hkbu.edu.hk

No frontend/UI code in this plan — all docs + one email.
