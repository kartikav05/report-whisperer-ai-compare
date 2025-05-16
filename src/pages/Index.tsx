
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { vehicleMockData, propertyMockData, personMockData } from "@/data/mockData";
import { Entity, EntityType } from "@/types/comparison";
import TagBadge from "@/components/TagBadge";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EntityType>("vehicle");
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  // Get entity data based on active tab
  const getEntitiesByType = (): Entity[] => {
    switch (activeTab) {
      case "vehicle":
        return vehicleMockData;
      case "property":
        return propertyMockData;
      case "person":
        return personMockData;
      default:
        return [];
    }
  };

  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
                  <li>Select the category you want to compare (Vehicles, Properties, or People)</li>
                  <li>Select two or more items by checking the boxes</li>
                  <li>Click "Compare Selected" to view the detailed comparison</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="vehicle" onValueChange={(value) => setActiveTab(value as EntityType)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vehicle">Vehicles</TabsTrigger>
            <TabsTrigger value="property">Properties</TabsTrigger>
            <TabsTrigger value="person">People</TabsTrigger>
          </TabsList>
          
          {/* Vehicle Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicleMockData.map((vehicle) => (
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
              ))}
            </div>
          </TabsContent>
          
          {/* Property Tab */}
          <TabsContent value="property" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyMockData.map((property) => (
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
              ))}
            </div>
          </TabsContent>
          
          {/* People Tab */}
          <TabsContent value="person" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personMockData.map((person) => (
                <Card key={person.id} className="overflow-hidden border">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Checkbox 
                        checked={selectedItems[person.id] || false}
                        onCheckedChange={() => toggleItemSelection(person.id)}
                        className="h-5 w-5 border-2 bg-white"
                      />
                    </div>
                    <div className="h-48 bg-gray-100">
                      <img 
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {person.tags.map((tag, i) => (
                        <TagBadge key={i} tag={tag} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span className="font-medium">{person.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Occupation:</span>
                        <span className="font-medium">{person.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Score:</span>
                        <span className={`font-medium ${
                          person.creditScore >= 750 ? "text-green-600" : 
                          person.creditScore >= 650 ? "text-amber-600" : 
                          "text-red-600"
                        }`}>
                          {person.creditScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
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
          Compare Selected ({selectedCount})
        </Button>
      </div>
    </div>
  );
};

export default Index;
