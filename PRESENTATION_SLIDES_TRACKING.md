# Presentation Slides Embedding Tracking

This document tracks the progress of embedding presentation slides for each project team.

## Overview
- **Total Teams**: 6
- **Completed**: 3
- **Pending**: 3
- **Last Updated**: 10 November 2025

---

## Team Status

### 1. Flu Shot Campaign
- **Slug**: `flu-shot`
- **Status**: ✅ Completed
- **Description**: Mathematical Models and Data Governance for School Vaccination Decision-Making
- **Team Members**: Yeung Wing Yu (23238283), SU Jialu (22256946), Tsoi Yik Hon (22232192), LYU Junhan (23213078), Kwok Tsz Yau (22234020)
- **Presentation Focus**: Analysis of the collected data on flu shot participation, the identified issues and some suggestions
- **External Link**: https://docs.google.com/presentation/d/1pTljNxJVRCDRXT7upaSbb5BcUJN-fK8Fx9OKrEHXr9g/edit?slide=id.g13c2bc466cf_0_0#slide=id.g13c2bc466cf_0_0
- **Implementation**: Google Slides embedded via iframe (auto-generated from link)

---

### 2. Bus Route Coordination
- **Slug**: `bus-route`
- **Status**: ✅ Completed
- **Description**: Analysis of coordination opportunities between overlapping bus routes
- **Team Members**: 23229101 Tsoi Tsz Yan, 23229543 Yip Tsz Ying, 23232099 Chan Hei Tung, 23234997 Ko Man Wai, 23233168 Wong Ling Yan Cassy
- **Presentation Focus**: Latest results on overlap analysis of KMB 272A and Citybus 582, including primary data collection results and simulation approach
- **External Link**: https://www.canva.com/design/DAG35hPWmNQ/IlGCZkCiuludgaapq59b7g/edit?utm_content=DAG35hPWmNQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
- **Implementation**: Canva presentation embedded via iframe (auto-generated from link)

---

### 3. Typhoon Signal Analysis
- **Slug**: `typhoon-signals`
- **Status**: ⏳ Awaiting iframe code
- **Description**: Data-Driven Signal 8 Accuracy Assessment with Real-Time Wind Analysis
- **Iframe Code**: *Not provided yet*
- **External Link**: *Not provided yet*

---

### 4. Food Waste Management
- **Slug**: `food-waste`
- **Status**: ⏳ Awaiting iframe code
- **Description**: Municipal Solid Waste Charging Scheme Analysis
- **Iframe Code**: *Not provided yet*
- **External Link**: *Not provided yet*

---

### 5. Green Community Recycling
- **Slug**: `green-recycling`
- **Status**: ✅ Completed
- **Description**: Resource Allocation Decisions and App Usage Data Visualization
- **Team Members**: CHAN Chi Ki (23233885), CHEUNG Kwun Ho (24219169), MAN Wai Yin (24202509), TAG Tsz Tung (23230371), HO Chun Chit (24202495), XU Jingyi (24205397)
- **Presentation Focus**: Progress update on Green@Community Recycling Network Overall Effectiveness Analysis, including data collection results, methodological approach, and preliminary insights & recommendations
- **External Link**: https://www.canva.com/design/DAG3DVo0bFM/ccCZTkLPMLNSCDOxcBHo4w/view?embed
- **Iframe Code**: `<iframe src="https://www.canva.com/design/DAG3DVo0bFM/ccCZTkLPMLNSCDOxcBHo4w/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>`
- **Implementation**: Canva presentation embedded with custom iframe code

---

### 6. Bus Stop Merge
- **Slug**: `bus-stop-merge`
- **Status**: ⏳ Awaiting iframe code
- **Description**: Real-Time API Data Analysis and Bus Stop Placement Optimization
- **Iframe Code**: *Not provided yet*
- **External Link**: *Not provided yet*

---

## Implementation Notes

### Current Implementation
- Placeholder section added to the **Introduction tab** of each team page
- UI includes:
  - Presentation icon header
  - "Open in new tab" button (currently linking to `#`)
  - Placeholder container with dashed border showing team name
  - Aspect ratio container ready for iframe embed

### Next Steps
1. Receive iframe code for each team's presentation
2. Update the iframe placeholder with actual embed code
3. Update the "Open in new tab" button with the correct external link
4. Test responsiveness and loading behavior
5. Update this tracking document with completion status

### To Embed Slides
When you have the iframe code, locate the team's section in `src/pages/TeamPage.tsx` and replace:
```tsx
<div className="bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 aspect-video flex items-center justify-center">
  {/* Placeholder content */}
</div>
```

With:
```tsx
<div className="rounded-lg overflow-hidden aspect-video">
  <iframe 
    src="[PRESENTATION_URL]"
    className="w-full h-full border-0"
    allowFullScreen
  />
</div>
```

And update the external link button from:
```tsx
<a href="#" target="_blank" rel="noopener noreferrer">
```

To:
```tsx
<a href="[EXTERNAL_LINK_URL]" target="_blank" rel="noopener noreferrer">
```

---

## Status Legend
- ✅ Completed - Slides embedded and tested
- 🔄 In Progress - Iframe code received, implementing
- ⏳ Awaiting iframe code - Placeholder in place
- ❌ Issue - Problem with embedding or link
