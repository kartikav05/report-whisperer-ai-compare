
import { Entity, QuestionnaireQuestion } from "../types/comparison";

export const vehicleMockData: Entity[] = [
  {
    id: "v1",
    name: "2020 Toyota Camry",
    type: "vehicle",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 35000,
    price: 22500,
    fuelEfficiency: 32,
    accidents: 0,
    majorRepairs: [],
    images: ["/placeholder.svg"],
    tags: ["Low Mileage", "No Accidents", "Fuel Efficient"],
  },
  {
    id: "v2",
    name: "2019 Honda Accord",
    type: "vehicle",
    make: "Honda",
    model: "Accord",
    year: 2019,
    mileage: 42000,
    price: 20800,
    fuelEfficiency: 30,
    accidents: 1,
    majorRepairs: [{ year: 2022, description: "Transmission repair" }],
    images: ["/placeholder.svg"],
    tags: ["Good Value", "Minor Accident"],
  },
  {
    id: "v3",
    name: "2021 Tesla Model 3",
    type: "vehicle",
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    mileage: 28000,
    price: 38500,
    fuelEfficiency: 130, // MPGe
    accidents: 0,
    majorRepairs: [],
    images: ["/placeholder.svg"],
    tags: ["Electric", "High Tech", "Premium"],
  },
];

export const propertyMockData: Entity[] = [
  {
    id: "p1",
    name: "Modern Downtown Condo",
    type: "property",
    address: "123 Main St #505, Metropolis",
    price: 425000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    yearBuilt: 2018,
    neighborhood: "Downtown",
    schoolDistrict: "Metro Central",
    distanceToPublicTransport: 0.2,
    renovated: false,
    images: ["/placeholder.svg"],
    tags: ["Urban", "New Construction", "Close to Transit"],
  },
  {
    id: "p2",
    name: "Suburban Family Home",
    type: "property",
    address: "456 Oak Lane, Pleasantville",
    price: 550000,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2400,
    yearBuilt: 2005,
    neighborhood: "Pleasant Hills",
    schoolDistrict: "Pleasant Valley",
    distanceToPublicTransport: 1.8,
    renovated: true,
    images: ["/placeholder.svg"],
    tags: ["Family Friendly", "Renovated", "Good Schools"],
  },
  {
    id: "p3",
    name: "Rustic Countryside Retreat",
    type: "property",
    address: "789 Rural Route, Woodsville",
    price: 375000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 1995,
    neighborhood: "Woodlands",
    schoolDistrict: "Rural County",
    distanceToPublicTransport: 5.5,
    renovated: false,
    images: ["/placeholder.svg"],
    tags: ["Secluded", "Large Lot", "Nature Views"],
  },
];

export const personMockData: Entity[] = [
  {
    id: "person1",
    name: "Jane Doe",
    type: "person",
    age: 34,
    occupation: "Software Engineer",
    creditScore: 780,
    criminalRecord: false,
    verifiedIdentity: true,
    socialMediaPresence: "medium",
    employmentHistory: [
      { years: 5, employer: "Tech Solutions Inc." },
      { years: 3, employer: "Digital Innovations" },
    ],
    image: "/placeholder.svg",
    tags: ["Excellent Credit", "Stable Employment", "Verified"],
  },
  {
    id: "person2",
    name: "John Smith",
    type: "person",
    age: 28,
    occupation: "Marketing Specialist",
    creditScore: 695,
    criminalRecord: false,
    verifiedIdentity: true,
    socialMediaPresence: "high",
    employmentHistory: [
      { years: 2, employer: "Market Leaders" },
      { years: 1, employer: "Growth Hackers" },
    ],
    image: "/placeholder.svg",
    tags: ["Good Credit", "Job Hopper", "Active Online"],
  },
  {
    id: "person3",
    name: "Michael Johnson",
    type: "person",
    age: 42,
    occupation: "Construction Manager",
    creditScore: 620,
    criminalRecord: true,
    verifiedIdentity: true,
    socialMediaPresence: "low",
    employmentHistory: [
      { years: 8, employer: "Build Right Construction" },
      { years: 4, employer: "Solid Foundations Inc." },
    ],
    image: "/placeholder.svg",
    tags: ["Fair Credit", "Criminal Record", "Long Employment"],
  },
];

export const allEntities: Entity[] = [
  ...vehicleMockData,
  ...propertyMockData,
  ...personMockData,
];

export const questionnaireQuestions: QuestionnaireQuestion[] = [
  {
    id: "q1-vehicle",
    question: "Do you prioritize fuel efficiency or resale value?",
    options: ["Fuel Efficiency", "Resale Value", "Both Equally"],
    entityType: "vehicle",
  },
  {
    id: "q2-vehicle",
    question: "Will this car be used for city or off-road driving?",
    options: ["City Driving", "Off-Road", "Mixed Use"],
    entityType: "vehicle",
  },
  {
    id: "q3-vehicle",
    question: "How important is the vehicle's history to you?",
    options: ["Very Important", "Somewhat Important", "Not Important"],
    entityType: "vehicle",
  },
  {
    id: "q1-property",
    question: "Do you need a quiet neighborhood or proximity to public transport?",
    options: ["Quiet Neighborhood", "Close to Public Transport", "Both if possible"],
    entityType: "property",
  },
  {
    id: "q2-property",
    question: "Is the school district a priority for you?",
    options: ["High Priority", "Medium Priority", "Not Important"],
    entityType: "property",
  },
  {
    id: "q3-property",
    question: "Would you prefer newer construction or a renovated older property?",
    options: ["Newer Construction", "Renovated Older Property", "No Preference"],
    entityType: "property",
  },
  {
    id: "q1-person",
    question: "Are you looking to verify identity or check criminal background?",
    options: ["Identity Verification", "Criminal Background", "Both"],
    entityType: "person",
  },
  {
    id: "q2-person",
    question: "Is social media presence relevant to you?",
    options: ["Very Relevant", "Somewhat Relevant", "Not Relevant"],
    entityType: "person",
  },
  {
    id: "q3-person",
    question: "How important is credit history for your decision?",
    options: ["Extremely Important", "Moderately Important", "Not Important"],
    entityType: "person",
  },
];

export const mockComparisonSummary = {
  similarities: [
    "Both are sedans with similar passenger capacity",
    "Both have good safety ratings",
    "Similar fuel tank capacity",
  ],
  differences: [
    "Car A has lower mileage (35K vs 42K miles)",
    "Car A has no accident history, Car B was in a minor collision",
    "Car B is priced $1,700 lower than Car A",
  ],
  redFlags: [
    "Car B required a major transmission repair in 2022",
  ],
  naturalLanguageSummary: "Car A (2020 Toyota Camry) has lower mileage and no accident history compared to Car B (2019 Honda Accord), which had a minor collision and required a transmission repair in 2022. However, Car B is $1,700 less expensive, potentially making it a better value if you're comfortable with its repair history.",
};

export const mockRecommendationResult = {
  recommendedEntityId: "v1",
  score: 85,
  reasoning: "Based on your preferences for fuel efficiency and clean history, the 2020 Toyota Camry is the better match. Its lower mileage and accident-free history align with your priorities.",
  breakdown: [
    {
      entityId: "v1",
      score: 85,
      strengths: ["No accident history", "Lower mileage", "Better fuel efficiency"],
      weaknesses: ["Higher price point"],
    },
    {
      entityId: "v2",
      score: 70,
      strengths: ["Lower price", "Similar features"],
      weaknesses: ["Previous accident", "Major transmission repair", "Higher mileage"],
    },
  ],
};
