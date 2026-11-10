import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  formatIndianDate,
  formatFullDayDate,
  shiftDays,
  diffDays,
  calculateExamCountdown,
  CHALLENGE_START_DATE,
  CHALLENGE_END_DATE,
} from '../../utils/dateUtils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  PlusCircle,
  Check,
  AlertCircle,
  Sparkles,
  Trash2,
  MoveRight,
  CalendarDays,
  ListFilter,
  Milestone,
} from 'lucide-react';

interface StudyPlannerProps {
  onOpenAddTask: (defaultDate?: string) => void;
  onOpenTimer: (taskId?: string) => void;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ onOpenAddTask, onOpenTimer }) => {
  const {
    state,
    todayDateStr,
    toggleTaskCompletion,
    deleteTask,
    rescheduleTask,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(todayDateStr);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'timeline'>('daily');

  // Selected date tasks
  const currentTasks = state.tasks.filter((t) => t.scheduledDate === selectedDate);

  // Past incomplete tasks (prior to selected date)
  const pastIncompleteTasks = state.tasks.filter(
    (t) => t.scheduledDate < selectedDate && t.status !== 'completed'
  );

  // Determine current phase info
  const getPhaseInfo = (dateStr: string) => {
    if (dateStr < '2026-11-11') return { name: 'Orientation & Planning Setup', priority: 'Schedule Walkthrough' };
    if (dateStr <= '2026-11-14') return { name: 'Phase 1: Women\'s Writing Priority', priority: 'Prescribed Texts, Notes & Key Questions' };
    if (dateStr <= '2026-11-17') return { name: 'Phase 2: Women\'s Writing + Folk Lit & IWT', priority: 'Descriptive Answers & Light Literary Forms' };
    if (dateStr <= '2026-11-19') return { name: 'Phase 3: Mock Exam & Final Revision', priority: 'Full 3-hr Mock, High-Yield Quotes, Hall Prep' };
    if (dateStr === '2026-11-20') return { name: 'EXAM DAY: Women\'s Writing (FN)', priority: 'University Hall Session & Afternoon Rest' };
    if (dateStr <= '2026-11-22') return { name: 'Phase 4: Introduction to Folk Literature', priority: 'Propp, Dundes, Keats, Hayavadana' };
    if (dateStr === '2026-11-23') return { name: 'EXAM DAY: Intro to Folk Literature (FN)', priority: 'University Hall Session & Rest' };
    if (dateStr <= '2026-11-27') return { name: 'Phase 5: Indian Writing in Translation', priority: 'Bharati, Silappathikaaram, Phaniyamma, Literary Forms' };
    if (dateStr === '2026-11-28') return { name: 'EXAM DAY: Indian Writing in Translation (FN)', priority: 'University Hall Session & Rest' };
    if (dateStr <= '2026-11-30') return { name: 'Phase 6: Literary Forms Dedicated Sprint', priority: 'Genres, Terms Glossary, 3-hr Full Mock' };
    if (dateStr === '2026-12-01') return { name: 'EXAM DAY: Literary Forms (FN)', priority: 'University Hall Session & Milestone Celebration' };
    if (dateStr <= '2026-12-13') return { name: 'Phase 7: Value Education & Academic Viva', priority: 'Units Checklist, Notes, Project Viva Reserve (1h)' };
    if (dateStr === '2026-12-14') return { name: 'GRAND FINALE EXAM: Value Education (FN)', priority: 'Semester Survivor Victory!' };
    return { name: 'Extended Academic Quest', priority: 'Semester Success' };
  };

  const phase = getPhaseInfo(selectedDate);

  // Generate 7 days for weekly view around selectedDate
  const getWeekDates = (baseDate: string) => {
    const dates: string[] = [];
    for (let i = -3; i <= 3; i++) {
      dates.push(shiftDays(baseDate, i));
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">Academic Study Planner</h2>
          <p className="text-xs text-muted mt-0.5">
            Structured timetable from 10 Nov 2026 to 14 Dec 2026. Prioritise closest examinations.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[#F0EAD6]/60 p-1 rounded-2xl border border-[#E5E0D0] text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode('daily')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              viewMode === 'daily' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            Daily Plan
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              viewMode === 'weekly' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            7-Day Week
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`py-1.5 px-3 rounded-xl transition-all ${
              viewMode === 'timeline' ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-charcoal'
            }`}
          >
            Exam Timeline
          </button>
        </div>
      </div>

      {/* ---------------- DAILY VIEW ---------------- */}
      {viewMode === 'daily' && (
        <div className="space-y-5">
          {/* Date Navigator Bar */}
          <div className="card-parchment p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDate(shiftDays(selectedDate, -1))}
                className="w-8 h-8 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EAD6] border border-[#ECE7D8] flex items-center justify-center text-charcoal transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedDate(todayDateStr)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                  selectedDate === todayDateStr
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-[#FAF9F5] text-charcoal border-[#ECE7D8] hover:bg-white'
                }`}
              >
                Today
              </button>

              <button
                onClick={() => setSelectedDate(shiftDays(selectedDate, 1))}
                className="w-8 h-8 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EAD6] border border-[#ECE7D8] flex items-center justify-center text-charcoal transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="ml-2">
                <span className="text-sm font-serif font-bold text-primary block">
                  {formatFullDayDate(selectedDate)}
                </span>
                <span className="text-[10px] text-muted">
                  {diffDays(todayDateStr, selectedDate) === 0
                    ? "Today's Schedule"
                    : diffDays(todayDateStr, selectedDate) > 0
                    ? `In ${diffDays(todayDateStr, selectedDate)} days`
                    : `${Math.abs(diffDays(todayDateStr, selectedDate))} days ago`}
                </span>
              </div>
            </div>

            {/* Date picker input */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary font-medium"
              />
              <button
                onClick={() => onOpenAddTask(selectedDate)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light shadow-sm transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-accent" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Phase context banner */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                <Milestone className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary">{phase.name}</h4>
                <p className="text-[11px] text-muted mt-0.5">{phase.priority}</p>
              </div>
            </div>
          </div>

          {/* Overdue / Past Incomplete Tasks notification & reschedule */}
          {pastIncompleteTasks.length > 0 && selectedDate === todayDateStr && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold text-amber-900">
                    {pastIncompleteTasks.length} Incomplete Mission{pastIncompleteTasks.length > 1 ? 's' : ''} from Previous Days
                  </h4>
                </div>
                <button
                  onClick={() => {
                    pastIncompleteTasks.forEach((t) => rescheduleTask(t.id, todayDateStr));
                  }}
                  className="text-[11px] font-bold text-amber-800 bg-amber-200/80 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Reschedule All to Today →
                </button>
              </div>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                Semester Survival rule: Incomplete tasks never disappear. You can reschedule them to today or any future date anytime.
              </p>
            </div>
          )}

          {/* Tasks for the selected date */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-primary">
              Missions for {formatIndianDate(selectedDate)}
            </h3>

            {currentTasks.length === 0 ? (
              <div className="card-parchment p-8 text-center">
                <p className="text-sm font-medium text-charcoal">No tasks scheduled for this day.</p>
                <p className="text-xs text-muted mt-1">
                  Click "Add Task" to schedule focused missions or revision sessions.
                </p>
                <button
                  onClick={() => onOpenAddTask(selectedDate)}
                  className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-soft"
                >
                  Schedule Mission for this Date
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentTasks.map((task) => {
                  const subject = state.subjects.find((s) => s.id === task.subjectId);
                  const isCompleted = task.status === 'completed';

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCompleted
                          ? 'bg-[#FAF8F2] border-[#E8E2D2] opacity-85'
                          : 'bg-white border-[#ECE7D8] shadow-sm hover:border-secondary'
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
                        >
                          {isCompleted && <Check className="w-4 h-4 stroke-[3px]" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-xs font-bold ${
                                isCompleted ? 'line-through text-muted' : 'text-primary'
                              }`}
                            >
                              {task.title}
                            </span>
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
                            <p className="text-[11px] text-muted mt-1 leading-relaxed">
                              {task.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted flex-wrap">
                            <span
                              className="font-medium px-2 py-0.5 rounded-md"
                              style={{
                                backgroundColor: subject?.badgeBg || '#ECE7D8',
                                color: '#1B2634',
                              }}
                            >
                              {subject?.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {task.estimatedMinutes} mins
                            </span>
                            {task.sessionNumber && (
                              <span className="px-1.5 py-0.5 rounded bg-[#FAF9F5] border border-[#ECE7D8] font-mono text-[10px]">
                                Session {task.sessionNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
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
                            title="Start Timer"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            const newDate = prompt('Reschedule mission to (YYYY-MM-DD):', selectedDate);
                            if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
                              rescheduleTask(task.id, newDate);
                            }
                          }}
                          className="p-1.5 rounded-xl hover:bg-[#FAF9F5] border border-transparent hover:border-[#ECE7D8] text-muted hover:text-primary transition-colors"
                          title="Reschedule"
                        >
                          <MoveRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete mission "${task.title}"?`)) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-1.5 rounded-xl hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- WEEKLY VIEW ---------------- */}
      {viewMode === 'weekly' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between card-parchment p-3 text-xs">
            <button
              onClick={() => setSelectedDate(shiftDays(selectedDate, -7))}
              className="flex items-center gap-1 font-bold text-primary hover:text-secondary"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Week
            </button>
            <span className="font-serif font-bold text-sm text-primary">
              {formatIndianDate(weekDates[0])} — {formatIndianDate(weekDates[6])}
            </span>
            <button
              onClick={() => setSelectedDate(shiftDays(selectedDate, 7))}
              className="flex items-center gap-1 font-bold text-primary hover:text-secondary"
            >
              Next Week <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {weekDates.map((dateStr) => {
              const dayTasks = state.tasks.filter((t) => t.scheduledDate === dateStr);
              const completedCount = dayTasks.filter((t) => t.status === 'completed').length;
              const isToday = dateStr === todayDateStr;
              const isSelected = dateStr === selectedDate;

              return (
                <div
                  key={dateStr}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setViewMode('daily');
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? 'bg-white border-primary shadow-soft ring-2 ring-primary/10'
                      : isToday
                      ? 'bg-[#FAF8F2] border-secondary'
                      : 'bg-white border-[#ECE7D8] hover:border-[#D0C9B8]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">{formatIndianDate(dateStr).split(' ')[0]}</span>
                      <span className="text-[10px] text-muted">{formatFullDayDate(dateStr).split(',')[0].substring(0, 3)}</span>
                    </div>

                    <div className="mt-2 space-y-1">
                      {dayTasks.slice(0, 2).map((t) => (
                        <div
                          key={t.id}
                          className={`text-[10px] truncate p-1 rounded font-medium ${
                            t.status === 'completed'
                              ? 'bg-secondary/15 text-secondary-dark line-through'
                              : 'bg-[#FAF9F5] text-charcoal border border-[#ECE7D8]'
                          }`}
                        >
                          {t.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="text-[9px] text-muted font-semibold block">
                          +{dayTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#ECE7D8] flex items-center justify-between text-[10px] text-muted">
                    <span>
                      {completedCount}/{dayTasks.length} Done
                    </span>
                    {isToday && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                        Today
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- EXAMINATION TIMELINE VIEW ---------------- */}
      {viewMode === 'timeline' && (
        <div className="card-parchment p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary">University Examination Master Timeline</h3>
            <p className="text-xs text-muted mt-0.5">
              Kamban College of Arts and Science • Thiruvalluvar University Forenoon (FN) Schedule
            </p>
          </div>

          <div className="space-y-4">
            {state.exams.map((exam, idx) => {
              const countdown = calculateExamCountdown(exam.date);
              const subject = state.subjects.find((s) => s.id === exam.subjectId);

              return (
                <div
                  key={exam.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    countdown.isToday
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                      : countdown.isPast
                      ? 'bg-[#FAF8F2] border-[#E8E2D2] opacity-75'
                      : 'bg-white border-[#ECE7D8] shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0"
                      style={{
                        backgroundColor: subject?.badgeBg || '#ECE7D8',
                        color: subject?.textColor || '#1B2634',
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-primary">{exam.subjectName}</h4>
                        {exam.paperCode && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-mono text-muted">
                            {exam.paperCode}
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                          {exam.session} Session
                        </span>
                      </div>

                      <p className="text-xs text-muted mt-1">
                        {exam.date ? formatFullDayDate(exam.date) : 'Date To Be Announced (TBA)'}
                      </p>

                      {exam.notes && (
                        <p className="text-[11px] text-charcoal/80 mt-1 italic">{exam.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Countdown status */}
                  <div className="text-right shrink-0">
                    {exam.date ? (
                      <div>
                        <span
                          className={`text-lg font-serif font-extrabold ${
                            countdown.isPast
                              ? 'text-emerald-700'
                              : countdown.isToday
                              ? 'text-amber-700'
                              : 'text-primary'
                          }`}
                        >
                          {countdown.formatted}
                        </span>
                        <span className="block text-[10px] text-muted">Asia/Kolkata</span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
                        Date Pending College Notice
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

