
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  data: Array<{
    name: string;
    entity1: number;
    entity2: number;
    entity1Name: string;
    entity2Name: string;
  }>;
  entity1Color?: string;
  entity2Color?: string;
}

const ComparisonChart = ({ 
  data, 
  entity1Color = "#3B82F6", 
  entity2Color = "#F59E0B" 
}: ComparisonChartProps) => {
  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              // Replace generic names with actual entity names
              if (name === "entity1") return [value, data[0].entity1Name];
              if (name === "entity2") return [value, data[0].entity2Name];
              return [value, name];
            }}
          />
          <Bar dataKey="entity1" fill={entity1Color} name="entity1" />
          <Bar dataKey="entity2" fill={entity2Color} name="entity2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
