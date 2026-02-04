import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRef, useState } from "react";
import {
  ChevronDown,
  Maximize2,
  ExternalLink,
  BookOpen,
  Presentation,
  FileText,
  Upload,
  TrendingUp,
  Code,
} from "lucide-react";

const SLIDES_URL = "https://docs.google.com/presentation/d/1uTgQQD82Fcj5KEQ36P0JiPFAMo85FwbdfQLQRCqimf8";

const Spring2026Week4 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const handleOpenNewWindow = () => {
    window.open(`${SLIDES_URL}/present`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Week 4</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">Simulation Modeling & Data Governance</h1>
          <p className="text-lg text-muted-foreground">
            Introduction to simulation modeling using SimPy and data governance concepts for policy analysis.
          </p>
        </div>

        {/* Assessment Badge */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <FileText className="w-3 h-3 mr-1" />
            In-class Exercise 2 (5%)
          </Badge>
          <Link to="/spring-2026/weeks/4/in-class-exercise-2" className="text-sm text-primary hover:underline">
            View Assessment Details →
          </Link>
        </div>

        {/* Collapsible: Learning Objectives & Activities */}
        <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Objectives & Activities
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOverviewOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Learning Objectives
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Understand simulation modeling fundamentals</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Generate random variables from probability distributions</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Build discrete event simulations with SimPy</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Visualize simulation results effectively</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Learn about data governance principles</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                Class Activities
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>In-class simulation exercise using Jupyter Notebook</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Bus transit simulation modeling</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Data visualization workshop</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Data governance lecture and discussion</li>
              </ul>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Lecture Slides from Talia */}
        <Collapsible open={isSlidesOpen} onOpenChange={setIsSlidesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/50">
              <span className="flex items-center gap-2">
                <Presentation className="h-4 w-4 text-violet-600" />
                <span>Lecture Slides</span>
                <Badge variant="outline" className="ml-2 text-xs border-violet-300 text-violet-600">Talia</Badge>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isSlidesOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="rounded-lg overflow-hidden border border-violet-200 dark:border-violet-800">
              <div className="flex items-center justify-between bg-violet-50 dark:bg-violet-950/30 px-4 py-2 border-b border-violet-200 dark:border-violet-800">
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Simulation Modeling & Data Governance Slides</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFullscreen}
                    className="h-8 px-2 text-violet-600 hover:text-violet-700 hover:bg-violet-100"
                  >
                    <Maximize2 className="w-4 h-4 mr-1" />
                    Fullscreen
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenNewWindow}
                    className="h-8 px-2 text-violet-600 hover:text-violet-700 hover:bg-violet-100"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  ref={iframeRef}
                  src={`${SLIDES_URL}/embed?start=false&loop=false&delayms=3000`}
                  className="w-full h-full"
                  allowFullScreen
                  title="Week 4: Simulation Modeling & Data Governance Lecture Slides"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: In-Class Exercise */}
        <Collapsible open={isExerciseOpen} onOpenChange={setIsExerciseOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50">
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-blue-600" />
                <span>In-Class Exercise</span>
                <Badge variant="outline" className="ml-2 text-xs border-blue-300 text-blue-600">Moodle</Badge>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExerciseOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {/* Moodle Link Card */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">In-Class Exercise 2</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Submit your Jupyter Notebook to Moodle</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-100"
                  onClick={() => window.open("https://buelearning.hkbu.edu.hk/mod/assign/view.php?id=1918676", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open Moodle
                </Button>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" asChild>
            <Link to="/spring-2026">
              ← Back to Course Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Week4;
