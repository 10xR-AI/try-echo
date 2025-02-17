// components/admin/AnalyticsDashboard.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { 
  Users, Clock, Calendar, Trophy, Download, 
  ChevronUp, ChevronDown, Play, Pause 
} from 'lucide-react';

interface Prospect {
  id: string;
  name: string;
  company: string;
  timeSpent: number;
  questionsAsked: number;
  leadScore: number;
  lastActive: string;
  sessions: Session[];
}

interface Session {
  timestamp: string;
  action: string;
  slideNumber?: number;
  question?: string;
}

interface SlideEngagement {
  slideNumber: number;
  thumbnail: string;
  engagementScore: number;
  timeSpent: number;
}

interface AnalyticsDashboardProps {
  campaignId: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({  }) => {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [sortField, setSortField] = useState<'timeSpent' | 'questionsAsked' | 'leadScore'>('leadScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isReplayPlaying, setIsReplayPlaying] = useState(false);

  // Mock data - replace with real data
  const metrics = {
    openRate: 68,
    avgSessionTime: '8.5 mins',
    meetingsBooked: 12,
    topProspect: {
      name: 'John Doe',
      timeSpent: '12 mins'
    }
  };
  
  const slideEngagement: SlideEngagement[] = [
    { slideNumber: 1, thumbnail: '/api/placeholder/120/80', engagementScore: 85, timeSpent: 125 },
    { slideNumber: 2, thumbnail: '/api/placeholder/120/80', engagementScore: 92, timeSpent: 180 },
    { slideNumber: 3, thumbnail: '/api/placeholder/120/80', engagementScore: 75, timeSpent: 90 },
    { slideNumber: 4, thumbnail: '/api/placeholder/120/80', engagementScore: 88, timeSpent: 140 },
    { slideNumber: 5, thumbnail: '/api/placeholder/120/80', engagementScore: 78, timeSpent: 110 },
    { slideNumber: 6, thumbnail: '/api/placeholder/120/80', engagementScore: 92, timeSpent: 160 },
    { slideNumber: 7, thumbnail: '/api/placeholder/120/80', engagementScore: 83, timeSpent: 120 },
    { slideNumber: 8, thumbnail: '/api/placeholder/120/80', engagementScore: 80, timeSpent: 135 },
    // { slideNumber: 9, thumbnail: '/api/placeholder/120/80', engagementScore: 85, timeSpent: 130 },
    // { slideNumber: 10, thumbnail: '/api/placeholder/120/80', engagementScore: 90, timeSpent: 150 }
  ];
  
  const prospects: Prospect[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Tech Corp',
      timeSpent: 720,
      questionsAsked: 8,
      leadScore: 85,
      lastActive: '2 hours ago',
      sessions: [
        { timestamp: '10:00 AM', action: 'Viewed slide 1' },
        { timestamp: '10:02 AM', action: 'Asked about pricing', question: 'What is the enterprise pricing?' },
        { timestamp: '10:05 AM', action: 'Skipped to slide 7' },
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      company: 'Innovate LLC',
      timeSpent: 540,
      questionsAsked: 7,
      leadScore: 80,
      lastActive: '1 hour ago',
      sessions: [
        { timestamp: '9:30 AM', action: 'Viewed slide 2' },
        { timestamp: '9:35 AM', action: 'Asked about support', question: 'How is customer support handled?' },
        { timestamp: '9:40 AM', action: 'Skipped to slide 5' },
      ]
    },
    {
      id: '3',
      name: 'Alex Johnson',
      company: 'FutureTech',
      timeSpent: 600,
      questionsAsked: 6,
      leadScore: 88,
      lastActive: '3 hours ago',
      sessions: [
        { timestamp: '8:00 AM', action: 'Viewed slide 3' },
        { timestamp: '8:05 AM', action: 'Asked about integration', question: 'How does it integrate with existing systems?' },
        { timestamp: '8:10 AM', action: 'Skipped to slide 8' },
      ]
    },
    {
      id: '4',
      name: 'Sara Lee',
      company: 'Tech Dynamics',
      timeSpent: 650,
      questionsAsked: 9,
      leadScore: 90,
      lastActive: '30 minutes ago',
      sessions: [
        { timestamp: '11:00 AM', action: 'Viewed slide 4' },
        { timestamp: '11:05 AM', action: 'Asked about security', question: 'What security features are available?' },
        { timestamp: '11:10 AM', action: 'Skipped to slide 9' },
      ]
    },
    {
      id: '5',
      name: 'Michael Brown',
      company: 'Solutions Co.',
      timeSpent: 720,
      questionsAsked: 5,
      leadScore: 75,
      lastActive: '4 hours ago',
      sessions: [
        { timestamp: '12:00 PM', action: 'Viewed slide 1' },
        { timestamp: '12:10 PM', action: 'Asked about pricing', question: 'What is the cost of the basic package?' },
        { timestamp: '12:15 PM', action: 'Skipped to slide 6' },
      ]
    },
    {
      id: '6',
      name: 'Emily Davis',
      company: 'Edge Solutions',
      timeSpent: 550,
      questionsAsked: 6,
      leadScore: 82,
      lastActive: '1 hour ago',
      sessions: [
        { timestamp: '10:30 AM', action: 'Viewed slide 2' },
        { timestamp: '10:35 AM', action: 'Asked about integration', question: 'How does it integrate with Salesforce?' },
        { timestamp: '10:40 AM', action: 'Skipped to slide 4' },
      ]
    },
    {
      id: '7',
      name: 'William Harris',
      company: 'Global Systems',
      timeSpent: 600,
      questionsAsked: 10,
      leadScore: 92,
      lastActive: '45 minutes ago',
      sessions: [
        { timestamp: '9:00 AM', action: 'Viewed slide 3' },
        { timestamp: '9:05 AM', action: 'Asked about security', question: 'What encryption methods are used?' },
        { timestamp: '9:10 AM', action: 'Skipped to slide 7' },
      ]
    },
    {
      id: '8',
      name: 'Olivia Wilson',
      company: 'Visionary Corp',
      timeSpent: 530,
      questionsAsked: 4,
      leadScore: 78,
      lastActive: '2 hours ago',
      sessions: [
        { timestamp: '11:30 AM', action: 'Viewed slide 1' },
        { timestamp: '11:35 AM', action: 'Asked about support', question: 'What kind of customer support is available?' },
        { timestamp: '11:40 AM', action: 'Skipped to slide 6' },
      ]
    },
    {
      id: '9',
      name: 'David Martinez',
      company: 'Tech Systems',
      timeSpent: 670,
      questionsAsked: 6,
      leadScore: 85,
      lastActive: '1 hour ago',
      sessions: [
        { timestamp: '10:00 AM', action: 'Viewed slide 4' },
        { timestamp: '10:05 AM', action: 'Asked about pricing', question: 'What are the subscription tiers?' },
        { timestamp: '10:10 AM', action: 'Skipped to slide 9' },
      ]
    },
    {
      id: '10',
      name: 'Charlotte Moore',
      company: 'Innovate Ltd.',
      timeSpent: 680,
      questionsAsked: 7,
      leadScore: 88,
      lastActive: '30 minutes ago',
      sessions: [
        { timestamp: '12:00 PM', action: 'Viewed slide 8' },
        { timestamp: '12:05 PM', action: 'Asked about security', question: 'How is data protected?' },
        { timestamp: '12:10 PM', action: 'Skipped to slide 5' },
      ]
    }
  ];
  
  const questions = [
    { text: 'security', count: 15 },
    { text: 'pricing', count: 12 },
    { text: 'integration', count: 10 },
    { text: 'support', count: 8 },
    { text: 'performance', count: 14 },
    { text: 'scalability', count: 9 },
    { text: 'features', count: 11 },
    { text: 'customization', count: 13 },
    { text: 'availability', count: 6 },
    { text: 'deployment', count: 7 }
  ];
  
  // Derived metrics based on the expanded data
  const averageLeadScore = (prospects.reduce((total, p) => total + p.leadScore, 0) / prospects.length).toFixed(2);
  const totalQuestionsAsked = questions.reduce((total, q) => total + q.count, 0);
  const avgQuestionsAsked = (totalQuestionsAsked / prospects.length).toFixed(2);
  const totalTimeSpent = prospects.reduce((total, p) => total + p.timeSpent, 0);
  const avgTimeSpent = (totalTimeSpent / prospects.length).toFixed(2);
  
  const derivedMetrics = {
    averageLeadScore,
    totalQuestionsAsked,
    avgQuestionsAsked,
    avgTimeSpent: `${(Number(avgTimeSpent) / 60).toFixed(2)} mins`
  };
  
  console.log(derivedMetrics);
  

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} mins`;
  };

  const handleSort = (field: 'timeSpent' | 'questionsAsked' | 'leadScore') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortedProspects = () => {
    return [...prospects].sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (a[sortField] - b[sortField]) * multiplier;
    });
  };

  const getEngagementColor = (score: number): string => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Top Metrics Bar */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.openRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Avg. Session Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.avgSessionTime}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Meetings Booked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.meetingsBooked}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-500" />
              Top Prospect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.topProspect.name}</p>
            <p className="text-sm text-gray-500">{metrics.topProspect.timeSpent}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Heatmap and Leaderboard */}
        <div className="col-span-8 space-y-6">
          {/* Engagement Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Slide Engagement Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {slideEngagement.map((slide) => (
                  <div key={slide.slideNumber} className="relative">
                    <img
                      src={slide.thumbnail}
                      alt={`Slide ${slide.slideNumber}`}
                      className="w-20 h-40 rounded-lg"
                    />
                    <div
                      className={`absolute inset-0 ${getEngagementColor(slide.engagementScore)} opacity-40 rounded-lg`}
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {formatTime(slide.timeSpent)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prospect Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Prospect Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Prospect</th>
                      <th className="cursor-pointer" onClick={() => handleSort('timeSpent')}>
                        <div className="flex items-center gap-1">
                          Time Spent
                          {sortField === 'timeSpent' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="cursor-pointer" onClick={() => handleSort('questionsAsked')}>
                        <div className="flex items-center gap-1">
                          Questions
                          {sortField === 'questionsAsked' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="cursor-pointer" onClick={() => handleSort('leadScore')}>
                        <div className="flex items-center gap-1">
                          Lead Score
                          {sortField === 'leadScore' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th>Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedProspects().map((prospect) => (
                      <tr
                        key={prospect.id}
                        className="border-b cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedProspect(prospect)}
                      >
                        <td className="py-2">
                          <div>
                            <p className="font-medium">{prospect.name}</p>
                            <p className="text-sm text-gray-500">{prospect.company}</p>
                          </div>
                        </td>
                        <td>{formatTime(prospect.timeSpent)}</td>
                        <td>{prospect.questionsAsked}</td>
                        <td>{prospect.leadScore}</td>
                        <td>{prospect.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Questions and Session Replay */}
        <div className="col-span-4 space-y-6">
          {/* Question Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Question Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {questions.map((question) => (
                  <span
                    key={question.text}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    style={{
                      fontSize: `${Math.max(0.75, question.count / 10)}rem`
                    }}
                  >
                    {question.text}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4" />
                Export Questions CSV
              </button>
            </CardContent>
          </Card>

          {/* Session Replay */}
          {selectedProspect && (
            <Card>
              <CardHeader>
                <CardTitle>Session Replay - {selectedProspect.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsReplayPlaying(!isReplayPlaying)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                    >
                      {isReplayPlaying ? (
                        <Pause className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Play className="h-4 w-4 text-blue-600" />
                      )}
                    </button>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-1/3" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedProspect.sessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded"
                      >
                        <div className="w-20 text-sm text-gray-500">
                          {session.timestamp}
                        </div>
                        <div>
                          <p className="font-medium">{session.action}</p>
                          {session.question && (
                            <p className="text-sm text-gray-600">&quot;{session.question}&quot;</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;