import { Syringe } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 1,
  title: "Flu Shot",
  description: "Seasonal influenza vaccination program and public health campaigns in Hong Kong.",
  icon: Syringe,
  color: "bg-blue-500",
  overview: "This topic explores the government's seasonal influenza vaccination program, including public health campaigns, vaccine distribution, and uptake rates among different population groups in Hong Kong.",
  keyQuestions: [
    "What is the current vaccination coverage rate in Hong Kong?",
    "How effective are government campaigns in promoting flu vaccination?",
    "What barriers exist to vaccine uptake among different demographics?",
    "How does Hong Kong's approach compare to other cities?",
  ],
  potentialDataSources: [
    "Centre for Health Protection vaccination statistics",
    "Hospital Authority annual reports",
    "Department of Health press releases",
    "Census and Statistics Department health surveys",
  ],
  relevantSDGs: [
    {
      name: "SDG 3: Good Health and Well-being",
      explanation: "Flu vaccination programs directly contribute to ensuring healthy lives by preventing seasonal influenza outbreaks, reducing hospitalizations, and protecting vulnerable populations including the elderly and those with chronic conditions.",
    },
  ],
};

const Spring2026TopicFluShot = () => {
  return <TopicLayout topicSlug="flu-shot" topic={topicData} />;
};

export default Spring2026TopicFluShot;
