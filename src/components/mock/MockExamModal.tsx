import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  Trophy,
  X,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Award,
} from 'lucide-react';

interface MockExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockExamModal: React.FC<MockExamModalProps> = ({ isOpen, onClose }) => {
  const { state, recordMockExam, recordRecallQuiz, todayDateStr } = useApp();

  const [activeMode, setActiveMode] = useState<'mock' | 'quiz'>('mock');

  // Mock exam state
  const [subjectId, setSubjectId] = useState(state.subjects[0]?.id || 'sub-ww');
  const [examTitle, setExamTitle] = useState('Full Length Semester Mock 1');
  const [totalMarks, setTotalMarks] = useState(75);
  const [marksObtained, setMarksObtained] = useState(58);
  const [timeSpent, setTimeSpent] = useState(135);
  const [weakTopics, setWeakTopics] = useState('');
  const [notes, setNotes] = useState('');

  // Recall quiz state
  const [quizSubjectId, setQuizSubjectId] = useState('sub-ww');
  const [quizScore, setQuizScore] = useState(4);

  if (!isOpen) return null;

  const percentage = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordMockExam({
      subjectId,
      title: examTitle.trim() || 'University Practice Mock',
      date: todayDateStr,
      totalMarks,
      marksObtained,
      percentage,
      timeSpentMinutes: timeSpent,
      weakTopics: weakTopics
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      notes: notes.trim(),
    });
    onClose();
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordRecallQuiz({
      subjectId: quizSubjectId,
      date: todayDateStr,
      score: quizScore,
      totalQuestions: 5,
      passed: quizScore >= 4,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#ECE7D8] bg-[#FAF8F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-primary">Academic Examination Practice</h3>
              <p className="text-[11px] text-muted">Timed mock papers, self-grading & recall quizzes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-4 border-b border-[#ECE7D8] bg-[#FAF9F5] flex gap-2">
          <button
            onClick={() => setActiveMode('mock')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'mock'
                ? 'bg-white text-primary shadow-sm border border-[#ECE7D8]'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            Full Mock Exam (+50 XP)
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'quiz'
                ? 'bg-white text-primary shadow-sm border border-[#ECE7D8]'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            5-Question Recall Quiz (+10 XP)
          </button>
        </div>

        {/* Mock Exam Form */}
        {activeMode === 'mock' ? (
          <form onSubmit={handleMockSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                {state.subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Mock Exam Title</label>
              <input
                type="text"
                required
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-muted mb-1">Total Marks</label>
                <input
                  type="number"
                  min={20}
                  max={100}
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted mb-1">Marks Obtained</label>
                <input
                  type="number"
                  min={0}
                  max={totalMarks}
                  value={marksObtained}
                  onChange={(e) => setMarksObtained(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted mb-1">Time Spent (min)</label>
                <input
                  type="number"
                  min={15}
                  max={240}
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>
            </div>

            {/* Calculated Percentage pill */}
            <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] flex items-center justify-between">
              <span className="text-xs font-semibold text-charcoal">Score Percentage:</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-serif text-base font-extrabold ${
                    percentage >= 70 ? 'text-emerald-700' : 'text-primary'
                  }`}
                >
                  {percentage}%
                </span>
                {percentage >= 70 && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Distinction (+20 Bonus XP!)
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Identified Weak Topics / Revision Needs (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Propp 31 functions, Virginia Woolf essay structure"
                value={weakTopics}
                onChange={(e) => setWeakTopics(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Self-Assessment Remarks</label>
              <textarea
                rows={2}
                placeholder="Time management was good in Part B, need more direct quotes in Part C..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-soft transition-all"
            >
              Save Mock Result & Award XP (+50 XP)
            </button>
          </form>
        ) : (
          <form onSubmit={handleQuizSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
              <select
                value={quizSubjectId}
                onChange={(e) => setQuizSubjectId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                {state.subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] space-y-3">
              <span className="text-xs font-bold text-primary block">
                Recall Quiz Score (out of 5 questions):
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setQuizScore(score)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      quizScore === score
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white text-charcoal border-[#ECE7D8] hover:bg-[#FAF8F2]'
                    }`}
                  >
                    {score}/5
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-muted leading-relaxed">
                {quizScore >= 4
                  ? '🎉 Qualifying Score! Scoring 4 or 5 awards +10 XP for rapid literary recall.'
                  : 'Score at least 4/5 to unlock the +10 XP bonus!'}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-soft transition-all"
            >
              Record Quiz & Complete
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

