import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PresentationTimer } from "@/components/PresentationTimer";
import { FullscreenPresentation } from "@/components/FullscreenPresentation";
import { Presentation, ExternalLink, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CountdownTimer } from "@/components/CountdownTimer";

const CANVA_URL = "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view";
const EMBED_URL = "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view?embed";

const Spring2026Team2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026/weeks/13">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Team 2 • Final Presentation</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">AI for Science</h1>
          </div>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Presentation Schedule */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Presentation Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background/80 p-4 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">📅 Week 13 - Final Presentation</p>
              <p className="text-lg font-semibold text-primary">12 minutes per team</p>
              <p className="text-xs text-muted-foreground mt-2">
                ⏰ Please arrive 5 minutes early to set up
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Presentation Timer */}
        <PresentationTimer />

        {/* Presentation Slides */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-primary" />
              Presentation Slides
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href={CANVA_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in Canva
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <FullscreenPresentation embedUrl={EMBED_URL} title="Team 2 - AI for Science" />
          </CardContent>
        </Card>

        {/* Back */}
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link to="/spring-2026/weeks/13">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Week 13
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026Team2;
