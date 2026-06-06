import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { FALL_2026_TOPICS } from "@/data/fall2026-topics";

const Fall2026Topics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">Fall 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Project Topics</h1>
          <p className="text-muted-foreground max-w-3xl">
            10 topics for Fall 2026 teams. Topics 1–3 were seeded by Talia (4 Jun 2026); the
            rest are placeholder drafts and will be refined.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FALL_2026_TOPICS.map((t) => (
            <Link key={t.slug} to={`/fall-2026/topics/${t.slug}`}>
              <Card className="p-5 h-full hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded">
                    Topic {t.id}
                  </span>
                  {t.source === "talia" ? (
                    <Badge>From Talia</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground">{t.description}</p>
                <div className="mt-3 text-xs text-primary flex items-center gap-1">
                  Open topic <ChevronRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fall2026Topics;
