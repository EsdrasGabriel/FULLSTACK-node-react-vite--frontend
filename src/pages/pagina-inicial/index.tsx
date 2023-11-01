import { Button } from '@mui/material';
import { useDrawerContext } from '../../shared/contexts';

export const PaginaInicial = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>
  );
};