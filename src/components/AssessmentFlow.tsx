import { useState } from "react";
import { AssessmentHero } from "./AssessmentHero";
import { TestIntroduction } from "./TestIntroduction";
import { PsychometricEvaluation } from "./PsychometricEvaluation";
import { TechnicalAptitude, TechnicalScores } from "./TechnicalAptitude";
import { WiscarFramework, WiscarScores } from "./WiscarFramework";
import { AssessmentResults } from "./AssessmentResults";

type AssessmentStep = "hero" | "introduction" | "psychometric" | "technical" | "wiscar" | "results";

interface PsychometricScores {
  interest: number;
  personality: number;
  cognitive: number;
  motivation: number;
  overall: number;
}

export function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("hero");
  const [psychometricScores, setPsychometricScores] = useState<PsychometricScores | null>(null);
  const [technicalScores, setTechnicalScores] = useState<TechnicalScores | null>(null);
  const [wiscarScores, setWiscarScores] = useState<WiscarScores | null>(null);

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
            setPsychometricScores(scores);
            goToStep("technical");
          }}
          onBack={() => goToStep("introduction")}
        />
      );
    
    case "technical":
      return (
        <TechnicalAptitude 
          onComplete={(scores) => {
            setTechnicalScores(scores);
            goToStep("wiscar");
          }}
          onBack={() => goToStep("psychometric")}
        />
      );
    
    case "wiscar":
      return (
        <WiscarFramework 
          onComplete={(scores) => {
            setWiscarScores(scores);
            goToStep("results");
          }}
          onBack={() => goToStep("technical")}
        />
      );
    
    case "results":
      if (!psychometricScores || !technicalScores || !wiscarScores) {
        // If somehow we got here without completing all assessments, restart
        return <AssessmentHero onStartAssessment={() => goToStep("introduction")} />;
      }
      return (
        <AssessmentResults 
          psychometricScores={psychometricScores}
          technicalScores={technicalScores}
          wiscarScores={wiscarScores}
          onRestart={() => {
            setPsychometricScores(null);
            setTechnicalScores(null);
            setWiscarScores(null);
            goToStep("hero");
          }}
        />
      );
    
    default:
      return <AssessmentHero onStartAssessment={() => goToStep("introduction")} />;
  }
}