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
    interestRate,
  } = dataset;

  const interest = parseFloat(interestRate.replace('%', '')) / 100;
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
    monthlyFinanceBill: Number(monthlyFinanceBill.toFixed(2)),
    monthlyBaselineUtilityBill: Number(monthlyBaselineUtilityBill.toFixed(2)),
    monthlySolarBatteryUtilityBill: Number(
      monthlySolarBatteryUtilityBill.toFixed(2),
    ),
    monthlySolarBatteryLumoUtilityBill: Number(
      monthlySolarBatteryLumoUtilityBill.toFixed(2),
    ),
    monthlyUnoptimisedCombinedBill: Number(
      (monthlyFinanceBill + monthlySolarBatteryUtilityBill).toFixed(2),
    ),
    monthlyOptimisedCombinedBill: Number(
      (monthlyFinanceBill + monthlySolarBatteryLumoUtilityBill).toFixed(2),
    ),
  };
}
