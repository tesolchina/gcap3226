import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Target, MessageSquare, FileText, Users, Presentation } from "lucide-react";

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
      title: "Reflection & Assessment",
      icon: FileText,
      color: "red",
      content: <Module5 onComplete={() => handleModuleComplete(5)} />
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
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (choice: string) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    if (choice === 'B') {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Module 1: Interactive Lecture - The St Martin Bus Stop Case
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">📊 The Problem Discovery</h3>
            <p className="text-muted-foreground mb-4">
              A seemingly simple issue that reveals deeper data governance challenges.
            </p>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">🚌 The St Martin Bus Stops</h4>
              <p className="text-red-700 text-sm">
                Both stops appear as "St Martin" in bus tracking apps. Passengers can't tell which side of the street the incoming bus is actually approaching.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🤔 Initial Assessment: What type of problem is this?</h3>
            <div className="space-y-3">
              {[
                { id: 'A', text: 'Technology problem - apps need better GPS', correct: false },
                { id: 'B', text: 'Data governance problem - inconsistent naming standards', correct: true },
                { id: 'C', text: 'User experience problem - people need better training', correct: false },
                { id: 'D', text: 'Business problem - bus companies need better coordination', correct: false }
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
                      {choice.correct ? '✅ Correct!' : '❌ Not quite'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {showFeedback && selectedChoice === 'B' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ Correct! This is fundamentally a data governance issue. While technology and user experience are affected, the root cause is poor data standards.
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">📝 Optional Tasks</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Research similar data quality issues in Hong Kong public services</li>
              <li>• Map out the user journey for someone trying to catch a bus at St Martin</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🪞 Reflection & Note-taking</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Journal entry: Personal experiences with confusing data or services..."
            />
          </div>
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
                <div className="ml-4">duplicates = stops.groupby(<span className="text-green-300">'name'</span>).filter(<span className="text-yellow-400">lambda</span> x: len(x) > 1)</div>
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

const Module5: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-red-500" />
            Module 5: Reflection & Assessment
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
