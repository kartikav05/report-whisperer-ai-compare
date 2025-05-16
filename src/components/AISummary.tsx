import { ComparisonSummary, Entity } from "@/types/comparison";
import { motion } from "framer-motion";

interface AISummaryProps {
  summary: ComparisonSummary;
  entities: Entity[];
}

const AISummary = ({ summary, entities }: AISummaryProps) => {
  const entityType = entities[0]?.type || 'item';
  const entityNames = entities.map(e => e.name).join(' and ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M21.4 6.9A6 6 0 0 0 16 3c-2 0-4.1 1-5.4 2.6A6 6 0 0 0 2 8.5c0 3.5 3.3 6.7 8.4 12l.6.6c.5.5 1.5.5 2 0l.6-.6C18.7 15.2 22 12 22 8.5a6 6 0 0 0-.6-1.6Z"/>
            <polyline points="7 14 12 9 17 14"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">AI Comparison Summary</h2>
          <p className="text-gray-600 mt-1">Analysis of {entityNames}</p>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700 mb-8 bg-gray-50 rounded-lg p-6">
        <p className="text-lg leading-relaxed">{summary.naturalLanguageSummary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 bg-blue-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-blue-800 uppercase tracking-wider">Similarities</h3>
          </div>
          <ul className="space-y-2">
            {summary.similarities.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="text-sm flex items-start bg-white rounded-lg p-3 shadow-sm"
              >
                <span className="text-blue-500 mr-2">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 bg-purple-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-purple-800 uppercase tracking-wider">Key Differences</h3>
          </div>
          <ul className="space-y-2">
            {summary.differences.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="text-sm flex items-start bg-white rounded-lg p-3 shadow-sm"
              >
                <span className="text-purple-500 mr-2">•</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3 bg-amber-50 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-amber-800 uppercase tracking-wider">Red Flags</h3>
          </div>
          {summary.redFlags.length > 0 ? (
            <ul className="space-y-2">
              {summary.redFlags.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="text-sm flex items-start bg-white rounded-lg p-3 shadow-sm"
                >
                  <span className="text-amber-500 mr-2">⚠</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white rounded-lg p-3 shadow-sm"
            >
              <p className="text-sm text-gray-500">No red flags detected.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AISummary;
