/**
 * Flu Shot Example Component
 * 
 * Displays the influenza vaccination program case study, featuring
 * Simon's SCMP letter and policy analysis with mermaid diagram.
 * 
 * This example teaches:
 * - How to analyze government health policies
 * - Using data to support policy recommendations
 * - International comparisons (Ontario, Canada)
 * 
 * @component
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLinkIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import MermaidDiagram from "@/components/MermaidDiagram";

/**
 * FluShotExample renders the complete flu vaccination policy case study
 */
const FluShotExample = () => {
  const [showFluLetterContent, setShowFluLetterContent] = useState(false);
  const [showFluDiagram, setShowFluDiagram] = useState(false);

  return (
    <>
      {/* Policy Issue Introduction */}
      <PolicyIssueCard />

      {/* Letter Toggle - SCMP Article */}
      <Collapsible open={showFluLetterContent} onOpenChange={setShowFluLetterContent}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-muted/50">
            <span className="flex items-center gap-2">
              📰 Read the SCMP Letter to the Editor (Nov 2017)
            </span>
            {showFluLetterContent ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <SCMPLetterContent />
        </CollapsibleContent>
      </Collapsible>

      {/* Mermaid Diagram Toggle - Argument Structure */}
      <Collapsible open={showFluDiagram} onOpenChange={setShowFluDiagram}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
          >
            <span className="flex items-center gap-2">
              📊 View Argument Structure Diagram
            </span>
            {showFluDiagram ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <ArgumentDiagram />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

/**
 * PolicyIssueCard introduces the flu vaccination policy issue
 */
const PolicyIssueCard = () => (
  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The Policy Issue</h4>
    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
      The Hong Kong government runs influenza vaccination programs for the elderly 
      and school children, but participation rates remain low. This raises important questions:
    </p>
    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <li>• What data does the government collect on vaccination coverage?</li>
      <li>• How do they decide where to allocate resources?</li>
      <li>• Could better data governance improve participation rates?</li>
    </ul>
  </div>
);

/**
 * SCMPLetterContent displays the full SCMP letter with source link
 */
const SCMPLetterContent = () => (
  <div className="p-4 bg-muted/30 rounded-lg border">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h4 className="font-semibold">
          Hong Kong's seasonal flu vaccine programmes need better marketing
        </h4>
        <p className="text-xs text-muted-foreground">
          South China Morning Post – Letters | 9 November 2017
        </p>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <a 
          href="https://www.scmp.com/comment/letters/article/2119177/hong-kongs-seasonal-flu-vaccine-programmes-need-better-marketing" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      </Button>
    </div>
    
    <div className="prose prose-sm dark:prose-invert max-w-none text-sm space-y-3">
      <p>
        During the 2016/17 flu season, more than 700,000 individuals in Hong Kong 
        have received free or subsidised vaccinations for seasonal influenza.
      </p>
      <p>
        The number of vaccines administered under the government vaccination programme 
        and vaccination subsidy scheme have increased by 4.7 per cent and 46.4 per cent 
        compared to 2015/16. Nevertheless, the number of seasonal influenza virus 
        infections by October 21 had reached 26,605, already exceeding the total 
        number of 21,218 cases in 2016.
      </p>
      <p>
        <strong>
          To better protect the city against seasonal flu, the government should 
          promote the vaccination programmes more aggressively, and further reduce 
          the vaccination cost through the centralised ordering of vaccines.
        </strong>
      </p>
      <p>
        In response to my inquiry, the Department of Health said 1.5 million Hong Kong 
        residents were eligible for free vaccination under the vaccination programme 
        and 1.9 million for subsidised vaccination under the subsidy scheme.
      </p>
      <p>
        Considering the low participation rate of the GVP and VSS combined (about 29 
        per cent), the department should devote more resources to marketing its 
        vaccination programmes.
      </p>
      <p>
        Mobile vaccination vehicles should be used to make the vaccines more accessible 
        around the city. Vaccination teams should be sent to kindergartens, primary 
        and secondary schools to inoculate children.
      </p>
      <p>
        In 2000, a universal influenza immunisation programme was introduced in Ontario, 
        Canada, to provide free shots to everyone older than six months. Research 
        suggested that this programme was economically attractive, as it halved 
        influenza-related health care costs and brought more years of health to the citizens.
      </p>
      <p className="text-muted-foreground italic">— Simon Wang, Kowloon Tong</p>
    </div>
  </div>
);

/**
 * ArgumentDiagram renders the mermaid flowchart showing argument structure
 */
const ArgumentDiagram = () => (
  <div className="p-4 bg-white dark:bg-muted/20 rounded-lg border overflow-x-auto">
    <h4 className="font-semibold mb-3 text-center">Letter Argument Flow</h4>
    <MermaidDiagram 
      chart={`graph TD
    subgraph Problem["🔴 Problem Statement"]
        A["700K+ vaccinations in 2016/17<br/>but infections reached 26,605"]
        B["Only 29% participation rate<br/>among 2.4M eligible"]
    end
    
    subgraph Data["📊 Key Data Points"]
        C["1.5M eligible for free GVP"]
        D["1.9M eligible for subsidised VSS"]
        E["430K doses purchased<br/>only 10K discarded"]
    end
    
    subgraph Solutions["💡 Proposed Solutions"]
        F["Better Marketing<br/>Mobile vaccination vehicles"]
        G["Centralised Ordering<br/>Reduce vaccine costs"]
        H["School Programs<br/>Vaccination teams to schools"]
    end
    
    subgraph Evidence["🌍 International Evidence"]
        I["Ontario, Canada (2000)<br/>Universal immunisation"]
        J["Halved healthcare costs<br/>More healthy years"]
    end
    
    subgraph Conclusion["✅ Policy Recommendation"]
        K["Consider universal<br/>vaccination programme"]
    end
    
    A --> B
    C --> B
    D --> B
    B --> F
    B --> G
    B --> H
    E --> G
    I --> J
    J --> K
    F --> K
    G --> K
    H --> K
    
    style Problem fill:#fee2e2,stroke:#dc2626
    style Data fill:#dbeafe,stroke:#2563eb
    style Solutions fill:#fef3c7,stroke:#d97706
    style Evidence fill:#d1fae5,stroke:#059669
    style Conclusion fill:#c7d2fe,stroke:#4f46e5`}
    />
  </div>
);

export default FluShotExample;
