export type EntityType = "vehicle" | "property";

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  tags: string[];
  images: string[];
  price: number;
}

export interface Vehicle extends Entity {
  type: "vehicle";
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelEfficiency: number;
  accidents: number;
  majorRepairs: { year: number; description: string }[];
}

export interface Property extends Entity {
  type: "property";
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  neighborhood: string;
  schoolDistrict: string;
  distanceToPublicTransport: number;
  renovated: boolean;
}

export interface ComparisonSummary {
  similarities: string[];
  differences: string[];
  redFlags: string[];
  naturalLanguageSummary: string;
}

export interface RecommendationResult {
  recommendedEntityId: string;
  score: number;
  reasoning: string;
  breakdown: {
    entityId: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
  }[];
}

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  options: string[];
  entityType: EntityType;
}
