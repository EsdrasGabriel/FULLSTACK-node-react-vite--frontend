import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  login: (email: string, password: string) => Promise<string | void>;
  isAuthenticated: boolean;
  logOut: () => void;
}
interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'accessToken';

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [ accessToken, setAccessToken ] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logOut: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};