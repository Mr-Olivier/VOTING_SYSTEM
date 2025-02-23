
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Vote, Users, CheckCircle, BarChart, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppSelector } from '@/store';
import { Button } from '../ui/Button';
import { Progress } from '@/components/ui/progress';

export const Overview = () => {
  const { user } = useAppSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening with your elections today.
          </p>
        </div>
        {isAdmin && (
          <Button variant="default">  
            Create New Election
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
            <Vote className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +2 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +6 new registrations
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
            <BarChart className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-xs text-red-600 dark:text-red-400">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              -3% from last election
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Elections</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              This academic year
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Elections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: "Student Guild Elections 2024",
                  endDate: "2024-12-01",
                  progress: 45,
                  totalVotes: 1234
                },
                {
                  title: "Faculty Representative Election",
                  endDate: "2024-11-28",
                  progress: 75,
                  totalVotes: 856
                },
              ].map((election) => (
                <div key={election.title} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{election.title}</div>
                      <div className="text-sm text-gray-500">
                        Ends on {new Date(election.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{election.totalVotes}</div>
                      <div className="text-sm text-gray-500">Total Votes</div>
                    </div>
                  </div>
                  <Progress value={election.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "New Candidate",
                  description: "John Doe registered as a candidate",
                  time: "2 hours ago"
                },
                {
                  type: "Election Started",
                  description: "Faculty Representative Election is now active",
                  time: "5 hours ago"
                },
                {
                  type: "Results Published",
                  description: "Class Representative results are now available",
                  time: "1 day ago"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-2">
                    <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.type}
                      </p>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};