import type { SavingsCalculations } from '../../types/Calculations';

export function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return -(pv / nper);
  return -(pv * rate) / (1 - Math.pow(1 + rate, -nper));
}

type FinancialInputs = {
  solarPanels: number;
  batterySize: number;
  bedrooms: number;
  depositPercentage: number; // e.g. 20 for 20%
  yearsFinanced: number;
};

export type FinancialcalculationsOutput = {
  solarOnlySavings: number;
  solarBatterySavings: number;
  solarBatteryLumoSavings: number;
  depositAmount: number;
  financedAmount: number;
  monthlyFinanceBill: number;
  monthlyBaselineUtilityBill: number;
  monthlySolarBatteryUtilityBill: number;
  monthlySolarBatteryLumoUtilityBill: number;
  monthlyUnoptimisedCombinedBill: number;
  monthlyOptimisedCombinedBill: number;
};

const loanInterestMap: Record<number, number> = {
  2: 0,
  3: 0,
  5: 7,
  10: 8,
  15: 9,
};

export function calculateFinanceSummary(
  input: FinancialInputs,
  dataset: SavingsCalculations,
): FinancialcalculationsOutput {
  const {
    baselineUtilityBill,
    solarOnlyUtilityBill,
    solarBatteryUtilityBill,
    solarBatteryLumoUtilityBill,
    estimatedSystemPrice,
  } = dataset;

  const interestRate = loanInterestMap[input.yearsFinanced] ?? 0;

  const interest = interestRate / 100;
  const depositAmount = estimatedSystemPrice * (input.depositPercentage / 100);
  const financedAmount = estimatedSystemPrice - depositAmount;
  const monthlyFinanceBill = pmt(
    interest / 12,
    input.yearsFinanced * 12,
    financedAmount,
  );

  const monthlyBaselineUtilityBill = -(baselineUtilityBill / 12);
  const monthlySolarBatteryUtilityBill = -(solarBatteryUtilityBill / 12);
  const monthlySolarBatteryLumoUtilityBill = -(
    solarBatteryLumoUtilityBill / 12
  );

  return {
    solarOnlySavings: Number(
      (baselineUtilityBill - solarOnlyUtilityBill).toFixed(2),
    ),
    solarBatterySavings: Number(
      (baselineUtilityBill - solarBatteryUtilityBill).toFixed(2),
    ),
    solarBatteryLumoSavings: Number(
      (baselineUtilityBill - solarBatteryLumoUtilityBill).toFixed(2),
    ),
    depositAmount: Number(depositAmount.toFixed(2)),
    financedAmount: Number(financedAmount.toFixed(2)),
    monthlyFinanceBill: Math.round(Number(monthlyFinanceBill)),
    monthlyBaselineUtilityBill: Number(monthlyBaselineUtilityBill.toFixed(2)),
    monthlySolarBatteryUtilityBill: Math.round(
      Number(monthlySolarBatteryUtilityBill),
    ),
    monthlySolarBatteryLumoUtilityBill: Math.round(
      Number(monthlySolarBatteryLumoUtilityBill),
    ),
    monthlyUnoptimisedCombinedBill: Math.round(
      Number(monthlyFinanceBill + monthlySolarBatteryUtilityBill),
    ),
    monthlyOptimisedCombinedBill: Math.round(
      Number(monthlyFinanceBill + monthlySolarBatteryLumoUtilityBill),
    ),
  };
}
