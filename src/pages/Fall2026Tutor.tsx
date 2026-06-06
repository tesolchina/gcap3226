import { Card } from "@/components/ui/card";
import { Fall2026Chat } from "@/components/Fall2026Chat";

const Fall2026Tutor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">Fall 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Course AI Tutor</h1>
          <p className="text-muted-foreground">
            A course-wide tutor for the Fall 2026 cohort. Inspired by the AI support used in
            GCAP 3056. Use this for general questions about methods, data sources, or
            policy framing. For project-specific questions, use the per-topic tutor.
          </p>
        </header>

        <Card className="p-4 bg-muted/40 text-sm text-muted-foreground">
          Threads here are public to all classmates. Please use a nickname and avoid sharing
          sensitive personal information.
        </Card>

        <Fall2026Chat scope="global" />
      </div>
    </div>
  );
};

export default Fall2026Tutor;
