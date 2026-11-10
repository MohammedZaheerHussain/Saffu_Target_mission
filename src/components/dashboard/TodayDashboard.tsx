import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatIndianDate, calculateExamCountdown, formatFullDayDate } from '../../utils/dateUtils';
import {
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  Circle,
  Calendar,
  Share2,
  BookOpen,
  PlusCircle,
  Trophy,
  Coffee,
  Check,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TodayDashboardProps {
  onOpenTimer: (taskId?: string) => void;
  onOpenShare: () => void;
  onOpenAddTask: () => void;
  onNavigate: (tab: 'today' | 'planner' | 'questions' | 'xp' | 'progress' | 'settings') => void;
  onOpenMockExam: () => void;
}

export const TodayDashboard: React.FC<TodayDashboardProps> = ({
  onOpenTimer,
  onOpenShare,
  onOpenAddTask,
  onNavigate,
  onOpenMockExam,
}) => {
  const { state, todayDateStr, totalXP, todayXP, levelInfo, toggleTaskCompletion } = useApp();

  // Find next upcoming exam
  const upcomingExams = state.exams
    .filter((e) => e.date && !calculateExamCountdown(e.date).isPast)
    .sort((a, b) => (a.date! > b.date! ? 1 : -1));
  const nextExam = upcomingExams[0];
  const countdown = nextExam ? calculateExamCountdown(nextExam.date) : null;

  // Filter tasks for today
  const todaysTasks = state.tasks.filter((t) => t.scheduledDate === todayDateStr);
  const completedTasks = todaysTasks.filter((t) => t.status === 'completed');
  const pendingTasks = todaysTasks.filter((t) => t.status !== 'completed');

  // Study time
  const completedMinutes = completedTasks.reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);
  const totalTargetMinutes = state.profile.dailyStudyTargetMinutes || 330;
  const progressPercent = Math.min(100, Math.round((completedMinutes / totalTargetMinutes) * 100));

  // Check if today is an exam day
  const isExamDay = Boolean(nextExam && countdown?.isToday);

  // Four timetable routine blocks
  const routineBlocks = [
    {
      sessionNum: 1,
      time: '09:00 AM – 10:30 AM',
      duration: '90m',
      title: 'Session 1: Primary Subject Core Study',
      desc: 'Focus deeply on today\'s main syllabus topics and theoretical concepts.',
      color: 'border-l-4 border-l-secondary',
    },
    {
      sessionNum: 2,
      time: '10:45 AM – 12:15 PM',
      duration: '90m',
      title: 'Session 2: Handwritten Notes & Analysis',
      desc: 'Condense ideas into handwritten revision notes and literary quotations.',
      color: 'border-l-4 border-l-primary',
    },
    {
      sessionNum: 3,
      time: '02:00 PM – 03:15 PM',
      duration: '75m',
      title: 'Session 3: Secondary Subject / Prescribed Text',
      desc: 'Read prescribed drama, poems, or translated works.',
      color: 'border-l-4 border-l-terracotta',
    },
    {
      sessionNum: 4,
      time: '03:30 PM – 04:45 PM',
      duration: '75m',
      title: 'Session 4: Revision, Writing Practice & Recall',
      desc: 'Timed written answers, recall quizzes, or self-assessment worksheet.',
      color: 'border-l-4 border-l-accent',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* ---------------- A. WELCOME BANNER ---------------- */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white p-6 md:p-8 rounded-3xl shadow-soft-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-medium mb-2 backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>{formatFullDayDate(todayDateStr)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              Welcome back, {state.profile.displayName || 'Scholar'}!
            </h2>
            <p className="text-sm text-slate-200 mt-1 max-w-xl font-light">
              "Your next small effort brings you closer to exam success. One quest at a time."
            </p>
          </div>

          {/* Quick Streak & Target pill */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 shrink-0">
            <div className="text-center px-3 border-r border-white/15">
              <div className="flex items-center justify-center gap-1 text-orange-300 font-bold text-lg">
                <Flame className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span>{state.streak.currentStreak}</span>
              </div>
              <span className="text-[10px] text-slate-300">Day Streak</span>
            </div>
            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-bold text-lg">
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>+{todayXP}</span>
              </div>
              <span className="text-[10px] text-slate-300">XP Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- SPECIAL EXAM DAY BANNER IF APPLICABLE ---------------- */}
      {isExamDay && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-primary">
              🌟 Today is Examination Day: {nextExam?.subjectName}!
            </h3>
            <p className="text-xs text-charcoal mt-1 leading-relaxed">
              Forenoon (FN) Session. Relax your mind, trust your handwritten preparation, and write with confidence.
              No compulsory 5.5-hour study target today — take sufficient rest after the exam!
            </p>
          </div>
        </div>
      )}

      {/* ---------------- B & C: EXAM COUNTDOWN & XP CARDS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Examination Card */}
        <div className="card-parchment p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                Upcoming University Exam
              </span>
              <h3 className="text-lg font-serif font-bold text-primary mt-1">
                {nextExam ? nextExam.subjectName : 'All Examinations Conquered!'}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {nextExam?.date ? `${formatIndianDate(nextExam.date)} • Forenoon (FN) Session` : 'Dates TBA'}
              </p>
            </div>
            {countdown && (
              <div className="text-right shrink-0">
                <span className="text-2xl font-serif font-extrabold text-amber-700">
                  {countdown.days}
                </span>
                <span className="block text-[10px] font-semibold text-muted uppercase">
                  {countdown.days === 1 ? 'Day Left' : 'Days Left'}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECE7D8] flex items-center justify-between text-xs">
            <span className="text-muted">Kamban College Hall</span>
            <button
              onClick={() => onNavigate('planner')}
              className="text-secondary-dark hover:text-primary font-semibold flex items-center gap-1 transition-colors"
            >
              View Full Exam Timeline →
            </button>
          </div>
        </div>

        {/* XP Progress Card */}
        <div className="card-parchment p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                  Level {levelInfo.levelNumber} Quest Wallet
                </span>
                <h3 className="text-lg font-serif font-bold text-primary mt-0.5 flex items-center gap-2">
                  <span>{levelInfo.name}</span>
                  <span className="text-sm">{levelInfo.badge}</span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-extrabold text-primary">{totalXP}</span>
                <span className="text-xs text-muted"> / 1000 XP</span>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="mt-3 w-full bg-[#E8E3D5] rounded-full h-3 overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round((totalXP / 1000) * 100))}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="gold-gradient h-full rounded-full shadow-inner"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ECE7D8] flex items-center justify-between text-xs">
            <span className="text-muted font-light">
              {totalXP >= 1000
                ? '🏆 Semester Survivor achieved!'
                : `${1000 - totalXP} XP to Semester Survivor`}
            </span>
            <button
              onClick={() => onNavigate('xp')}
              className="text-accent-dark hover:text-primary font-semibold transition-colors"
            >
              Custom Rewards →
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- E. TODAY'S MISSIONS CHECKLIST ---------------- */}
      <div className="card-parchment p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg text-primary">Today's Study Missions</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#ECE7D8] text-muted">
                {completedTasks.length} of {todaysTasks.length} Done
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Check off tasks as you finish them. Each mission awards verified XP immediately!
            </p>
          </div>

          <button
            onClick={onOpenAddTask}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-medium transition-colors shadow-sm self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5 text-accent" />
            <span>Add Mission</span>
          </button>
        </div>

        {todaysTasks.length === 0 ? (
          <div className="text-center py-8 px-4 bg-[#FAF9F5] rounded-2xl border border-dashed border-[#ECE7D8]">
            <p className="text-sm font-medium text-charcoal">No study missions scheduled for today yet.</p>
            <p className="text-xs text-muted mt-1">
              "Every great academic comeback starts with one completed task."
            </p>
            <button
              onClick={onOpenAddTask}
              className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
            >
              Add Your First Mission
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todaysTasks.map((task) => {
              const subject = state.subjects.find((s) => s.id === task.subjectId);
              const isCompleted = task.status === 'completed';

              return (
                <motion.div
                  key={task.id}
                  layout
                  className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isCompleted
                      ? 'bg-[#FAF8F2] border-[#E8E2D2] opacity-80'
                      : 'bg-white border-[#ECE7D8] hover:border-secondary shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-secondary border-secondary text-white'
                          : 'border-muted hover:border-primary bg-white'
                      }`}
                      title={isCompleted ? 'Mark incomplete' : 'Mark complete & earn XP'}
                    >
                      {isCompleted && <Check className="w-4 h-4 stroke-[3px]" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold ${
                            isCompleted ? 'line-through text-muted' : 'text-primary'
                          }`}
                        >
                          {task.title}
                        </span>

                        {/* Priority Badge */}
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            task.priority === 'A'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Priority {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-muted mt-0.5 line-clamp-1">{task.description}</p>
                      )}

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted">
                        <span
                          className="font-medium px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: subject?.badgeBg || '#ECE7D8',
                            color: '#1B2634',
                          }}
                        >
                          {subject?.name || 'BA English'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.estimatedMinutes} mins
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* XP Reward & Timer launcher */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-accent fill-accent" />
                      +{task.xpValue} XP
                    </span>

                    {!isCompleted && (
                      <button
                        onClick={() => onOpenTimer(task.id)}
                        className="p-1.5 rounded-xl hover:bg-[#FAF9F5] border border-transparent hover:border-[#ECE7D8] text-muted hover:text-primary transition-colors"
                        title="Focus with timer"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------------- D. TODAY'S STANDARD STUDY TIMETABLE ---------------- */}
      <div className="card-parchment p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary">Daily Study Routine</h3>
            <p className="text-xs text-muted">
              Scheduled 4 focused sessions (330 min / 5.5 hours) with mandatory leisure & breaks.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>After 04:45 PM: Free Time</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {routineBlocks.map((block) => (
            <div
              key={block.sessionNum}
              className={`p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] ${block.color} flex flex-col justify-between space-y-2`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Session {block.sessionNum}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#ECE7D8]">
                    {block.duration}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-primary mt-1">{block.title}</h4>
                <p className="text-[11px] text-muted mt-1 line-clamp-2">{block.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#ECE7D8] text-[10px] text-charcoal font-semibold">
                ⏰ {block.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- SMART SCHEDULING & BREAK REMINDERS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Smart Energy Curve */}
        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary">Smart Energy Allocation</h4>
              <p className="text-[10px] text-muted">Peak focus matched to time of day</p>
            </div>
          </div>
          <div className="space-y-1.5 text-[11px] bg-[#FAF9F5] p-2.5 rounded-xl border border-[#ECE7D8]">
            <div className="flex items-center justify-between">
              <span className="text-muted">09:00 - 10:30 AM</span>
              <span className="font-semibold text-primary">🧠 Deep Work (High)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">10:45 - 12:15 PM</span>
              <span className="font-semibold text-secondary-dark">✍️ Handwritten Notes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">02:00 - 03:15 PM</span>
              <span className="font-semibold text-terracotta-dark">📖 Prescribed Literature</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">03:30 - 04:45 PM</span>
              <span className="font-semibold text-accent-dark">📝 Practice & Quizzes</span>
            </div>
          </div>
        </div>

        {/* Spaced Repetition Cadence */}
        <div className="card-parchment p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              🌱
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary">Spaced Retention Cadence</h4>
              <p className="text-[10px] text-muted">3-stage memory consolidation</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1 p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] text-center">
            <div className="flex-1">
              <span className="text-[9px] font-bold text-muted uppercase block">Day 1</span>
              <span className="text-xs font-bold text-primary">Read Text</span>
            </div>
            <span className="text-muted">→</span>
            <div className="flex-1">
              <span className="text-[9px] font-bold text-muted uppercase block">Day 3</span>
              <span className="text-xs font-bold text-secondary-dark">Notes Recall</span>
            </div>
            <span className="text-muted">→</span>
            <div className="flex-1">
              <span className="text-[9px] font-bold text-muted uppercase block">Day 7</span>
              <span className="text-xs font-bold text-emerald-700">Timed Essay</span>
            </div>
          </div>
          <p className="text-[10px] text-muted italic mt-2">
            "Reviewing on Day 3 and Day 7 locks literary quotations into long-term memory."
          </p>
        </div>

        {/* Break & Hydration Reminder */}
        <div className="card-parchment p-4 flex flex-col justify-between bg-gradient-to-br from-white to-[#FAF8F2]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs">
              ☕
            </div>
            <div>
              <h4 className="text-xs font-bold text-primary">Mindful Rest Breaks</h4>
              <p className="text-[10px] text-muted">Protecting your focus energy</p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
            Take your 15-minute breaks completely away from screens. Hydrate, stretch, and sip your tea. Rest is where consolidation happens!
          </div>
          <div className="mt-2 text-right">
            <span className="text-[10px] font-semibold text-secondary-dark">
              Break: 10:30 AM & 03:15 PM ✨
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- F & G: DAILY PROGRESS & QUICK ACTIONS ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Progress summary */}
        <div className="card-parchment p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-base text-primary">Today's Target Progress</h4>
            <p className="text-xs text-muted mt-0.5">Daily target: 5.5 hours (330 min)</p>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">Target Completion</span>
                  <span className="font-bold text-primary">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E8E3D5] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8]">
                  <span className="text-muted text-[10px] block">Study Completed</span>
                  <span className="font-bold text-primary text-sm">
                    {Math.floor(completedMinutes / 60)}h {completedMinutes % 60}m
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8]">
                  <span className="text-muted text-[10px] block">Missions Done</span>
                  <span className="font-bold text-primary text-sm">
                    {completedTasks.length} / {todaysTasks.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted italic mt-4">
            Missed tasks are never automatically erased; they remain in your schedule to be rescheduled.
          </p>
        </div>

        {/* H. Quick Actions Panel */}
        <div className="card-parchment p-5 lg:col-span-2">
          <h4 className="font-serif font-bold text-base text-primary mb-3">Quick Academic Actions</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onOpenTimer()}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-secondary transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-secondary/15 text-secondary-dark flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">Focus Timer</h5>
                <p className="text-[10px] text-muted mt-0.5">25m or 50m block</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('questions')}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-primary transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">Question Bank</h5>
                <p className="text-[10px] text-muted mt-0.5">Priority A syllabus questions</p>
              </div>
            </button>

            <button
              onClick={onOpenMockExam}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-accent transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-accent/20 text-accent-dark flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">Take Mock Exam</h5>
                <p className="text-[10px] text-muted mt-0.5">+50 XP reward</p>
              </div>
            </button>

            <button
              onClick={onOpenAddTask}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-primary transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">Add Mission</h5>
                <p className="text-[10px] text-muted mt-0.5">Custom study task</p>
              </div>
            </button>

            <button
              onClick={onOpenShare}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-emerald-400 transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Share2 className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">WhatsApp Report</h5>
                <p className="text-[10px] text-muted mt-0.5">Send daily summary</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-white border border-[#ECE7D8] hover:border-slate-400 transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-primary">Syllabus Editor</h5>
                <p className="text-[10px] text-muted mt-0.5">Paste or edit units</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

