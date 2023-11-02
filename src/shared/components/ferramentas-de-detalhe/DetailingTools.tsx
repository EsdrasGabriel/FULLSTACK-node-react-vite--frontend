import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material';

interface IDetailingToolsProps {
  textButtonNew?: string;
  
  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;

  showLoadingButtonNew?: boolean;
  showLoadingButtonBack?: boolean;
  showLoadingButtonDelete?: boolean;
  showLoadingButtonSave?: boolean;
  showLoadingButtonSaveAndClose?: boolean;

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

  showLoadingButtonNew = false,
  showLoadingButtonBack = false,
  showLoadingButtonDelete = false,
  showLoadingButtonSave = false,
  showLoadingButtonSaveAndClose = false,

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
      {(showButtonSave && !showLoadingButtonSave) &&
        (<Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={byChangingInSave}
          startIcon={<Icon>save</Icon>}
        >Salvar</Button> )
      }

      {showLoadingButtonSave &&
        (<Skeleton 
          width={109}
          height={60}
        />)
      }

      {(showButtonSaveAndClose && !showLoadingButtonSaveAndClose) &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >Salvar e voltar</Button> )
      }

      {showLoadingButtonSaveAndClose &&
        (<Skeleton 
          width={180}
          height={60}
        />)
      }

      {(showButtonDelete && !showLoadingButtonDelete) &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInDelete}
          startIcon={<Icon>delete</Icon>}
        >Apagar</Button> )
      }

      {showLoadingButtonDelete &&
        (<Skeleton 
          width={109}
          height={60}
        />)
      }

      {(showButtonNew && !showLoadingButtonNew) &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInNew}
          startIcon={<Icon>add</Icon>}
        >{textButtonNew}</Button> )
      }

      {showLoadingButtonNew &&
        (<Skeleton 
          width={109}
          height={60}
        />)
      }

      <Divider variant='middle' orientation='vertical'/>

      {(showButtonBack && !showLoadingButtonBack) &&
        (<Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={byChangingInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >Voltar</Button> )
      }

      {showLoadingButtonBack &&
        (<Skeleton 
          width={109}
          height={60}
        />)
      }
    </Box>
  );
};