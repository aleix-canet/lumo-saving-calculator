import { useState } from 'react';
import GetFreeQuoteButton from '../../../components/GetFreeQuoteButton';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';
import type { SavingsCalculations } from '../../../types/Calculations';
import { displayPositiveOrNegativeCurrency } from '../../../utils/currency';
import { calculateFinanceSummary } from '../utils';
import FinanceConfigDialog from './FinanceConfigDialog';

const Footer = ({ savingsData }: { savingsData: SavingsCalculations }) => {
  const [isOpenFinanceDialog, setIsOpenFinanceDialog] = useState(false);
  const { config } = useSystemConfig();
  const { depositSize, yearsFinanced } = config;

  const financialCalculations = calculateFinanceSummary(
    {
      solarPanels: savingsData.solarPanels,
      batterySize: savingsData.batterySize,
      bedrooms: savingsData.bedrooms,
      depositPercentage: depositSize,
      yearsFinanced: yearsFinanced,
    },
    savingsData,
  );
  return (
    <footer className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center">
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 hover:text-black text-lg md:text-lg font-normal underline">
            Total system cost:
          </span>
          <span className="text-zinc-900 text-lg md:text-lg font-normal">
            {' '}
            {displayPositiveOrNegativeCurrency(
              savingsData.estimatedSystemPrice,
            )}
          </span>
        </button>
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 hover:text-black text-lg md:text-lg font-normal underline">
            Monthly bill cost:
          </span>
          <span className="text-zinc-900 text-lg md:text-lg font-normal">
            {' '}
            {displayPositiveOrNegativeCurrency(
              financialCalculations?.monthlyOptimisedCombinedBill,
            )}
          </span>
        </button>
        <GetFreeQuoteButton />
      </div>
      <p className="mt-8 text-gray-500 text-sm font-medium max-md:text-center">
        Our calculations are validated by{' '}
        <a className="underline!" href="https://epvs.co.uk" target="blank">
          EPVS
        </a>
        . It's a national certification standard that validates energy-saving
        estimates.{' '}
        <a
          href="https://lumoenergy.co.uk/calculations"
          target="blank"
          className="underline!"
        >
          See our calculations
        </a>
      </p>
      <FinanceConfigDialog
        open={isOpenFinanceDialog}
        onClose={() => setIsOpenFinanceDialog(false)}
        financialCalculations={financialCalculations}
        totalSystemCost={savingsData.estimatedSystemPrice}
      />
    </footer>
  );
};

export default Footer;
