import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockQuery, mockStore } from '@/data/mockData';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const StudentProgressModal = ({ open, onClose }: Props) => {
  const { courses } = mockQuery;
  const { currentUser } = mockStore;

  const mailtoInvite = (emailHash: string) => {
    const url = `mailto:${emailHash}@school.edu?subject=Study%20Session&body=Want%20to%20study%20together%3F`;
    window.open(url, '_blank');
    const invites = JSON.parse(localStorage.getItem('study_invites') || '[]');
    invites.push({ sender_id: currentUser.id, recipient_email_hash: emailHash, status: 'sent', ts: Date.now() });
    localStorage.setItem('study_invites', JSON.stringify(invites));
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detailed Progress</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="courses">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="courses">Course Breakdown</TabsTrigger>
            <TabsTrigger value="network">Study Network</TabsTrigger>
            <TabsTrigger value="comm">Communication Log</TabsTrigger>
            <TabsTrigger value="achievements">Social Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-4">
            <div className="grid-responsive">
              {courses.map((c) => (
                <Card key={c.id} className="border-0 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md" style={{ backgroundColor: c.backgroundColor }}></div>
                      <div className="flex-1">
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-gray-600">Lessons: {c.lessonCount}</div>
                        <div className="text-xs text-gray-500">Instructor: {c.instructor}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="mt-4">
            <div className="space-y-4">
              <div className="text-sm">Your Learning Connections: 0</div>
              <div className="text-sm">Assignment Deadlines Detected: 0</div>
              <div className="text-sm">Study Partners from Email: 0</div>
              <Button className="rounded-full" onClick={() => mailtoInvite('hashed_email')}>Send Study Invite</Button>
            </div>
          </TabsContent>

          <TabsContent value="comm" className="mt-4">
            <div className="space-y-2 text-sm">
              <div>Emails with Teacher: 0</div>
              <div>Average Teacher Response Time: 0h</div>
              <div>Topics Discussed: []</div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'First Connection', unlocked: false },
                { title: 'Responsive Student', unlocked: false },
                { title: 'Study Group Creator', unlocked: false },
              ].map((a) => (
                <Card key={a.title} className="border-0 shadow-soft">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-semibold">{a.title}</div>
                    <div className="text-xs text-gray-600">{a.unlocked ? 'Unlocked' : '🔒 Locked'}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

