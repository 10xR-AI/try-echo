// components/admin/MediaIntegrations.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Camera, Mic, Calendar, Database, ListPlus } from 'lucide-react';


interface Integration {
  id: string;
  name: string;
  type: 'calendar' | 'crm' | 'form';
  options: string[];
  connected: boolean;
  selectedOption?: string;
}

interface MediaIntegrationsProps {
  onNext: () => void;
}

const MediaIntegrations: React.FC<MediaIntegrationsProps> = ({ onNext }) => {
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Calendar',
      type: 'calendar',
      options: ['Google Calendar', 'Outlook'],
      connected: false
    },
    {
      id: '2',
      name: 'CRM',
      type: 'crm',
      options: ['Salesforce', 'HubSpot'],
      connected: false
    },
    {
      id: '3',
      name: 'Forms',
      type: 'form',
      options: ['Typeform', 'Google Forms'],
      connected: false
    }
  ]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setAvatarImage(imageDataUrl);
      setShowPreview(false);
      
      // Stop webcam stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 10) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const toggleIntegration = async (integrationId: string, option: string) => {
    // Simulate API call to connect/disconnect integration
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        return {
          ...integration,
          connected: !integration.connected,
          selectedOption: option
        };
      }
      return integration;
    }));
  };

  const getIconForIntegrationType = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      case 'crm':
        return <Database className="h-5 w-5" />;
      case 'form':
        return <ListPlus className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Media & Integrations</h2>
        
        {/* Avatar Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold">Avatar Builder</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <h4 className="font-medium">Upload Photo</h4>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowPreview(true);
                    startWebcam();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Camera className="h-5 w-5" />
                  Capture
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <button
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Upload File
                </button>
              </div>
              
              {showPreview && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={captureImage}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Take Photo
                  </button>
                </div>
              )}
              
              {avatarImage && !showPreview && (
                <div>
                  <img
                    src={avatarImage}
                    alt="Avatar preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Voice Recording */}
            <div className="space-y-4">
              <h4 className="font-medium">Voice Cloning</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  Record: &quot;Hi, I&apos;m [Name]. Let&apos;s explore how [Product] can help you…&quot;
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    <Mic className="h-5 w-5" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  {isRecording && (
                    <span className="text-sm text-gray-600">
                      {recordingTime}s / 10s
                    </span>
                  )}
                </div>
                {audioBlob && (
                  <div className="mt-4">
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Integrations</h3>
          <div className="grid gap-4">
            {integrations.map(integration => (
              <div
                key={integration.id}
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getIconForIntegrationType(integration.type)}
                  <span className="font-medium">{integration.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    className="p-2 border rounded-md"
                    onChange={(e) => toggleIntegration(integration.id, e.target.value)}
                    value={integration.selectedOption || ''}
                  >
                    <option value="">Select {integration.name}</option>
                    {integration.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {integration.connected && (
                    <p>
                        {integration.selectedOption} connected ✅
                        </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MediaIntegrations;