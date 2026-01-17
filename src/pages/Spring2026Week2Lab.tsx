import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Play, Copy, Check, Download, ExternalLink, Sparkles, 
  Plus, Trash2, Code, BookOpen, Database, Lightbulb, FileCode, Send,
  PanelLeftClose, PanelLeftOpen, MessageSquare, FolderOpen, PanelRightClose, PanelRightOpen, AlertTriangle, Info
} from "lucide-react";
import LabFileManager from "@/components/LabFileManager";
import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useSidebar } from "@/components/ui/sidebar";

// Types for notebook cells
interface NotebookCell {
  id: string;
  type: "code" | "output";
  content: string;
  output?: string;
  isRunning?: boolean;
  isFromAI?: boolean;
}

// Lab steps following the Jupyter notebook structure
const LAB_STEPS = [
  {
    id: 1,
    title: "Import Libraries",
    description: "Start by importing the Python libraries we'll use.",
    prompt: "Import pandas as pd, matplotlib.pyplot as plt, and seaborn as sns",
    expectedCode: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns`,
    expectedOutput: "Libraries imported successfully.",
  },
  {
    id: 2,
    title: "Load the Dataset",
    description: "Load the CSV file into a pandas DataFrame.",
    prompt: "Load GCAP3226_week2.csv into a dataframe called df",
    expectedCode: `df = pd.read_csv('GCAP3226_week2.csv')
print(f"Loaded {len(df)} rows")`,
    expectedOutput: "Loaded 97 rows",
  },
  {
    id: 3,
    title: "Explore the Data",
    description: "View the first few rows of our data.",
    prompt: "Show the first 5 rows of df",
    expectedCode: `df.head()`,
    expectedOutput: `   support_info  support_after_info  fairness  food_waste_behavior  recycling_effort  Distance_artificial
0             1                   1         1           never_seen                 1               259.83
1             5                   5         5           never_seen                 2               260.04
2             3                   5         5        seen_not_used                 1               338.89
3             1                   2         2           never_seen                 2               192.59
4             1                   3         4        seen_not_used                 2               232.95`,
  },
  {
    id: 4,
    title: "Summary Statistics",
    description: "Get descriptive statistics for numeric columns.",
    prompt: "Show summary statistics for df",
    expectedCode: `df.describe()`,
    expectedOutput: `       support_info  support_after_info   fairness  recycling_effort  Distance_artificial
count     97.000000           97.000000  97.000000         97.000000            97.000000
mean       2.783505            3.154639   2.979381          2.206186           183.461546
std        1.293847            1.126138   1.136547          0.716307            61.789423
min        1.000000            1.000000   1.000000          1.000000            16.440000
max        5.000000            5.000000   5.000000          4.000000           338.890000`,
  },
  {
    id: 5,
    title: "Visualize Categorical Data",
    description: "Create a bar chart for food waste behavior.",
    prompt: "Create a bar chart showing the frequency of food_waste_behavior values",
    expectedCode: `food_counts = df['food_waste_behavior'].value_counts()
plt.figure(figsize=(8, 5))
food_counts.plot(kind='bar', color='steelblue')
plt.title('Food Waste Behavior Distribution')
plt.xlabel('Behavior Type')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
    expectedOutput: `[Bar Chart Output]
never_seen: 47
seen_not_used: 26
seen_and_used: 24`,
  },
  {
    id: 6,
    title: "Visualize Continuous Data",
    description: "Create a histogram of distances.",
    prompt: "Create a histogram of Distance_artificial with 15 bins",
    expectedCode: `plt.figure(figsize=(8, 5))
plt.hist(df['Distance_artificial'], bins=15, color='teal', edgecolor='white')
plt.title('Distribution of Distance to Recycling Facilities')
plt.xlabel('Distance (meters)')
plt.ylabel('Frequency')
plt.show()`,
    expectedOutput: `[Histogram Output]
Range: 16.44m - 338.89m
Most common: 100-200m range`,
  },
];

// Sample data rows for preview
const SAMPLE_DATA = [
  { support_info: 1, support_after_info: 1, fairness: 1, food_waste_behavior: "never_seen", recycling_effort: 1, Distance_artificial: 259.83 },
  { support_info: 5, support_after_info: 5, fairness: 5, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 260.04 },
  { support_info: 3, support_after_info: 5, fairness: 5, food_waste_behavior: "seen_not_used", recycling_effort: 1, Distance_artificial: 338.89 },
  { support_info: 1, support_after_info: 2, fairness: 2, food_waste_behavior: "never_seen", recycling_effort: 2, Distance_artificial: 192.59 },
  { support_info: 1, support_after_info: 3, fairness: 4, food_waste_behavior: "seen_not_used", recycling_effort: 2, Distance_artificial: 232.95 },
];

const COLUMN_DESCRIPTIONS = [
  { name: "support_info", description: "Support level before info (1-5)", type: "numeric" },
  { name: "support_after_info", description: "Support level after info (1-5)", type: "numeric" },
  { name: "fairness", description: "Perceived policy fairness (1-5)", type: "numeric" },
  { name: "food_waste_behavior", description: "Food waste recycling experience", type: "categorical" },
  { name: "recycling_effort", description: "Self-reported recycling effort (1-4)", type: "numeric" },
  { name: "Distance_artificial", description: "Distance to recycling facility (m)", type: "numeric" },
];

const AI_SYSTEM_PROMPT = `You are a Python coding assistant helping students with data visualization. When the user asks you to generate code, respond with ONLY the Python code, no explanations. Use pandas, matplotlib, and seaborn. Assume the CSV file is 'GCAP3226_week2.csv' and the dataframe is 'df'. Keep code concise.`;

const Spring2026Week2Lab = () => {
  // Notebook cells state
  const [cells, setCells] = useState<NotebookCell[]>([
    { id: "1", type: "code", content: "# Welcome to Vibe Coding Lab!\n# Ask the AI assistant to generate code, then run it here.\n\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns" }
  ]);
  
  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const notebookRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Add new cell
  const addCell = (content: string = "", isFromAI: boolean = false) => {
    const newCell: NotebookCell = {
      id: generateId(),
      type: "code",
      content,
      isFromAI,
    };
    setCells(prev => [...prev, newCell]);
    
    // Scroll to new cell
    setTimeout(() => {
      notebookRef.current?.scrollTo({
        top: notebookRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
    
    return newCell.id;
  };

  // Update cell content
  const updateCell = (id: string, content: string) => {
    setCells(prev => prev.map(cell => 
      cell.id === id ? { ...cell, content } : cell
    ));
  };

  // Delete cell
  const deleteCell = (id: string) => {
    setCells(prev => prev.filter(cell => cell.id !== id));
  };

  // Simulate running code
  const runCell = (id: string) => {
    setCells(prev => prev.map(cell => {
      if (cell.id !== id) return cell;
      
      // Set running state
      const runningCell = { ...cell, isRunning: true, output: undefined };
      
      // Simulate execution delay
      setTimeout(() => {
        setCells(current => current.map(c => {
          if (c.id !== id) return c;
          
          // Check if code matches any expected pattern and return appropriate output
          const code = c.content.toLowerCase();
          let output = "";
          const simBadge = "🔬 SIMULATED OUTPUT\n─────────────────\n";
          
          if (code.includes("import pandas") || code.includes("import matplotlib") || code.includes("import seaborn")) {
            output = simBadge + "✓ Libraries imported successfully\n\n💡 In real Python, these libraries would now be available for use.";
          } else if (code.includes("read_csv")) {
            output = simBadge + "✓ DataFrame loaded: 97 rows × 28 columns\n\n💡 This simulates loading the MSW survey dataset.";
          } else if (code.includes(".head()")) {
            output = simBadge + `   support_info  fairness  food_waste_behavior  recycling_effort  Distance_artificial
0             1         1           never_seen                 1               259.83
1             5         5           never_seen                 2               260.04
2             3         5        seen_not_used                 1               338.89
3             1         2           never_seen                 2               192.59
4             1         4        seen_not_used                 2               232.95

💡 This shows what the first 5 rows would look like in pandas.`;
          } else if (code.includes(".describe()")) {
            output = simBadge + `       support_info   fairness  recycling_effort  Distance_artificial
count     97.000000  97.000000         97.000000            97.000000
mean       2.783505   2.979381          2.206186           183.461546
std        1.293847   1.136547          0.716307            61.789423
min        1.000000   1.000000          1.000000            16.440000
max        5.000000   5.000000          4.000000           338.890000

💡 These are actual statistics from the dataset.`;
          } else if (code.includes(".info()")) {
            output = simBadge + `<class 'pandas.core.frame.DataFrame'>
RangeIndex: 97 entries, 0 to 96
Data columns (total 28 columns)
dtypes: float64(1), int64(26), object(1)
memory usage: 21.3 KB

💡 This shows the DataFrame structure.`;
          } else if (code.includes("value_counts")) {
            output = simBadge + `never_seen       47
seen_not_used    26
seen_and_used    24
Name: food_waste_behavior, dtype: int64

💡 This shows category frequencies in the data.`;
          } else if (code.includes("plt.show()") || code.includes("plot(")) {
            output = simBadge + "📊 [Chart would display here]\n\n💡 In Jupyter Notebook, you would see the actual visualization.\n   Download the .ipynb file to run with real charts!";
          } else if (code.includes("hist(") || code.includes("histogram")) {
            output = simBadge + "📊 [Histogram would display here]\n\n💡 Shows data distribution. Run in Jupyter for the real chart!";
          } else if (code.includes("scatter")) {
            output = simBadge + "📊 [Scatter plot would display here]\n\n💡 Shows relationships between variables. Run in Jupyter for the real chart!";
          } else if (code.includes("print(")) {
            // Extract what's being printed
            const match = code.match(/print\(([^)]+)\)/);
            output = simBadge + (match ? `Output: ${match[1]}` : "Output printed");
          } else if (code.trim() === "" || code.startsWith("#")) {
            output = "";
          } else {
            output = simBadge + "✓ Code executed successfully\n\n💡 This is a preview. Run in Jupyter Notebook for actual execution.";
          }
          
          return { ...c, isRunning: false, output };
        }));
      }, 800);
      
      return runningCell;
    }));
  };

  // Handle chat send
  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatting) return;

    const userMessage = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsChatting(true);

    let assistantResponse = "";

    await streamChat({
      messages: [...chatMessages, { role: "user", content: userMessage }],
      systemPrompt: AI_SYSTEM_PROMPT,
      onDelta: (delta) => {
        assistantResponse += delta;
        setChatMessages(prev => {
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
        setChatMessages(prev => [...prev, { role: "assistant", content: `Error: ${error}` }]);
        setIsChatting(false);
      },
    });
  };

  // Add AI response as new cell
  const addCodeToNotebook = (code: string) => {
    addCell(code, true);
  };

  // Copy code
  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Use prompt from step guide
  const useStepPrompt = (step: typeof LAB_STEPS[0]) => {
    setChatInput(step.prompt);
  };

  // Sidebar toggle
  const { toggleSidebar, state: sidebarState } = useSidebar();
  
  // Panel visibility toggles
  const [showAIChat, setShowAIChat] = useState(true);
  const [showFileManager, setShowFileManager] = useState(true);

  // Mobile detection for responsive layout
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // On mobile, default to single panel view
  const [mobileView, setMobileView] = useState<'notebook' | 'chat'>('notebook');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - Mobile Optimized */}
      <header className="border-b bg-card px-3 sm:px-4 py-2 sm:py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Left side - condensed on mobile */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="hidden sm:flex">
              {sidebarState === "collapsed" ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
            <Link to="/spring-2026/weeks/2">
              <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Week 2</span>
              </Button>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <h1 className="text-sm sm:text-lg font-semibold">Vibe Coding</h1>
              <Badge variant="outline" className="hidden sm:flex ml-2 text-amber-600 border-amber-500/50 bg-amber-500/10">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Simulation
              </Badge>
            </div>
          </div>
          
          {/* Right side - responsive buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile: Toggle between notebook and chat */}
            <div className="flex sm:hidden">
              <Button 
                variant={mobileView === 'notebook' ? "default" : "outline"} 
                size="sm"
                onClick={() => setMobileView('notebook')}
                className="rounded-r-none px-2"
              >
                <Code className="w-4 h-4" />
              </Button>
              <Button 
                variant={mobileView === 'chat' ? "default" : "outline"} 
                size="sm"
                onClick={() => setMobileView('chat')}
                className="rounded-l-none px-2"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Desktop: Full button controls */}
            <div className="hidden sm:flex items-center gap-2">
              <Button 
                variant={showAIChat ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowAIChat(!showAIChat)}
                title={showAIChat ? "Hide AI Assistant" : "Show AI Assistant"}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
              <Button 
                variant={showFileManager ? "default" : "outline"} 
                size="sm"
                onClick={() => setShowFileManager(!showFileManager)}
                title={showFileManager ? "Hide File Manager" : "Show File Manager"}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Files
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
            </div>
            
            {/* Download buttons - icon only on mobile */}
            <a href="/data/GCAP3226_week2.csv" download>
              <Button variant="outline" size="sm" className="px-2 sm:px-3">
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dataset</span>
              </Button>
            </a>
            <a href="/assets/GCAP3226_week2_student.ipynb" download className="hidden sm:block">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Jupyter Notebook
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Layout - Single View */}
      <div className="sm:hidden h-[calc(100vh-53px)]">
        {mobileView === 'notebook' ? (
          <MobileNotebookView 
            cells={cells}
            updateCell={updateCell}
            deleteCell={deleteCell}
            runCell={runCell}
            addCell={addCell}
            copied={copied}
            copyCode={copyCode}
          />
        ) : (
          <MobileChatView
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleChatSend={handleChatSend}
            isChatting={isChatting}
            addCodeToNotebook={addCodeToNotebook}
            chatEndRef={chatEndRef}
          />
        )}
      </div>

      {/* Desktop Layout - Resizable Panels */}
      <div className="hidden sm:block">
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-57px)]">
        {/* Left: Introduction + Notebook */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col overflow-auto">
          <ScrollArea className="flex-1" ref={notebookRef}>
            <div className="p-6 space-y-6">
              {/* Simulation Notice Banner */}
              <Alert className="border-amber-500/50 bg-amber-500/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-600 dark:text-amber-400">Simulation Mode</AlertTitle>
                <AlertDescription className="text-sm">
                  This is an <strong>interactive simulation</strong> to help you understand the Vibe Coding workflow before using real tools. 
                  After practicing here, you'll use VS Code with GitHub Copilot for real AI-assisted coding.
                </AlertDescription>
              </Alert>

              {/* Introduction */}
              <section className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Welcome to Vibe Coding! 🎉</h2>
                  <p className="text-muted-foreground">
                    A new way to code: describe what you want in plain English, and AI writes the code for you.
                  </p>
                </div>

                {/* What is Vibe Coding */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">What is Vibe Coding?</h3>
                        <p className="text-sm text-muted-foreground">
                          "Vibe Coding" is a term coined by Andrej Karpathy (former AI Director at Tesla) to describe 
                          a new programming approach where you <strong>describe your intent</strong> and let AI generate the code. 
                          You focus on <em>what</em> you want, not <em>how</em> to write it.
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-2xl mb-1">💬</p>
                        <p className="text-xs font-medium">1. Describe</p>
                        <p className="text-xs text-muted-foreground">Tell AI what you need</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-2xl mb-1">🤖</p>
                        <p className="text-xs font-medium">2. Generate</p>
                        <p className="text-xs text-muted-foreground">AI writes the code</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-2xl mb-1">✨</p>
                        <p className="text-xs font-medium">3. Refine</p>
                        <p className="text-xs text-muted-foreground">Review and iterate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Setup Prompt */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Code className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Ready to Set Up Your Tools?</h3>
                          <p className="text-sm text-muted-foreground">
                            After this simulation, you'll use VS Code with GitHub Copilot. Complete the setup guide to get ready!
                          </p>
                        </div>
                      </div>
                      <Link to="/spring-2026/weeks/2/setup" className="shrink-0">
                        <Button variant="default" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Setup Guide
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-3">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm">Python & Pandas</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Industry-standard tools for data analysis. You'll learn the concepts, AI helps with syntax.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">Real Dataset</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        97 survey responses about waste charging in Hong Kong. Real policy research data!
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="font-medium text-sm">GitHub Copilot</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Free for students! Complete the setup guide to get AI coding assistance in VS Code.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Dataset Preview */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileCode className="w-4 h-4" />
                      Dataset Preview (GCAP3226_week2.csv)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {COLUMN_DESCRIPTIONS.map((col) => (
                              <TableHead key={col.name} className="whitespace-nowrap text-xs">
                                {col.name}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {SAMPLE_DATA.slice(0, 3).map((row, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-xs">{row.support_info}</TableCell>
                              <TableCell className="font-mono text-xs">{row.support_after_info}</TableCell>
                              <TableCell className="font-mono text-xs">{row.fairness}</TableCell>
                              <TableCell className="text-xs">{row.food_waste_behavior}</TableCell>
                              <TableCell className="font-mono text-xs">{row.recycling_effort}</TableCell>
                              <TableCell className="font-mono text-xs">{row.Distance_artificial}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Step Guide */}
                <Accordion type="single" collapsible className="space-y-1">
                  <AccordionItem value="steps" className="border rounded-lg">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">Step-by-Step Guide</span>
                        <Badge variant="secondary" className="ml-2">6 steps</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-2">
                        {LAB_STEPS.map((step) => (
                          <div key={step.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                              {step.id}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{step.title}</p>
                              <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => useStepPrompt(step)}
                              className="text-xs"
                            >
                              Use Prompt
                            </Button>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* Notebook Cells */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Notebook
                  </h3>
                  <Button size="sm" variant="outline" onClick={() => addCell()}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Cell
                  </Button>
                </div>

                {cells.map((cell, index) => (
                  <div key={cell.id} className="group">
                    {/* Cell */}
                    <div className="border rounded-lg overflow-hidden bg-card">
                      {/* Cell Header */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-mono">
                            [{index + 1}]
                          </Badge>
                          {cell.isFromAI && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => copyCode(cell.content, cell.id)}
                          >
                            {copied === cell.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => deleteCell(cell.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Code Input */}
                      <div className="flex">
                        <div className="flex items-start p-2 border-r bg-muted/30">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => runCell(cell.id)}
                            disabled={cell.isRunning}
                          >
                            {cell.isRunning ? (
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Play className="w-4 h-4 text-green-600" />
                            )}
                          </Button>
                        </div>
                        <Textarea
                          value={cell.content}
                          onChange={(e) => updateCell(cell.id, e.target.value)}
                          className="flex-1 font-mono text-sm border-0 rounded-none resize-y min-h-[80px] focus-visible:ring-0 bg-slate-950 text-slate-100"
                          placeholder="# Write your Python code here..."
                        />
                      </div>

                      {/* Output */}
                      {cell.output && (
                        <div className="border-t bg-slate-900 p-3">
                          <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">
                            {cell.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Cell Button */}
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                  onClick={() => addCell()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Code Cell
                </Button>
              </section>

              {/* Footer */}
              <section className="pt-4 border-t">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Run on Your Computer
                </h4>
                <div className="flex flex-wrap gap-2">
                  <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      VS Code
                    </Button>
                  </a>
                  <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Python 3.10+
                    </Button>
                  </a>
                  <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      GitHub Copilot
                    </Button>
                  </a>
                  <a href="/assets/GCAP3226_week2_DataVisualization_GithubCopilot.pdf" target="_blank">
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-2" />
                      Lab Guide (PDF)
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          </ScrollArea>
          </div>
        </ResizablePanel>

        {showAIChat && (
          <>
            <ResizableHandle withHandle />

            {/* Right: AI Chat */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full flex flex-col bg-card border-l">
              <div className="px-4 py-3 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  AI Assistant
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Describe what code you want, then add it to notebook
                </p>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-sm text-muted-foreground space-y-3">
                      <p>👋 Ask me to generate Python code!</p>
                      <p className="text-xs">Try saying:</p>
                      <ul className="text-xs space-y-1">
                        <li className="p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => setChatInput("Import pandas, matplotlib, and seaborn")}>
                          "Import pandas, matplotlib, and seaborn"
                        </li>
                        <li className="p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => setChatInput("Load the CSV file into a dataframe called df")}>
                          "Load the CSV file into a dataframe called df"
                        </li>
                        <li className="p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => setChatInput("Show the first 5 rows of df")}>
                          "Show the first 5 rows of df"
                        </li>
                        <li className="p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => setChatInput("Create a bar chart of food_waste_behavior")}>
                          "Create a bar chart of food_waste_behavior"
                        </li>
                      </ul>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div key={i} className="space-y-2">
                        <div className={`text-xs font-medium ${msg.role === "user" ? "text-blue-500" : "text-purple-500"}`}>
                          {msg.role === "user" ? "You" : "AI Assistant"}
                        </div>
                        <div className={`text-sm ${msg.role === "assistant" ? "bg-muted p-3 rounded-lg" : ""}`}>
                          {msg.role === "assistant" ? (
                            <div className="space-y-2">
                              <pre className="font-mono text-xs whitespace-pre-wrap overflow-x-auto bg-slate-900 text-slate-100 p-2 rounded">
                                {msg.content}
                              </pre>
                              <Button 
                                size="sm" 
                                onClick={() => addCodeToNotebook(msg.content)}
                                className="w-full"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add to Notebook
                              </Button>
                            </div>
                          ) : (
                            <p>{msg.content}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleChatSend();
                      }
                    }}
                    placeholder="Describe the code you want..."
                    className="min-h-[60px] resize-none"
                  />
                </div>
                <Button
                  onClick={handleChatSend}
                  disabled={isChatting || !chatInput.trim()}
                  className="w-full mt-2"
                >
                  {isChatting ? (
                    "Generating..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>
              </div>
            </ResizablePanel>
          </>
        )}

        {showFileManager && (
          <>
            <ResizableHandle withHandle />

            {/* Right: File Manager */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
              <LabFileManager basePath="week2-lab" />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      </div>
    </div>
  );
};

/**
 * MobileNotebookView - Condensed notebook interface for mobile
 */
interface MobileNotebookViewProps {
  cells: NotebookCell[];
  updateCell: (id: string, content: string) => void;
  deleteCell: (id: string) => void;
  runCell: (id: string) => void;
  addCell: (content?: string, isFromAI?: boolean) => string;
  copied: string | null;
  copyCode: (code: string, id: string) => void;
}

const MobileNotebookView = ({ 
  cells, updateCell, deleteCell, runCell, addCell, copied, copyCode 
}: MobileNotebookViewProps) => (
  <ScrollArea className="h-full">
    <div className="p-3 space-y-3">
      {/* Quick intro */}
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-sm text-amber-600">Simulation Mode</AlertTitle>
        <AlertDescription className="text-xs">
          This is a preview. Use the AI tab to generate code, then run it here.
        </AlertDescription>
      </Alert>

      {/* Cells */}
      {cells.map((cell, index) => (
        <div key={cell.id} className="border rounded-lg overflow-hidden bg-card">
          <div className="flex items-center justify-between px-2 py-1.5 bg-muted/50 border-b">
            <Badge variant="outline" className="text-xs font-mono">[{index + 1}]</Badge>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => runCell(cell.id)}>
                {cell.isRunning ? (
                  <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-3 h-3 text-green-600" />
                )}
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => copyCode(cell.content, cell.id)}>
                {copied === cell.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => deleteCell(cell.id)}>
                <Trash2 className="w-3 h-3 text-destructive" />
              </Button>
            </div>
          </div>
          <Textarea
            value={cell.content}
            onChange={(e) => updateCell(cell.id, e.target.value)}
            className="font-mono text-xs border-0 rounded-none min-h-[60px] focus-visible:ring-0 bg-slate-950 text-slate-100"
            placeholder="# Python code..."
          />
          {cell.output && (
            <div className="border-t bg-slate-900 p-2">
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">{cell.output}</pre>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" className="w-full border-dashed" onClick={() => addCell()}>
        <Plus className="w-4 h-4 mr-2" />
        Add Cell
      </Button>
    </div>
  </ScrollArea>
);

/**
 * MobileChatView - AI chat interface for mobile
 */
interface MobileChatViewProps {
  chatMessages: Array<{ role: "user" | "assistant"; content: string }>;
  chatInput: string;
  setChatInput: (value: string) => void;
  handleChatSend: () => void;
  isChatting: boolean;
  addCodeToNotebook: (code: string) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const MobileChatView = ({ 
  chatMessages, chatInput, setChatInput, handleChatSend, isChatting, addCodeToNotebook, chatEndRef 
}: MobileChatViewProps) => (
  <div className="h-full flex flex-col">
    <ScrollArea className="flex-1 p-3">
      <div className="space-y-3">
        {chatMessages.length === 0 ? (
          <div className="text-sm text-muted-foreground space-y-2">
            <p>👋 Ask me to generate Python code!</p>
            <div className="space-y-1">
              {["Import pandas and matplotlib", "Load the CSV file", "Show first 5 rows", "Create a bar chart"].map((prompt, i) => (
                <div 
                  key={i}
                  className="p-2 bg-muted rounded text-xs cursor-pointer hover:bg-muted/80"
                  onClick={() => setChatInput(prompt)}
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg, i) => (
            <div key={i} className="space-y-1">
              <div className={`text-xs font-medium ${msg.role === "user" ? "text-blue-500" : "text-purple-500"}`}>
                {msg.role === "user" ? "You" : "AI"}
              </div>
              {msg.role === "assistant" ? (
                <div className="space-y-2">
                  <pre className="font-mono text-xs whitespace-pre-wrap overflow-x-auto bg-slate-900 text-slate-100 p-2 rounded">
                    {msg.content}
                  </pre>
                  <Button size="sm" onClick={() => addCodeToNotebook(msg.content)} className="w-full">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Notebook
                  </Button>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </ScrollArea>
    <div className="p-3 border-t">
      <Textarea
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Describe the code you want..."
        className="min-h-[50px] resize-none text-sm"
      />
      <Button onClick={handleChatSend} disabled={isChatting || !chatInput.trim()} className="w-full mt-2">
        {isChatting ? "Generating..." : <><Send className="w-4 h-4 mr-2" />Generate</>}
      </Button>
    </div>
  </div>
);

export default Spring2026Week2Lab;
