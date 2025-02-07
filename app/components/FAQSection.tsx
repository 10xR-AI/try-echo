"use client"
import {  useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';


interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick } : FAQItemProps) => (
  <div className="border border-gray-200 rounded-lg bg-white mb-4">
    <button
      className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
      onClick={onClick}
    >
      <span className="font-semibold text-lg text-gray-800">{question}</span>
      <ChevronDown 
        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>
    <div 
      className={`px-6 overflow-hidden transition-all duration-200 ${
        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
      }`}
    >
      <p className="text-gray-600">{answer}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Echo work with existing materials?",
      answer: "Echo seamlessly integrates with your existing content - whether it's corporate training manuals, educational materials, or compliance documents. Our AI transforms these into interactive conversations while maintaining your core learning objectives and brand voice."
    },
    {
      question: "What types of content can I upload?",
      answer: "Echo supports a wide range of formats including PowerPoint presentations, PDF documents, Word files, training videos, SOPs, and compliance documents. Our system can process and convert these materials into interactive learning experiences while preserving the original content's integrity."
    },
    {
      question: "How does Echo ensure compliance in corporate training?",
      answer: "Echo includes built-in compliance tracking, progress monitoring, and certification features. It automatically generates completion records and can integrate with your existing LMS to maintain training compliance requirements."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600">Find answers to common questions about Echo</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Still have questions?{" "}
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Contact our support team
          </button>
        </p>
      </div>
    </div>
  );
};

export default FAQSection;