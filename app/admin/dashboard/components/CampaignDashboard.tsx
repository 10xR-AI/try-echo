import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {  ChevronRight, Search, Filter } from 'lucide-react';
import AnalyticsDashboard from './AnalyticsDashboard';
import Link from 'next/link';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  metrics: {
    prospects: number;
    openRate: number;
    meetingsBooked: number;
  };
  lastUpdated: string;
}

const CampaignsDashboard = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all');

  // Mock campaigns data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Q4 Enterprise Outreach',
      status: 'active',
      startDate: '2024-01-15',
      metrics: {
        prospects: 250,
        openRate: 68,
        meetingsBooked: 12,
      },
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'Tech Summit Follow-up',
      status: 'completed',
      startDate: '2023-12-01',
      metrics: {
        prospects: 180,
        openRate: 72,
        meetingsBooked: 15,
      },
      lastUpdated: '5 days ago'
    },
    {
      id: '3',
      name: 'Mid-Market Initiative',
      status: 'active',
      startDate: '2024-02-01',
      metrics: {
        prospects: 320,
        openRate: 65,
        meetingsBooked: 8,
      },
      lastUpdated: '1 hour ago'
    },
    {
      id: '4',
      name: 'Healthcare Vertical',
      status: 'paused',
      startDate: '2024-01-20',
      metrics: {
        prospects: 150,
        openRate: 58,
        meetingsBooked: 5,
      },
      lastUpdated: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCampaigns = campaigns
    .filter(campaign => 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === 'all' || campaign.status === statusFilter)
    );

  if (selectedCampaign) {
    return (
      <div>
        <button
          onClick={() => setSelectedCampaign(null)}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          ← Back to Campaigns
        </button>
        <AnalyticsDashboard campaignId={selectedCampaign} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Link href="/admin/create-campaign">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          New Campaign
        </button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'completed' | 'paused')}
            className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card 
            key={campaign.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCampaign(campaign.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <p className="text-sm text-gray-500">Started {campaign.startDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Prospects</p>
                  <p className="text-lg font-semibold">{campaign.metrics.prospects}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Open Rate</p>
                  <p className="text-lg font-semibold">{campaign.metrics.openRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Meetings</p>
                  <p className="text-lg font-semibold">{campaign.metrics.meetingsBooked}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Last updated {campaign.lastUpdated}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsDashboard;