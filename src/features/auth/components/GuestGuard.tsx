import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { token, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (token && user) {
    // If user is already logged in, redirect to dashboard
    // or to the page they were trying to access
    const returnUrl = (location.state as any)?.from?.pathname || '/dashboard';
    return <Navigate to={returnUrl} replace />;
  }

  return <>{children}</>;
};