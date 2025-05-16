import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: string;
    title: string;
    type: "property" | "vehicle";
    details: string;
    date: string;
    content?: any; // Add more specific type based on your report structure
  } | null;
  onAddToComparison: (reportId: string) => void;
}

const ReportViewModal = ({ isOpen, onClose, report, onAddToComparison }: ReportViewModalProps) => {
  if (!report) return null;

  return (
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
          <Button onClick={() => onAddToComparison(report.id)}>
            Add to Comparison
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportViewModal; 
