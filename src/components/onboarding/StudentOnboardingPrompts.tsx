import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Globe, 
  BookOpen, 
  Target,
  Clock,
  Users,
  Book,
  Calendar,
  GraduationCap,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingData {
  studyPath?: 'languages' | 'igcse';
  languages?: string[];
  currentLevel?: 'beginner' | 'intermediate' | 'advanced';
  learningObjective?: string;
  classPreference?: 'private' | 'group' | 'self-paced';
  timeAvailability?: 'weekdays' | 'weekends' | 'flexible';
  igcseSubjects?: string[];
  currentGrade?: 'year9' | 'year10' | 'year11';
  studyGoal?: string;
  studyFrequency?: 'daily' | '3times' | 'once' | 'flexible';
}

interface StudentOnboardingPromptsProps {
  onComplete: (data: OnboardingData) => void;
}

const languageOptions = [
  { value: 'spanish', label: '🇪🇸 Spanish', flag: '🇪🇸' },
  { value: 'french', label: '🇫🇷 French', flag: '🇫🇷' },
  { value: 'german', label: '🇩🇪 German', flag: '🇩🇪' },
  { value: 'italian', label: '🇮🇹 Italian', flag: '🇮🇹' },
  { value: 'portuguese', label: '🇵🇹 Portuguese', flag: '🇵🇹' },
  { value: 'chinese', label: '🇨🇳 Chinese', flag: '🇨🇳' },
  { value: 'japanese', label: '🇯🇵 Japanese', flag: '🇯🇵' },
  { value: 'korean', label: '🇰🇷 Korean', flag: '🇰🇷' },
  { value: 'arabic', label: '🇸🇦 Arabic', flag: '🇸🇦' },
  { value: 'russian', label: '🇷🇺 Russian', flag: '🇷🇺' }
];

const igcseSubjectOptions = [
  'Mathematics',
  'English Language',
  'English Literature',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Business Studies',
  'History',
  'Geography',
  'Art & Design',
  'Music',
  'French',
  'Spanish',
  'German'
];

const learningObjectives = {
  languages: [
    { value: 'communicate', label: 'Communicate confidently in everyday situations' },
    { value: 'exam', label: 'Prepare for an exam or certification' },
    { value: 'career', label: 'Learn for career or business purposes' },
    { value: 'study-abroad', label: 'Study abroad preparation' },
    { value: 'personal', label: 'Personal or cultural interest' }
  ],
  igcse: [
    { value: 'exams', label: 'Prepare for upcoming exams' },
    { value: 'weak-topics', label: 'Strengthen weak topics' },
    { value: 'past-papers', label: 'Practice with past papers' },
    { value: 'general-improvement', label: 'General improvement and understanding' }
  ]
};

export const StudentOnboardingPrompts = ({ onComplete }: StudentOnboardingPromptsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const steps = [
    {
      title: 'Study Path',
      description: 'What would you like to study?',
      icon: Target
    },
    {
      title: data.studyPath === 'languages' ? 'Language Selection' : 'Subject Choice',
      description: data.studyPath === 'languages' 
        ? 'Which language are you interested in learning? (You can choose one or more.)'
        : 'Which IGCSE subject do you want to focus on first? (You can add more subjects later.)',
      icon: data.studyPath === 'languages' ? Globe : BookOpen
    },
    {
      title: data.studyPath === 'languages' ? 'Current Level' : 'Current Grade Level',
      description: data.studyPath === 'languages'
        ? 'How would you describe your current skill level?'
        : 'What grade level are you currently in?',
      icon: data.studyPath === 'languages' ? Award : GraduationCap
    },
    {
      title: 'Learning Objective',
      description: data.studyPath === 'languages'
        ? "What's your main goal for learning this language?"
        : "What's your main study goal?",
      icon: Target
    },
    {
      title: 'Class Preference',
      description: 'How do you prefer to study?',
      icon: Users
    },
    {
      title: data.studyPath === 'languages' ? 'Time Availability' : 'Schedule',
      description: data.studyPath === 'languages'
        ? 'When do you prefer to take your lessons?'
        : 'How often do you plan to study?',
      icon: Clock
    },
    {
      title: 'Confirmation',
      description: data.studyPath === 'languages'
        ? "Great! We're curating teachers who specialize in your selected languages and share your learning goals."
        : "Perfect! We're preparing your personalized IGCSE study plan.",
      icon: CheckCircle
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Study Path
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.studyPath === 'languages' ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => updateData('studyPath', 'languages')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                    🌐
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Languages</h3>
                  <p className="text-sm text-gray-600">Learn new languages with expert tutors</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.studyPath === 'igcse' ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => updateData('studyPath', 'igcse')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                    📘
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">IGCSE Subjects</h3>
                  <p className="text-sm text-gray-600">Academic support for IGCSE curriculum</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 1: // Language Selection / Subject Choice
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {data.studyPath === 'languages' 
                ? languageOptions.map((language) => (
                    <Card 
                      key={language.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedLanguages.includes(language.value) 
                          ? 'ring-2 ring-purple-500 bg-purple-50' 
                          : ''
                      }`}
                      onClick={() => handleLanguageToggle(language.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{language.flag}</div>
                        <p className="text-sm font-medium text-gray-800">{language.label}</p>
                      </CardContent>
                    </Card>
                  ))
                : igcseSubjectOptions.map((subject) => (
                    <Card 
                      key={subject}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedSubjects.includes(subject) 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : ''
                      }`}
                      onClick={() => handleSubjectToggle(subject)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">📚</div>
                        <p className="text-sm font-medium text-gray-800">{subject}</p>
                      </CardContent>
                    </Card>
                  ))
              }
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {selectedLanguages.length > 0 || selectedSubjects.length > 0
                  ? `Selected: ${selectedLanguages.length || selectedSubjects.length} item(s)`
                  : 'No selections made yet'
                }
              </p>
            </div>
          </div>
        );

      case 2: // Current Level / Current Grade Level
        return (
          <RadioGroup
            value={data.studyPath === 'languages' ? data.currentLevel : data.currentGrade}
            onValueChange={(value) => updateData(
              data.studyPath === 'languages' ? 'currentLevel' : 'currentGrade',
              value
            )}
            className="space-y-3"
          >
            {(data.studyPath === 'languages' 
              ? [
                  { value: 'beginner', label: 'Beginner – I\'m just starting out' },
                  { value: 'intermediate', label: 'Intermediate – I can hold simple conversations' },
                  { value: 'advanced', label: 'Advanced – I want to refine fluency and accuracy' }
                ]
              : [
                  { value: 'year9', label: 'Year 9' },
                  { value: 'year10', label: 'Year 10' },
                  { value: 'year11', label: 'Year 11' }
                ]
            ).map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 3: // Learning Objective
        return (
          <RadioGroup
            value={data.learningObjective}
            onValueChange={(value) => updateData('learningObjective', value)}
            className="space-y-3"
          >
            {learningObjectives[data.studyPath || 'languages'].map((objective) => (
              <div key={objective.value} className="flex items-center space-x-2">
                <RadioGroupItem value={objective.value} id={objective.value} />
                <Label htmlFor={objective.value} className="text-sm font-medium cursor-pointer">
                  {objective.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 4: // Class Preference / Study Preference
        return (
          <RadioGroup
            value={data.studyPath === 'languages' ? data.classPreference : data.studyFrequency}
            onValueChange={(value) => updateData(
              data.studyPath === 'languages' ? 'classPreference' : 'studyFrequency',
              value
            )}
            className="space-y-3"
          >
            {(data.studyPath === 'languages' 
              ? [
                  { value: 'private', label: 'One-on-one private lessons' },
                  { value: 'group', label: 'Group sessions' },
                  { value: 'self-paced', label: 'Self-paced learning' }
                ]
              : [
                  { value: 'daily', label: 'Daily' },
                  { value: '3times', label: '3 times per week' },
                  { value: 'once', label: 'Once a week' },
                  { value: 'flexible', label: 'Flexible' }
                ]
            ).map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 5: // Time Availability / Schedule
        return (
          <RadioGroup
            value={data.studyPath === 'languages' ? data.timeAvailability : data.studyFrequency}
            onValueChange={(value) => updateData(
              data.studyPath === 'languages' ? 'timeAvailability' : 'studyFrequency',
              value
            )}
            className="space-y-3"
          >
            {(data.studyPath === 'languages' 
              ? [
                  { value: 'weekdays', label: 'Weekdays' },
                  { value: 'weekends', label: 'Weekends' },
                  { value: 'flexible', label: 'Flexible' }
                ]
              : [
                  { value: 'daily', label: 'Daily' },
                  { value: '3times', label: '3 times per week' },
                  { value: 'once', label: 'Once a week' },
                  { value: 'flexible', label: 'Flexible' }
                ]
            ).map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 6: // Confirmation
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {data.studyPath === 'languages' 
                  ? 'Great! We\'re curating teachers who specialize in your selected languages.'
                  : 'Perfect! We\'re preparing your personalized IGCSE study plan.'
                }
              </h3>
              <p className="text-gray-600 mb-6">
                {data.studyPath === 'languages' 
                  ? 'You\'ll be matched with your best-fit options shortly.'
                  : 'You\'ll be matched with the best tutors in your chosen subjects.'
                }
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Your Selections:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Path:</span>
                  <Badge variant="outline">
                    {data.studyPath === 'languages' ? 'Languages' : 'IGCSE Subjects'}
                  </Badge>
                </div>
                {data.studyPath === 'languages' && selectedLanguages.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Languages:</span>
                    <div className="flex gap-1">
                      {selectedLanguages.slice(0, 2).map(lang => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {languageOptions.find(l => l.value === lang)?.flag}
                        </Badge>
                      ))}
                      {selectedLanguages.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedLanguages.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {data.studyPath === 'igcse' && selectedSubjects.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subjects:</span>
                    <div className="flex gap-1 flex-wrap">
                      {selectedSubjects.slice(0, 2).map(subject => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {selectedSubjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedSubjects.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {data.currentLevel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.currentLevel}
                    </Badge>
                  </div>
                )}
                {data.currentGrade && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.currentGrade}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-lavender flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index === currentStep 
                    ? "bg-purple-500 text-white" 
                    : index < currentStep 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200 text-gray-500"
                )}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-8 h-0.5 mx-2",
                    index < currentStep ? "bg-green-500" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep].description}
          </p>
        </CardHeader>
        
        <CardContent className="pt-6">
          {renderStepContent()}
          
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (selectedLanguages.length === 0 || selectedSubjects.length === 0)) ||
                (currentStep === 2 && !data.currentLevel && !data.currentGrade) ||
                (currentStep === 3 && !data.learningObjective) ||
                (currentStep === 4 && !data.classPreference && !data.studyFrequency) ||
                (currentStep === 5 && !data.timeAvailability && !data.studyFrequency)
              }
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};