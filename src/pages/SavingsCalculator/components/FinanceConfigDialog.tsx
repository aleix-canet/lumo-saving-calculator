import { Close } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';
import { CustomSlider } from '../../../components/CustomSlider';
import GetFreeQuoteButton from '../../../components/GetFreeQuoteButton';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';
import { displayPositiveOrNegativeCurrency } from '../../../utils/currency';
import type { FinancialcalculationsOutput } from '../utils';

interface FinanceConfigDialogProps {
  open: boolean;
  onClose: () => void;
  financialCalculations: FinancialcalculationsOutput;
  totalSystemCost: number;
}

const FinanceConfigDialog = ({
  open,
  onClose,
  financialCalculations,
  totalSystemCost,
}: FinanceConfigDialogProps) => {
  const { config, updateConfig } = useSystemConfig();
  const { depositSize, yearsFinanced } = config;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen={isMobile}
      slotProps={{
        paper: {
          className:
            'w-full md:w-[1112px] md:max-w-[1112px] px-4 py-6 md:px-20 md:pt-22 md:pb-16 rounded-none md:rounded-[52px]! shadow-xl relative overflow-visible',
        },
      }}
    >
      <IconButton
        className="absolute! top-4 right-4 text-gray-400! bg-gray-500! hover:text-gray-600! hover:bg-gray-700! rounded-full mr-4! mt-5! w-8 h-8"
        onClick={onClose}
      >
        <Close className="text-white" />
      </IconButton>

      <DialogContent className="md:px-4!">
        <div className="px-11 md:px-14">
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="flex-1">
              <h2 className="text-zinc-900 text-2xl md:text-3xl font-light mb-4 md:mb-6">
                Financing your Lumo system
              </h2>

              <div className="text-gray-700 text-base md:text-lg font-normal space-y-3">
                <div className="flex justify-between">
                  <span>Total system cost</span>
                  <span className="text-zinc-900">
                    {displayPositiveOrNegativeCurrency(totalSystemCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit size</span>
                  <span className="text-zinc-900">£{depositSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount to be financed</span>
                  <span className="text-zinc-900">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.financedAmount,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Number of years financed</span>
                  <span className="text-zinc-900">{yearsFinanced} years</span>
                </div>
              </div>

              <div className="mt-10 max:lg:space-y-6">
                <div className="relative max-lg:mb-6">
                  <CustomSlider
                    value={depositSize}
                    onChange={(_, value) =>
                      updateConfig('depositSize', value as number)
                    }
                    min={0}
                    max={100}
                    step={10}
                    aria-label="Deposit %"
                    valueLabelFormat={v =>
                      isTablet && (v === 0 || v === 100) ? (
                        <>
                          Deposit
                          <br />${v}%
                        </>
                      ) : (
                        `Deposit: ${v}%`
                      )
                    }
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
                    min={2}
                    max={15}
                    step={null}
                    aria-label="Years Financed"
                    valueLabelDisplay="on"
                    valueLabelFormat={v =>
                      isTablet && (v === 2 || v === 15) ? (
                        <>
                          Years
                          <br />
                          financed: {v}
                        </>
                      ) : (
                        `Years financed: ${v}`
                      )
                    }
                    className="my-5"
                    sx={{
                      '& .MuiSlider-mark': { display: 'none' },
                      '& .MuiSlider-markLabel': { display: 'none' },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-zinc-900 text-3xl font-light mb-6">
                Monthly bill with Lumo
              </h2>

              <div className="text-gray-700 text-base md:text-lg font-normal space-y-3">
                <div className="flex justify-between">
                  <span>Finance cost</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyFinanceBill,
                    )}
                  </span>
                </div>

                <div className="flex justify-between bg-[#9FFFC6] px-3 py-1.5">
                  <span>Lumo optimised bill</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlySolarBatteryLumoUtilityBill,
                    )}
                  </span>{' '}
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <span>Total monthly bill</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyOptimisedCombinedBill,
                    )}
                  </span>
                </div>

                <h3 className="text-zinc-900 text-3xl font-light mt-6">
                  Versus a standard system
                </h3>

                <div className="flex justify-between mt-2">
                  <span>Finance cost</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyFinanceBill,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Standard bill</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlySolarBatteryUtilityBill,
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <span>Total monthly bill</span>
                  <span>
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyUnoptimisedCombinedBill,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions className="flex flex-col gap-4 mt-6 px-4 md:px-8 md:items-end!">
        <GetFreeQuoteButton />
        <button
          onClick={onClose}
          className="block md:hidden w-full max-w-xs text-zinc-900 font-medium border border-zinc-200 py-5 rounded-full"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceConfigDialog;
