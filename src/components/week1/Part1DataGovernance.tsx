/**
 * Part 1: Data Governance Component
 * 
 * This component renders the first half of Week 1 content, focusing on
 * critical review of data governance with real-world Hong Kong examples.
 * 
 * Features:
 * - Bus stop example with email correspondence timeline
 * - Flu shot policy analysis with SCMP letter
 * - Interactive mermaid diagrams
 * 
 * @component
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, ChevronUp, FileText, Clock, CheckCircle2, 
  ExternalLink, Mail, ExternalLinkIcon, Database 
} from "lucide-react";
import { 
  Collapsible, CollapsibleContent, CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import MermaidDiagram from "@/components/MermaidDiagram";
import busAppScreenshot from "@/assets/bus-app-duplicate-stops.png";
import busAppFixed from "@/assets/bus-app-fixed-stops.jpeg";

// Import sub-components for better organization
import BusStopExample from "./BusStopExample";
import FluShotExample from "./FluShotExample";

/**
 * Part1DataGovernance displays the data governance section of Week 1
 * Presented by Simon, focusing on how HK government makes decisions
 */
const Part1DataGovernance = () => {
  // Toggle states for collapsible sections
  const [showBusExample, setShowBusExample] = useState(false);
  const [showFluShotLetter, setShowFluShotLetter] = useState(false);

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Part 1: Critical Review of Data Governance
          </CardTitle>
          <p className="text-sm text-muted-foreground">Presented by Simon</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Message - Key questions for the course */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-lg mb-2">Key Questions for This Course</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• How does the Hong Kong government make decisions?</li>
              <li>• To what extent are these decisions informed by data?</li>
              <li>• How can citizens engage constructively to improve data governance?</li>
            </ul>
          </div>

          {/* Final Project Preview */}
          <FinalProjectPreview />

          {/* Bus Stop Example - Collapsible section */}
          <Collapsible open={showBusExample} onOpenChange={setShowBusExample}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  🚌 Appetizer: The St Martin Bus Stop Problem
                </span>
                {showBusExample ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <BusStopExample />
            </CollapsibleContent>
          </Collapsible>

          {/* Flu Shot Example - Main feature example */}
          <Collapsible open={showFluShotLetter} onOpenChange={setShowFluShotLetter}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-primary/5">
                <span className="flex items-center gap-2">
                  💉 Featured Example: Influenza Vaccination Program
                </span>
                {showFluShotLetter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              <FluShotExample />
            </CollapsibleContent>
          </Collapsible>

          {/* Closing note */}
          <p className="text-sm text-muted-foreground italic">
            These examples illustrate how citizen engagement with data can lead to 
            policy improvements. Your projects will tackle similar issues.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * FinalProjectPreview shows an overview of what students will accomplish
 */
const FinalProjectPreview = () => (
  <div className="p-4 bg-accent/50 rounded-lg">
    <h3 className="font-semibold text-lg mb-2">Your Final Project</h3>
    <p className="text-muted-foreground mb-3">
      Throughout this course, you'll work in teams to investigate a real policy 
      issue in Hong Kong. Your journey will involve:
    </p>
    <ol className="space-y-2 text-muted-foreground">
      <li><strong>1. Identify</strong> – Choose a policy area and identify specific government decisions</li>
      <li><strong>2. Investigate</strong> – Curate public data and request information from government</li>
      <li><strong>3. Analyze</strong> – Apply mathematical modeling to explore how data governance could improve</li>
      <li><strong>4. Advocate</strong> – Submit a report and poster to the Legislative Council</li>
    </ol>
    <div className="mt-4">
      <Button variant="outline" size="sm" asChild>
        <Link to="/spring-2026/assessments/final-report">
          <FileText className="h-4 w-4 mr-2" />
          View Final Project Details
        </Link>
      </Button>
    </div>
  </div>
);

export default Part1DataGovernance;
