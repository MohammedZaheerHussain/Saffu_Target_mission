import React from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  Calendar,
  CheckSquare,
  BookOpen,
  Award,
  BarChart3,
  Settings,
  PlusCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export type NavTab = 'today' | 'planner' | 'questions' | 'xp' | 'progress' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenAddTask: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onOpenAddTask }) => {
  const { state, totalXP, levelInfo } = useApp();

  const navItems = [
    { id: 'today' as const, label: 'Today', icon: CheckSquare, badge: null },
    { id: 'planner' as const, label: 'Study Planner', icon: Calendar, badge: null },
    { id: 'questions' as const, label: 'Question Bank', icon: BookOpen, badge: state.questions.length },
    { id: 'xp' as const, label: 'XP & Rewards', icon: Award, badge: `${totalXP} XP` },
    { id: 'progress' as const, label: 'Progress', icon: BarChart3, badge: null },
    { id: 'settings' as const, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#FFFFFF] border-r border-[#ECE7D8] min-h-[calc(100vh-65px)] p-4 shrink-0 justify-between">
      <div className="space-y-6">
        {/* Quick Add Mission Action */}
        <button
          onClick={onOpenAddTask}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium text-xs shadow-soft transition-all transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-accent" />
          <span>New Study Mission</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-soft font-semibold'
                    : 'text-[#4A5568] hover:bg-[#F7F5EF] hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-[#898D91]'}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F0EAD6] text-primary-light border border-[#E5E0D0]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Level & Milestone Progress Widget */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" />
              Level {levelInfo.levelNumber}
            </span>
            <span className="text-[11px] font-bold text-primary">{levelInfo.name}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#E8E3D5] rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((totalXP / 1000) * 100))}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-muted">
            <span>{totalXP} XP</span>
            <span>1,000 XP Target</span>
          </div>
        </div>
      </div>

      {/* Student Profile Footer Card */}
      <div className="pt-4 border-t border-[#ECE7D8] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary-dark font-serif font-bold text-sm shrink-0">
          <GraduationCap className="w-5 h-5 text-secondary-dark" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-primary truncate">
            {state.profile.displayName || 'BA English Scholar'}
          </h4>
          <p className="text-[10px] text-muted truncate">Kamban Arts & Science</p>
        </div>
      </div>
    </aside>
  );
};

