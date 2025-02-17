// app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import ProspectUploader from './components/ProspectUploader';
import ContentUploader from './components/ContentUploader';
import MediaIntegrations from './components/MediaIntegration';
import ReviewTest from './components/ReviewTest';
import AnalyticsDashboard from './components/AnalyticsDashboard';


interface CampaignData {
  prospects: number;
  slides: number;
  caseStudies: number;
  avatarImage?: string;
  audioBlob?: Blob;
};

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [campaignData] = useState<CampaignData>({
    prospects: 25,
    slides: 15,
    caseStudies: 3,
    avatarImage: '',
    audioBlob: undefined  // Changed from null to undefined to match the type
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [campaignId, setCampaignId] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  

  const handleLogin = (success: boolean): void => {
    setIsAuthenticated(success);
  };
  const handleNext = (): void => {
    setCurrentStep(prev => prev + 1);
  };

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    try {
      // Simulate API call to launch campaign
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock campaign ID
      const newCampaignId = `CAMP-${Math.random().toString(36).substr(2, 9)}`;
      setCampaignId(newCampaignId);
      
      // Move to analytics dashboard
      setCurrentStep(5);
    } catch (error) {
      console.error('Error launching campaign:', error);
      // Handle error state if needed
    } finally {
      setIsLaunching(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProspectUploader onNext={handleNext} />;
      case 2:
        return (
          <ContentUploader 
            onObjectiveChange={() => {}} 
            onNext={handleNext} 
          />
        );
      case 3:
        return <MediaIntegrations onNext={handleNext} />;
      case 4:
        return (
          <ReviewTest
            onBack={() => setCurrentStep(prev => prev - 1)}
            onLaunch={handleLaunchCampaign}
            campaignData={campaignData}
            isLaunching={isLaunching}
          />
        );
      case 5:
        return <AnalyticsDashboard campaignId={campaignId} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      {currentStep < 5 && (
        <div className="w-full bg-white border-b px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              {['Prospects', 'Content', 'Media', 'Review','Dashboard'].map((step, index) => (
                <React.Fragment key={step}>
                  {index > 0 && <div className="h-px w-8 bg-gray-300" />}
                  <div
                    className={`flex items-center space-x-2 ${
                      index + 1 === currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index + 1 === currentStep
                          ? 'bg-blue-600 text-white'
                          : index + 1 < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1 < currentStep ? '✓' : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={currentStep === 5 ? '' : 'max-w-7xl mx-auto py-6 px-4'}>
        {renderStep()}
      </div>
    </div>
  );
};

export default AdminPage;