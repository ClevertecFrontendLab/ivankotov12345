import { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Paths } from '@typing/enums/paths';

export const RequireAuth: React.FC = () => {
  const accessToken = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(Paths.MAIN);
    }
  }, [accessToken, navigate]);

  return (
    accessToken ? <Outlet /> : <Navigate to={Paths.AUTH} />

  )
}
