import { useEffect } from 'react';
import { Navigate, Outlet, useLocation,useNavigate } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Paths } from '@typing/enums/paths';

export const RequireAuth: React.FC = () => {
  let accessToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

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
