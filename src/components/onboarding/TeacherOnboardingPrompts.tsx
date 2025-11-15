import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  Award,
  User,
  DollarSign,
  Briefcase,
  Headphones,
  Video,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingData {
  teachingFocus?: 'languages' | 'igcse' | 'both';
  languageSpecialization?: string[];
  teachingLevel?: string[];
  teachingApproach?: string;
  lessonFormat?: string[];
  availability?: string;
  ratePreference?: string;
  subjectSpecialization?: string[];
  gradeLevelFocus?: string[];
  teachingStyle?: string;
  classType?: string[];
  schedule?: string;
}

interface TeacherOnboardingPromptsProps {
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
  { value: 'russian', label: '🇷🇺 Russian', flag: '🇷🇺' },
  { value: 'english', label: '🇬🇧 English', flag: '🇬🇧' }
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

const teachingLevels = ['Beginner', 'Intermediate', 'Advanced'];
const teachingApproaches = [
  { value: 'structured', label: 'Structured – syllabus-driven lessons' },
  { value: 'conversational', label: 'Conversational – real-world communication focus' },
  { value: 'flexible', label: 'Flexible – tailored to each student\'s needs' }
];
const lessonFormats = [
  { value: 'live-one-on-one', label: 'Live one-on-one sessions' },
  { value: 'group-classes', label: 'Group classes' },
  { value: 'recorded-video', label: 'Recorded video lessons' }
];
const teachingStyles = [
  { value: 'curriculum-based', label: 'Curriculum-based' },
  { value: 'conceptual-practice', label: 'Conceptual & practice-focused' },
  { value: 'exam-oriented', label: 'Exam-oriented' }
];
const classTypes = [
  { value: 'one-on-one', label: 'One-on-one' },
  { value: 'group', label: 'Group' },
  { value: 'recorded-modules', label: 'Recorded modules' }
];

export const TeacherOnboardingPrompts = ({ onComplete }: TeacherOnboardingPromptsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const steps = [
    {
      title: 'Teaching Focus',
      description: 'What do you teach?',
      icon: Briefcase
    },
    {
      title: data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'Language Specialization' : 'Subject Specialization',
      description: data.teachingFocus === 'languages' || data.teachingFocus === 'both'
        ? 'Which languages do you teach? (Select all that apply.)'
        : 'Which IGCSE subjects do you teach? (Select all that apply.)',
      icon: data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? Globe : BookOpen
    },
    {
      title: data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'Teaching Level' : 'Grade Level Focus',
      description: data.teachingFocus === 'languages' || data.teachingFocus === 'both'
        ? 'What levels do you teach?'
        : 'What levels do you teach?',
      icon: Award
    },
    {
      title: data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'Teaching Approach' : 'Teaching Style',
      description: data.teachingFocus === 'languages' || data.teachingFocus === 'both'
        ? 'How would you describe your teaching style?'
        : 'How do you usually approach your lessons?',
      icon: Headphones
    },
    {
      title: 'Lesson Format',
      description: 'What kind of lessons will you provide?',
      icon: Video
    },
    {
      title: data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'Availability' : 'Schedule',
      description: data.teachingFocus === 'languages' || data.teachingFocus === 'both'
        ? 'When are you usually available to teach?'
        : 'When are you generally available to teach?',
      icon: Clock
    },
    {
      title: 'Rate Preference',
      description: 'What\'s your preferred hourly rate range?',
      icon: DollarSign
    },
    {
      title: 'Confirmation',
      description: data.teachingFocus === 'languages' || data.teachingFocus === 'both'
        ? 'Excellent! Your teaching preferences have been saved.'
        : 'Perfect! Your teaching preferences are set.',
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

  const handleLevelToggle = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleFormatToggle = (format: string) => {
    setSelectedFormats(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Teaching Focus
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.teachingFocus === 'languages' ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => updateData('teachingFocus', 'languages')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                    🌐
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Languages</h3>
                  <p className="text-sm text-gray-600">Teach languages to students worldwide</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.teachingFocus === 'igcse' ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => updateData('teachingFocus', 'igcse')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                    📘
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">IGCSE Subjects</h3>
                  <p className="text-sm text-gray-600">Academic tutoring for IGCSE curriculum</p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  data.teachingFocus === 'both' ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => updateData('teachingFocus', 'both')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl">
                    🎓
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Both</h3>
                  <p className="text-sm text-gray-600">Teach both languages and IGCSE subjects</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 1: // Language Specialization / Subject Specialization
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {(data.teachingFocus === 'languages' || data.teachingFocus === 'both')
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

      case 2: // Teaching Level / Grade Level Focus
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {teachingLevels.map((level) => (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedLevels.includes(level) 
                      ? 'ring-2 ring-purple-500 bg-purple-50' 
                      : ''
                  }`}
                  onClick={() => handleLevelToggle(level)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">
                      {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '📈' : '🏆'}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{level}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              You can select multiple levels
            </p>
          </div>
        );

      case 3: // Teaching Approach / Teaching Style
        return (
          <RadioGroup
            value={data.teachingApproach || data.teachingStyle}
            onValueChange={(value) => updateData(
              data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'teachingApproach' : 'teachingStyle',
              value
            )}
            className="space-y-3"
          >
            {(data.teachingFocus === 'languages' || data.teachingFocus === 'both'
              ? teachingApproaches
              : teachingStyles
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

      case 4: // Lesson Format
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lessonFormats.map((format) => (
                <Card 
                  key={format.value}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedFormats.includes(format.value) 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : ''
                  }`}
                  onClick={() => handleFormatToggle(format.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">
                      {format.value === 'live-one-on-one' ? '👥' : 
                       format.value === 'group-classes' ? '👨‍👩‍👧‍👦' : '🎬'}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{format.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              You can select multiple formats
            </p>
          </div>
        );

      case 5: // Availability / Schedule
        return (
          <RadioGroup
            value={data.availability || data.schedule}
            onValueChange={(value) => updateData(
              data.teachingFocus === 'languages' || data.teachingFocus === 'both' ? 'availability' : 'schedule',
              value
            )}
            className="space-y-3"
          >
            {[
              { value: 'weekdays', label: 'Weekdays' },
              { value: 'weekends', label: 'Weekends' },
              { value: 'both', label: 'Both' },
              { value: 'flexible', label: 'Flexible' }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 6: // Rate Preference
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Set Your Rate</h3>
              <p className="text-sm text-gray-600">What's your preferred hourly rate range?</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-20">Min:</span>
                <Input
                  type="number"
                  placeholder="10"
                  className="flex-1"
                  value={data.ratePreference?.split('-')[0] || ''}
                  onChange={(e) => {
                    const current = data.ratePreference || '';
                    const min = e.target.value;
                    const max = current.split('-')[1] || '50';
                    updateData('ratePreference', `${min}-${max}`);
                  }}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-20">Max:</span>
                <Input
                  type="number"
                  placeholder="50"
                  className="flex-1"
                  value={data.ratePreference?.split('-')[1] || ''}
                  onChange={(e) => {
                    const current = data.ratePreference || '';
                    const min = current.split('-')[0] || '10';
                    const max = e.target.value;
                    updateData('ratePreference', `${min}-${max}`);
                  }}
                />
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Example: $10–$25 per hour
              </p>
            </div>
          </div>
        );

      case 7: // Confirmation
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Excellent! Your teaching preferences have been saved.
              </h3>
              <p className="text-gray-600 mb-6">
                Next, you'll complete your profile and make your teaching experience visible to students.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Your Teaching Profile:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Teaching Focus:</span>
                  <Badge variant="outline">
                    {data.teachingFocus === 'both' ? 'Languages & IGCSE' : 
                     data.teachingFocus === 'languages' ? 'Languages' : 'IGCSE Subjects'}
                  </Badge>
                </div>
                
                {(data.teachingFocus === 'languages' || data.teachingFocus === 'both') && selectedLanguages.length > 0 && (
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
                
                {(data.teachingFocus === 'igcse' || data.teachingFocus === 'both') && selectedSubjects.length > 0 && (
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
                
                {selectedLevels.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Levels:</span>
                    <div className="flex gap-1">
                      {selectedLevels.map(level => (
                        <Badge key={level} variant="outline" className="text-xs">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.teachingApproach && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teaching Style:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.teachingApproach}
                    </Badge>
                  </div>
                )}
                
                {data.teachingStyle && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teaching Style:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.teachingStyle}
                    </Badge>
                  </div>
                )}
                
                {data.availability && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.availability}
                    </Badge>
                  </div>
                )}
                
                {data.schedule && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Schedule:</span>
                    <Badge variant="outline" className="text-xs">
                      {data.schedule}
                    </Badge>
                  </div>
                )}
                
                {data.ratePreference && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <Badge variant="outline" className="text-xs">
                      ${data.ratePreference} per hour
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
              <User className="w-6 h-6" />
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
                (currentStep === 1 && ((data.teachingFocus === 'languages' || data.teachingFocus === 'both') && selectedLanguages.length === 0) ||
                (currentStep === 1 && (data.teachingFocus === 'igcse' || data.teachingFocus === 'both') && selectedSubjects.length === 0)) ||
                (currentStep === 2 && selectedLevels.length === 0) ||
                (currentStep === 3 && !data.teachingApproach && !data.teachingStyle) ||
                (currentStep === 4 && selectedFormats.length === 0) ||
                (currentStep === 5 && !data.availability && !data.schedule) ||
                (currentStep === 6 && !data.ratePreference)
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