import React, { useState } from "react";
import { ChevronDown, ChevronUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CourseRoadmap = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  const weeks = [
    {
      week: "1",
      title: "Course Introduction",
      description: "Attend introductory lecture on public policy, the Hong Kong context, and SDGs. Install VS Code and apply for GitHub Copilot.",
      assessment: null,
      link: "/spring-2026/weeks/1",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
    },
    {
      week: "2",
      title: "Learning AI Tools",
      description: "Attend lecture on AI-assisted Python programming, focusing on data visualization and customized chatbots on Bytewise.",
      assessment: null,
      link: "/spring-2026/weeks/2",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
    },
    {
      week: "3-4",
      title: "Case Studies & Groups",
      description: "Participate in case study demonstrations. Form project groups and select a topic.",
      assessment: { text: "In-class Exercise 1 & 2 (10%)", color: "text-green-600" },
      link: "/spring-2026/weeks/3",
      borderColor: "border-green-500",
      badgeColor: "bg-green-500",
    },
    {
      week: "5-6",
      title: "Data Requests & Prep",
      description: "Explore public datasets and draft data request emails. Design fieldwork plans.",
      warning: "Week 6 includes a public holiday",
      assessment: { text: "Reflective Essay 1 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/5",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
    },
    {
      week: "7",
      title: "Fieldwork",
      description: "Conduct fieldwork to collect primary data.",
      assessment: { text: "Reflective Essay 2 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/7",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
    },
    {
      week: "8-9",
      title: "Group Consultation",
      description: "Complete data governance checkpoint. Integrate data. Use AI tools for analysis, visualization, and storytelling.",
      assessment: { text: "Reflective Essay 3 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/8",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
    },
    {
      week: "10",
      title: "Draft Report Outline",
      description: "Submit draft outline of group project report, including data analysis and governance critique.",
      assessment: null,
      link: "/spring-2026/weeks/10",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
    },
    {
      week: "11",
      title: "First Presentation",
      description: "Deliver In-Class Presentation 1 (8 minutes) on project progress and data governance findings.",
      assessment: { text: "In-Class Presentation 1 (10%)", color: "text-purple-600" },
      link: "/spring-2026/weeks/11",
      borderColor: "border-purple-500",
      badgeColor: "bg-purple-500",
    },
    {
      week: "12",
      title: "Finalize Deliverables",
      description: "Refine models, visualizations, and advocacy products.",
      assessment: { text: "Human-AI Collaboration Report (20%)", color: "text-orange-600" },
      link: "/spring-2026/weeks/12",
      borderColor: "border-orange-500",
      badgeColor: "bg-orange-500",
    },
  ];

  const objectives = [
    "Equip students with analytical tools and interdisciplinary approaches to assess and influence policy decisions",
    "Integrate quantitative analysis with qualitative insights to address social issues aligned with UN SDGs",
    "Evaluate Hong Kong government's use of data in policymaking, emphasizing transparency, accountability, and effectiveness",
    "Engage students in practical projects and case studies in areas such as public transportation, health, and environmental management",
    "Provide opportunities to request data from the government and interact with lawmakers for experiential learning",
    "Prepare students to become active agents of change, advocating for policy improvements contributing to SDGs"
  ];

  // Row assignments for zigzag layout
  const row1 = weeks.slice(0, 3); // Weeks 1, 2, 3-4
  const row2 = [weeks[5], weeks[4], weeks[3]]; // Weeks 8-9, 7, 5-6 (reversed)
  const row3 = weeks.slice(6, 9); // Weeks 10, 11, 12

  const WeekCard = ({ week, isLast = false }: { week: typeof weeks[0]; isLast?: boolean }) => (
    <div className={`bg-card rounded-xl shadow-md p-5 w-72 border-l-4 ${week.borderColor} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${week.badgeColor} text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm`}>
          {week.week}
        </div>
        <h3 className="font-bold text-foreground">{week.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">📚 {week.description}</p>
      {week.warning && (
        <p className="text-xs text-orange-500 mb-2">⚠️ {week.warning}</p>
      )}
      <p className={`text-sm ${week.assessment ? week.assessment.color : "text-muted-foreground"}`}>
        📝 {week.assessment ? week.assessment.text : "Assessment: None"}
      </p>
      <Link to={week.link} className="text-primary hover:underline text-sm mt-2 inline-block">
        👉 Access Materials
      </Link>
    </div>
  );

  // SVG dotted line with arrow for horizontal connections
  const HorizontalConnector = ({ direction = "right" }: { direction?: "left" | "right" }) => (
    <svg className="w-16 h-8 flex-shrink-0" viewBox="0 0 80 40">
      <defs>
        <marker
          id={`arrow-${direction}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient={direction === "right" ? "0" : "180"}
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      <path
        d="M 5 20 L 70 20"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="6 4"
        markerEnd={`url(#arrow-${direction})`}
      />
    </svg>
  );

  // SVG curved connector between rows
  const RowConnector = ({ direction }: { direction: "down-left" | "down-right" }) => (
    <div className={`flex ${direction === "down-left" ? "justify-end mr-16" : "justify-start ml-16"}`}>
      <svg className="w-48 h-24" viewBox="0 0 200 100">
        <defs>
          <marker
            id={`arrow-curve-${direction}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--primary))" />
          </marker>
        </defs>
        <path
          d={direction === "down-left" 
            ? "M 180 10 Q 180 50, 100 50 Q 20 50, 20 90"
            : "M 20 10 Q 20 50, 100 50 Q 180 50, 180 90"
          }
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="6 4"
          markerEnd={`url(#arrow-curve-${direction})`}
        />
      </svg>
    </div>
  );

  return (
    <div className="w-full">
      {/* Course Objectives Section */}
      <div className="bg-gradient-to-br from-card to-accent/20 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Course Objectives</h3>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              {objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Roadmap Toggle Button */}
      <button
        onClick={() => setShowRoadmap(!showRoadmap)}
        className="w-full flex items-center justify-between p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors mb-6"
      >
        <span className="text-lg font-semibold text-foreground">📅 Course Roadmap</span>
        {showRoadmap ? (
          <ChevronUp className="h-5 w-5 text-primary" />
        ) : (
          <ChevronDown className="h-5 w-5 text-primary" />
        )}
      </button>

      {showRoadmap && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
          {/* Legend */}
          <div className="flex justify-center flex-wrap gap-4 text-xs mb-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-muted-foreground">In-class Exercises</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-muted-foreground">Reflective Essays</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-muted-foreground">Presentations</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
              <span className="text-muted-foreground">Reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span className="text-muted-foreground">Final Deliverables</span>
            </div>
          </div>

          {/* Row 1: Left to Right (Weeks 1, 2, 3-4) */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row1[0]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row1[1]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row1[2]} />
          </div>

          {/* Connector: Row 1 to Row 2 */}
          <RowConnector direction="down-left" />

          {/* Row 2: Right to Left (Weeks 8-9, 7, 5-6) */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row2[0]} />
            <HorizontalConnector direction="left" />
            <WeekCard week={row2[1]} />
            <HorizontalConnector direction="left" />
            <WeekCard week={row2[2]} />
          </div>

          {/* Connector: Row 2 to Row 3 */}
          <RowConnector direction="down-right" />

          {/* Row 3: Left to Right (Weeks 10, 11, 12) */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row3[0]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row3[1]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row3[2]} />
          </div>

          {/* Connector to Final Week */}
          <div className="flex justify-center">
            <svg className="w-8 h-16" viewBox="0 0 40 80">
              <defs>
                <marker
                  id="arrow-down"
                  markerWidth="8"
                  markerHeight="8"
                  refX="4"
                  refY="6"
                  orient="90"
                >
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--primary))" />
                </marker>
              </defs>
              <path
                d="M 20 5 L 20 65"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="6 4"
                markerEnd="url(#arrow-down)"
              />
            </svg>
          </div>

          {/* Final Week 13 */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-xl shadow-lg p-6 w-96 border-l-4 border-yellow-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold ring-2 ring-yellow-300">
                  13
                </div>
                <h3 className="font-bold text-foreground text-lg">🎯 Final Presentation & Report</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                📚 Deliver In-Class Presentation 2 (8 minutes) to peers, instructors, and stakeholders.
              </p>
              <div className="space-y-1 mb-3">
                <p className="text-sm text-purple-600">📝 In-Class Presentation 2 (10%)</p>
                <p className="text-sm text-red-600">📝 Final Project Report & Poster (30%)</p>
              </div>
              <div className="text-center">
                <span className="bg-yellow-500 text-white text-sm px-4 py-1.5 rounded-full font-bold">
                  40% FINAL
                </span>
              </div>
              <Link to="/spring-2026/weeks/13" className="text-primary hover:underline text-sm mt-3 inline-block">
                👉 Access Materials
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRoadmap;
