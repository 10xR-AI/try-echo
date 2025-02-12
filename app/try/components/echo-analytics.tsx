import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


type StatusColor = 'green' | 'amber' | 'red';

// Define the interface for an outcome
// interface Outcome {
//   slide: number;
//   status: StatusColor;
//   topic: string;
// }



const mockLearnerData = [
  {
    id: 1,
    name: "John Smith",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "amber", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "red", topic: "Real-world applications" }
    ],
    timeSpent: 45,
    assessmentQuestions: {
      asked: 10,
      correct: 8,
      questions: [
        {
          question: "What is machine learning?",
          slide: 1,
          status: "correct",
          timestamp: "2025-02-12T10:15:00"
        },
        {
          question: "Which of these is a supervised learning algorithm?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T10:25:00"
        },
        {
          question: "How is ML applied in image recognition?",
          slide: 3,
          status: "correct",
          timestamp: "2025-02-12T10:35:00"
        }
      ]
    },
    userQuestions: {
      asked: 3,
      answered: 2,
      questions: [
        {
          question: "Can you explain backpropagation in more detail?",
          slide: 2,
          timestamp: "2025-02-12T10:30:00",
          status: "answered",
          responseTime: "2 min"
        },
        {
          question: "How does transfer learning work in practice?",
          slide: 3,
          timestamp: "2025-02-12T11:15:00",
          status: "pending",
          responseTime: null
        }
      ]
    },
    totalScore: 85
  },
  {
    id: 2,
    name: "Emma Wilson",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "green", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "amber", topic: "Real-world applications" }
    ],
    timeSpent: 38,
    assessmentQuestions: {
      asked: 10,
      correct: 9,
      questions: [
        {
          question: "What defines supervised learning?",
          slide: 1,
          status: "correct",
          timestamp: "2025-02-12T09:15:00"
        },
        {
          question: "Which algorithm is best for classification?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T09:25:00"
        }
      ]
    },
    userQuestions: {
      asked: 2,
      answered: 2,
      questions: [
        {
          question: "What are some real-world applications of NLP?",
          slide: 3,
          timestamp: "2025-02-12T09:45:00",
          status: "answered",
          responseTime: "3 min"
        }
      ]
    },
    totalScore: 92
  },
  {
    id: 3,
    name: "Michael Chen",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "green", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "green", topic: "Real-world applications" }
    ],
    timeSpent: 52,
    assessmentQuestions: {
      asked: 10,
      correct: 10,
      questions: [
        {
          question: "What are the key components of ML?",
          slide: 1,
          status: "correct",
          timestamp: "2025-02-12T09:30:00"
        },
        {
          question: "How does unsupervised learning differ?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T09:45:00"
        }
      ]
    },
    userQuestions: {
      asked: 4,
      answered: 4,
      questions: [
        {
          question: "How do neural networks handle complex patterns?",
          slide: 2,
          timestamp: "2025-02-12T09:50:00",
          status: "answered",
          responseTime: "1 min"
        },
        {
          question: "Can you elaborate on deep learning architectures?",
          slide: 3,
          timestamp: "2025-02-12T10:15:00",
          status: "answered",
          responseTime: "4 min"
        }
      ]
    },
    totalScore: 98
  },
  {
    id: 4,
    name: "Sarah Johnson",
    outcomes: [
      { slide: 1, status: "amber", topic: "Definition of machine learning" },
      { slide: 2, status: "red", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "amber", topic: "Real-world applications" }
    ],
    timeSpent: 35,
    assessmentQuestions: {
      asked: 10,
      correct: 6,
      questions: [
        {
          question: "What is the role of data in ML?",
          slide: 1,
          status: "incorrect",
          timestamp: "2025-02-12T11:00:00"
        },
        {
          question: "How do you evaluate ML models?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T11:15:00"
        }
      ]
    },
    userQuestions: {
      asked: 5,
      answered: 4,
      questions: [
        {
          question: "I'm confused about model validation",
          slide: 2,
          timestamp: "2025-02-12T11:20:00",
          status: "answered",
          responseTime: "3 min"
        },
        {
          question: "Can you explain overfitting?",
          slide: 2,
          timestamp: "2025-02-12T11:35:00",
          status: "pending",
          responseTime: null
        }
      ]
    },
    totalScore: 72
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "amber", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "green", topic: "Real-world applications" }
    ],
    timeSpent: 41,
    assessmentQuestions: {
      asked: 10,
      correct: 8,
      questions: [
        {
          question: "What is feature engineering?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T10:45:00"
        },
        {
          question: "How do you handle missing data?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T11:00:00"
        }
      ]
    },
    userQuestions: {
      asked: 3,
      answered: 3,
      questions: [
        {
          question: "What's the difference between bias and variance?",
          slide: 2,
          timestamp: "2025-02-12T11:05:00",
          status: "answered",
          responseTime: "2 min"
        }
      ]
    },
    totalScore: 88
  },
  {
    id: 6,
    name: "Lisa Kim",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "green", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "amber", topic: "Real-world applications" }
    ],
    timeSpent: 47,
    assessmentQuestions: {
      asked: 10,
      correct: 9,
      questions: [
        {
          question: "What is gradient descent?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T13:15:00"
        },
        {
          question: "How do you prevent overfitting?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T13:30:00"
        }
      ]
    },
    userQuestions: {
      asked: 2,
      answered: 2,
      questions: [
        {
          question: "Can you explain regularization techniques?",
          slide: 2,
          timestamp: "2025-02-12T13:45:00",
          status: "answered",
          responseTime: "3 min"
        }
      ]
    },
    totalScore: 91
  },
  {
    id: 7,
    name: "David Thompson",
    outcomes: [
      { slide: 1, status: "amber", topic: "Definition of machine learning" },
      { slide: 2, status: "amber", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "amber", topic: "Real-world applications" }
    ],
    timeSpent: 39,
    assessmentQuestions: {
      asked: 10,
      correct: 7,
      questions: [
        {
          question: "What is cross-validation?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T14:15:00"
        },
        {
          question: "How do ensemble methods work?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T14:30:00"
        }
      ]
    },
    userQuestions: {
      asked: 4,
      answered: 3,
      questions: [
        {
          question: "What's the difference between bagging and boosting?",
          slide: 2,
          timestamp: "2025-02-12T14:45:00",
          status: "answered",
          responseTime: "4 min"
        },
        {
          question: "How do you handle imbalanced datasets?",
          slide: 2,
          timestamp: "2025-02-12T15:00:00",
          status: "pending",
          responseTime: null
        }
      ]
    },
    totalScore: 78
  },
  {
    id: 8,
    name: "Maria Garcia",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "red", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "green", topic: "Real-world applications" }
    ],
    timeSpent: 43,
    assessmentQuestions: {
      asked: 10,
      correct: 7,
      questions: [
        {
          question: "What are hyperparameters?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T13:45:00"
        },
        {
          question: "How do you tune ML models?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T14:00:00"
        }
      ]
    },
    userQuestions: {
      asked: 3,
      answered: 3,
      questions: [
        {
          question: "Can you explain grid search vs random search?",
          slide: 2,
          timestamp: "2025-02-12T14:15:00",
          status: "answered",
          responseTime: "2 min"
        }
      ]
    },
    totalScore: 83
  },
  {
    id: 9,
    name: "James Wilson",
    outcomes: [
      { slide: 1, status: "red", topic: "Definition of machine learning" },
      { slide: 2, status: "red", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "amber", topic: "Real-world applications" }
    ],
    timeSpent: 32,
    assessmentQuestions: {
      asked: 10,
      correct: 5,
      questions: [
        {
          question: "What is feature selection?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T15:15:00"
        },
        {
          question: "How do you handle categorical variables?",
          slide: 2,
          status: "incorrect",
          timestamp: "2025-02-12T15:30:00"
        }
      ]
    },
    userQuestions: {
      asked: 6,
      answered: 4,
      questions: [
        {
          question: "I don't understand dimensionality reduction",
          slide: 2,
          timestamp: "2025-02-12T15:45:00",
          status: "answered",
          responseTime: "5 min"
        },
        {
          question: "Can you explain PCA again?",
          slide: 2,
          timestamp: "2025-02-12T16:00:00",
          status: "pending",
          responseTime: null
        }
      ]
    },
    totalScore: 65
  },
  {
    id: 10,
    name: "Emily Brown",
    outcomes: [
      { slide: 1, status: "green", topic: "Definition of machine learning" },
      { slide: 2, status: "green", topic: "Types of machine learning algorithms" },
      { slide: 3, status: "green", topic: "Real-world applications" }
    ],
    timeSpent: 49,
    assessmentQuestions: {
      asked: 10,
      correct: 9,
      questions: [
        {
          question: "What is the curse of dimensionality?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T16:15:00"
        },
        {
          question: "How do you handle outliers in ML?",
          slide: 2,
          status: "correct",
          timestamp: "2025-02-12T16:30:00"
        }
      ]
    },
    userQuestions: {
      asked: 3,
      answered: 3,
      questions: [
        {
          question: "Can you explain different distance metrics?",
          slide: 2,
          timestamp: "2025-02-12T16:45:00",
          status: "answered",
          responseTime: "2 min"
        }
      ]
    },
    totalScore: 95
  }
];


const mockAggregateData = {
  totalLearners: 10,
  averageScore: 85,  // Average of all scores (85.7 rounded)
  medianScore: 86,   // Middle value of all scores
  highestScore: 98,  // Michael Chen's score
  frequentQuestions: [
    { question: "What is machine learning?", count: 8, slide: 1, answeredCount: 7 },
    { question: "How do neural networks work?", count: 7, slide: 2, answeredCount: 6 },
    { question: "Can you explain backpropagation?", count: 6, slide: 2, answeredCount: 5 },
    { question: "What are supervised learning algorithms?", count: 5, slide: 2, answeredCount: 4 },
    { question: "How is ML applied in real-world?", count: 5, slide: 3, answeredCount: 4 }
  ],
  slideTimeDistribution: [
    { slide: 1, time: 12, difficulty: 20 },
    { slide: 2, time: 22, difficulty: 55 },
    { slide: 3, time: 15, difficulty: 40 }
  ],
  difficultOutcomes: [
    { topic: "Types of machine learning algorithms", failureRate: 40 },  // More red/amber status
    { topic: "Real-world applications", failureRate: 35 }  // Second most challenging
  ],
  avgTimeSpent: 42,  // Average of all timeSpent values
};

const STATUS_COLORS: Record<StatusColor, string> = {
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444'
};

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const MacroMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAggregateData.totalLearners}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAggregateData.averageScore}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Median Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAggregateData.medianScore}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockAggregateData.avgTimeSpent} min</div>
        </CardContent>
      </Card>
    </div>
  );

  const LearnerTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Learning Outcomes</th>
            <th className="text-left p-2">Time Spent</th>
            <th className="text-left p-2">Questions</th>
            <th className="text-left p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {mockLearnerData.map((learner) => (
            <tr key={learner.id} className="border-b">
              <td className="p-2">{learner.name}</td>
              <td className="p-2">
                <div className="flex gap-1">
                  {learner.outcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[outcome.status as keyof typeof STATUS_COLORS] }}
                      title={`Slide ${outcome.slide}: ${outcome.topic}`}
                    />
                  ))}
                </div>
              </td>
              <td className="p-2">{learner.timeSpent} min</td>
              <td className="p-2">
  {learner.assessmentQuestions.asked + learner.userQuestions.asked}/
  {learner.assessmentQuestions.correct + learner.userQuestions.answered}
</td>
              <td className="p-2">{learner.totalScore}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Echo Analytics Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learners">Learner Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MacroMetrics />
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Learning Progress Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">Slide Progress</h3>
                    <div className="space-y-4">
                      {mockAggregateData.slideTimeDistribution.map((slide, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Slide {slide.slide}</span>
                            <span>{slide.time} min</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(slide.time / 30) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Questions Analysis Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">Questions Overview</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((slide) => {
                        const assessmentData = {
                          correct: Math.floor(Math.random() * 20) + 30,
                          total: 50
                        };
                        const userQuestions = {
                          answered: Math.floor(Math.random() * 8) + 12,
                          total: 20
                        };
                        return (
                          <div key={slide}>
                            <div className="text-sm mb-2">Slide {slide}</div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-green-600">Assessment Questions</span>
                                  <span>{assessmentData.correct}/{assessmentData.total}</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${(assessmentData.correct / assessmentData.total) * 100}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-blue-600">User Questions</span>
                                  <span>{userQuestions.answered}/{userQuestions.total}</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${(userQuestions.answered / userQuestions.total) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Engagement Metrics Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">Engagement Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Average Time per Slide</span>
                          <span className="text-lg font-medium">
                            {Math.round(mockAggregateData.slideTimeDistribution.reduce((acc, curr) => acc + curr.time, 0) / 
                            mockAggregateData.slideTimeDistribution.length)} min
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Questions per Student</span>
                          <span className="text-lg font-medium">4.5</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Response Rate</span>
                          <span className="text-lg font-medium">92%</span>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm mb-2">Difficulty Distribution</div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <div className="text-xs text-center mb-1">Easy</div>
                              <div className="h-16 bg-green-100 rounded-t-lg relative">
                                <div 
                                  className="absolute bottom-0 w-full bg-green-500 rounded-t-lg"
                                  style={{ height: '40%' }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-center mb-1">Medium</div>
                              <div className="h-16 bg-yellow-100 rounded-t-lg relative">
                                <div 
                                  className="absolute bottom-0 w-full bg-yellow-500 rounded-t-lg"
                                  style={{ height: '65%' }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-center mb-1">Hard</div>
                              <div className="h-16 bg-red-100 rounded-t-lg relative">
                                <div 
                                  className="absolute bottom-0 w-full bg-red-500 rounded-t-lg"
                                  style={{ height: '25%' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAggregateData.frequentQuestions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.question}</div>
                        <div className="text-xs text-gray-500">Slide {item.slide}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs">
                          <span className="text-blue-500 font-medium">{item.count}</span> asked
                          <span className="mx-1">|</span>
                          <span className="text-green-500 font-medium">{item.answeredCount}</span> answered
                        </div>
                        <div className="flex h-2 w-24 rounded overflow-hidden">
                          <div 
                            className="bg-blue-500"
                            style={{ 
                              width: `${(item.count / mockAggregateData.frequentQuestions[0].count) * 100}%`
                            }}
                          />
                          <div 
                            className="bg-green-500"
                            style={{ 
                              width: `${(item.answeredCount / mockAggregateData.frequentQuestions[0].count) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learners">
          <Card>
            <CardHeader>
              <CardTitle>Learner Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <LearnerTable />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Questions</CardTitle>
                <p className="text-sm text-gray-500">System-generated questions and responses</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockLearnerData.map((learner) => (
                    <div key={learner.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{learner.name}</h3>
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">
                            {learner.assessmentQuestions.correct}
                          </span>
                          <span className="text-gray-500">
                            /{learner.assessmentQuestions.asked} correct
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {learner.assessmentQuestions.questions.map((q, idx) => (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-lg text-sm ${
                              q.status === 'correct' ? 'bg-green-50' : 'bg-red-50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{q.question}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                  Slide {q.slide} • {new Date(q.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                              <span 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  q.status === 'correct' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {q.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Questions</CardTitle>
                <p className="text-sm text-gray-500">Questions asked by learners during the session</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockLearnerData.map((learner) => (
                    <div key={learner.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{learner.name}</h3>
                        <div className="text-sm">
                          <span className="text-blue-600 font-medium">
                            {learner.userQuestions.answered}
                          </span>
                          <span className="text-gray-500">
                            /{learner.userQuestions.asked} answered
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {learner.userQuestions.questions.map((q, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium">{q.question}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                  Slide {q.slide} • {new Date(q.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {q.status === 'answered' ? (
                                  <>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      Answered
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {q.responseTime}
                                    </span>
                                  </>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;