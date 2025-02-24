import React from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import classNames from 'classnames';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      children,
      onClose,
      icon,
      action,
      ...props
    },
    ref
  ) => {
    const variants = {
      info: {
        wrapper: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-400',
        title: 'text-blue-800',
        content: 'text-blue-700',
      },
      success: {
        wrapper: 'bg-green-50 border-green-200',
        icon: 'text-green-400',
        title: 'text-green-800',
        content: 'text-green-700',
      },
      warning: {
        wrapper: 'bg-yellow-50 border-yellow-200',
        icon: 'text-yellow-400',
        title: 'text-yellow-800',
        content: 'text-yellow-700',
      },
      error: {
        wrapper: 'bg-red-50 border-red-200',
        icon: 'text-red-400',
        title: 'text-red-800',
        content: 'text-red-700',
      },
    };

    const defaultIcons = {
      info: <Info className="h-5 w-5" />,
      success: <CheckCircle className="h-5 w-5" />,
      warning: <AlertCircle className="h-5 w-5" />,
      error: <XCircle className="h-5 w-5" />,
    };

    return (
      <div
        ref={ref}
        className={classNames(
          'rounded-md border p-4',
          variants[variant].wrapper,
          className
        )}
        {...props}
      >
        <div className="flex">
          {(icon || defaultIcons[variant]) && (
            <div className={classNames('flex-shrink-0', variants[variant].icon)}>
              {icon || defaultIcons[variant]}
            </div>
          )}
          <div className="ml-3 flex-1">
            {title && (
              <h3
                className={classNames(
                  'text-sm font-medium mb-1',
                  variants[variant].title
                )}
              >
                {title}
              </h3>
            )}
            {children && (
              <div
                className={classNames(
                  'text-sm',
                  variants[variant].content
                )}
              >
                {children}
              </div>
            )}
            {action && (
              <div className="mt-4">{action}</div>
            )}
          </div>
          {onClose && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                className={classNames(
                  'inline-flex rounded-md p-1.5',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'hover:bg-white hover:bg-opacity-20',
                  variants[variant].icon
                )}
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';