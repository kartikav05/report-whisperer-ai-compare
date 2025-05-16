import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { vehicleMockData, propertyMockData } from "@/data/mockData";
import { Entity, EntityType } from "@/types/comparison";
import TagBadge from "@/components/TagBadge";
import { toast } from "sonner";
import SearchReport from "@/components/SearchReport";
import ReportViewModal from "@/components/ReportViewModal";
import { Search } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EntityType>("vehicle");
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [showSearch, setShowSearch] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Get entity data based on active tab
  const getEntitiesByType = (): Entity[] => {
    switch (activeTab) {
      case "vehicle":
        return vehicleMockData;
      case "property":
        return propertyMockData;
      default:
        return [];
    }
  };

  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => {
      const newSelection = { ...prev };
      
      // If item is already selected, deselect it
      if (newSelection[id]) {
        delete newSelection[id];
        return newSelection;
      }
      
      // If trying to select more than 3 items, show error
      if (Object.values(newSelection).filter(Boolean).length >= 3) {
        toast.error("You can only compare up to 3 items at a time", {
          style: {
            background: '#FEE2E2',
            color: '#DC2626',
            border: '1px solid #FCA5A5',
          },
        });
        return prev;
      }
      
      // Otherwise, select the item
      newSelection[id] = true;
      return newSelection;
    });
  };

  // Count selected items
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  // Handle compare button click
  const handleCompare = () => {
    const selectedIds = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([id, _]) => id);

    if (selectedIds.length < 2) {
      toast.error("Please select at least 2 items to compare");
      return;
    }

    // Navigate to comparison page with selected IDs
    navigate(`/compare?ids=${selectedIds.join(',')}`);
  };

  // Handle adding a report to comparison
  const handleAddToComparison = (reportId: string) => {
    // Find the report in the mock data
    const report = [...vehicleMockData, ...propertyMockData].find(
      (item) => item.id === reportId
    );

    if (report) {
      setSelectedItems(prev => {
        const newSelection = { ...prev };
        
        // If trying to select more than 3 items, show error
        if (Object.values(newSelection).filter(Boolean).length >= 3) {
          toast.error("You can only compare up to 3 items at a time", {
            style: {
              background: '#FEE2E2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
            },
          });
          return prev;
        }
        
        // Add the report to selection
        newSelection[report.id] = true;
        return newSelection;
      });
      
      setSelectedReport(null);
      setShowSearch(false); // Return to main view
      toast.success("Report added to comparison");
    }
  };

  // Handle viewing a report
  const handleViewReport = (report: any) => {
    setSelectedReport(report);
  };

  // Render vehicle card with proper type safety
  const renderVehicleCard = (vehicle: Entity) => {
    if (vehicle.type !== 'vehicle') return null;
    return (
      <Card key={vehicle.id} className="overflow-hidden border">
        <div className="relative">
          <div className="absolute top-3 left-3 z-10">
            <Checkbox 
              checked={selectedItems[vehicle.id] || false}
              onCheckedChange={() => toggleItemSelection(vehicle.id)}
              className="h-5 w-5 border-2 bg-white"
            />
          </div>
          <div className="h-48 bg-gray-100">
            <img 
              src={vehicle.images[0] || "/placeholder.svg"}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{vehicle.name}</h3>
          <div className="flex flex-wrap gap-1 mb-3">
            {vehicle.tags.map((tag, i) => (
              <TagBadge key={i} tag={tag} />
            ))}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Year:</span>
              <span className="font-medium">{vehicle.year}</span>
            </div>
            <div className="flex justify-between">
              <span>Mileage:</span>
              <span className="font-medium">{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">${vehicle.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // Render property card with proper type safety
  const renderPropertyCard = (property: Entity) => {
    if (property.type !== 'property') return null;
    return (
      <Card key={property.id} className="overflow-hidden border">
        <div className="relative">
          <div className="absolute top-3 left-3 z-10">
            <Checkbox 
              checked={selectedItems[property.id] || false}
              onCheckedChange={() => toggleItemSelection(property.id)}
              className="h-5 w-5 border-2 bg-white"
            />
          </div>
          <div className="h-48 bg-gray-100">
            <img 
              src={property.images[0] || "/placeholder.svg"}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
          <div className="flex flex-wrap gap-1 mb-3">
            {property.tags.map((tag, i) => (
              <TagBadge key={i} tag={tag} />
            ))}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">${property.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="font-medium">{property.bedrooms}BD/{property.bathrooms}BA, {property.squareFeet} sqft</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium">{property.neighborhood}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          AI-Powered Report Comparison
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Select multiple items below to compare details, spot differences,
          and get AI-powered recommendations tailored to your needs.
        </p>

        <div className="flex justify-center mb-3">
          <div className="bg-blue-50 rounded-md p-4 inline-block">
            <div className="flex items-start">
              <div className="mr-3 mt-1 text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <div className="text-left text-blue-700">
                <p className="font-medium mb-1">How to use this tool</p>
                <ol className="list-decimal pl-5 text-sm">
                  <li>Select the category you want to compare (Vehicles or Properties)</li>
                  <li>Select two or more items by checking the boxes</li>
                  <li>Click "Compare Selected" to view the detailed comparison</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowSearch(true)}
          className="mt-6 bg-blue-600 hover:bg-blue-700"
        >
          <Search className="h-4 w-4 mr-2" />
          Search for a new report
        </Button>
      </div>
      
      {showSearch ? (
        <SearchReport 
          onAddToComparison={handleAddToComparison}
          onViewReport={handleViewReport}
        />
      ) : (
        <>
          <div className="mb-8">
            <Tabs defaultValue="vehicle" onValueChange={(value) => setActiveTab(value as EntityType)}>
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-blue-50 rounded-lg">
                <TabsTrigger 
                  value="vehicle" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2 py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M14 16H9m11 0h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1m-4-3H8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1m4 3v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1m4-3H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1"/>
                  </svg>
                  Vehicles
                </TabsTrigger>
                <TabsTrigger 
                  value="property" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2 py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Properties
                </TabsTrigger>
              </TabsList>
              
              {/* Vehicle Tab */}
              <TabsContent value="vehicle" className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">Vehicle Reports</h2>
                  <p className="text-blue-700">Browse and compare detailed vehicle reports including history, specifications, and condition.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicleMockData.map((vehicle) => renderVehicleCard(vehicle))}
                </div>
              </TabsContent>
              
              {/* Property Tab */}
              <TabsContent value="property" className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">Property Reports</h2>
                  <p className="text-blue-700">Explore and compare property reports with detailed information about location, features, and value.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {propertyMockData.map((property) => renderPropertyCard(property))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Compare Button */}
          <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40">
            <Button 
              onClick={handleCompare}
              disabled={selectedCount < 2}
              className="px-8 py-6 text-lg shadow-lg"
              size="lg"
            >
              Compare Selected ({selectedCount}/3)
            </Button>
          </div>
        </>
      )}

      {/* Report View Modal */}
      <ReportViewModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
        onAddToComparison={handleAddToComparison}
      />
    </div>
  );
};

export default Index;
