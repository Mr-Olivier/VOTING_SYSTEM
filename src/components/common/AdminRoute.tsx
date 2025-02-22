import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector(state => state.auth);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};