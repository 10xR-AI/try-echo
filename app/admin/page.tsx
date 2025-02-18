// app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from './components/AdminLogin';
import { PlusCircle, BarChart3 } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = (success: boolean): void => {
    setIsAuthenticated(success);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Campaign Management
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Campaign Card */}
          <button
            onClick={() => router.push('/admin/create-campaign')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center gap-4 border border-gray-200"
          >
            <PlusCircle className="w-12 h-12 text-blue-600" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Campaign</h2>
              <p className="text-gray-600">Launch a new personalized campaign with custom content</p>
            </div>
          </button>

          {/* View Dashboard Card */}
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center gap-4 border border-gray-200"
          >
            <BarChart3 className="w-12 h-12 text-blue-600" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">View Dashboard</h2>
              <p className="text-gray-600">Monitor and analyze your active campaign performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;