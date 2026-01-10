import { Card } from "@/components/ui/card";
import CourseRoadmap from "@/components/CourseRoadmap";
import { ArrowRight } from "lucide-react";
import taliaPhoto from "@/assets/talia-wu.png";
import simonPhoto from "@/assets/simon-wang.png";

const Spring2026Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            GCAP 3226
          </h1>
          <p className="text-2xl text-foreground font-medium">
            Empowering Citizens Through Data: Participatory Policy Analysis for Hong Kong
          </p>
          <p className="text-lg text-primary font-semibold">
            Spring 2026
          </p>
        </div>

        {/* Instructors Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
            <div className="flex items-start gap-4">
              <img 
                src={taliaPhoto} 
                alt="Dr. Talia Wu" 
                className="w-20 h-20 rounded-full object-cover object-top border-2 border-primary/20"
              />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-ordinator</h3>
                <p className="text-xl font-bold mt-1">Dr. Talia Wu</p>
                <p className="text-muted-foreground text-sm">Department of Mathematics, HKBU</p>
                <a 
                  href="https://ge.hkbu.edu.hk/en/teaching_learning/ge_teaching_award/award_recipients/_clone3/Tian_Wu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  GE Teaching Awardee AY 2025/26 <ArrowRight className="h-3 w-3" />
                </a>
                <a 
                  href="https://www.math.hkbu.edu.hk/v1/people/profile/taliawu17/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
            <div className="flex items-start gap-4">
              <img 
                src={simonPhoto} 
                alt="Dr. Simon Wang" 
                className="w-20 h-20 rounded-full object-cover object-top border-2 border-primary/20"
              />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-teacher</h3>
                <p className="text-xl font-bold mt-1">Dr. Simon Wang</p>
                <p className="text-muted-foreground text-sm">Language Centre, HKBU</p>
                <a 
                  href="https://ge.hkbu.edu.hk/en/teaching_learning/ge_teaching_award/award_recipients/2021_22/team_Dr_Simon_Wang/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  GE Teaching Awardee AY 2021/22 <ArrowRight className="h-3 w-3" />
                </a>
                <a 
                  href="https://lc.hkbu.edu.hk/main/simonwang/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Roadmap (includes objectives) */}
        <CourseRoadmap />

      </div>
    </div>
  );
};

export default Spring2026Home;
