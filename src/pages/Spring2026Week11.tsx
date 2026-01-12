import WeekLayout from "@/components/WeekLayout";

const Spring2026Week11 = () => (
  <WeekLayout
    weekNumber={11}
    title="In-Class Presentation 1"
    description="Deliver 8-minute presentations on project progress and data governance findings."
    objectives={[
      "Present research findings clearly",
      "Receive constructive feedback",
      "Practice presentation skills",
    ]}
    activities={[
      "Team presentations (8 minutes each)",
      "Q&A sessions",
      "Feedback collection",
    ]}
    assessment="In-Class Presentation 1 (10%)"
    assessmentLink="/spring-2026/weeks/11/presentation-1"
  />
);

export default Spring2026Week11;
