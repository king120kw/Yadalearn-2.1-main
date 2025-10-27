import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';

const enTranslations: Record<string, string> = {
  studentOnboarding: 'Student Onboarding',
  teacherOnboarding: 'Teacher Onboarding',
  welcomeStudentTitle: "Hi 👋 Welcome to YadaLearn!",
  welcomeTeacherTitle: "Welcome to YadaLearn, Teacher!",
  welcomeStudentSubtitle: "Let's get to know you so we can make every lesson a treasure for you.",
  welcomeTeacherSubtitle: "Let's set up your teaching profile so you can inspire students globally.",
  startSetup: "Start Setup",
  startSetupComplete: "Take me to my Dashboard",
  startSetupTeacher: "Go to Dashboard",
  stepOf: "Step {current} of {total}",
  whatAchieve: "What do you hope to achieve with YadaLearn?",
  selectAllApply: "Select all that apply",
  howLearnBest: "How do you like to learn best?",
  whatMotivates: "What motivates you the most?",
  whenStudy: "When do you usually study best?",
  confidenceQ: "How confident do you feel about your studies right now?",
  completeThanksTitle: "Thanks! We've personalized your learning path.",
  readyBegin: "Ready to begin your journey?",
  teacherFinalTitle: "Great! Your teaching profile is ready.",
  teacherFinalSubtitle: "Students will soon discover you. Let's head to your dashboard.",
  teacherName: "Your name",
  teacherSubject: "Primary subject (e.g. English Instructor)",
  teacherAvatar: "Avatar image URL"
};

const translations: Record<string, Record<string, string>> = {
  en: enTranslations,
  // stub other languages by cloning English entries (replace with real translations later)
  id: { ...enTranslations }, // Bahasa Indonesia
  my: { ...enTranslations }, // Burmese
  sw: { ...enTranslations }, // Swahili
  ar: { ...enTranslations }, // Arabic
  zh: { ...enTranslations }  // Chinese
};

const Onboarding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [customInput, setCustomInput] = useState("");
  const [language, setLanguage] = useState<string>(() => localStorage.getItem('yadalearn-lang') || 'en');

  // Teacher profile capture & persistence so dashboard can sync avatars/profiles later
  const [teacherProfile, setTeacherProfile] = useState({
    name: '',
    subject: '',
    avatarUrl: '',
    rating: 4.8,
    earnings: 0,
    sessions: 0
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { setUserRole } = useAuth();
  const role = location.state?.role || 'student';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Auto-redirect returning teacher users (persisted role)
  useEffect(() => {
    const savedRole = localStorage.getItem('yadalearn-user-role');
    if (savedRole === 'teacher') {
      // Restore role in context but DO NOT force navigation here.
      // Forcing navigation on mount can cause TeacherDashboard to mount unexpectedly
      // and trigger hook-order issues if its internal hooks depend on other app state.
      setUserRole?.('teacher');
      // If you want to redirect, do it from a higher-level router or after ensuring
      // dashboard-related context/hooks are initialized.
      // navigate('/teacher-dashboard', { replace: true }); // removed to prevent hook-order errors
    }
    // restore language
    const lang = localStorage.getItem('yadalearn-lang');
    if (lang) setLanguage(lang);
  }, []); // run once on mount

  const t = (key: string, vars?: Record<string, any>) => {
    const txt = (translations[language] && translations[language][key]) || translations.en[key] || key;
    if (!vars) return txt;
    return Object.keys(vars).reduce((s, k) => s.replace(`{${k}}`, String(vars[k])), txt);
  };

  const handleAnswer = (question: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else {
      // If teacher, persist teacher profile so Dashboard can read/sync avatars and details
      if (role === 'teacher') {
        const profileToSave = {
          ...teacherProfile,
          // optionally augment with onboarding answers
          subjects: answers.subjects || [],
          teachingStyle: answers.teachingStyle || ''
        };
        localStorage.setItem('yadalearn-teacher-profile', JSON.stringify(profileToSave));
      }

      // Complete onboarding - save role and navigate
      setUserRole?.(role); // Save role to AuthContext and localStorage
      localStorage.setItem('yadalearn-user-role', role); // Additional persistence
      localStorage.setItem('yadalearn-lang', language); // persist language preference

      const dashboardPath = role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard';
      navigate(dashboardPath);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Language selector handler
  const onChangeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('yadalearn-lang', lang);
  };

  // Student Onboarding Content
  const renderStudentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            {/* Responsive welcome image */}
            <img
              src="/assets/welcome.png"
              alt="Welcome"
              className="mx-auto mb-6 w-28 sm:w-36 md:w-48 lg:w-56 object-contain"
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('welcomeStudentTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              {t('welcomeStudentSubtitle')}
            </p>
            <Button onClick={nextStep} size="lg" className="bg-black hover:bg-gray-900 text-white px-8 py-3">
              {t('startSetup')}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
                {t('whatAchieve')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">{t('selectAllApply')}</p>
              <div className="space-y-4">
                {[
                  "Improve my school grades",
                  "Prepare for IGCSE exams",
                  "Build strong language skills",
                  "Practice problem-solving & critical thinking"
                ].map((goal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Checkbox
                      id={`goal-${index}`}
                      checked={answers.learningGoals?.includes(goal) || false}
                      onCheckedChange={(checked) => {
                        const currentGoals = answers.learningGoals || [];
                        if (checked) {
                          handleAnswer('learningGoals', [...currentGoals, goal]);
                        } else {
                          handleAnswer('learningGoals', currentGoals.filter((g: string) => g !== goal));
                        }
                      }}
                    />
                    <Label htmlFor={`goal-${index}`} className="text-gray-700 cursor-pointer">
                      {goal}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="goal-other"
                    checked={answers.learningGoals?.includes('Other') || false}
                    onCheckedChange={(checked) => {
                      const currentGoals = answers.learningGoals || [];
                      if (checked) {
                        handleAnswer('learningGoals', [...currentGoals, 'Other']);
                      } else {
                        handleAnswer('learningGoals', currentGoals.filter((g: string) => g !== 'Other'));
                      }
                    }}
                  />
                  <Label htmlFor="goal-other" className="text-gray-700 cursor-pointer">
                    Other
                  </Label>
                </div>
                {answers.learningGoals?.includes('Other') && (
                  <Input
                    placeholder="Please specify your goals..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="mt-3"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {t('howLearnBest')}
            </h2>
            <RadioGroup
              value={answers.learningStyle || ""}
              onValueChange={(value) => handleAnswer('learningStyle', value)}
              className="space-y-4"
            >
              {[
                "Short lessons with quizzes",
                "Interactive discussions",
                "Step-by-step guided practice",
                "Self-paced reading & exercises"
              ].map((style, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={style} id={`style-${index}`} />
                  <Label htmlFor={`style-${index}`} className="text-gray-700 cursor-pointer">
                    {style}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {t('whatMotivates')}
            </h2>
            <RadioGroup
              value={answers.motivation || ""}
              onValueChange={(value) => handleAnswer('motivation', value)}
              className="space-y-4"
            >
              {[
                "Achieving high scores",
                "Competing with friends",
                "Personal growth & curiosity",
                "Teacher/parent encouragement"
              ].map((motivation, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={motivation} id={`motivation-${index}`} />
                  <Label htmlFor={`motivation-${index}`} className="text-gray-700 cursor-pointer">
                    {motivation}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {t('whenStudy')}
            </h2>
            <RadioGroup
              value={answers.studyTime || ""}
              onValueChange={(value) => handleAnswer('studyTime', value)}
              className="space-y-4"
            >
              {[
                "Morning",
                "Afternoon",
                "Evening",
                "Flexible / Anytime"
              ].map((time, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={time} id={`time-${index}`} />
                  <Label htmlFor={`time-${index}`} className="text-gray-700 cursor-pointer">
                    {time}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              {t('confidenceQ')}
            </h2>
            <RadioGroup
              value={answers.confidence || ""}
              onValueChange={(value) => handleAnswer('confidence', value)}
              className="space-y-4"
            >
              {[
                "Very confident 🚀",
                "Doing okay 👍",
                "Need more support 🤝"
              ].map((confidence, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={confidence} id={`confidence-${index}`} />
                  <Label htmlFor={`confidence-${index}`} className="text-gray-700 cursor-pointer">
                    {confidence}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="text-center py-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('completeThanksTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              {t('readyBegin')}
            </p>
            <Button onClick={nextStep} size="lg" className="bg-black hover:bg-gray-900 text-white px-8 py-3">
              {t('startSetupComplete')}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // Teacher Onboarding Content
  const renderTeacherStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-8">
            {/* Responsive welcome image */}
            <img
              src="/assets/welcome-teacher.png"
              alt="Welcome Teacher"
              className="mx-auto mb-6 w-28 sm:w-36 md:w-48 lg:w-56 object-contain"
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('welcomeTeacherTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              {t('welcomeTeacherSubtitle')}
            </p>
            <Button onClick={nextStep} size="lg" className="bg-black hover:bg-gray-900 text-white px-8 py-3">
              {t('startSetup')}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What do you want to achieve on YadaLearn?
            </h2>
            <RadioGroup
              value={answers.teachingGoal || ""}
              onValueChange={(value) => handleAnswer('teachingGoal', value)}
              className="space-y-4"
            >
              {[
                "Teach and mentor students online",
                "Prepare learners for IGCSE exams",
                "Share expertise and knowledge",
                "Build professional teaching experience"
              ].map((goal, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={goal} id={`tgoal-${index}`} />
                  <Label htmlFor={`tgoal-${index}`} className="text-gray-700 cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Which subjects do you specialize in?
            </h2>
            <div className="space-y-4">
              {[
                "Math",
                "Science",
                "English / Languages",
                "Social Studies"
              ].map((subject, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`subject-${index}`}
                    checked={answers.subjects?.includes(subject) || false}
                    onCheckedChange={(checked) => {
                      const currentSubjects = answers.subjects || [];
                      if (checked) {
                        handleAnswer('subjects', [...currentSubjects, subject]);
                      } else {
                        handleAnswer('subjects', currentSubjects.filter((s: string) => s !== subject));
                      }
                    }}
                  />
                  <Label htmlFor={`subject-${index}`} className="text-gray-700 cursor-pointer">
                    {subject}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="subject-other"
                  checked={answers.subjects?.includes('Other') || false}
                  onCheckedChange={(checked) => {
                    const currentSubjects = answers.subjects || [];
                    if (checked) {
                      handleAnswer('subjects', [...currentSubjects, 'Other']);
                    } else {
                      handleAnswer('subjects', currentSubjects.filter((s: string) => s !== 'Other'));
                    }
                  }}
                />
                <Label htmlFor="subject-other" className="text-gray-700 cursor-pointer">
                  Other
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              How would you describe your teaching style?
            </h2>
            <RadioGroup
              value={answers.teachingStyle || ""}
              onValueChange={(value) => handleAnswer('teachingStyle', value)}
              className="space-y-4"
            >
              {[
                "Structured & exam-focused",
                "Interactive & engaging",
                "Practical & project-based",
                "Flexible & adaptive"
              ].map((style, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={style} id={`tstyle-${index}`} />
                  <Label htmlFor={`tstyle-${index}`} className="text-gray-700 cursor-pointer">
                    {style}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              When are you usually available to teach?
            </h2>
            <RadioGroup
              value={answers.availability || ""}
              onValueChange={(value) => handleAnswer('availability', value)}
              className="space-y-4"
            >
              {[
                "Weekdays (morning)",
                "Weekdays (evening)",
                "Weekends",
                "Flexible"
              ].map((availability, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={availability} id={`avail-${index}`} />
                  <Label htmlFor={`avail-${index}`} className="text-gray-700 cursor-pointer">
                    {availability}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What type of lessons do you want to deliver?
            </h2>
            <RadioGroup
              value={answers.classType || ""}
              onValueChange={(value) => handleAnswer('classType', value)}
              className="space-y-4"
            >
              {[
                "One-on-one lessons",
                "Small group sessions",
                "Large class sessions",
                "Flexible"
              ].map((classType, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={classType} id={`class-${index}`} />
                  <Label htmlFor={`class-${index}`} className="text-gray-700 cursor-pointer">
                    {classType}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('teacherFinalTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              {t('teacherFinalSubtitle')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">{t('teacherName')}</Label>
                <Input
                  placeholder={t('teacherName')}
                  value={teacherProfile.name}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label className="text-sm">{t('teacherSubject')}</Label>
                <Input
                  placeholder={t('teacherSubject')}
                  value={teacherProfile.subject}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-sm">{t('teacherAvatar')}</Label>
                <Input
                  placeholder={t('teacherAvatar')}
                  value={teacherProfile.avatarUrl}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, avatarUrl: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-2">Tip: use an absolute image URL — this will sync with your profile avatars.</p>
              </div>
            </div>

            <div className="text-right">
              <Button onClick={nextStep} className="bg-black hover:bg-gray-900 text-white">
                {t('startSetupTeacher')}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Add BottomNav component inside this file so it's available immediately
  const BottomNav = () => {
    const routes = [
      { id: 'home', label: 'Home', path: '/teacher-dashboard', icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5L12 4l9 6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21V11h14v10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )},
      { id: 'search', label: 'Search', path: '/search', icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21l-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )},
      { id: 'calendar', label: 'Calendar', path: '/calendar', icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3v4M8 3v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )},
      { id: 'profile', label: 'Profile', path: '/settings', icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )},
    ];

    const currentPath = location.pathname;

    return (
      <nav
        aria-label="Bottom navigation"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-lg bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 flex justify-between items-center px-2 py-2 sm:py-3 z-50"
        role="navigation"
      >
        {routes.map((r) => {
          const active = currentPath === r.path || (r.path === '/teacher-dashboard' && currentPath === '/teacher-dashboard');
          return (
            <button
              key={r.id}
              aria-label={r.label}
              onClick={() => navigate(r.path)}
              className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-2 px-2 rounded-lg transition-transform duration-150 ${
                active ? 'scale-105' : 'active:scale-95'
              }`}
            >
              <div className="flex items-center justify-center">
                {r.icon(active)}
              </div>
              <span className={`mt-1 text-[10px] sm:text-xs ${active ? 'text-black' : 'text-gray-500'}`}>
                {r.label}
              </span>
            </button>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Language selector + Progress Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Label className="text-sm">Language</Label>
              <select
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="my">Burmese</option>
                <option value="sw">Swahili</option>
                <option value="ar">Arabic</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {t('stepOf', { current: currentStep, total: 7 })}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {role === 'student' ? t('studentOnboarding') : t('teacherOnboarding')}
              </span>
              <span className="text-sm text-gray-600">
                {t('stepOf', { current: currentStep, total: 7 })}
              </span>
            </div>
            <Progress value={(currentStep / 7) * 100} className="h-2" />
          </div>

          {/* Step Content */}
          {role === 'student' ? renderStudentStep() : renderTeacherStep()}

          {/* Navigation Buttons */}
          {currentStep > 1 && (
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-black hover:bg-gray-900 text-white"
                disabled={
                  (currentStep === 2 && role === 'student' && (!answers.learningGoals || answers.learningGoals.length === 0)) ||
                  (currentStep === 3 && role === 'student' && !answers.learningStyle) ||
                  (currentStep === 4 && role === 'student' && !answers.motivation) ||
                  (currentStep === 5 && role === 'student' && !answers.studyTime) ||
                  (currentStep === 6 && role === 'student' && !answers.confidence) ||
                  (currentStep === 2 && role === 'teacher' && !answers.teachingGoal) ||
                  (currentStep === 3 && role === 'teacher' && (!answers.subjects || answers.subjects.length === 0)) ||
                  (currentStep === 4 && role === 'teacher' && !answers.teachingStyle) ||
                  (currentStep === 5 && role === 'teacher' && !answers.availability) ||
                  (currentStep === 6 && role === 'teacher' && !answers.classType)
                }
              >
                {currentStep === 7 ? 'Complete' : 'Next'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Render bottom nav only for teachers to match requested context */}
      {role === 'teacher' && <BottomNav />}
    </div>
  );
};

export default Onboarding;
