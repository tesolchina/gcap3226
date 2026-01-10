import { Card } from "@/components/ui/card";
import CourseRoadmap from "@/components/CourseRoadmap";
import { Button } from "@/components/ui/button";
import { User, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-ordinator</h3>
                <p className="text-xl font-bold mt-1">Dr. Talia Wu</p>
                <p className="text-muted-foreground">Department of Mathematics, HKBU</p>
                <a 
                  href="https://www.math.hkbu.edu.hk/v1/people/profile/taliawu17/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Co-teacher</h3>
                <p className="text-xl font-bold mt-1">Dr. Simon Wang</p>
                <p className="text-muted-foreground">Language Centre, HKBU</p>
                <a 
                  href="https://lc.hkbu.edu.hk/main/simonwang/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
                >
                  View profile <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Syllabus Card */}
        <Card className="p-6 bg-gradient-to-br from-card to-accent/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Syllabus</h3>
              <p className="text-xl font-bold mt-1">Course Outline</p>
              <p className="text-muted-foreground">Objectives, materials, and policies</p>
              <Link 
                to="/spring-2026/syllabus"
                className="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
              >
                View Syllabus <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Course Roadmap (includes objectives) */}
        <CourseRoadmap />

      </div>
    </div>
  );
};

export default Spring2026Home;
