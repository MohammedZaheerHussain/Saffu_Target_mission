import { AppState, StudyTask } from '../types';
import { formatIndianDate, calculateExamCountdown, getKolkataTodayString } from './dateUtils';
import { calculateTotalXP, calculateTodayXP } from './xpUtils';

/**
 * Format today's study report for WhatsApp
 */
export function generateDailyReport(state: AppState, dateStr?: string): string {
  const targetDate = dateStr || getKolkataTodayString();
  const todayXP = calculateTodayXP(state.xpLedger, targetDate);
  const totalXP = calculateTotalXP(state.xpLedger);

  const todaysTasks = state.tasks.filter((t) => t.scheduledDate === targetDate);
  const completedTasks = todaysTasks.filter((t) => t.status === 'completed');
  const pendingTasks = todaysTasks.filter((t) => t.status !== 'completed');

  // Completed study minutes
  const completedMinutes = completedTasks.reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);
  const hours = Math.floor(completedMinutes / 60);
  const mins = completedMinutes % 60;
  const studyTimeString = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;

  // Find next upcoming exam
  const upcomingExams = state.exams
    .filter((e) => e.date && !calculateExamCountdown(e.date).isPast)
    .sort((a, b) => (a.date! > b.date! ? 1 : -1));
  const nextExam = upcomingExams[0];
  const nextExamStr = nextExam
    ? `${nextExam.subjectName} (${formatIndianDate(nextExam.date)})`
    : 'All main examinations completed! 🎉';

  const completedListStr =
    completedTasks.length > 0
      ? completedTasks.map((t, idx) => `  ${idx + 1}. ✅ ${t.title} (+${t.xpValue} XP)`).join('\n')
      : '  (None completed yet today)';

  const pendingListStr =
    pendingTasks.length > 0
      ? pendingTasks.map((t, idx) => `  ${idx + 1}. ⏳ ${t.title}`).join('\n')
      : '  (All tasks finished!)';

  const report = `🌟 *SEMESTER SURVIVAL – DAILY REPORT* 🌟
_One Quest at a Time. One Exam at a Time._

📅 *Date:* ${formatIndianDate(targetDate)}
⚡ *XP Earned Today:* +${todayXP} XP
🏆 *Total XP:* ${totalXP} / 1000 (${Math.min(100, Math.round((totalXP / 1000) * 100))}%)
🔥 *Current Streak:* ${state.streak.currentStreak} day${state.streak.currentStreak === 1 ? '' : 's'}
⏱️ *Study Time:* ${studyTimeString}

📖 *Completed Tasks (${completedTasks.length}/${todaysTasks.length}):*
${completedListStr}

🎯 *Pending Missions:*
${pendingListStr}

🎯 *Next Examination:*
${nextExamStr}

💬 *"One step closer to becoming the Semester Survivor!"* 🎓
-----------------------------------------
Shared from Semester Survival – BA English Quest 2026`;

  return report;
}

/**
 * Format weekly summary report
 */
export function generateWeeklyReport(state: AppState): string {
  const totalXP = calculateTotalXP(state.xpLedger);
  const totalCompletedTasks = state.tasks.filter((t) => t.status === 'completed').length;
  const completedMocks = state.mockExams.length;

  return `📊 *SEMESTER SURVIVAL – WEEKLY PROGRESS DIGEST* 📊

👤 *Student:* ${state.profile.displayName || 'BA English Scholar'}
🏛️ *College:* ${state.profile.college}
📚 *Course:* ${state.profile.course}

🏆 *Total XP Wallet:* ${totalXP} / 1000 XP
🔥 *Study Streak:* ${state.streak.currentStreak} consecutive days
✅ *Missions Completed:* ${totalCompletedTasks}
📝 *Mock Exams Taken:* ${completedMocks}

_"Consistency builds confidence. Victory is inevitable!"_
-----------------------------------------
Semester Survival 2026`;
}

/**
 * Share via Web Share API or open WhatsApp URL
 */
export async function shareToWhatsApp(text: string): Promise<boolean> {
  const encoded = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;

  // Check if Web Share API is available (especially on mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Semester Survival Daily Report',
        text: text,
      });
      return true;
    } catch {
      // If user cancelled or failed, fallback to opening WhatsApp URL
    }
  }

  // Open WhatsApp in new tab/app window
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  return true;
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

