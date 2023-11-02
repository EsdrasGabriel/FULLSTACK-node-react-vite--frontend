import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { ListingTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts/BaseLayout';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListOfPeople = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll(1, search)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
  }, [search]);

  return (
    <BaseLayout 
      title='Listagem de pessoas'
      toolbar={
        <ListingTools 
          textButton='Nova'
          showInputSearch
          searchText={search}
          byChangingSearchText={text => setSearchParams({ busca: text }, { replace: true })}
        />
      }
    >
      <Box>
        Hello
      </Box>
    </BaseLayout>
  );
};