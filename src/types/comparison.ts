
export type EntityType = 'vehicle' | 'property' | 'person';

export interface BaseEntity {
  id: string;
  name: string;
  type: EntityType;
}

export interface Vehicle extends BaseEntity {
  type: 'vehicle';
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelEfficiency: number; // mpg
  accidents: number;
  majorRepairs: { year: number; description: string }[];
  images: string[];
  tags: string[];
}

export interface Property extends BaseEntity {
  type: 'property';
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  neighborhood: string;
  schoolDistrict: string;
  distanceToPublicTransport: number; // in miles
  renovated: boolean;
  images: string[];
  tags: string[];
}

export interface Person extends BaseEntity {
  type: 'person';
  age: number;
  occupation: string;
  creditScore: number;
  criminalRecord: boolean;
  verifiedIdentity: boolean;
  socialMediaPresence: 'high' | 'medium' | 'low' | 'none';
  employmentHistory: { years: number; employer: string }[];
  image: string;
  tags: string[];
}

export type Entity = Vehicle | Property | Person;

export interface ComparisonSummary {
  similarities: string[];
  differences: string[];
  redFlags: string[];
  naturalLanguageSummary: string;
}

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  options: string[];
  entityType: EntityType;
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
