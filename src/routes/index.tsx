import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AppThemeProvider } from '../shared/contexts';
import { MenuLateral } from '../shared/components';
import { PaginaInicial } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/pagina-inicial',
    element: (
      <AppThemeProvider>
        <MenuLateral>
          <PaginaInicial />
        </MenuLateral>
      </AppThemeProvider>
    ),
  },
  {
    path: '*',
    element: <Navigate to='pagina-inicial' />,
  },
]);
