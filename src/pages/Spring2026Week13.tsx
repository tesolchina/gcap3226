import WeekLayout from "@/components/WeekLayout";

const Spring2026Week13 = () => (
  <WeekLayout
    weekNumber={13}
    title="Final Presentation & Report"
    description="Deliver final presentations to peers and stakeholders, along with comprehensive group report."
    objectives={[
      "Present final research findings",
      "Submit comprehensive group report",
      "Demonstrate policy recommendations",
    ]}
    activities={[
      "Final team presentations",
      "Stakeholder Q&A",
      "Course wrap-up",
    ]}
    assessment="Final Presentation (10%) + Group Report (30%)"
    assessmentLink="/spring-2026/weeks/13/final-presentation-report"
  />
);

export default Spring2026Week13;
