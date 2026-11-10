import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Question, QuestionPriority, QuestionType, QuestionSource, QuestionPrepStatus } from '../../types';
import { AnswerWorksheetModal } from './AnswerWorksheetModal';
import {
  BookOpen,
  Search,
  Plus,
  Sparkles,
  CheckCircle,
  FileText,
  Trash2,
  Edit3,
  HelpCircle,
  Check,
  Tag,
  AlertCircle,
  Bookmark,
} from 'lucide-react';

interface QuestionBankProps {
  onOpenSyllabusManager?: () => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({ onOpenSyllabusManager }) => {
  const {
    state,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    markQuestionNotesCompleted,
    markQuestionAnswerPractised,
    updateSubject,
  } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-ww');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Worksheet modal state
  const [worksheetQuestion, setWorksheetQuestion] = useState<Question | null>(null);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);

  // Add Question modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newType, setNewType] = useState<QuestionType>('Essay');
  const [newPriority, setNewPriority] = useState<QuestionPriority>('A');
  const [newUnit, setNewUnit] = useState<number>(1);
  const [newSource, setNewSource] = useState<QuestionSource>('Syllabus-based suggestion');
  const [newExamYear, setNewExamYear] = useState<string>('');
  const [newSourceRef, setNewSourceRef] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');

  // Selected subject object
  const currentSubject = state.subjects.find((s) => s.id === selectedSubjectId);

  // Filter questions
  const filteredQuestions = state.questions.filter((q) => {
    if (q.subjectId !== selectedSubjectId) return false;
    if (searchQuery && !q.questionText.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedPriority !== 'all' && q.priority !== selectedPriority) return false;
    if (selectedStatus !== 'all' && q.preparationStatus !== selectedStatus) return false;
    return true;
  });

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    addQuestion({
      subjectId: selectedSubjectId,
      unit: newUnit,
      questionText: newQuestionText.trim(),
      type: newType,
      priority: newPriority,
      preparationStatus: 'Not Started',
      sourceClassification: newSource,
      examinationYears: newExamYear ? [parseInt(newExamYear, 10)] : undefined,
      sourceReference: newSourceRef.trim() || undefined,
      personalNotes: newNotes.trim() || undefined,
    });

    setNewQuestionText('');
    setNewSourceRef('');
    setNewNotes('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">Important Question Bank</h2>
          <p className="text-xs text-muted mt-0.5">
            Subject-wise high-priority questions, answer worksheets, and source verification.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-accent" />
          <span>Add Question</span>
        </button>
      </div>

      {/* Source Integrity Notice */}
      <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] flex items-start gap-3 text-xs text-charcoal">
        <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-primary">Academic Source Integrity: </span>
          Initial questions are syllabus-based practice suggestions. A question is only labeled as a{' '}
          <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Verified PYQ
          </span>{' '}
          when an actual previous examination year and paper reference are attached.
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {state.subjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          const count = state.questions.filter((q) => q.subjectId === sub.id).length;

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-muted hover:text-charcoal border-[#ECE7D8] hover:bg-[#FAF8F2]'
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF9F5] text-muted border border-[#ECE7D8]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editable Novel Title field for Women's Writing */}
      {selectedSubjectId === 'sub-ww' && (
        <div className="p-4 rounded-2xl bg-white border border-[#ECE7D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-secondary" />
            <div>
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                Prescribed Novel in College Syllabus
              </span>
              <span className="text-xs font-bold text-primary">
                {currentSubject?.prescribedNovelOrText || 'Title pending confirmation from college'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const newTitle = prompt(
                'Enter the actual prescribed novel title from your college syllabus:',
                currentSubject?.prescribedNovelOrText || ''
              );
              if (newTitle !== null) {
                updateSubject('sub-ww', { prescribedNovelOrText: newTitle });
              }
            }}
            className="text-xs font-semibold text-secondary-dark hover:text-primary px-3 py-1.5 rounded-xl border border-secondary/30 bg-secondary/10 transition-colors self-start sm:self-auto"
          >
            Edit Novel Title ✍️
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card-parchment p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search questions by text or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none placeholder:text-muted"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Priority filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs p-1.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] text-charcoal font-medium"
          >
            <option value="all">All Priorities</option>
            <option value="A">Priority A</option>
            <option value="B">Priority B</option>
            <option value="C">Priority C</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs p-1.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] text-charcoal font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="Studying">Studying</option>
            <option value="Notes Completed">Notes Completed</option>
            <option value="Answer Practised">Answer Practised</option>
            <option value="Revised">Revised</option>
          </select>
        </div>
      </div>

      {/* Question list or empty state */}
      {selectedSubjectId === 'sub-ve' && filteredQuestions.length === 0 ? (
        <div className="card-parchment p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary-dark flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-primary">Value Education Syllabus Pending</h3>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            "Your Value Education syllabus has not been added yet. Once received from Kamban College, add your units and questions to generate your preparation checklist."
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-soft"
            >
              Add Value Education Question
            </button>
            {onOpenSyllabusManager && (
              <button
                onClick={onOpenSyllabusManager}
                className="px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] text-xs font-semibold hover:bg-white text-charcoal"
              >
                Paste Syllabus Units
              </button>
            )}
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="card-parchment p-8 text-center text-xs text-muted">
          No questions matched your search filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isNotesDone = q.preparationStatus === 'Notes Completed';
            const isAnswerDone = q.preparationStatus === 'Answer Practised';

            return (
              <div
                key={q.id}
                className="card-parchment p-4 transition-all hover:border-secondary shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      {/* Priority chip */}
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          q.priority === 'A'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Priority {q.priority}
                      </span>

                      {/* Question type */}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        {q.type}
                      </span>

                      {/* Unit number */}
                      {q.unit && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] text-muted border border-[#ECE7D8]">
                          Unit {q.unit}
                        </span>
                      )}

                      {/* Source Classification Badge */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          q.sourceClassification === 'Verified PYQ'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : q.sourceClassification === 'Previous-year question – unverified'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {q.sourceClassification}
                        {q.examinationYears && ` (${q.examinationYears.join(', ')})`}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-primary leading-snug">
                      {q.questionText}
                    </h4>

                    {q.personalNotes && (
                      <p className="text-[11px] text-muted mt-1 leading-relaxed bg-[#FAF9F5] p-2 rounded-xl border border-[#ECE7D8]">
                        💡 {q.personalNotes}
                      </p>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="shrink-0">
                    <select
                      value={q.preparationStatus}
                      onChange={(e) =>
                        updateQuestion(q.id, {
                          preparationStatus: e.target.value as QuestionPrepStatus,
                        })
                      }
                      className="text-xs p-1.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] text-charcoal font-semibold"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Studying">Studying</option>
                      <option value="Notes Completed">Notes Completed</option>
                      <option value="Answer Practised">Answer Practised</option>
                      <option value="Revised">Revised</option>
                    </select>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-2 border-t border-[#ECE7D8] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Mark Notes Completed button */}
                    <button
                      onClick={() => markQuestionNotesCompleted(q.id)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border flex items-center gap-1 transition-all ${
                        isNotesDone
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white hover:bg-[#FAF9F5] border-[#ECE7D8] text-charcoal'
                      }`}
                    >
                      <Check className="w-3 h-3 text-secondary" />
                      <span>{isNotesDone ? 'Notes Done (+20 XP)' : 'Mark Notes Done (+20 XP)'}</span>
                    </button>

                    {/* Open Answer Worksheet */}
                    <button
                      onClick={() => {
                        setWorksheetQuestion(q);
                        setIsWorksheetOpen(true);
                      }}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 flex items-center gap-1 transition-all"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Answer Worksheet (+10 XP)</span>
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => {
                      if (confirm(`Remove this question from question bank?`)) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="p-1 rounded-lg hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Answer Worksheet Modal */}
      <AnswerWorksheetModal
        question={worksheetQuestion}
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
      />

      {/* Add Question Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-[#ECE7D8] bg-[#FAF8F2] flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-primary">Add Question to Bank</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                >
                  {state.subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Question Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Critically evaluate the tragic flaw in..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-charcoal mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as QuestionType)}
                    className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                  >
                    <option value="Essay">Essay</option>
                    <option value="Long answer">Long answer</option>
                    <option value="Short answer">Short answer</option>
                    <option value="Definition">Definition</option>
                    <option value="Comparison">Comparison</option>
                    <option value="Critical analysis">Critical analysis</option>
                    <option value="Character analysis">Character analysis</option>
                    <option value="Literary interpretation">Literary interpretation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-charcoal mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as QuestionPriority)}
                    className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                  >
                    <option value="A">Priority A</option>
                    <option value="B">Priority B</option>
                    <option value="C">Priority C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-charcoal mb-1">Unit Number</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newUnit}
                    onChange={(e) => setNewUnit(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Source Classification</label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value as QuestionSource)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                >
                  <option value="Syllabus-based suggestion">Syllabus-based suggestion</option>
                  <option value="Previous-year question – unverified">Previous-year question – unverified</option>
                  <option value="Verified PYQ">Verified PYQ (requires year & paper details)</option>
                </select>
              </div>

              {newSource === 'Verified PYQ' && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 mb-1">Examination Year</label>
                    <input
                      type="number"
                      placeholder="e.g. 2024"
                      value={newExamYear}
                      onChange={(e) => setNewExamYear(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 mb-1">Paper Reference</label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2024 Q.14"
                      value={newSourceRef}
                      onChange={(e) => setNewSourceRef(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Personal Notes / Quotations</label>
                <textarea
                  rows={2}
                  placeholder="Key arguments, lines to cite, or chapter reference..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#ECE7D8] text-xs font-medium text-muted hover:bg-[#FAF8F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light shadow-soft"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

