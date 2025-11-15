import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { StudentOnboardingPrompts } from './StudentOnboardingPrompts';
import { TeacherOnboardingPrompts } from './TeacherOnboardingPrompts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap, 
  User,
  Award,
  Target,
  Calendar,
  BookOpen,
  Globe
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (role: 'student' | 'teacher', data: any) => void;
}

type OnboardingStep = 'welcome' | 'student' | 'teacher' | 'confirmation';

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [teacherData, setTeacherData] = useState<any>(null);

  const handleStartStudentOnboarding = () => {
    setUserRole('student');
    setCurrentStep('student');
  };

  const handleStartTeacherOnboarding = () => {
    setUserRole('teacher');
    setCurrentStep('teacher');
  };

  const handleStudentComplete = (data: any) => {
    setStudentData(data);
    setCurrentStep('confirmation');
  };

  const handleTeacherComplete = (data: any) => {
    setTeacherData(data);
    setCurrentStep('confirmation');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
    setUserRole(null);
    setStudentData(null);
    setTeacherData(null);
  };

  const handleConfirmAndComplete = () => {
    if (userRole === 'student' && studentData) {
      onComplete('student', studentData);
    } else if (userRole === 'teacher' && teacherData) {
      onComplete('teacher', teacherData);
    }
  };

  const renderConfirmation = () => {
    const data = userRole === 'student' ? studentData : teacherData;
    
    return (
      <div className="min-h-screen gradient-lavender flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🎉 All set!
            </h2>
            <p className="text-gray-600">
              Your dashboard is ready — start exploring, connect, and make learning happen.
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Profile Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRole === 'student' ? (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                        Learning Preferences
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Study Path:</span>
                          <Badge variant="outline">
                            {data.studyPath === 'languages' ? '🌐 Languages' : '📘 IGCSE Subjects'}
                          </Badge>
                        </div>
                        
                        {data.studyPath === 'languages' && data.languages && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Languages:</span>
                            <div className="flex gap-1">
                              {data.languages.slice(0, 2).map((lang: string) => (
                                <Badge key={lang} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {data.languages.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{data.languages.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {data.studyPath === 'igcse' && data.igcseSubjects && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subjects:</span>
                            <div className="flex gap-1 flex-wrap">
                              {data.igcseSubjects.slice(0, 2).map((subject: string) => (
                                <Badge key={subject} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                              {data.igcseSubjects.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{data.igcseSubjects.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Level:</span>
                          <Badge variant="outline" className="text-xs">
                            {data.currentLevel || data.currentGrade}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goal:</span>
                          <Badge variant="outline" className="text-xs">
                            {data.learningObjective}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preference:</span>
                          <Badge variant="outline" className="text-xs">
                            {data.classPreference || data.studyFrequency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Next Steps
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Profile Complete</p>
                            <p className="text-xs text-gray-600">Your learning preferences are saved</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Teacher Matching</p>
                            <p className="text-xs text-gray-600">We're finding the best tutors for you</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Calendar className="w-3 h-3 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Schedule Ready</p>
                            <p className="text-xs text-gray-600">Book your first class</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-green-600" />
                        Teaching Profile
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Focus:</span>
                          <Badge variant="outline">
                            {data.teachingFocus === 'both' ? '🌐 Languages & 📘 IGCSE' :
                             data.teachingFocus === 'languages' ? '🌐 Languages' : '📘 IGCSE Subjects'}
                          </Badge>
                        </div>
                        
                        {(data.teachingFocus === 'languages' || data.teachingFocus === 'both') && data.languageSpecialization && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Languages:</span>
                            <div className="flex gap-1">
                              {data.languageSpecialization.slice(0, 2).map((lang: string) => (
                                <Badge key={lang} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {data.languageSpecialization.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{data.languageSpecialization.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {(data.teachingFocus === 'igcse' || data.teachingFocus === 'both') && data.subjectSpecialization && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subjects:</span>
                            <div className="flex gap-1 flex-wrap">
                              {data.subjectSpecialization.slice(0, 2).map((subject: string) => (
                                <Badge key={subject} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                              {data.subjectSpecialization.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{data.subjectSpecialization.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Levels:</span>
                          <div className="flex gap-1">
                            {data.teachingLevel?.map((level: string) => (
                              <Badge key={level} variant="outline" className="text-xs">
                                {level}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <Badge variant="outline" className="text-xs">
                            ${data.ratePreference} per hour
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-600" />
                        Next Steps
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Preferences Set</p>
                            <p className="text-xs text-gray-600">Your teaching profile is ready</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <BookOpen className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Profile Setup</p>
                            <p className="text-xs text-gray-600">Complete your profile details</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Globe className="w-3 h-3 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Student Matching</p>
                            <p className="text-xs text-gray-600">Connect with learners worldwide</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleBackToWelcome}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Welcome
              </Button>
              
              <Button
                onClick={handleConfirmAndComplete}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
              >
                Enter Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      {currentStep === 'welcome' && (
        <WelcomeScreen
          onStartStudentOnboarding={handleStartStudentOnboarding}
          onStartTeacherOnboarding={handleStartTeacherOnboarding}
        />
      )}
      
      {currentStep === 'student' && (
        <StudentOnboardingPrompts
          onComplete={handleStudentComplete}
        />
      )}
      
      {currentStep === 'teacher' && (
        <TeacherOnboardingPrompts
          onComplete={handleTeacherComplete}
        />
      )}
      
      {currentStep === 'confirmation' && renderConfirmation()}
    </>
  );
};