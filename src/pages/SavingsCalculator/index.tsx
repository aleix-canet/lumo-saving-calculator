import Chip from '@mui/material/Chip';
import { useState } from 'react';
import AnimatedCustomSlider from '../../components/CustomSlider';
import { CustomTab, CustomTabs } from '../../components/CustomTabs';
import { useSystemConfig } from '../../contexts/CalculatorConfigContext';
import { useSavingsCalculations } from '../../hooks/useSavingsCalculator';
import AnnualSavingsChart from './components/AnnualSavingsChart';
import BedroomSelector from './components/BedroomsSelector';
import Footer from './components/Footer';
import LifetimeSavingsChart from './components/LifetimeSavingsChart';

const SavingsCalculator = () => {
  const [chartTabIndex, setChartTabIndex] = useState(0);

  const { config, updateConfig } = useSystemConfig();

  const { solarPanels, batterySize, numberOfBedrooms } = config;
  const { solarOnly, solarAndBattery, lumoSolarAndBattery } =
    useSavingsCalculations({
      solarPanels,
      batterySize,
      numberOfBedrooms,
    });

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
                <span>save £{lumoSolarAndBattery} a year</span>
              </h1>
              <h2 className="text-gray-500 text-3xl font-light">
                With {solarPanels} solar panels and a {batterySize}kWh battery
                in a <BedroomSelector /> home optimised by Lumo
              </h2>
            </div>
            <div
              id="sliders-container"
              className="flex flex-col gap-8 w-full max-w-[50%]"
            >
              <AnimatedCustomSlider
                targetValue={solarPanels}
                onSliderChange={value => updateConfig('solarPanels', value)}
                min={4}
                max={20}
                step={1}
                aria-label="Solar Panels"
                valueLabelFormat={v => `${v} solar panels`}
                className="mb-5"
              />
              <AnimatedCustomSlider
                targetValue={batterySize}
                onSliderChange={value => updateConfig('batterySize', value)}
                min={5}
                max={40}
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
                  <AnnualSavingsChart
                    solarOnly={solarOnly}
                    solarAndBattery={solarAndBattery}
                    lumoSolarAndBattery={lumoSolarAndBattery}
                  />
                ) : (
                  <div className="text-center text-gray-400 text-sm w-full">
                    <LifetimeSavingsChart
                      lumoSolarAndBattery={lumoSolarAndBattery}
                    />
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
      <Footer />
    </div>
  );
};

export default SavingsCalculator;
