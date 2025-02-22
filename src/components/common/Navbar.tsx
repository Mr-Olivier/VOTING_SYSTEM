
import  { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sun,
  Moon,
  UserCircle,
  Bell,
  Search,
  HelpCircle,
  Vote,
  Trophy,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDarkMode } from '@/hooks/useDarkMode'; 
import classNames from 'classnames';
import { AccessibilityControls } from './AccessibilityControls';

const navigation = [
  { 
    name: 'Home',
    href: '/',
  },
  {
    name: 'Elections',
    href: '/elections',
    submenu: [
      { 
        name: 'Active Elections',
        href: '/elections/active',
        description: 'View and participate in ongoing elections'
      },
      { 
        name: 'Election Results',
        href: '/elections/results',
        description: 'See the outcomes of completed elections'
      },
      { 
        name: 'Candidate Registration',
        href: '/elections/register',
        description: 'Register as a candidate for upcoming elections'
      },
      { 
        name: 'Election Calendar',
        href: '/elections/calendar',
        description: 'View the schedule of upcoming elections'
      }
    ]
  },
  { 
    name: 'Publications',
    href: '/publications',
    submenu: [
      {
        name: 'Announcements',
        href: '/publications/announcements',
        description: 'Important updates and notices'
      },
      {
        name: 'News',
        href: '/publications/news',
        description: 'Latest news and updates'
      },
      {
        name: 'Guidelines',
        href: '/publications/guidelines',
        description: 'Election rules and procedures'
      }
    ]
  },
  { name: 'About', href: '/about' }
];

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Election Started',
    message: 'Student Guild Election 2024 is now active',
    time: '5 minutes ago',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'Results Published',
    message: 'Faculty representative election results are out',
    time: '1 hour ago',
    type: 'success',
    read: false
  }
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(mockNotifications);
  const [showSearch, setShowSearch] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <nav 
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        'bg-white dark:bg-gray-900',
        isScrolled ? 'shadow-md' : 'shadow-sm'
      )}
    >
      {/* Top banner for important announcements */}
      <div className="bg-primary-600 text-white px-4 py-2 text-center text-sm">
        <span>Student Guild Elections 2024 are now open! </span>
        <Link to="/elections/active" className="underline hover:text-white/90">
          Vote now
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Primary Nav */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center group">
                <img
                  className="h-10 w-auto group-hover:scale-105 transition-transform"
                  src="/ur_logo.png"
                  alt="UR Logo"
                />
                <span className="ml-3 text-xl font-bold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                  UR-Electify
                </span>
              </Link>
            </div>

            {/* Primary Nav - Desktop */}
            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={classNames(
                      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                      isActivePath(item.href)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Link>
                  
                  {/* Submenu - Desktop */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item.name}
                        </h3>
                      </div>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {subItem.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {subItem.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:ml-4 lg:flex lg:items-center lg:space-x-4">
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-900" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={classNames(
                          'px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50',
                          !notification.read && 'bg-blue-50 dark:bg-blue-900/20'
                        )}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <button
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

        {/* Accessibility Controls */}
         <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
           <AccessibilityControls />
         </div>

            <Button 
              to="/auth/login"
              variant="outline" 
              size="sm"
              className="ml-4"
              leftIcon={<UserCircle className="h-4 w-4" />}
            >
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={classNames(
          'lg:hidden transition-all duration-300 ease-in-out border-b border-gray-200 dark:border-gray-700',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <button
                className={classNames(
                  'w-full text-left px-3 py-2 rounded-md text-base font-medium',
                  isActivePath(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => {
                  if (item.submenu) {
                    setActiveSubmenu(activeSubmenu === item.name ? null : item.name);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.submenu && (
                    <ChevronDown 
                      className={classNames(
                        'h-4 w-4 transition-transform duration-200',
                        activeSubmenu === item.name ? 'transform rotate-180' : ''
                      )}
                    />
                  )}
                </div>
              </button>

                  {/* Mobile Submenu */}
              {item.submenu && activeSubmenu === item.name && (
                <div className="mt-2 space-y-1 px-3">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className="block px-3 py-2 rounded-md text-base text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {subItem.name}
                        </span>
                        <span className="mt-1 text-sm">
                          {subItem.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Actions */}
          <div className="px-3 py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {/* Search */}
            <Button
              variant="ghost"
              fullWidth
              leftIcon={<Search className="h-5 w-5" />}
              onClick={() => setShowSearch(true)}
            >
              Search
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              fullWidth
              leftIcon={<Bell className="h-5 w-5" />}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              Notifications
              {unreadNotificationsCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {unreadNotificationsCount}
                </span>
              )}
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              fullWidth
              leftIcon={<HelpCircle className="h-5 w-5" />}
              to="/help"
            >
              Help Center
            </Button>

            {/* Sign In */}
            <Button 
              variant="default"
              fullWidth
              leftIcon={<UserCircle className="h-5 w-5" />}
              to="/auth/login"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
              onClick={() => setShowSearch(false)}
            />

            {/* Search container */}
            <div className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none text-lg"
                  placeholder="Search for anything..."
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick links */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quick Links
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    { name: 'Active Elections', href: '/elections/active', icon: Vote },
                    { name: 'Latest Results', href: '/elections/results', icon: Trophy },
                    { name: 'Register as Candidate', href: '/elections/register', icon: UserCircle },
                    { name: 'Guidelines', href: '/publications/guidelines', icon: FileText },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setShowSearch(false)}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}; 