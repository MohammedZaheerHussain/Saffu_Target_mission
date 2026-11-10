import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppState,
  StudyTask,
  XPTransaction,
  UserProfile,
  Exam,
  Subject,
  Question,
  Reward,
  FocusSession,
  MockExamRecord,
  RecallQuizRecord,
  SyllabusUnit,
} from '../types';
import { loadState, saveState, exportStateAsJSON, importStateFromJSON, resetApplicationState } from '../utils/storage';
import { getKolkataTodayString } from '../utils/dateUtils';
import {
  calculateTotalXP,
  calculateTodayXP,
  getLevelInfo,
  evaluateAchievements,
  evaluateRewards,
  calculateStreakFromTasks,
  triggerCelebration,
} from '../utils/xpUtils';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'xp' | 'achievement' | 'reward' | 'success' | 'info';
  amount?: number;
}

interface AppContextType {
  state: AppState;
  todayDateStr: string;
  totalXP: number;
  todayXP: number;
  levelInfo: ReturnType<typeof getLevelInfo>;
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  // Tasks
  toggleTaskCompletion: (taskId: string) => void;
  addTask: (task: Omit<StudyTask, 'id' | 'status'>) => void;
  updateTask: (taskId: string, updates: Partial<StudyTask>) => void;
  deleteTask: (taskId: string) => void;
  rescheduleTask: (taskId: string, newDate: string) => void;
  // XP & Coach
  addManualBonusXP: (amount: number, reason: string) => void;
  // Profile
  updateProfile: (updates: Partial<UserProfile>) => void;
  // Exams
  updateExam: (examId: string, updates: Partial<Exam>) => void;
  // Subjects & Syllabus
  updateSubject: (subjectId: string, updates: Partial<Subject>) => void;
  addUnitToSubject: (subjectId: string, unitTitle: string, topics: string[]) => void;
  toggleTopicCompletion: (subjectId: string, unitId: string, topicId: string) => void;
  toggleUnitNotesCompletion: (subjectId: string, unitId: string) => void;
  // Questions
  addQuestion: (question: Omit<Question, 'id'>) => void;
  updateQuestion: (questionId: string, updates: Partial<Question>) => void;
  deleteQuestion: (questionId: string) => void;
  saveWrittenDraft: (questionId: string, draft: Question['writtenAnswerDraft']) => void;
  markQuestionNotesCompleted: (questionId: string) => void;
  markQuestionAnswerPractised: (questionId: string) => void;
  // Focus & Mocks
  recordFocusSession: (session: Omit<FocusSession, 'id' | 'completedAt'>) => void;
  recordMockExam: (record: Omit<MockExamRecord, 'id'>) => void;
  recordRecallQuiz: (record: Omit<RecallQuizRecord, 'id'>) => void;
  // Rewards
  updateReward: (rewardId: string, updates: Partial<Reward>) => void;
  claimReward: (rewardId: string) => void;
  addCustomReward: (reward: Omit<Reward, 'id' | 'status'>) => void;
  // Data management
  exportData: () => void;
  importData: (jsonString: string) => { success: boolean; error?: string };
  resetData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => loadState());
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const todayDateStr = getKolkataTodayString();

  // Save changes automatically
  useEffect(() => {
    saveState(state);
  }, [state]);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const totalXP = calculateTotalXP(state.xpLedger);
  const todayXP = calculateTodayXP(state.xpLedger, todayDateStr);
  const levelInfo = getLevelInfo(totalXP);

  // Evaluate achievements & rewards when XP or tasks change
  const triggerEvaluations = (newState: AppState) => {
    const newTotalXP = calculateTotalXP(newState.xpLedger);
    const { updated: updatedAchievements, newlyUnlocked: unlockedAchs } = evaluateAchievements(
      newState.achievements,
      newTotalXP,
      newState.tasks,
      newState.streak.currentStreak
    );

    const { updated: updatedRewards, newlyUnlocked: unlockedRews } = evaluateRewards(
      newState.rewards,
      newTotalXP
    );

    if (unlockedAchs.length > 0) {
      unlockedAchs.forEach((ach) => {
        addToast({
          title: `Achievement Unlocked! ${ach.icon}`,
          message: `${ach.name}: ${ach.description}`,
          type: 'achievement',
        });
      });
      triggerCelebration('major');
    }

    if (unlockedRews.length > 0) {
      unlockedRews.forEach((rew) => {
        addToast({
          title: 'Reward Milestone Unlocked! 🎁',
          message: `You earned enough XP for: ${rew.title || 'Milestone Reward'}!`,
          type: 'reward',
        });
      });
      triggerCelebration('major');
    }

    return {
      ...newState,
      achievements: updatedAchievements,
      rewards: updatedRewards,
    };
  };

  // ---------------- TASKS & XP ----------------
  const toggleTaskCompletion = (taskId: string) => {
    setState((prevState) => {
      const task = prevState.tasks.find((t) => t.id === taskId);
      if (!task) return prevState;

      const isNowCompleted = task.status !== 'completed';
      const nowIso = new Date().toISOString();

      // Check current net XP awarded for this task
      const existingNetTaskXP = prevState.xpLedger
        .filter((tx) => tx.taskId === taskId)
        .reduce((sum, tx) => sum + tx.amount, 0);

      const newLedger = [...prevState.xpLedger];

      if (isNowCompleted) {
        // Only award XP if net XP is 0 (prevents duplicate awards)
        if (existingNetTaskXP <= 0) {
          const xpAmount = task.xpValue || 10;
          newLedger.push({
            id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            taskId,
            amount: xpAmount,
            reason: `Mission completed: ${task.title}`,
            timestamp: nowIso,
            category: 'task',
          });
          addToast({
            title: `+${xpAmount} XP Earned! ⚡`,
            message: task.title,
            type: 'xp',
            amount: xpAmount,
          });
          triggerCelebration('small');
        }
      } else {
        // Reversal: transparently reverse previously awarded XP
        if (existingNetTaskXP > 0) {
          newLedger.push({
            id: `tx-rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            taskId,
            amount: -existingNetTaskXP,
            reason: `Reversal: ${task.title}`,
            timestamp: nowIso,
            category: 'reversal',
          });
          addToast({
            title: `-${existingNetTaskXP} XP Reversed`,
            message: `Task marked incomplete: ${task.title}`,
            type: 'info',
          });
        }
      }

      const updatedTasks = prevState.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: isNowCompleted ? ('completed' as const) : ('pending' as const),
              completedAt: isNowCompleted ? nowIso : undefined,
            }
          : t
      );

      // Recalculate streak
      const newStreak = calculateStreakFromTasks(updatedTasks, todayDateStr);

      const updatedState: AppState = {
        ...prevState,
        tasks: updatedTasks,
        xpLedger: newLedger,
        streak: {
          currentStreak: newStreak.currentStreak,
          longestStreak: Math.max(prevState.streak.longestStreak, newStreak.longestStreak),
          lastActiveDate: isNowCompleted ? todayDateStr : prevState.streak.lastActiveDate,
        },
      };

      return triggerEvaluations(updatedState);
    });
  };

  const addTask = (taskData: Omit<StudyTask, 'id' | 'status'>) => {
    setState((prev) => {
      const newTask: StudyTask = {
        ...taskData,
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        status: 'pending',
      };
      addToast({
        title: 'Mission Created',
        message: `${newTask.title} scheduled for ${newTask.scheduledDate}`,
        type: 'success',
      });
      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      };
    });
  };

  const updateTask = (taskId: string, updates: Partial<StudyTask>) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    }));
  };

  const deleteTask = (taskId: string) => {
    setState((prev) => {
      const task = prev.tasks.find((t) => t.id === taskId);
      return {
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== taskId),
      };
    });
    addToast({ title: 'Task Removed', message: 'Mission removed from timetable', type: 'info' });
  };

  const rescheduleTask = (taskId: string, newDate: string) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, scheduledDate: newDate } : t)),
    }));
    addToast({ title: 'Rescheduled', message: `Mission moved to ${newDate}`, type: 'success' });
  };

  // ---------------- XP & COACH ----------------
  const addManualBonusXP = (amount: number, reason: string) => {
    setState((prev) => {
      const newLedger = [
        ...prev.xpLedger,
        {
          id: `tx-bonus-${Date.now()}`,
          amount,
          reason: reason || 'Study Coach Bonus XP',
          timestamp: new Date().toISOString(),
          category: 'bonus' as const,
        },
      ];
      addToast({
        title: `+${amount} Bonus XP Awarded! 🌟`,
        message: reason || 'Keep shining!',
        type: 'xp',
        amount,
      });
      triggerCelebration('major');
      return triggerEvaluations({ ...prev, xpLedger: newLedger });
    });
  };

  // ---------------- PROFILE & EXAMS ----------------
  const updateProfile = (updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
    addToast({ title: 'Profile Updated', message: 'Study preferences saved', type: 'success' });
  };

  const updateExam = (examId: string, updates: Partial<Exam>) => {
    setState((prev) => ({
      ...prev,
      exams: prev.exams.map((e) => (e.id === examId ? { ...e, ...updates } : e)),
    }));
    addToast({ title: 'Exam Schedule Updated', message: 'Examination details saved', type: 'success' });
  };

  // ---------------- SUBJECTS & SYLLABUS ----------------
  const updateSubject = (subjectId: string, updates: Partial<Subject>) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => (s.id === subjectId ? { ...s, ...updates } : s)),
    }));
  };

  const addUnitToSubject = (subjectId: string, unitTitle: string, topics: string[]) => {
    setState((prev) => {
      const subject = prev.subjects.find((s) => s.id === subjectId);
      if (!subject) return prev;

      const newUnit: SyllabusUnit = {
        id: `u-${Date.now()}`,
        unitNumber: (subject.units?.length || 0) + 1,
        unitTitle,
        handwrittenNotesDone: false,
        topics: topics.map((t, idx) => ({
          id: `top-${Date.now()}-${idx}`,
          title: t.trim(),
          completed: false,
        })),
      };

      const updatedSubjects = prev.subjects.map((s) =>
        s.id === subjectId ? { ...s, units: [...(s.units || []), newUnit] } : s
      );

      addToast({ title: 'Syllabus Unit Added', message: unitTitle, type: 'success' });
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const toggleTopicCompletion = (subjectId: string, unitId: string, topicId: string) => {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          units: (s.units || []).map((u) => {
            if (u.id !== unitId) return u;
            return {
              ...u,
              topics: u.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t)),
            };
          }),
        };
      }),
    }));
  };

  const toggleUnitNotesCompletion = (subjectId: string, unitId: string) => {
    setState((prev) => {
      let awardedXP = false;
      const updatedSubjects = prev.subjects.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          units: (s.units || []).map((u) => {
            if (u.id !== unitId) return u;
            const willBeDone = !u.handwrittenNotesDone;
            if (willBeDone) awardedXP = true;
            return { ...u, handwrittenNotesDone: willBeDone };
          }),
        };
      });

      let newLedger = [...prev.xpLedger];
      if (awardedXP) {
        newLedger.push({
          id: `tx-notes-${Date.now()}`,
          amount: 20,
          reason: `Completed handwritten notes for Unit`,
          timestamp: new Date().toISOString(),
          category: 'notes',
        });
        addToast({
          title: '+20 XP Notes Ninja! ✍️',
          message: 'Handwritten unit notes completed!',
          type: 'xp',
          amount: 20,
        });
        triggerCelebration('small');
      }

      return triggerEvaluations({
        ...prev,
        subjects: updatedSubjects,
        xpLedger: newLedger,
      });
    });
  };

  // ---------------- QUESTIONS ----------------
  const addQuestion = (questionData: Omit<Question, 'id'>) => {
    setState((prev) => {
      const newQuestion: Question = {
        ...questionData,
        id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      addToast({ title: 'Question Added', message: 'Added to subject question bank', type: 'success' });
      return {
        ...prev,
        questions: [newQuestion, ...prev.questions],
      };
    });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)),
    }));
    addToast({ title: 'Question Updated', message: 'Changes saved', type: 'info' });
  };

  const deleteQuestion = (questionId: string) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
    addToast({ title: 'Question Deleted', message: 'Removed from question bank', type: 'info' });
  };

  const saveWrittenDraft = (questionId: string, draft: Question['writtenAnswerDraft']) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              preparationStatus: 'Answer Practised',
              writtenAnswerDraft: { ...q.writtenAnswerDraft, ...draft },
            }
          : q
      ),
    }));
    addToast({ title: 'Answer Draft Saved', message: 'Worksheet updated', type: 'success' });
  };

  const markQuestionNotesCompleted = (questionId: string) => {
    setState((prev) => {
      const q = prev.questions.find((x) => x.id === questionId);
      if (!q) return prev;

      const alreadyHasNotesXP = prev.xpLedger.some((tx) => tx.reason.includes(questionId) && tx.category === 'notes');
      let newLedger = [...prev.xpLedger];

      if (!alreadyHasNotesXP) {
        newLedger.push({
          id: `tx-qnotes-${Date.now()}`,
          amount: 20,
          reason: `Handwritten notes completed for question [${questionId}]`,
          timestamp: new Date().toISOString(),
          category: 'notes',
        });
        addToast({ title: '+20 XP! ✍️', message: 'Notes completed for question', type: 'xp', amount: 20 });
        triggerCelebration('small');
      }

      const updatedQuestions = prev.questions.map((item) =>
        item.id === questionId ? { ...item, preparationStatus: 'Notes Completed' as const } : item
      );

      return triggerEvaluations({
        ...prev,
        questions: updatedQuestions,
        xpLedger: newLedger,
      });
    });
  };

  const markQuestionAnswerPractised = (questionId: string) => {
    setState((prev) => {
      const q = prev.questions.find((x) => x.id === questionId);
      if (!q) return prev;

      const alreadyHasAnswerXP = prev.xpLedger.some((tx) => tx.reason.includes(questionId) && tx.category === 'task');
      let newLedger = [...prev.xpLedger];

      if (!alreadyHasAnswerXP) {
        newLedger.push({
          id: `tx-qans-${Date.now()}`,
          amount: 10,
          reason: `Timed written answer completed for question [${questionId}]`,
          timestamp: new Date().toISOString(),
          category: 'task',
        });
        addToast({ title: '+10 XP! 📝', message: 'Timed written answer practised!', type: 'xp', amount: 10 });
        triggerCelebration('small');
      }

      const updatedQuestions = prev.questions.map((item) =>
        item.id === questionId ? { ...item, preparationStatus: 'Answer Practised' as const } : item
      );

      return triggerEvaluations({
        ...prev,
        questions: updatedQuestions,
        xpLedger: newLedger,
      });
    });
  };

  // ---------------- FOCUS & MOCK TESTS ----------------
  const recordFocusSession = (sessionData: Omit<FocusSession, 'id' | 'completedAt'>) => {
    setState((prev) => {
      const newSession: FocusSession = {
        ...sessionData,
        id: `focus-${Date.now()}`,
        completedAt: new Date().toISOString(),
      };
      addToast({
        title: 'Focus Session Completed! ⏱️',
        message: `${sessionData.durationMinutes} minutes dedicated`,
        type: 'success',
      });
      return {
        ...prev,
        focusSessions: [newSession, ...prev.focusSessions],
      };
    });
  };

  const recordMockExam = (recordData: Omit<MockExamRecord, 'id'>) => {
    setState((prev) => {
      const newRecord: MockExamRecord = {
        ...recordData,
        id: `mock-${Date.now()}`,
      };

      const newLedger = [...prev.xpLedger];

      // +50 XP for full mock exam
      newLedger.push({
        id: `tx-mock-${Date.now()}`,
        amount: 50,
        reason: `Full Mock Exam completed: ${recordData.title}`,
        timestamp: new Date().toISOString(),
        category: 'mock',
      });
      addToast({ title: '+50 XP! 📜', message: 'Full Mock Exam Completed!', type: 'xp', amount: 50 });

      // +20 XP if percentage >= 70%
      if (recordData.percentage >= 70) {
        newLedger.push({
          id: `tx-mock-dist-${Date.now()}`,
          amount: 20,
          reason: `Distinction in Mock Exam (${recordData.percentage}%): ${recordData.title}`,
          timestamp: new Date().toISOString(),
          category: 'mock',
        });
        addToast({
          title: '+20 Bonus XP! 🎖️',
          message: `Distinction score achieved: ${recordData.percentage}%!`,
          type: 'xp',
          amount: 20,
        });
      }

      triggerCelebration('major');

      return triggerEvaluations({
        ...prev,
        mockExams: [newRecord, ...prev.mockExams],
        xpLedger: newLedger,
      });
    });
  };

  const recordRecallQuiz = (quizData: Omit<RecallQuizRecord, 'id'>) => {
    setState((prev) => {
      const newRecord: RecallQuizRecord = {
        ...quizData,
        id: `quiz-${Date.now()}`,
      };

      const newLedger = [...prev.xpLedger];
      if (quizData.passed) {
        newLedger.push({
          id: `tx-quiz-${Date.now()}`,
          amount: 10,
          reason: `Recall Quiz Passed (${quizData.score}/${quizData.totalQuestions})`,
          timestamp: new Date().toISOString(),
          category: 'quiz',
        });
        addToast({
          title: '+10 XP Quiz Master! 💡',
          message: `Great recall! Score: ${quizData.score}/${quizData.totalQuestions}`,
          type: 'xp',
          amount: 10,
        });
        triggerCelebration('small');
      } else {
        addToast({
          title: `Quiz Finished: ${quizData.score}/${quizData.totalQuestions}`,
          message: 'Review key terms and try again for +10 XP!',
          type: 'info',
        });
      }

      return triggerEvaluations({
        ...prev,
        recallQuizzes: [newRecord, ...prev.recallQuizzes],
        xpLedger: newLedger,
      });
    });
  };

  // ---------------- REWARDS ----------------
  const updateReward = (rewardId: string, updates: Partial<Reward>) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) => (r.id === rewardId ? { ...r, ...updates } : r)),
    }));
    addToast({ title: 'Reward Customised', message: 'Reward settings updated', type: 'info' });
  };

  const claimReward = (rewardId: string) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.map((r) =>
        r.id === rewardId ? { ...r, status: 'claimed' as const, claimedAt: new Date().toISOString() } : r
      ),
    }));
    addToast({ title: 'Reward Claimed! 🎁', message: 'Enjoy your well-earned reward!', type: 'reward' });
    triggerCelebration('major');
  };

  const addCustomReward = (rewardData: Omit<Reward, 'id' | 'status'>) => {
    setState((prev) => {
      const currentXP = calculateTotalXP(prev.xpLedger);
      const isAlreadyUnlocked = currentXP >= rewardData.xpThreshold;
      const newReward: Reward = {
        ...rewardData,
        id: `rew-${Date.now()}`,
        status: isAlreadyUnlocked ? 'unlocked' : 'locked',
      };
      addToast({ title: 'Custom Reward Added', message: newReward.title, type: 'success' });
      return {
        ...prev,
        rewards: [...prev.rewards, newReward],
      };
    });
  };

  // ---------------- BACKUP & DATA MANAGEMENT ----------------
  const exportData = () => {
    const jsonStr = exportStateAsJSON(state);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `semester-survival-backup-${getKolkataTodayString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast({ title: 'Backup Downloaded', message: 'Progress safely exported to JSON', type: 'success' });
  };

  const importData = (jsonString: string) => {
    const res = importStateFromJSON(jsonString);
    if (res.success && res.data) {
      setState(res.data);
      addToast({ title: 'Backup Restored', message: 'All progress restored successfully', type: 'success' });
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to import backup' };
  };

  const resetData = () => {
    const fresh = resetApplicationState();
    setState(fresh);
    addToast({ title: 'Application Reset', message: 'Reset to initial seed schedule', type: 'info' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        todayDateStr,
        totalXP,
        todayXP,
        levelInfo,
        toasts,
        removeToast,
        toggleTaskCompletion,
        addTask,
        updateTask,
        deleteTask,
        rescheduleTask,
        addManualBonusXP,
        updateProfile,
        updateExam,
        updateSubject,
        addUnitToSubject,
        toggleTopicCompletion,
        toggleUnitNotesCompletion,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        saveWrittenDraft,
        markQuestionNotesCompleted,
        markQuestionAnswerPractised,
        recordFocusSession,
        recordMockExam,
        recordRecallQuiz,
        updateReward,
        claimReward,
        addCustomReward,
        exportData,
        importData,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

