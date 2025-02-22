import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>; 
};