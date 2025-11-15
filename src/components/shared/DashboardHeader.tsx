import { useState } from 'react';
import { Bell, TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  userName: string;
  userAvatar: string;
  performance: number;
  learningStreak: number;
  notifications: number;
  subjects: string[];
}

export const DashboardHeader = ({ 
  userName, 
  userAvatar, 
  performance, 
  learningStreak, 
  notifications,
  subjects 
}: DashboardHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBgColor = (performance: number) => {
    if (performance >= 90) return 'bg-green-100';
    if (performance >= 75) return 'bg-blue-100';
    if (performance >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="relative">
      {/* Main Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-white/30 shadow-lg">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Welcome back, <span className="text-purple-200">{userName.split(' ')[0]}</span>! 👋
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {subjects.join(', ')}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Award className="w-3 h-3 mr-1" />
                  {learningStreak} day streak
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </Button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Class Reminder</p>
                        <p className="text-xs text-gray-600">Spanish class starts in 30 minutes</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Achievement Unlocked!</p>
                        <p className="text-xs text-gray-600">You've completed 10 lessons this week</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Progress Update</p>
                        <p className="text-xs text-gray-600">Your performance improved by 5%</p>
                        <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-sm" onClick={() => setShowNotifications(false)}>
                    Mark all as read
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className={`${getPerformanceBgColor(performance)} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium">Overall Performance</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(performance)}`}>
                    {performance}%
                  </p>
                </div>
                <TrendingUp className={`h-8 w-8 ${getPerformanceColor(performance)}`} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 border-white/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200 font-medium">Learning Streak</p>
                  <p className="text-2xl font-bold text-white">
                    {learningStreak} days
                  </p>
                </div>
                <Award className="h-8 w-8 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/20 border-white/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-200 font-medium">Classes This Week</p>
                  <p className="text-2xl font-bold text-white">5</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </header>
    </div>
  );
};