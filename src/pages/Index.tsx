import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { vehicleMockData, propertyMockData } from "@/data/mockData";
import { Entity, EntityType, Vehicle, Property } from "@/types/comparison";
import TagBadge from "@/components/TagBadge";
import { toast } from "sonner";
import SearchReport from "@/components/SearchReport";
import ReportViewModal from "@/components/ReportViewModal";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

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
  const renderVehicleCard = (vehicle: Vehicle) => {
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
              <span>VIN:</span>
              <span className="font-medium font-mono">{vehicle.vin}</span>
            </div>
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
  const renderPropertyCard = (property: Property) => {
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
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            AI-Powered Report Comparison
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Select multiple items below to compare details, spot differences,
            and get AI-powered recommendations tailored to your needs.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-3"
          >
            <div className="bg-blue-50 rounded-md p-4 inline-block">
              <div className="flex items-start">
                <div className="mr-3 mt-1 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              onClick={() => setShowSearch(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Search for a new report
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {showSearch ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchReport
                onAddToComparison={handleAddToComparison}
                onViewReport={handleViewReport}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-12">
                <Tabs defaultValue="vehicle" onValueChange={(value) => setActiveTab(value as EntityType)}>
                  <div className="flex flex-col items-center mb-10">
                    <TabsList className="inline-flex h-16 items-center justify-center rounded-full bg-white p-1.5 shadow-lg border border-gray-100">
                      <TabsTrigger
                        value="vehicle"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50 data-[state=active]:scale-105"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 17H3v-6l2-5h12l2 5v6h-2M5 17v-2h14v2" />
                        </svg>
                        <span>Vehicles</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="property"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50 data-[state=active]:scale-105"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>Properties</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Vehicle Tab */}
                  <TabsContent value="vehicle" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-8 mb-8 border border-gray-100 shadow-lg"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m10 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 17H3v-6l2-5h12l2 5v6h-2M5 17v-2h14v2" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Reports</h2>
                          <p className="text-gray-600 text-lg">Browse and compare detailed vehicle reports including history, specifications, and condition.</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {vehicleMockData.map((vehicle) => renderVehicleCard(vehicle as Vehicle))}
                    </motion.div>
                  </TabsContent>

                  {/* Property Tab */}
                  <TabsContent value="property" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-8 mb-8 border border-gray-100 shadow-lg"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Reports</h2>
                          <p className="text-gray-600 text-lg">Explore and compare property reports with detailed information about location, features, and value.</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {propertyMockData.map((property) => renderPropertyCard(property as Property))}
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="fixed bottom-6 left-0 right-0 flex justify-center z-40"
        >
          <Button
            onClick={handleCompare}
            disabled={selectedCount < 2}
            className="px-8 py-6 text-lg shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            Compare Selected ({selectedCount}/3)
          </Button>
        </motion.div>

        {/* Report View Modal */}
        {selectedReport && (
          <ReportViewModal
            isOpen={!!selectedReport}
            onClose={() => setSelectedReport(null)}
            report={selectedReport}
            onAddToComparison={handleAddToComparison}
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
