import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { TeacherProfileModal } from '@/components/ProfileModals';
import { mockQuery, mockStore } from '@/data/mockData';
import type { Teacher } from '@/types/schema';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = mockStore;
  const { topTeachers, upcomingClasses } = mockQuery;

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // Mock courses data
  const courses = [
    { name: 'Chemistry', icon: 'science', gradient: 'from-[var(--lavender-purple-start)] to-[var(--lavender-purple-end)]', textColor: 'text-[#674EA7]' },
    { name: 'Spanish', icon: 'translate', gradient: 'from-[var(--yellow-orange-start)] to-[var(--yellow-orange-end)]', textColor: 'text-[#C47529]' },
    { name: 'History', icon: 'history_edu', gradient: 'from-sky-100 to-blue-200', textColor: 'text-[#3E82A8]' },
    { name: 'Art Class', icon: 'art_track', gradient: 'from-emerald-100 to-green-200', textColor: 'text-[#2F857B]' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24 safe-bottom">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <p className="text-base text-subtext-light dark:text-subtext-dark mb-1">Welcome back, Student</p>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
              Hi, {currentUser.name.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center -space-x-3">
            {topTeachers.slice(0, 2).map((teacher, idx) => (
              <Avatar key={idx} className="w-10 h-10 border-2 border-background-light dark:border-background-dark">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-background-light dark:border-background-dark">
              <span className="text-sm font-semibold text-slate-600">+{topTeachers.length - 2}</span>
            </div>
          </div>
        </header>

        {/* Progress Section */}
        <section className="mb-8">
          <div
            className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-3xl shadow-soft text-[#5B4A9F] relative overflow-hidden transition-transform duration-300 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -10;
              const rotateY = ((x - centerX) / centerX) * 10;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }}
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-4 -left-12 w-28 h-28 bg-white/10 rounded-full"></div>
            <div className="flex justify-between items-start mb-4 z-10 relative">
              <div>
                <h2 className="text-xl font-bold">Your Progress</h2>
                <p className="text-sm opacity-80">This Month</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center bg-white/40 rounded-full">
                <span className="material-symbols-outlined text-lg">more_horiz</span>
              </button>
            </div>
            <div className="flex items-center justify-between z-10 relative">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                  <path
                    className="text-white/30"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-white"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="0, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">0%</span>
                  <span className="text-xs opacity-90">Completed</span>
                </div>
              </div>
              <div className="text-right space-y-4">
                <div>
                  <p className="text-base font-medium">Completed</p>
                  <p className="text-sm opacity-80">0 tasks</p>
                </div>
                <div>
                  <p className="text-base font-medium">Pending</p>
                  <p className="text-sm opacity-80">0 tasks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">Quick Actions</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-500 dark:text-blue-400">schedule</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">Manage Time</p>
            </div>
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">event</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">Book a Class</p>
            </div>
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-500 dark:text-green-400">description</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">Revision Notes</p>
            </div>
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-pink-500 dark:text-pink-400">style</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">Flashcards</p>
            </div>
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-500 dark:text-purple-400">videocam</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">Video Meeting</p>
            </div>
            <div className="bg-white dark:bg-gray-800/40 p-4 rounded-3xl shadow-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-500 dark:text-orange-400">psychology</span>
              </div>
              <p className="text-xs font-medium text-center text-text-light dark:text-text-dark">AI Study Buddy</p>
            </div>
          </div>
        </section>

        {/* Upcoming Classes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Upcoming Classes</h2>
            <a className="text-sm font-medium text-indigo-500 dark:text-indigo-400" href="#">View All</a>
          </div>
          <div className="space-y-4">
            {upcomingClasses.slice(0, 2).map((classItem, idx) => (
              <div key={classItem.id} className="bg-white dark:bg-zinc-800 px-5 py-6 rounded-4xl flex items-center justify-between shadow-soft-float">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`w-14 h-14 ${idx === 0 ? 'bg-red-100 dark:bg-red-900/40' : 'bg-blue-100 dark:bg-blue-900/40'} rounded-2xl flex items-center justify-center`}>
                      <span className={`material-symbols-outlined text-3xl ${idx === 0 ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'}`}>
                        {idx === 0 ? 'quiz' : 'edit_document'}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${idx === 0 ? 'bg-red-400' : 'bg-blue-400'} rounded-full border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-sm`}>
                      <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'wght' 700" }}>
                        {idx === 0 ? 'priority_high' : 'hourglass_top'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-base text-text-light dark:text-text-dark">
                      {idx === 0 ? 'Chemistry Quiz' : classItem.title}
                    </p>
                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                      {idx === 0 ? 'Due: Tomorrow, 11:59 PM' : `Due: ${classItem.day}, ${classItem.time}`}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-subtext-light dark:text-subtext-dark cursor-pointer">more_vert</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
      <TeacherProfileModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
