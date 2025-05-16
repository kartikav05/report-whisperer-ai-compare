
import { Entity, RecommendationResult as RecommendationResultType } from "@/types/comparison";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RecommendationResultProps {
  result: RecommendationResultType;
  entities: Entity[];
}

const RecommendationResult = ({ result, entities }: RecommendationResultProps) => {
  // Find the recommended entity
  const recommendedEntity = entities.find(e => e.id === result.recommendedEntityId);
  
  if (!recommendedEntity) {
    return <div>Error: Recommended entity not found</div>;
  }
  
  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Recommendation</h2>
          <p className="text-sm text-gray-500">Based on your preferences</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-lg mb-2">
            We recommend: <span className="text-blue-600 font-semibold">{recommendedEntity.name}</span>
          </h3>
          <p className="text-gray-700">{result.reasoning}</p>
        </div>
        
        <h4 className="font-medium mb-2">Score breakdown</h4>
        <div className="space-y-4">
          {result.breakdown.map((item) => {
            const entity = entities.find(e => e.id === item.entityId);
            if (!entity) return null;
            
            return (
              <div key={item.entityId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{entity.name}</span>
                  <span className="text-sm font-medium">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2" />
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-1">
                  <div>
                    <span className="text-green-600 font-medium">Strengths: </span>
                    <ul className="list-disc pl-5 text-gray-600">
                      {item.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-amber-600 font-medium">Weaknesses: </span>
                    <ul className="list-disc pl-5 text-gray-600">
                      {item.weaknesses.map((weak, i) => (
                        <li key={i}>{weak}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="rounded-md bg-muted p-4">
        <div className="flex items-start">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div className="text-sm">
            <p className="font-medium mb-1">About this recommendation</p>
            <p className="text-muted-foreground">
              This recommendation is based on AI analysis of your preferences and the data available for each option.
              The scoring system evaluates features you indicated as important.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecommendationResult;
