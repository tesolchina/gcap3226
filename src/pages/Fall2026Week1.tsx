import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Sparkles } from "lucide-react";

const Fall2026Week1 = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-4">
          <Link to="/fall-2026">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Fall 2026
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Week 1: Introduction to Participatory Policy Analysis
          </h1>
        </div>
        <Button asChild>
          <Link to="/fall-2026/tutor?context=week1">
            <Sparkles className="mr-2 h-4 w-4" />
            Open AI Tutor for Week 1
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-base md:text-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Understand citizen advocacy through the St Martin Bus Stop case.</li>
            <li>Explore data governance, open data, and Transport Department resources.</li>
            <li>Connect mathematics (junction geometry, statistics) to policy problems.</li>
            <li>Reflect on the role of AI tools in participatory policy analysis.</li>
            <li>Prepare for group project workflows and the semester roadmap.</li>
          </ul>
        </CardContent>
      </Card>

      <Accordion
        type="multiple"
        defaultValue={["case-study", "activities", "reflections"]}
        className="w-full"
      >
        <AccordionItem value="case-study">
          <AccordionTrigger>📍 Case Study: St Martin Bus Stop Advocacy Journey</AccordionTrigger>
          <AccordionContent className="prose dark:prose-invert max-w-none">
            <p>
              <strong>Background:</strong> The St Martin bus stop in Hong Kong had duplicate naming
              in mobile apps (both north and south stops appeared as "St Martin"), leading to
              passenger confusion and potential safety issues.
            </p>
            <p>
              <strong>Problem:</strong> Inconsistent naming standards in public transport data — a
              classic data governance issue (violations of Uniqueness, Usability, Consistency).
            </p>
            <p>
              <strong>Citizen Advocacy Journey:</strong> Dr. Simon Wang identified the problem
              through personal experience, contacted the Transport Department, escalated
              strategically with a clear business case to the Assistant Director, and successfully
              pushed for unique identifiers (PA125 / PA206) to be added.
            </p>
            <p>
              <strong>Outcome:</strong> Improved passenger experience and a real-world
              demonstration of how individual citizens can drive systematic policy change using
              data.
            </p>
            <p>
              <strong>Connection to Course:</strong> A perfect introduction to participatory policy
              analysis, data governance, and the power of citizen action in Hong Kong public
              policy.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="activities">
          <AccordionTrigger>Activities &amp; Tasks</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Review the full course syllabus and semester roadmap.</li>
              <li>Explore sample blackspot maps and bus-stop data from Transport Department open data.</li>
              <li>Group discussion: What makes citizen-led policy change successful?</li>
              <li>Initial team formation and project scoping for the semester.</li>
              <li>Optional: Research similar data-quality issues in other Hong Kong public services.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reflections">
          <AccordionTrigger>Reflections &amp; Math Connections</AccordionTrigger>
          <AccordionContent>
            <p className="font-medium">Key Reflection Questions:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>How did data governance failures create real-world problems for citizens?</li>
              <li>What strategies made the advocacy successful?</li>
              <li>
                How can mathematics (statistics, optimization, duplicate detection) help solve
                similar policy problems?
              </li>
              <li>How does this connect to UN SDG 11 (Sustainable Cities and Communities)?</li>
            </ul>
            <p className="mt-3">
              <strong>Math Opportunities:</strong> statistical analysis of error rates, machine
              learning for duplicate detection, optimization of naming conventions, and API
              programming to find duplicate bus-stop names programmatically.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <a
            href="https://drive.google.com/drive/folders/1QT-3Wr5pi0YZDj8rWjOytB7Ka9TBQ7Kq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            📁 Week 1 Materials (Google Drive)
          </a>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/fall-2026/weeks">View All Weeks</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/fall-2026">Course Roadmap</Link>
        </Button>
      </div>
    </div>
  );
};

export default Fall2026Week1;
