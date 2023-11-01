import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../contexts';
import { useEffect } from 'react';
import { ListItemLink } from './ListItemLink';
import { drawerLinks } from '../../mocks/drawerLinks';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions(drawerLinks.map(data => data));
  }, []);

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/115937184?s=400&u=f9052996bdc6f59059e884a97f64dc43c4461f80&v=4"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOptions) => (
               <ListItemLink 
                key={drawerOptions.path}
                to={drawerOptions.path}
                icon={drawerOptions.icon}
                label={drawerOptions.label}
                onClick={smDown ? toggleDrawerOpen : undefined}
               />
              ))}
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
