import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target,
  Brain,
  Code,
  Heart,
  Wrench,
  Users,
  ArrowRight,
  Download,
  RefreshCw
} from "lucide-react";

interface AssessmentResultsProps {
  psychometricScores: {
    interest: number;
    personality: number;
    cognitive: number;
    motivation: number;
    overall: number;
  };
  technicalScores: {
    generalAptitude: number;
    prerequisiteCheck: number;
    domainSpecific: number;
    overall: number;
  };
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    overall: number;
  };
  onRestart: () => void;
}

export function AssessmentResults({ 
  psychometricScores, 
  technicalScores, 
  wiscarScores, 
  onRestart 
}: AssessmentResultsProps) {
  
  // Calculate final recommendation
  const overallScore = (
    psychometricScores.overall * 0.3 +
    technicalScores.overall * 0.4 + 
    wiscarScores.overall * 0.3
  );

  const getRecommendation = (score: number) => {
    if (score >= 75) return { level: "yes", text: "Highly Recommended", icon: CheckCircle, color: "text-success" };
    if (score >= 60) return { level: "maybe", text: "Proceed with Preparation", icon: AlertCircle, color: "text-warning" };
    return { level: "no", text: "Consider Alternatives", icon: XCircle, color: "text-destructive" };
  };

  const recommendation = getRecommendation(overallScore);
  const RecommendationIcon = recommendation.icon;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning"; 
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const jobRoles = [
    {
      title: "IoT Developer",
      description: "Create embedded applications and device interfaces",
      salary: "$85K-$110K",
      match: Math.max(60, overallScore - 10)
    },
    {
      title: "Embedded Systems Engineer", 
      description: "Work with microcontrollers and low-level hardware",
      salary: "$90K-$115K",
      match: Math.max(50, technicalScores.overall - 5)
    },
    {
      title: "IoT Solutions Architect",
      description: "Design complete IoT ecosystems from devices to cloud", 
      salary: "$120K+",
      match: Math.max(40, overallScore - 20)
    },
    {
      title: "Firmware Developer",
      description: "Develop firmware for embedded chips and devices",
      salary: "$95K-$125K", 
      match: Math.max(45, technicalScores.overall - 10)
    }
  ];

  const learningPath = recommendation.level === "yes" ? [
    { level: "Beginner", content: "Python + Raspberry Pi + Linux Basics", duration: "2-3 months" },
    { level: "Intermediate", content: "MQTT, Node-RED, Cloud Integrations", duration: "3-4 months" },
    { level: "Advanced", content: "End-to-end IoT Project + Portfolio", duration: "2-3 months" }
  ] : recommendation.level === "maybe" ? [
    { level: "Foundation", content: "Programming Fundamentals (Python/C++)", duration: "3-4 months" },
    { level: "Electronics", content: "Basic Electronics & Circuit Design", duration: "2-3 months" },
    { level: "IoT Basics", content: "Arduino Projects + Sensor Integration", duration: "3-4 months" }
  ] : [
    { level: "Explore", content: "Intro Programming Course (Python)", duration: "2-3 months" },
    { level: "Decide", content: "Try IoT Fundamentals Course", duration: "1-2 months" },
    { level: "Alternative", content: "Consider Web Development or Data Analysis", duration: "Ongoing" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Assessment Complete
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Your IoT Developer Assessment Results</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive evaluation of your fit for IoT development career
            </p>
          </div>

          {/* Main Recommendation */}
          <Card className="p-8 mb-8 text-center bg-gradient-subtle">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RecommendationIcon className={`w-8 h-8 ${recommendation.color}`} />
              <h2 className="text-3xl font-bold">{recommendation.text}</h2>
            </div>
            <div className="text-6xl font-bold mb-4 text-primary">{Math.round(overallScore)}%</div>
            <p className="text-lg text-muted-foreground mb-6">Overall Compatibility Score</p>
            
            {recommendation.level === "yes" && (
              <p className="text-lg">
                You show strong potential for IoT development! Your combination of interest, 
                technical aptitude, and learning readiness suggests you could thrive in this field.
              </p>
            )}
            
            {recommendation.level === "maybe" && (
              <p className="text-lg">
                You have good foundational potential but should strengthen some areas first. 
                With focused preparation, you could succeed in IoT development.
              </p>
            )}
            
            {recommendation.level === "no" && (
              <p className="text-lg">
                IoT development may not be the best fit currently. Consider exploring related 
                fields or building stronger technical foundations first.
              </p>
            )}
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Psychometric */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Psychology Fit</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(psychometricScores.overall)}`}>
                      {Math.round(psychometricScores.overall)}%
                    </span>
                  </div>
                  <Progress value={psychometricScores.overall} className="h-3" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Interest</span>
                    <span className={getScoreColor(psychometricScores.interest)}>
                      {Math.round(psychometricScores.interest)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personality</span>
                    <span className={getScoreColor(psychometricScores.personality)}>
                      {Math.round(psychometricScores.personality)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motivation</span>
                    <span className={getScoreColor(psychometricScores.motivation)}>
                      {Math.round(psychometricScores.motivation)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Technical */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Technical Readiness</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(technicalScores.overall)}`}>
                      {Math.round(technicalScores.overall)}%
                    </span>
                  </div>
                  <Progress value={technicalScores.overall} className="h-3" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>General Aptitude</span>
                    <span className={getScoreColor(technicalScores.generalAptitude)}>
                      {Math.round(technicalScores.generalAptitude)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prerequisites</span>
                    <span className={getScoreColor(technicalScores.prerequisiteCheck)}>
                      {Math.round(technicalScores.prerequisiteCheck)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>IoT Knowledge</span>
                    <span className={getScoreColor(technicalScores.domainSpecific)}>
                      {Math.round(technicalScores.domainSpecific)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* WISCAR */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">WISCAR Readiness</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(wiscarScores.overall)}`}>
                      {Math.round(wiscarScores.overall)}%
                    </span>
                  </div>
                  <Progress value={wiscarScores.overall} className="h-3" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Will</span>
                    <span className={getScoreColor(wiscarScores.will)}>
                      {Math.round(wiscarScores.will)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest</span>
                    <span className={getScoreColor(wiscarScores.interest)}>
                      {Math.round(wiscarScores.interest)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skill</span>
                    <span className={getScoreColor(wiscarScores.skill)}>
                      {Math.round(wiscarScores.skill)}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Job Roles Match */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Job Role Compatibility</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {jobRoles.map((role, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-primary">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      <div className="font-bold text-success mt-2">{role.salary}</div>
                    </div>
                    <Badge variant={role.match >= 70 ? "default" : role.match >= 50 ? "secondary" : "outline"}>
                      {Math.round(role.match)}% match
                    </Badge>
                  </div>
                  <Progress value={role.match} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Path */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Recommended Learning Path</h2>
            <div className="space-y-4">
              {learningPath.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.level}</h3>
                    <p className="text-muted-foreground">{step.content}</p>
                  </div>
                  <Badge variant="outline">{step.duration}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={onRestart}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Assessment
            </Button>
            
            <Button 
              variant="default" 
              size="lg"
              className="flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </Button>
            
            <Button 
              variant="hero" 
              size="lg"
              className="flex items-center gap-2"
            >
              Start Learning Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}