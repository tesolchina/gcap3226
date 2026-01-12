import { Car } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 3,
  title: "Road Safety",
  description: "Road safety policies, traffic management, and accident prevention initiatives.",
  icon: Car,
  color: "bg-orange-500",
  overview: "This topic focuses on road safety policies in Hong Kong, including traffic accident statistics, pedestrian safety measures, and initiatives to reduce road fatalities and injuries.",
  keyQuestions: [
    "What are the trends in road traffic accidents in Hong Kong?",
    "Which road user groups are most vulnerable?",
    "How effective are current road safety campaigns?",
    "What policy interventions have been most successful?",
  ],
  potentialDataSources: [
    "Transport Department road traffic accident statistics",
    "Hong Kong Police Force accident reports",
    "Road Safety Council publications",
    "Legislative Council papers on transport policy",
  ],
  relevantSDGs: [
    {
      name: "SDG 3: Good Health and Well-being",
      explanation: "Target 3.6 specifically aims to halve global deaths and injuries from road traffic accidents by 2030. Road safety initiatives directly contribute to preventing premature deaths and reducing disability from traffic injuries.",
    },
    {
      name: "SDG 11: Sustainable Cities and Communities",
      explanation: "Safe and accessible transport systems are essential for sustainable urban development. Road safety improvements support the goal of making cities inclusive, safe, resilient, and sustainable for all residents.",
    },
  ],
};

const Spring2026TopicRoadSafety = () => {
  return <TopicLayout topicSlug="road-safety" topic={topicData} />;
};

export default Spring2026TopicRoadSafety;
