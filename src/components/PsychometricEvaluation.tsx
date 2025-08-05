import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

interface PsychometricEvaluationProps {
  onComplete: (scores: PsychometricScores) => void;
  onBack: () => void;
}

interface PsychometricScores {
  interest: number;
  personality: number;
  cognitive: number;
  motivation: number;
  overall: number;
}

interface Question {
  id: string;
  category: 'interest' | 'personality' | 'cognitive' | 'motivation';
  question: string;
  type: 'likert' | 'multiple-choice';
  options: string[];
  reverse?: boolean; // for reverse-scored items
}

const questions: Question[] = [
  // Interest Questions (Likert 1-5)
  {
    id: "i1",
    category: "interest",
    question: "I enjoy building things with my hands and seeing them work in real life",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "i2", 
    category: "interest",
    question: "I like working with sensors, microcontrollers, and electronic components",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "i3",
    category: "interest", 
    question: "I find it exciting to connect physical devices to the internet and cloud services",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "i4",
    category: "interest",
    question: "I enjoy troubleshooting hardware and software integration problems",
    type: "likert", 
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },

  // Personality Questions (Big 5 - Openness, Conscientiousness)
  {
    id: "p1",
    category: "personality",
    question: "I enjoy solving complex, multi-step technical problems",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "p2",
    category: "personality", 
    question: "I am comfortable learning new technologies and tools regularly",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "p3",
    category: "personality",
    question: "I prefer structured, step-by-step approaches to problem solving",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "p4",
    category: "personality",
    question: "I pay close attention to details when working on technical projects",
    type: "likert", 
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },

  // Cognitive Style Questions
  {
    id: "c1",
    category: "cognitive",
    question: "When tackling a new IoT project, I prefer to:",
    type: "multiple-choice",
    options: [
      "Start with a detailed plan and follow it systematically",
      "Begin building immediately and figure out details as I go", 
      "Research similar projects first, then adapt their approach",
      "Break it into small pieces and test each component separately"
    ]
  },
  {
    id: "c2", 
    category: "cognitive",
    question: "When debugging a device that won't connect to WiFi, I would:",
    type: "multiple-choice",
    options: [
      "Check the code line by line for syntax errors",
      "Test the WiFi credentials and network settings first",
      "Look up common WiFi connection issues online",
      "Try different troubleshooting approaches simultaneously"
    ]
  },
  {
    id: "c3",
    category: "cognitive", 
    question: "My ideal learning environment for IoT development would include:",
    type: "multiple-choice",
    options: [
      "Structured courses with clear milestones and assignments",
      "Hands-on workshops with immediate practical application", 
      "Self-paced online tutorials I can pause and replay",
      "Collaborative projects with peers and mentors"
    ]
  },

  // Motivation Questions (Grit + Growth Mindset)
  {
    id: "m1",
    category: "motivation",
    question: "I stick with my goals even when progress is slow or difficult",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "m2",
    category: "motivation",
    question: "When I encounter a programming or hardware problem I can't solve immediately, I keep trying different approaches",
    type: "likert", 
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "m3",
    category: "motivation",
    question: "I believe my technical abilities can be significantly improved through practice and learning",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  },
  {
    id: "m4",
    category: "motivation", 
    question: "I am willing to spend months learning IoT development skills even if progress feels slow at times",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
  }
];

export function PsychometricEvaluation({ onComplete, onBack }: PsychometricEvaluationProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: string) => {
    const numericValue = currentQuestion.type === 'likert' 
      ? parseInt(value) 
      : parseInt(value); // For multiple choice, we'll use index
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: numericValue
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate scores
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

  const calculateScores = (answers: Record<string, number>): PsychometricScores => {
    const categoryScores = {
      interest: 0,
      personality: 0, 
      cognitive: 0,
      motivation: 0
    };
    
    const categoryCounts = {
      interest: 0,
      personality: 0,
      cognitive: 0, 
      motivation: 0
    };

    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        if (q.type === 'likert') {
          // Convert 1-5 Likert to 0-100 scale
          categoryScores[q.category] += (answer - 1) * 25;
        } else {
          // Multiple choice: assume higher index = better fit
          categoryScores[q.category] += (answer / (q.options.length - 1)) * 100;
        }
        categoryCounts[q.category]++;
      }
    });

    // Average scores by category
    const finalScores = {
      interest: categoryCounts.interest > 0 ? categoryScores.interest / categoryCounts.interest : 0,
      personality: categoryCounts.personality > 0 ? categoryScores.personality / categoryCounts.personality : 0,
      cognitive: categoryCounts.cognitive > 0 ? categoryScores.cognitive / categoryCounts.cognitive : 0,
      motivation: categoryCounts.motivation > 0 ? categoryScores.motivation / categoryCounts.motivation : 0,
      overall: 0
    };

    // Calculate overall score as weighted average
    finalScores.overall = (
      finalScores.interest * 0.3 +
      finalScores.personality * 0.25 + 
      finalScores.cognitive * 0.2 +
      finalScores.motivation * 0.25
    );

    return finalScores;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Psychometric Evaluation</span>
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
              <Brain className="w-4 h-4 mr-2" />
              {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)} Assessment
            </Badge>
            <h1 className="text-2xl font-bold mb-2">Psychological Fit Evaluation</h1>
            <p className="text-muted-foreground">
              Help us understand your interests, personality, and motivation for IoT development
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
              {currentQuestionIndex === 0 ? "Back to Introduction" : "Previous"}
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? "Complete Evaluation" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}