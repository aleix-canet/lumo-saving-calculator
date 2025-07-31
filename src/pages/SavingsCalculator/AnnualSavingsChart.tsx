import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { colors } from '../../constants/colors';

const AnnualSavingsChart: React.FC = () => {
  const data = [
    {
      name: 'Solar only',
      savings: 578,
      fill: colors.grey[100],
    },
    {
      name: 'Solar & Battery',
      savings: 884,
      fill: colors.grey[300],
    },
    {
      name: 'Solar, Battery & Lumo',
      savings: 1472,
      fill: colors.lumoGreen,
    },
  ];

  return (
    <div className="w-full max-w-sm h-[250px] mx-auto">
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
          <Tooltip
            formatter={(value: number) => `£${value}`}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="savings" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="savings"
              position="top"
              formatter={(val: number) => `£${val}`}
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

export default AnnualSavingsChart;
