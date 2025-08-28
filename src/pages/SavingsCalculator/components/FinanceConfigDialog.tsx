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
import InfoTooltip from '../../../components/InfoTooltip';
import { useSystemConfig } from '../../../contexts/CalculatorConfigContext';
import { displayPositiveOrNegativeCurrency } from '../../../utils/currency';
import type { FinancialcalculationsOutput } from '../utils';

interface FinanceConfigDialogProps {
  open: boolean;
  onClose: () => void;
  financialCalculations: FinancialcalculationsOutput;
  totalSystemCost: number;
}

const financeYearOptions = [2, 3, 5, 10, 15];

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
          <div className="flex flex-col gap-10 lg:flex-row md:gap-12">
            <div className="flex-1">
              <h2 className="text-zinc-900 text-2xl md:text-3xl font-light mb-4 md:mb-6 lg:whitespace-nowrap">
                Financing your Lumo system
              </h2>

              <div className="text-gray-700 text-base md:text-lg font-normal space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Total system cost </span>
                    <InfoTooltip title="The full price of your solar and battery system, including installation — an investment in lower bills for decades to come." />
                  </div>
                  <span className="text-zinc-900 whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(totalSystemCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Deposit size</span>
                    <InfoTooltip title="The upfront payment you make towards the system. A larger deposit means smaller monthly repayments and quicker payback." />
                  </div>
                  <span className="text-zinc-900 whitespace-nowrap">
                    £{depositSize}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Amount to be financed</span>
                    <InfoTooltip title="The balance after your deposit — this is what you'll spread out into affordable monthly payments." />
                  </div>
                  <span className="text-zinc-900 whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.financedAmount,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Number of years financed</span>
                    <InfoTooltip title="The length of time you'll repay the system. Longer terms lower monthly costs, shorter terms pay it off faster." />
                  </div>
                  <span className="text-zinc-900 whitespace-nowrap">
                    {yearsFinanced} years
                  </span>
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
                    value={Math.max(
                      0,
                      financeYearOptions.indexOf(yearsFinanced),
                    )}
                    onChange={(_, idx) =>
                      updateConfig(
                        'yearsFinanced',
                        financeYearOptions[idx as number],
                      )
                    }
                    marks={financeYearOptions.map((v, i) => ({
                      value: i,
                      label: v,
                    }))}
                    min={0}
                    max={financeYearOptions.length - 1}
                    step={1}
                    aria-label="Years Financed"
                    valueLabelDisplay="on"
                    valueLabelFormat={v =>
                      isTablet && (v === 2 || v === 15) ? (
                        <>
                          Years
                          <br />
                          financed: {financeYearOptions[v as number]}
                        </>
                      ) : (
                        `Years financed: ${financeYearOptions[v as number]}`
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
              <h2 className="text-zinc-900 text-3xl font-light mb-6 lg:whitespace-nowrap">
                Monthly bill with Lumo
              </h2>

              <div className="text-gray-700 text-base md:text-lg font-normal space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Finance cost</span>
                    <InfoTooltip title="Your fixed monthly repayment for the system — turning your energy savings into an affordable investment." />
                  </div>
                  <span className="whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyFinanceBill,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-[#9FFFC6] px-3 py-1.5 w-full">
                  <div className="flex items-center gap-2">
                    <span>Lumo optimised bill</span>
                    <InfoTooltip title="Your new electricity bill once Lumo's software cuts your grid use by up to 30% more than a standard system, potentially saving you 100% of your bill and making you money on top." />
                  </div>
                  <span className="whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlySolarBatteryLumoUtilityBill,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span>Total monthly bill</span>
                    <InfoTooltip title="Finance + reduced bill = your total cost each month with Lumo — usually much lower than staying with your energy supplier." />
                  </div>
                  <span className="whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyOptimisedCombinedBill,
                    )}
                  </span>
                </div>

                <h3 className="text-zinc-900 text-3xl font-light mt-6 lg:whitespace-nowrap">
                  Versus a standard system
                </h3>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span>Finance cost</span>
                    <InfoTooltip title="Your monthly repayment for a standard solar and battery setup — the same system, but without Lumo's added savings." />
                  </div>
                  <span className="whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlyFinanceBill,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Standard bill</span>
                    <InfoTooltip title="Your likely electricity bill with a regular solar and battery system, before optimisation." />
                  </div>
                  <span className="whitespace-nowrap">
                    {displayPositiveOrNegativeCurrency(
                      financialCalculations.monthlySolarBatteryUtilityBill,
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span>Total monthly bill</span>
                    <InfoTooltip title="Finance + remaining energy bill with a standard system — usually higher than with Lumo because you miss out on the extra savings." />
                  </div>
                  <span className="whitespace-nowrap">
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

      <DialogActions className="flex flex-col gap-4 mt-6 px-4 md:px-8 md:mr-14 md:items-end!">
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
