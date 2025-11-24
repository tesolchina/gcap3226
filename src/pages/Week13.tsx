import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Users, ClipboardList, Camera, Link } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import qrSimon from "@/assets/qr-simon.png";
import qrTalia from "@/assets/qr-talia.png";
import workshopPhoto from "@/assets/workshop-photo.jpg";

interface PresentationSlot {
  team: string;
  time: string;
  endTime: string;
}

const Week13 = () => {
  const [presentationOrder, setPresentationOrder] = useState<PresentationSlot[]>([]);

  const copyLinkToSection = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    // Load existing schedule on mount
    const loadSchedule = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('name, presentation_time, presentation_end_time')
        .not('presentation_time', 'is', null)
        .order('presentation_time', { ascending: true });
      
      if (!error && data && data.length > 0) {
        const schedule = data.map(team => ({
          team: team.name,
          time: team.presentation_time || '',
          endTime: team.presentation_end_time || ''
        }));
        setPresentationOrder(schedule);
      }
    };
    
    loadSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              Week 13 Rundown
            </CardTitle>
            <CardDescription className="text-base">
              Final presentations - November 25, 2025
            </CardDescription>
          </CardHeader>
        </Card>

        <CountdownTimer />

        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="guest" id="guest">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-2 flex-1">
                    <Users className="h-5 w-5 text-primary" />
                    Guest Speaker: Ms Natalie Wong
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLinkToSection('guest');
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy link to this section"
                    >
                      <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/V6c1mChPCDE"
                      title="Ms Natalie Wong"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="order" id="order">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex items-center gap-2 flex-1">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Final Presentations
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLinkToSection('order');
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy link to this section"
                    >
                      <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg space-y-2 mb-4">
                    <h3 className="font-semibold text-primary">Presentation Guidelines</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Each team has a <strong>total of 15 minutes</strong></li>
                      <li>Recommended to finish in <strong>10-12 minutes (12 minutes max)</strong></li>
                      <li>A countdown timer is available on each team page</li>
                      <li>Remember: Your audience is a senior journalist</li>
                      <li>Focus on presenting arguments in a way that members of the public can understand</li>
                    </ul>
                  </div>
                  <p className="text-muted-foreground">
                    The order of presentations will be determined around 10:50am on November 25, 2025.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Teams:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Team 1: Flu Shot</li>
                      <li>Team 2: Bus Routes</li>
                      <li>Team 3: Typhoon Signals</li>
                      <li>Team 4: Food Waste</li>
                      <li>Team 5: Green Recycling</li>
                      <li>Team 6: Bus Stop Merge</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium">Copy this list to randomize:</p>
                    <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
Team 1: Flu Shot{"\n"}Team 2: Bus Routes{"\n"}Team 3: Typhoon Signals{"\n"}Team 4: Food Waste{"\n"}Team 5: Green Recycling{"\n"}Team 6: Bus Stop Merge
                    </pre>
                    <p className="text-sm text-muted-foreground">
                      Use <a href="https://www.random.org/lists/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">random.org/lists</a> to randomize the order
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="photo" id="photo">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex items-center gap-2 flex-1">
                    <Camera className="h-5 w-5 text-primary" />
                    Photo Taking
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLinkToSection('photo');
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy link to this section"
                    >
                      <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-muted-foreground">
                    Remember to take a group photo with all teams before the presentations begin!
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Sample from AI workshop for journalism class:</p>
                    <img 
                      src={workshopPhoto} 
                      alt="Group photo sample from AI workshop" 
                      className="w-full rounded-lg border"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="feedback" id="feedback">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex items-center gap-2 flex-1">
                    <Award className="h-5 w-5 text-primary" />
                    Course Feedback Questionnaire
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLinkToSection('feedback');
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy link to this section"
                    >
                      <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Please fill out the Course Feedback Questionnaire for both teachers. Deadline: <strong>29 November 2025, 23:59:59</strong>
                    </p>
                    <p className="text-sm">
                      <a 
                        href="https://cfq-student.hkbu.edu.hk/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        Access CFQ Portal →
                      </a>
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Simon</h3>
                        <img src={qrSimon} alt="CFQ QR Code for Simon" className="w-48 h-48" />
                      </div>
                      
                      <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Talia</h3>
                        <img src={qrTalia} alt="CFQ QR Code for Talia" className="w-48 h-48" />
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h3 className="font-semibold">Teaching Assistant Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        Please also provide feedback for Teaching Assistant Mr David Chan on his support during in-class exercises via Moodle:
                      </p>
                      <a 
                        href="https://buelearning.hkbu.edu.hk/mod/feedback/view.php?id=1871347" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm block"
                      >
                        Submit TA Feedback on Moodle →
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="assignments" id="assignments">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex items-center gap-2 flex-1">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    Assignment Deadlines
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLinkToSection('assignments');
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy link to this section"
                    >
                      <Link className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h3 className="font-semibold">Human-AI Collaboration Report</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete the Human-AI Collaboration Report via Moodle.
                      </p>
                      <p className="text-sm font-medium">
                        Deadline: <strong>2 December 2025</strong>
                      </p>
                      <a 
                        href="https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=340207" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm block"
                      >
                        Submit Human-AI Collaboration Report →
                      </a>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <h3 className="font-semibold">Project Report</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete the Project Report via Moodle. Reach out to the teacher if you wish to use AI agent to help draft the report.
                      </p>
                      <p className="text-sm font-medium">
                        Deadline: <strong>7 December 2025</strong>
                      </p>
                      <a 
                        href="https://buelearning.hkbu.edu.hk/mod/forum/discuss.php?d=331522" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm block"
                      >
                        Submit Project Report →
                      </a>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {presentationOrder.length > 0 && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Presentation Schedule
              </CardTitle>
              <CardDescription>
                Each team has 15 minutes maximum - November 25, 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {presentationOrder.map((slot, index) => (
                  <div 
                    key={index}
                    className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary font-bold rounded-full h-8 w-8 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{slot.team}</p>
                          <p className="text-sm text-muted-foreground">15 minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{slot.time}</p>
                        <p className="text-sm text-muted-foreground">to {slot.endTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Week13;
