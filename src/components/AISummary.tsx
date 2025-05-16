
import { ComparisonSummary } from "@/types/comparison";

interface AISummaryProps {
  summary: ComparisonSummary;
}

const AISummary = ({ summary }: AISummaryProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M21.4 6.9A6 6 0 0 0 16 3c-2 0-4.1 1-5.4 2.6A6 6 0 0 0 2 8.5c0 3.5 3.3 6.7 8.4 12l.6.6c.5.5 1.5.5 2 0l.6-.6C18.7 15.2 22 12 22 8.5a6 6 0 0 0-.6-1.6Z"/>
            <polyline points="7 14 12 9 17 14"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold">AI Comparison Summary</h2>
      </div>

      <div className="prose max-w-none text-gray-700 mb-4">
        <p>{summary.naturalLanguageSummary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wider">Similarities</h3>
          <ul className="space-y-1">
            {summary.similarities.map((item, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wider">Key Differences</h3>
          <ul className="space-y-1">
            {summary.differences.map((item, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-amber-600 uppercase tracking-wider">Red Flags</h3>
          {summary.redFlags.length > 0 ? (
            <ul className="space-y-1">
              {summary.redFlags.map((item, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="text-amber-500 mr-2">⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No red flags detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISummary;
