import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { PessoasService } from '../../../shared/services/api/pessoas/PessoasService';
import { BaseLayout } from '../../../shared/layouts/BaseLayout';
import { DetailingTools } from '../../../shared/components';
import { VTextField } from '../../../shared/forms';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export const PeopleDetail: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ name, setName] = useState('');

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

            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'nova') {
      PessoasService
        .create(data)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    if (confirm('Realmente deseja apagar ?')) {
      PessoasService.deleteById(id)
        .then(result => {
          setIsLoading(false);

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
      title={id === 'nova' ? 'Nova pessoa' : name}
      toolbar={
        <DetailingTools 
          textButtonNew='Nova'
          showButtonSaveAndClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          whenClickInSave={() => formRef.current?.submitForm()}
          whenClickInSaveAndClose={() => {}}          
          whenClickInDelete={() => handleDelete(Number(id))}
          whenClickInBack={() => navigate('/pessoas')}
          whenClickInNew={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder='Nome Completo' name='nomeCompleto' />
        <VTextField placeholder='Email' name='email' />
        <VTextField placeholder='Cidade id' name='cidadeId' />
      </Form>

    </BaseLayout>
  );
};