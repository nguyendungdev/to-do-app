import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import { ToastContainer } from 'react-toastify';
import en from '@shopify/polaris/locales/en.json'

function App() {
  return (<>
    <AppProvider i18n={en}>
      <RouterProvider router={router} />
    </AppProvider >
    <ToastContainer pauseOnHover={false} />
  </>
  );
}
export default App
