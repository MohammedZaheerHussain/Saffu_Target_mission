import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatIndianDate, calculateExamCountdown } from '../../utils/dateUtils';
import { Flame, Clock, Share2, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenTimer: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTimer, onOpenShare }) => {
  const { state, todayDateStr, totalXP } = useApp();

  // Find next upcoming exam
  const upcomingExams = state.exams
    .filter((e) => e.date && !calculateExamCountdown(e.date).isPast)
    .sort((a, b) => (a.date! > b.date! ? 1 : -1));
  const nextExam = upcomingExams[0];
  const countdown = nextExam ? calculateExamCountdown(nextExam.date) : null;

  return (
    <header className="sticky top-0 z-30 glass-warm border-b border-[#ECE7D8]/80 px-4 md:px-8 py-3 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light text-amber-300 flex items-center justify-center shadow-soft-md shrink-0">
            <BookOpen className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-serif font-bold text-primary tracking-tight">
                SEMESTER SURVIVAL
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent-dark border border-accent/40">
                Quest 2026
              </span>
            </div>
            <p className="text-[11px] text-muted hidden md:block">
              Kamban College of Arts & Science • Thiruvalluvar University
            </p>
          </div>
        </div>

        {/* Center / Right Quick Stats */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Next Exam Pill */}
          {nextExam && countdown && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#ECE7D8] shadow-sm text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-muted">Next:</span>
              <span className="font-semibold text-primary truncate max-w-[140px]">{nextExam.subjectName}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                {countdown.formatted}
              </span>
            </div>
          )}

          {/* Streak Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold ${
              state.streak.currentStreak > 0
                ? 'bg-orange-50 border-orange-200 text-orange-700'
                : 'bg-white border-[#ECE7D8] text-muted'
            }`}
            title={`${state.streak.currentStreak} day consecutive study streak`}
          >
            <Flame
              className={`w-4 h-4 ${
                state.streak.currentStreak > 0 ? 'fill-orange-500 text-orange-500' : 'text-muted'
              }`}
            />
            <span>{state.streak.currentStreak}</span>
            <span className="hidden sm:inline text-[10px] font-normal">days</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ECE7D8] shadow-sm text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-accent fill-accent" />
            <span>{totalXP}</span>
            <span className="text-[10px] font-normal text-muted">XP</span>
          </div>

          {/* Focus Timer Button */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#ECE7D8] text-primary text-xs font-medium transition-colors shadow-sm"
            title="Open Focus Timer"
          >
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span className="hidden sm:inline">Focus</span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-medium transition-colors"
            title="Share daily progress via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden md:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

