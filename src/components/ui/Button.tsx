// src/components/ui/button.tsx
import * as React from "react"
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-600 dark:text-white dark:hover:bg-primary-700",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950",
        secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700",
        ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-800",
        link: "text-primary-600 underline-offset-4 hover:underline dark:text-primary-400",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 dark:bg-green-600 dark:text-white dark:hover:bg-green-700",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-700",
        info: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: undefined;
  to?: undefined;
}

interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href: string;
  to?: undefined;
}

interface LinkButtonProps
  extends Omit<Parameters<typeof Link>[0], keyof VariantProps<typeof buttonVariants>>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to: string;
  href?: undefined;
}

type ButtonProps = CommonButtonProps | AnchorButtonProps | LinkButtonProps

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const content = (
      <>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    const buttonClassName = cn(buttonVariants({ variant, size, fullWidth, className }));

    if ('to' in props && props.to !== undefined) {
      return (
        <Link
          {...(props as LinkButtonProps)}
          className={buttonClassName}
        >
          {content}
        </Link>
      );
    }

    if ('href' in props && props.href !== undefined) {
      return (
        <a
          {...(props as AnchorButtonProps)}
          className={buttonClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        className={buttonClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isLoading || (props as CommonButtonProps).disabled}
        {...(props as CommonButtonProps)}
      >
        {content}
      </button>
    );
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }