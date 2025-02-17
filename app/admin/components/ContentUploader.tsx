'use client';

import React, { useState, ChangeEvent, DragEvent } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

interface ContentUploaderProps {
  onFileUpload?: (files: UploadedFile[]) => void;
  onObjectiveChange?: (objective: string) => void;
  onNext: () => void;
}

const predefinedObjectives = [
  "Book Meetings",
  "Educate on Product X",
  "Generate Leads",
  "Increase Brand Awareness",
  "Product Demo Request"
];

const ContentUploader: React.FC<ContentUploaderProps> = ({ 
  onNext,
  
  onObjectiveChange 
}) => {
  const [presentationFiles, setPresentationFiles] = useState<UploadedFile[]>([]);
  const [supportingFiles, setSupportingFiles] = useState<UploadedFile[]>([]);
  const [isDraggingPresentation, setIsDraggingPresentation] = useState(false);
  const [isDraggingSupporting, setIsDraggingSupporting] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<string>('');
  const [customObjective, setCustomObjective] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileDrop = async (
    e: DragEvent<HTMLDivElement>, 
    fileType: 'presentation' | 'supporting'
  ): Promise<void> => {
    e.preventDefault();
    setIsDraggingPresentation(false);
    setIsDraggingSupporting(false);
    
    const files = Array.from(e.dataTransfer.files);
    
    if (fileType === 'presentation') {
      const validFiles = files.filter(file => 
        file.name.endsWith('.ppt') || 
        file.name.endsWith('.pptx')
      );
      
      if (validFiles.length === 0) {
        setError('Please upload only PowerPoint files (.ppt or .pptx)');
        return;
      }
      
      const newFiles = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }));
      
      setPresentationFiles(prev => [...prev, ...newFiles]);
    } else {
      const validFiles = files.filter(file => 
        file.name.endsWith('.pdf') || 
        file.name.endsWith('.doc') || 
        file.name.endsWith('.docx')
      );
      
      if (validFiles.length === 0) {
        setError('Please upload only PDF or Word documents');
        return;
      }
      
      const newFiles = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }));
      
      setSupportingFiles(prev => [...prev, ...newFiles]);
    }
    
    setError('');
  };

  const handleFileInput = (
    e: ChangeEvent<HTMLInputElement>, 
    fileType: 'presentation' | 'supporting'
  ): void => {
    const files = Array.from(e.target.files || []);
    
    if (fileType === 'presentation') {
      const validFiles = files.filter(file => 
        file.name.endsWith('.ppt') || 
        file.name.endsWith('.pptx')
      );
      
      const newFiles = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }));
      
      setPresentationFiles(prev => [...prev, ...newFiles]);
    } else {
      const validFiles = files.filter(file => 
        file.name.endsWith('.pdf') || 
        file.name.endsWith('.doc') || 
        file.name.endsWith('.docx')
      );
      
      const newFiles = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }));
      
      setSupportingFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string, fileType: 'presentation' | 'supporting'): void => {
    if (fileType === 'presentation') {
      setPresentationFiles(prev => prev.filter(file => file.id !== id));
    } else {
      setSupportingFiles(prev => prev.filter(file => file.id !== id));
    }
  };

  const handleObjectiveChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setSelectedObjective(value);
    if (value === 'custom') {
      setCustomObjective('');
    } else {
      onObjectiveChange?.(value);
    }
  };

  const handleCustomObjectiveChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCustomObjective(value);
    onObjectiveChange?.(value);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Presentation Upload */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Main Presentation</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDraggingPresentation ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e: DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              setIsDraggingPresentation(true);
            }}
            onDragLeave={() => setIsDraggingPresentation(false)}
            onDrop={(e) => handleFileDrop(e, 'presentation')}
          >
            <div className="space-y-4">
              <p className="text-gray-600">Drag and drop your presentation here, or</p>
              <input
                type="file"
                accept=".ppt,.pptx"
                onChange={(e) => handleFileInput(e, 'presentation')}
                className="hidden"
                id="presentation-upload"
                multiple
              />
              <button
                type="button"
                onClick={() => document.getElementById('presentation-upload')?.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Browse Files
              </button>
              <p className="text-sm text-gray-500">Supported formats: PPT, PPTX</p>
            </div>
          </div>
          
          {/* Presentation Files Preview */}
          {presentationFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {presentationFiles.map(file => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(file.id, 'presentation')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supporting Documents Upload */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Supporting Documents</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDraggingSupporting ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e: DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              setIsDraggingSupporting(true);
            }}
            onDragLeave={() => setIsDraggingSupporting(false)}
            onDrop={(e) => handleFileDrop(e, 'supporting')}
          >
            <div className="space-y-4">
              <p className="text-gray-600">Drag and drop your documents here, or</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileInput(e, 'supporting')}
                className="hidden"
                id="supporting-upload"
                multiple
              />
              <button
                type="button"
                onClick={() => document.getElementById('supporting-upload')?.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Browse Files
              </button>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX</p>
            </div>
          </div>
          
          {/* Supporting Files Preview */}
          {supportingFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {supportingFiles.map(file => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(file.id, 'supporting')}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Learning Objectives Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Set Objectives</h3>
        <div className="space-y-4">
          <div>
            <select
              value={selectedObjective}
              onChange={handleObjectiveChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Objective</option>
              {predefinedObjectives.map(objective => (
                <option key={objective} value={objective}>
                  {objective}
                </option>
              ))}
              <option value="custom">Custom Objective</option>
            </select>
          </div>
          
          {selectedObjective === 'custom' && (
            <div>
              <input
                type="text"
                value={customObjective}
                onChange={handleCustomObjectiveChange}
                placeholder="Enter your custom objective"
                className="w-full p-2 border rounded"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ContentUploader;