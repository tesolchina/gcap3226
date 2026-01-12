import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Copy, Check, Download, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { streamChat } from "@/lib/ai-chat";
import ReactMarkdown from "react-markdown";

const EXAMPLE_PROMPTS = [
  "# Import pandas, matplotlib, and seaborn",
  "# Load a CSV file called GCAP3226_week2.csv into a dataframe",
  "# Show the first 5 rows of the dataframe",
  "# Create a bar chart showing frequency of values in the 'category' column",
  "# Calculate summary statistics for numeric columns",
];

const SYSTEM_PROMPT = `You are GitHub Copilot, an AI coding assistant. The user will provide a comment prompt describing what code they want. Generate ONLY the Python code that fulfills the request. 

Rules:
- Output ONLY code, no explanations or markdown formatting
- Use pandas, matplotlib, and seaborn for data analysis
- Keep code concise and follow Python best practices
- If the prompt is about loading data, assume the file is 'GCAP3226_week2.csv'`;

const Spring2026Week2Lab = () => {
  const [prompt, setPrompt] = useState("# Import pandas and load a CSV file");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isChatting, setIsChatting] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#252526] px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/spring-2026/weeks/2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Week 2
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h1 className="text-lg font-semibold">Vibe Coding Demo</h1>
            </div>
          </div>
          <span className="text-xs text-gray-500">Simulated VS Code + GitHub Copilot Experience</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel: Code Editor */}
        <div className="flex-1 border-r border-gray-700 flex flex-col">
          <div className="bg-[#252526] px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-400">main.py</span>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4 overflow-auto">
            {/* Prompt Input */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                ✍️ Type your prompt as a Python comment:
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="font-mono text-sm bg-[#1e1e1e] border-gray-600 text-green-400 min-h-[100px]"
                placeholder="# Write your prompt here..."
              />
            </div>

            {/* Example Prompts */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">💡 Try an example:</label>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((example, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    className="text-xs bg-[#2d2d2d] border-gray-600 text-gray-300 hover:bg-[#3d3d3d] hover:text-white"
                  >
                    {example.replace("# ", "")}
                  </Button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateCode}
              disabled={isGenerating || !prompt.trim()}
              className="bg-purple-600 hover:bg-purple-700 w-fit"
            >
              <Play className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Code (Copilot)"}
            </Button>

            {/* Generated Code Output */}
            {generatedCode && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">🤖 Generated Code:</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
                <pre className="bg-[#1e1e1e] border border-gray-600 rounded-md p-4 overflow-x-auto">
                  <code className="text-sm text-blue-300 font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: AI Assistant */}
        <div className="w-96 flex flex-col bg-[#252526]">
          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Copilot Assistant
            </h2>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-gray-400 text-sm space-y-3">
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
                  className={`text-sm ${msg.role === "user" ? "text-blue-300" : "text-gray-300"}`}
                >
                  <span className="text-xs text-gray-500 block mb-1">
                    {msg.role === "user" ? "You" : "Copilot"}
                  </span>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Ask a question..."
                className="flex-1 bg-[#1e1e1e] border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
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
        </div>
      </div>

      {/* Footer: Setup Instructions */}
      <footer className="bg-[#252526] border-t border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Ready to try it yourself? Download and install:
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <ExternalLink className="w-3 h-3 mr-2" />
                VS Code
              </Button>
            </a>
            <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <ExternalLink className="w-3 h-3 mr-2" />
                Python 3.10+
              </Button>
            </a>
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <ExternalLink className="w-3 h-3 mr-2" />
                GitHub Copilot
              </Button>
            </a>
            <a href="/assets/GCAP3226_week2_DataVisualization_GithubCopilot.pdf" target="_blank">
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <Download className="w-3 h-3 mr-2" />
                Lab Guide (PDF)
              </Button>
            </a>
            <a href="/assets/GCAP3226_week2_student.ipynb" download>
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <Download className="w-3 h-3 mr-2" />
                Jupyter Notebook
              </Button>
            </a>
            <a href="/data/GCAP3226_week2.csv" download>
              <Button variant="outline" size="sm" className="bg-[#2d2d2d] border-gray-600">
                <Download className="w-3 h-3 mr-2" />
                Dataset (CSV)
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Spring2026Week2Lab;
