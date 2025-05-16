import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { EntityType } from "@/types/comparison";

interface ComparisonPromptProps {
  entityType: EntityType;
  onCompare: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

const ComparisonPrompt = ({ 
  entityType, 
  onCompare, 
  onDismiss,
  isVisible 
}: ComparisonPromptProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleDismiss = () => {
    setIsMinimized(true);
    onDismiss();
    toast.success("You can access the comparison tool anytime from the top of the report");
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isMinimized ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-50"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium mb-2">
                Hey! I noticed you're exploring this {entityType}. Want to compare it with a similar option to help you choose?
              </p>
              <p className="text-gray-600 text-sm mb-4">
                We've built a smart comparison tool that gives you a side-by-side view and even suggests whether buying or renting is better for you.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={onCompare}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Yes, take me to Compare
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDismiss}
                  className="hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  No thanks, stay on this report
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 bg-white rounded-xl shadow-sm border border-gray-200 p-3 z-50"
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p className="text-sm text-gray-600">
              Got it! You can launch the comparison anytime by clicking the 'Compare' button at the top of this report.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComparisonPrompt; 
