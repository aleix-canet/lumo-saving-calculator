import { useEffect, useMemo, useState } from 'react';
import { getSavingsPermutationsData } from '../data/permutations';
import type { SavingsCalculations } from '../types/Calculations';
import type { SavingsPermutations } from '../types/Permutations';

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
  const [data, setData] = useState<SavingsPermutations>();

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
    // TODO: use real logic when fetching final JSON
    const indexedKey = `${solarPanels}-${batterySize}-${numberOfBedrooms}`;
    return data?.[indexedKey];
  }, [batterySize, data, numberOfBedrooms, solarPanels]);

  return (
    savingsData ?? { solarOnly: 0, solarAndBattery: 0, lumoSolarAndBattery: 0 }
  );
};
