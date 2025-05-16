import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComparisonPrompt from "./ComparisonPrompt";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EntityType } from "@/types/comparison";

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: string;
    title: string;
    type: EntityType;
    details: string;
    date: string;
    content?: any; // Add more specific type based on your report structure
  } | null;
  onAddToComparison: (reportId: string) => void;
}

const ReportViewModal = ({ 
  isOpen, 
  onClose, 
  report, 
  onAddToComparison,
}: ReportViewModalProps) => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Reset prompt state when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowPrompt(true);
      setHasInteracted(false);
    }
  }, [isOpen]);

  if (!report) return null;

  const handleCompare = () => {
    onAddToComparison(report.id);
    setHasInteracted(true);
    setShowPrompt(false);
    
    // Navigate to comparison page
    navigate('/compare');
    
    // Close the modal
    onClose();
    
    toast.success("Report added to comparison");
  };

  const handleDismissPrompt = () => {
    setHasInteracted(true);
    setShowPrompt(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{report.title}</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Report Details</h3>
                  <p className="text-sm text-gray-600">{report.details}</p>
                  <p className="text-sm text-gray-500 mt-1">Date: {report.date}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Report Type</h3>
                  <p className="text-sm text-gray-600 capitalize">{report.type}</p>
                </div>
              </div>

              {/* Add more report content sections here */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Report Content</h3>
                <div className="prose max-w-none">
                  {/* Add your report content here */}
                  <p>This is where the detailed report content would be displayed.</p>
                  <p>You can add sections, tables, charts, and other relevant information.</p>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={() => {
                onAddToComparison(report.id);
                toast.success("Report added to comparison");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Add to Comparison
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ComparisonPrompt
        entityType={report.type}
        onCompare={handleCompare}
        onDismiss={handleDismissPrompt}
        isVisible={showPrompt && !hasInteracted}
      />
    </>
  );
};

export default ReportViewModal; 
