import { EntityType } from "@/types/comparison";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      default:
        return "Compare details and features side by side.";
    }
  };

  // Get icon based on entity type
  const getIcon = () => {
    switch (entityType) {
      case 'vehicle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 17H3v-6l2-5h12l2 5v6h-2M5 17v-2h14v2"/>
          </svg>
        );
      case 'property':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm mb-8 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h1>
            <p className="text-gray-600">{getDescription()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={onReset}
            size="sm"
            className="hover:bg-gray-50"
          >
            Start New Comparison
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="hover:bg-gray-50"
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
            className="bg-blue-600 hover:bg-blue-700"
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
    </motion.div>
  );
};

export default ComparisonHeader;
