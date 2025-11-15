import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockRootProps } from '@/data/mockData';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const TeacherQuickStatsModal = ({ open, onClose }: Props) => {
  const { teacherStats } = mockRootProps;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Teacher Quick Stats</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comm">Communication Metrics</TabsTrigger>
            <TabsTrigger value="network">Learning Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid-responsive">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Earnings (demo)</div>
                  <div className="text-xl font-bold">${teacherStats.thisWeek}</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">Total Sessions</div>
                  <div className="text-xl font-bold">{teacherStats.completed}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comm" className="mt-4">
            <div className="space-y-2 text-sm">
              <div>No student communication data yet. Connect Gmail to start tracking.</div>
              <div>You sent 0 emails this week</div>
              <div>Average student reply time: 0h</div>
              <div>Pending student replies: 0</div>
              <Button variant="outline" className="rounded-full">Send Follow-up Reminders</Button>
            </div>
          </TabsContent>

          <TabsContent value="network" className="mt-4">
            <div className="space-y-2 text-sm">
              <div>No teaching network found. Connect Facebook to find peers.</div>
              <div>0 teachers in your education groups</div>
              <Button variant="outline" className="rounded-full">Recommend resources</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

