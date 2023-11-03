import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PessoasService } from '../../../shared/services/api/pessoas/PessoasService';
import { BaseLayout } from '../../../shared/layouts/BaseLayout';
import { DetailingTools } from '../../../shared/components';
import { VTextField } from '../../../shared/forms';
import { Form } from '@unform/web';

export const PeopleDetail: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ name, setName] = useState<string>('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setName(result.nomeCompleto);
          }
        });
    }
  }, []);

  const handleSave = () => {

  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar ?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/pessoas');
          }
        });
    }
  };

  return (
    <BaseLayout 
      title={id === 'nova' ? 'Nova Pessoa' : name}
      toolbar={
        <DetailingTools 
          textButtonNew='Nova'
          showButtonSaveAndClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          whenClickInSave={() => {}}
          whenClickInSaveAndClose={() => {}}          
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInBack={() => navigate('/pessoas')}
          whenClickInNew={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

      <Form onSubmit={(data) => console.log(data)}>
        <VTextField
          name='nomeCompleto'
        />

        <button type='submit'>submit</button>
      </Form>

    </BaseLayout>
  );
};