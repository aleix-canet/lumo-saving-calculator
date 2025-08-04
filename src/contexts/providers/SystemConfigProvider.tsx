import { useState } from 'react';
import {
  defaultConfig,
  SystemConfigContext,
  type SystemConfig,
} from '../CalculatorConfigContext';

export const SystemConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);

  const updateConfig = <K extends keyof SystemConfig>(
    key: K,
    value: SystemConfig[K],
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SystemConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </SystemConfigContext.Provider>
  );
};
