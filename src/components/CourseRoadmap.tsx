import React, { useState } from "react";
import { ChevronDown, ChevronUp, Target, Lightbulb, Users, BarChart3, Briefcase, MessageSquare, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const CourseRoadmap = () => {
  const [selectedObjective, setSelectedObjective] = useState<number | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const weeks = [
    {
      week: "1",
      date: "14 Jan",
      title: "Course Introduction",
      description: "Attend introductory lecture on public policy, the Hong Kong context, and SDGs. Install VS Code and apply for GitHub Copilot.",
      assessment: null,
      link: "/spring-2026/weeks/1",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
    },
    {
      week: "2",
      date: "21 Jan",
      title: "Learning AI Tools",
      description: "Attend lecture on AI-assisted Python programming, focusing on data visualization and customized chatbots on Bytewise.",
      assessment: null,
      link: "/spring-2026/weeks/2",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
    },
    {
      week: "3-4",
      date: "28 Jan – 4 Feb",
      title: "Group Formation & Case Studies",
      description: "Form project groups and confirm membership. Participate in case study demonstrations and select a topic.",
      assessment: { text: "In-class Exercise 1 & 2 (10%)", color: "text-green-600" },
      link: "/spring-2026/weeks/3",
      borderColor: "border-green-500",
      badgeColor: "bg-green-500",
      milestone: "✓ Confirm group membership by Week 3",
    },
    {
      week: "5",
      date: "11 Feb",
      title: "Empirical Data Collection Plan",
      description: "Submit plan to collect empirical data. Connect government data requests to data governance evaluation using skills from Weeks 3-4.",
      assessment: { text: "Reflective Essay 1 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/5",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
      milestone: "✓ Data collection plan submitted",
    },
    {
      week: "6",
      date: "25 Feb",
      title: "Field Work",
      description: "Conduct fieldwork to collect primary empirical data. Apply data collection plan in real-world settings.",
      warning: "18 Feb is a public holiday",
      link: "/spring-2026/weeks/6",
      borderColor: "border-green-500",
      badgeColor: "bg-green-500",
      milestone: "✓ Fieldwork conducted",
    },
    {
      week: "7",
      date: "4 Mar",
      title: "Data Review & Consultation",
      description: "Debrief fieldwork experiences. Review collected data and government responses.",
      assessment: { text: "Reflective Essay 2 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/7",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
      milestone: "✓ Fieldwork debrief complete",
    },
    {
      week: "8",
      date: "11 Mar",
      title: "Data Collection Complete",
      description: "MILESTONE: Complete all empirical data collection. Integrate data and begin analysis with AI tools.",
      link: "/spring-2026/weeks/8",
      borderColor: "border-green-500",
      badgeColor: "bg-green-500",
      milestone: "✓ Empirical data collection complete",
    },
    {
      week: "9",
      date: "18 Mar",
      title: "Analysis & Consultation",
      description: "Third consultation meeting. Use AI tools for analysis, visualization, and storytelling. Prepare draft report outline.",
      assessment: { text: "Reflective Essay 3 (part of 20%)", color: "text-blue-600" },
      link: "/spring-2026/weeks/9",
      borderColor: "border-blue-500",
      badgeColor: "bg-blue-500",
      milestone: "✓ Draft report outline submitted",
    },
    {
      week: "10",
      date: "25 Mar",
      title: "Final Draft Ready",
      description: "Complete final draft of group report. Prepare for presentation with feedback from teachers.",
      assessment: null,
      link: "/spring-2026/weeks/10",
      borderColor: "border-primary",
      badgeColor: "bg-primary",
      milestone: "✓ Report ready for presentation prep",
    },
    {
      week: "11",
      date: "1 Apr",
      title: "First Presentation",
      description: "Deliver In-Class Presentation 1 (8 minutes) on project progress and data governance findings.",
      assessment: { text: "In-Class Presentation 1 (10%)", color: "text-purple-600" },
      link: "/spring-2026/weeks/11",
      borderColor: "border-purple-500",
      badgeColor: "bg-purple-500",
    },
    {
      week: "12",
      date: "15 Apr",
      title: "Finalize Deliverables",
      description: "Refine models, visualizations, and advocacy products based on feedback.",
      warning: "8 Apr is a public holiday",
      assessment: { text: "Human-AI Collaboration Report (20%)", color: "text-orange-600" },
      link: "/spring-2026/weeks/12",
      borderColor: "border-orange-500",
      badgeColor: "bg-orange-500",
    },
  ];

  const objectives = [
    {
      icon: Lightbulb,
      short: "Analytical Tools",
      full: "Equip students with analytical tools and interdisciplinary approaches to assess and influence policy decisions",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: BarChart3,
      short: "Data & SDGs",
      full: "Integrate quantitative analysis with qualitative insights to address social issues aligned with UN SDGs",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      short: "Government Transparency",
      full: "Evaluate Hong Kong government's use of data in policymaking, emphasizing transparency, accountability, and effectiveness",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Briefcase,
      short: "Practical Projects",
      full: "Engage students in practical projects and case studies in areas such as public transportation, health, and environmental management",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      short: "Experiential Learning",
      full: "Provide opportunities to request data from the government and interact with lawmakers for experiential learning",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: Rocket,
      short: "Agents of Change",
      full: "Prepare students to become active agents of change, advocating for policy improvements contributing to SDGs",
      color: "from-rose-500 to-red-500"
    }
  ];

  // Row assignments for zigzag layout (11 weeks total: indexes 0-10)
  // Week indexes: 0=W1, 1=W2, 2=W3-4, 3=W5, 4=W6, 5=W7, 6=W8, 7=W9, 8=W10, 9=W11, 10=W12
  const row1 = weeks.slice(0, 3); // Weeks 1, 2, 3-4
  const row2 = [weeks[5], weeks[4], weeks[3]]; // Weeks 7, 6, 5 (reversed)
  const row3 = [weeks[6], weeks[7], weeks[8]]; // Weeks 8, 9, 10
  const row4 = [weeks[9]]; // Week 11

  const WeekCard = ({ week, isLast = false }: { week: typeof weeks[0]; isLast?: boolean }) => (
    <div className={`bg-card rounded-xl shadow-md p-5 w-72 border-l-4 ${week.borderColor} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`${week.badgeColor} text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm`}>
          {week.week}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{week.title}</h3>
          <p className="text-xs text-muted-foreground">📅 {week.date}</p>
        </div>
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
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Course Objectives</h3>
          <span className="text-xs text-muted-foreground">(click to see details)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {objectives.map((obj, idx) => (
            <button 
              key={idx}
              onClick={() => setSelectedObjective(selectedObjective === idx ? null : idx)}
              className={`group relative p-4 rounded-xl bg-gradient-to-br ${obj.color} text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${selectedObjective === idx ? 'ring-4 ring-offset-2 ring-primary scale-105' : ''}`}
            >
              <obj.icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
              <p className="text-sm font-medium text-center leading-tight">{obj.short}</p>
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
        
        {/* Expanded objective text */}
        {selectedObjective !== null && (
          <div className={`mt-4 p-4 rounded-xl bg-gradient-to-r ${objectives[selectedObjective].color} text-white animate-in fade-in slide-in-from-top-2 duration-200`}>
            <div className="flex items-start gap-3">
              {React.createElement(objectives[selectedObjective].icon, { className: "h-6 w-6 shrink-0 mt-0.5" })}
              <div>
                <p className="font-semibold mb-1">{objectives[selectedObjective].short}</p>
                <p className="text-white/90 leading-relaxed">{objectives[selectedObjective].full}</p>
              </div>
            </div>
          </div>
        )}
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

          {/* Row 2: Right to Left (Weeks 7, 6, 5) */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row2[0]} />
            <HorizontalConnector direction="left" />
            <WeekCard week={row2[1]} />
            <HorizontalConnector direction="left" />
            <WeekCard week={row2[2]} />
          </div>

          {/* Connector: Row 2 to Row 3 */}
          <RowConnector direction="down-right" />

          {/* Row 3: Left to Right (Weeks 8, 9, 10) */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row3[0]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row3[1]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={row3[2]} />
          </div>

          {/* Connector: Row 3 to Row 4 */}
          <RowConnector direction="down-left" />

          {/* Row 4: Week 11 */}
          <div className="flex items-center justify-center gap-0">
            <WeekCard week={row4[0]} />
            <HorizontalConnector direction="right" />
            <WeekCard week={weeks[10]} />
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
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold ring-2 ring-yellow-300">
                  13
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">🎯 Final Presentation & Report</h3>
                  <p className="text-xs text-muted-foreground">📅 22 Apr</p>
                </div>
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
