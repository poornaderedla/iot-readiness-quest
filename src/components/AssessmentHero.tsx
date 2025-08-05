import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Trophy, Target } from "lucide-react";
import heroImage from "@/assets/iot-hero.jpg";

interface AssessmentHeroProps {
  onStartAssessment: () => void;
}

export function AssessmentHero({ onStartAssessment }: AssessmentHeroProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Should I Learn to Become an
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {" "}IoT Developer?
                  </span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Discover your fit for the Internet of Things with our comprehensive, 
                  AI-powered assessment combining psychology, aptitude, and technical readiness.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>20-30 minutes</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Users className="w-5 h-5" />
                  <span>Psychometrically validated</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Trophy className="w-5 h-5" />
                  <span>Career guidance</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={onStartAssessment}
                  className="group"
                >
                  <Target className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Your Assessment
                </Button>
                <p className="text-sm text-blue-200">
                  Free • No registration required • Instant results
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="IoT Development Workspace" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating stats */}
              <Card className="absolute -top-4 -left-4 p-4 bg-white/95 backdrop-blur-sm shadow-elegant">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">85K+</div>
                  <div className="text-sm text-muted-foreground">IoT Jobs Available</div>
                </div>
              </Card>
              
              <Card className="absolute -bottom-4 -right-4 p-4 bg-white/95 backdrop-blur-sm shadow-elegant">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">$105K</div>
                  <div className="text-sm text-muted-foreground">Average Salary</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Our Assessment Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive evaluation uses the WISCAR framework to assess your readiness across six critical dimensions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Psychometric Evaluation",
              description: "Personality traits, interests, and cognitive preferences using validated psychological models",
              icon: "🧠",
              duration: "8-10 min"
            },
            {
              title: "Technical Aptitude",
              description: "Logic, problem-solving, and existing knowledge in electronics and programming",
              icon: "⚡",
              duration: "10-12 min"
            },
            {
              title: "WISCAR Framework",
              description: "Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment",
              icon: "🎯",
              duration: "5 min"
            },
            {
              title: "IoT Domain Knowledge",
              description: "Understanding of sensors, microcontrollers, protocols, and IoT ecosystem",
              icon: "🔧",
              duration: "5-8 min"
            },
            {
              title: "Career Alignment",
              description: "Match your profile with specific IoT roles and career paths",
              icon: "🚀",
              duration: "2 min"
            },
            {
              title: "Personalized Roadmap",
              description: "Customized learning path and next steps based on your results",
              icon: "🗺️",
              duration: "Instant"
            }
          ].map((section, index) => (
            <Card key={index} className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="text-center space-y-4">
                <div className="text-4xl">{section.icon}</div>
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="text-muted-foreground">{section.description}</p>
                <div className="inline-flex items-center gap-2 bg-muted rounded-full px-3 py-1 text-sm">
                  <Clock className="w-4 h-4" />
                  {section.duration}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="assessment" 
            size="lg" 
            onClick={onStartAssessment}
            className="group"
          >
            <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Begin Assessment Now
          </Button>
        </div>
      </div>
    </div>
  );
}