import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { XP_TARGET, XP_RATES } from '../../utils/xpUtils';
import { formatIndianDate } from '../../utils/dateUtils';
import {
  Award,
  Sparkles,
  Gift,
  Trophy,
  History,
  PlusCircle,
  CheckCircle,
  Lock,
  Edit2,
  Trash2,
  Check,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const XPRewardsView: React.FC = () => {
  const {
    state,
    totalXP,
    levelInfo,
    claimReward,
    updateReward,
    addCustomReward,
    addManualBonusXP,
  } = useApp();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'rewards' | 'achievements' | 'ledger' | 'coach'>('rewards');

  // Edit reward state
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editThreshold, setEditThreshold] = useState(100);

  // New reward state
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);
  const [newRewTitle, setNewRewTitle] = useState('');
  const [newRewDesc, setNewRewDesc] = useState('');
  const [newRewThreshold, setNewRewThreshold] = useState(350);

  // Manual bonus XP state
  const [bonusAmount, setBonusAmount] = useState(25);
  const [bonusReason, setBonusReason] = useState('Outstanding consistency & dedication!');

  const handleStartEdit = (r: typeof state.rewards[0]) => {
    setEditingRewardId(r.id);
    setEditTitle(r.title);
    setEditDesc(r.description);
    setEditThreshold(r.xpThreshold);
  };

  const handleSaveEdit = (rewardId: string) => {
    updateReward(rewardId, {
      title: editTitle.trim() || 'Milestone Reward',
      description: editDesc.trim() || 'Custom study reward',
      xpThreshold: editThreshold,
    });
    setEditingRewardId(null);
  };

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRewTitle.trim()) return;

    addCustomReward({
      title: newRewTitle.trim(),
      description: newRewDesc.trim() || 'Add your reward here.',
      xpThreshold: newRewThreshold,
    });

    setNewRewTitle('');
    setNewRewDesc('');
    setIsAddRewardOpen(false);
  };

  const handleAwardBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (bonusAmount <= 0) return;
    addManualBonusXP(bonusAmount, bonusReason);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* ---------------- 1. XP WALLET HERO ---------------- */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white p-6 md:p-8 rounded-3xl shadow-soft-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5 text-accent" />
              <span>Level {levelInfo.levelNumber} • {levelInfo.name}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{totalXP}</span>
              <span className="text-amber-300 font-sans text-xl font-normal">/ 1,000 XP Target</span>
            </h2>

            <p className="text-xs text-slate-200 mt-1 max-w-md font-light">
              Every completed session, handwritten note, and mock exam earns permanent XP. Reaching 1,000 XP crowns you as the Semester Survivor!
            </p>
          </div>

          {/* Large Level Badge graphic */}
          <div className="w-24 h-24 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex flex-col items-center justify-center shrink-0 shadow-lg">
            <span className="text-3xl">{levelInfo.badge}</span>
            <span className="text-[11px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
              Level {levelInfo.levelNumber}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Overall Quest Progress</span>
            <span>{Math.min(100, Math.round((totalXP / 1000) * 100))}% Completed</span>
          </div>
          <div className="w-full bg-white/15 rounded-full h-3.5 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.round((totalXP / 1000) * 100))}%` }}
              transition={{ duration: 0.8 }}
              className="gold-gradient h-full rounded-full shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* ---------------- NAVIGATION TABS ---------------- */}
      <div className="flex items-center gap-2 border-b border-[#ECE7D8] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rewards'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Gift className="w-4 h-4 text-accent" />
          <span>Custom Reward Centre</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'achievements'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Award className="w-4 h-4 text-accent" />
          <span>Achievements & Badges</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ledger'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <History className="w-4 h-4 text-secondary" />
          <span>XP Transaction Ledger ({state.xpLedger.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coach')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'coach'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Study Coach Bonus Tool</span>
        </button>
      </div>

      {/* ---------------- TAB 1: REWARDS CENTRE ---------------- */}
      {activeTab === 'rewards' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-primary">Custom Milestone Rewards</h3>
              <p className="text-xs text-muted">
                Editable rewards personalized with your study coach. Earn XP to unlock them!
              </p>
            </div>

            <button
              onClick={() => setIsAddRewardOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light shadow-sm transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4 text-accent" />
              <span>Add Custom Reward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.rewards
              .sort((a, b) => a.xpThreshold - b.xpThreshold)
              .map((reward) => {
                const isUnlocked = totalXP >= reward.xpThreshold;
                const isClaimed = reward.status === 'claimed';
                const isEditing = editingRewardId === reward.id;

                return (
                  <div
                    key={reward.id}
                    className={`card-parchment p-5 flex flex-col justify-between transition-all ${
                      isClaimed
                        ? 'bg-[#FAF8F2] border-emerald-300 opacity-90'
                        : isUnlocked
                        ? 'border-amber-400 bg-amber-50/20 shadow-soft'
                        : 'opacity-80'
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-muted mb-1">Title</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#ECE7D8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-muted mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-[#ECE7D8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-muted mb-1">XP Threshold</label>
                          <input
                            type="number"
                            value={editThreshold}
                            onChange={(e) => setEditThreshold(Number(e.target.value))}
                            className="w-full text-xs p-2 rounded-lg border border-[#ECE7D8]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(reward.id)}
                            className="flex-1 py-1.5 bg-primary text-white text-xs font-bold rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRewardId(null)}
                            className="px-3 py-1.5 border border-[#ECE7D8] text-xs rounded-lg text-muted"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent-dark border border-accent/40 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {reward.xpThreshold} XP
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleStartEdit(reward)}
                                className="p-1 text-muted hover:text-charcoal rounded hover:bg-[#FAF9F5]"
                                title="Edit Reward"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className="font-serif font-bold text-base text-primary">{reward.title}</h4>
                          <p className="text-xs text-muted mt-1 leading-relaxed">{reward.description}</p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#ECE7D8] flex items-center justify-between">
                          {isClaimed ? (
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4" /> Claimed! Enjoy!
                            </span>
                          ) : isUnlocked ? (
                            <button
                              onClick={() => claimReward(reward.id)}
                              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-soft transition-all transform active:scale-95 flex items-center justify-center gap-1.5"
                            >
                              <Gift className="w-4 h-4" />
                              <span>Claim Reward Now!</span>
                            </button>
                          ) : (
                            <div className="flex items-center justify-between w-full text-xs text-muted">
                              <span className="flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" /> Locked
                              </span>
                              <span>Need {reward.xpThreshold - totalXP} more XP</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: ACHIEVEMENTS & BADGES ---------------- */}
      {activeTab === 'achievements' && (
        <div className="space-y-5">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary">Quest Achievements</h3>
            <p className="text-xs text-muted">
              Unlock prestigious literary badges by maintaining study streaks, finishing notes, and taking mocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.achievements.map((ach) => {
              return (
                <div
                  key={ach.id}
                  className={`card-parchment p-4 flex items-start gap-3.5 transition-all ${
                    ach.unlocked
                      ? 'bg-white border-amber-300 shadow-sm'
                      : 'bg-[#FAF9F5] border-[#ECE7D8] opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      ach.unlocked
                        ? 'bg-amber-100 border border-amber-300 shadow-inner'
                        : 'bg-[#ECE7D8] grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-primary truncate">{ach.name}</h4>
                      {ach.unlocked ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted flex items-center gap-0.5">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-muted mt-0.5 leading-relaxed">{ach.description}</p>

                    {ach.thresholdXP && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-charcoal bg-[#FAF9F5] px-1.5 py-0.2 rounded border border-[#ECE7D8]">
                        Threshold: {ach.thresholdXP} XP
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: XP TRANSACTION LEDGER ---------------- */}
      {activeTab === 'ledger' && (
        <div className="card-parchment p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-primary">XP Transaction Ledger</h3>
              <p className="text-xs text-muted">Complete audit trail of earned and reversed study XP points.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
              Net Balance: {totalXP} XP
            </span>
          </div>

          {state.xpLedger.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted">
              No transactions recorded yet. Complete your first study mission to start earning XP!
            </div>
          ) : (
            <div className="divide-y divide-[#ECE7D8] max-h-96 overflow-y-auto">
              {[...state.xpLedger].reverse().map((tx) => (
                <div key={tx.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        tx.amount > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.amount > 0 ? '+' : '-'}
                    </div>

                    <div className="min-w-0">
                      <span className="font-semibold text-primary block truncate">{tx.reason}</span>
                      <span className="text-[10px] text-muted font-mono">
                        {new Date(tx.timestamp).toLocaleString()} • {tx.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-serif font-bold text-sm shrink-0 ${
                      tx.amount > 0 ? 'text-amber-700' : 'text-red-700'
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------- TAB 4: STUDY COACH BONUS TOOL ---------------- */}
      {activeTab === 'coach' && (
        <div className="card-parchment p-6 max-w-lg space-y-4">
          <div>
            <h3 className="font-serif font-bold text-base text-primary">Study Coach Bonus Tool</h3>
            <p className="text-xs text-muted mt-0.5">
              Award personalized encouragement bonus XP for special efforts, great handwritten notes, or high focus.
            </p>
          </div>

          <form onSubmit={handleAwardBonus} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Bonus XP Amount</label>
              <select
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                <option value={10}>+10 XP (Encouragement)</option>
                <option value={20}>+20 XP (Great Notes)</option>
                <option value={25}>+25 XP (Dedicated Focus Day)</option>
                <option value={50}>+50 XP (Major Breakthrough)</option>
                <option value={100}>+100 XP (Heroic Study Sprint)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Encouragement Reason</label>
              <input
                type="text"
                required
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
                placeholder="e.g. Excellent discipline during morning session!"
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-soft transition-all"
            >
              Award Bonus XP to Scholar 🌟
            </button>
          </form>
        </div>
      )}

      {/* Add Custom Reward Modal */}
      {isAddRewardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-md p-5 space-y-4">
            <h3 className="font-serif font-bold text-base text-primary">Create Custom Reward</h3>

            <form onSubmit={handleCreateReward} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Reward Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Favorite cafe treat / Weekend movie"
                  value={newRewTitle}
                  onChange={(e) => setNewRewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details of the treat or milestone prize..."
                  value={newRewDesc}
                  onChange={(e) => setNewRewDesc(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Required XP Threshold</label>
                <input
                  type="number"
                  min={10}
                  max={2000}
                  value={newRewThreshold}
                  onChange={(e) => setNewRewThreshold(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddRewardOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-[#ECE7D8] text-xs font-medium text-muted hover:bg-[#FAF8F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-light"
                >
                  Create Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
