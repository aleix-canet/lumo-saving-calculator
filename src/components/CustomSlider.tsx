import { Slider, type SliderProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { colors } from '../constants/colors';

export const CustomSlider = styled(Slider)<SliderProps>(() => ({
  color: colors.lumoGreen,
  height: 4,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    border: `2px solid ${colors.lumoGreen}`,
    boxShadow: '0px 0px 4px rgba(0,0,0,0.15)',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: '0px 0px 6px rgba(0,0,0,0.25)',
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#e0e0e0',
    opacity: 1,
  },
  '& .MuiSlider-track': {
    backgroundColor: colors.lumoGreen,
    border: 'none',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#fff',
    color: '#414651',
    fontWeight: 500,
    fontSize: '18px',
    boxShadow:
      '0 12px 16px -4px rgba(10, 13, 18, 0.08), 0 4px 6px -2px rgba(10, 13, 18, 0.03)',
    borderRadius: 8,
    padding: '4px 8px',
  },
}));

interface AnimatedCustomSliderProps extends SliderProps {
  targetValue: number;
  step: number | null;
  min: number;
  max: number;
  duration?: number;
  onSliderChange: (value: number) => void;
  valueLabelFormat?: (value: number) => string;
  'aria-label'?: string;
}

const AnimatedCustomSlider = ({
  targetValue,
  step,
  min,
  max,
  duration = 500,
  onSliderChange,
  valueLabelFormat,
  ...rest
}: AnimatedCustomSliderProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const newValue = Math.min(
        min + ((targetValue - min) * progress) / duration,
        targetValue,
      );

      const rounded = Math.round(newValue / step) * step;
      setValue(rounded);

      if (newValue < targetValue) {
        requestAnimationFrame(animate);
      } else {
        onSliderChange(targetValue);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomSlider
      value={value}
      onChange={(_, val) => {
        setValue(val as number);
        onSliderChange(val as number);
      }}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="on"
      valueLabelFormat={valueLabelFormat}
      {...rest}
    />
  );
};

export default AnimatedCustomSlider;
