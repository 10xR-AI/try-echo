// components/admin/ReviewTest.tsx
'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, Play, FileText, Users, Video, PlayCircle,  Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReviewTestProps {
  onBack: () => void;
  onLaunch: () => void;
  isLaunching:boolean;
  campaignData: {
    prospects: number;
    slides: number;
    caseStudies: number;
    avatarImage?: string;
    audioBlob?: Blob;
  };
}



const ReviewTest: React.FC<ReviewTestProps> = ({
  onBack,
  onLaunch,
  campaignData,
  
}) => {
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [error, setError] = useState('');
  const [previewLink, setPreviewLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const generatePreview = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPreviewLink(`echo.ai/preview/${Math.random().toString(36).substr(2, 9)}`);
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendTest = async () => {
    if (!testEmail) {
      setError('Please enter an email address');
      return;
    }

    if (!testEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    setSendingTest(true);
    setError('');

    try {
      // Simulate API call for sending test email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } catch {
      setError('Failed to send test email. Please try again.');
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Review & Test Campaign</h2>

        {/* Campaign Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Prospects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.prospects}</p>
              <p className="text-sm text-gray-500">prospects loaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaignData.slides + campaignData.caseStudies}</p>
              <p className="text-sm text-gray-500">
                {campaignData.slides} slides, {campaignData.caseStudies} case studies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-500" />
                Avatar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaignData.avatarImage && (
                <img
                  src={campaignData.avatarImage}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              {campaignData.audioBlob && (
                <audio
                  controls
                  src={URL.createObjectURL(campaignData.audioBlob)}
                  className="w-full h-8"
                />
              )}
            </CardContent>
          </Card>
        </div>


        <Card>
          <CardHeader>
            <CardTitle>Preview Presentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div
                className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={generatePreview}
              >
                <div className="text-center text-white">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-lg font-medium">Preview Your Interactive Presentation</div>
                  <div className="text-gray-400 mt-2">Click to play with AI voice narration</div>
                </div>
              </div>

              {isProcessing && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Generating preview...</span>
                </div>
              )}

              {previewLink && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <span>Magic Link: {previewLink}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(previewLink)}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>



        {/* Test Email Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Test Campaign Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={handleSendTest}
                  disabled={sendingTest}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {sendingTest ? 'Sending...' : 'Send Test'}
                </button>
              </div>

              {error && (
                <p>{error}</p>
              )}

              {testSent && (
                <p>Test email sent Successfully</p>
              )}
            </div>

            {/* Email Preview */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-4">
                {campaignData.avatarImage && (
                  <img
                    src={campaignData.avatarImage}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">Subject: Personalized Introduction from [Your Name]</h3>
                  <div className="mt-4 text-gray-600">
                    <p>Hi [Prospect Name],</p>
                    <p className="mt-2">
                      I noticed you&apos;re involved with [Company] and thought you might be interested
                      in learning how we&apos;ve helped similar organizations improve their [Value Proposition].
                    </p>
                    <p className="mt-2">
                      I&apos;ve prepared some materials that showcase our approach and results.
                      Would you be open to a brief discussion?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Launch Controls */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Edit
          </button>
          <button
            onClick={onLaunch}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Play className="h-5 w-5" />
            Launch Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTest;