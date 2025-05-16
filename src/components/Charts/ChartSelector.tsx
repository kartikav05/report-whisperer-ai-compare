import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComparisonChart from './ComparisonChart';
import { ComparisonLineChart, ComparisonRadarChart, ComparisonAreaChart } from './ComparisonCharts';
import { motion, AnimatePresence } from 'framer-motion';

interface ChartSelectorProps {
  data: any[];
}

const ChartSelector = ({ data }: ChartSelectorProps) => {
  const [activeChart, setActiveChart] = useState('bar');

  const chartComponents = {
    bar: ComparisonChart,
    line: ComparisonLineChart,
    radar: ComparisonRadarChart,
    area: ComparisonAreaChart,
  };

  const ActiveChart = chartComponents[activeChart as keyof typeof chartComponents];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bar" onValueChange={setActiveChart}>
        <div className="flex justify-center mb-6">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-white p-1.5 shadow-lg border border-gray-100">
            <TabsTrigger 
              value="bar" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50"
            >
              Bar Chart
            </TabsTrigger>
            <TabsTrigger 
              value="line" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50"
            >
              Line Chart
            </TabsTrigger>
            <TabsTrigger 
              value="radar" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50"
            >
              Radar Chart
            </TabsTrigger>
            <TabsTrigger 
              value="area" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50/50"
            >
              Area Chart
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <ActiveChart data={data} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChartSelector; 
