import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

interface AssessmentPageProps {
  title: string;
  description: string;
  backLink: string;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({ title, description, backLink }) => {
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

        <Card className="p-6 text-center">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-8">{description}</p>
          <div className="p-6 bg-muted/50 rounded-lg mb-8">
            <p className="text-muted-foreground">
              📚 Detailed instructions and submission guidelines will be available here soon.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to={backLink}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Week Overview
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentPage;
