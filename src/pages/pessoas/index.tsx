import { useEffect, useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IPeopleListing, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { BaseLayout } from '../../shared/layouts/BaseLayout';
import { ListingTools } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';

export const ListOfPeople = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce(3000);

  const [rows, setRows] = useState<IPeopleListing[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
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
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({id, nomeCompleto, email}) => (
              <TableRow key={id}>
                <TableCell>Ações</TableCell>
                <TableCell>{nomeCompleto}</TableCell>
                <TableCell>{email}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};