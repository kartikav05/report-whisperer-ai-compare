
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { QuestionnaireQuestion } from "@/types/comparison";

interface QuestionnaireSurveyProps {
  questions: QuestionnaireQuestion[];
  onComplete: (responses: Record<string, string>) => void;
}

const QuestionnaireSurvey = ({ questions, onComplete }: QuestionnaireSurveyProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  
  const handleNext = () => {
    if (currentResponse) {
      // Save current response
      const updatedResponses = { 
        ...responses, 
        [questions[currentIndex].id]: currentResponse 
      };
      setResponses(updatedResponses);
      
      if (currentIndex < questions.length - 1) {
        // Move to next question
        setCurrentIndex(currentIndex + 1);
        setCurrentResponse(null);
      } else {
        // Complete the questionnaire
        onComplete(updatedResponses);
      }
    }
  };

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  
  if (!currentQuestion) {
    return null;
  }
  
  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M12 18v-6"/>
            <path d="M8 15h8"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Help us understand your needs</h2>
          <p className="text-sm text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">{currentQuestion.question}</h3>
          <RadioGroup onValueChange={setCurrentResponse} value={currentResponse || undefined}>
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            {`${Math.round(((currentIndex + 1) / questions.length) * 100)}% complete`}
          </div>
          <Button 
            onClick={handleNext}
            disabled={!currentResponse}
          >
            {isLastQuestion ? "Complete" : "Next Question"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionnaireSurvey;
