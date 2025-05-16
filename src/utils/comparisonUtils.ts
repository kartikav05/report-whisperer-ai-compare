
import { Entity, EntityType, ComparisonSummary, RecommendationResult } from "../types/comparison";
import { mockComparisonSummary, mockRecommendationResult } from "../data/mockData";

export const filterEntitiesByType = (entities: Entity[], type: EntityType): Entity[] => {
  return entities.filter(entity => entity.type === type);
};

export const getEntityById = (entities: Entity[], id: string): Entity | undefined => {
  return entities.find(entity => entity.id === id);
};

// In a real app, this would call an AI service
export const generateComparisonSummary = (
  entities: Entity[]
): ComparisonSummary => {
  // For the demo, we'll return mock data
  // In a real app, you would:
  // 1. Send entity details to an API endpoint
  // 2. Process with NLP/AI to find similarities, differences, flags
  // 3. Return structured comparison data
  console.log("Generating comparison summary for:", entities.map(e => e.name));
  return mockComparisonSummary;
};

// In a real app, this would use the questionnaire responses and entity data
export const generateRecommendation = (
  entities: Entity[],
  responses: Record<string, string>
): RecommendationResult => {
  // For the demo, we'll return mock data
  // In a real app, you would:
  // 1. Process questionnaire answers
  // 2. Weight features based on user preferences
  // 3. Score entities accordingly
  // 4. Generate personalized explanation
  console.log("Generating recommendation based on responses:", responses);
  return mockRecommendationResult;
};

export const getColorForTag = (tag: string): string => {
  const lowercaseTag = tag.toLowerCase();
  if (lowercaseTag.includes("no accidents") || lowercaseTag.includes("excellent") || 
      lowercaseTag.includes("verified") || lowercaseTag.includes("good schools") ||
      lowercaseTag.includes("low mileage") || lowercaseTag.includes("renovated")) {
    return "bg-green-100 text-green-800"; // Positive tags
  }
  if (lowercaseTag.includes("accident") || lowercaseTag.includes("repair") || 
      lowercaseTag.includes("criminal") || lowercaseTag.includes("fair credit")) {
    return "bg-amber-100 text-amber-800"; // Warning tags
  }
  if (lowercaseTag.includes("premium") || lowercaseTag.includes("high tech") || 
      lowercaseTag.includes("urban") || lowercaseTag.includes("stable")) {
    return "bg-blue-100 text-blue-800"; // Neutral/feature tags
  }
  return "bg-gray-100 text-gray-800"; // Default
};
