import { Syringe, Activity, Car, Wallet, HeartPulse, Bug } from "lucide-react";

export const topicData: Record<string, {
  id: number;
  title: string;
  description: string;
  icon: typeof Syringe;
  color: string;
  overview: string;
  keyQuestions: string[];
  potentialDataSources: string[];
  relevantSDGs: { name: string; explanation: string }[];
}> = {
  "flu-shot": {
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
  },
  "colorectal-cancer-screening": {
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
  },
  "road-safety": {
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
  },
  "empf": {
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
  },
  "cdcc": {
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
  },
  "rodent-control": {
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
  },
};
