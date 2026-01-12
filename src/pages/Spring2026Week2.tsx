import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal } from "lucide-react";
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
    customContent={
      <div className="mt-8 space-y-4">
        {/* Vibe Coding Demo */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold">Try Vibe Coding Demo</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Experience AI-assisted coding with our interactive simulation. Type a prompt and watch AI generate Python code.
          </p>
          <Link to="/spring-2026/weeks/2/lab">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Launch Vibe Coding Demo
            </Button>
          </Link>
        </div>

        {/* Real Python Notebook */}
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Python Notebook (Real Execution)</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Run actual Python code in your browser! Uses Pyodide to execute pandas, matplotlib, and seaborn.
            First load takes ~15 seconds.
          </p>
          <Link to="/spring-2026/weeks/2/notebook">
            <Button className="bg-green-600 hover:bg-green-700">
              <Terminal className="w-4 h-4 mr-2" />
              Launch Python Notebook
            </Button>
          </Link>
        </div>
      </div>
    }
  />
);

export default Spring2026Week2;
