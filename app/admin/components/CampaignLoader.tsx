import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCampaignStore } from '@/store/CampaignStore';



const CampaignLoader: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentSubstepIndex, setCurrentSubstepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const testEmails = useCampaignStore(state => state.testEmails);

  console.log(testEmails)

  // Dynamically generate loading steps based on number of test emails
  const loadingSteps = useMemo(() => {

    return [
      {
        title: 'Enriching prospect information',
        substeps: [
          'Gathering company information',
          'Gathering LinkedIn post info',
          'Gathering Salesforce/Apollo information'
        ],
        duration: 2
      },
      {
        title: 'Ingesting slides & collateral',
        substeps: [
          'Creating navigation graph',
          'Appending missing information from collateral',
          'Creating voice agent'
        ],
        duration: 3
      },
      {
        title: 'Sending emails',
        substeps: [
          'Setting up template',
          'Sending mails'
        ],
        duration: 4
      },
      {
        title: 'Setting up analytics',
        substeps: [
          'Voice based analytics',
          'Intent analytics',
          'Email tracking setup'
        ],
        duration: 3
      }
    ];
  }, [testEmails]);

  useEffect(() => {
    const totalDuration = loadingSteps.reduce((acc, step) => acc + (step.duration * step.substeps.length), 0);
    
    let currentTime = 0;
    

    const updateProgress = () => {
      currentTime += 0.1;
      
      // Calculate progress percentage
      const progressPercentage = Math.min((currentTime / totalDuration) * 100, 100);
      setProgress(progressPercentage);

      if (currentTime >= totalDuration) {
        setIsComplete(true);
        clearInterval(timer);
        return;
      }

      // Calculate current step and substep
      let timeAccumulator = 0;
      let targetStepIndex = 0;
      let targetSubstepIndex = 0;

      for (let stepIndex = 0; stepIndex < loadingSteps.length; stepIndex++) {
        const step = loadingSteps[stepIndex];
        for (let substepIndex = 0; substepIndex < step.substeps.length; substepIndex++) {
          if (timeAccumulator + step.duration > currentTime) {
            targetStepIndex = stepIndex;
            targetSubstepIndex = substepIndex;
            setCurrentStepIndex(targetStepIndex);
            setCurrentSubstepIndex(targetSubstepIndex);
            return;
          }
          timeAccumulator += step.duration;
        }
      }
    };

    const timer = window.setInterval(updateProgress, 100);

    return () => clearInterval(timer);
  }, [loadingSteps]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading Steps */}
            <div className="space-y-6">
              {loadingSteps.map((step, stepIndex) => (
                <div key={step.title} className={`space-y-3 ${(!isComplete && stepIndex > currentStepIndex) ? 'opacity-40' : ''}`}>
                  <h3 className="font-medium flex items-center gap-2">
                    {isComplete || stepIndex < currentStepIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : stepIndex === currentStepIndex && !isComplete ? (
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    {step.title}
                  </h3>
                  <div className="ml-7 space-y-2">
                    {step.substeps.map((substep, substepIndex) => (
                      <div
                        key={substep}
                        className={`flex items-center gap-2 text-sm ${
                          isComplete || stepIndex < currentStepIndex || 
                          (stepIndex === currentStepIndex && substepIndex <= currentSubstepIndex)
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {isComplete || stepIndex < currentStepIndex || 
                         (stepIndex === currentStepIndex && substepIndex < currentSubstepIndex) ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : stepIndex === currentStepIndex && substepIndex === currentSubstepIndex && !isComplete ? (
                          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        {substep}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Completion State */}
            {isComplete && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                  Campaign is ready, Head over to Analytics
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignLoader;