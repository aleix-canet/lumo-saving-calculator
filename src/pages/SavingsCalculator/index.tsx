import { useMediaQuery, useTheme } from '@mui/material';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="min-h-screen bg-white grid grid-rows-[auto_1fr] px-6 max-md:py-20">
      <main className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-6 md:px-[128px] md:pt-16">
          <div className="md:pb-20 lg:pb-10 flex flex-col md:flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-12 md:gap-20 lg:gap-16 border-b border-gray-200">
            <div
              id="left-container"
              className="flex flex-col gap-15 md:gap-12 w-full lg:w-1/2 lg:flex-1"
            >
              <div
                id="text-container"
                className="flex flex-col gap-4 items-start w-full md:max-w-[90%] lg:max-w-[80%]"
              >
                <Chip
                  size="small"
                  className="rounded-2xl text-gray-700 text-sm! font-semibold"
                  label="Lumo energy savings calculator"
                />
                <h1 className="text-zinc-900 text-3xl md:text-6xl font-light">
                  <span>Your home could </span>
                  <span>save £{lumoSolarAndBattery} a year</span>
                </h1>
                <h2 className="text-gray-500 text-xl md:text-3xl font-light">
                  With {solarPanels} solar panels and a {batterySize}kWh battery
                  in a <BedroomSelector /> home optimised by Lumo
                </h2>
              </div>
              <div
                id="sliders-container"
                className="flex flex-col gap-11 md:gap-6 w-full lg:max-w-[50%]"
              >
                <AnimatedCustomSlider
                  targetValue={solarPanels}
                  onSliderChange={value => updateConfig('solarPanels', value)}
                  min={6}
                  max={14}
                  step={2}
                  aria-label="Solar Panels"
                  valueLabelFormat={v =>
                    isMobile && (v === 4 || v === 20) ? (
                      <>
                        {v} solar
                        <br />
                        panels
                      </>
                    ) : (
                      `${v} solar panels`
                    )
                  }
                  className="mb-5"
                />
                <AnimatedCustomSlider
                  targetValue={batterySize}
                  onSliderChange={value => updateConfig('batterySize', value)}
                  min={5}
                  max={15}
                  step={5}
                  aria-label="Battery Size"
                  valueLabelFormat={v =>
                    isMobile && (v === 5 || v === 40) ? (
                      <>
                        {v} kWh
                        <br />
                        battery
                      </>
                    ) : (
                      `${v} kWh battery`
                    )
                  }
                />
              </div>
            </div>
            <div
              id="right-container"
              className="w-full lg:w-1/2 flex justify-center mt-10 md:mt-6 lg:mt-0 lg:flex-1"
            >
              <div className="w-full max-w-full md:max-w-sm h-[320px] flex flex-col justify-end">
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

                <div className="mt-3 max-md:mb-7">
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
        </div>
      </main>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] px-6 md:px-[128px] pt-8 pb-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
