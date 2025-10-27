import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
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

        {/* Team Projects */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center mb-8">Team Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Team 1: Flu Shot Campaign",
                desc: "Mathematical Models and Data Governance for School Vaccination Decision-Making",
              },
              {
                title: "Team 2: Bus Route Coordination",
                desc: "Analysis of coordination opportunities between overlapping bus routes",
              },
              {
                title: "Team 3: Typhoon Signal Analysis",
                desc: "Data-Driven Signal 8 Accuracy Assessment with Real-Time Wind Analysis",
              },
              {
                title: "Team 4: Food Waste Management",
                desc: "Municipal Solid Waste Charging Scheme Analysis",
              },
              {
                title: "Team 5: Green Community Recycling",
                desc: "Resource Allocation and App Usage Data Visualization",
              },
              {
                title: "Team 6: Bus Stop Merge",
                desc: "Real-Time API Data Analysis and Bus Stop Placement Optimization",
              },
            ].map((team, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-xl transition-all hover:scale-102 cursor-pointer bg-gradient-to-br from-card to-accent/20"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">{team.title}</h3>
                <p className="text-sm text-muted-foreground">{team.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/20">
          <h2 className="text-2xl font-bold mb-4">How to Use This Portal</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Navigate to your team page using the sidebar</li>
            <li>• Explore different sections using the tabs</li>
            <li>• Post messages and collaborate with your team</li>
            <li>• Submit your work and track progress</li>
            <li>• Review government data and public information</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Home;