import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Syringe, Activity, Car, Wallet, HeartPulse } from "lucide-react";

const topics = [
  {
    id: 1,
    title: "Flu Shot",
    description: "Seasonal influenza vaccination program and public health campaigns in Hong Kong.",
    icon: Syringe,
    color: "bg-blue-500",
    borderColor: "border-blue-500",
  },
  {
    id: 2,
    title: "Colorectal Cancer Screening Programme",
    description: "Government-subsidized screening program for colorectal cancer prevention and early detection.",
    icon: Activity,
    color: "bg-purple-500",
    borderColor: "border-purple-500",
  },
  {
    id: 3,
    title: "Road Safety",
    description: "Road safety policies, traffic management, and accident prevention initiatives.",
    icon: Car,
    color: "bg-orange-500",
    borderColor: "border-orange-500",
  },
  {
    id: 4,
    title: "eMPF",
    description: "Electronic Mandatory Provident Fund platform for streamlined pension fund management.",
    icon: Wallet,
    color: "bg-green-500",
    borderColor: "border-green-500",
  },
  {
    id: 5,
    title: "Chronic Disease Co-Care (CDCC) Pilot Scheme",
    description: "Primary healthcare pilot scheme for chronic disease management through public-private partnership.",
    icon: HeartPulse,
    color: "bg-red-500",
    borderColor: "border-red-500",
  },
];

const Spring2026TopicSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/spring-2026">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Spring 2026</p>
            <h1 className="text-4xl font-bold text-primary">Topic Selection</h1>
          </div>
        </div>

        <p className="text-lg text-muted-foreground">
          Choose one of the following topics for your group project. Each topic focuses on a public policy area in Hong Kong with opportunities for data governance analysis.
        </p>

        {/* Topic Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={`p-6 border-l-4 ${topic.borderColor} hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className={`p-3 ${topic.color} rounded-full w-fit mb-4`}>
                <topic.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  Topic {topic.id}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="p-6 bg-muted/50 text-center">
          <p className="text-muted-foreground">
            📋 Detailed topic briefs and data sources will be available when groups are formed in Week 3.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Spring2026TopicSelection;
