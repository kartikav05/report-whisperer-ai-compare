import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';

// Common interfaces
interface ChartData {
  name: string;
  entity1: number;
  entity2: number;
  entity1Name: string;
  entity2Name: string;
}

interface ComparisonChartsProps {
  data: ChartData[];
}

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

// Pie Chart Component
export const ComparisonPieChart = ({ data }: ComparisonChartsProps) => {
  const pieData = data.map(item => [
    { name: item.entity1Name, value: item.entity1 },
    { name: item.entity2Name, value: item.entity2 }
  ]).flat();

  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1500}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// Line Chart Component
export const ComparisonLineChart = ({ data }: ComparisonChartsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Legend />
          <Line 
            type="monotone" 
            dataKey="entity1" 
            name={data[0]?.entity1Name}
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="entity2" 
            name={data[0]?.entity2Name}
            stroke="#60A5FA" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// Radar Chart Component
export const ComparisonRadarChart = ({ data }: ComparisonChartsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#f0f0f0" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#6B7280' }}
          />
          <PolarRadiusAxis 
            tick={{ fill: '#6B7280' }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Radar
            name={data[0]?.entity1Name}
            dataKey="entity1"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            animationDuration={1500}
          />
          <Radar
            name={data[0]?.entity2Name}
            dataKey="entity2"
            stroke="#60A5FA"
            fill="#60A5FA"
            fillOpacity={0.3}
            animationDuration={1500}
          />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// Area Chart Component
export const ComparisonAreaChart = ({ data }: ComparisonChartsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Legend />
          <Line 
            type="monotone" 
            dataKey="entity1" 
            name={data[0]?.entity1Name}
            stroke="#3B82F6" 
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="entity2" 
            name={data[0]?.entity2Name}
            stroke="#60A5FA" 
            fill="#60A5FA"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}; 
