import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, FileText } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: "property" | "vehicle";
  details: string;
  date: string;
}

interface SearchReportProps {
  onAddToComparison: (reportId: string) => void;
  onViewReport: (report: SearchResult) => void;
}

const SearchReport = ({ onAddToComparison, onViewReport }: SearchReportProps) => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchType || !searchQuery) return;
    
    setIsSearching(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "2020 Toyota Camry XSE Report",
          type: "vehicle",
          details: "VIN: 4T1C11AK5LU123456",
          date: "2024-03-15",
        },
        {
          id: "2",
          title: "The Metropolitan - Unit 505 Report",
          type: "property",
          details: "Address: 123 Main St #505",
          date: "2024-03-14",
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleAddToComparison = (result: SearchResult) => {
    onAddToComparison(result.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Search Reports</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="property">Property</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-1 flex gap-2">
            <Input
              placeholder={searchType === "vehicle" ? "Enter VIN or License Plate" : "Enter Address"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={!searchType || !searchQuery || isSearching}
              className="min-w-[100px]"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Search Results</h3>
            {searchResults.map((result) => (
              <Card key={result.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{result.title}</h4>
                    <p className="text-sm text-gray-600">{result.details}</p>
                    <p className="text-xs text-gray-500">Report Date: {result.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewReport(result)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAddToComparison(result)}
                    >
                      Add to Comparison
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchReport; 
