import WeekLayout from "@/components/WeekLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const presentations = [
  {
    team: "Team 1",
    title: "Attracting Investment to HK",
    canvaUrl: "https://www.canva.com/design/DAHESfWZ-Ns/xBDJC7nJ6ta9GCRCSP8vqA/view",
    embedUrl: "https://www.canva.com/design/DAHESfWZ-Ns/xBDJC7nJ6ta9GCRCSP8vqA/view?embed",
  },
  {
    team: "Team 2",
    title: "AI for Science",
    canvaUrl: "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view",
    embedUrl: "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view?embed",
  },
];

const Spring2026Week11 = () => (
  <WeekLayout
    weekNumber={11}
    title="In-Class Presentation 1"
    description="Deliver 8-minute presentations on project progress and data governance findings."
    objectives={[
      "Present research findings clearly",
      "Receive constructive feedback",
      "Practice presentation skills",
    ]}
    activities={[
      "Team presentations (8 minutes each)",
      "Q&A sessions",
      "Feedback collection",
    ]}
    assessment="In-Class Presentation 1 (10%)"
    assessmentLink="/spring-2026/assessments/presentation-1"
  >
    <div className="space-y-8 mt-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Presentation className="h-6 w-6 text-primary" />
        Team Presentations
      </h2>

      {presentations.map((p) => (
        <Card key={p.team} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {p.team}: {p.title}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href={p.canvaUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in Canva
              </a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={p.embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                allow="fullscreen"
                title={`${p.team} - ${p.title}`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </WeekLayout>
);

export default Spring2026Week11;
