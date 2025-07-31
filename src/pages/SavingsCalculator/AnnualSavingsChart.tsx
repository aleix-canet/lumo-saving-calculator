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
          <YAxis hide domain={[0, 1600]} />
          <Bar dataKey="savings" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="savings"
              position="top"
              formatter={(label: React.ReactNode) =>
                typeof label === 'number' ? `£${label}` : label
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

export default AnnualSavingsChart;
