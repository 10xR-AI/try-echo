import React, { useState } from 'react';
import { Mail, ArrowLeft,  Play, FileText, Users, Video, PlayCircle, Copy, Plus, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useCampaignStore } from '@/store/CampaignStore';
interface ReviewTestProps {
  onBack: () => void;
  onLaunch: () => void;
  isLaunching: boolean;
  campaignData: {
    prospects: number;
    slides: number;
    caseStudies: number;
    avatarImage?: string;
    audioBlob?: Blob;
  };
}

interface EmailTemplate {
  subject: string;
  body: string;
}

const ReviewTest: React.FC<ReviewTestProps> = ({
  onBack,
  onLaunch,
  campaignData,
}) => {
  const [testEmails, setTestEmails] = useState<string[]>(['']);
  const [sendingTest, setSendingTest] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewLink, setPreviewLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
    subject: 'Personalized Introduction from [Your Name]',
    body: `Hi [Prospect Name],

I noticed you're involved with [Company] and thought you might be interested in learning how we've helped similar organizations improve their [Value Proposition].

I've prepared some materials that showcase our approach and results. Would you be open to a brief discussion?`
  });

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

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...testEmails];
    newEmails[index] = value;
    setTestEmails(newEmails);
    
    // Clear error for this index if exists
    if (errors[index]) {
      const newErrors = [...errors];
      newErrors[index] = '';
      setErrors(newErrors);
    }
  };

  const addEmailField = () => {
    setTestEmails([...testEmails, '']);
    setErrors([...errors, '']);
  };

  const removeEmailField = (index: number) => {
    const newEmails = testEmails.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setTestEmails(newEmails);
    setErrors(newErrors);
  };

  const validateEmails = () => {
    const newErrors = testEmails.map(email => {
      if (!email) return 'Please enter an email address';
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email address';
      return '';
    });
    setErrors(newErrors);
    return newErrors.every(error => !error);
  };

  const setStoreTestEmails = useCampaignStore(state => state.setTestEmails);

  const handleSendTest = async () => {
    if (!validateEmails()) return;

    setSendingTest(true);
    setErrors([]);

    try {
      // Store the test emails in the global store
      setStoreTestEmails(testEmails.filter(email => email.trim() !== ''));
      
      // Simulate API call for sending test email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } catch {
      setErrors(['Failed to send tests emails. Please try again.']);
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Rest of the cards remain the same until Test Email Section */}
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

        {/* Preview Card */}
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
              {testEmails.map((email, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  {testEmails.length > 1 && (
                    <button
                      onClick={() => removeEmailField(index)}
                      className="p-2 text-red-500 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  {errors[index] && (
                    <p className="text-red-500 text-sm">{errors[index]}</p>
                  )}
                </div>
              ))}
              
              <div className="flex justify-between">
                <button
                  onClick={addEmailField}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Test Email
                </button>
                
                <button
                  onClick={handleSendTest}
                  disabled={sendingTest}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {/* <Send className="h-4 w-4" /> */}
                  {sendingTest ? 'Sending...' : 'Send Template'}
                </button>
              </div>
            </div>

            {testSent && (
              <p className="text-green-500">Test Email template sents successfully</p>
            )}

            {/* Email Preview with Editable Content */}
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
                  <input
                    type="text"
                    value={emailTemplate.subject}
                    onChange={(e) => setEmailTemplate({...emailTemplate, subject: e.target.value})}
                    className="w-full p-2 border rounded mb-4 font-medium"
                    placeholder="Email subject"
                  />
                  <textarea
                    value={emailTemplate.body}
                    onChange={(e) => setEmailTemplate({...emailTemplate, body: e.target.value})}
                    className="w-full p-2 border rounded min-h-[200px]"
                    placeholder="Email body"
                  />
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