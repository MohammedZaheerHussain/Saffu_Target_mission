import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { X, Play, Pause, RotateCcw, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { triggerCelebration } from '../../utils/xpUtils';

interface FocusTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTaskId?: string;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({ isOpen, onClose, initialTaskId }) => {
  const { state, recordFocusSession, todayDateStr } = useApp();

  const [mode, setMode] = useState<'25/5' | '50/10' | 'custom'>('25/5');
  const [isBreak, setIsBreak] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTaskId || '');
  const [customMinutes, setCustomMinutes] = useState(40);

  const timerRef = useRef<number | null>(null);

  // Sync initial task if provided
  useEffect(() => {
    if (initialTaskId) {
      setSelectedTaskId(initialTaskId);
    }
  }, [initialTaskId]);

  // Mode change handler
  const handleModeChange = (newMode: '25/5' | '50/10' | 'custom') => {
    setIsRunning(false);
    setIsBreak(false);
    setMode(newMode);
    let seconds = 25 * 60;
    if (newMode === '50/10') seconds = 50 * 60;
    if (newMode === 'custom') seconds = customMinutes * 60;
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
  };

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isBreak, mode]);

  const handleTimerComplete = () => {
    // Play subtle audio chime if supported
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio not permitted or not supported
    }

    triggerCelebration('small');

    if (!isBreak) {
      // Record completed focus session
      const durationMins = Math.round(totalSeconds / 60);
      const linkedTask = state.tasks.find((t) => t.id === selectedTaskId);

      recordFocusSession({
        taskId: selectedTaskId || undefined,
        taskTitle: linkedTask?.title || 'Undirected Focus Session',
        date: todayDateStr,
        durationMinutes: durationMins,
        mode,
      });

      // Switch to break
      setIsBreak(true);
      const breakSecs = mode === '25/5' ? 5 * 60 : mode === '50/10' ? 10 * 60 : 5 * 60;
      setTotalSeconds(breakSecs);
      setRemainingSeconds(breakSecs);
    } else {
      // Break finished, reset to focus
      setIsBreak(false);
      handleModeChange(mode);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    let seconds = 25 * 60;
    if (mode === '50/10') seconds = 50 * 60;
    if (mode === 'custom') seconds = customMinutes * 60;
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progressPercent = Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#ECE7D8] shadow-soft-lg w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ECE7D8] bg-[#FAF8F2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-primary">Academic Focus Timer</h3>
              <p className="text-[11px] text-muted">Deep work block for BA English prep</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted hover:text-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-5 space-y-5">
          <div className="flex p-1 bg-[#F0EAD6]/50 rounded-2xl border border-[#E5E0D0] text-xs font-medium">
            <button
              onClick={() => handleModeChange('25/5')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                mode === '25/5' ? 'bg-white text-primary shadow-sm font-semibold' : 'text-muted hover:text-charcoal'
              }`}
            >
              25m Pomodoro
            </button>
            <button
              onClick={() => handleModeChange('50/10')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                mode === '50/10' ? 'bg-white text-primary shadow-sm font-semibold' : 'text-muted hover:text-charcoal'
              }`}
            >
              50m Deep Block
            </button>
            <button
              onClick={() => handleModeChange('custom')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                mode === 'custom' ? 'bg-white text-primary shadow-sm font-semibold' : 'text-muted hover:text-charcoal'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Optional Task Linking */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1.5">
              Link with Today's Study Mission:
            </label>
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
            >
              <option value="">-- General Literary Study --</option>
              {state.tasks
                .filter((t) => t.scheduledDate === todayDateStr && t.status !== 'completed')
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.estimatedMinutes}m)
                  </option>
                ))}
            </select>
          </div>

          {/* Circular / Large Timer Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center bg-[#FAF8F2] border-4 border-[#ECE7D8] shadow-inner">
              {/* Progress Ring Indicator */}
              <div
                className={`absolute inset-0 rounded-full border-4 ${
                  isBreak ? 'border-secondary' : 'border-accent'
                } transition-all duration-500`}
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent}% -50%, ${progressPercent}% 150%, -50% 150%)`,
                }}
              />

              <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-1">
                {isBreak ? '☕ Rest Break' : '📖 Focused Study'}
              </span>

              <div className="font-serif text-5xl font-extrabold text-primary tracking-tight">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              <span className="text-[10px] text-muted mt-1">
                {isBreak ? 'Relax your mind' : 'Stay immersed'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-[#FAF9F5] hover:bg-[#F0EAD6]/50 border border-[#ECE7D8] text-muted hover:text-charcoal transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-soft transition-all transform active:scale-95 flex items-center gap-2 ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-primary hover:bg-primary-light text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> Start Focus
                </>
              )}
            </button>
          </div>

          {/* Academic Integrity Note */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
            <div className="flex items-center gap-1 font-semibold mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Academic Quest Rule:</span>
            </div>
            Timer sessions build your focus record. To earn the task's full XP, check off the mission in your schedule with completed notes or written answers!
          </div>
        </div>
      </div>
    </div>
  );
};
