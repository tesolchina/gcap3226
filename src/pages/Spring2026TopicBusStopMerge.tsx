import { MapPin } from "lucide-react";
import TopicLayout from "@/components/TopicLayout";

const topicData = {
  id: 7,
  title: "Bus Stop Merge",
  description: "Real-Time API Data Analysis and Bus Stop Placement Optimization in Hong Kong.",
  icon: MapPin,
  color: "bg-cyan-500",
  overview: "This topic explores the challenges of bus stop naming and placement in Hong Kong, focusing on cases where multiple bus stops share the same name despite being in different locations. Students will analyze real-time bus API data, investigate the Transport Department's naming conventions, and propose data-driven solutions for improving public transit information accuracy. The project builds on a documented 4-year case study involving citizen engagement with the Transport Department.",
  keyQuestions: [
    "How many bus stops in Hong Kong share identical names but are located in different areas?",
    "What impact does confusing bus stop naming have on public transit users, especially tourists and elderly residents?",
    "How can real-time API data from KMB and Citybus be used to identify and map duplicate bus stop names?",
    "What are the Transport Department's criteria for bus stop naming, and how consistently are they applied?",
    "What solutions could improve bus stop identification and reduce passenger confusion?",
  ],
  potentialDataSources: [
    "KMB Real-Time Bus API (data.gov.hk)",
    "Citybus/NWFB Real-Time Bus API (data.gov.hk)",
    "Transport Department bus stop registry",
    "Google Maps and OpenStreetMap bus stop data",
    "Legislative Council papers on public transport",
    "Correspondence records between citizens and Transport Department",
  ],
  relevantSDGs: [
    {
      name: "SDG 11: Sustainable Cities and Communities",
      explanation: "Accurate public transit information is essential for sustainable urban mobility. Improving bus stop naming and placement helps create more accessible, inclusive, and efficient transportation systems for all city residents.",
    },
    {
      name: "SDG 9: Industry, Innovation and Infrastructure",
      explanation: "Leveraging real-time data APIs and digital tools to improve transit infrastructure represents innovative approaches to enhancing public services and building resilient infrastructure.",
    },
  ],
};

const Spring2026TopicBusStopMerge = () => {
  return <TopicLayout topicSlug="bus-stop-merge" topic={topicData} />;
};

export default Spring2026TopicBusStopMerge;
