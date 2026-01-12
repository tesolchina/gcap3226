import { Wallet } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 4,
  title: "eMPF",
  description: "Electronic Mandatory Provident Fund platform for streamlined pension fund management.",
  icon: Wallet,
  color: "bg-green-500",
  overview: "This topic explores the eMPF Platform, a centralized electronic system designed to streamline the administration of Mandatory Provident Fund schemes in Hong Kong.",
  keyQuestions: [
    "How does the eMPF platform improve MPF administration efficiency?",
    "What are the benefits for employers and employees?",
    "What data governance challenges exist in the platform?",
    "How does digital transformation affect retirement savings management?",
  ],
  potentialDataSources: [
    "Mandatory Provident Fund Schemes Authority reports",
    "eMPF Platform official announcements",
    "Legislative Council papers on MPF reform",
    "Industry reports on pension digitalization",
  ],
  relevantSDGs: [
    {
      name: "SDG 8: Decent Work and Economic Growth",
      explanation: "The eMPF platform promotes economic efficiency and reduces administrative burdens for employers, supporting productive employment. Streamlined pension management helps ensure workers' retirement savings are protected and properly managed.",
    },
    {
      name: "SDG 10: Reduced Inequalities",
      explanation: "By centralizing and simplifying MPF administration, the platform aims to reduce information asymmetry and transaction costs, potentially benefiting lower-income workers who previously faced higher proportional fees.",
    },
  ],
};

const Spring2026TopicEMPF = () => {
  return <TopicLayout topicSlug="empf" topic={topicData} />;
};

export default Spring2026TopicEMPF;
