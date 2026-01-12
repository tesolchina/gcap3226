import WeekLayout from "@/components/WeekLayout";

const Spring2026Week6 = () => (
  <WeekLayout
    weekNumber={6}
    title="Field Work"
    description="Conduct fieldwork to collect empirical data according to your Week 5 plan. This is experiential learning in action. Note: 18 Feb is a public holiday."
    objectives={[
      "Execute your empirical data collection plan in real-world settings",
      "Collect primary data through interviews, observations, or surveys",
      "Send finalized data request letters to government departments",
      "Document fieldwork experiences for reflection",
      "Apply ethical research practices in data collection",
    ]}
    activities={[
      "Conduct fieldwork according to your approved plan",
      "Collect primary empirical data (interviews, observations, surveys)",
      "Send data request emails to government departments",
      "Document experiences and preliminary findings",
      "Team coordination and safety protocols",
    ]}
    techSetup={{
      tools: [
        "Data collection forms/templates",
        "Recording equipment (with consent)",
        "Field notes template",
        "Government email contacts for data requests",
      ],
      support: [
        "Work in teams for safety during fieldwork",
        "Follow ethical guidelines for human subjects research",
        "Document everything for Reflective Essay 2",
        "Contact teacher if encountering difficulties",
      ],
    }}
  />
);

export default Spring2026Week6;
