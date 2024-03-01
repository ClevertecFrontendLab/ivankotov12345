import { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Paths } from '@typing/enums/paths';

export const RequireAuth: React.FC = () => {
  let accessToken = localStorage.getItem('token');
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const queryToken = query.get('accessToken');
  
  if (queryToken) {
    accessToken = queryToken;
    localStorage.setItem('token', queryToken);
  }

  useEffect(() => {
    if (accessToken) {
      navigate(Paths.MAIN);
    }
  }, [accessToken, navigate]);

  return (
    accessToken ? <Outlet /> : <Navigate to={Paths.AUTH} />

  )
}
