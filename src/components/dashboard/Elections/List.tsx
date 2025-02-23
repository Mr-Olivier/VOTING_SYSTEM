
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/Card'; 
import { Button } from '@/components/ui/Button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, Filter } from 'lucide-react';
import { useAppSelector } from '@/store';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ElectionsList = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';

  const mockElections = [
    {
      id: 1,
      title: "Student Guild Elections 2024",
      description: "Annual student guild leadership elections",
      startDate: "2024-11-25",
      endDate: "2024-12-01",
      status: "Active",
      candidates: 12,
      totalVotes: 1234
    },
    {
      id: 2,
      title: "Faculty Representative Election",
      description: "Faculty of Science representative election",
      startDate: "2024-11-28",
      endDate: "2024-12-05",
      status: "Upcoming",
      candidates: 8,
      totalVotes: 0
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Elections
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor all elections
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => navigate('/dashboard/elections/create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Election
          </Button>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search elections..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Elections Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Elections</CardTitle>
          <CardDescription>
            A list of all elections and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Total Votes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockElections.map((election) => (
                <TableRow key={election.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{election.title}</div>
                      <div className="text-sm text-gray-500">{election.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(election.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(election.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(election.status)}>
                      {election.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{election.candidates}</TableCell>
                  <TableCell>{election.totalVotes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate(`/dashboard/elections/${election.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};