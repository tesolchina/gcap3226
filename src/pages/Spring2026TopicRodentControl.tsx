import { Bug } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 6,
  title: "Rodent Control",
  description: "Urban pest management and public hygiene initiatives for rodent prevention across Hong Kong districts.",
  icon: Bug,
  color: "bg-yellow-600",
  overview: "This topic explores Hong Kong's rodent control initiatives managed by the Food and Environmental Hygiene Department (FEHD). The government publishes monthly rat-free percentage data for all 18 districts, measuring the effectiveness of pest control efforts. Rodent infestation is a significant public health concern linked to disease transmission, food safety, and urban environmental hygiene.",
  keyQuestions: [
    "How does the rat-free percentage vary across Hong Kong's 18 districts?",
    "What factors contribute to higher rodent infestation rates in certain areas?",
    "How effective are current rodent control measures and public education campaigns?",
    "What is the correlation between urban density, sanitation practices, and rodent prevalence?",
    "How do seasonal patterns affect rodent activity and control effectiveness?",
  ],
  potentialDataSources: [
    "FEHD Rat-Free Percentage Statistics (monthly updates by district)",
    "FEHD Pest Control Advisory Section reports",
    "District Council meeting minutes on environmental hygiene",
    "Legislative Council papers on pest control policy",
    "Hong Kong Observatory weather data (for seasonal analysis)",
    "Census data on population density by district",
  ],
  relevantSDGs: [
    {
      name: "SDG 3: Good Health and Well-being",
      explanation: "Rodent control is essential for preventing zoonotic diseases such as leptospirosis, hantavirus, and plague. Effective pest management protects public health by reducing disease transmission vectors in urban environments.",
    },
    {
      name: "SDG 11: Sustainable Cities and Communities",
      explanation: "Urban pest management is a key component of sustainable city governance. Maintaining clean, rodent-free public spaces contributes to livable communities and reflects effective municipal environmental management.",
    },
  ],
};

const Spring2026TopicRodentControl = () => {
  return <TopicLayout topicSlug="rodent-control" topic={topicData} />;
};

export default Spring2026TopicRodentControl;
