import { Slider, type SliderProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../constants/colors';

const CustomSlider = styled(Slider)<SliderProps>(() => ({
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

export default CustomSlider;
