import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';

function App() {
  return (
    <AppProvider i18n={{}}>
      <RouterProvider router={router} />
    </AppProvider>

  );
}
export default App
