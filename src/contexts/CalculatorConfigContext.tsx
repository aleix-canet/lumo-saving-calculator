import { createContext, useContext } from 'react';

export type SystemConfig = {
  solarPanels: number;
  batterySize: number;
  numberOfBedrooms: number;
  depositSize: number;
  yearsFinanced: number;
};

type SystemConfigContextType = {
  config: SystemConfig;
  updateConfig: <K extends keyof SystemConfig>(
    key: K,
    value: SystemConfig[K],
  ) => void;
};

export const defaultConfig: SystemConfig = {
  solarPanels: 12,
  batterySize: 10,
  numberOfBedrooms: 2,
  depositSize: 0,
  yearsFinanced: 10,
};

export const SystemConfigContext = createContext<SystemConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
});

export const useSystemConfig = (): SystemConfigContextType => {
  const context = useContext(SystemConfigContext);
  return context;
};
