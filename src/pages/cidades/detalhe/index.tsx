import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../../shared/forms';
import { BaseLayout } from '../../../shared/layouts/BaseLayout';
import { DetailingTools } from '../../../shared/components';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
}); 

export const CitiesDetail: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'nova' } = useParams<'id'>();
  console.log(id);
  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setName(result.nome);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        if (id === 'nova') {
          CidadesService
            .create(validatedData)
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadesService
            .updateById(Number(id), { id: Number(id), ...validatedData })
            .then((result) => {
              setIsLoading(false);
    
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });


        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    if (confirm('Realmente deseja apagar ?')) {
      CidadesService.deleteById(id)
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/cidades');
          }
        });
    }
  };

  return (
    <BaseLayout 
      title={id === 'nova' ? 'Nova cidade' : name}
      toolbar={
        <DetailingTools 
          textButtonNew='Nova'
          showButtonSaveAndClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          whenClickInSave={save}
          whenClickInSaveAndClose={saveAndClose}          
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInBack={() => navigate('/cidades')}
          whenClickInNew={() => navigate('/cidades/detalhe/nova')}
        />
      }
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading &&
              (<Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>)
            }

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome'
                  name='nome'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            
          </Grid>

        </Box>
      </VForm>

    </BaseLayout>
  );
};