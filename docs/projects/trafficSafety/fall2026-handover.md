# Road Safety — Fall 2026 Handover

Source: Gmail thread between Yingxin HUANG (TA, 25422308@life.hkbu.edu.hk),
Zehua WANG (25430718), Tian (Talia) WU (taliawu17@hkbu.edu.hk), Simon WANG.
Forwarded to Simon on 10 Jun 2026.

---

## Email 1 — "Update on 2004–2024 Traffic Accident Blackspot Data" (Talia → team, 10 Jun 2026)

> Sorry for the late reply and thank you so much for your effort on studying
> and cleaning this dataset! Your description is very clear to me. Please go
> ahead to explore the relationship between the number of accident and the
> independent variables for the **21 selected junctions**.
> — Talia

Replying to Yingxin's 2 Jun 2026 message that established:

1. **Annual data, not 10-year totals.** Larger sample → fixes model
   convergence.
2. **Quarterly figures are cumulative-to-date, not single-quarter.** The Q4
   record = full-year total. Rolling-window explanation included as an Excel
   sheet.
3. **21 intersections selected** — listed as a blackspot ≥5 years AND
   pre-imputation total accident count > 50.
4. Missing-value rule: backfill from quarterly records of the same year; if
   none, fill 0 and grey-highlight.
5. Site-name standardisation: all junction names converted to UPPERCASE to
   prevent duplicate matches.
6. **8 independent variables** collected manually via Google Maps observation
   for each of the 21 junctions.

## Email 2 — "Research Progress Update on Accident Blackspots Study (0605)" (Talia → team, 10 Jun 2026)

> It turns out that within all blacksites, **Yau Tsim Mong and Sham Shui Po
> districts have the highest number of accidents**. And **Chatham Road
> South–Austin Road–Cheong Wan Road** is Hong Kong's most severe accident
> hotspot from 2015 to 2024 (this is the junction right out of PolyU! It will
> be interesting to combine this information with the traffic volume and
> explore the relationship. **I may leave this task to GCAP3226 students next
> semester**). On the other hand, **Kweilin Street & Tai Nan Street** (Sham
> Shui Po) is Hong Kong's worst pedestrian-involved accident hotspot from
> 2015 to 2024 — a very narrow junction; every street is one-way.
> — Talia
>
> May I ask why the **top 15** intersections (instead of 21) will be used in
> the next-step model construction? Just curious.

Replying to Yingxin's 5 Jun 2026 progress update:

- **`Data (0604).xlsx`** finalised with three sheets:
  - `total_X&Y` — annual data for **top 15 blackspots × 8 IVs** for
    regression.
  - `Data Statistics` — annual stats for all blackspots.
  - `Original data` — consolidated 40 Transport Department files (2015–2024)
    with region/district/junction names verified.
- Missing values currently zero-filled; alternative is threshold-based
  imputation aligned with HK official Class-A blackspot definition (≥6
  pedestrian-injury or ≥9 injury accidents in 1 year).
- **`Accident Blackspots Visualization & Key Findings (0605).ipynb`** — full
  EDA, runs standalone when placed next to the xlsx.
- Modelling handed over to **Zehua WANG**.

---

## What is in the shared Google Drive folder (`GCAP3226_2526S2_RoadSafety`)

- `Junction Blacksite list (2004–2024)/` — yearly subfolders
- `2014-2024 交通黑点数据统计.xlsx`
- `Data (0604).xlsx` — cleaned annual dataset (top 15) + 8 IVs
- `Accident Blackspots Visualization & Key Findings (0605).ipynb`
- `psi-hkpf-ts-sc.json` — HKPF signal-controlled junction data
- `existing visualization.txt`
- 2019 reference paper PDF — methodology to replicate

---

## Email thread timeline — "Update on 2004–2024 Traffic Accident Blackspot Data from Transport Department, HKSAR"

Full chronology of correspondence between Yingxin HUANG (Kelly, 25422308@life.hkbu.edu.hk), Zehua WANG (25430718@life.hkbu.edu.hk), Tian (Talia) WU (taliawu17@hkbu.edu.hk) and Simon WANG (simonwang@hkbu.edu.hk). Forwarded to Simon's Gmail (simonwanghkteacher@gmail.com) for archiving.

- **8 May 2026 — Yingxin → Talia (cc Zehua, Simon)**: Confirms that the Transport Department replied with 2004–2024 traffic blackspot data files. Dataset compiles accidents by district + intersection, split into all accidents vs pedestrian-involved, with injury severity. Team will start cleaning and move into the negative-binomial regression from Wong (2019).
- **8 May — Talia replies**: Asks Yingxin to forward the original TD email for record; asks her to split work with Zehua. Follow-up: prefers analysis written up in a Jupyter Notebook / R Markdown so the process is transparent.
- **13 May — Zehua reports**: Issue identified — TD provides accident counts per junction *only for years the junction was on the blackspot list*, so junctions that became blackspots only in 2023/2024 have no earlier data. Needs to derive the subset of junctions with continuous coverage.
- **13 May — Talia responds**: Important data caveats:
  - TD data is delivered as PDF tables. Asks how Zehua extracted them (manual vs Python/AI script).
  - **For each year there are 4 documents covering rolling 12-month windows** (e.g. 2004: Apr 03–Mar 04, Jul 03–Jun 04, Oct 03–Sep 04, Jan 04–Dec 04). Asks which window will be used and why.
  - Endorses restricting scope to "factors affecting accidents at blacksite junctions" — generalisation to normal junctions not claimed.
  - Asks how time and region will enter the model.
- **14 May — Simon (to Talia, Zehua, Yingxin)**: Asks for a Google Drive folder shared to `simonwanghkteacher@gmail.com` to track TD + police data.
- **14 May — Talia**: Shares Google Drive folder `131o-54qu9lQc2R3HzxUyBqD4p07F_jg9` (GCAP3226_2526S2_RoadSafety). Notes that only 2004–2009 data are PDFs; 2010 onward are Excel.
- **16–17 May**: Meeting scheduled — Friday 22 May 15:00 in Talia's office at HKBU.
- **22 May — Meeting outcomes (Talia)** (the action list students should treat as the canonical brief):
  - **Exploratory data analysis**: data-availability visualisation; 9-line chart; frequency of being a black site (which district has the most listed intersections?).
  - **Core analysis**: completely replicate Wong (2019) — total accidents over 10 years as `y` in negative binomial regression.
  - **Further enquiry to TD**: historical accident numbers across all junctions / focused junctions.
  - **Deliverable**: save the cleaned dataset to the shared Drive folder.
- **31 May — Zehua**: Negative binomial regression on 10-year totals did not converge. Used `statsmodels GLM NegativeBinomial` as a fallback at AI's suggestion; flags inability to replicate Wong (2019) at 100% fidelity.
- **1 Jun — Talia diagnoses**: With 10-year totals as `y`, there are only **9 data points** — non-convergence is unsurprising. Wong (2019) does not state its sample size and "is very unclear and thus very suspicious". Pivot:
  1. **Use annual data, not 10-year totals** → adds many more junctions.
  2. Sort a clean dataset with region + year columns.
  3. Collect the independent variables (warn Talia first if collection is heavy).
  4. Asks where the EDA results live (data-availability viz, 9-line chart, blackspot frequency by district).
- **2 Jun — Yingxin's structured response** (the basis of the current `Data (0604).xlsx`):
  1. Adopt annual data per Talia's instruction → larger sample, model should converge.
  2. **Key data interpretation**: TD's quarterly figures are *cumulative-to-date within the year*, **not single-quarter** counts. 2015-Q4 = full 2015 total. "Rolling Window Explanation" sheet documents this.
  3. Cleaned all Q4 annual records 2015–2024 → sheet `Data Statistics`. Sorted junctions by frequency of being listed. Preliminarily selected **21 intersections** (≥5 years as blackspot AND pre-imputation total accidents > 50).
  4. Missing-value rule: backfill from same-year quarterly records; otherwise 0, with grey-highlighted cells.
  5. Site-name standardisation: all junction names converted to UPPERCASE to avoid duplicate matches from mixed casing.
- **Subsequent (5 Jun + 10 Jun threads — captured in the "Email 1 / Email 2" sections above)**: Talia approves exploring the 21 junctions; raises the open question of why the regression sheet was narrowed from 21 → top 15. Yingxin and Zehua produce `Data (0604).xlsx` + `Accident Blackspots Visualization & Key Findings (0605).ipynb`. Modelling is handed to Zehua.

### Talia's specific Fall-2026 hand-off

> "Chatham Road South–Austin Road–Cheong Wan Road is Hong Kong's most severe accident hotspot from 2015 to 2024 — this is the junction right outside PolyU. It will be interesting to combine this information with the traffic volume and explore the relationship. **I may leave this task to GCAP3226 students next semester.**" — Talia, Jun 2026

This is the concrete sub-project Fall 2026 students are expected to take on.

