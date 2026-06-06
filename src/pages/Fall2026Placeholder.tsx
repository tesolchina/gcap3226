import { Card } from "@/components/ui/card";

const Fall2026Placeholder = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">Fall 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{title}</h1>
        </header>
        <Card className="p-6 text-muted-foreground">
          Content for this page will be added over the summer. Structure is in place — we'll
          fill it in once Talia and the teaching team confirm the details.
        </Card>
      </div>
    </div>
  );
};

export default Fall2026Placeholder;
