import { Link } from "react-router-dom";
import { FALL_2026_WEEKS } from "@/data/fall2026-weeks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Fall2026CourseRoadmap = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl sm:text-2xl font-bold">Course Roadmap</h2>
        <span className="text-xs text-muted-foreground">
          Same shape as Spring 2026 — dates TBA
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FALL_2026_WEEKS.map((w) => (
          <Link key={w.week} to={`/fall-2026/weeks/${w.routeWeek}`}>
            <Card
              className={`p-4 h-full hover:shadow-md transition-all border-l-4 ${w.borderColor}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`${w.badgeColor} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shrink-0`}
                >
                  {w.week}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{w.title}</div>
                  <div className="text-xs text-muted-foreground">{w.date}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3">
                {w.description}
              </p>
              {w.badge && (
                <Badge variant="secondary" className={`mt-2 text-[10px] ${w.badge.color}`}>
                  {w.badge.text}
                </Badge>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Fall2026CourseRoadmap;
