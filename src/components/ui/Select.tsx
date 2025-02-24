import React from 'react';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helper?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      error,
      helper,
      size = 'md',
      leftIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };

    return (
      <div className={classNames('relative', fullWidth && 'w-full')}>
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
          <select
            ref={ref}
            disabled={disabled}
            className={classNames(
              'block rounded-md border-gray-300',
              'focus:border-primary-500 focus:ring-primary-500',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
              'appearance-none',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
              leftIcon && 'pl-10',
              'pr-10',
              sizes[size],
              fullWidth && 'w-full',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
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

Select.displayName = 'Select';