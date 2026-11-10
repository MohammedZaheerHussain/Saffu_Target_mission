import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  calculateTotalXP,
  calculateTodayXP,
  calculateWeekXP,
} from '../../utils/xpUtils';
import {
  formatIndianDate,
  shiftDays,
  diffDays,
} from '../../utils/dateUtils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import {
  BarChart3,
  Flame,
  Award,
  CheckCircle,
  Clock,
  BookOpen,
  Trophy,
  TrendingUp,
} from 'lucide-react';

export const ProgressAnalytics: React.FC = () => {
  const { state, todayDateStr, totalXP } = useApp();
  const [rangeFilter, setRangeFilter] = useState<'week' | '7days' | '30days' | 'all'>('7days');

  // Stats calculations
  const todayXP = calculateTodayXP(state.xpLedger, todayDateStr);
  const completedTasks = state.tasks.filter((t) => t.status === 'completed');
  const totalCompletedMinutes = completedTasks.reduce(
    (sum, t) => sum + (t.actualMinutes || t.estimatedMinutes),
    0
  );
  const totalHours = (totalCompletedMinutes / 60).toFixed(1);

  // Mock exam stats
  const totalMocks = state.mockExams.length;
  const avgMockScore =
    totalMocks > 0
      ? Math.round(state.mockExams.reduce((sum, m) => sum + m.percentage, 0) / totalMocks)
      : 0;

  // Generate chart data based on filter
  const getDaysCount = () => {
    if (rangeFilter === 'week') return 7;
    if (rangeFilter === '7days') return 7;
    if (rangeFilter === '30days') return 30;
    return 35; // Entire challenge length approx
  };

  const daysCount = getDaysCount();
  const chartDays: { date: string; displayDate: string; xp: number; studyMinutes: number }[] = [];

  for (let i = daysCount - 1; i >= 0; i--) {
    const dStr = shiftDays(todayDateStr, -i);
    const dayXP = state.xpLedger
      .filter((tx) => tx.timestamp.startsWith(dStr) && tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const dayMinutes = state.tasks
      .filter((t) => t.status === 'completed' && t.completedAt && t.completedAt.startsWith(dStr))
      .reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);

    chartDays.push({
      date: dStr,
      displayDate: formatIndianDate(dStr).split(' ').slice(0, 2).join(' '),
      xp: dayXP,
      studyMinutes: dayMinutes,
    });
  }

  // Subject-wise preparation progress
  const subjectProgressData = state.subjects.map((sub) => {
    const subTasks = state.tasks.filter((t) => t.subjectId === sub.id);
    const completedSubTasks = subTasks.filter((t) => t.status === 'completed');
    const percent = subTasks.length > 0 ? Math.round((completedSubTasks.length / subTasks.length) * 100) : 0;

    return {
      id: sub.id,
      name: sub.name,
      total: subTasks.length,
      completed: completedSubTasks.length,
      percent,
      color: sub.color,
      badgeBg: sub.badgeBg,
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">Progress & Analytics</h2>
          <p className="text-xs text-muted mt-0.5">
            Real-time visual insights into your study consistency, XP velocity, and subject readiness.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 bg-[#F0EAD6]/60 p-1 rounded-2xl border border-[#E5E0D0] text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setRangeFilter('week')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              rangeFilter === 'week' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setRangeFilter('7days')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              rangeFilter === '7days' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setRangeFilter('30days')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              rangeFilter === '30days' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setRangeFilter('all')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              rangeFilter === 'all' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* ---------------- KEY METRICS TILES ---------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total XP</span>
            <Award className="w-4 h-4 text-accent" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-serif font-bold text-primary">{totalXP}</span>
            <span className="text-xs text-muted ml-1">/ 1000 XP</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-1">
            +{todayXP} XP earned today
          </span>
        </div>

        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-serif font-bold text-primary">
              {state.streak.currentStreak}
            </span>
            <span className="text-xs text-muted ml-1">Days</span>
          </div>
          <span className="text-[10px] text-muted mt-1">
            Longest: {state.streak.longestStreak} days
          </span>
        </div>

        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Study Time</span>
            <Clock className="w-4 h-4 text-secondary" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-serif font-bold text-primary">{totalHours}</span>
            <span className="text-xs text-muted ml-1">Hours</span>
          </div>
          <span className="text-[10px] text-muted mt-1">
            Across {completedTasks.length} missions
          </span>
        </div>

        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Mock Tests</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-serif font-bold text-primary">{totalMocks}</span>
            <span className="text-xs text-muted ml-1">Completed</span>
          </div>
          <span className="text-[10px] text-muted mt-1">
            Avg Score: {avgMockScore > 0 ? `${avgMockScore}%` : 'N/A'}
          </span>
        </div>
      </div>

      {/* ---------------- CHARTS ROW ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily XP Trend */}
        <div className="card-parchment p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-primary">Daily XP Points Velocity</h3>
              <p className="text-[11px] text-muted">Academic points earned per study day</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
              XP Points
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartDays}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE7D8" />
                <XAxis dataKey="displayDate" tick={{ fontSize: 10, fill: '#898D91' }} />
                <YAxis tick={{ fontSize: 10, fill: '#898D91' }} />
                <Tooltip
                  formatter={(value: unknown) => [`${value} XP`, 'Earned']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    border: '1px solid #ECE7D8',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="xp" fill="#E9B95C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Minutes Trend */}
        <div className="card-parchment p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-primary">Focused Study Time</h3>
              <p className="text-[11px] text-muted">Minutes completed per study session</p>
            </div>
            <span className="text-xs font-bold text-secondary-dark bg-secondary/15 px-2 py-0.5 rounded-lg border border-secondary/30">
              Minutes
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartDays}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE7D8" />
                <XAxis dataKey="displayDate" tick={{ fontSize: 10, fill: '#898D91' }} />
                <YAxis tick={{ fontSize: 10, fill: '#898D91' }} />
                <Tooltip
                  formatter={(value: unknown) => [`${value} mins`, 'Study Time']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    border: '1px solid #ECE7D8',
                    fontSize: '11px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="studyMinutes"
                  stroke="#829A88"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#829A88' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ---------------- SUBJECT-WISE PREPARATION PERCENTAGES ---------------- */}
      <div className="card-parchment p-5 space-y-4">
        <div>
          <h3 className="font-serif font-bold text-base text-primary">Subject Preparation Progress</h3>
          <p className="text-xs text-muted">Calculated from completed tasks & question bank practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectProgressData.map((sub) => (
            <div key={sub.id} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary truncate max-w-[200px]">{sub.name}</span>
                <span className="text-xs font-extrabold text-primary">{sub.percent}%</span>
              </div>

              <div className="w-full bg-[#E8E3D5] rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${sub.percent}%`,
                    backgroundColor: sub.color || '#26364A',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted">
                <span>{sub.completed} of {sub.total} missions completed</span>
                <span>{sub.total - sub.completed} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Exam History Table */}
      {state.mockExams.length > 0 && (
        <div className="card-parchment p-5 space-y-3">
          <h3 className="font-serif font-bold text-base text-primary">Mock Examination Records</h3>
          <div className="divide-y divide-[#ECE7D8]">
            {state.mockExams.map((mock) => {
              const sub = state.subjects.find((s) => s.id === mock.subjectId);
              return (
                <div key={mock.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-primary">{mock.title}</h5>
                    <p className="text-[10px] text-muted">
                      {sub?.name} • {formatIndianDate(mock.date)} • {mock.timeSpentMinutes} mins
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-serif font-bold text-sm ${
                        mock.percentage >= 70 ? 'text-emerald-700' : 'text-primary'
                      }`}
                    >
                      {mock.marksObtained}/{mock.totalMarks} ({mock.percentage}%)
                    </span>
                    {mock.percentage >= 70 && (
                      <span className="block text-[9px] font-bold text-emerald-700 uppercase">
                        Distinction (+20 XP)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

