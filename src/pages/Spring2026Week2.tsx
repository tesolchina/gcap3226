import WeekLayout from "@/components/WeekLayout";

const Spring2026Week2 = () => (
  <WeekLayout
    weekNumber={2}
    title="Development Environment & Python Foundations"
    description="Set up your coding environment with IDE and Jupyter Notebook. Learn Python basics through 'vibe coding' - an intuitive, AI-assisted approach to programming."
    objectives={[
      "Install and configure VS Code or preferred IDE",
      "Set up Jupyter Notebook for data visualization",
      "Understand Python basics through hands-on coding",
      "Use GitHub Copilot for AI-assisted programming",
      "Connect Python skills to policy data analysis",
    ]}
    activities={[
      "IDE installation and configuration workshop",
      "Jupyter Notebook introduction and setup",
      "Python 'vibe coding' session with AI assistance",
      "Data visualization basics with matplotlib/pandas",
      "Hands-on practice with student partner support",
    ]}
    techSetup={{
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
    }}
  />
);

export default Spring2026Week2;
