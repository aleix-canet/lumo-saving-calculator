import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { colors } from '../../constants/colors';

const LifetimeSavingsChart = ({
  lumoSolarAndBattery,
}: {
  lumoSolarAndBattery: number;
}) => {
  const data = [
    {
      name: 'Year 5',
      savings: lumoSolarAndBattery * 5,
      fill: colors.grey[100],
    },
    {
      name: 'Year 10',
      savings: lumoSolarAndBattery * 10,
      fill: colors.grey[300],
    },
    {
      name: 'Year 15',
      savings: lumoSolarAndBattery * 15,
      fill: colors.grey[500],
    },
    {
      name: 'Year 20',
      savings: lumoSolarAndBattery * 20,
      fill: colors.grey[600],
    },
  ];

  return (
    <div className="w-full max-w-sm h-[360px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, left: 16, bottom: 24 }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis hide domain={[0, 22000]} />
          <Bar dataKey="savings" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="savings"
              position="top"
              formatter={(label: React.ReactNode) =>
                typeof label === 'number' ? `£${label.toLocaleString()}` : label
              }
              style={{ fill: '#111', fontWeight: 600 }}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifetimeSavingsChart;
