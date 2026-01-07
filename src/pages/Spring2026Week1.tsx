import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Target, MessageSquare, FileText, Users, ChevronDown, ChevronUp, Database, Scale, AlertTriangle, CheckCircle2, Code, Calculator, LineChart, Bot, Cpu, TrendingUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import busAppScreenshot from "@/assets/bus-app-duplicate-stops.png";

const Spring2026Week1 = () => {
  const [currentModule, setCurrentModule] = useState(1);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  const modules = [
    {
      id: 1,
      title: "Interactive Lecture: The St Martin Bus Stop Case",
      icon: BookOpen,
      color: "blue",
      content: <Module1 onComplete={() => handleModuleComplete(1)} />
    },
    {
      id: 2,
      title: "Citizen Advocacy Journey",
      icon: Users,
      color: "green",
      content: <Module2 onComplete={() => handleModuleComplete(2)} />
    },
    {
      id: 3,
      title: "Data Governance & Mathematical Analysis",
      icon: Target,
      color: "purple",
      content: <Module3 onComplete={() => handleModuleComplete(3)} />
    },
    {
      id: 4,
      title: "Practice & Discussion Activities",
      icon: MessageSquare,
      color: "orange",
      content: <Module4 onComplete={() => handleModuleComplete(4)} />
    },
    {
      id: 5,
      title: "Technology & Math (Dr. Talia)",
      icon: Code,
      color: "cyan",
      content: <Module5TechMath onComplete={() => handleModuleComplete(5)} />
    },
    {
      id: 6,
      title: "Reflection & Assessment",
      icon: FileText,
      color: "red",
      content: <Module6 onComplete={() => handleModuleComplete(6)} />
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    setProgress((completedModules.size + 1) / modules.length * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/spring-2026">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">Week 1</p>
              <h1 className="text-4xl font-bold text-primary">Course Introduction & Data Governance Fundamentals</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Introduction to participatory policy analysis in Hong Kong, with focus on data governance and citizen advocacy.
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Learning Progress</h2>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </Card>

        {/* Module Navigation */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={currentModule === module.id ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-start gap-2 ${
                  completedModules.has(module.id) ? "border-green-500 bg-green-50" : ""
                }`}
                onClick={() => setCurrentModule(module.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  <module.icon className="h-5 w-5" />
                  <span className="font-medium">Module {module.id}</span>
                  {completedModules.has(module.id) && (
                    <span className="ml-auto text-green-600">✓</span>
                  )}
                </div>
                <span className="text-sm text-left">{module.title}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Current Module Content */}
        <div className="space-y-6">
          {modules.find(m => m.id === currentModule)?.content}
        </div>

        {/* Module Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentModule(Math.max(1, currentModule - 1))}
            disabled={currentModule === 1}
          >
            Previous Module
          </Button>
          <Button
            onClick={() => setCurrentModule(Math.min(modules.length, currentModule + 1))}
            disabled={currentModule === modules.length}
          >
            Next Module
          </Button>
        </div>
      </div>
    </div>
  );
};

const Module1: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="space-y-6">
      {/* Section A: Lecture Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Module 1: Introduction to Data Governance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Concepts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              What is Data Governance?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                  <Scale className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Definition</h4>
                    <p className="text-sm text-muted-foreground">
                      The policies, processes, and standards that ensure data is accurate, consistent, and usable across an organization.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Core Principles</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>• <strong>Accuracy</strong> – Data reflects reality</li>
                      <li>• <strong>Consistency</strong> – Same data across systems</li>
                      <li>• <strong>Uniqueness</strong> – No confusing duplicates</li>
                      <li>• <strong>Usability</strong> – Data serves user needs</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">Why It Matters</h4>
                    <p className="text-sm text-muted-foreground">
                      Poor data governance leads to confusion, wasted resources, and poor decision-making in both public and private sectors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary">Course Focus</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll examine how HK government manages public data and identify opportunities for improvement through citizen advocacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Example Toggle */}
          <Collapsible open={showExample} onOpenChange={setShowExample}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🚌 Real-World Example: The St Martin Bus Stop Problem
                </span>
                {showExample ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">The Problem</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Look at the bus app screenshot. Can you spot the data governance issue?
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">→</span>
                        Stop #7 is named "St MARTIN"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">→</span>
                        Stop #11 is also named "St MARTIN"
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold">→</span>
                        Same name, different locations!
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Impact on Users</h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                      <li>• Passengers can't tell which stop the bus is approaching</li>
                      <li>• Confusion about which side of the street to wait</li>
                      <li>• Missed buses and wasted time</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={busAppScreenshot} 
                    alt="KMB Bus App showing duplicate St Martin stops"
                    className="rounded-lg shadow-lg border max-h-[400px] object-contain"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    KMB app showing Route 272A with duplicate "St MARTIN" stops
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">🔍 Data Governance Analysis</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-background p-3 rounded">
                    <span className="font-medium text-destructive">Uniqueness ❌</span>
                    <p className="text-muted-foreground text-xs mt-1">Duplicate names without unique identifiers</p>
                  </div>
                  <div className="bg-background p-3 rounded">
                    <span className="font-medium text-destructive">Usability ❌</span>
                    <p className="text-muted-foreground text-xs mt-1">Data doesn't serve passenger needs</p>
                  </div>
                  <div className="bg-background p-3 rounded">
                    <span className="font-medium text-amber-600">Consistency ⚠️</span>
                    <p className="text-muted-foreground text-xs mt-1">Different systems may handle this differently</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* MC Tasks Placeholder */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">📝 Check Your Understanding</h3>
            <p className="text-sm text-muted-foreground">MC questions will appear here (2-3 questions about data governance concepts)</p>
          </div>

          {/* Open-Ended Task Placeholder */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">✍️ Reflection Task</h3>
            <p className="text-sm text-muted-foreground">Open-ended reflection with AI feedback will appear here</p>
          </div>

          {/* Teacher Comments Placeholder */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">💬 Teacher Comments</h3>
            <p className="text-sm text-muted-foreground">Teacher observations and AI summaries will appear here</p>
          </div>

          <Button onClick={onComplete} className="w-full">
            Mark Module as Complete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Module2: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoice = (choice: string) => {
    setSelectedChoice(choice);
    if (choice === 'B') {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Module 2: Citizen Advocacy Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">👨‍🏫 Dr. Simon Wang's Advocacy Journey</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Problem Recognition", desc: "Dr. Wang experiences confusion multiple times when waiting for buses at St Martin stops." },
                { step: 2, title: "Initial Contact", desc: "Emails Transport Department staff with specific details and suggested solutions." },
                { step: 3, title: "Strategic Escalation", desc: "Escalates to Assistant Director with clear business case and safety concerns." },
                { step: 4, title: "Solution Implementation", desc: "TD coordinates with bus companies to add unique identifiers." }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🎯 What made the escalation successful?</h3>
            <div className="space-y-3">
              {[
                { id: 'A', text: 'Using more emotional language and urgency', correct: false },
                { id: 'B', text: 'Reaching the right decision-maker with a clear business case', correct: true },
                { id: 'C', text: 'Threatening to go public with the complaint', correct: false },
                { id: 'D', text: 'Including multiple government departments in the email', correct: false }
              ].map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.id)}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                    selectedChoice === choice.id
                      ? choice.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  disabled={selectedChoice !== null}
                >
                  <span className="font-medium">{choice.id})</span> {choice.text}
                  {selectedChoice === choice.id && (
                    <span className="ml-2">
                      {choice.correct ? '✅ Exactly right!' : '❌ Not quite'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">📝 Optional Tasks</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Analyze the email communication strategy differences</li>
              <li>• Identify potential escalation paths for different types of public issues</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🪞 Reflection & Note-taking</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Personal action plan: How to approach local government with concerns..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Module3: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Module 3: Data Governance & Mathematical Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-3">❌ Data Quality Principles Violated</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li><strong>Uniqueness:</strong> Duplicate names without distinguishing identifiers</li>
                <li><strong>Usability:</strong> Data structure doesn't match user needs</li>
                <li><strong>Consistency:</strong> Different systems may use different naming</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3">✅ Mathematical Analysis Opportunities</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li><strong>Scale Analysis:</strong> Find all duplicate bus stop names</li>
                <li><strong>Impact Modeling:</strong> Calculate user confusion rates</li>
                <li><strong>Optimization:</strong> Design optimal naming conventions</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
            <div className="flex items-center mb-4">
              <span className="text-white bg-green-600 px-2 py-1 rounded text-xs mr-3">API DEMO</span>
              <h3 className="text-white font-bold">Finding Similar Data Issues Programmatically</h3>
            </div>
            <div className="space-y-2">
              <div><span className="text-blue-400"># Simulate API call to find duplicate bus stop names</span></div>
              <div><span className="text-yellow-400">import</span> requests, pandas</div>
              <div className="ml-4">
                <div><span className="text-yellow-400">def</span> <span className="text-white">find_duplicate_stops</span>():</div>
                <div className="ml-4"><span className="text-blue-400"># Get HK bus stop data</span></div>
                <div className="ml-4">response = requests.get(<span className="text-green-300">'https://api.data.gov.hk/v1/bus-stops'</span>)</div>
                <div className="ml-4">stops = response.json()</div>
                <div className="ml-4"><span className="text-blue-400"># Find duplicates</span></div>
                <div className="ml-4">duplicates = stops.groupby(<span className="text-green-300">'name'</span>).filter(<span className="text-yellow-400">lambda</span> x: len(x) {'>'} 1)</div>
                <div className="ml-4"><span className="text-yellow-400">return</span> duplicates</div>
              </div>
              <div className="mt-3 text-white">
                <span className="text-red-400">Results found:</span>
                <span className="bg-red-600 px-2 py-1 rounded">127 duplicate bus stop names</span> across Hong Kong
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-4">🔢 Mathematical Applications in Data Governance</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded">
                <h4 className="font-semibold text-purple-800 mb-2">📈 Statistical Analysis</h4>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Error rate calculations</li>
                  <li>• User confusion metrics</li>
                  <li>• Cost-benefit analysis</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded">
                <h4 className="font-semibold text-purple-800 mb-2">🤖 Machine Learning</h4>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Duplicate detection algorithms</li>
                  <li>• Pattern recognition</li>
                  <li>• Automated quality scoring</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Optimization</h4>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>• Naming convention design</li>
                  <li>• Resource allocation</li>
                  <li>• Update prioritization</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🪞 Reflection & Note-taking</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Personal insights on how math can solve real-world policy problems..."
            />
          </div>

          <Button onClick={onComplete} className="w-full">
            Complete Module 3
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Module4: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (task: string, value: string) => {
    setResponses(prev => ({ ...prev, [task]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            Module 4: Practice & Discussion Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Task 1: Personal Experience Reflection */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">1️⃣ Personal Experience Reflection</h3>
            <p className="text-blue-700 mb-4">
              Think about a time when you encountered a problem with a service or system that affected your daily life.
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Write about your experience here..."
              value={responses.task1 || ''}
              onChange={(e) => handleResponseChange('task1', e.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">👥 Share with Peers</Button>
              <Button variant="outline" size="sm">🤖 Get AI Feedback</Button>
            </div>
          </div>

          {/* Task 2: Action Strategy Development */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">2️⃣ Action Strategy Development</h3>
            <p className="text-green-700 mb-4">
              If you could go back to the situation you described, what would be your ideal action plan to address the problem?
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={5}
              placeholder="Describe your strategic approach..."
              value={responses.task2 || ''}
              onChange={(e) => handleResponseChange('task2', e.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">👥 Compare Strategies</Button>
              <Button variant="outline" size="sm">🤖 AI Strategy Review</Button>
            </div>
          </div>

          {/* Task 3: Professional Communication */}
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">3️⃣ Professional Communication</h3>
            <p className="text-orange-700 mb-4">
              Write a professional email or letter to the appropriate authority about your problem.
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
              rows={8}
              placeholder="Subject: [Your subject line]

Dear [Authority],

[Write your professional message here...]

Sincerely,
[Your name]"
              value={responses.task3 || ''}
              onChange={(e) => handleResponseChange('task3', e.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">👥 Peer Review</Button>
              <Button variant="outline" size="sm">🤖 AI Communication Review</Button>
            </div>
          </div>

          {/* Task 4: Learning Synthesis */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">4️⃣ Key Insights & Takeaways</h3>
            <p className="text-purple-700 mb-4">
              Reflect on what you've learned from this experience. What are the most important insights about citizen advocacy and policy change?
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={6}
              placeholder="Share your key insights and learning outcomes..."
              value={responses.task4 || ''}
              onChange={(e) => handleResponseChange('task4', e.target.value)}
            />
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm">👥 Share Insights</Button>
              <Button variant="outline" size="sm">🤖 AI Reflection Guidance</Button>
            </div>
          </div>

          <Button onClick={onComplete} className="w-full">
            Complete Module 4
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Module 5: Technology & Math (Talia's content)
const Module5TechMath: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showCopilot, setShowCopilot] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showRegression, setShowRegression] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-500" />
            Module 5: Technology & Math
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Content by Dr. Talia</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Python Introduction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-600" />
              Technology Tools
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <div className="bg-cyan-600 text-white rounded-lg p-2">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-800 dark:text-cyan-200">1. Python</h4>
                  <p className="text-sm text-cyan-700 dark:text-cyan-300">
                    Programming language that we will use for <strong>data visualization</strong>, <strong>analysis</strong>, and <strong>simulation</strong>.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="bg-purple-600 text-white rounded-lg p-2">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200">2. GitHub Copilot</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Your AI assistant for programming - helps write code from natural language descriptions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Copilot Section */}
          <Collapsible open={showCopilot} onOpenChange={setShowCopilot}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🤖 How GitHub Copilot Changes Programming
                </span>
                {showCopilot ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-lg border">
                <h4 className="font-semibold mb-4">How Copilot Changes How We Learn to Program</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg">
                    <h5 className="font-medium text-amber-600 mb-2">📜 In the Past</h5>
                    <p className="text-sm text-muted-foreground">
                      Learners spent most time on <strong>syntax and structure</strong> of programs.
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-lg">
                    <h5 className="font-medium text-green-600 mb-2">🚀 Now</h5>
                    <p className="text-sm text-muted-foreground">
                      Copilot can generate basic programs <strong>almost immediately</strong> and almost always syntactically correct. Users describe programs in words (write a <strong>prompt</strong>).
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium mb-3">How Does Copilot Work?</h5>
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-center flex-1">
                      <p className="text-sm font-medium">You type a prompt</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg text-center flex-1">
                      <p className="text-sm font-medium">Copilot sends to LLM</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-center flex-1">
                      <p className="text-sm font-medium">GPT generates code</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h5 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">🎯 Skills We Need to Develop</h5>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                    <li>• The skill to <strong>break down large problems</strong> into smaller tasks that Copilot can help with</li>
                    <li>• How to tell Copilot what to do, i.e., <strong>prompt engineering</strong></li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Simulation Modeling Section */}
          <Collapsible open={showSimulation} onOpenChange={setShowSimulation}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🎲 Optimization via Simulation Modelling
                </span>
                {showSimulation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 p-6 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Optimization Goals</h4>
                    <p className="text-sm text-muted-foreground">
                      The shortest path to the destination, the smallest amount of waste production, the minimized costs, the shortest queueing time...
                    </p>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mt-2">
                      🎯 Objective: Efficient system operation
                    </p>
                  </div>

                  <div className="bg-background p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Simulation Can Be Used To:</h5>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Model <strong>complex systems</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Assess <strong>dynamic system behavior</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Explore hypothetical situations and answer <strong>"what-if" scenarios</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>Test new solutions in a <strong>cheaper and safer manner</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="flex items-center mb-3">
                      <span className="text-white bg-green-600 px-2 py-1 rounded text-xs mr-3">PYTHON</span>
                      <span className="text-white font-bold">SimPy: Discrete-Event Simulation</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div><span className="text-blue-400"># Simulation is about mimicking complex systems over time</span></div>
                      <div><span className="text-yellow-400">import</span> simpy</div>
                      <div className="text-gray-400"># Run and rerun a model many times under different scenarios</div>
                      <div className="text-gray-400"># Predict system behaviour and evaluate performance</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">📚 Example Resources:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Bus simulation: <a href="https://poe.com/Bus56" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">poe.com/Bus56</a></li>
                      <li>• Transport Dept Regional Planning: <a href="https://www.td.gov.hk/filemanager/en/util_uarticle_cp/southern%20-%20rpp%202023-24%20(eng).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Southern Region Report</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Linear Regression Section */}
          <Collapsible open={showRegression} onOpenChange={setShowRegression}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  📈 Linear Regression and Public Services
                </span>
                {showRegression ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Public Policy Applications</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-background p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <h5 className="font-medium">Population Density & Services</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          How population density impacts the demand for public services?
                        </p>
                        <p className="text-xs text-blue-600 mt-2">→ Informs resource allocation & sustainable city development</p>
                      </div>
                      <div className="bg-background p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <LineChart className="h-4 w-4 text-indigo-600" />
                          <h5 className="font-medium">Opinion & Satisfaction</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          What's the relationship among public opinion, political trust, and public satisfaction?
                        </p>
                        <p className="text-xs text-indigo-600 mt-2">→ Assesses government performance & legitimacy</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Linear Regression Overview
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Linear regression is a statistical method used to model the relationship between a <strong>dependent variable</strong> and one or more <strong>independent variables</strong>, assuming a linear relationship.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The model is <strong>built (fitted)</strong> based on data.
                    </p>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="flex items-center mb-3">
                      <span className="text-white bg-orange-600 px-2 py-1 rounded text-xs mr-3">PYTHON</span>
                      <span className="text-white font-bold">scikit-learn: Machine Learning Library</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div><span className="text-yellow-400">from</span> sklearn.linear_model <span className="text-yellow-400">import</span> LinearRegression</div>
                      <div><span className="text-yellow-400">import</span> pandas <span className="text-yellow-400">as</span> pd</div>
                      <div className="mt-2"><span className="text-blue-400"># Fit model to predict public service demand</span></div>
                      <div>model = LinearRegression()</div>
                      <div>model.fit(population_density, service_demand)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* MC Tasks Placeholder */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">📝 Check Your Understanding</h3>
            <p className="text-sm text-muted-foreground">MC questions about simulation modeling and linear regression will appear here</p>
          </div>

          {/* Reflection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🪞 Reflection & Note-taking</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="How might you use simulation modeling or linear regression to analyze a policy problem in Hong Kong?"
            />
          </div>

          <Button onClick={onComplete} className="w-full">
            Complete Module 5
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Module 6: Reflection & Assessment (renamed from Module 5)
const Module6: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-red-500" />
            Module 6: Reflection & Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Reflection Questions</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  What surprised you most about the advocacy process?
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Your response..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  How has your confidence in taking action changed?
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Your response..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  What skills do you still need to develop?
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Your response..."
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Report Submission</h3>
            <div className="space-y-3 text-blue-700">
              <p>• Download your generated report from the main page.</p>
              <p>• Log in to Moodle and navigate to the appropriate course and assignment.</p>
              <p>• Upload the report file as instructed.</p>
              <p>• Check Moodle for feedback from your teacher after submission.</p>
            </div>
            <Button className="mt-4" variant="outline">
              📊 Generate Final Report
            </Button>
          </div>

          <Button onClick={onComplete} className="w-full">
            Complete Week 1
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Spring2026Week1;
