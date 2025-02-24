import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserSquare2, Key, Eye, EyeOff, LogIn} from 'lucide-react'; 
import { useAppDispatch, useAppSelector } from '@/store';
import { Button } from '@/components/ui/Button';
import { login } from '../authSlice';

export const Login = () => {
  const [registrationNumber, setregistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({ registrationNumber: false, password: false });
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);

  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNumber || !password) return;

    try {
      const result = await dispatch(login({ 
        registrationNumber, 
        password 
      })).unwrap();
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is already handled by the reducer
      console.error('Login failed:', error);
    }
  };

  const handleBlur = (field: 'registrationNumber' | 'password') => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  // Validation
  const getregistrationNumberError = () => {
    if (!touchedFields.registrationNumber) return '';
    if (!registrationNumber) return 'Registration number is required';
    if (!/^\d{9}$/.test(registrationNumber)) return 'Registration number must be 9 digits';
    return '';
  };

  const getPasswordError = () => {
    if (!touchedFields.password) return '';
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const registrationNumberError = getregistrationNumberError();
  const passwordError = getPasswordError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="flex justify-center items-center p-2 px-4 w-full">
          <Link to='/'  className=' border border-primary-400  px-4 p-2  rounded-md  font-bold text-primary-400 '>
            Back 
          </Link>
        </div>
        <div className="text-center">
          <img 
            className="mx-auto h-16 w-auto" 
            src="/ur_logo.png" 
            alt="UR Logo" 
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your UR-Electify account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Registration Number Input */}
            <div>
              <label 
                htmlFor="registrationNumber" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Registration Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserSquare2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="registrationNumber"
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setregistrationNumber(e.target.value.replace(/\D/g, ''))}
                  onBlur={() => handleBlur('registrationNumber')}
                  placeholder="Enter your registration number"
                  className={`
                    block w-full pl-10 pr-3 py-2 rounded-lg border-2
                    ${registrationNumberError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                    }
                    focus:outline-none focus:ring-2 focus:border-transparent
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-colors duration-200
                  `}
                  maxLength={9}
                />
              </div>
              {registrationNumberError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {registrationNumberError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  className={`
                    block w-full pl-10 pr-10 py-2 rounded-lg border-2
                    ${passwordError 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                    }
                    focus:outline-none focus:ring-2 focus:border-transparent
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-colors duration-200
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? ( 
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            disabled={!!registrationNumberError || !!passwordError}
            leftIcon={<LogIn className="w-5 h-5" />}
            className="group"
          >
            Sign In
          </Button>

          {/* Links */}
          <div className="flex items-center justify-between">
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 
                dark:text-primary-400 dark:hover:text-primary-300"
            >
              Forgot password?
            </Link>
            <Link
              to="/auth/register"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 
                dark:text-primary-400 dark:hover:text-primary-300"
            >
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};