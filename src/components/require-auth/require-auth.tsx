import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@typing/enums/paths';



export const RequireAuth: React.FC = () => {
  const accessToken = localStorage.getItem('token');
  return (
  accessToken ? <Outlet /> : <Navigate to={Paths.AUTH} />
  )
}
