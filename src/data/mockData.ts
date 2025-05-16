import { Entity, QuestionnaireQuestion } from "../types/comparison";

export const vehicleMockData: Entity[] = [
  {
    id: "v1",
    name: "2020 Toyota Camry XSE",
    type: "vehicle",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 35000,
    price: 22500,
    fuelEfficiency: 32,
    accidents: 0,
    majorRepairs: [],
    images: [
      "https://images.unsplash.com/photo-1617469767053-3c4f2a6c1aa0?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1617469767053-3c4f2a6c1aa0?q=80&w=1470&auto=format"
    ],
    tags: ["Low Mileage", "No Accidents", "Fuel Efficient"],
  },
  {
    id: "v2",
    name: "2019 Honda Accord Sport",
    type: "vehicle",
    make: "Honda",
    model: "Accord",
    year: 2019,
    mileage: 42000,
    price: 20800,
    fuelEfficiency: 30,
    accidents: 1,
    majorRepairs: [{ year: 2022, description: "Transmission repair" }],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format"
    ],
    tags: ["Good Value", "Minor Accident"],
  },
  {
    id: "v3",
    name: "2021 Tesla Model 3 Long Range",
    type: "vehicle",
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    mileage: 28000,
    price: 38500,
    fuelEfficiency: 130, // MPGe
    accidents: 0,
    majorRepairs: [],
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1470&auto=format"
    ],
    tags: ["Electric", "High Tech", "Premium"],
  },
  {
    id: "v4",
    name: "2018 Ford F-150 XLT",
    type: "vehicle",
    make: "Ford",
    model: "F-150",
    year: 2018,
    mileage: 58000,
    price: 24900,
    fuelEfficiency: 22,
    accidents: 2,
    majorRepairs: [{ year: 2021, description: "Engine rebuild" }],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format"
    ],
    tags: ["Truck", "Powerful", "High Capacity"],
  },
  {
    id: "v5",
    name: "2022 Subaru Outback Wilderness",
    type: "vehicle",
    make: "Subaru",
    model: "Outback",
    year: 2022,
    mileage: 15000,
    price: 28700,
    fuelEfficiency: 29,
    accidents: 0,
    majorRepairs: [],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format"
    ],
    tags: ["AWD", "Like New", "Low Mileage"],
  },
  {
    id: "v6",
    name: "2017 BMW 330i M Sport",
    type: "vehicle",
    make: "BMW",
    model: "3 Series",
    year: 2017,
    mileage: 62000,
    price: 19500,
    fuelEfficiency: 27,
    accidents: 1,
    majorRepairs: [{ year: 2020, description: "Electrical system repair" }],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format"
    ],
    tags: ["Luxury", "Sport", "German Engineering"],
  },
];

export const propertyMockData: Entity[] = [
  {
    id: "p1",
    name: "The Metropolitan - Unit 505",
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
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1473&auto=format"
    ],
    tags: ["Urban", "New Construction", "Close to Transit"],
  },
  {
    id: "p2",
    name: "Oak Lane Family Estate",
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
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format"
    ],
    tags: ["Family Friendly", "Renovated", "Good Schools"],
  },
  {
    id: "p3",
    name: "Woodland Valley Ranch",
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
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1470&auto=format"
    ],
    tags: ["Secluded", "Large Lot", "Nature Views"],
  },
  {
    id: "p4",
    name: "Costa Vista Oceanfront Villa",
    type: "property",
    address: "101 Shoreline Dr, Costa Vista",
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3800,
    yearBuilt: 2010,
    neighborhood: "Costa Vista",
    schoolDistrict: "Coastal Unified",
    distanceToPublicTransport: 3.2,
    renovated: true,
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1480&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format"
    ],
    tags: ["Waterfront", "Luxury", "Private Beach"],
  },
  {
    id: "p5",
    name: "The Artist Lofts - Unit 3B",
    type: "property",
    address: "505 Artist Way, Metropolis",
    price: 315000,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 950,
    yearBuilt: 1985,
    neighborhood: "Arts District",
    schoolDistrict: "Metro Central",
    distanceToPublicTransport: 0.1,
    renovated: true,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1473&auto=format"
    ],
    tags: ["Loft", "High Ceiling", "Arts District"],
  },
  {
    id: "p6",
    name: "Alpine Heights Mountain Lodge",
    type: "property",
    address: "777 Summit Ridge, Alpine Heights",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    yearBuilt: 2000,
    neighborhood: "Alpine Heights",
    schoolDistrict: "Mountain Valley",
    distanceToPublicTransport: 8.5,
    renovated: false,
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1470&auto=format",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1470&auto=format"
    ],
    tags: ["Mountain Views", "Fireplace", "Hiking Trails"],
  },
];

export const allEntities: Entity[] = [
  ...vehicleMockData,
  ...propertyMockData,
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
  naturalLanguageSummary: "Car A (2020 Toyota Camry XSE) has lower mileage and no accident history compared to Car B (2019 Honda Accord Sport), which had a minor collision and required a transmission repair in 2022. However, Car B is $1,700 less expensive, potentially making it a better value if you're comfortable with its repair history.",
};

export const mockRecommendationResult = {
  recommendedEntityId: "v1",
  score: 85,
  reasoning: "Based on your preferences for fuel efficiency and clean history, the 2020 Toyota Camry XSE is the better match. Its lower mileage and accident-free history align with your priorities.",
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
