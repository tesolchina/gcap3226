import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Calendar, BookOpen, ClipboardCheck, MessageSquare, AlertTriangle, Flag,
} from "lucide-react";
import type { Fall2026Week } from "@/data/fall2026-weeks";

const Fall2026WeekLayout = ({ week }: { week: Fall2026Week }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Week {week.week}</span>
            <span>•</span>
            <span>{week.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{week.title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground">{week.description}</p>
          <div className="flex flex-wrap gap-2">
            {week.badge && (
              <Badge variant="secondary" className={week.badge.color}>
                {week.badge.text}
              </Badge>
            )}
            {week.milestone && (
              <Badge variant="outline" className="gap-1">
                <Flag className="h-3 w-3" /> {week.milestone}
              </Badge>
            )}
          </div>
        </div>

        {week.warning && (
          <Card className="p-4 border-orange-300 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
            <div className="flex items-start gap-2 text-orange-800 dark:text-orange-200 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{week.warning}</span>
            </div>
          </Card>
        )}

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Before class</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {week.beforeClass.map((x, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span>{x}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">In class</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {week.inClass.map((x, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span>{x}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">After class</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {week.afterClass.map((x, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span>{x}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-3 border-l-4 border-l-primary">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Moodle forum post</h2>
            <Badge variant="outline" className="ml-auto text-xs">Placeholder</Badge>
          </div>
          <p className="text-sm font-medium">{week.moodleForum.title}</p>
          <p className="text-sm text-muted-foreground">{week.moodleForum.prompt}</p>
          <p className="text-xs text-muted-foreground">
            Due: <span className="font-medium">{week.moodleForum.dueBy}</span> • Final Moodle link TBA.
          </p>
        </Card>

        <div className="flex justify-between pt-2">
          <Button variant="outline" asChild>
            <Link to="/fall-2026">
              <ArrowLeft className="mr-2 h-4 w-4" /> Course Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/fall-2026/weeks">All Weeks</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fall2026WeekLayout;
