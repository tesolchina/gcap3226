import { Card } from "@/components/ui/card";
import { FileText, Clock, ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Spring2026LegCoSubmission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/spring-2026" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Spring 2026
          </Link>
        </Button>

        <Card className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Building2 className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Submitting Reports to the Legislative Council
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-amber-600 mb-6">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Coming Soon</span>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            One of our course goals is to make a real difference. This page will guide you through 
            the process of submitting your project findings and recommendations to the Legislative 
            Council of Hong Kong, turning your research into actionable policy advocacy.
          </p>

          <div className="bg-muted/50 rounded-lg p-6 text-left max-w-xl mx-auto">
            <h3 className="font-semibold mb-3">What you'll learn:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                How the Legislative Council handles public submissions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Formatting your research for policy impact
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Writing executive summaries for lawmakers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Presenting data visualizations for non-technical audiences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Tracking the impact of your submission
              </li>
            </ul>
          </div>

          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Fall 2025 Update:</strong> We are currently preparing submissions based on 
              last semester's student projects. Stay tuned for updates!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026LegCoSubmission;
