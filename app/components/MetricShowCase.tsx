import React from 'react';
import { LucideIcon,TrendingUp, Clock, Users, ThumbsUp } from 'lucide-react';



interface MetricCardProps {
  metric: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
}

const MetricCard = ({ metric, label, sublabel, icon: Icon }:MetricCardProps) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-4xl font-bold text-blue-600 mb-2">{metric}</h3>
        <div className="mb-1 text-xl font-semibold text-gray-800">{label}</div>
        <p className="text-gray-600">{sublabel}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
    </div>
  </div>
);

const MetricsShowcase = () => {
  const metrics = [
    {
      metric: "40%",
      label: "Higher Retention",
      sublabel: "Improvement in information retention",
      icon: TrendingUp
    },
    {
      metric: "24/7",
      label: "Availability",
      sublabel: "Round-the-clock learning support",
      icon: Clock
    },
    {
      metric: "100k+",
      label: "Students",
      sublabel: "Active learners on our platform",
      icon: Users
    },
    {
      metric: "98%",
      label: "Satisfaction",
      sublabel: "Positive feedback from educators",
      icon: ThumbsUp
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Echo by the Numbers</h2>
        <p className="text-lg text-gray-600">Making a measurable impact on education</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            metric={metric.metric}
            label={metric.label}
            sublabel={metric.sublabel}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsShowcase;