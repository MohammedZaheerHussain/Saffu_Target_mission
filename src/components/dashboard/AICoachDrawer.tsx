import React, { useState } from 'react';
import { aiExaminerAnalysis, catchupStrategySteps } from '../../data/aiCoachData';
import { useApp } from '../../contexts/AppContext';
import {
  Sparkles,
  X,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Bookmark,
  Target,
  Flame,
} from 'lucide-react';

interface AICoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId?: string;
}

export const AICoachDrawer: React.FC<AICoachDrawerProps> = ({ isOpen, onClose, defaultSubjectId }) => {
  const { state } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(defaultSubjectId || 'sub-ww');
  const [activeTab, setActiveTab] = useState<'examiner' | 'quotes' | 'catchup'>('examiner');
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAnalysis = aiExaminerAnalysis[selectedSubjectId] || aiExaminerAnalysis['sub-ww'];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(id);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-primary/45 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#ECE7D8] bg-gradient-to-r from-[#FAF6EC] to-[#FFFBF0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 border border-amber-300/60 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base md:text-lg text-primary">
                  AI Literary Examiner & Strategy Coach
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-dark border border-accent/40">
                  Thiruvalluvar Edition
                </span>
              </div>
              <p className="text-xs text-muted">
                Exam-room psychological scoring secrets, golden quotations & triage tactics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Selector Tabs */}
        <div className="p-3 border-b border-[#ECE7D8] bg-[#FAF8F2] flex items-center gap-2 overflow-x-auto">
          {Object.values(aiExaminerAnalysis).map((sub) => {
            const isSelected = sub.subjectId === selectedSubjectId;
            return (
              <button
                key={sub.subjectId}
                onClick={() => setSelectedSubjectId(sub.subjectId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-muted hover:text-charcoal border-[#ECE7D8]'
                }`}
              >
                {sub.subjectName}
              </button>
            );
          })}
        </div>

        {/* Analysis Category Tabs */}
        <div className="px-5 pt-3 bg-white flex gap-2 border-b border-[#ECE7D8]">
          <button
            onClick={() => setActiveTab('examiner')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'examiner'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-accent" />
            <span>Examiner's Mindset</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'quotes'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-secondary" />
            <span>Golden Quotes Arsenal</span>
          </button>

          <button
            onClick={() => setActiveTab('catchup')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'catchup'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Zero-to-Hero Catchup Protocol</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 bg-[#FAF9F5]">
          {/* 1. EXAMINER MINDSET */}
          {activeTab === 'examiner' && (
            <div className="space-y-4">
              {/* Insight banner */}
              <div className="card-clay-amber p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                  🎯 What University Evaluators Grade On
                </span>
                <p className="text-xs text-[#2A2418] leading-relaxed font-medium">
                  {currentAnalysis.examinerInsight}
                </p>
              </div>

              {/* Scoring Formula */}
              <div className="card-parchment p-4 space-y-2">
                <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-secondary" />
                  <span>The 10-Mark Winning Answer Formula:</span>
                </h4>
                <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] font-mono text-xs text-primary font-semibold text-center">
                  {currentAnalysis.scoringFormula}
                </div>
                <p className="text-[11px] text-muted">
                  Follow this 4-step structure in Section C essays to guarantee distinction marks.
                </p>
              </div>

              {/* High-Yield Predicted Themes */}
              <div className="card-parchment p-4 space-y-2.5">
                <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>High-Yield Priority Concepts for {currentAnalysis.subjectName}:</span>
                </h4>
                <div className="space-y-1.5">
                  {currentAnalysis.highYieldThemes.map((theme, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] flex items-start gap-2 text-xs text-charcoal"
                    >
                      <span className="w-5 h-5 rounded-md bg-secondary/15 text-secondary-dark font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Pitfalls to Avoid */}
              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
                <h4 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Critical Pitfalls to Avoid in the Exam Hall:</span>
                </h4>
                <ul className="space-y-1 text-xs text-red-800 list-disc list-inside">
                  {currentAnalysis.commonPitfallsToAvoid.map((pit, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {pit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 2. GOLDEN QUOTES */}
          {activeTab === 'quotes' && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                💡 <strong>Exam Memory Rule:</strong> Citing just <strong>2 exact quotations</strong> per essay boosts answer credibility from an average 5/10 to a distinction 8.5/10!
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentAnalysis.goldenQuotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="card-parchment p-4 space-y-2 border-l-4 border-l-accent"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                          {q.author} • <em>{q.work}</em>
                        </span>
                        <blockquote className="font-serif italic font-bold text-sm text-primary mt-1">
                          "{q.quote}"
                        </blockquote>
                      </div>
                      <button
                        onClick={() => handleCopy(`"${q.quote}" — ${q.author}`, `q-${idx}`)}
                        className="p-1.5 rounded-lg border border-[#ECE7D8] hover:bg-[#FAF9F5] text-muted hover:text-charcoal shrink-0 transition-colors"
                        title="Copy Quote"
                      >
                        {copiedQuote === `q-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-charcoal/80 bg-[#FAF9F5] p-2.5 rounded-xl border border-[#ECE7D8] leading-relaxed">
                      <strong>How to use in your essay:</strong> {q.analysisContext}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ZERO-TO-HERO CATCHUP PROTOCOL */}
          {activeTab === 'catchup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white space-y-1">
                <h4 className="font-serif font-bold text-base">
                  "Untouched Syllabus? Here is the Exact Comeback Protocol."
                </h4>
                <p className="text-xs text-slate-200 font-light leading-relaxed">
                  You are not late. Literature is conceptual. Master the top high-yield essays, write out active notes, and let consistency do the rest.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {catchupStrategySteps.map((step) => (
                  <div key={step.step} className="card-clay p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-dark border border-accent/40">
                        {step.badge}
                      </span>
                      <span className="text-[10px] font-bold text-muted uppercase">Step {step.step}</span>
                    </div>

                    <h5 className="font-serif font-bold text-sm text-primary">{step.title}</h5>
                    <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ECE7D8] bg-white flex items-center justify-between">
          <span className="text-[11px] text-muted">
            Crafted for BA English Literature • Kamban College 2026
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light shadow-soft transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
