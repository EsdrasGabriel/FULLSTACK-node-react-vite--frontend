import { BrowserRouter } from 'react-router-dom';

import './shared/services/TranslationYup';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { Login, MenuLateral } from './shared/components';
import { AppRoutes } from './routes';
import { AuthProvider } from './shared/contexts/AuthContext';

function App() {

  return (
    <AuthProvider>

      <AppThemeProvider>
        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>
                <AppRoutes />
              </MenuLateral>

            </BrowserRouter>
          </DrawerProvider>
          
        </Login>
      </AppThemeProvider>

    </AuthProvider>
  );
}

export default App;
