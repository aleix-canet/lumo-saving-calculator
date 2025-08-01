import { useEffect, useMemo, useState } from 'react';
import type { mockedFinancePermutations } from '../data/mock';
import { getFinancePermutationsData } from '../data/permutations';
import type { FinanceCalculations } from '../types/Calculations';

interface useFinanceCalculationsProps {
  depositSize: number;
  yearsFinanced: number;
}

export const useFinanceCalculations = ({
  depositSize,
  yearsFinanced,
}: useFinanceCalculationsProps): FinanceCalculations => {
  const [data, setData] = useState<typeof mockedFinancePermutations>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permutations = await getFinancePermutationsData();
        setData(permutations);
      } catch (error) {
        console.error('Failed to fetch permutations data:', error);
      }
    };

    fetchData();
  }, []);

  const financeData = useMemo(() => {
    // TODO: use real logic when fetching final JSON
    const indexedKey = `${depositSize}-${yearsFinanced}`;
    return data?.[indexedKey];
  }, [data, depositSize, yearsFinanced]);

  return financeData ?? { totalSystemCost: 0, monthlyBill: 0 };
};
