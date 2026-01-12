export const weekContent: Record<string, { 
  title: string; 
  description: string; 
  objectives: string[]; 
  activities: string[]; 
  techSetup?: { tools: string[]; support: string[] }; 
  inClassExercise?: { title: string; description: string; dataset: string; skills: string[] }; 
  assessment?: string; 
  assessmentLink?: string 
}> = {
  "2": {
    title: "Development Environment & Python Foundations",
    description: "Set up your coding environment with IDE and Jupyter Notebook. Learn Python basics through 'vibe coding' - an intuitive, AI-assisted approach to programming.",
    objectives: [
      "Install and configure VS Code or preferred IDE",
      "Set up Jupyter Notebook for data visualization",
      "Understand Python basics through hands-on coding",
      "Use GitHub Copilot for AI-assisted programming",
      "Connect Python skills to policy data analysis",
    ],
    activities: [
      "IDE installation and configuration workshop",
      "Jupyter Notebook introduction and setup",
      "Python 'vibe coding' session with AI assistance",
      "Data visualization basics with matplotlib/pandas",
      "Hands-on practice with student partner support",
    ],
    techSetup: {
      tools: [
        "VS Code (recommended) or PyCharm",
        "Python 3.10+ installation",
        "Jupyter Notebook / JupyterLab",
        "GitHub Copilot (student license available)",
        "Required packages: pandas, matplotlib, numpy",
      ],
      support: [
        "Student partners available on-site for setup assistance",
        "Bring your laptop fully charged",
        "Pre-install VS Code before class if possible",
        "IT support available for troubleshooting",
      ],
    },
  },
  "3": {
    title: "Regression Analysis & Group Formation",
    description: "Apply regression analysis techniques to real policy data and form project groups for the semester.",
    objectives: [
      "Practice linear and logistic regression analysis",
      "Compare forward and backward variable selection methods",
      "Interpret regression results for policy insights",
      "Create exploratory data visualizations",
      "Form effective research teams and select topics",
    ],
    activities: [
      "In-class regression exercise using Jupyter Notebook",
      "Analysis of Hong Kong Waste Charging Policy survey data",
      "Team formation activities",
      "Topic selection workshop",
    ],
    inClassExercise: {
      title: "Regression Analysis In-Class Exercise",
      description: "Analyze Hong Kong Waste Charging Policy survey data using linear and logistic regression. Explore the relationship between support levels and various demographic/attitudinal factors.",
      dataset: "Hong Kong Waste Charging Policy Survey Data",
      skills: [
        "Linear regression with statsmodels",
        "Logistic regression for binary outcomes",
        "Forward and backward variable selection",
        "Data visualization with matplotlib",
        "Interpreting regression coefficients and p-values",
      ],
    },
    assessment: "In-class Exercise 1 (5%)",
    assessmentLink: "/spring-2026/weeks/3/in-class-exercise-1",
  },
  "4": {
    title: "Simulation Modeling & Data Governance",
    description: "Introduction to simulation modeling using SimPy and data governance concepts for policy analysis.",
    objectives: [
      "Understand simulation modeling fundamentals",
      "Generate random variables from probability distributions",
      "Build discrete event simulations with SimPy",
      "Visualize simulation results effectively",
      "Learn about data governance principles",
    ],
    activities: [
      "In-class simulation exercise using Jupyter Notebook",
      "Bus transit simulation modeling",
      "Data visualization workshop",
      "Data governance lecture and discussion",
    ],
    inClassExercise: {
      title: "Simulation Modeling In-Class Exercise",
      description: "Build a bus transit simulation from Stop A to Stop B using SimPy. Generate passenger arrival data from Poisson distributions and analyze the impact on bus arrival times.",
      dataset: "Simulated bus transit data with passenger boarding",
      skills: [
        "Random number generation from Poisson distribution",
        "Discrete event simulation with SimPy",
        "Modifying generator functions for dynamic inputs",
        "Creating histograms and box-and-whisker plots",
        "Interpreting simulation output distributions",
      ],
    },
    assessment: "In-class Exercise 2 (5%)",
    assessmentLink: "/spring-2026/weeks/4/in-class-exercise-2",
  },
  "5": {
    title: "Empirical Data Collection Plan",
    description: "Submit your plan to collect empirical data as experiential learning. Connect government data requests to evaluating data governance, leveraging analytical skills developed in Weeks 3-4.",
    objectives: [
      "Design a comprehensive plan to collect empirical data for your project",
      "Apply regression and simulation skills from Weeks 3-4 to identify data needs",
      "Draft government data request letters with clear justification",
      "Understand data governance principles and how to evaluate them",
      "Connect empirical data collection to policy analysis goals",
    ],
    activities: [
      "Submit empirical data collection plan (deadline: Week 5)",
      "Small group consultation meeting (teacher-led discussion)",
      "Draft data request letters based on your collection plan",
      "Apply Week 3-4 skills: identify variables and data requirements",
      "Self-study: Government Info Requests & Curating Public Data modules",
    ],
    techSetup: {
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
    },
    assessment: "Reflective Essay 1 (part of 20%)",
    assessmentLink: "/spring-2026/assessments/reflective-essay-1",
  },
  "6": {
    title: "Field Work",
    description: "Conduct fieldwork to collect empirical data according to your Week 5 plan. This is experiential learning in action. Note: 18 Feb is a public holiday.",
    objectives: [
      "Execute your empirical data collection plan in real-world settings",
      "Collect primary data through interviews, observations, or surveys",
      "Send finalized data request letters to government departments",
      "Document fieldwork experiences for reflection",
      "Apply ethical research practices in data collection",
    ],
    activities: [
      "Conduct fieldwork according to your approved plan",
      "Collect primary empirical data (interviews, observations, surveys)",
      "Send data request emails to government departments",
      "Document experiences and preliminary findings",
      "Team coordination and safety protocols",
    ],
    techSetup: {
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
    },
  },
  "7": {
    title: "Second Group Consultation & Data Review",
    description: "Debrief fieldwork experiences, review collected data, and plan for data integration and analysis.",
    objectives: [
      "Share and debrief fieldwork experiences",
      "Review and assess collected primary data",
      "Identify data gaps and supplementary needs",
      "Plan for data integration and analysis",
    ],
    activities: [
      "Small group consultation meeting (teacher-led discussion)",
      "Fieldwork debrief and experience sharing",
      "Data quality review session",
      "Planning next steps for analysis",
    ],
    assessment: "Reflective Essay 2 (part of 20%)",
    assessmentLink: "/spring-2026/weeks/7/reflective-essay-2",
  },
  "8": {
    title: "Empirical Data Collection Complete",
    description: "Milestone week: Complete all empirical data collection from fieldwork. Integrate collected data and begin analysis using AI tools.",
    objectives: [
      "Complete all fieldwork data collection (milestone)",
      "Compile and organize all empirical data collected",
      "Integrate primary and secondary data sources",
      "Begin data cleaning and preparation for analysis",
      "Apply AI tools for initial data analysis",
    ],
    activities: [
      "Fieldwork completion checkpoint (milestone review)",
      "Data compilation and organization session",
      "Data integration workshop",
      "AI-assisted analysis demonstration",
      "Group analysis sessions",
    ],
    techSetup: {
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
    },
  },
  "9": {
    title: "Third Group Consultation & Report Planning",
    description: "Third consultation meeting to review data analysis, visualizations, and plan report writing.",
    objectives: [
      "Review data analysis and visualizations",
      "Discuss report structure and writing approach",
      "Receive feedback on preliminary findings",
      "Plan remaining project work",
    ],
    activities: [
      "Small group consultation meeting (teacher-led discussion)",
      "Data visualization review",
      "Report planning and structure discussion",
      "AI-assisted writing strategies",
    ],
    assessment: "Reflective Essay 3 (part of 20%)",
    assessmentLink: "/spring-2026/weeks/9/reflective-essay-3",
  },
  "10": {
    title: "Draft Report Outline",
    description: "Submit draft outline of group project report, including data analysis and governance critique.",
    objectives: [
      "Complete draft report outline",
      "Receive peer and instructor feedback",
      "Refine research direction",
    ],
    activities: [
      "Draft submission",
      "Peer review sessions",
      "One-on-one consultations",
    ],
  },
  "11": {
    title: "In-Class Presentation 1",
    description: "Deliver 8-minute presentations on project progress and data governance findings.",
    objectives: [
      "Present research findings clearly",
      "Receive constructive feedback",
      "Practice presentation skills",
    ],
    activities: [
      "Team presentations (8 minutes each)",
      "Q&A sessions",
      "Feedback collection",
    ],
    assessment: "In-Class Presentation 1 (10%)",
    assessmentLink: "/spring-2026/weeks/11/presentation-1",
  },
  "12": {
    title: "Finalize Deliverables",
    description: "Refine models, visualizations, and advocacy products based on feedback.",
    objectives: [
      "Finalize research deliverables",
      "Polish visualizations and reports",
      "Prepare advocacy materials",
    ],
    activities: [
      "Report refinement",
      "Visualization workshops",
      "Final consultations",
    ],
    assessment: "Human-AI Collaboration Report (20%)",
    assessmentLink: "/spring-2026/weeks/12/human-ai-report",
  },
  "13": {
    title: "Final Presentation & Report",
    description: "Deliver final presentations to peers and stakeholders, along with comprehensive group report.",
    objectives: [
      "Present final research findings",
      "Submit comprehensive group report",
      "Demonstrate policy recommendations",
    ],
    activities: [
      "Final team presentations",
      "Stakeholder Q&A",
      "Course wrap-up",
    ],
    assessment: "Final Presentation (10%) + Group Report (30%)",
    assessmentLink: "/spring-2026/weeks/13/final-presentation-report",
  },
};
