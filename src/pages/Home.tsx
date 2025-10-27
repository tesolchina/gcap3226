import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);

  const weekData = [
    { week: "1", title: "Course Introduction", desc: "Attend introductory lecture on public policy, the Hong Kong context, and SDGs", assessment: "None", color: "primary" },
    { week: "2", title: "Learning AI Tools", desc: "Attend lecture on AI-assisted Python programming, focusing on data visualization", assessment: "None", color: "primary" },
    { week: "3-4", title: "Case Studies & Groups", desc: "Participate in case study demonstrations. Form project groups", assessment: "In-class Exercise 1 & 2 (10%)", color: "green" },
    { week: "5-6", title: "Data Requests & Prep", desc: "Explore public datasets and draft data request emails", assessment: "Reflective Essay 1", color: "blue" },
    { week: "7", title: "Fieldwork", desc: "Conduct fieldwork to collect primary data", assessment: "Reflective Essay 2", color: "blue" },
    { week: "8-9", title: "Group Consultation", desc: "Complete data governance checkpoint. Use AI tools for analysis", assessment: "Reflective Essay 3", color: "blue" },
    { week: "10", title: "Draft Report Outline", desc: "Submit draft outline of group project report", assessment: "None", color: "primary" },
    { week: "11", title: "First Presentation", desc: "Deliver In-Class Presentation 1 (8 minutes)", assessment: "In-Class Presentation 1 (10%)", color: "purple" },
    { week: "12", title: "Finalize Deliverables", desc: "Refine models, visualizations, and advocacy products", assessment: "Human-AI Collaboration Report (20%)", color: "orange" },
    { week: "13", title: "Final Presentation & Report", desc: "Deliver In-Class Presentation 2 to peers and stakeholders", assessment: "Presentation 2 (10%) + Group Report (30%)", color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary">
            GCAP 3056 Course Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong
          </p>
        </div>

        {/* Course Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-card to-accent/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Course Focus</h3>
            </div>
            <p className="text-muted-foreground">
              Learn to analyze public policy using data-driven approaches and mathematical models.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-card to-accent/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">6 Project Teams</h3>
            </div>
            <p className="text-muted-foreground">
              Collaborative research on real Hong Kong policy challenges across various domains.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-card to-accent/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Research Goals</h3>
            </div>
            <p className="text-muted-foreground">
              Develop evidence-based recommendations for Hong Kong's policy challenges.
            </p>
          </Card>
        </div>

        {/* Timeline Toggle */}
        <div className="text-center">
          <Button
            onClick={() => setShowRoadmap(!showRoadmap)}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            {showRoadmap ? <ChevronUp className="mr-2 h-5 w-5" /> : <ChevronDown className="mr-2 h-5 w-5" />}
            {showRoadmap ? "Hide" : "Show"} Course Timeline
          </Button>
        </div>

        {/* Course Timeline */}
        {showRoadmap && (
          <Card className="p-8 bg-gradient-to-br from-card to-accent/10">
            <h2 className="text-3xl font-bold text-center mb-8">📅 Learning Pathway</h2>
            
            {/* Legend */}
            <div className="flex justify-center flex-wrap gap-4 text-xs mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>In-class Exercises</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span>Reflective Essays</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span>Presentations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                <span>Reports</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span>Final Deliverables</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {weekData.map((week, idx) => (
                <div
                  key={idx}
                  className={`relative pl-8 pb-6 border-l-4 border-${week.color}-500 hover:bg-accent/20 transition-all rounded-r-lg p-4`}
                  style={{
                    borderLeftColor: week.color === 'primary' ? 'hsl(var(--primary))' : 
                                   week.color === 'green' ? '#22c55e' :
                                   week.color === 'blue' ? '#3b82f6' :
                                   week.color === 'purple' ? '#a855f7' :
                                   week.color === 'orange' ? '#f97316' :
                                   '#ef4444'
                  }}
                >
                  <div className="absolute left-0 top-4 -ml-3 w-6 h-6 rounded-full bg-background border-4 flex items-center justify-center text-xs font-bold"
                       style={{
                         borderColor: week.color === 'primary' ? 'hsl(var(--primary))' : 
                                    week.color === 'green' ? '#22c55e' :
                                    week.color === 'blue' ? '#3b82f6' :
                                    week.color === 'purple' ? '#a855f7' :
                                    week.color === 'orange' ? '#f97316' :
                                    '#ef4444'
                       }}>
                    {week.week}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{week.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{week.desc}</p>
                  <p className="text-xs font-medium" style={{
                    color: week.color === 'primary' ? 'hsl(var(--primary))' : 
                          week.color === 'green' ? '#22c55e' :
                          week.color === 'blue' ? '#3b82f6' :
                          week.color === 'purple' ? '#a855f7' :
                          week.color === 'orange' ? '#f97316' :
                          '#ef4444'
                  }}>
                    📝 {week.assessment}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/20">
          <h2 className="text-2xl font-bold mb-4">How to Use This Portal</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Navigate to your team page using the sidebar</li>
            <li>• Explore different research phases using the tabs</li>
            <li>• Get help from the AI Consultation Corner</li>
            <li>• Collaborate with your team and review sessions</li>
            <li>• Track progress and document your research journey</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Home;