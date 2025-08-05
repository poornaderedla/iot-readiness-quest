import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Target, Heart, Wrench, Brain, TrendingUp, Users } from "lucide-react";

interface WiscarFrameworkProps {
  onComplete: (scores: WiscarScores) => void;
  onBack: () => void;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
  overall: number;
}

interface Question {
  id: string;
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'realWorld';
  question: string;
  type: 'likert' | 'scenario';
  options: string[];
}

const questions: Question[] = [
  // Will - Persistence & Drive
  {
    id: "w1",
    dimension: "will",
    question: "When learning a new programming language, I typically:",
    type: "scenario",
    options: [
      "Give up after a few difficult concepts",
      "Take breaks but eventually come back to it", 
      "Push through challenges with determination",
      "Actively seek help and keep practicing until I master it"
    ]
  },
  {
    id: "w2",
    dimension: "will",
    question: "I am willing to spend 6+ months learning IoT development even if progress feels slow",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "w3",
    dimension: "will",
    question: "When a project becomes frustrating, I usually:",
    type: "scenario", 
    options: [
      "Put it aside and maybe return later",
      "Ask for help immediately",
      "Take a break then tackle it systematically", 
      "Keep working until I solve it, no matter how long it takes"
    ]
  },

  // Interest - Curiosity & Relevance
  {
    id: "i1",
    dimension: "interest",
    question: "How often do you find yourself reading about new technology trends?",
    type: "scenario",
    options: [
      "Rarely, only when required",
      "Occasionally when something catches my eye",
      "Regularly, a few times per month",
      "Daily, I actively seek out tech news"
    ]
  },
  {
    id: "i2", 
    dimension: "interest",
    question: "The idea of creating devices that can communicate with each other excites me",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "i3",
    dimension: "interest",
    question: "I would enjoy building a smart home system as a personal project",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },

  // Skill - Existing Tech/Soft Skills  
  {
    id: "s1",
    dimension: "skill",
    question: "My current level of programming experience is:",
    type: "scenario",
    options: [
      "No programming experience",
      "Basic understanding of one language", 
      "Comfortable with programming concepts",
      "Advanced programmer in multiple languages"
    ]
  },
  {
    id: "s2",
    dimension: "skill",
    question: "How comfortable are you with learning new software tools?",
    type: "scenario",
    options: [
      "I prefer to stick with familiar tools",
      "I can learn new tools when necessary",
      "I enjoy exploring new software",
      "I actively seek out the latest tools and technologies"
    ]
  },

  // Cognitive Readiness - Learning Speed & Problem-Solving
  {
    id: "c1",
    dimension: "cognitive", 
    question: "When faced with a complex technical problem, I prefer to:",
    type: "scenario",
    options: [
      "Get help from others right away",
      "Look for similar solved examples online",
      "Break it down into smaller, manageable parts",
      "Experiment with different approaches systematically"
    ]
  },
  {
    id: "c2",
    dimension: "cognitive",
    question: "I can usually understand new technical concepts after:",
    type: "scenario",
    options: [
      "Multiple detailed explanations and practice",
      "One good explanation and some practice", 
      "A brief explanation and minimal practice",
      "Reading about it once or seeing an example"
    ]
  },
  {
    id: "c3",
    dimension: "cognitive",
    question: "How do you typically approach debugging code that isn't working?",
    type: "scenario",
    options: [
      "Ask someone else to help fix it",
      "Search online for similar problems",
      "Read through the code line by line carefully",
      "Use systematic testing to isolate the issue"
    ]
  },

  // Ability to Learn - Metacognition & Feedback Openness
  {
    id: "a1",
    dimension: "ability",
    question: "When I receive constructive criticism on my technical work, I:",
    type: "scenario", 
    options: [
      "Feel discouraged and defensive",
      "Accept it but don't always act on it",
      "Appreciate it and try to improve",
      "Actively seek out more specific feedback"
    ]
  },
  {
    id: "a2",
    dimension: "ability", 
    question: "I learn best when I can:",
    type: "scenario",
    options: [
      "Follow step-by-step instructions exactly",
      "Modify examples to fit my needs",
      "Understand the underlying principles first", 
      "Experiment and learn from failures"
    ]
  },

  // Real-World Alignment - Role Interest Match
  {
    id: "r1", 
    dimension: "realWorld",
    question: "Which aspect of IoT development appeals to you most?",
    type: "scenario",
    options: [
      "The steady, predictable nature of the work",
      "The potential for good career prospects",
      "The hands-on problem-solving involved",
      "The opportunity to create innovative solutions"
    ]
  },
  {
    id: "r2",
    dimension: "realWorld",
    question: "In a typical work day, I would prefer:",
    type: "scenario",
    options: [
      "Clearly defined tasks with predictable outcomes",
      "A mix of routine and new challenges", 
      "Variety with different types of problems",
      "Constantly changing, cutting-edge projects"
    ]
  },
  {
    id: "r3",
    dimension: "realWorld", 
    question: "I would enjoy working on IoT projects that impact:",
    type: "scenario",
    options: [
      "Personal convenience (smart home devices)",
      "Business efficiency (industrial sensors)",
      "Healthcare and safety (medical devices)",
      "All of the above equally"
    ]
  }
];

export function WiscarFramework({ onComplete, onBack }: WiscarFrameworkProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: string) => {
    const numericValue = currentQuestion.type === 'likert' 
      ? parseInt(value) 
      : parseInt(value);
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: numericValue
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const scores = calculateScores(answers);
      onComplete(scores);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const calculateScores = (answers: Record<string, number>): WiscarScores => {
    const dimensionScores = {
      will: { total: 0, count: 0 },
      interest: { total: 0, count: 0 },
      skill: { total: 0, count: 0 },
      cognitive: { total: 0, count: 0 },
      ability: { total: 0, count: 0 },
      realWorld: { total: 0, count: 0 }
    };

    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        const score = q.type === 'likert' 
          ? (answer - 1) * 25  // Convert 1-5 to 0-100
          : (answer / (q.options.length - 1)) * 100; // Convert index to 0-100
        
        dimensionScores[q.dimension].total += score;
        dimensionScores[q.dimension].count++;
      }
    });

    const finalScores = {
      will: dimensionScores.will.count > 0 ? dimensionScores.will.total / dimensionScores.will.count : 0,
      interest: dimensionScores.interest.count > 0 ? dimensionScores.interest.total / dimensionScores.interest.count : 0,
      skill: dimensionScores.skill.count > 0 ? dimensionScores.skill.total / dimensionScores.skill.count : 0,
      cognitive: dimensionScores.cognitive.count > 0 ? dimensionScores.cognitive.total / dimensionScores.cognitive.count : 0,
      ability: dimensionScores.ability.count > 0 ? dimensionScores.ability.total / dimensionScores.ability.count : 0,
      realWorld: dimensionScores.realWorld.count > 0 ? dimensionScores.realWorld.total / dimensionScores.realWorld.count : 0,
      overall: 0
    };

    // Calculate overall as weighted average
    finalScores.overall = (
      finalScores.will * 0.2 +
      finalScores.interest * 0.2 + 
      finalScores.skill * 0.15 +
      finalScores.cognitive * 0.2 +
      finalScores.ability * 0.15 +
      finalScores.realWorld * 0.1
    );

    return finalScores;
  };

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case 'will': return <Target className="w-4 h-4" />;
      case 'interest': return <Heart className="w-4 h-4" />;
      case 'skill': return <Wrench className="w-4 h-4" />;
      case 'cognitive': return <Brain className="w-4 h-4" />;
      case 'ability': return <TrendingUp className="w-4 h-4" />;
      case 'realWorld': return <Users className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getDimensionName = (dimension: string) => {
    switch (dimension) {
      case 'will': return 'Will & Persistence';
      case 'interest': return 'Interest & Curiosity';
      case 'skill': return 'Current Skills';
      case 'cognitive': return 'Cognitive Readiness';
      case 'ability': return 'Learning Ability';
      case 'realWorld': return 'Role Alignment';
      default: return 'WISCAR';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">WISCAR Readiness Framework</span>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              {getDimensionIcon(currentQuestion.dimension)}
              <span className="ml-2">{getDimensionName(currentQuestion.dimension)}</span>
            </Badge>
            <h1 className="text-2xl font-bold mb-2">Readiness Assessment</h1>
            <p className="text-muted-foreground">
              Evaluating your comprehensive readiness across six key dimensions
            </p>
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <RadioGroup 
              value={answers[currentQuestion.id]?.toString()} 
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem 
                    value={(index + 1).toString()} 
                    id={`option-${index}`} 
                    className="mt-0"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-base cursor-pointer flex-1 leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentQuestionIndex === 0 ? "Back to Technical" : "Previous"}
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? "Complete Assessment" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}