import WeekLayout from "@/components/WeekLayout";

const Spring2026Week12 = () => (
  <WeekLayout
    weekNumber={12}
    title="Finalize Deliverables"
    description="Refine models, visualizations, and advocacy products based on feedback."
    objectives={[
      "Finalize research deliverables",
      "Polish visualizations and reports",
      "Prepare advocacy materials",
    ]}
    activities={[
      "Report refinement",
      "Visualization workshops",
      "Final consultations",
    ]}
    assessment="Human-AI Collaboration Report (20%)"
    assessmentLink="/spring-2026/weeks/12/human-ai-report"
  />
);

export default Spring2026Week12;
