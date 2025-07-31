import Chip from '@mui/material/Chip';
import { useState } from 'react';
import CustomSlider from '../../components/CustomSlider';
import { CustomTab, CustomTabs } from '../../components/CustomTabs';
import AnnualSavingsChart from './AnnualSavingsChart';

const SavingsCalculator = () => {
  const [solarPanels, setSolarPanels] = useState(12);
  const [batterySize, setBatterySize] = useState(10);
  const [chartTabIndex, setChartTabIndex] = useState(0);

  // Consider changing to max-w-sm....
  return (
    <div className="min-h-screen bg-white grid grid-rows-[auto_auto]">
      <main className="flex items-center justify-center w-full px-4">
        <div className="flex flex-row items-end justify-between w-full max-w-screen-xl gap-16">
          <div id="left-container" className="flex flex-col gap-16 flex-1">
            <div
              id="text-container"
              className="flex flex-col gap-4 items-start max-w-[50%]"
            >
              <Chip
                size="small"
                className="rounded-2xl text-gray-700 text-sm font-semibold"
                label="Lumo energy savings calculator"
              />
              <h1 className="text-zinc-900 text-6xl font-light">
                <span>Your home could </span>
                <span>save £1,472 a year</span>
              </h1>
              <h2 className="text-gray-500 text-3xl font-light">
                With 12 solar panels and a 15kWh battery in a 2 bed home
                optimised by Lumo
              </h2>
            </div>
            <div
              id="sliders-container"
              className="flex flex-col gap-8 w-full max-w-[50%]"
            >
              <CustomSlider
                value={solarPanels}
                onChange={(_, value) => setSolarPanels(value as number)}
                valueLabelDisplay="on"
                min={0}
                max={16}
                step={4}
                aria-label="Solar Panels"
                valueLabelFormat={v => `${v} solar panels`}
                className="mb-5"
              />
              <CustomSlider
                value={batterySize}
                onChange={(_, value) => setBatterySize(value as number)}
                valueLabelDisplay="on"
                min={0}
                max={20}
                step={5}
                aria-label="Battery Size"
                valueLabelFormat={v => `${v}kWh battery`}
              />
            </div>
          </div>
          <div
            id="right-container"
            className="w-full max-w-sm flex justify-center"
          >
            <div className="w-full max-w-sm h-[320px] flex flex-col justify-end">
              <div className="flex-1 flex items-end">
                {chartTabIndex === 0 ? (
                  <AnnualSavingsChart />
                ) : (
                  <div className="text-center text-gray-400 text-sm w-full">
                    Tab2 content
                  </div>
                )}
              </div>

              <div className="mt-3">
                <CustomTabs
                  value={chartTabIndex}
                  onChange={(_, newValue) => setChartTabIndex(newValue)}
                  centered
                >
                  <CustomTab label="Annual savings" />
                  <CustomTab label="Lifetime savings" />
                </CustomTabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4 px-4">
        <div className="w-full flex items-center gap-2 justify-center">
          <div className="text-sm text-gray-500">
            Total system cost:{' '}
            <span className="font-medium text-black">£9,000</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Monthly bill cost: </span>
            <span className="font-medium text-black">£87</span>
          </div>
          <button className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition">
            Get your free quote
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SavingsCalculator;
