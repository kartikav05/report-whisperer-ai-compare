export type EntityType = "vehicle" | "property";

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  tags: string[];
  images: string[];
  price: number;
  vin?: string;
}

export interface Vehicle extends Entity {
  type: "vehicle";
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelEfficiency: number;
  accidents: number;
  majorRepairs: { year: number; description: string }[];
  engineSize: number;
  horsepower: number;
  transmission: string;
  drivetrain: string;
  safetyRating: number;
  maintenanceCost: number;
  resaleValue: number;
  warranty: string;
  features: string[];
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
  propertyTax: number;
  hoaFees: number;
  parkingSpaces: number;
  energyEfficiency: number;
  walkScore: number;
  transitScore: number;
  crimeRate: string;
  appreciationRate: number;
  rentalPotential: number;
  features: string[];
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
