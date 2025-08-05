import { useState } from "react";
import { AssessmentHero } from "./AssessmentHero";
import { TestIntroduction } from "./TestIntroduction";
import { PsychometricEvaluation } from "./PsychometricEvaluation";

type AssessmentStep = "hero" | "introduction" | "psychometric" | "technical" | "wiscar" | "results";

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("hero");

  const goToStep = (step: AssessmentStep) => {
    setCurrentStep(step);
  };

  switch (currentStep) {
    case "hero":
      return <AssessmentHero onStartAssessment={() => goToStep("introduction")} />;
    
    case "introduction":
      return (
        <TestIntroduction 
          onStartTest={() => goToStep("psychometric")}
          onBack={() => goToStep("hero")}
        />
      );
    
    case "psychometric":
      return (
        <PsychometricEvaluation 
          onComplete={(scores) => {
            console.log("Psychometric scores:", scores);
            goToStep("technical");
          }}
          onBack={() => goToStep("introduction")}
        />
      );
    
    case "technical":
      // TODO: Implement technical aptitude test
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Technical Aptitude</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      );
    
    case "wiscar":
      // TODO: Implement WISCAR framework
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">WISCAR Framework</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      );
    
    case "results":
      // TODO: Implement results page
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Assessment Results</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      );
    
    default:
      return <AssessmentHero onStartAssessment={() => goToStep("introduction")} />;
  }
}