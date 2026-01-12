import WeekLayout from "@/components/WeekLayout";

const Spring2026Week8 = () => (
  <WeekLayout
    weekNumber={8}
    title="Empirical Data Collection Complete"
    description="Milestone week: Complete all empirical data collection from fieldwork. Integrate collected data and begin analysis using AI tools."
    objectives={[
      "Complete all fieldwork data collection (milestone)",
      "Compile and organize all empirical data collected",
      "Integrate primary and secondary data sources",
      "Begin data cleaning and preparation for analysis",
      "Apply AI tools for initial data analysis",
    ]}
    activities={[
      "Fieldwork completion checkpoint (milestone review)",
      "Data compilation and organization session",
      "Data integration workshop",
      "AI-assisted analysis demonstration",
      "Group analysis sessions",
    ]}
    techSetup={{
      tools: [
        "Jupyter Notebook for data analysis",
        "Python packages: pandas, numpy, matplotlib",
        "AI tools for data analysis assistance",
        "Data visualization libraries",
      ],
      support: [
        "This is the milestone for completing empirical data collection",
        "All fieldwork should be completed by this week",
        "Teacher available for troubleshooting data issues",
        "Peer support for data integration challenges",
      ],
    }}
  />
);

export default Spring2026Week8;
