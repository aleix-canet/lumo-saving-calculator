import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Figtree, ui-sans-serif, system-ui, sans-serif',
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: 'Figtree, ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          backgroundColor: '#717680',
        },
        arrow: {
          color: '#717680',
        },
      },
    },
  },
});
