import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useEffect } from 'react';
import { ListItemLink } from './ListItemLink';
import { drawerLinks } from '../../mocks/drawerLinks';
import { useAuthContext } from '../../contexts/AuthContext';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logOut } = useAuthContext();

  useEffect(() => {
    setDrawerOptions(drawerLinks.map((data) => data));
  }, []);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="#" 
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(({path, icon, label, id}) => (
                <ListItemLink
                  key={id}
                  to={path}
                  icon={icon}
                  label={label}
                  onClick={smDown ? toggleDrawerOpen : undefined} 
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">

              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar tema" />
              </ListItemButton>

              <ListItemButton onClick={logOut}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>

            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
