import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Entity, EntityType, ComparisonSummary, RecommendationResult, Vehicle, Property } from "@/types/comparison";
import { 
  allEntities, 
  questionnaireQuestions,
} from "@/data/mockData";
import { 
  getEntityById,
  generateComparisonSummary,
  generateRecommendation,
} from "@/utils/comparisonUtils";

import Layout from "@/components/Layout";
import ComparisonHeader from "@/components/ComparisonHeader";
import ComparisonCard from "@/components/ComparisonCard";
import AISummary from "@/components/AISummary";
import QuestionnaireSurvey from "@/components/QuestionnaireSurvey";
import RecommendationResultComponent from "@/components/RecommendationResult";
import ChartSelector from "@/components/Charts/ChartSelector";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse entity IDs from query params
  const searchParams = new URLSearchParams(location.search);
  const idsParam = searchParams.get("ids");
  const entityIds = idsParam ? idsParam.split(",") : [];
  
  const [entities, setEntities] = useState<(Vehicle | Property)[]>([]);
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
      // Enforce maximum of 3 entities
      if (entityIds.length > 3) {
        toast.error("Cannot compare more than 3 items", {
          style: {
            background: '#FEE2E2',
            color: '#DC2626',
            border: '1px solid #FCA5A5',
          },
        });
        navigate('/');
        return;
      }

      const loadedEntities = entityIds
        .map(id => getEntityById(allEntities, id))
        .filter((entity): entity is Vehicle | Property => entity !== undefined);
        
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
          toast.error("Cannot compare different types of entities", {
            style: {
              background: '#FEE2E2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
            },
          });
          navigate('/');
        }
      } else {
        // Handle error - no entities found
        toast.error("No valid entities found for comparison", {
          style: {
            background: '#FEE2E2',
            color: '#DC2626',
            border: '1px solid #FCA5A5',
          },
        });
        navigate('/');
      }
    } else {
      // Handle error - no entity IDs
      navigate('/');
    }
  }, [entityIds, navigate]);
  
  // Generate chart data for visual comparison
  const generateChartData = (entitiesToCompare: (Vehicle | Property)[]) => {
    if (entitiesToCompare.length !== 2) return;
    
    const [entity1, entity2] = entitiesToCompare;
    
    if (entity1.type === 'vehicle' && entity2.type === 'vehicle') {
      setChartData([
        {
          name: "Price ($K)",
          entity1: entity1.price / 1000,
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
        {
          name: "Horsepower",
          entity1: entity1.horsepower,
          entity2: entity2.horsepower,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Safety Rating",
          entity1: entity1.safetyRating,
          entity2: entity2.safetyRating,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Maintenance Cost ($)",
          entity1: entity1.maintenanceCost,
          entity2: entity2.maintenanceCost,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Resale Value (%)",
          entity1: entity1.resaleValue,
          entity2: entity2.resaleValue,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        }
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
        {
          name: "Energy Efficiency",
          entity1: entity1.energyEfficiency,
          entity2: entity2.energyEfficiency,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Walk Score",
          entity1: entity1.walkScore,
          entity2: entity2.walkScore,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Transit Score",
          entity1: entity1.transitScore,
          entity2: entity2.transitScore,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Appreciation Rate (%)",
          entity1: entity1.appreciationRate,
          entity2: entity2.appreciationRate,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        },
        {
          name: "Rental Potential ($)",
          entity1: entity1.rentalPotential,
          entity2: entity2.rentalPotential,
          entity1Name: entity1.name,
          entity2Name: entity2.name,
        }
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
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <ComparisonHeader 
          entityType={entityType}
          entityCount={entities.length}
          onReset={handleReset}
        />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Comparison Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {entities.map((entity, index) => (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ComparisonCard 
                  entity={entity} 
                  highlighted={recommendation?.recommendedEntityId === entity.id}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Visual Comparison Charts */}
          {chartData.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border rounded-xl p-8 shadow-sm mb-12 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M3 3v18h18"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Visual Comparison</h2>
                  <p className="text-gray-600 mt-1">Explore different visualizations to compare {entityType === 'vehicle' ? 'vehicles' : 'properties'}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <ChartSelector data={chartData} />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">💡 Pro Tip</h3>
                  <p className="text-sm text-blue-700">
                    Try different chart types to better understand the comparison. Each visualization offers a unique perspective on the data.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-800 mb-2">📊 Chart Guide</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Bar Chart: Compare individual metrics</li>
                    <li>• Line Chart: See trends across metrics</li>
                    <li>• Radar Chart: Compare multiple dimensions</li>
                    <li>• Area Chart: Visualize cumulative values</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* AI Summary */}
          {comparisonSummary && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <AISummary summary={comparisonSummary} entities={entities} />
            </motion.div>
          )}
          
          {/* Questionnaire or Recommendation */}
          {!recommendation && !showQuestionnaire && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mb-12"
            >
              <button 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium text-lg"
                onClick={() => setShowQuestionnaire(true)}
              >
                Help Me Decide
              </button>
            </motion.div>
          )}
          
          {showQuestionnaire && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <QuestionnaireSurvey 
                questions={relevantQuestions} 
                onComplete={handleQuestionnaireComplete}
              />
            </motion.div>
          )}
          
          {recommendation && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <RecommendationResultComponent 
                result={recommendation}
                entities={entities}
              />
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ComparisonPage;
