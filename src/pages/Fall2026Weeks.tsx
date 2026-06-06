import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FALL_2026_WEEKS } from "@/data/fall2026-weeks";

const Fall2026Weeks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">Fall 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Weekly Schedule</h1>
          <p className="text-muted-foreground">
            13 weeks, mirroring the Spring 2026 rhythm. Dates are TBA — each page
            already spells out what to do before class, in class, after class, and on the
            Moodle forum.
          </p>
        </header>
        <div className="grid gap-3">
          {FALL_2026_WEEKS.map((w) => (
            <Link key={w.week} to={`/fall-2026/weeks/${w.routeWeek}`}>
              <Card className={`p-4 hover:shadow-md transition-all border-l-4 ${w.borderColor}`}>
                <div className="flex items-start gap-4">
                  <div className={`${w.badgeColor} text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shrink-0`}>
                    {w.week}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <div className="font-semibold">{w.title}</div>
                      <span className="text-xs text-muted-foreground">{w.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{w.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {w.badge && (
                        <Badge variant="secondary" className={`text-[10px] ${w.badge.color}`}>
                          {w.badge.text}
                        </Badge>
                      )}
                      {w.milestone && (
                        <Badge variant="outline" className="text-[10px]">{w.milestone}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fall2026Weeks;
