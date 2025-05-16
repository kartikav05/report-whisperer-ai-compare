import { Entity, Vehicle, Property } from "@/types/comparison";
import TagBadge from "./TagBadge";
import { motion } from "framer-motion";

interface ComparisonCardProps {
  entity: Vehicle | Property;
  highlighted?: boolean;
}

const ComparisonCard = ({ entity, highlighted = false }: ComparisonCardProps) => {
  // Render fields based on entity type
  const renderEntityDetails = () => {
    switch (entity.type) {
      case 'vehicle':
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm font-medium text-gray-600">VIN:</div>
              <div className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">{entity.vin}</div>
              
              <div className="text-sm font-medium text-gray-600">Make:</div>
              <div className="text-sm">{entity.make}</div>
              
              <div className="text-sm font-medium text-gray-600">Model:</div>
              <div className="text-sm">{entity.model}</div>
              
              <div className="text-sm font-medium text-gray-600">Year:</div>
              <div className="text-sm">{entity.year}</div>
              
              <div className="text-sm font-medium text-gray-600">Mileage:</div>
              <div className="text-sm">{entity.mileage.toLocaleString()} miles</div>
              
              <div className="text-sm font-medium text-gray-600">Price:</div>
              <div className="text-sm font-semibold text-blue-600">${entity.price.toLocaleString()}</div>
              
              <div className="text-sm font-medium text-gray-600">Fuel Efficiency:</div>
              <div className="text-sm">{entity.fuelEfficiency} mpg</div>
              
              <div className="text-sm font-medium text-gray-600">Accidents:</div>
              <div className="text-sm">{entity.accidents}</div>
            </div>
            
            {entity.majorRepairs.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="text-sm font-medium text-amber-800 mb-2">Major Repairs:</div>
                <ul className="space-y-1">
                  {entity.majorRepairs.map((repair, index) => (
                    <li key={index} className="text-sm text-amber-700">
                      <span className="font-medium">{repair.year}:</span> {repair.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
        
      case 'property':
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-sm font-medium text-gray-600">Address:</div>
              <div className="text-sm">{entity.address}</div>
              
              <div className="text-sm font-medium text-gray-600">Price:</div>
              <div className="text-sm font-semibold text-blue-600">${entity.price.toLocaleString()}</div>
              
              <div className="text-sm font-medium text-gray-600">Bedrooms:</div>
              <div className="text-sm">{entity.bedrooms}</div>
              
              <div className="text-sm font-medium text-gray-600">Bathrooms:</div>
              <div className="text-sm">{entity.bathrooms}</div>
              
              <div className="text-sm font-medium text-gray-600">Square Feet:</div>
              <div className="text-sm">{entity.squareFeet.toLocaleString()}</div>
              
              <div className="text-sm font-medium text-gray-600">Year Built:</div>
              <div className="text-sm">{entity.yearBuilt}</div>
              
              <div className="text-sm font-medium text-gray-600">Neighborhood:</div>
              <div className="text-sm">{entity.neighborhood}</div>
              
              <div className="text-sm font-medium text-gray-600">School District:</div>
              <div className="text-sm">{entity.schoolDistrict}</div>
              
              <div className="text-sm font-medium text-gray-600">Public Transit:</div>
              <div className="text-sm">{entity.distanceToPublicTransport} miles</div>
              
              <div className="text-sm font-medium text-gray-600">Renovated:</div>
              <div className="text-sm">{entity.renovated ? "Yes" : "No"}</div>
            </div>
          </>
        );
        
      default:
        return <div>Unknown entity type</div>;
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
        highlighted ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
      }`}
    >
      <div className="aspect-square w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <img 
          src={entity.images[0] || "/placeholder.svg"} 
          alt={entity.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{entity.name}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {entity.tags.map((tag, index) => (
          <TagBadge key={index} tag={tag} />
        ))}
      </div>
      
      <div className="space-y-4">
        {renderEntityDetails()}
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
