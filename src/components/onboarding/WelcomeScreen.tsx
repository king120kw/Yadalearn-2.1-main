import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  Globe, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Award,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
  onStartStudentOnboarding: () => void;
  onStartTeacherOnboarding: () => void;
}

export const WelcomeScreen = ({ onStartStudentOnboarding, onStartTeacherOnboarding }: WelcomeScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const features = [
    {
      icon: Globe,
      title: 'Expert Tutors',
      description: 'Learn from qualified educators worldwide',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Flexible Learning',
      description: 'Study at your own pace, anytime anywhere',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Target,
      title: 'Personalized Plans',
      description: 'Customized curriculum based on your goals',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Users,
      title: 'Interactive Sessions',
      description: 'Engaging one-on-one and group classes',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const studentBenefits = [
    { icon: '🎯', title: 'Personalized Learning', description: 'Customized study plans tailored to your goals' },
    { icon: '🌟', title: 'Expert Guidance', description: 'Learn from qualified and experienced tutors' },
    { icon: '📈', title: 'Progress Tracking', description: 'Monitor your improvement with detailed analytics' },
    { icon: '🏆', title: 'Achievement System', description: 'Earn badges and certificates as you learn' }
  ];

  const teacherBenefits = [
    { icon: '💰', title: 'Flexible Income', description: 'Set your rates and work on your schedule' },
    { icon: '🌍', title: 'Global Reach', description: 'Connect with students from around the world' },
    { icon: '📚', title: 'Teaching Tools', description: 'Professional platform with all teaching resources' },
    { icon: '⭐', title: 'Build Reputation', description: 'Establish your brand as an educator' }
  ];

  return (
    <div className="min-h-screen gradient-lavender flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">YadaLearn</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where skilled educators meet motivated learners. Personalized learning experiences that adapt to your goals and schedule.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center text-white text-2xl`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Your Learning Journey</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Card */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-xl ${selectedRole === 'student' ? 'ring-4 ring-purple-500 scale-105' : ''}`}
              onClick={() => setSelectedRole('student')}
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl">
                    🎓
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">I'm a Student</h3>
                  <p className="text-gray-600">Start learning new skills and achieve your goals</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {studentBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {benefit.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartStudentOnboarding();
                  }}
                >
                  Start Learning as Student
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Teacher Card */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-xl ${selectedRole === 'teacher' ? 'ring-4 ring-green-500 scale-105' : ''}`}
              onClick={() => setSelectedRole('teacher')}
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-4xl">
                    👨‍🏫
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">I'm a Teacher</h3>
                  <p className="text-gray-600">Share your knowledge and start teaching</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {teacherBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        {benefit.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartTeacherOnboarding();
                  }}
                >
                  Start Teaching as Educator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Step Preview */}
        {selectedRole && (
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 mb-8">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Great Choice! You're ready to begin
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedRole === 'student' 
                  ? 'We\'ll help you create a personalized learning profile and match you with the perfect tutors.'
                  : 'We\'ll guide you through setting up your teaching profile and connecting with students.'
                }
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedRole(null)}
                >
                  Back
                </Button>
                <Button 
                  onClick={selectedRole === 'student' ? onStartStudentOnboarding : onStartTeacherOnboarding}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Continue as {selectedRole === 'student' ? 'Student' : 'Teacher'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Expert Tutors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600">Subjects Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};