import React from 'react';
import { Upload, Target, Play } from 'lucide-react';



interface StepCardProps {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}


interface ProcessStepProps{
  children: React.ReactNode;
  isLast?: boolean;
}

const StepCard = ({ number, title, description, icon: Icon }:StepCardProps) => (
  <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="absolute -top-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div className="mt-4 mb-4">
      <Icon className="w-12 h-12 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const ProcessStep = ({ children, isLast }:ProcessStepProps) => (
  <div className="flex-1 relative">
    {children}
    {!isLast && (
      <div className="hidden md:block absolute top-1/2 left-full w-16 border-t-2 border-dashed border-blue-300 -mt-20">
      </div>
    )}
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Upload Content",
      description: "Upload your existing materials - slides, PDFs, or lesson plans."
    },
    {
      number: "2",
      icon: Target,
      title: "Set Goals",
      description: "Define learning objectives and let Echo create personalized paths."
    },
    {
      number: "3",
      icon: Play,
      title: "Start Teaching",
      description: "Launch interactive sessions with voice-powered Q&A support."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">Get started with Echo in three simple steps</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-4 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <ProcessStep key={step.number} isLast={index === steps.length - 1}>
            <StepCard
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          </ProcessStep>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;