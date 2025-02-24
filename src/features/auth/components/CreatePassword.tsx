import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createPassword } from '../authSlice';

interface PasswordRequirement {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters long',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Contains uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'Contains lowercase letter',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'Contains number',
    validator: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'Contains special character',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const dispatch = useAppDispatch();
  const { loading, error, registrationNumber } = useAppSelector((state) => state.auth);

  // Calculate password strength and requirements met
  const calculatePasswordStrength = (value: string) => {
    const meetsRequirements = passwordRequirements.filter(req => 
      req.validator(value)
    ).length;
    setPasswordStrength((meetsRequirements / passwordRequirements.length) * 100);
  };

  const getStrengthColor = () => {
    if (passwordStrength >= 100) return 'bg-green-500';
    if (passwordStrength >= 80) return 'bg-yellow-500';
    if (passwordStrength >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword && registrationNumber) {
      try {
        await dispatch(createPassword({ 
          registrationNumber, 
          password, 
          confirmPassword 
        })).unwrap();
      } catch (error) {
        // Error handling is managed by the slice
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-4">
          <Key className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Password
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Choose a strong password for your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Input */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                calculatePasswordStrength(e.target.value);
              }}
              className={`
                w-full px-4 py-2 rounded-lg border-2 
                ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStrengthColor()} transition-all duration-300`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Password Strength: {passwordStrength === 100 ? 'Strong' : 
                                passwordStrength >= 80 ? 'Good' :
                                passwordStrength >= 50 ? 'Fair' : 'Weak'}
            </p>
          </div>

          {/* Password Requirements */}
          <div className="space-y-2">
            {passwordRequirements.map((requirement) => (
              <div 
                key={requirement.id}
                className="flex items-center text-sm"
              >
                {requirement.validator(password) ? (
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <X className="w-4 h-4 text-red-500 mr-2" />
                )}
                <span className={`
                  ${requirement.validator(password) 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'}
                `}>
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`
                w-full px-4 py-2 rounded-lg border-2
                ${confirmPassword && password !== confirmPassword 
                  ? 'border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'}
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              `}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500">
              Passwords do not match
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          disabled={
            !password || 
            password !== confirmPassword || 
            passwordStrength < 100
          }
        >
          Create Password
        </Button>
      </form>
    </div>
  );
};