import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getFall2026Topic } from "@/data/fall2026-topics";
import { Fall2026Chat } from "@/components/Fall2026Chat";

const Fall2026Topic = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const topic = getFall2026Topic(slug);

  if (!topic) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <p className="text-muted-foreground">Topic not found.</p>
        <Button asChild variant="link"><Link to="/fall-2026/topics">Back to topics</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/fall-2026/topics"><ArrowLeft className="h-4 w-4 mr-1" /> All topics</Link>
        </Button>

        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded">
              Topic {topic.id}
            </span>
            {topic.source === "talia" ? (
              <Badge>From Talia</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{topic.title}</h1>
          <p className="text-muted-foreground">{topic.description}</p>
        </header>

        <Card className="p-5">
          <h2 className="font-semibold mb-2">Project workspace (placeholder)</h2>
          <p className="text-sm text-muted-foreground">
            Team membership, milestones, file sharing and knowledge base for this topic will be
            added once Talia confirms the final 10 topics and team allocations.
          </p>
        </Card>

        <Fall2026Chat
          scope="topic"
          topicSlug={topic.slug}
          title={`${topic.title} — Topic AI Tutor`}
          description="A shared thread for this topic. The tutor has extra context about this project."
        />
      </div>
    </div>
  );
};

export default Fall2026Topic;
