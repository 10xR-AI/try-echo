import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Upload} from 'lucide-react';
import SalesForce from '../icons/SalesForce';
import GoogleSheets from '../icons/GoogleSheets';
import HubSpot from '../icons/HubSpot';

interface Prospect {
  [key: string]: string;
}

interface ProspectUploaderProps {
  onNext: () => void;
}

const ProspectUploader: React.FC<ProspectUploaderProps> = ({ onNext }) => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processCSVData = (text: string): Prospect[] => {
    const lines = text.split('\n');
    if (lines.length === 0) throw new Error('File is empty');

    const headers = lines[0].split(',').map(header => header.trim());
    const data: Prospect[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = lines[i].split(',');
      const row: Prospect = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim() || '';
      });
      
      row.status = 'Data fetched';
      data.push(row);
    }

    return data;
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      try {
        const text = await file.text();
        const data = processCSVData(text);
        setProspects(data);
        setUploadError('');
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Error processing file');
      }
    } else {
      setUploadError('Please upload a CSV file');
    }
  };

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      try {
        const text = await file.text();
        const data = processCSVData(text);
        setProspects(data);
        setUploadError('');
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Error processing file');
      }
    } else if (file) {
      setUploadError('Please upload a CSV file');
    }
  };

  const integrationOptions = [
    { name: 'Salesforce', icon: <SalesForce/> },
    { name: 'Google Workspace', icon: <GoogleSheets/> },
    { name: 'HubSpot', icon: <HubSpot/> },
  ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Import Prospects</h2>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Left side - CSV Upload (2/3 width) */}
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-3">Upload CSV File</h3>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center h-64 flex items-center justify-center ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={(e: DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p>Drag and drop your CSV file here, or</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Integrations (1/3 width) */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Connect Platform</h3>
              <div className="border rounded-lg p-3">
                <div className="space-y-2">
                  {integrationOptions.map((option, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full space-x-2 p-2 border rounded hover:bg-gray-50 transition-colors"
                    >
                      {option.icon}
                      <span className="text-sm">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {uploadError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {uploadError}
            </div>
          )}

          {prospects.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(prospects[0])
                      .filter(key => key !== 'status')
                      .map((header) => (
                        <th 
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prospects.map((prospect, index) => (
                    <tr key={index}>
                      {Object.entries(prospect)
                        .filter(([key]) => key !== 'status')
                        .map(([key, value]) => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap">
                            {value}
                          </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          disabled={prospects.length === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ProspectUploader;