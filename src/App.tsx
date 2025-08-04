import { RouterProvider } from 'react-router';
import { SystemConfigProvider } from './contexts/providers/SystemConfigProvider';
import { router } from './router/router';

const App = () => {
  return (
    <SystemConfigProvider>
      <RouterProvider router={router} />
    </SystemConfigProvider>
  );
};

export default App;
