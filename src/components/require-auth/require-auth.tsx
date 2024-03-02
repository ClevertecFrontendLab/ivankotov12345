import { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Paths } from '@typing/enums/paths';
import { history } from '@redux/configure-store';

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
    if (accessToken && history.location.pathname === Paths.HOME) {
      navigate(Paths.MAIN);
    } else if (!accessToken) {
      navigate(Paths.AUTH);
    }
  }, [accessToken, navigate]);
  return (
    accessToken ? <Outlet /> : <Navigate to={Paths.AUTH} />
  )
}
