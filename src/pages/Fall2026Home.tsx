import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Users, ClipboardList, Calendar } from "lucide-react";
import { FALL_2026_TOPICS } from "@/data/fall2026-topics";
import { Fall2026Chat } from "@/components/Fall2026Chat";
import Fall2026CourseRoadmap from "@/components/Fall2026CourseRoadmap";

const Fall2026Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-3">
          <Badge variant="secondary">Upcoming Semester</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            GCAP 3226 — Fall 2026
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
            Participatory Policy Analysis for Hong Kong. We're preparing well in advance —
            structure is in place; content is being filled in over the summer.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/fall-2026/tutor">
            <Card className="p-4 h-full hover:shadow-md transition-all border-l-4 border-l-primary">
              <Sparkles className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold text-sm">AI Tutor</div>
              <div className="text-xs text-muted-foreground">Course-wide help</div>
            </Card>
          </Link>
          <Link to="/fall-2026/topics">
            <Card className="p-4 h-full hover:shadow-md transition-all">
              <Users className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold text-sm">10 Project Topics</div>
              <div className="text-xs text-muted-foreground">Pick your team</div>
            </Card>
          </Link>
          <Link to="/fall-2026/syllabus">
            <Card className="p-4 h-full hover:shadow-md transition-all">
              <ClipboardList className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold text-sm">Syllabus</div>
              <div className="text-xs text-muted-foreground">Coming soon</div>
            </Card>
          </Link>
          <Link to="/fall-2026/weeks">
            <Card className="p-4 h-full hover:shadow-md transition-all">
              <Calendar className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold text-sm">Weekly Schedule</div>
              <div className="text-xs text-muted-foreground">13 weeks</div>
            </Card>
          </Link>
        </div>

        <Fall2026CourseRoadmap />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Project Topics</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/fall-2026/topics">
                See all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FALL_2026_TOPICS.map((t) => (
              <Link key={t.slug} to={`/fall-2026/topics/${t.slug}`}>
                <Card className="p-4 h-full hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Topic {t.id}
                    </span>
                    {t.source === "talia" ? (
                      <Badge variant="default" className="text-[10px]">Talia</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px]">Draft</Badge>
                    )}
                  </div>
                  <div className="font-semibold text-sm mb-1">{t.title}</div>
                  <p className="text-xs text-muted-foreground line-clamp-3">{t.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <Fall2026Chat
            scope="global"
            title="Course AI Tutor"
            description="A shared tutor for the whole Fall 2026 cohort. Inspired by GCAP 3056's AI support — public thread, Socratic style."
          />
        </section>
      </div>
    </div>
  );
};

export default Fall2026Home;
