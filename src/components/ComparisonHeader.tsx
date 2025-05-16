
import { EntityType } from "@/types/comparison";
import { Button } from "@/components/ui/button";

interface ComparisonHeaderProps {
  entityType: EntityType;
  entityCount: number;
  onReset: () => void;
}

const ComparisonHeader = ({ entityType, entityCount, onReset }: ComparisonHeaderProps) => {
  // Get title based on entity type
  const getTitle = () => {
    switch (entityType) {
      case 'vehicle':
        return `Comparing ${entityCount} Vehicles`;
      case 'property':
        return `Comparing ${entityCount} Properties`;
      case 'person':
        return `Comparing ${entityCount} Profiles`;
      default:
        return `Comparing ${entityCount} Items`;
    }
  };
  
  // Get description based on entity type
  const getDescription = () => {
    switch (entityType) {
      case 'vehicle':
        return "Compare specifications, history, and value of these vehicles to make an informed decision.";
      case 'property':
        return "Compare locations, features, and value of these properties to find your ideal home.";
      case 'person':
        return "Compare background information, history, and verification of these profiles.";
      default:
        return "Compare details and features side by side.";
    }
  };
  
  return (
    <div className="pb-6 mb-6 border-b">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{getTitle()}</h1>
          <p className="text-gray-600 mt-1">{getDescription()}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={onReset}
            size="sm"
          >
            Start New Comparison
          </Button>
          <Button 
            variant="outline"
            size="sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export PDF
          </Button>
          <Button 
            size="sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonHeader;
