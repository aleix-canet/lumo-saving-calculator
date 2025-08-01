import { useState } from "react";
import FinanceConfigDialog from "./FinanceConfigDialog";

const Footer = () => {
      const [isOpenFinanceDialog, setIsOpenFinanceDialog] = useState(false);

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
          <span className="text-zinc-900 text-lg font-normal"> £9,000</span>
        </button>
        <button
          onClick={() => setIsOpenFinanceDialog(true)}
          className="bg-white!"
        >
          <span className="text-gray-700 text-lg font-normal underline">
            Monthly bill cost:
          </span>
          <span className="text-zinc-900 text-lg font-normal"> £87</span>
        </button>
        <button className="px-8 py-5 bg-[#1FEA71]! rounded-[52px]">
          <span className="text-zinc-900 text-lg font-medium">
            Get your free quote
          </span>
        </button>
      </div>
      <FinanceConfigDialog
        open={isOpenFinanceDialog}
        onClose={() => setIsOpenFinanceDialog(false)}
      />
    </footer>
  );
};

export default Footer;
