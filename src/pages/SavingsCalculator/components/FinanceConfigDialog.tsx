import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import { CustomSlider } from '../../../components/CustomSlider';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';

interface FinanceConfigDialogProps {
  open: boolean;
  onClose: () => void;
  totalSystemCost: number;
  monthlyBill: number;
}

const FinanceConfigDialog = ({
  open,
  onClose,
  totalSystemCost,
  monthlyBill,
}: FinanceConfigDialogProps) => {
  const { config, updateConfig } = useSystemConfig();
  const { depositSize, yearsFinanced } = config;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          className: 'p-8 rounded-[52px]! shadow-xl relative overflow-visible',
        },
      }}
    >
      <IconButton
        className="absolute! top-4 right-4 text-gray-400! bg-gray-500! hover:text-gray-600! hover:bg-gray-700! rounded-full mr-4! mt-5! w-8 h-8"
        onClick={onClose}
      >
        <Close className="text-white" />
      </IconButton>

      <DialogContent>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-zinc-900 text-3xl font-light mb-6">
              Financing your Lumo system
            </h2>

            <div className="text-gray-700 text-lg font-normal space-y-3">
              <div className="flex justify-between">
                <span>Total system cost</span>
                <span className="text-zinc-900">£{totalSystemCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Deposit size</span>
                <span className="text-zinc-900">£0</span>
              </div>
              <div className="flex justify-between">
                <span>Amount to be financed</span>
                <span className="text-zinc-900">£9,000</span>
              </div>
              <div className="flex justify-between">
                <span>Number of years financed</span>
                <span className="text-zinc-900">10 years</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="relative mb-6">
                <CustomSlider
                  value={depositSize}
                  onChange={(_, value) =>
                    updateConfig('depositSize', value as number)
                  }
                  min={0}
                  max={9000}
                  step={1000}
                  aria-label="Deposit Size"
                  valueLabelFormat={v => `Deposit size: £${v}`}
                  valueLabelDisplay="on"
                  className="my-5"
                />
              </div>

              <div className="relative">
                <CustomSlider
                  value={yearsFinanced}
                  onChange={(_, value) =>
                    updateConfig('yearsFinanced', value as number)
                  }
                  marks={[
                    {
                      value: 0,
                    },
                    {
                      value: 2,
                    },
                    {
                      value: 3,
                    },
                    {
                      value: 5,
                    },
                    {
                      value: 10,
                    },
                    {
                      value: 15,
                    },
                  ]}
                  min={0}
                  max={15}
                  step={null}
                  aria-label="Years Financed"
                  valueLabelDisplay="on"
                  valueLabelFormat={v => `Years financed: ${v}`}
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-zinc-900 text-3xl font-light mb-6">
              Monthly bill with Lumo
            </h2>

            <div className="space-y-3 text-gray-700 text-lg font-normal">
              <div className="flex justify-between">
                <span>Finance cost</span>
                <span>- £105</span>
              </div>

              <div className="flex justify-between bg-[#9FFFC6] px-3 py-1.5">
                <span>Lumo optimised bill</span>
                <span>+ £18</span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-3">
                <span>Total monthly bill</span>
                <span>- £{monthlyBill}</span>
              </div>

              <h3 className="text-zinc-900 text-3xl font-light mt-6">
                Versus a standard system
              </h3>

              <div className="flex justify-between mt-2">
                <span>Finance cost</span>
                <span>- £105</span>
              </div>
              <div className="flex justify-between">
                <span>Standard bill</span>
                <span>- £5</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <span>Total monthly bill</span>
                <span>- £110</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <button className="px-8 py-5 bg-[#1FEA71]! rounded-[52px]">
          <span className="text-zinc-900 text-lg font-medium">
            Get your free quote
          </span>
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceConfigDialog;
