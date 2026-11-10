import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { FocusTimerModal } from './components/timer/FocusTimerModal';
import { ShareModal } from './components/common/ShareModal';
import { AddTaskModal } from './components/planner/AddTaskModal';
import { MockExamModal } from './components/mock/MockExamModal';

// Views
import { TodayDashboard } from './components/dashboard/TodayDashboard';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { QuestionBank } from './components/questions/QuestionBank';
import { XPRewardsView } from './components/xp/XPRewardsView';
import { ProgressAnalytics } from './components/progress/ProgressAnalytics';
import { SettingsView } from './components/settings/SettingsView';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('today');

  // Modal triggers
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerTaskId, setTimerTaskId] = useState<string | undefined>(undefined);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [addTaskDate, setAddTaskDate] = useState<string | undefined>(undefined);
  const [isMockOpen, setIsMockOpen] = useState(false);

  const handleOpenTimer = (taskId?: string) => {
    setTimerTaskId(taskId);
    setIsTimerOpen(true);
  };

  const handleOpenAddTask = (defaultDate?: string) => {
    setAddTaskDate(defaultDate);
    setIsAddTaskOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navigation Header */}
      <Header
        onOpenTimer={() => handleOpenTimer()}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main layout container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenAddTask={() => handleOpenAddTask()}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0 pb-24 md:pb-8">
          {activeTab === 'today' && (
            <TodayDashboard
              onOpenTimer={handleOpenTimer}
              onOpenShare={() => setIsShareOpen(true)}
              onOpenAddTask={() => handleOpenAddTask()}
              onNavigate={setActiveTab}
              onOpenMockExam={() => setIsMockOpen(true)}
            />
          )}

          {activeTab === 'planner' && (
            <StudyPlanner
              onOpenAddTask={handleOpenAddTask}
              onOpenTimer={handleOpenTimer}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionBank
              onOpenSyllabusManager={() => setActiveTab('settings')}
            />
          )}

          {activeTab === 'xp' && <XPRewardsView />}

          {activeTab === 'progress' && <ProgressAnalytics />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals & Overlays */}
      <FocusTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        initialTaskId={timerTaskId}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        defaultDate={addTaskDate}
      />

      <MockExamModal
        isOpen={isMockOpen}
        onClose={() => setIsMockOpen(false)}
      />

      {/* Feedback Toasts Container */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

