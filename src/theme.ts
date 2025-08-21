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
  },
});
