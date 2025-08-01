import { useEffect, useMemo, useState } from 'react';
import { getPermutationsData } from '../data/permutations';
import type { Permutations } from '../types/Permutations';
import type { SavingsCalculations } from '../types/SavingsCalculations';

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
  const [data, setData] = useState<Permutations>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permutations = await getPermutationsData();
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
