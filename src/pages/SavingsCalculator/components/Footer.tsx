import { useState } from 'react';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';
import { useFinanceCalculations } from '../../../hooks/useFinanceCalculations';
import FinanceConfigDialog from './FinanceConfigDialog';
import GetFreeQuoteButton from '../../../components/GetFreeQuoteButton';

const Footer = () => {
  const [isOpenFinanceDialog, setIsOpenFinanceDialog] = useState(false);
  const { config } = useSystemConfig();
  const { depositSize, yearsFinanced } = config;

  const { totalSystemCost, monthlyBill } = useFinanceCalculations({
    depositSize,
    yearsFinanced,
  });

  return (
    <footer className="border-t border-gray-200 py-4 px-4">
      <div className="w-full flex items-center gap-6 justify-center">
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 text-lg font-normal underline">
            Total system cost:
          </span>
          <span className="text-zinc-900 text-lg font-normal">
            {' '}
            £{totalSystemCost}
          </span>
        </button>
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 text-lg font-normal underline">
            Monthly bill cost:
          </span>
          <span className="text-zinc-900 text-lg font-normal">
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
