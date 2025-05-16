import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface ChartData {
  name: string;
  entity1: number;
  entity2: number;
  entity1Name: string;
  entity2Name: string;
}

interface ComparisonChartProps {
  data: ChartData[];
}

const ComparisonChart = ({ data }: ComparisonChartProps) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-blue-600 font-medium">{payload[0].payload.entity1Name}:</span>{' '}
              {payload[0].value.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="text-blue-600 font-medium">{payload[1].payload.entity2Name}:</span>{' '}
              {payload[1].value.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fill: '#6B7280' }}
            tickLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
          <Bar 
            dataKey="entity1" 
            name={data[0]?.entity1Name} 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar 
            dataKey="entity2" 
            name={data[0]?.entity2Name} 
            fill="#60A5FA" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ComparisonChart;
