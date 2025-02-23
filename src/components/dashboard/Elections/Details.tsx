// src/pages/Dashboard/Elections/Details.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/Button';
import { BarChart, Users, Calendar, Clock, FileText, CheckCircle, Settings } from 'lucide-react';


export const ElectionDetails = () => {
  const { id } = useParams();
  // TODO: Fetch election details using id

  const mockElection = {
    id,
    title: "Student Guild Elections 2024",
    description: "Annual student guild leadership elections",
    startDate: "2024-11-25T00:00:00",
    endDate: "2024-12-01T23:59:59",
    status: "Active",
    totalVoters: 5000,
    votesCount: 2500,
    positions: [
      {
        id: 1,
        title: "Guild President",
        candidates: [
          { id: 1, name: "John Doe", votes: 1200 },
          { id: 2, name: "Jane Smith", votes: 800 },
        ]
      },
      // Add more positions
    ]
  };

  const timeRemaining = {
    days: 5,
    hours: 12,
    minutes: 30
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockElection.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {mockElection.description}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          {mockElection.status === 'Active' && (
            <Button variant="danger">
              End Election
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
            <Users className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((mockElection.votesCount / mockElection.totalVoters) * 100).toFixed(1)}%
            </div>
            <Progress 
              value={(mockElection.votesCount / mockElection.totalVoters) * 100} 
              className="h-2 mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              {mockElection.votesCount.toLocaleString()} of {mockElection.totalVoters.toLocaleString()} voters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Clock className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold">{timeRemaining.days}</div>
                <div className="text-xs text-gray-500">Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{timeRemaining.hours}</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{timeRemaining.minutes}</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <FileText className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockElection.positions.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              All positions filled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockElection.status}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Started {new Date(mockElection.startDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="voters">Voters</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Live Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {mockElection.positions.map(position => (
                  <div key={position.id} className="space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {position.title}
                    </h3>
                    {position.candidates.map(candidate => (
                      <div key={candidate.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{candidate.name}</span>
                          <span className="font-medium">
                            {((candidate.votes / mockElection.votesCount) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={(candidate.votes / mockElection.votesCount) * 100}
                          className="h-2"
                        />
                        <p className="text-sm text-gray-500">
                          {candidate.votes.toLocaleString()} votes
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          {/* Positions content */}
        </TabsContent>

        <TabsContent value="voters">
          {/* Voters content */}
        </TabsContent>

        <TabsContent value="audit">
          {/* Audit log content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};