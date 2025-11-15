import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, Clock, Users, Play, Home, Search, User, Settings } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';
import { Carousel3D } from '@/components/Carousel3D';
import { TeacherProfileModal } from '@/components/ProfileModals';
import { WeeklyBarChart } from '@/components/WeeklyBarChart';
import { StudentProgressModal } from '@/components/student/StudentProgressModal';
import { mockQuery, mockStore, mockRootProps } from '@/data/mockData';
import type { Teacher } from '@/types/schema';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  
  const { currentUser } = mockStore;
  const { topTeachers, upcomingClasses, courses, weeklySchedule } = mockQuery;

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleJoinClass = (classId: string) => {};
  const handleViewDetails = (classId: string) => {};

  const carouselItems = topTeachers.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    avatar: t.avatar
  }));

  return (
    <div className="min-h-screen pb-24" style={{ background: '#f8f5ff' }}>
      <header className="w-full">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" className="rounded-full px-4">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-xs text-gray-600">
                Score: {currentUser.performance}%
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-2 space-y-8">
        <section className="rounded-2xl bg-white shadow-medium p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-fluid-heading font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h2>
              <p className="text-fluid-body text-gray-600">Ready to continue your learning journey?</p>
              <p className="text-sm text-gray-500">All AI interactions will address you as: <span className="font-semibold">{currentUser.name.split(' ')[0]}</span></p>
            </div>
          </div>
          <div className="mt-6">
            <Card className="border-0 shadow-strong rounded-2xl overflow-hidden cursor-pointer" onClick={() => setIsProgressOpen(true)}>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Your Learning Progress</p>
                    <div className="mt-2">
                      <span className="text-fluid-5xl font-bold">{currentUser.performance}%</span>
                    </div>
                    <p className="mt-2 text-fluid-body text-gray-700">Overall performance score</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div>Social Learning Score: {Math.floor((currentUser.socialConnections * currentUser.engagementScore) / 100)}%</div>
                      <div>Study Buddies Online: {currentUser.friendsOnPlatform}</div>
                    </div>
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <Avatar className="h-20 w-20 ring-4 ring-white">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{currentUser.sessionsCompleted}</div>
                      <div className="text-xs text-gray-600">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{currentUser.interviewsCompleted}</div>
                      <div className="text-xs text-gray-600">Interviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{currentUser.totalHours}</div>
                      <div className="text-xs text-gray-600">Hours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-purple-100 p-4 transition-transform group-hover:scale-110 group-hover:shadow-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Continue Learning</h3>
                <p className="text-xs text-gray-600">Resume your last course</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-blue-100 p-4 transition-transform group-hover:scale-110 group-hover:shadow-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Find Tutor</h3>
                <p className="text-xs text-gray-600">Match by goals</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-green-100 p-4 transition-transform group-hover:scale-110 group-hover:shadow-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Book Session</h3>
                <p className="text-xs text-gray-600">Schedule a class</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-orange-100 p-4 transition-transform group-hover:scale-110 group-hover:shadow-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">View Schedule</h3>
                <p className="text-xs text-gray-600">Upcoming classes</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl" style={{ backgroundColor: course.backgroundColor }}></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                      <div className="mt-2">
                        <Progress value={Math.min(100, (course.lessonCount / 25) * 100)} />
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Weekly Activity</h2>
          </div>
          <Card className="bg-white border-0 shadow-md">
            <CardContent className="p-6">
              <WeeklyBarChart data={weeklySchedule} totalHours={mockRootProps.totalHours} totalMinutes={mockRootProps.totalMinutes} />
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Classes</h2>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingClasses.map((c, i) => (
              <div key={c.id} className={`rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between ${i % 4 === 0 ? 'bg-green-100' : i % 4 === 1 ? 'bg-orange-100' : i % 4 === 2 ? 'bg-purple-100' : 'bg-blue-100'}`}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-white">
                    <AvatarImage src={c.teacherAvatar} />
                    <AvatarFallback>{c.teacher[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{c.title}</h3>
                    <p className="text-sm text-gray-700">{c.teacher} • {c.subject}</p>
                    <p className="text-xs text-gray-600">{c.date} • {c.time}</p>
                    <div className="text-xs mt-1 text-yellow-700">📧 Teacher emailed 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-white text-gray-800">Confirmed</Badge>
                  <Button size="sm" className="bg-black hover:bg-gray-900 text-white rounded-full" onClick={() => {
                    const hasUnread = true;
                    if (hasUnread) {
                      if (confirm('You have an unread email from the teacher. Read before class?')) {
                        window.open('https://mail.google.com/', '_blank');
                        return;
                      }
                    }
                    handleJoinClass(c.id);
                  }}>Join</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Carousel3D
            items={topTeachers.map(t => ({ id: t.id, name: t.name, role: t.role, avatar: t.avatar }))}
            title="RECOMMENDED TEACHERS"
            subtitle="Discover our expert educators"
            onItemClick={(item) => {
              const teacher = topTeachers.find(t => t.id === item.id);
              if (teacher) handleTeacherClick(teacher);
            }}
          />
        </section>
      </main>

      <BottomNav />
      <TeacherProfileModal teacher={selectedTeacher} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <StudentProgressModal open={isProgressOpen} onClose={() => setIsProgressOpen(false)} />
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around h-20">
            <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-purple-600 transition-colors">
              <Home size={24} className="fill-current" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Search size={24} />
              <span className="text-xs font-medium">Search</span>
            </button>
            <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Calendar size={24} />
              <span className="text-xs font-medium">Classes</span>
            </button>
            <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <User size={24} />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
