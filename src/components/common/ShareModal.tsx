import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { generateDailyReport, generateWeeklyReport, shareToWhatsApp, copyToClipboard } from '../../utils/shareUtils';
import { X, Share2, Copy, Check, MessageSquare } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { state } = useApp();
  const [tab, setTab] = useState<'daily' | 'weekly'>('daily');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = tab === 'daily' ? generateDailyReport(state) : generateWeeklyReport(state);

  const handleCopy = async () => {
    const ok = await copyToClipboard(reportText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = async () => {
    await shareToWhatsApp(reportText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ECE7D8] bg-[#FAF8F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center">
              <Share2 className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-primary">Share Progress Report</h3>
              <p className="text-[11px] text-muted">Keep your fiancé / study coach motivated & informed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-4 border-b border-[#ECE7D8] bg-[#FAF9F5] flex gap-2">
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              tab === 'daily'
                ? 'bg-white text-primary shadow-sm border border-[#ECE7D8]'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            Daily Quest Report
          </button>
          <button
            onClick={() => setTab('weekly')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              tab === 'weekly'
                ? 'bg-white text-primary shadow-sm border border-[#ECE7D8]'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            Weekly Milestone Digest
          </button>
        </div>

        {/* Report Preview */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-[#FAF9F5] rounded-xl m-4 border border-[#ECE7D8] whitespace-pre-wrap text-[#333] leading-relaxed">
          {reportText}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-[#ECE7D8] bg-white flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#ECE7D8] hover:bg-[#FAF8F2] text-charcoal text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-muted" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-soft transition-all transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Open WhatsApp Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

