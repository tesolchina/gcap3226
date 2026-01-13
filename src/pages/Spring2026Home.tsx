import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseRoadmap from "@/components/CourseRoadmap";
import { ArrowRight, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import taliaPhoto from "@/assets/talia-wu.png";
import simonPhoto from "@/assets/simon-wang.png";

const Spring2026Home = () => {
  const [showQR, setShowQR] = useState(false);
  const siteUrl = "https://gcap3226.hkbu.tech/spring-2026";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background p-8 relative">
      {/* QR Code Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowQR(!showQR)}
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm shadow-lg"
      >
        {showQR ? <X className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
      </Button>

      {/* QR Code Overlay */}
      {showQR && (
        <div className="fixed top-16 right-4 z-40 bg-white p-6 rounded-xl shadow-2xl border-2 border-primary/20">
          <div className="text-center space-y-3">
            <QRCodeSVG 
              value={siteUrl} 
              size={200}
              level="H"
              includeMargin={true}
            />
            <p className="text-sm font-medium text-foreground">Scan to visit</p>
            <p className="text-xs text-muted-foreground max-w-[200px] break-all">{siteUrl}</p>
          </div>
        </div>
      )}

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
                <div className="flex flex-col gap-1 mt-2">
                  <a 
                    href="https://ge.hkbu.edu.hk/en/teaching_learning/ge_teaching_award/award_recipients/_clone3/Tian_Wu/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    GE Teaching Awardee AY 2025/26 <ArrowRight className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://www.math.hkbu.edu.hk/v1/people/profile/taliawu17/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    View department profile <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
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
                <div className="flex flex-col gap-1 mt-2">
                  <a 
                    href="https://ge.hkbu.edu.hk/en/teaching_learning/ge_teaching_award/award_recipients/2021_22/team_Dr_Simon_Wang/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    GE Teaching Awardee AY 2021/22 <ArrowRight className="h-3 w-3" />
                  </a>
                  <a 
                    href="https://lc.hkbu.edu.hk/main/simonwang/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    View department profile <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
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
