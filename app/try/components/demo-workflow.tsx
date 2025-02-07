"use client"
import Image from 'next/image'
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Edit3, 
  PlayCircle, 
  BarChart2, 
  ChevronRight, 
  X,
  Copy,

} from 'lucide-react';



interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface FileState {
  mainPresentation: UploadedFile | null;
  supportingMaterials: UploadedFile[];
}

interface LearningObjectives {
  primary: string;
  specific: string[];
  knowledgeLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ContentSlide {
  slideNumber: number;
  title: string;
  talkingPoints: string[];
  learningOutcomes: string[];
  questions: string[];
}

const DemoWorkflow = () => {
  // Core state management
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileState>({
    mainPresentation: null,
    supportingMaterials: []
  });

  // Form states
  const [learningObjectives, setLearningObjectives] = useState<LearningObjectives>({
    primary: '',
    specific: ['', '', ''],
    knowledgeLevel: 'Beginner'
  });

  // Content states
  const [editedContent, setEditedContent] = useState<ContentSlide[]>([
    {
      slideNumber: 1,
      title: "Introduction to Machine Learning",
      talkingPoints: [
        "Definition of machine learning",
        "Types of machine learning algorithms",
        "Real-world applications"
      ],
      learningOutcomes: [
        "Understand basic ML concepts",
        "Identify different ML types",
        "Recognize ML applications"
      ],
      questions: [
        "What is machine learning?",
        "Name three types of ML algorithms",
        "How is ML used in daily life?"
      ]
    },
    {
      slideNumber: 2,
      title: "Supervised Learning",
      talkingPoints: [
        "Definition of supervised learning",
        "Classification vs Regression",
        "Common algorithms"
      ],
      learningOutcomes: [
        "Define supervised learning",
        "Differentiate classification and regression",
        "List common algorithms"
      ],
      questions: [
        "What makes learning 'supervised'?",
        "When would you use classification?",
        "Name two supervised algorithms"
      ]
    }
  ]);

  // Preview and Analytics states
  const [previewLink, setPreviewLink] = useState('');
  const [analyticsData, setAnalyticsData] = useState({
    timeSpent: {
      average: "45 mins",
      bySlide: [
        { slide: 1, time: "15 mins" },
        { slide: 2, time: "30 mins" }
      ]
    },
    questionsAsked: 24,
    commonQuestions: [
      "What's the difference between supervised and unsupervised learning?",
      "How does classification work?",
      "Can you explain regression with an example?"
    ],
    knowledgeLevels: {
      beginner: "30%",
      intermediate: "45%",
      advanced: "25%"
    }
  });

  // Refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supportingMaterialsRef = useRef<HTMLInputElement>(null);

  // File handling functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'supporting') => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setIsProcessing(true);

    setTimeout(() => {
      if (type === 'main') {
        setUploadedFiles(prev => ({
          ...prev,
          mainPresentation: {
            name: files[0].name,
            size: files[0].size,
            type: files[0].type
          }
        }));
      } else {
        setUploadedFiles(prev => ({
          ...prev,
          supportingMaterials: [
            ...prev.supportingMaterials,
            ...files.map(file => ({
              name: file.name,
              size: file.size,
              type: file.type
            }))
          ]
        }));
      }
      setIsProcessing(false);
    }, 1500);
  };

  const removeSupportingMaterial = (index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      supportingMaterials: prev.supportingMaterials.filter((_, i) => i !== index)
    }));
  };

  // Learning objectives handling
  const updateLearningObjective = (
    type: 'primary' | 'specific',
    index: number | null,
    value: string
  ) => {
    if (type === 'primary') {
      setLearningObjectives(prev => ({
        ...prev,
        primary: value
      }));
    } else if (type === 'specific') {
      setLearningObjectives(prev => ({
        ...prev,
        specific: prev.specific.map((obj, i) => i === index ? value : obj)
      }));
    }
  };

  const addLearningOutcome = () => {
    setLearningObjectives(prev => ({
      ...prev,
      specific: [...prev.specific, '']
    }));
  };

  // Content editing functions
  const handleContentEdit = (
    slideIndex: number,
    field: keyof ContentSlide,
    subIndex: number | null,
    value: string
  ) => {
    setEditedContent(prev => {
      const newContent = [...prev];
      if (Array.isArray(newContent[slideIndex][field]) && subIndex !== null) {
        (newContent[slideIndex][field] as string[])[subIndex] = value;
      } else if (!Array.isArray(newContent[slideIndex][field])) {
        (newContent[slideIndex][field] as string) = value;
      }
      return newContent;
    });
  };

  // Preview generation
  const generatePreview = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPreviewLink(`echo.ai/preview/\${Math.random().toString(36).substr(2, 9)}`);
      setIsProcessing(false);
    }, 2000);
  };

  // Analytics generation
  const generateAnalytics = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAnalyticsData(prev => ({
        ...prev,
        questionsAsked: Math.floor(Math.random() * 50),
        knowledgeLevels: {
          beginner: `${Math.floor(Math.random() * 40)}%`,
          intermediate: `${Math.floor(Math.random() * 30)}%`,
          advanced: `\${Math.floor(Math.random() * 30)}%`
        }
      }));
      setIsProcessing(false);
    }, 2000);
  };

  // Copy to clipboard function
  const copyToClipboard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Step content components
  const UploadContent = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Presentation Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e, 'main')}
            accept=".pptx,.pdf,.doc,.docx"
            className="hidden"
          />
          <Upload className="w-10 h-10 text-gray-400 mb-4" />
          <div className="text-lg font-medium mb-2">Main Presentation</div>
          <div className="text-gray-500 mb-4 text-sm">Upload your PowerPoint or PDF presentation</div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Presentation
          </button>
          {uploadedFiles.mainPresentation && (
            <div className="mt-4 flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-600 mr-2" />
                {/* <span className="text-sm">{uploadedFiles.mainPresentation.name}</span> */}
              </div>
              <button 
                onClick={() => setUploadedFiles(prev => ({ ...prev, mainPresentation: null }))}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Supporting Materials Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <input
            type="file"
            ref={supportingMaterialsRef}
            onChange={(e) => handleFileUpload(e, 'supporting')}
            accept=".pdf,.doc,.docx"
            className="hidden"
            multiple
          />
          <Upload className="w-10 h-10 text-gray-400 mb-4" />
          <div className="text-lg font-medium mb-2">Supporting Materials</div>
          <div className="text-gray-500 mb-4 text-sm">Add research papers, articles, or reference materials</div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            onClick={() => supportingMaterialsRef.current?.click()}
          >
            Add Materials
          </button>
          <div className="mt-4 space-y-2">
            {uploadedFiles.supportingMaterials.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-blue-600 mr-2" />
                  {/* <span className="text-sm">{file.name}</span> */}
                </div>
                <button 
                  onClick={() => removeSupportingMaterial(index)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Learning Outcomes</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Learning Objective
            </label>
            <input
              type="text"
              value={learningObjectives.primary}
              onChange={(e) => updateLearningObjective('primary', null, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Understand the fundamentals of machine learning"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Learning Outcomes
            </label>
            <div className="space-y-2">
              {learningObjectives.specific.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => updateLearningObjective('specific', index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder={`Learning outcome ${index + 1}`}
                  />
                  <button 
                    onClick={() => {
                      const newSpecific = [...learningObjectives.specific];
                      newSpecific.splice(index, 1);
                      setLearningObjectives(prev => ({
                        ...prev,
                        specific: newSpecific
                      }));
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={addLearningOutcome}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-1" />
              Add another outcome
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Knowledge Level
            </label>
            <select 
  value={learningObjectives.knowledgeLevel}
  onChange={(e) => setLearningObjectives(prev => ({
    ...prev,
    knowledgeLevel: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'
  }))}
  className="w-full p-2 border border-gray-300 rounded-lg"
>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Advanced">Advanced</option>
</select>
          </div>
        </div>
      </div>
    </div>
  );

  const EditContent = () => (
    <div className="space-y-8">
      {editedContent.map((slide, slideIndex) => (
        <div key={slideIndex} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => handleContentEdit(slideIndex, 'title', null, e.target.value)}
              className="text-xl font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex gap-6">
            {/* Placeholder Image */}
            <div className="w-64 flex-shrink-0">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  width={256}
                  height={256}
                  src="/api/placeholder/256/256" 
                  alt={`Placeholder for ${slide.title}`}
                  className="rounded-lg"
                />
              </div>
            </div>
  
            {/* Content Grid */}
            <div className="flex-1 grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Talking Points</h4>
                <div className="space-y-2">
                  {slide.talkingPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleContentEdit(slideIndex, 'talkingPoints', index, e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded-lg"
                      />
                      <button 
                        onClick={() => {
                          const newContent = [...editedContent];
                          newContent[slideIndex].talkingPoints.splice(index, 1);
                          setEditedContent(newContent);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newContent = [...editedContent];
                      newContent[slideIndex].talkingPoints.push('');
                      setEditedContent(newContent);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center mt-2"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Add talking point
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Learning Outcomes</h4>
                <div className="space-y-2">
                  {slide.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={outcome}
                        onChange={(e) => handleContentEdit(slideIndex, 'learningOutcomes', index, e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded-lg"
                      />
                      <button 
                        onClick={() => {
                          const newContent = [...editedContent];
                          newContent[slideIndex].learningOutcomes.splice(index, 1);
                          setEditedContent(newContent);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newContent = [...editedContent];
                      newContent[slideIndex].learningOutcomes.push('');
                      setEditedContent(newContent);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center mt-2"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Add learning outcome
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Questions</h4>
                <div className="space-y-2">
                  {slide.questions.map((question, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => handleContentEdit(slideIndex, 'questions', index, e.target.value)}
                        className="flex-1 p-2 text-sm border border-gray-200 rounded-lg"
                      />
                      <button 
                        onClick={() => {
                          const newContent = [...editedContent];
                          newContent[slideIndex].questions.splice(index, 1);
                          setEditedContent(newContent);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newContent = [...editedContent];
                      newContent[slideIndex].questions.push('');
                      setEditedContent(newContent);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center mt-2"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Add question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const PreviewContent = () => (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
           onClick={generatePreview}>
        <div className="text-center text-white">
          <PlayCircle className="w-16 h-16 mx-auto mb-4" />
          <div className="text-lg font-medium">Preview Your Interactive Presentation</div>
          <div className="text-gray-400 mt-2">Click to play with AI voice narration</div>
        </div>
      </div>
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
  );

  const AnalyticsContent = () => (
    <div className="space-y-8">
      {/* Time Spent */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Time Spent</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{analyticsData.timeSpent.average}</div>
            <div className="text-gray-600">Average time per student</div>
          </div>
          <div>
            {analyticsData.timeSpent.bySlide.map((slide, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>Slide {slide.slide}</span>
                <span className="font-medium">{slide.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions & Knowledge Levels */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Questions Asked</h3>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {analyticsData.questionsAsked}
          </div>
          <div className="space-y-2">
            <h4 className="font-medium mb-2">Common Questions:</h4>
            {analyticsData.commonQuestions.map((question, index) => (
              <div key={index} className="text-gray-600">• {question}</div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Knowledge Levels</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.knowledgeLevels).map(([level, percentage]) => (
              <div key={level}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{level}</span>
                  <span>{percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2" 
                    style={{ width: percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Define steps array
  const steps = [
    {
      title: "Upload Content",
      icon: <Upload className="w-6 h-6" />,
      content: <UploadContent />
    },
    {
      title: "Edit Content",
      icon: <Edit3 className="w-6 h-6" />,
      content: <EditContent />
    },
    {
      title: "Preview",
      icon: <PlayCircle className="w-6 h-6" />,
      content: <PreviewContent />
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="w-6 h-6" />,
      content: <AnalyticsContent />
    }
  ];

  // Navigation handling
  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Handle workflow completion
      console.log('Workflow completed', {
        uploadedFiles,
        learningObjectives,
        editedContent,
        previewLink,
        analyticsData
      });
      return;
    }

    // Validation and step-specific actions
    switch (currentStep) {
      case 0:
        if (!uploadedFiles.mainPresentation) {
          alert('Please upload a main presentation file');
          return;
        }
        if (!learningObjectives.primary) {
          alert('Please set a primary learning objective');
          return;
        }
        break;
      case 1:
        if (editedContent.length === 0) {
          alert('Please add at least one slide');
          return;
        }
        break;
      case 2:
        generatePreview();
        break;
      case 3:
        generateAnalytics();
        break;
    }

    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Stepper */}
      <div className="mb-12">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: currentStep > index ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={index} className="text-sm font-medium text-gray-600">
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        {isProcessing ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Processing...</span>
          </div>
        ) : (
          steps[currentStep].content
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          className={`px-6 py-2 rounded-lg ${
            currentStep === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0 || isProcessing}
        >
          Back
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            currentStep === steps.length - 1
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={handleNext}
          disabled={isProcessing}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default DemoWorkflow;