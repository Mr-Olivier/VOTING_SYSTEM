// src/config/navigation.ts
import { 
  LayoutDashboard, 
  Vote, 
  Users, 
  BarChart, 
  FileText, 
  Settings,
  Bell,
  UserPlus,
  CheckCircle
} from 'lucide-react';

export const dashboardNavigation = {
  admin: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Elections',
      href: '/dashboard/elections',
      icon: Vote,
      children: [
        {
          title: 'All Elections',
          href: '/dashboard/elections'
        },
        {
          title: 'Create Election',
          href: '/dashboard/elections/create'
        }
      ]
    },
    {
      title: 'Candidates',
      href: '/dashboard/candidates',
      icon: Users,
      children: [
        {
          title: 'All Candidates',
          href: '/dashboard/candidates'
        },
        {
          title: 'View Applications',
          href: '/dashboard/candidates/applications'
        }
      ]
    },
    {
      title: 'Results',
      href: '/dashboard/elections/results',
      icon: BarChart
    },
    {
      title: 'Publications',
      href: '/dashboard/publications',
      icon: FileText
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      children: [
        {
          title: 'Profile',
          href: '/dashboard/settings/profile'
        },
        {
          title: 'Security',
          href: '/dashboard/settings/security'
        },
        {
          title: 'System',
          href: '/dashboard/settings/system'
        }
      ]
    }
  ],
  student: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Active Elections',
      href: '/dashboard/elections',
      icon: Vote
    },
    {
      title: 'Candidate Registration',
      href: '/dashboard/candidates/register',
      icon: UserPlus
    },
    {
      title: 'My Votes',
      href: '/dashboard/my-votes',
      icon: CheckCircle
    },
    {
      title: 'Results',
      href: '/dashboard/elections/results',
      icon: BarChart
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      children: [
        {
          title: 'Profile',
          href: '/dashboard/settings/profile'
        },
        {
          title: 'Security',
          href: '/dashboard/settings/security'
        },
        {
          title: 'Notifications',
          href: '/dashboard/settings/notifications'
        }
      ]
    }
  ]
};