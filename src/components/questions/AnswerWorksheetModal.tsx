import React, { useState } from 'react';
import { Question } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { X, Save, CheckCircle, FileText, Sparkles, BookOpen } from 'lucide-react';

interface AnswerWorksheetModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnswerWorksheetModal: React.FC<AnswerWorksheetModalProps> = ({ question, isOpen, onClose }) => {
  const { saveWrittenDraft, markQuestionAnswerPractised } = useApp();

  const [introduction, setIntroduction] = useState('');
  const [mainArguments, setMainArguments] = useState('');
  const [textualReferences, setTextualReferences] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [selfAssessmentScore, setSelfAssessmentScore] = useState<number>(8);

  // Sync state when question changes
  React.useEffect(() => {
    if (question?.writtenAnswerDraft) {
      setIntroduction(question.writtenAnswerDraft.introduction || '');
      setMainArguments(question.writtenAnswerDraft.mainArguments || '');
      setTextualReferences(question.writtenAnswerDraft.textualReferences || '');
      setConclusion(question.writtenAnswerDraft.conclusion || '');
      setSelfAssessmentScore(question.writtenAnswerDraft.selfAssessmentScore || 8);
    } else {
      setIntroduction('');
      setMainArguments('');
      setTextualReferences('');
      setConclusion('');
      setSelfAssessmentScore(8);
    }
  }, [question]);

  if (!isOpen || !question) return null;

  const handleSave = () => {
    saveWrittenDraft(question.id, {
      introduction,
      mainArguments,
      textualReferences,
      conclusion,
      selfAssessmentScore,
    });
    markQuestionAnswerPractised(question.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#ECE7D8] bg-[#FAF8F2] flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Descriptive Answer Worksheet
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-secondary/15 text-secondary-dark font-semibold">
                  {question.type}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm md:text-base text-primary mt-1">
                {question.questionText}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content sections */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Section 1: Introduction */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">1</span>
              Introduction & Thesis Statement
            </label>
            <textarea
              rows={3}
              placeholder="Author context, historical background, key theme, and thesis argument..."
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary focus:bg-white"
            />
          </div>

          {/* Section 2: Main Arguments */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">2</span>
              Main Body Arguments & Critical Perspectives
            </label>
            <textarea
              rows={4}
              placeholder="Structured paragraphs, feminist/folklore theories, structural progression..."
              value={mainArguments}
              onChange={(e) => setMainArguments(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary focus:bg-white"
            />
          </div>

          {/* Section 3: Textual References & Quotations */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">3</span>
              Key Literary Quotations & Textual Citations
            </label>
            <textarea
              rows={3}
              placeholder="Exact lines, stanza references, characters, or dialogue citations..."
              value={textualReferences}
              onChange={(e) => setTextualReferences(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary focus:bg-white"
            />
          </div>

          {/* Section 4: Conclusion */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">4</span>
              Conclusion & Literary Significance
            </label>
            <textarea
              rows={2}
              placeholder="Synthesis of ideas, enduring legacy, final evaluating thought..."
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary focus:bg-white"
            />
          </div>

          {/* Self-Assessment rating */}
          <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal">Self-Assessment Score (out of 10):</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={10}
                value={selfAssessmentScore}
                onChange={(e) => setSelfAssessmentScore(Number(e.target.value))}
                className="w-28 accent-primary cursor-pointer"
              />
              <span className="font-bold text-sm text-primary w-6 text-center">{selfAssessmentScore}/10</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#ECE7D8] bg-white flex items-center justify-between">
          <span className="text-[11px] text-muted flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Saving awards +10 XP for timed written practice!
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#ECE7D8] text-xs font-medium hover:bg-[#FAF8F2] text-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Award +10 XP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

