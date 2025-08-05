import { Tab, Tabs, type TabProps, type TabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../constants/colors';

export const CustomTabs = styled((props: TabsProps) => <Tabs {...props} />)({
  minHeight: 'unset',
  '& .MuiTabs-indicator': {
    height: '2px',
    backgroundColor: colors.grey[600],
  },
});

export const CustomTab = styled((props: TabProps) => (
  <Tab disableRipple disableFocusRipple disableTouchRipple {...props} />
))({
  color: '#666', // inactive color
  fontWeight: 400,
  fontSize: '1.125rem',
  textTransform: 'none',
  paddingBottom: '4px',
  minHeight: 'unset',
  '&.Mui-selected': {
    color: '#000', // active tab text
  },
  '&:focus-visible': {
    outline: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
});
