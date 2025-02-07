import React from 'react';
import { CheckCircle } from 'lucide-react';
const UseCasesSection = () => {
    const useCases = [
        {
          value: "corporate-training",
          title: "Corporate Training & Development",
          description: "Transform your organization's learning experience with interactive voice-guided training modules. Ideal for new hire onboarding, leadership development, and cross-functional skill building.",
          benefits: [
            "Personalized learning paths",
            "Interactive skill assessments",
            "Scalable team development"
          ]
        },
        {
          value: "higher-education",
          title: "Higher Education",
          description: "Revolutionize university learning with AI-powered discussion partners and comprehensive study support. Perfect for research guidance, thesis development, and advanced topic exploration.",
          benefits: [
            "Advanced research assistance",
            "Interdisciplinary learning",
            "Collaborative project support"
          ]
        },
        {
          value: "k12-education",
          title: "K-12 Education",
          description: "Create immersive learning experiences for students with voice-interactive lessons and personalized tutoring. Suitable for core subjects, project-based learning, and academic support.",
          benefits: [
            "Adaptive learning paths",
            "Interactive assignments",
            "Progress monitoring"
          ]
        },
        {
          value: "compliance-training",
          title: "Compliance Training",
          description: "Ensure regulatory compliance through engaging, interactive training modules. Essential for industry regulations, safety protocols, and policy adherence across organizations.",
          benefits: [
            "Automated compliance tracking",
            "Regular policy updates",
            "Certification management"
          ]
        },
        {
          value: "professional-development",
          title: "Professional Development",
          description: "Accelerate career growth with personalized skill development and expert guidance. Perfect for technical upskilling, leadership training, and continuous professional education.",
          benefits: [
            "Customized learning plans",
            "Industry-specific training",
            "Performance tracking"
          ]
        },
        {
          value: "customer-education",
          title: "Customer Education & Onboarding",
          description: "Streamline customer success with interactive product training and support. Ideal for product onboarding, feature adoption, and ongoing customer education.",
          benefits: [
            "Self-paced learning modules",
            "Interactive product guides",
            "Customer success tracking"
          ]
        }
      ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">
          Transforming Learning Across Industries
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-4">{useCase.title}</h3>
              <p className="text-gray-600 mb-6">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default UseCasesSection;