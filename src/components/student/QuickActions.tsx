import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  FileText, 
  BookOpen, 
  Video, 
  Lightbulb, 
  Brain,
  Target,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Mic,
  Headphones,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  category: 'learning' | 'practice' | 'review' | 'ai';
  recommended?: boolean;
  progress?: number;
  total?: number;
}

interface RecommendedAction {
  id: string;
  title: string;
  reason: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
}

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'learning' | 'practice' | 'review' | 'ai'>('all');

  const quickActions: QuickAction[] = [
    {
      id: 'manage-time',
      title: 'Study Planner',
      description: 'Plan your learning schedule',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      category: 'learning',
      recommended: true,
      progress: 3,
      total: 7
    },
    {
      id: 'book-class',
      title: 'Book Class',
      description: 'Schedule with your teacher',
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      category: 'learning',
      recommended: true
    },
    {
      id: 'revision-notes',
      title: 'Revision Notes',
      description: 'Review your study materials',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      category: 'review',
      progress: 8,
      total: 12
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Practice vocabulary & concepts',
      icon: BookOpen,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      category: 'practice',
      recommended: true
    },
    {
      id: 'video-meeting',
      title: 'Video Session',
      description: 'Join live class or meeting',
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      category: 'learning'
    },
    {
      id: 'ai-study-buddy',
      title: 'AI Study Buddy',
      description: 'Get personalized help',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      category: 'ai',
      recommended: true
    },
    {
      id: 'voice-practice',
      title: 'Voice Practice',
      description: 'Improve pronunciation',
      icon: Mic,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      category: 'practice'
    },
    {
      id: 'focus-mode',
      title: 'Focus Mode',
      description: 'Deep learning session',
      icon: Headphones,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      category: 'learning'
    },
    {
      id: 'goal-tracking',
      title: 'Goal Tracking',
      description: 'Monitor your progress',
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      category: 'review'
    },
    {
      id: 'progress-report',
      title: 'Progress Report',
      description: 'View detailed analytics',
      icon: TrendingUp,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      category: 'review'
    },
    {
      id: 'smart-recommendations',
      title: 'Smart Recommendations',
      description: 'AI-powered suggestions',
      icon: Sparkles,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      category: 'ai'
    },
    {
      id: 'completion-check',
      title: 'Daily Check-in',
      description: 'Complete today\'s goals',
      icon: CheckCircle,
      color: 'text-lime-600',
      bgColor: 'bg-lime-100',
      category: 'learning',
      recommended: true
    }
  ];

  const recommendedActions: RecommendedAction[] = [
    {
      id: 'ai-grammar-check',
      title: 'Grammar Review',
      reason: 'Based on your recent quiz performance',
      icon: FileText,
      priority: 'high'
    },
    {
      id: 'vocabulary-builder',
      title: 'Vocabulary Builder',
      reason: 'You\'re progressing well in Spanish',
      icon: BookOpen,
      priority: 'medium'
    },
    {
      id: 'pronunciation-practice',
      title: 'Pronunciation Practice',
      reason: 'Time to improve your speaking skills',
      icon: Mic,
      priority: 'medium'
    }
  ];

  const filteredActions = selectedCategory === 'all' 
    ? quickActions 
    : quickActions.filter(action => action.category === selectedCategory);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">AI-Powered Recommendations</h3>
              <p className="text-sm text-gray-600">Personalized suggestions based on your learning patterns</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedActions.map((action) => (
              <div 
                key={action.id} 
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onActionClick(action.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <action.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm">{action.title}</h4>
                  </div>
                  <Badge className={getPriorityColor(action.priority)}>
                    {action.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-3">{action.reason}</p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Try Now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className="text-sm"
        >
          All Actions
        </Button>
        <Button
          variant={selectedCategory === 'learning' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('learning')}
          className="text-sm"
        >
          📚 Learning
        </Button>
        <Button
          variant={selectedCategory === 'practice' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('practice')}
          className="text-sm"
        >
          🎯 Practice
        </Button>
        <Button
          variant={selectedCategory === 'review' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('review')}
          className="text-sm"
        >
          📖 Review
        </Button>
        <Button
          variant={selectedCategory === 'ai' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('ai')}
          className="text-sm"
        >
          🤖 AI Tools
        </Button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredActions.map((action) => (
          <Card
            key={action.id}
            className={`group cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
              action.recommended ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => onActionClick(action.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${action.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110`}>
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{action.description}</p>
              
              {action.recommended && (
                <Badge className="bg-purple-100 text-purple-700 text-xs mb-2">
                  Recommended
                </Badge>
              )}
              
              {action.progress !== undefined && action.total !== undefined && (
                <div className="space-y-1">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${(action.progress / action.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {action.progress}/{action.total} completed
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center mt-2">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Smart Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Learning Insights</h3>
              <p className="text-sm text-gray-600">Personalized tips to improve your learning</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Study Pattern</h4>
              </div>
              <p className="text-xs text-gray-600 mb-2">You learn best in the morning (9-11 AM)</p>
              <p className="text-xs text-blue-600 font-medium">💡 Schedule important classes during this time</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-3 h-3 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">Goal Progress</h4>
              </div>
              <p className="text-xs text-gray-600 mb-2">You're 75% towards your weekly goal</p>
              <p className="text-xs text-green-600 font-medium">🎉 Keep going! You can do it!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};