import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Maximize2, ExternalLink, Presentation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WeekLayout from "@/components/WeekLayout";

const SLIDES_URL = "https://docs.google.com/presentation/d/1uTgQQD82Fcj5KEQ36P0JiPFAMo85FwbdfQLQRCqimf8";

const Spring2026Week4 = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const handleOpenNewWindow = () => {
    window.open(`${SLIDES_URL}/present`, "_blank");
  };

  const slidesContent = (
    <Collapsible open={isSlidesOpen} onOpenChange={setIsSlidesOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/50">
          <span className="flex items-center gap-2">
            <Presentation className="h-4 w-4 text-violet-600" />
            <span>Lecture Slides</span>
            <Badge variant="outline" className="ml-2 text-xs border-violet-300 text-violet-600">Simon</Badge>
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
  );

  return (
    <WeekLayout
      weekNumber={4}
      title="Simulation Modeling & Data Governance"
      description="Introduction to simulation modeling using SimPy and data governance concepts for policy analysis."
      objectives={[
        "Understand simulation modeling fundamentals",
        "Generate random variables from probability distributions",
        "Build discrete event simulations with SimPy",
        "Visualize simulation results effectively",
        "Learn about data governance principles",
      ]}
      activities={[
        "In-class simulation exercise using Jupyter Notebook",
        "Bus transit simulation modeling",
        "Data visualization workshop",
        "Data governance lecture and discussion",
      ]}
      inClassExercise={{
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
      }}
      assessment="In-class Exercise 2 (5%)"
      assessmentLink="/spring-2026/weeks/4/in-class-exercise-2"
      customContent={slidesContent}
    />
  );
};

export default Spring2026Week4;
