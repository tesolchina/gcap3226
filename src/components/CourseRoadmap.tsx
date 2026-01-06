import React, { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Users, Target, Presentation } from "lucide-react";
import { Link } from "react-router-dom";

const CourseRoadmap = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  const toggleRoadmap = () => {
    setShowRoadmap(!showRoadmap);
  };

  useEffect(() => {
    // Add scroll-triggered animations if needed
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(30px)";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="text-center">
        <button
          onClick={toggleRoadmap}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-lg"
        >
          <span id="roadmapToggleText">
            {showRoadmap ? "📅 Hide Course Roadmap" : "📅 Show Course Roadmap"}
          </span>
          <svg
            id="roadmapToggleIcon"
            className={`ml-2 w-5 h-5 transform transition-transform ${
              showRoadmap ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>

      <div id="roadmapContainer" className={showRoadmap ? "" : "hidden"}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📅 Course Roadmap
          </h2>
          <div className="mt-4 flex justify-center flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">
                In-class Exercises
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">
                Reflective Essays
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">
                Presentations
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">Reports</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-300">
                Final Deliverables
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 800"
          >
            <path
              className="zigzag-line"
              d="M 100 100 L 300 100 L 500 200 L 700 200 L 900 300 L 700 400 L 500 400 L 300 500 L 100 500 L 300 600 L 500 600 L 700 700 L 900 700"
            ></path>
          </svg>

          <div className="relative z-10">
            {/* Row 1: Left to Right */}
            <div className="flex justify-between items-start mb-20">
              {/* Week 1 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-primary fade-in cursor-pointer hover:border-primary-light"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Course Introduction
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Attend introductory lecture on public policy, the Hong
                  Kong context, and SDGs. Install VS Code and apply for GitHub
                  Copilot.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  📝 Assessment: None
                </div>
                <a
                  href="https://smartlessons.hkbu.tech/GCAP3226/week1/index.html"
                  target="_blank"
                  className="block mt-2 text-xs text-primary font-medium hover:underline"
                >
                  👉 Access Week 1 Materials
                </a>
              </div>

              {/* Week 2 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-primary fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Learning AI Tools
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Attend lecture on AI-assisted Python programming, focusing
                  on data visualization and customized chatbots on Bytewise.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  📝 Assessment: None
                </div>
              </div>

              {/* Week 3-4 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-green-500 fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs mr-3">
                    3-4
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Case Studies & Groups
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Participate in case study demonstrations. Form project
                  groups and select a topic.
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  📝 In-class Exercise 1 & 2 (10%)
                </div>
              </div>
            </div>

            {/* Row 2: Right to Left */}
            <div className="flex justify-between items-start mb-20 flex-row-reverse">
              {/* Week 5-6 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-blue-500 fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs mr-3">
                    5-6
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Data Requests & Prep
                  </h3>
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                  ⚠️ Week 6 includes a public holiday
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Explore public datasets and draft data request emails. Design
                  fieldwork plans.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  📝 Reflective Essay 1 (part of 20%)
                </div>
              </div>

              {/* Week 7 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-blue-500 fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    7
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Fieldwork
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Conduct fieldwork to collect primary data.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  📝 Reflective Essay 2 (part of 20%)
                </div>
              </div>

              {/* Week 8-9 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-blue-500 fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs mr-3">
                    8-9
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Group Consultation
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Complete data governance checkpoint. Integrate data. Use AI
                  tools for analysis, visualization, and storytelling.
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  📝 Reflective Essay 3 (part of 20%)
                </div>
              </div>
            </div>

            {/* Row 3: Left to Right */}
            <div className="flex justify-between items-start mb-20">
              {/* Week 10 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-primary fade-in"
                style={{ animationDelay: "0.7s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    10
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Draft Report Outline
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Submit draft outline of group project report, including data
                  analysis and governance critique.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  📝 Assessment: None
                </div>
              </div>

              {/* Week 11 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-purple-500 fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    11
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    First Presentation
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Deliver In-Class Presentation 1 (8 minutes) on project
                  progress and data governance findings.
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  📝 In-Class Presentation 1 (10%)
                </div>
              </div>

              {/* Week 12 */}
              <div
                className="week-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-60 border-l-4 border-orange-500 fade-in"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    12
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                    Finalize Deliverables
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Refine models, visualizations, and advocacy products.
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                  📝 Human-AI Collaboration Report (20%)
                </div>
              </div>
            </div>

            {/* Final Week - Center aligned */}
            <div className="flex justify-center">
              {/* Week 13 */}
              <div
                className="week-card bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800 rounded-lg shadow-lg p-4 w-80 border-l-4 border-yellow-500 fade-in"
                style={{ animationDelay: "1.0s" }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm mr-3 ring-2 ring-yellow-300">
                    13
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    🎯 Final Presentation & Report
                  </h3>
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                  📚 Deliver In-Class Presentation 2 (8 minutes) to peers,
                  instructors, and stakeholders.
                </div>
                <div className="text-xs mb-1">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    📝 In-Class Presentation 2 (10%)
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    📝 Final Project Report & Poster (30%)
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span className="assessment-badge bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    40% FINAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRoadmap;

