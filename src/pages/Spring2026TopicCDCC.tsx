import { HeartPulse } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 5,
  title: "Chronic Disease Co-Care (CDCC) Pilot Scheme",
  description: "Primary healthcare pilot scheme for chronic disease management through public-private partnership.",
  icon: HeartPulse,
  color: "bg-red-500",
  overview: "This topic examines the Chronic Disease Co-Care Pilot Scheme, a government initiative that provides subsidized primary healthcare services for chronic disease management through public-private partnerships.",
  keyQuestions: [
    "How effective is the CDCC scheme in managing chronic diseases?",
    "What is the uptake rate and participant satisfaction?",
    "How does the public-private partnership model work?",
    "What are the implications for Hong Kong's primary healthcare reform?",
  ],
  potentialDataSources: [
    "Primary Healthcare Office publications",
    "Food and Health Bureau policy documents",
    "Hospital Authority chronic disease statistics",
    "Academic research on primary healthcare",
  ],
  relevantSDGs: [
    {
      name: "SDG 3: Good Health and Well-being",
      explanation: "The CDCC scheme addresses Target 3.4 by strengthening the prevention and treatment of non-communicable diseases like diabetes and hypertension. Effective chronic disease management improves quality of life and reduces premature mortality.",
    },
  ],
};

const Spring2026TopicCDCC = () => {
  return <TopicLayout topicSlug="cdcc" topic={topicData} />;
};

export default Spring2026TopicCDCC;
