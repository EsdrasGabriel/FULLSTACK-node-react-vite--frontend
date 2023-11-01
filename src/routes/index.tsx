import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AppThemeProvider } from '../shared/contexts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <AppThemeProvider >
        <App />,
      </AppThemeProvider>
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
