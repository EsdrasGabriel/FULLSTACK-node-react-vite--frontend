import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import React from 'react';

import { Environment } from '../../environment';

interface IToolBarProps {
  searchText?: string;
  showInputSearch?: boolean;
  byChangingSearchText?: (newText: string) => void;
  textButton?: string;
  showButtonText?: boolean;
  byChangingTextButton?: () => void;
}

export const ListingTools: React.FC<IToolBarProps> = ({
  searchText = '',
  showInputSearch = false,
  byChangingSearchText,
  textButton = 'Nova',
  showButtonText = true,
  byChangingTextButton
}) => {
  const theme = useTheme();

  return (
    <Box 
      component={Paper} 
      height={theme.spacing(5)} 
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display="flex" 
      gap={1} 
      alignItems='center'
    >
      {showInputSearch && (
        <TextField 
        size='small'
        value={searchText}
        onChange={(e) => byChangingSearchText?.(e.target.value)}
        placeholder={Environment.SEARCH_INPUT}
      />
      )}
      <Box flex={1} display="flex" justifyContent="flex-end">
        {showButtonText && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={byChangingTextButton}
            endIcon={<Icon>add</Icon>}
          >{textButton}</Button>
        )}
      </Box>
    </Box>
  );
};