import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>

      <AppThemeProvider>
        <DrawerProvider>
          <MenuLateral>

            <AppRoutes />
          
          </MenuLateral>
        </DrawerProvider>
      </AppThemeProvider>

    </BrowserRouter>
  );
}

export default App;
