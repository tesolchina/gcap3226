import WeekLayout from "@/components/WeekLayout";

const Spring2026Week7 = () => (
  <WeekLayout
    weekNumber={7}
    title="Second Group Consultation & Data Review"
    description="Debrief fieldwork experiences, review collected data, and plan for data integration and analysis."
    objectives={[
      "Share and debrief fieldwork experiences",
      "Review and assess collected primary data",
      "Identify data gaps and supplementary needs",
      "Plan for data integration and analysis",
    ]}
    activities={[
      "Small group consultation meeting (teacher-led discussion)",
      "Fieldwork debrief and experience sharing",
      "Data quality review session",
      "Planning next steps for analysis",
    ]}
    assessment="Reflective Essay 2 (part of 20%)"
    assessmentLink="/spring-2026/weeks/7/reflective-essay-2"
  />
);

export default Spring2026Week7;
