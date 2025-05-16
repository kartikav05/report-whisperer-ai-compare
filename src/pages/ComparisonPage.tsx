
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Entity, EntityType, ComparisonSummary, RecommendationResult } from "@/types/comparison";
import { 
  allEntities, 
  questionnaireQuestions,
} from "@/data/mockData";
import { 
  getEntityById,
  generateComparisonSummary,
  generateRecommendation,
} from "@/utils/comparisonUtils";

import ComparisonHeader from "@/components/ComparisonHeader";
import ComparisonCard from "@/components/ComparisonCard";
import AISummary from "@/components/AISummary";
import QuestionnaireSurvey from "@/components/QuestionnaireSurvey";
import RecommendationResultComponent from "@/components/RecommendationResult";
import ComparisonChart from "@/components/Charts/ComparisonChart";
import { toast } from "sonner";

const ComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse entity IDs from query params
  const searchParams = new URLSearchParams(location.search);
  const idsParam = searchParams.get("ids");
  const entityIds = idsParam ? idsParam.split(",") : [];
  
  const [entities, setEntities] = useState<Entity[]>([]);
  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [comparisonSummary, setComparisonSummary] = useState<ComparisonSummary | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Reset the comparison
  const handleReset = () => {
    navigate('/');
  };
  
  // Complete the questionnaire and generate recommendation
  const handleQuestionnaireComplete = (responses: Record<string, string>) => {
    // Generate recommendation
    const result = generateRecommendation(entities, responses);
    setRecommendation(result);
    
    toast.success("Recommendation generated!");
    setShowQuestionnaire(false);
  };
  
  // Load entities from IDs
  useEffect(() => {
    if (entityIds.length > 0) {
      const loadedEntities = entityIds
        .map(id => getEntityById(allEntities, id))
        .filter((entity): entity is Entity => entity !== undefined);
        
      if (loadedEntities.length > 0) {
        // Check if all entities are of the same type
        const firstType = loadedEntities[0].type;
        const allSameType = loadedEntities.every(entity => entity.type === firstType);
        
        if (allSameType) {
          setEntities(loadedEntities);
          setEntityType(firstType);
          
          // Generate comparison summary
          const summary = generateComparisonSummary(loadedEntities);
          setComparisonSummary(summary);
          
          // Generate chart data for comparison
          if (loadedEntities.length === 2) {
            generateChartData(loadedEntities);
          }
        } else {
          // Handle error - mixed types
          toast.error("Cannot compare different types of entities");
          navigate('/');
        }
      } else {
        // Handle error - no entities found
        toast.error("No valid entities found for comparison");
        navigate('/');
      }
    } else {
      // Handle error - no entity IDs
      navigate('/');
    }
  }, [entityIds, navigate]);
  
  // Generate chart data for visual comparison
  const generateChartData = (entitiesToCompare: Entity[]) => {
    if (entitiesToCompare.length !== 2) return;
    
    const [entity1, entity2] = entitiesToCompare;
    
    if (entity1.type === 'vehicle' && entity2.type === 'vehicle') {
      setChartData([
        {
          name: "Price ($)",
          entity1: entity1.price / 1000, // Scaled for display
          entity2: entity2.price / 1000,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Mileage (K)",
          entity1: entity1.mileage / 1000,
          entity2: entity2.mileage / 1000,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Fuel Efficiency",
          entity1: entity1.fuelEfficiency,
          entity2: entity2.fuelEfficiency,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
      ]);
    } else if (entity1.type === 'property' && entity2.type === 'property') {
      setChartData([
        {
          name: "Price ($K)",
          entity1: entity1.price / 1000,
          entity2: entity2.price / 1000,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Square Feet",
          entity1: entity1.squareFeet,
          entity2: entity2.squareFeet,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Age (Years)",
          entity1: new Date().getFullYear() - entity1.yearBuilt,
          entity2: new Date().getFullYear() - entity2.yearBuilt,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
      ]);
    } else if (entity1.type === 'person' && entity2.type === 'person') {
      setChartData([
        {
          name: "Credit Score",
          entity1: entity1.creditScore,
          entity2: entity2.creditScore,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Employment (Years)",
          entity1: entity1.employmentHistory.reduce((sum, job) => sum + job.years, 0),
          entity2: entity2.employmentHistory.reduce((sum, job) => sum + job.years, 0),
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
      ]);
    }
  };
  
  // If no entities or type, show loading
  if (entities.length === 0 || !entityType) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-700">Loading comparison...</h3>
          </div>
        </div>
      </div>
    );
  }
  
  // Filter questions based on entity type
  const relevantQuestions = questionnaireQuestions.filter(q => q.entityType === entityType);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <ComparisonHeader 
        entityType={entityType}
        entityCount={entities.length}
        onReset={handleReset}
      />
      
      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {entities.map((entity) => (
          <ComparisonCard 
            key={entity.id} 
            entity={entity} 
            highlighted={recommendation?.recommendedEntityId === entity.id}
          />
        ))}
      </div>
      
      {/* Visual Comparison Charts */}
      {chartData.length > 0 && (
        <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Visual Comparison</h2>
          <ComparisonChart data={chartData} />
        </div>
      )}
      
      {/* AI Summary */}
      {comparisonSummary && (
        <div className="mb-8">
          <AISummary summary={comparisonSummary} />
        </div>
      )}
      
      {/* Questionnaire or Recommendation */}
      {!recommendation && !showQuestionnaire && (
        <div className="flex justify-center mb-8">
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setShowQuestionnaire(true)}
          >
            Help Me Decide
          </button>
        </div>
      )}
      
      {showQuestionnaire && (
        <div className="mb-8">
          <QuestionnaireSurvey 
            questions={relevantQuestions} 
            onComplete={handleQuestionnaireComplete}
          />
        </div>
      )}
      
      {recommendation && (
        <div className="mb-8">
          <RecommendationResultComponent 
            result={recommendation}
            entities={entities}
          />
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;
