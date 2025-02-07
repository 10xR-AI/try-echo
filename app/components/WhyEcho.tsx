import React from 'react';
import {LucideIcon, Brain, MessageSquare, Clock, BarChart2, Book,  FileText } from 'lucide-react';



interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
description: string;
  
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="ml-4 text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const EchoFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Enhanced Learning Outcomes",
      description: "Achieve 40% higher retention rates through personalized AI interactions that adapt to each student's learning pace and style."
    },
    {
      icon: MessageSquare,
      title: "Natural Voice Interaction",
      description: "Foster engagement through conversational learning that feels as natural as talking to a teacher."
    },
    {
      icon: Clock,
      title: "Continuous Learning Support",
      description: "24/7 AI-powered tutoring ensures students never feel stuck, with instant, contextually-relevant answers to their questions."
    },
    {
      icon: BarChart2,
      title: "Real-time Analytics",
      description: "Track student progress, identify knowledge gaps, and optimize learning paths with detailed performance insights."
    },
    {
      icon: Book,
      title: "Content Flexibility",
      description: "Transform any learning material into interactive conversations, from textbooks to custom course content."
    },
    {
      icon: FileText,
      title: "Smart Adaptive Assessments",
      description: "AI-driven quizzes and assessments dynamically adjust to student performance, ensuring personalized learning reinforcement and mastery of concepts."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Echo</h2>
        <p className="text-lg text-gray-600">Empower your learning journey with our innovative AI-powered platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EchoFeatures;