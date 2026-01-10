import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Lightbulb, Clock, CheckCircle } from "lucide-react";

const Spring2026AssessmentInClass1 = () => {
  const title = "In-class Exercise 1";
  const description = "This exercise focuses on applying initial course concepts and AI tools for data exploration.";
  const backLink = "/spring-2026/assessments";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={backLink}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Assessment</p>
            <h1 className="text-4xl font-bold text-primary">{title}</h1>
          </div>
        </div>

        <Card className="p-6">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              {title} Overview
            </CardTitle>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3 mr-1" /> Week 3
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{description}</p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Submission Due:</strong> End of class, Week 3
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-500" /> Instructions
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Review the provided dataset on Hong Kong public services.</li>
                <li>Use AI tools (e.g., Python with AI assistance via <a href="/spring-2026/weeks/2" className="text-primary hover:underline">Vibe Coding</a>) to perform a basic exploratory data analysis.</li>
                <li>Identify 1-2 key patterns or anomalies in the data related to data governance.</li>
                <li>Prepare a short (100-150 words) summary of your findings and the methods used.</li>
                <li>Submit your analysis (Jupyter Notebook or text summary) via Moodle by the end of the session.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" /> Assessment Criteria
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>**Data Exploration (40%)**: Evidence of using AI tools for effective data exploration.</li>
                <li>**Insight Generation (30%)**: Clarity and relevance of identified patterns/anomalies.</li>
                <li>**Methodology (20%)**: Appropriateness of methods used and described.</li>
                <li>**Clarity & Conciseness (10%)**: Quality of written summary.</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> This is an individual exercise. Late submissions without valid justification will receive 0 marks.
              </p>
            </div>

            <Button asChild variant="outline">
              <Link to={backLink}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assessments
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026AssessmentInClass1;