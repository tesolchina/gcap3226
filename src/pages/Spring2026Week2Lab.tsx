import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Play, Copy, Check, Download, ExternalLink, Sparkles, 
  ChevronRight, Upload, Code, BookOpen, Database, Lightbulb, FileCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { streamChat } from "@/lib/ai-chat";
import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Lab steps following the Jupyter notebook structure
const LAB_STEPS = [
  {
    id: 1,
    title: "Import Libraries",
    description: "Start by importing the Python libraries we'll use for data analysis and visualization.",
    explanation: "**pandas** helps us work with data tables (like Excel), **matplotlib** creates charts, and **seaborn** makes beautiful statistical graphics.",
    prompt: "# Import pandas as pd, matplotlib.pyplot as plt, and seaborn as sns",
    expectedOutput: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns`,
  },
  {
    id: 2,
    title: "Load the Dataset",
    description: "Load the CSV file containing our survey data into a pandas DataFrame.",
    explanation: "A **DataFrame** is like a spreadsheet in Python. We'll load 97 survey responses about waste management attitudes in Hong Kong.",
    prompt: "# Load GCAP3226_week2.csv into a dataframe called df",
    expectedOutput: `df = pd.read_csv('GCAP3226_week2.csv')`,
  },
  {
    id: 3,
    title: "Explore the Data",
    description: "View the first few rows and check the structure of our data.",
    explanation: "Always start by looking at your data! `.head()` shows the first 5 rows, `.info()` shows column types and missing values.",
    prompt: "# Show the first 5 rows of df and display info about the dataframe",
    expectedOutput: `print(df.head())
print(df.info())`,
  },
  {
    id: 4,
    title: "Summary Statistics",
    description: "Get descriptive statistics for all numeric columns.",
    explanation: "`.describe()` gives you count, mean, std, min, max, and percentiles. This helps identify outliers and understand data distribution.",
    prompt: "# Show summary statistics for all numeric columns in df",
    expectedOutput: `print(df.describe())`,
  },
  {
    id: 5,
    title: "Visualize Categorical Data",
    description: "Create a bar chart to show the frequency of different food waste behaviors.",
    explanation: "Bar charts are great for **categorical data** (categories like 'never_seen', 'seen_not_used', 'seen_and_used').",
    prompt: "# Create a bar chart showing the frequency of food_waste_behavior values",
    expectedOutput: `food_counts = df['food_waste_behavior'].value_counts()
plt.figure(figsize=(10, 6))
food_counts.plot(kind='bar', color='steelblue')
plt.title('Food Waste Behavior Distribution')
plt.xlabel('Behavior Type')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
  },
  {
    id: 6,
    title: "Visualize Continuous Data",
    description: "Create a histogram to see the distribution of distance to recycling facilities.",
    explanation: "Histograms show the **distribution** of continuous (numeric) data. You can see if data is normal, skewed, or has multiple peaks.",
    prompt: "# Create a histogram of Distance_artificial with 20 bins",
    expectedOutput: `plt.figure(figsize=(10, 6))
plt.hist(df['Distance_artificial'], bins=20, color='teal', edgecolor='white')
plt.title('Distribution of Distance to Recycling Facilities')
plt.xlabel('Distance (meters)')
plt.ylabel('Frequency')
plt.show()`,
  },
  {
    id: 7,
    title: "Explore Relationships",
    description: "Create a scatter plot to explore the relationship between recycling effort and waste severity.",
    explanation: "Scatter plots reveal **relationships** between two numeric variables. Look for patterns, clusters, or correlations.",
    prompt: "# Create a scatter plot of recycling_effort vs waste_severity, colored by food_waste_behavior",
    expectedOutput: `plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='recycling_effort', y='waste_severity', 
                hue='food_waste_behavior', palette='viridis', s=100)
plt.title('Recycling Effort vs Waste Severity')
plt.xlabel('Recycling Effort (1-4)')
plt.ylabel('Waste Severity (1-4)')
plt.legend(title='Food Waste Behavior')
plt.show()`,
  },
];

// Sample data rows for preview (first 8 rows)
const SAMPLE_DATA = [
  { support_info: 1, support_after_info: 1, fairness: 1, food_waste_behavior: "never_seen", recycling_effort: 1, Distance_artificial: 259.83 },
  { support_info: 5, support_after_info: 5, fairness: 5, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 260.04 },
  { support_info: 3, support_after_info: 5, fairness: 5, food_waste_behavior: "seen_not_used", recycling_effort: 1, Distance_artificial: 338.89 },
  { support_info: 1, support_after_info: 2, fairness: 2, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 192.59 },
  { support_info: 1, support_after_info: 3, fairness: 4, food_waste_behavior: "seen_not_used", recycling_effort: 2, Distance_artificial: 232.95 },
  { support_info: 4, support_after_info: 4, fairness: 4, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 139.51 },
  { support_info: 4, support_after_info: 4, fairness: 2, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 182.95 },
  { support_info: 3, support_after_info: 3, fairness: 3, food_waste_behavior: "never_seen", recycling_effort: 3, Distance_artificial: 124.87 },
];

const COLUMN_DESCRIPTIONS = [
  { name: "support_info", description: "Support level before info (1-5)", type: "numeric" },
  { name: "support_after_info", description: "Support level after info (1-5)", type: "numeric" },
  { name: "fairness", description: "Perceived policy fairness (1-5)", type: "numeric" },
  { name: "food_waste_behavior", description: "Food waste recycling experience", type: "categorical" },
  { name: "recycling_effort", description: "Self-reported recycling effort (1-4)", type: "numeric" },
  { name: "Distance_artificial", description: "Distance to recycling facility (m)", type: "numeric" },
];

const SYSTEM_PROMPT = `You are GitHub Copilot, an AI coding assistant. The user will provide a comment prompt describing what code they want. Generate ONLY the Python code that fulfills the request. 

Rules:
- Output ONLY code, no explanations or markdown formatting
- Use pandas, matplotlib, and seaborn for data analysis
- Keep code concise and follow Python best practices
- If the prompt is about loading data, assume the file is 'GCAP3226_week2.csv'`;

const Spring2026Week2Lab = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [activeStep, setActiveStep] = useState<string>("step-1");

  const generateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedCode("");

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      systemPrompt: SYSTEM_PROMPT,
      onDelta: (delta) => setGeneratedCode((prev) => prev + delta),
      onDone: () => setIsGenerating(false),
      onError: (error) => {
        setGeneratedCode(`# Error: ${error}`);
        setIsGenerating(false);
      },
    });
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatting) return;

    const userMessage = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsChatting(true);

    let assistantResponse = "";

    await streamChat({
      messages: [...chatMessages, { role: "user", content: userMessage }],
      systemPrompt: `You are a helpful Python coding assistant for data visualization. Help students learn to use pandas, matplotlib, and seaborn. Keep responses concise and code-focused. When providing code, use markdown code blocks.`,
      onDelta: (delta) => {
        assistantResponse += delta;
        setChatMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg?.role === "assistant") {
            lastMsg.content = assistantResponse;
          } else {
            updated.push({ role: "assistant", content: assistantResponse });
          }
          return [...updated];
        });
      },
      onDone: () => setIsChatting(false),
      onError: (error) => {
        setChatMessages((prev) => [...prev, { role: "assistant", content: `Error: ${error}` }]);
        setIsChatting(false);
      },
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tryPrompt = (stepPrompt: string) => {
    setPrompt(stepPrompt);
    // Scroll to the coding area
    document.getElementById("coding-area")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/spring-2026/weeks/2">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Week 2
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h1 className="text-lg font-semibold">Vibe Coding Lab</h1>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            AI-Assisted Python Data Visualization
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction Section */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Welcome to Vibe Coding! 🎉</h2>
            <p className="text-muted-foreground text-lg">
              Learn to create data visualizations by describing what you want in plain English. 
              AI will generate the Python code for you!
            </p>
          </div>

          {/* Three Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  What is Vibe Coding?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Vibe Coding</strong> is a new approach where you describe what you want 
                  in plain English, and AI generates the code for you. Instead of memorizing syntax, 
                  you focus on explaining your intent.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code className="w-5 h-5 text-blue-500" />
                  What is Python?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Python</strong> is a popular programming language known for being 
                  easy to read and write. It's widely used in data science, AI, and web development. 
                  Python code often reads almost like English!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="w-5 h-5 text-green-500" />
                  About the Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  This dataset contains <strong className="text-foreground">97 survey responses</strong> about the 
                  Municipal Solid Waste Charging Scheme in Hong Kong—exploring public attitudes toward 
                  waste management, recycling behaviors, and environmental awareness.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dataset Preview Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Dataset Preview
            </h3>
            <a href="/data/GCAP3226_week2.csv" download>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </a>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {COLUMN_DESCRIPTIONS.map((col) => (
                        <TableHead key={col.name} className="whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs">{col.name}</span>
                            <span className="text-xs text-muted-foreground font-normal">{col.description}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SAMPLE_DATA.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-sm">{row.support_info}</TableCell>
                        <TableCell className="font-mono text-sm">{row.support_after_info}</TableCell>
                        <TableCell className="font-mono text-sm">{row.fairness}</TableCell>
                        <TableCell>
                          <Badge variant={
                            row.food_waste_behavior === "seen_and_used" ? "default" :
                            row.food_waste_behavior === "seen_not_used" ? "secondary" : "outline"
                          } className="text-xs">
                            {row.food_waste_behavior}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{row.recycling_effort}</TableCell>
                        <TableCell className="font-mono text-sm">{row.Distance_artificial}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground text-center">
            Showing first 8 of 97 rows. The full dataset also includes district information and housing type.
          </p>
        </section>

        {/* Step-by-Step Guide */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Step-by-Step Lab Guide
          </h3>
          <p className="text-muted-foreground">
            Follow these steps to analyze the dataset. Click <strong>"Try This Prompt"</strong> to load 
            the prompt into the coding area below.
          </p>

          <Accordion 
            type="single" 
            collapsible 
            value={activeStep}
            onValueChange={setActiveStep}
            className="space-y-2"
          >
            {LAB_STEPS.map((step) => (
              <AccordionItem 
                key={step.id} 
                value={`step-${step.id}`}
                className="border rounded-lg bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {step.id}
                    </span>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground font-normal">{step.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {/* Explanation */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{step.explanation}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      Prompt to try:
                    </label>
                    <div className="bg-muted rounded-lg p-3 font-mono text-sm text-green-600 dark:text-green-400">
                      {step.prompt}
                    </div>
                    <Button 
                      onClick={() => tryPrompt(step.prompt)}
                      className="w-full sm:w-auto"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Try This Prompt
                    </Button>
                  </div>

                  {/* Expected Output */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Expected code output:
                    </label>
                    <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{step.expectedOutput}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Interactive Coding Area */}
        <section id="coding-area" className="space-y-4 scroll-mt-20">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Interactive Coding Area
          </h3>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Left Panel: Code Editor */}
            <Card className="bg-[#1e1e1e] border-slate-700">
              <CardHeader className="border-b border-slate-700 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm text-slate-400">main.py</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Prompt Input */}
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    ✍️ Type your prompt as a Python comment:
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="font-mono text-sm bg-[#2d2d2d] border-slate-600 text-green-400 min-h-[80px]"
                    placeholder="# Write your prompt here..."
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateCode}
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-purple-600 hover:bg-purple-700 w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Code (Copilot)"}
                </Button>

                {/* Generated Code Output */}
                {generatedCode && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-slate-400">🤖 Generated Code:</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyCode}
                        className="text-slate-400 hover:text-white h-8"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
                      </Button>
                    </div>
                    <pre className="bg-[#2d2d2d] border border-slate-600 rounded-md p-4 overflow-x-auto">
                      <code className="text-sm text-blue-300 font-mono whitespace-pre-wrap">
                        {generatedCode}
                      </code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Panel: AI Assistant */}
            <Card className="bg-[#252526] border-slate-700 flex flex-col max-h-[500px]">
              <CardHeader className="border-b border-slate-700 py-3 shrink-0">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-100">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Copilot Assistant
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Ask questions about Python, pandas, or data visualization
                </CardDescription>
              </CardHeader>

              <div className="flex-1 overflow-auto p-4 space-y-4 min-h-0">
                {chatMessages.length === 0 ? (
                  <div className="text-slate-400 text-sm space-y-3">
                    <p>👋 Ask me anything about Python data visualization!</p>
                    <p className="text-xs">Try asking:</p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>"How do I create a histogram?"</li>
                      <li>"Explain what pandas groupby does"</li>
                      <li>"Show me how to save a chart as PNG"</li>
                    </ul>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-sm ${msg.role === "user" ? "text-blue-300" : "text-slate-300"}`}
                    >
                      <span className="text-xs text-slate-500 block mb-1">
                        {msg.role === "user" ? "You" : "Copilot"}
                      </span>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-slate-700 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder="Ask a question..."
                    className="flex-1 bg-[#1e1e1e] border border-slate-600 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                  <Button
                    onClick={handleChatSend}
                    disabled={isChatting || !chatInput.trim()}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Setup Instructions */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Download className="w-5 h-5" />
            Ready to Try on Your Own Computer?
          </h3>
          <p className="text-muted-foreground">
            Download and install these tools to use AI-assisted coding locally with VS Code and GitHub Copilot.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                VS Code
              </Button>
            </a>
            <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Python 3.10+
              </Button>
            </a>
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                GitHub Copilot
              </Button>
            </a>
            <a href="/assets/GCAP3226_week2_DataVisualization_GithubCopilot.pdf" target="_blank">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Lab Guide (PDF)
              </Button>
            </a>
            <a href="/assets/GCAP3226_week2_student.ipynb" download>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Jupyter Notebook
              </Button>
            </a>
            <a href="/data/GCAP3226_week2.csv" download>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Dataset (CSV)
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Spring2026Week2Lab;
