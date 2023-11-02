import { DetailingTools, ListingTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts/BaseLayout';

export const Dashboard = () => {
  return (
    <BaseLayout 
      title="Página Inicial" 
      toolbar={
        <DetailingTools />
      }
    >
      Testando
    </BaseLayout>
  );
};