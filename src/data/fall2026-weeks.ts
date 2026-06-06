// Fall 2026 weekly plan — mirrors Spring 2026 structure with TBA dates.
// Each week spells out what students should do BEFORE class, IN class,
// AFTER class, and on the Moodle forum.

export type Fall2026Week = {
  week: string;            // display label, e.g. "1" or "3-4"
  routeWeek: string;       // route segment, e.g. "1"
  date: string;            // TBA-friendly
  title: string;
  description: string;     // 1-line summary for roadmap card
  badge?: { text: string; color: string };
  borderColor: string;
  badgeColor: string;
  milestone?: string;
  warning?: string;
  beforeClass: string[];
  inClass: string[];
  afterClass: string[];
  moodleForum: {
    title: string;         // placeholder forum thread title
    prompt: string;        // what students post
    dueBy: string;         // e.g. "Before next class"
  };
};

export const FALL_2026_WEEKS: Fall2026Week[] = [
  {
    week: "1",
    routeWeek: "1",
    date: "TBA — Week of course start",
    title: "Course Introduction",
    description:
      "Welcome and course overview. Public policy in Hong Kong, SDGs, and how data governance shapes everyday life. Tooling setup (VS Code, GitHub Copilot).",
    borderColor: "border-primary",
    badgeColor: "bg-primary",
    beforeClass: [
      "Read the syllabus and the Fall 2026 course roadmap.",
      "Skim the Spring 2026 archive for 1 project that interests you.",
      "Create accounts: GitHub, GitHub Copilot for Students, Moodle check.",
    ],
    inClass: [
      "Course walkthrough: assessments, weekly rhythm, AI tutor, Moodle forum.",
      "Mini case: the St Martin bus stop story — how one citizen moved a department.",
      "Install check: VS Code + Copilot working on your laptop.",
    ],
    afterClass: [
      "Finish any installation issues with the student partner.",
      "Try the Course AI Tutor on the Fall 2026 home page — ask it 2 questions about the course.",
    ],
    moodleForum: {
      title: "Forum 1 — Introductions & one HK policy issue you care about",
      prompt:
        "Post (150–200 words): introduce yourself, and name ONE Hong Kong public-policy issue you'd like to understand better this semester. Why it matters to you, and what data you'd want to see.",
      dueBy: "Before Week 2 class",
    },
  },
  {
    week: "2",
    routeWeek: "2",
    date: "TBA",
    title: "AI Tools & Vibe Coding",
    description:
      "AI-assisted Python with Jupyter, VS Code, and GitHub. No prior coding needed. Hands-on with a small public dataset.",
    borderColor: "border-primary",
    badgeColor: "bg-primary",
    beforeClass: [
      "Skim the Spring 2026 Week 2 lab to see what you'll be doing.",
      "Make sure GitHub Copilot is active in VS Code.",
    ],
    inClass: [
      "Live demo: load a CSV, ask Copilot to chart it, debug together.",
      "Pair exercise: each pair produces ONE chart from a HK open dataset.",
      "Discussion: what AI got right, what it got wrong, what you had to fix.",
    ],
    afterClass: [
      "Push your notebook to your GitHub.",
      "Complete In-Class Exercise 1 (notebook + 100-word reflection).",
    ],
    moodleForum: {
      title: "Forum 2 — Your first AI-assisted chart",
      prompt:
        "Post a screenshot of your chart + a 100-word note: what did the AI do well, what did you have to correct, and what does the chart actually show?",
      dueBy: "Before Week 3 class",
    },
    badge: { text: "In-class Exercise 1 (5%)", color: "text-green-600" },
  },
  {
    week: "3-4",
    routeWeek: "3",
    date: "TBA — 2 sessions",
    title: "Group Formation & Topic Selection",
    description:
      "Form project groups of 5. Review the 10 Fall 2026 project topics (TBA). Each group commits to one topic by end of Week 4.",
    borderColor: "border-green-500",
    badgeColor: "bg-green-500",
    milestone: "Confirm group + topic by end of Week 4",
    badge: { text: "In-class Exercise 2 (5%)", color: "text-green-600" },
    beforeClass: [
      "Read all 10 topic briefs on the Project Topics page (TBA).",
      "Rank your top 3 topics privately.",
    ],
    inClass: [
      "Speed-pitch: each student says their top topic in 60 seconds.",
      "Form groups of 5 around shared topic interest.",
      "Each group fills in the Group Charter template (roles, contact, meeting day).",
    ],
    afterClass: [
      "Submit the Group Charter on Moodle.",
      "Group meets once outside class to scope the topic.",
    ],
    moodleForum: {
      title: "Forum 3 — Group charter & topic rationale",
      prompt:
        "ONE post per group: list members, chosen topic, and a 200-word rationale (why this topic, what decision you want to influence, what data you think exists).",
      dueBy: "Before Week 5 class",
    },
  },
  {
    week: "5",
    routeWeek: "5",
    date: "TBA",
    title: "Data Collection Planning",
    description:
      "Plan two data streams: (1) written requests to government departments, (2) primary fieldwork. Receive HK$300 fieldwork allowance forms.",
    borderColor: "border-blue-500",
    badgeColor: "bg-blue-500",
    milestone: "Data collection plan submitted",
    badge: { text: "Reflective Essay 1 (part of 20%)", color: "text-blue-600" },
    beforeClass: [
      "Read the Spring 2026 Government Information Requests guide.",
      "List 3 government departments that could hold data on your topic.",
    ],
    inClass: [
      "Workshop: draft a letter/email requesting data from a department.",
      "Workshop: design a small fieldwork protocol (where, when, what to count).",
      "Risk + ethics briefing for fieldwork.",
    ],
    afterClass: [
      "Send the data request email (cc the teaching team).",
      "Submit Data Collection Plan (1 page).",
      "Start Reflective Essay 1 — due before Week 7.",
    ],
    moodleForum: {
      title: "Forum 4 — Your data request letter (draft)",
      prompt:
        "Post your draft government request letter for peer feedback. Give substantive feedback to at least 2 other groups.",
      dueBy: "Before Week 6 class",
    },
  },
  {
    week: "6",
    routeWeek: "6",
    date: "TBA — No class",
    title: "Field Work (No Class)",
    description:
      "No in-class session. Go out and collect your primary empirical data. Each student receives HK$300 allowance.",
    borderColor: "border-green-500",
    badgeColor: "bg-green-500",
    milestone: "Fieldwork conducted",
    warning: "Fieldwork allowance form due this week.",
    beforeClass: [
      "Confirm fieldwork site, date, and partner(s).",
      "Print/prepare data-collection sheet or mobile form.",
    ],
    inClass: [
      "No in-class meeting — fieldwork in pairs/small groups.",
      "Optional: virtual check-in with teaching team on Moodle chat.",
    ],
    afterClass: [
      "Digitize your fieldwork notes into a shared CSV.",
      "Submit fieldwork allowance form + receipts.",
    ],
    moodleForum: {
      title: "Forum 5 — Fieldwork field note",
      prompt:
        "Post 1 photo + a 150-word field note: what you observed, what surprised you, and one thing you'd do differently.",
      dueBy: "Before Week 7 class",
    },
  },
  {
    week: "7",
    routeWeek: "7",
    date: "TBA",
    title: "Group Meeting: Data Review",
    description:
      "Debrief fieldwork. Review government responses received so far. Group consultation with teachers.",
    borderColor: "border-blue-500",
    badgeColor: "bg-blue-500",
    milestone: "Fieldwork debrief complete",
    badge: { text: "Reflective Essay 2 (part of 20%)", color: "text-blue-600" },
    beforeClass: [
      "Bring your cleaned fieldwork CSV.",
      "Bring any reply (or non-reply) from the government department.",
    ],
    inClass: [
      "Group-by-group consultation (15 min each).",
      "Decide: what's missing, who follows up, by when.",
    ],
    afterClass: [
      "Send follow-up email if no government reply yet.",
      "Submit Reflective Essay 2.",
    ],
    moodleForum: {
      title: "Forum 6 — Gaps in your data",
      prompt:
        "Post your group's biggest data gap and one concrete plan to close it before Week 8.",
      dueBy: "Before Week 8 class",
    },
  },
  {
    week: "8",
    routeWeek: "8",
    date: "TBA",
    title: "Group Meeting: Data Complete",
    description:
      "MILESTONE — complete all empirical data collection. Begin analysis with AI tools.",
    borderColor: "border-green-500",
    badgeColor: "bg-green-500",
    milestone: "All data collection complete",
    beforeClass: [
      "Finalize your dataset; one canonical CSV per group.",
      "Write a 1-paragraph data dictionary (columns, units, source).",
    ],
    inClass: [
      "AI-assisted exploratory analysis: descriptive stats, first plots.",
      "Identify the ONE quantitative question your project will answer.",
    ],
    afterClass: [
      "Commit dataset + notebook to your group's GitHub.",
    ],
    moodleForum: {
      title: "Forum 7 — Your project's quantitative question",
      prompt:
        "Post: (a) your one quantitative question, (b) the variable(s) involved, (c) the method you plan to try.",
      dueBy: "Before Week 9 class",
    },
  },
  {
    week: "9",
    routeWeek: "9",
    date: "TBA",
    title: "Group Meeting: Analysis",
    description:
      "Consultation. Use AI for analysis, visualization, and basic modeling. Draft report outline focused on data governance.",
    borderColor: "border-blue-500",
    badgeColor: "bg-blue-500",
    milestone: "Draft report outline submitted",
    badge: { text: "Reflective Essay 3 (part of 20%)", color: "text-blue-600" },
    beforeClass: [
      "Bring at least 2 charts and 1 model attempt (even if rough).",
      "Re-read the report rubric.",
    ],
    inClass: [
      "Consultation per group — focus on argument, not aesthetics.",
      "Critique: does the data actually answer the question?",
    ],
    afterClass: [
      "Submit Draft Report Outline (1 page).",
      "Submit Reflective Essay 3.",
    ],
    moodleForum: {
      title: "Forum 8 — One chart that surprised you",
      prompt:
        "Post one chart from your analysis + 100 words on what it tells you and what it doesn't.",
      dueBy: "Before Week 10 class",
    },
  },
  {
    week: "10",
    routeWeek: "10",
    date: "TBA",
    title: "Group Meeting: Draft Ready",
    description:
      "Complete the full draft report. Structure: Background → Decisions → Data available → Government data use → Math modeling → Recommendations.",
    borderColor: "border-primary",
    badgeColor: "bg-primary",
    milestone: "Report draft ready for review",
    beforeClass: [
      "Each group circulates their draft inside the group 48h before class.",
      "Each member writes 3 comments on the draft.",
    ],
    inClass: [
      "Cross-group peer review (groups swap drafts).",
      "Teaching team reviews structure, not polish.",
    ],
    afterClass: [
      "Revise based on peer + teacher feedback.",
      "Prepare slides for Week 11.",
    ],
    moodleForum: {
      title: "Forum 9 — Peer review checklist",
      prompt:
        "Post your filled-in peer review checklist for the group whose draft you reviewed.",
      dueBy: "Before Week 11 class",
    },
  },
  {
    week: "11",
    routeWeek: "11",
    date: "TBA",
    title: "Presentation 1",
    description:
      "In-Class Presentation 1 (8 min): project progress, data governance findings, preliminary recommendations.",
    borderColor: "border-purple-500",
    badgeColor: "bg-purple-500",
    badge: { text: "In-Class Presentation 1 (10%)", color: "text-purple-600" },
    beforeClass: [
      "Rehearse once with a timer.",
      "Upload slides to Moodle before class.",
    ],
    inClass: [
      "8-minute presentations + 4 minutes Q&A per group.",
      "Audience: every student fills the feedback form for each group.",
    ],
    afterClass: [
      "Read the feedback you received; note the top 2 things to change.",
    ],
    moodleForum: {
      title: "Forum 10 — Top 2 changes after Presentation 1",
      prompt:
        "Post the 2 most important changes your group will make based on the feedback, with a 1-line plan for each.",
      dueBy: "Before Week 12 class",
    },
  },
  {
    week: "12",
    routeWeek: "12",
    date: "TBA",
    title: "Finalize Deliverables",
    description:
      "Refine models, visualizations, and report. Prepare LegCo submission as a formal complaint about data governance.",
    borderColor: "border-orange-500",
    badgeColor: "bg-orange-500",
    badge: { text: "Human-AI Collaboration Report (20%)", color: "text-orange-600" },
    beforeClass: [
      "Lock the final dataset and chart set — no new analysis after this week.",
      "Draft the LegCo cover letter.",
    ],
    inClass: [
      "Workshop on the Human-AI Collaboration Report (what to document, what to evidence).",
      "Final consultation slots.",
    ],
    afterClass: [
      "Submit Human-AI Collaboration Report.",
      "Finalize LegCo submission package.",
    ],
    moodleForum: {
      title: "Forum 11 — How AI helped (and didn't)",
      prompt:
        "Post 200 words: where AI genuinely moved your project forward, and where it slowed you down or misled you.",
      dueBy: "Before Week 13 class",
    },
  },
  {
    week: "13",
    routeWeek: "13",
    date: "TBA",
    title: "Final Presentation & LegCo Submission",
    description:
      "Final team presentations. Submit the report to the Legislative Council via the redress system as a complaint about data governance.",
    borderColor: "border-yellow-500",
    badgeColor: "bg-yellow-500",
    badge: { text: "Final Presentation (10%) + Report (30%)", color: "text-yellow-600" },
    beforeClass: [
      "Final dress rehearsal.",
      "Print/queue the LegCo submission for sending in class.",
    ],
    inClass: [
      "Final presentations (10 min) + LegCo submission ceremony.",
      "Course wrap-up and feedback round.",
    ],
    afterClass: [
      "Confirm LegCo acknowledgement email is received.",
      "Complete the end-of-course Moodle survey.",
    ],
    moodleForum: {
      title: "Forum 12 — One thing I'll carry forward",
      prompt:
        "Post 150 words: one skill, idea, or habit from this course you'll carry into your next year of study.",
      dueBy: "End of exam week",
    },
  },
];
