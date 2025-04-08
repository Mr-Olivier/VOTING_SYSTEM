// types/navigation.ts
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

// constants/navigation.ts
import {
  Home,
  Vote,
  Users,
  FileText,
  BarChart,
  Settings,
  UserPlus,
} from "lucide-react";

 const adminNavItems: NavItem[] = [
  { label: "Overview", icon: Home, href: "/dashboard" },
  { label: "Elections", icon: Vote, href: "/dashboard/elections" },
  { label: "Candidates", icon: Users, href: "/dashboard/candidates" },
  { label: "Results", icon: BarChart, href: "/dashboard/results" },
  { label: "Publications", icon: FileText, href: "/dashboard/publications" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

 const studentNavItems: NavItem[] = [
  { label: "Overview", icon: Home, href: "/dashboard" },
  { label: "Active Elections", icon: Vote, href: "/dashboard/elections" },
  { label: "My Votes", icon: BarChart, href: "/dashboard/my-votes" },
  {
    label: "Candidate Registration",
    icon: UserPlus,
    href: "/dashboard/candidates/register",
  },
  { label: "Publications", icon: FileText, href: "/dashboard/publications" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

// layouts/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/store';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { logout } from '@/features/auth/authSlice';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Select navigation items based on user role
  const navItems: NavItem[] = user?.role === "admin" ? adminNavItems : studentNavItems;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        navItems={navItems}
      />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } transition-all duration-300`}
      >
        {/* Header */}
        <DashboardHeader
          onMenuClick={toggleMobileSidebar}
          onSidebarToggle={toggleSidebar}
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            registrationNumber: user.registrationNumber
          }}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

