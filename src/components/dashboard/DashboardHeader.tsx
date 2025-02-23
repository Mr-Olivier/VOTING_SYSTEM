import { Fragment } from 'react';
import { 
  Bell, 
  Menu, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { Popover, Transition, Menu as HeadlessMenu } from '@headlessui/react';
import { Button } from '../ui/Button';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '@/hooks/useDarkMode';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
}
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock notifications - replace with real data
const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Election',
    message: 'Presidential election is now open for voting',
    time: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Candidate Registration',
    message: 'Your candidacy has been approved',
    time: '1 hour ago',
    read: false
  }
];

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative"
      onClick={toggleDarkMode}
    >
      <div className="relative w-12 h-6 transition-colors duration-300 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className={`
          absolute left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-300 transform 
          ${isDarkMode ? 'translate-x-6 bg-primary-500' : 'translate-x-0 bg-white'}
          rounded-full shadow-sm
        `}>
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-primary-500" />
          )}
        </div>
      </div>
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
};

export const DashboardHeader = ({ onMenuClick, onSidebarToggle }: DashboardHeaderProps) => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Desktop menu button */}
      <Button
        variant="ghost"
        className="hidden lg:block"
        onClick={onSidebarToggle}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center justify-between gap-x-4 lg:gap-x-6">
          {/* User Info - visible on larger screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Welcome back,
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.registrationNumber}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Dark Mode Toggle */}
            <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
              <DarkModeToggle />
            </div>

            {/* Notifications */}
            <Popover className="relative">
              <Popover.Button as={Button} variant="ghost" className="relative">
                <Bell className="h-6 w-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Popover.Button>

              {/* Rest of notifications panel remains the same */}
            </Popover>

            {/* Profile dropdown remains the same */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center space-x-3">
                <div className="hidden lg:flex lg:items-center lg:space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
              </HeadlessMenu.Button>

              {/* Profile menu items */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.role}
                    </p>
                  </div>

                  <div className="py-1">
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate('/dashboard/settings')}
                          className={`${
                            active 
                              ? 'bg-gray-100 dark:bg-gray-700' 
                              : ''
                          } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </button>
                      )}
                    </HeadlessMenu.Item>
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active 
                              ? 'bg-gray-100 dark:bg-gray-700' 
                              : ''
                          } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      )}
                    </HeadlessMenu.Item>
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          </div>
        </div>
      </div>
    </header>
  );
};