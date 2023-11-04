import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { BaseLayout } from '../../shared/layouts/BaseLayout';
import { DetailingTools } from '../../shared/components';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(true);
  const [totalCountCities, setTotalCountCities] = useState<number>();
  const [isLoadingPeople, setIsLoadingPeople] = useState<boolean>(true);
  const [totalCountPeople, setTotalCountPeople] = useState<number>();

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingPeople(true);

      CidadesService.getAll(1)
        .then((result) => {
          setIsLoadingCities(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountCities(result.totalCount);
          }
        });
      PessoasService.getAll(1)
        .then((result) => {
          setIsLoadingPeople(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountPeople(result.totalCount);
          }
        });
  }, []);

  return (
    <BaseLayout 
      title="Dashboard" 
      toolbar={
        <DetailingTools 
        />
      }
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid container item spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>

                  <Typography variant='h5' align='center'>
                    Total de pessoas
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPeople &&
                      (
                        <Typography variant='h1'>
                          {totalCountPeople}
                        </Typography>
                      )
                    }
                    {isLoadingPeople &&
                      (
                        <Typography variant='h6'>
                          Carregando...
                        </Typography>
                      )
                    }
                  </Box>

                </CardContent>
              </Card>

            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              
              <Card>
                <CardContent>

                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCities &&
                      (
                        <Typography variant='h1'>
                          {totalCountCities}
                        </Typography>
                      )
                    }
                    {isLoadingCities &&
                      (
                        <Typography variant='h6'>
                          Carregando...
                        </Typography>
                      )
                    }
                  </Box>

                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};