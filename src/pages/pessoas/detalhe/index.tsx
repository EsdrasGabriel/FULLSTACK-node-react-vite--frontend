import { useNavigate, useParams } from 'react-router-dom';

import { BaseLayout } from '../../../shared/layouts/BaseLayout';
import { DetailingTools } from '../../../shared/components';

export const PeopleDetail: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();

  const navigate = useNavigate();

  return (
    <BaseLayout 
      title='Detalhe de pessoa'
      toolbar={
        <DetailingTools 
          textButtonNew='Nova'
          showButtonSaveAndClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          whenClickInSave={() => {}}
          whenClickInSaveAndClose={() => {}}          
          whenClickInDelete={() => {}}
          whenClickInBack={() => navigate('/pessoas')}
          whenClickInNew={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >

      Hello {id}

    </BaseLayout>
  );
};