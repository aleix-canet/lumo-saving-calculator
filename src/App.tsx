import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router';

import { SystemConfigProvider } from './contexts/providers/SystemConfigProvider';
import { router } from './router/router';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SystemConfigProvider>
        <RouterProvider router={router} />
      </SystemConfigProvider>
    </ThemeProvider>
  );
};

export default App;
