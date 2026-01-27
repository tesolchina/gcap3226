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
  BarChart3,
  FileText,
  Upload,
  Users,
  TrendingUp,
} from "lucide-react";

const SLIDES_URL = "https://docs.google.com/presentation/d/1PUmZZ7V7114P7pnDNwZ9EoaEZUwW33GwybwI-kNqINg";
const MENTIMETER_URL = "https://www.menti.com/al3z33obk7eo";
const MOODLE_URL = "#"; // Replace with actual Moodle section URL

const Spring2026Week3 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mentimeterIframeRef = useRef<HTMLIFrameElement>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);
  const [isMentimeterOpen, setIsMentimeterOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const handleMentimeterFullscreen = () => {
    if (mentimeterIframeRef.current?.requestFullscreen) {
      mentimeterIframeRef.current.requestFullscreen();
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
            <span>Week 3</span>
          </div>
          <h1 className="text-4xl font-bold text-primary">Regression Analysis & Group Formation</h1>
          <p className="text-lg text-muted-foreground">
            Apply regression analysis techniques to real policy data and form project groups for the semester.
          </p>
        </div>

        {/* Assessment Badge */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <FileText className="w-3 h-3 mr-1" />
            In-class Exercise 1 (5%)
          </Badge>
          <Link to="/spring-2026/weeks/3/in-class-exercise-1" className="text-sm text-primary hover:underline">
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
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Practice linear and logistic regression analysis</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Compare forward and backward variable selection methods</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Interpret regression results for policy insights</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Create exploratory data visualizations</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Form effective research teams and select topics</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Class Activities
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>In-class regression exercise using Jupyter Notebook</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Analysis of Hong Kong Waste Charging Policy survey data</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Team formation activities</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Topic selection workshop</li>
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
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Regression Analysis Slides</span>
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
                  title="Week 3: Regression Analysis Lecture Slides"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Collapsible: Live Mentimeter Session */}
        <Collapsible open={isMentimeterOpen} onOpenChange={setIsMentimeterOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-600" />
                <span>Live Mentimeter Session</span>
                <Badge variant="outline" className="ml-2 text-xs border-amber-300 text-amber-600">Interactive</Badge>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMentimeterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="rounded-lg overflow-hidden border border-amber-200 dark:border-amber-800">
              <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 px-4 py-2 border-b border-amber-200 dark:border-amber-800">
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Live Mentimeter Session</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMentimeterFullscreen}
                    className="h-8 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                  >
                    <Maximize2 className="w-4 h-4 mr-1" />
                    Fullscreen
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(MENTIMETER_URL, "_blank")}
                    className="h-8 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  ref={mentimeterIframeRef}
                  src={MENTIMETER_URL}
                  className="w-full h-full"
                  title="Week 3: Live Mentimeter Session"
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
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Moodle Link Card */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Download Exercise Files from Moodle</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Login required with your HKBU account</p>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900"
                  disabled={MOODLE_URL === "#"}
                >
                  <a href={MOODLE_URL} target="_blank" rel="noopener noreferrer">
                    Open Moodle
                  </a>
                </Button>
              </div>
            </Card>

            {/* Exercise Details */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Regression Analysis In-Class Exercise
              </h3>
              <p className="text-muted-foreground mb-4">
                Analyze Hong Kong Waste Charging Policy survey data using linear and logistic regression. 
                Explore the relationship between support levels and various demographic/attitudinal factors.
              </p>
              
              <h4 className="font-medium mb-2 text-sm">Skills Practiced:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Linear regression with statsmodels</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Logistic regression for binary outcomes</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Forward and backward variable selection</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Data visualization with matplotlib</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span>Interpreting regression coefficients and p-values</li>
              </ul>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Submission Instructions
                </h4>
                <p className="text-sm text-muted-foreground">
                  Complete the exercise in Jupyter Notebook and upload your <code className="bg-muted px-1 rounded">.ipynb</code> file to Moodle before the end of class.
                </p>
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

export default Spring2026Week3;
