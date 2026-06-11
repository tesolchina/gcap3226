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
