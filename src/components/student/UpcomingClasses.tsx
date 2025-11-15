import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  BookOpen,
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
  Download,
  Play,
  MoreHorizontal,
  ChevronRight,
  AlertTriangle,
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'doc' | 'link';
  size?: string;
  duration?: string;
}

interface PreparationItem {
  id: string;
  title: string;
  completed: boolean;
  type: 'reading' | 'exercise' | 'video' | 'quiz';
}

interface ClassSession {
  id: string;
  title: string;
  teacher: string;
  teacherAvatar: string;
  time: string;
  date: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'completed';
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  location: 'online' | 'in-person' | 'hybrid';
  meetingLink?: string;
  materials: ClassMaterial[];
  preparation: PreparationItem[];
  notes?: string;
}

interface UpcomingClassesProps {
  classes: ClassSession[];
  onJoinClass: (classId: string) => void;
  onViewDetails: (classId: string) => void;
}

export const UpcomingClasses = ({ classes, onJoinClass, onViewDetails }: UpcomingClassesProps) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedClasses = showAll ? classes : classes.slice(0, 3);

  const getStatusColor = (status: ClassSession['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: ClassSession['level']) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-700';
      case 'intermediate': return 'bg-purple-100 text-purple-700';
      case 'advanced': return 'bg-red-100 text-red-700';
    }
  };

  const getLocationIcon = (location: ClassSession['location']) => {
    switch (location) {
      case 'online': return Video;
      case 'in-person': return MapPin;
      case 'hybrid': return AlertCircle;
    }
  };

  const getMaterialIcon = (type: ClassMaterial['type']) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Play;
      case 'doc': return BookOpen;
      case 'link': return Link;
    }
  };

  const getPreparationIcon = (type: PreparationItem['type']) => {
    switch (type) {
      case 'reading': return FileText;
      case 'exercise': return BookOpen;
      case 'video': return Play;
      case 'quiz': return CheckCircle;
    }
  };

  const isUpcoming = (date: string, time: string) => {
    const classDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    return classDateTime > now;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Classes</h2>
        {classes.length > 3 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {displayedClasses.map((classSession) => {
          const LocationIcon = getLocationIcon(classSession.location);
          const isClassUpcoming = isUpcoming(classSession.date, classSession.time);
          
          return (
            <Card 
              key={classSession.id} 
              className={`transition-all hover:shadow-lg cursor-pointer ${
                selectedClass === classSession.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedClass(selectedClass === classSession.id ? null : classSession.id)}
            >
              <CardContent className="p-0">
                {/* Class Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                        {classSession.teacher.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800 text-lg">{classSession.title}</h3>
                          <Badge className={getLevelColor(classSession.level)}>
                            {classSession.level}
                          </Badge>
                          <Badge className={getStatusColor(classSession.status)}>
                            {classSession.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {classSession.teacher}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {classSession.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {classSession.time} ({classSession.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <LocationIcon className="w-4 h-4" />
                            {classSession.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isClassUpcoming && classSession.status === 'confirmed' && (
                        <Button 
                          size="sm"
                          className="bg-black hover:bg-gray-900 text-white rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            onJoinClass(classSession.id);
                          }}
                        >
                          Join
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(classSession.id);
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedClass === classSession.id && (
                  <div className="p-5 space-y-4">
                    {/* Preparation Section */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Preparation Checklist
                      </h4>
                      <div className="space-y-2">
                        {classSession.preparation.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              item.completed 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-gray-300 text-gray-400'
                            }`}>
                              {item.completed && <CheckCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${
                                  item.completed ? 'text-gray-800 line-through' : 'text-gray-600'
                                }`}>
                                  {item.title}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                              </div>
                              {!item.completed && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Complete this before class
                                </p>
                              )}
                            </div>
                            {!item.completed && (
                              <Button size="sm" variant="outline" className="text-xs">
                                Start
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials Section */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Class Materials
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {classSession.materials.map((material) => {
                          const MaterialIcon = getMaterialIcon(material.type);
                          return (
                            <div 
                              key={material.id} 
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <MaterialIcon className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{material.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  {material.size && <span>{material.size}</span>}
                                  {material.duration && <span>• {material.duration}</span>}
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="text-xs">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes Section */}
                    {classSession.notes && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          Teacher Notes
                        </h4>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-gray-700">{classSession.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Meeting Link */}
                    {classSession.meetingLink && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Meeting Link</h4>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Video className="w-5 h-5 text-purple-600" />
                          <a 
                            href={classSession.meetingLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Join Class Meeting
                          </a>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1"
                        onClick={() => onJoinClass(classSession.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Join Class Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => onViewDetails(classSession.id)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Calendar Integration CTA */}
      {classes.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Never Miss a Class</h3>
                <p className="text-sm text-gray-600">Sync your class schedule with your calendar</p>
              </div>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Connect Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper component for link icon
const Link = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);