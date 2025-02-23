import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  navItems: NavItem[];
}

export const Sidebar = ({ isOpen, isMobileOpen, onMobileClose, navItems }: SidebarProps) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-transform lg:translate-x-0",
          isOpen ? "w-64" : "w-20",
          "hidden lg:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={cn(
            "flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700",
            isOpen ? "justify-start px-6" : "justify-center"
          )}>
            <img 
              src="/ur_logo.png" 
              alt="UR Logo" 
              className="h-8 w-auto"
            />
            {isOpen && (
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                UR-Electify
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg p-2 text-base font-normal",
                  isActiveRoute(item.href)
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-100"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6",
                  isActiveRoute(item.href)
                    ? "text-primary-700 dark:text-primary-100"
                    : "text-gray-500 dark:text-gray-400"
                )} />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/50"
          onClick={onMobileClose}
        />

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800">
          <div className="flex h-full flex-col">
            {/* Mobile Header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img src="/ur_logo.png" alt="UR Logo" className="h-8 w-auto" />
                <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  UR-Electify
                </span>
              </div>
              <button
                onClick={onMobileClose}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center rounded-lg p-2 text-base font-normal",
                    isActiveRoute(item.href)
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-100"
                      : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className={cn(
                    "h-6 w-6",
                    isActiveRoute(item.href)
                      ? "text-primary-700 dark:text-primary-100"
                      : "text-gray-500 dark:text-gray-400"
                  )} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};

