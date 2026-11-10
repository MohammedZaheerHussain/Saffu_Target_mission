import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { StudyTask, QuestionPriority, TaskCategory } from '../../types';
import { X, Plus, Calendar, Clock, Sparkles } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, defaultDate }) => {
  const { state, addTask, todayDateStr } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(state.subjects[0]?.id || 'sub-ww');
  const [scheduledDate, setScheduledDate] = useState(defaultDate || todayDateStr);
  const [sessionNumber, setSessionNumber] = useState<1 | 2 | 3 | 4>(1);
  const [estimatedMinutes, setEstimatedMinutes] = useState(90);
  const [xpValue, setXpValue] = useState(10);
  const [priority, setPriority] = useState<QuestionPriority>('A');
  const [category, setCategory] = useState<TaskCategory>('session1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      subjectId,
      scheduledDate,
      sessionNumber,
      estimatedMinutes,
      xpValue,
      priority,
      category,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ECE7D8] bg-[#FAF8F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-amber-300 flex items-center justify-center">
              <Plus className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-primary">New Study Mission</h3>
              <p className="text-[11px] text-muted">Add a targeted mission to your preparation quest</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Mission Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Write 5-page answer on Virginia Woolf's Judith Shakespeare"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
            >
              {state.subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} {sub.isTBA ? '(TBA)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-muted" /> Scheduled Date
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Study Session</label>
              <select
                value={sessionNumber}
                onChange={(e) => {
                  const num = Number(e.target.value) as 1 | 2 | 3 | 4;
                  setSessionNumber(num);
                  setCategory(`session${num}` as TaskCategory);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              >
                <option value={1}>Session 1 (09:00 - 10:30)</option>
                <option value={2}>Session 2 (10:45 - 12:15)</option>
                <option value={3}>Session 3 (14:00 - 15:15)</option>
                <option value={4}>Session 4 (15:30 - 16:45)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted" /> Duration
              </label>
              <select
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={75}>75 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
                <option value={180}>180 min</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-accent" /> XP Reward
              </label>
              <select
                value={xpValue}
                onChange={(e) => setXpValue(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                <option value={10}>+10 XP (Standard)</option>
                <option value={20}>+20 XP (Notes)</option>
                <option value={50}>+50 XP (Mock Exam)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as QuestionPriority)}
                className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                <option value="A">Priority A (High)</option>
                <option value="B">Priority B (Med)</option>
                <option value="C">Priority C (Low)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Mission Notes / Outline (Optional)</label>
            <textarea
              rows={2}
              placeholder="e.g. Prescribed text page 45-60, cite minimum 3 quotations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[#ECE7D8] text-xs font-medium hover:bg-[#FAF8F2] text-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

