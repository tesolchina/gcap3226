# Traffic Safety Research Project

  Private discussion hub for the Junction Blacksite / signal-controlled intersection safety
  research collaboration with **Tian Wu**.

  > Page (unlisted, not on sidebar or homepage):
  > `/spring-2026/projects/traffic-safety`

  ## Source materials

  - Google Doc — *Project Target*
    https://docs.google.com/document/d/1uSXKHkR-z-Z9xSkw12_bcVaWQr0GHmagts6mSmqPUxY/edit
  - Google Drive folder
    https://drive.google.com/drive/folders/131o-54qu9lQc2R3HzxUyBqD4p07F_jg9

  ### Folder inventory (snapshot)

  - `Junction Blacksite list (2004–2024)/` — yearly subfolders 2004–2024
  - `2014-2024 交通黑点数据统计.xlsx` — blacksite statistics spreadsheet
  - `psi-hkpf-ts-sc.json` — HKPF traffic / signal-controlled junction data
  - `existing visualization.txt`
  - `2019_Designs_for_Safer_Signal-Controlled_Intersections_by_Statistical_Analysis_of_Accident_Data_at_Accident_Blacksites.pdf`
    — reference paper to replicate

  ---

  ## Project Target (from doc)

  Replicate the study on the relationship between **accident counts and intersection layout
  geometries** at a range of signal-controlled intersections, with the aim of improving
  safety at these sites.

  ### Final deliverables

  1. Slide deck — background, research question(s), methodology, results, conclusion
  2. Jupyter Notebook implementing the methodology

  ---

  ## Student Team Update — 2 June 2026

  **Reported by:** Yingxin HUANG (25422308@life.hkbu.edu.hk)  
  **To:** Talia Wu (primary supervisor), CC: Simon Wang, Zehua WANG (25430718)

  ### Data Processing Revisions

  1. **Annual data adopted** (instead of 10-year aggregated totals) — per Prof. Wu's feedback.
     - Benefit: more intersections included → larger sample → better model convergence
     - Resolves the model convergence problem encountered earlier

  2. **Key interpretation of Transport Department raw data clarified:**
     - The published **quarterly** accident number does **not** represent accidents at a single point in time — it is cumulative/periodic data that requires careful interpretation before use

  ### Implications for the analysis pipeline
  - Statistical model (negative binomial / Poisson regression on accident counts) needs to be
    re-run with annual data slices instead of the aggregated 2004–2024 total
  - Sample size increase should improve regression stability
  - Need to verify whether intersection geometry variables are available at the annual level
    or only as a static snapshot

  ---

  ## Open Questions from Simon

  1. Summary of data-collection progress from government units, plus a timeline
  2. How to incorporate this project into **GCAP 3226**
  3. Can we pursue a research project leading to practical insights and publishable papers?
  4. How to leverage an AI agent in the workflow

  ---

  ## Suggested Next Steps (simongtd · 3 June 2026)

  ### Near-term (this month)
  1. **Confirm annual data structure** — ask Yingxin to share a sample of the annual
     blacksite list so we can verify columns align with the reference paper's variables
     (location ID, accident count, intersection geometry code, traffic volume)
  2. **Reproduce Table 1 of reference paper** with 2004–2024 annual data (one row per
     intersection per year) as a proof-of-concept before expanding the analysis
  3. **Set a milestone date** for the Jupyter Notebook first draft — suggest end of June 2026

  ### Research angle (medium-term)
  4. **Extend the 2019 paper** — the reference study used pre-2019 data; updating with
     2020–2024 data (post-COVID traffic patterns) could yield a publishable extension
  5. **Policy brief** — translate findings into an accessible policy brief for LegCo /
     Transport Department — fits GCAP 3226's citizen advocacy framing

  ### AI agent integration
  6. **Notebook scaffolding** — use AI to generate the initial pandas/statsmodels data
     pipeline (load annual Excel → merge geometry data → run NB regression → plot)
  7. **Automated data freshness** — if Transport Dept releases new quarterly data,
     set up a script to flag updates and re-run the model

  ---

  ## Gmail correspondence with Tian Wu (taliawu17@hkbu.edu.hk)

  Recent threads relevant to this project:

  - **2 June 2026 — Yingxin data update email** (see Student Team Update above)
  - **14 May 2026 — Folder shared: `GCAP3226_2526S2_RoadSafety`**
    Tian Wu invited Simon to contribute to a shared Google Drive folder for
    the road-safety strand of the course. This is the working folder for the
    junction blacksite materials.
  - **14–15 May 2026 — "GCAP 3226 catch up"** (calendar invite, Fri 15 May
    10:00–11:00 HKT). Sync meeting to align on next steps.
  - **13–14 Feb 2026 — "Recruiting Student Helpers for GCAP3226" / VTL
    funding report.** Talia recruited student helpers; the helper job scope
    explicitly includes **road safety** as a task area. Simon shared the
    VTL funding application and a past report template; a written report is due in May.
  