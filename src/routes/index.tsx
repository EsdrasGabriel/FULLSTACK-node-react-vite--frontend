import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AppThemeProvider, DrawerProvider } from '../shared/contexts';
import { MenuLateral } from '../shared/components';
import { Dashboard } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/pagina-inicial',
    element: (
      <AppThemeProvider>
        <DrawerProvider>

          <MenuLateral>
            <Dashboard/>
          </MenuLateral>
          
        </DrawerProvider>
      </AppThemeProvider>
    ),
  },
  {
    path: '*',
    element: <Navigate to='pagina-inicial' />,
  },
]);
