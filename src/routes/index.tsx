import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  Dashboard,
  ListOfPeople,
  PeopleDetail,
  ListOfCities,
  CitiesDetail
} from '../pages';


export const AppRoutes = () => {
  return (
      <Routes>

        <Route path='/*' element={<Navigate to='/dashboard' />}/>

        <Route path='/dashboard' element={<Dashboard />}/>

        <Route path='/pessoas' element={<ListOfPeople />}/>
        <Route path='/pessoas/detalhe/:id' element={<PeopleDetail />}/>

        <Route path='/cidades' element={<ListOfCities />}/>
        <Route path='/cidades/detalhe/:id' element={<CitiesDetail />}/>

      </Routes>
  );
};