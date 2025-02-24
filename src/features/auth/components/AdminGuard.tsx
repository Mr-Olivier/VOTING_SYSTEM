import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user } = useAppSelector(state => state.auth);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};