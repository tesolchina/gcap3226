import WeekLayout from "@/components/WeekLayout";

const Spring2026Week5 = () => (
  <WeekLayout
    weekNumber={5}
    title="Empirical Data Collection Plan"
    description="Submit your plan to collect empirical data as experiential learning. Connect government data requests to evaluating data governance, leveraging analytical skills developed in Weeks 3-4."
    objectives={[
      "Design a comprehensive plan to collect empirical data for your project",
      "Apply regression and simulation skills from Weeks 3-4 to identify data needs",
      "Draft government data request letters with clear justification",
      "Understand data governance principles and how to evaluate them",
      "Connect empirical data collection to policy analysis goals",
    ]}
    activities={[
      "Submit empirical data collection plan (deadline: Week 5)",
      "Small group consultation meeting (teacher-led discussion)",
      "Draft data request letters based on your collection plan",
      "Apply Week 3-4 skills: identify variables and data requirements",
      "Self-study: Government Info Requests & Curating Public Data modules",
    ]}
    techSetup={{
      tools: [
        "Self-access module: How to Request Information from Government",
        "Self-access module: Curating Publicly Available Data",
        "DATA.GOV.HK for initial public data exploration",
        "Government directory for department contacts",
        "Jupyter Notebook for data requirements analysis",
      ],
      support: [
        "Data collection plan should connect to Week 3-4 analysis techniques",
        "Request letters should specify data needed for regression/simulation",
        "Teachers will review and provide feedback on your plans",
        "Consider what empirical data will help evaluate data governance",
      ],
    }}
    assessment="Reflective Essay 1 (part of 20%)"
    assessmentLink="/spring-2026/assessments/reflective-essay-1"
  />
);

export default Spring2026Week5;
