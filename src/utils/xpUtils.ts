import { XPTransaction, Achievement, Reward, StudyTask } from '../types';
import confetti from 'canvas-confetti';

export const XP_TARGET = 1000;

export const XP_RATES = {
  FOCUSED_SESSION: 10,
  HANDWRITTEN_NOTES: 20,
  QUIZ_PASS: 10, // score >= 4/5
  WRITTEN_ANSWER: 10,
  MOCK_EXAM_COMPLETE: 50,
  MOCK_EXAM_DISTINCTION: 20, // score >= 70%
};

/**
 * Trigger celebratory confetti
 */
export function triggerCelebration(mode: 'small' | 'major' = 'small') {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (mode === 'major') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E9B95C', '#829A88', '#26364A', '#D58C75'],
      });
    } else {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#E9B95C', '#829A88'],
      });
    }
  } catch {
    // Graceful fallback if canvas-confetti is unavailable
  }
}

/**
 * Compute total accumulated XP from ledger transactions
 */
export function calculateTotalXP(ledger: XPTransaction[]): number {
  return ledger.reduce((sum, tx) => sum + tx.amount, 0);
}

/**
 * Compute today's earned XP
 */
export function calculateTodayXP(ledger: XPTransaction[], todayStr: string): number {
  return ledger
    .filter((tx) => tx.timestamp.startsWith(todayStr))
    .reduce((sum, tx) => sum + (tx.amount > 0 ? tx.amount : 0), 0);
}

/**
 * Compute current week's earned XP (last 7 days)
 */
export function calculateWeekXP(ledger: XPTransaction[], weekDateStrings: string[]): number {
  const dateSet = new Set(weekDateStrings);
  return ledger
    .filter((tx) => {
      const txDate = tx.timestamp.substring(0, 10);
      return dateSet.has(txDate) && tx.amount > 0;
    })
    .reduce((sum, tx) => sum + tx.amount, 0);
}

/**
 * Get current level info based on total XP
 */
export interface LevelInfo {
  levelNumber: number;
  name: string;
  minXP: number;
  nextMilestoneXP: number;
  progressPercent: number;
  badge: string;
}

export function getLevelInfo(totalXP: number): LevelInfo {
  if (totalXP >= 1000) {
    return {
      levelNumber: 6,
      name: 'Semester Survivor',
      minXP: 1000,
      nextMilestoneXP: 1000,
      progressPercent: 100,
      badge: '🏆',
    };
  }
  if (totalXP >= 750) {
    return {
      levelNumber: 5,
      name: 'Exam Master',
      minXP: 750,
      nextMilestoneXP: 1000,
      progressPercent: Math.min(100, Math.round(((totalXP - 750) / 250) * 100)),
      badge: '👑',
    };
  }
  if (totalXP >= 500) {
    return {
      levelNumber: 4,
      name: 'Academic Warrior',
      minXP: 500,
      nextMilestoneXP: 750,
      progressPercent: Math.min(100, Math.round(((totalXP - 500) / 250) * 100)),
      badge: '⚔️',
    };
  }
  if (totalXP >= 250) {
    return {
      levelNumber: 3,
      name: 'Consistency Champion',
      minXP: 250,
      nextMilestoneXP: 500,
      progressPercent: Math.min(100, Math.round(((totalXP - 250) / 250) * 100)),
      badge: '⚡',
    };
  }
  if (totalXP >= 100) {
    return {
      levelNumber: 2,
      name: 'Getting Serious',
      minXP: 100,
      nextMilestoneXP: 250,
      progressPercent: Math.min(100, Math.round(((totalXP - 100) / 150) * 100)),
      badge: '🔥',
    };
  }
  return {
    levelNumber: 1,
    name: 'First Steps',
    minXP: 0,
    nextMilestoneXP: 100,
    progressPercent: Math.min(100, Math.round((totalXP / 100) * 100)),
    badge: '🌱',
  };
}

/**
 * Check and unlock any newly earned achievements
 */
export function evaluateAchievements(
  achievements: Achievement[],
  totalXP: number,
  tasks: StudyTask[],
  streakDays: number
): { updated: Achievement[]; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];
  const completedTasksCount = tasks.filter((t) => t.status === 'completed').length;
  const notesTasksCount = tasks.filter((t) => t.status === 'completed' && t.category === 'notes').length;
  const mockTasksCount = tasks.filter((t) => t.status === 'completed' && t.category === 'mock').length;

  const updated = achievements.map((ach) => {
    if (ach.unlocked) return ach;

    let shouldUnlock = false;

    // Check by threshold XP
    if (ach.thresholdXP && totalXP >= ach.thresholdXP) {
      shouldUnlock = true;
    }

    // Specific achievements
    if (ach.id === 'ach-l1' && (completedTasksCount >= 1 || totalXP >= 10)) shouldUnlock = true;
    if (ach.id === 'ach-first-mission' && completedTasksCount >= 1) shouldUnlock = true;
    if (ach.id === 'ach-notes-ninja' && notesTasksCount >= 1) shouldUnlock = true;
    if (ach.id === 'ach-streak-3' && streakDays >= 3) shouldUnlock = true;
    if (ach.id === 'ach-streak-7' && streakDays >= 7) shouldUnlock = true;
    if (ach.id === 'ach-mock-champ' && mockTasksCount >= 1) shouldUnlock = true;
    if (ach.id === 'ach-1000-champ' && totalXP >= 1000) shouldUnlock = true;

    if (shouldUnlock) {
      const unlockedAch: Achievement = {
        ...ach,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      };
      newlyUnlocked.push(unlockedAch);
      return unlockedAch;
    }

    return ach;
  });

  return { updated, newlyUnlocked };
}

/**
 * Check and unlock rewards based on total XP
 */
export function evaluateRewards(rewards: Reward[], totalXP: number): { updated: Reward[]; newlyUnlocked: Reward[] } {
  const newlyUnlocked: Reward[] = [];

  const updated = rewards.map((rew) => {
    if (rew.status === 'claimed') return rew;

    if (totalXP >= rew.xpThreshold && rew.status === 'locked') {
      const unlockedRew: Reward = {
        ...rew,
        status: 'unlocked',
      };
      newlyUnlocked.push(unlockedRew);
      return unlockedRew;
    }

    return rew;
  });

  return { updated, newlyUnlocked };
}

/**
 * Calculate study streak from completed tasks
 */
export function calculateStreakFromTasks(tasks: StudyTask[], todayStr: string): { currentStreak: number; longestStreak: number } {
  // Get distinct dates with at least 1 completed task
  const activeDates = new Set<string>();
  tasks.forEach((t) => {
    if (t.status === 'completed' && t.completedAt) {
      activeDates.add(t.completedAt.substring(0, 10));
    }
  });

  if (activeDates.size === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort dates descending
  const sorted = Array.from(activeDates).sort().reverse();

  let streak = 0;
  let checkDate = todayStr;

  // If today has activity, count it. If not, check if yesterday had activity (streak still active)
  if (activeDates.has(todayStr)) {
    streak = 1;
    let prev = getPreviousDay(todayStr);
    while (activeDates.has(prev)) {
      streak++;
      prev = getPreviousDay(prev);
    }
  } else {
    // Check yesterday
    const yesterday = getPreviousDay(todayStr);
    if (activeDates.has(yesterday)) {
      streak = 1;
      let prev = getPreviousDay(yesterday);
      while (activeDates.has(prev)) {
        streak++;
        prev = getPreviousDay(prev);
      }
    } else {
      streak = 0;
    }
  }

  // Calculate longest streak historically
  const chronological = Array.from(activeDates).sort();
  let maxStreak = 0;
  let tempStreak = 0;
  let prevDate: string | null = null;

  for (const d of chronological) {
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diff = getDateDiff(prevDate, d);
      if (diff === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    prevDate = d;
    if (tempStreak > maxStreak) maxStreak = tempStreak;
  }

  return {
    currentStreak: streak,
    longestStreak: Math.max(streak, maxStreak),
  };
}

function getPreviousDay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  const nextY = date.getFullYear();
  const nextM = String(date.getMonth() + 1).padStart(2, '0');
  const nextD = String(date.getDate()).padStart(2, '0');
  return `${nextY}-${nextM}-${nextD}`;
}

function getDateDiff(date1: string, date2: string): number {
  const [y1, m1, d1] = date1.split('-').map(Number);
  const [y2, m2, d2] = date2.split('-').map(Number);
  const dt1 = new Date(y1, m1 - 1, d1);
  const dt2 = new Date(y2, m2 - 1, d2);
  const diffTime = Math.abs(dt2.getTime() - dt1.getTime());
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

