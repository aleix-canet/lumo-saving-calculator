import { useEffect, useMemo, useState } from 'react';
import { getSavingsPermutationsData } from '../data/permutations';
import type { SavingsCalculations } from '../types/Calculations';

interface useSavingsCalculationsProps {
  solarPanels: number;
  batterySize: number;
  numberOfBedrooms: number;
}

export const useSavingsCalculations = ({
  solarPanels,
  batterySize,
  numberOfBedrooms,
}: useSavingsCalculationsProps): SavingsCalculations => {
  const [data, setData] = useState<SavingsCalculations[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permutations = await getSavingsPermutationsData();
        setData(permutations);
      } catch (error) {
        console.error('Failed to fetch permutations data:', error);
      }
    };

    fetchData();
  }, []);

  const savingsData = useMemo(() => {
    return data?.find(
      item =>
        item.solarPanels === solarPanels &&
        item.batterySize === batterySize &&
        item.bedrooms === numberOfBedrooms,
    );
  }, [batterySize, data, numberOfBedrooms, solarPanels]);

  return (
    savingsData ?? {
      solarPanels: solarPanels,
      batterySize: batterySize,
      bedrooms: numberOfBedrooms,
      baselineUtilityBill: 0,
      solarOnlyUtilityBill: 0,
      solarBatteryUtilityBill: 0,
      solarBatteryLumoUtilityBill: 0,
      estimatedSystemPrice: 0,
      depositPercentage: '0%',
      yearsFinanced: 0,
      interestRate: '0%',
    }
  );
};
