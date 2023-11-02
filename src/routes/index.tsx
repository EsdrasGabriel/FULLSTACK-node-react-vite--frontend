import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  Dashboard,
  ListOfPeople
} from '../pages';


export const AppRoutes = () => {
  return (
      <Routes>

        <Route path='/*' element={<Navigate to='/dashboard' />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/pessoas' element={<ListOfPeople />}/>

      </Routes>
  );
};