import React from 'react';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  helper?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      helper,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={classNames(
              'block w-full rounded-md shadow-sm',
              'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle) && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && !showPasswordToggle && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{rightIcon}</span>
            </div>
          )}
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
        {helper && !error && (
          <p className="mt-1 text-sm text-gray-500">{helper}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';