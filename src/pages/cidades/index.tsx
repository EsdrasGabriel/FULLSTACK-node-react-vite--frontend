import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ICitiesListing, CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { BaseLayout } from '../../shared/layouts/BaseLayout';
import { ListingTools } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

export const ListOfCities = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { debounce } = useDebounce();

  const navigate = useNavigate();

  const [rows, setRows] = useState<ICitiesListing[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);
  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar ?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => {
              return [
                ...oldRows.filter(oldRow => oldRow.id !== id)
              ];
            });
            alert('Registro apagado com sucesso');
          }
        });
    }
  };

  return (
    <BaseLayout 
      title='Listagem de cidades'
      toolbar={
        <ListingTools 
          showInputSearch
          textButton='Nova'
          searchText={busca}
          byChangingButtonNew={() => navigate('/cidades/detalhe/nova')}
          byChangingSearchText={text => setSearchParams({ busca: text, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({id, nome}) => (
              <TableRow key={id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/cidades/detalhe/${id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{nome}</TableCell>
            </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading &&
              <TableRow>
                <TableCell colSpan={3}>
                    <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>
            }
            {(totalCount > 0 && totalCount > Environment.ROW_LIMIT) &&
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    color="primary" 
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                    />
                </TableCell>
              </TableRow>
            }
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};