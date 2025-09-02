const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const displayPositiveOrNegativeCurrency = (value: number) => {
  const normalized = Object.is(value, -0) ? 0 : value;
  return gbpFormatter.format(normalized);
};
