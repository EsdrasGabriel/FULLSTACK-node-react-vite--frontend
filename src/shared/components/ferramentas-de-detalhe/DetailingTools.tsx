import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

interface IDetailingToolsProps {
  textButtonNew?: string;
  
  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;

  byChangingInNew?: () => void;
  byChangingInBack?: () => void;
  byChangingInDelete?: () => void;
  byChangingInSave?: () => void;
  byChangingInSaveAndClose?: () => void;
}

export const DetailingTools: React.FC<IDetailingToolsProps> = ({
  textButtonNew = 'Novo',

  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveAndClose = false,

  byChangingInNew,
  byChangingInBack,
  byChangingInDelete,
  byChangingInSave,
  byChangingInSaveAndClose
}) => {
  const theme = useTheme();

  return (
    <Box
      component={Paper} 
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display="flex" 
      gap={1} 
      alignItems='center'
      height={theme.spacing(5)} 
    >
      {showButtonSave &&
        (<Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={byChangingInSave}
          startIcon={<Icon>save</Icon>}
        >Salvar</Button> )
      }
      {showButtonSaveAndClose &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >Salvar e voltar</Button> )
      }
      {showButtonDelete &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInDelete}
          startIcon={<Icon>delete</Icon>}
        >Apagar</Button> )
      }
      {showButtonNew &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInNew}
          startIcon={<Icon>add</Icon>}
        >{textButtonNew}</Button> )
      }

      <Divider variant='middle' orientation='vertical'/>

      {showButtonBack &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >Voltar</Button> )
      }
    </Box>
  );
};