import { useSystemConfig } from '../contexts/CalculatorConfigContext';

interface GetFreeQuoteButtonProps {
  className?: string;
}
const GetFreeQuoteButton = ({ className }: GetFreeQuoteButtonProps) => {
  const { config } = useSystemConfig();

  const params = new URLSearchParams({
    solarPanels: config.solarPanels.toString(),
    batterySize: config.batterySize.toString(),
    numberOfBedrooms: config.numberOfBedrooms.toString(),
    depositSize: config.depositSize.toString(),
    yearsFinanced: config.yearsFinanced.toString(),
  });

  // TODO: Replace with actual URL for the external service
  const url = `https://externalurl.com?${params.toString()}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block px-8 py-5 bg-[#1FEA71]! hover:bg-[#20F877] rounded-[52px] text-zinc-900 hover:text-zinc-600 text-lg font-medium text-center ${className}`}
    >
      Get your free quote
    </a>
  );
};

export default GetFreeQuoteButton;
