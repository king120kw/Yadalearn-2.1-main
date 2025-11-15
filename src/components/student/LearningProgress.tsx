import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target, 
  Star, 
  Award,
  Calendar,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubjectProgress {
  id: string;
  name: string;
  icon: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextMilestone: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  total?: number;
}

interface LearningProgressProps {
  subjects: SubjectProgress[];
  achievements: Achievement[];
  weeklyGoal: number;
  completedThisWeek: number;
}

export const LearningProgress = ({ 
  subjects, 
  achievements, 
  weeklyGoal, 
  completedThisWeek 
}: LearningProgressProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-100';
    if (progress >= 75) return 'bg-blue-100';
    if (progress >= 60) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  const weeklyProgressPercentage = Math.min((completedThisWeek / weeklyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Weekly Goal Progress */}
      <Card className="gradient-purple-card border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Weekly Learning Goal</h3>
                <p className="text-sm text-gray-600">Complete {weeklyGoal} lessons this week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-700">{completedThisWeek}/{weeklyGoal}</p>
              <p className="text-sm text-gray-600">{Math.round(weeklyProgressPercentage)}% complete</p>
            </div>
          </div>
          <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(weeklyProgressPercentage)} rounded-full transition-all duration-500`}
              style={{ width: `${weeklyProgressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-600">
              {weeklyProgressPercentage >= 100 
                ? "🎉 Goal achieved! Keep up the great work!" 
                : `${weeklyGoal - completedThisWeek} lessons remaining`}
            </p>
            <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
              <BarChart3 className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subject Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Subject Progress</h2>
          <Button variant="outline" size="sm">
            View All Subjects
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedSubject === subject.id ? 'ring-2 ring-purple-500' : ''}`}
              onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getProgressBgColor(subject.progress)} rounded-full flex items-center justify-center`}>
                      <span className="text-lg">{subject.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                      <p className="text-xs text-gray-600">
                        {subject.completedLessons}/{subject.totalLessons} lessons
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedSubject === subject.id ? 'rotate-90' : ''}`} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">{subject.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(subject.progress)} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
                
                {selectedSubject === subject.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">Next milestone: {subject.nextMilestone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Continue Learning
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Achievements</h2>
          <Button variant="outline" size="sm">
            View All Achievements
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.slice(0, 3).map((achievement) => (
            <Card key={achievement.id} className={cn(
              "transition-all hover:shadow-lg",
              achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" : "bg-gray-50 border-gray-200"
            )}>
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white" 
                    : "bg-gray-200 text-gray-400"
                }`}>
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                
                <h3 className={`font-semibold mb-1 ${
                  achievement.earned ? "text-gray-800" : "text-gray-500"
                }`}>
                  {achievement.title}
                </h3>
                
                <p className={`text-xs mb-3 ${
                  achievement.earned ? "text-gray-600" : "text-gray-400"
                }`}>
                  {achievement.description}
                </p>
                
                {!achievement.earned && achievement.progress !== undefined && achievement.total !== undefined && (
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {achievement.progress}/{achievement.total} completed
                    </p>
                  </div>
                )}
                
                {achievement.earned && (
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-yellow-700">Earned</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Stats Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700 mb-1">24</div>
              <p className="text-xs text-gray-600">Total Lessons</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">32h</div>
              <p className="text-xs text-gray-600">Learning Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 mb-1">86%</div>
              <p className="text-xs text-gray-600">Avg. Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-700 mb-1">15</div>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};