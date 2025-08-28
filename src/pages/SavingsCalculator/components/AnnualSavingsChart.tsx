import { useMediaQuery, useTheme } from '@mui/material';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import CountingSVGLabel from '../../../components/CountingSVGLabel';
import { colors } from '../../../constants/colors';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';

interface AnnualSavingsChartProps {
  solarOnly: number;
  solarAndBattery: number;
  lumoSolarAndBattery: number;
  baselineUtilityBill: number;
}

const AnnualSavingsChart = ({
  solarOnly,
  solarAndBattery,
  lumoSolarAndBattery,
  baselineUtilityBill,
}: AnnualSavingsChartProps) => {
  const { config } = useSystemConfig();
  const { numberOfBedrooms } = config;

  const data = [
    {
      name: 'Solar only',
      savings: solarOnly,
      fill: colors.grey[100],
    },
    {
      name: 'Solar & Battery',
      savings: solarAndBattery,
      fill: colors.grey[300],
    },
    {
      name: 'Solar, Battery & Lumo',
      savings: lumoSolarAndBattery,
      fill: colors.lumoGreen,
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="w-full max-w-sm h-[360px] pt-6 md:pt-0 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 64, right: 16, left: 96, bottom: 24 }}
          barCategoryGap="20%"
          barGap={0}
        >
          <ReferenceLine
            y={baselineUtilityBill}
            stroke="#D5D7DA"
            strokeDasharray="4 4"
            strokeWidth={2}
            ifOverflow="visible"
            label={({ viewBox }) => {
              const y = viewBox?.y ?? 0;
              const xInset = (viewBox?.x ?? 0) - 90;
              return (
                <g pointerEvents="none">
                  <text
                    x={xInset}
                    y={y - 16}
                    fill="#717680"
                    fontFamily="Figtree"
                    fontSize="14"
                    fontStyle="normal"
                    fontWeight="500"
                    textAnchor="start"
                  >
                    £{Math.round(baselineUtilityBill).toLocaleString()} bill
                  </text>
                  <text
                    x={xInset}
                    y={y}
                    fill="#717680"
                    fontFamily="Figtree"
                    fontSize="14"
                    fontStyle="normal"
                    fontWeight="500"
                    textAnchor="start"
                  >
                    ( Avg. {numberOfBedrooms} bed )
                  </text>
                </g>
              );
            }}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={
              {
                fill: '#374151',
                fontSize: '1rem',
                fontWeight: 500,
                wordBreak: 'break-word',
                width: 100,
                lineHeight: 1.2,
              } as unknown as React.SVGProps<SVGTextElement>
            }
          />
          <YAxis hide domain={[0, 1600]} />
          <Bar dataKey="savings" radius={[6, 6, 6, 6]} stackId="overlay">
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.fill} />
            ))}
          </Bar>

          {/* Labels: non-animated bar so labels render immediately & stay aligned */}
          <Bar
            dataKey={() => 0}
            fill="transparent"
            isAnimationActive={false}
            radius={[6, 6, 0, 0]}
            barSize={48}
            stackId="overlay"
          >
            <LabelList
              dataKey="savings"
              position="top"
              content={props => (
                <CountingSVGLabel
                  {...props}
                  style={{
                    fill: '#18181b',
                    fontSize: isMobile ? '1.375rem' : '1.875rem',
                    fontWeight: 300,
                  }}
                  duration={500}
                />
              )}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnnualSavingsChart;
