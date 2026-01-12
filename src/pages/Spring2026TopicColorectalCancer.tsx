import { Activity } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 2,
  title: "Colorectal Cancer Screening Programme",
  description: "Government-subsidized screening program for colorectal cancer prevention and early detection.",
  icon: Activity,
  color: "bg-purple-500",
  overview: "This topic examines the Colorectal Cancer Screening Programme, a government-subsidized initiative to encourage early detection of colorectal cancer among Hong Kong residents aged 50-75.",
  keyQuestions: [
    "What is the participation rate in the screening programme?",
    "How effective is the programme in early cancer detection?",
    "What factors influence participation in cancer screening?",
    "How can the programme be improved to increase uptake?",
  ],
  potentialDataSources: [
    "Colorectal Cancer Screening Programme official statistics",
    "Hong Kong Cancer Registry data",
    "Department of Health annual reports",
    "Academic studies on screening effectiveness",
  ],
  relevantSDGs: [
    {
      name: "SDG 3: Good Health and Well-being",
      explanation: "Early cancer detection through screening programs significantly improves survival rates and quality of life. This program aims to reduce premature mortality from colorectal cancer, which is one of the leading causes of cancer deaths in Hong Kong.",
    },
  ],
};

const Spring2026TopicColorectalCancer = () => {
  return <TopicLayout topicSlug="colorectal-cancer-screening" topic={topicData} />;
};

export default Spring2026TopicColorectalCancer;
