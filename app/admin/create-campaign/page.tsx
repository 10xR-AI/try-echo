// app/admin/create-campaign/page.tsx
'use client';

import React, { useState } from 'react';

import ProspectUploader from '../components/ProspectUploader';
import ContentUploader from '../components/ContentUploader';
import MediaIntegrations from '../components/MediaIntegration';
import ReviewTest from '../components/ReviewTest';
import CampaignLoader from '../components/CampaignLoader';

interface CampaignData {
  prospects: number;
  slides: number;
  caseStudies: number;
  avatarImage?: string;
  audioBlob?: Blob;
}

const CreateCampaignPage: React.FC = () => {
  
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [campaignData] = useState<CampaignData>({
    prospects: 25,
    slides: 15,
    caseStudies: 3,
    avatarImage: '',
    audioBlob: undefined
  });

  const handleNext = (): void => {
    setCurrentStep(prev => prev + 1);
  };

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    try {
      // Simulate API call to launch campaign
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard after successful launch
      setCurrentStep(5);
    } catch (error) {
      console.error('Error launching campaign:', error);
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
            onBack={() => setCurrentStep(prev => prev - 1)}
            onObjectiveChange={() => {}} 
            onNext={handleNext} 
          />
        );
      case 3:
        return <MediaIntegrations 
          onBack={() => setCurrentStep(prev => prev - 1)}
          onNext={handleNext} 
        />;
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
        return <CampaignLoader />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      {currentStep < 5 && (
        <div className="w-full bg-white border-b px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              {['Prospects', 'Content', 'Media', 'Review'].map((step, index) => (
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

export default CreateCampaignPage;