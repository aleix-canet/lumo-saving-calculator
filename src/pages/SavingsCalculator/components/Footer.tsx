import { useState } from 'react';
import GetFreeQuoteButton from '../../../components/GetFreeQuoteButton';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';
import { useFinanceCalculations } from '../../../hooks/useFinanceCalculations';
import FinanceConfigDialog from './FinanceConfigDialog';

const Footer = () => {
  const [isOpenFinanceDialog, setIsOpenFinanceDialog] = useState(false);
  const { config } = useSystemConfig();
  const { depositSize, yearsFinanced } = config;

  const { totalSystemCost, monthlyBill } = useFinanceCalculations({
    depositSize,
    yearsFinanced,
  });

  return (
    <footer className="w-full flex justify-center">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center">
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 text-lg md:text-lg font-normal underline">
            Total system cost:
          </span>
          <span className="text-zinc-900 text-lg md:text-lg font-normal">
            {' '}
            £{totalSystemCost}
          </span>
        </button>
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 text-lg md:text-lg font-normal underline">
            Monthly bill cost:
          </span>
          <span className="text-zinc-900 text-lg md:text-lg font-normal">
            {' '}
            £{monthlyBill}
          </span>
        </button>
        <GetFreeQuoteButton />
      </div>
      <FinanceConfigDialog
        open={isOpenFinanceDialog}
        onClose={() => setIsOpenFinanceDialog(false)}
        totalSystemCost={totalSystemCost}
        monthlyBill={monthlyBill}
      />
    </footer>
  );
};

export default Footer;
