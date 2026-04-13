import WeekLayout from "@/components/WeekLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const presentations = [
  {
    team: "Team 1",
    title: "Attracting Investment to HK",
    canvaUrl: "https://www.canva.com/design/DAHESfWZ-Ns/xBDJC7nJ6ta9GCRCSP8vqA/view",
    embedUrl: "https://www.canva.com/design/DAHESfWZ-Ns/xBDJC7nJ6ta9GCRCSP8vqA/view?embed",
    pageUrl: "/spring-2026/weeks/13/team-1",
  },
  {
    team: "Team 2",
    title: "AI for Science",
    canvaUrl: "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view",
    embedUrl: "https://www.canva.com/design/DAHE2KyZd6s/q2HOrCv-3gDE4TrjpIvFvw/view?embed",
    pageUrl: "/spring-2026/weeks/13/team-2",
  },
];

const PresentationCards = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold flex items-center gap-2">
      <Presentation className="h-6 w-6 text-primary" />
      Final Presentations
    </h2>

    {presentations.map((p) => (
      <Card key={p.team}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {p.team}: {p.title}
          </CardTitle>
          <Button variant="default" size="sm" asChild>
            <Link to={p.pageUrl}>
              <Presentation className="h-4 w-4 mr-1" />
              View Presentation
            </Link>
          </Button>
        </CardHeader>
      </Card>
    ))}
  </div>
);

const Spring2026Week13 = () => (
  <WeekLayout
    weekNumber={13}
    title="Final Presentation & Report"
    description="Deliver final presentations to peers and stakeholders, along with comprehensive group report."
    objectives={[
      "Present final research findings",
      "Submit comprehensive group report",
      "Demonstrate policy recommendations",
    ]}
    activities={[
      "Final team presentations",
      "Stakeholder Q&A",
      "Course wrap-up",
    ]}
    assessment="Final Presentation (10%) + Group Report (30%)"
    assessmentLink="/spring-2026/weeks/13/final-presentation-report"
    customContent={<PresentationCards />}
  />
);

export default Spring2026Week13;
