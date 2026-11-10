import React from 'react';
import { NavTab } from './Sidebar';
import {
  CheckSquare,
  Calendar,
  BookOpen,
  Award,
  BarChart3,
  Settings,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today' as const, label: 'Today', icon: CheckSquare },
    { id: 'planner' as const, label: 'Planner', icon: Calendar },
    { id: 'questions' as const, label: 'Bank', icon: BookOpen },
    { id: 'xp' as const, label: 'Rewards', icon: Award },
    { id: 'progress' as const, label: 'Stats', icon: BarChart3 },
    { id: 'settings' as const, label: 'Config', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ECE7D8] px-2 py-1.5 pb-safe shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[54px] ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-[#898D91] hover:text-charcoal'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-[#FAF6EC] text-primary' : 'text-[#898D91]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2px] text-primary' : 'stroke-[1.8px]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-primary' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

