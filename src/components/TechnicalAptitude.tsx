import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Code, Zap, Wrench } from "lucide-react";

interface TechnicalAptitudeProps {
  onComplete: (scores: TechnicalScores) => void;
  onBack: () => void;
}

export interface TechnicalScores {
  generalAptitude: number;
  prerequisiteCheck: number;
  domainSpecific: number;
  overall: number;
}

interface Question {
  id: string;
  category: 'general' | 'prerequisite' | 'domain';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const questions: Question[] = [
  // General Aptitude Questions
  {
    id: "g1",
    category: "general",
    question: "If a sensor sends data every 5 seconds, how many data points will it send in 2 minutes?",
    options: ["12", "24", "30", "60"],
    correctAnswer: 1, // 24
    explanation: "2 minutes = 120 seconds. 120 ÷ 5 = 24 data points"
  },
  {
    id: "g2", 
    category: "general",
    question: "What comes next in this sequence: 2, 6, 18, 54, ?",
    options: ["108", "162", "216", "270"],
    correctAnswer: 1, // 162
    explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162"
  },
  {
    id: "g3",
    category: "general", 
    question: "A smart home system has 8 devices. If each device can be either ON or OFF, how many possible states can the system have?",
    options: ["16", "64", "128", "256"],
    correctAnswer: 3, // 256
    explanation: "Each device has 2 states, so total states = 2^8 = 256"
  },

  // Prerequisite Check Questions  
  {
    id: "p1",
    category: "prerequisite",
    question: "What is the voltage across a 100Ω resistor when 0.5A current flows through it?",
    options: ["50V", "200V", "0.005V", "Need more information"],
    correctAnswer: 0, // 50V
    explanation: "Using Ohm's Law: V = I × R = 0.5A × 100Ω = 50V"
  },
  {
    id: "p2",
    category: "prerequisite", 
    question: "In Python, what will this code print? print(len('IoT'))",
    options: ["2", "3", "4", "Error"],
    correctAnswer: 1, // 3
    explanation: "The string 'IoT' has 3 characters: I, o, T"
  },
  {
    id: "p3",
    category: "prerequisite",
    question: "What does CPU stand for?", 
    options: ["Computer Processing Unit", "Central Processing Unit", "Control Processing Unit", "Core Processing Unit"],
    correctAnswer: 1, // Central Processing Unit
    explanation: "CPU stands for Central Processing Unit"
  },
  {
    id: "p4",
    category: "prerequisite",
    question: "Which of these is a programming loop structure?",
    options: ["if-else", "for", "function", "variable"],
    correctAnswer: 1, // for
    explanation: "A 'for' loop is used to repeat code multiple times"
  },

  // Domain-Specific Questions
  {
    id: "d1", 
    category: "domain",
    question: "What communication protocol is commonly used for IoT device messaging?",
    options: ["HTTP", "MQTT", "FTP", "SMTP"],
    correctAnswer: 1, // MQTT
    explanation: "MQTT is a lightweight messaging protocol designed for IoT devices"
  },
  {
    id: "d2",
    category: "domain",
    question: "Which microcontroller is most popular for IoT prototyping?",
    options: ["Intel 8086", "Arduino Uno", "Raspberry Pi", "ESP32"],
    correctAnswer: 3, // ESP32
    explanation: "ESP32 has built-in WiFi/Bluetooth and is very popular for IoT projects"
  },
  {
    id: "d3",
    category: "domain", 
    question: "What does GPIO stand for in microcontrollers?",
    options: ["General Purpose Input/Output", "Global Processing Input/Output", "Generic Port Input/Output", "General Protocol Input/Output"],
    correctAnswer: 0, // General Purpose Input/Output
    explanation: "GPIO pins can be configured as either inputs or outputs for various purposes"
  },
  {
    id: "d4",
    category: "domain",
    question: "Which sensor would you use to measure temperature and humidity?",
    options: ["DHT22", "HC-SR04", "LDR", "PIR"],
    correctAnswer: 0, // DHT22
    explanation: "DHT22 is a combined temperature and humidity sensor"
  },
  {
    id: "d5",
    category: "domain",
    question: "What is the typical voltage level for Arduino digital pins?",
    options: ["3.3V", "5V", "12V", "24V"],
    correctAnswer: 1, // 5V
    explanation: "Arduino Uno operates at 5V logic levels"
  }
];

export function TechnicalAptitude({ onComplete, onBack }: TechnicalAptitudeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
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

  const calculateScores = (answers: Record<string, number>): TechnicalScores => {
    const categoryScores = {
      general: { correct: 0, total: 0 },
      prerequisite: { correct: 0, total: 0 },
      domain: { correct: 0, total: 0 }
    };

    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        const category = q.category === 'general' ? 'general' : 
                        q.category === 'prerequisite' ? 'prerequisite' : 'domain';
        
        categoryScores[category].total++;
        if (answer === q.correctAnswer) {
          categoryScores[category].correct++;
        }
      }
    });

    const generalAptitude = categoryScores.general.total > 0 ? 
      (categoryScores.general.correct / categoryScores.general.total) * 100 : 0;
    
    const prerequisiteCheck = categoryScores.prerequisite.total > 0 ? 
      (categoryScores.prerequisite.correct / categoryScores.prerequisite.total) * 100 : 0;
    
    const domainSpecific = categoryScores.domain.total > 0 ? 
      (categoryScores.domain.correct / categoryScores.domain.total) * 100 : 0;

    const overall = (generalAptitude * 0.3 + prerequisiteCheck * 0.4 + domainSpecific * 0.3);

    return {
      generalAptitude,
      prerequisiteCheck, 
      domainSpecific,
      overall
    };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <Zap className="w-4 h-4" />;
      case 'prerequisite': return <Code className="w-4 h-4" />;
      case 'domain': return <Wrench className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'general': return 'General Aptitude';
      case 'prerequisite': return 'Prerequisites';
      case 'domain': return 'IoT Knowledge';
      default: return 'Technical';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Technical Aptitude & Knowledge</span>
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
              {getCategoryIcon(currentQuestion.category)}
              <span className="ml-2">{getCategoryName(currentQuestion.category)}</span>
            </Badge>
            <h1 className="text-2xl font-bold mb-2">Technical Evaluation</h1>
            <p className="text-muted-foreground">
              Testing your logical thinking, foundational knowledge, and IoT-specific understanding
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
                    value={index.toString()} 
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
              {currentQuestionIndex === 0 ? "Back to Psychology" : "Previous"}
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {isLastQuestion ? "Complete Technical Test" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}