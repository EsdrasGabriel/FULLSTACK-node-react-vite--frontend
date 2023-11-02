import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Box } from '@mui/material';

interface IAppThemeProviderProps {
  children: React.ReactNode;
}
interface iDrawerOption {
  id: number;
  icon: string;
  label: string;
  path: string;
}
interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: iDrawerOption[];
  setDrawerOptions: (newDrawerOptions: iDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerOptions, setDrawerOptions] = useState<iDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);
  const handleSetDrawerOptions = useCallback((newDrawerOptions: iDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions }}>
        <Box>
          {children}
        </Box>
    </DrawerContext.Provider>
  );
};
