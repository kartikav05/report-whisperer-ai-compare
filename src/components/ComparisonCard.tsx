import { Entity, Vehicle, Property } from "@/types/comparison";
import TagBadge from "./TagBadge";

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
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">VIN:</div>
              <div className="text-sm font-mono">{entity.vin}</div>
              
              <div className="text-sm font-medium">Make:</div>
              <div className="text-sm">{entity.make}</div>
              
              <div className="text-sm font-medium">Model:</div>
              <div className="text-sm">{entity.model}</div>
              
              <div className="text-sm font-medium">Year:</div>
              <div className="text-sm">{entity.year}</div>
              
              <div className="text-sm font-medium">Mileage:</div>
              <div className="text-sm">{entity.mileage.toLocaleString()} miles</div>
              
              <div className="text-sm font-medium">Price:</div>
              <div className="text-sm">${entity.price.toLocaleString()}</div>
              
              <div className="text-sm font-medium">Fuel Efficiency:</div>
              <div className="text-sm">{entity.fuelEfficiency} mpg</div>
              
              <div className="text-sm font-medium">Accidents:</div>
              <div className="text-sm">{entity.accidents}</div>
            </div>
            
            {entity.majorRepairs.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium">Major Repairs:</div>
                <ul className="list-disc pl-5 text-sm">
                  {entity.majorRepairs.map((repair, index) => (
                    <li key={index} className="text-amber-600">
                      {repair.year}: {repair.description}
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
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Address:</div>
              <div className="text-sm">{entity.address}</div>
              
              <div className="text-sm font-medium">Price:</div>
              <div className="text-sm">${entity.price.toLocaleString()}</div>
              
              <div className="text-sm font-medium">Bedrooms:</div>
              <div className="text-sm">{entity.bedrooms}</div>
              
              <div className="text-sm font-medium">Bathrooms:</div>
              <div className="text-sm">{entity.bathrooms}</div>
              
              <div className="text-sm font-medium">Square Feet:</div>
              <div className="text-sm">{entity.squareFeet.toLocaleString()}</div>
              
              <div className="text-sm font-medium">Year Built:</div>
              <div className="text-sm">{entity.yearBuilt}</div>
              
              <div className="text-sm font-medium">Neighborhood:</div>
              <div className="text-sm">{entity.neighborhood}</div>
              
              <div className="text-sm font-medium">School District:</div>
              <div className="text-sm">{entity.schoolDistrict}</div>
              
              <div className="text-sm font-medium">Public Transit:</div>
              <div className="text-sm">{entity.distanceToPublicTransport} miles</div>
              
              <div className="text-sm font-medium">Renovated:</div>
              <div className="text-sm">{entity.renovated ? "Yes" : "No"}</div>
            </div>
          </>
        );
        
      default:
        return <div>Unknown entity type</div>;
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${
      highlighted ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
    }`}>
      <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 overflow-hidden">
        <img 
          src={entity.images[0] || "/placeholder.svg"} 
          alt={entity.name}
          className="w-full h-full object-cover" 
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{entity.name}</h3>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {entity.tags.map((tag, index) => (
          <TagBadge key={index} tag={tag} />
        ))}
      </div>
      
      {renderEntityDetails()}
    </div>
  );
};

export default ComparisonCard;
