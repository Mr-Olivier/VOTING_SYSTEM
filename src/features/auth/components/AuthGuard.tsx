// src/components/auth/AuthGuard.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      // Redirect to login page with return url
      navigate('/auth/login', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [token, navigate, location]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

