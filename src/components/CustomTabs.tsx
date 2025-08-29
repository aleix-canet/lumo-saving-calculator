import { Tab, Tabs, type TabProps, type TabsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomTabs = styled((props: TabsProps) => (
  <Tabs {...props} variant="fullWidth" />
))({
  minHeight: 'unset',
  overflow: 'visible',
  '& .MuiTabs-indicator': {
    height: '3px',
    backgroundColor: '#1FEA71',
  },
});

export const CustomTab = styled((props: TabProps) => (
  <Tab disableRipple disableFocusRipple disableTouchRipple {...props} />
))({
  color: '#717680', // inactive color
  fontWeight: 400,
  fontSize: '1.125rem',
  textTransform: 'none',
  paddingBottom: '12px',
  minHeight: 'unset',
  minWidth: 'auto',
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: '16px',
  '&:hover': {
    color: '#1D1D1F',
  },
  '&.Mui-selected': {
    color: '#1D1D1F', // active tab text
  },
  '&:focus-visible': {
    outline: 'none',
  },
  '&:focus': {
    outline: 'none',
  },
});
