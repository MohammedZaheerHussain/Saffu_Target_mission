/**
 * Date and Time utilities for Semester Survival
 * Strictly adheres to Asia/Kolkata timezone and stable YYYY-MM-DD formatting.
 */

export const TIMEZONE = 'Asia/Kolkata';

// Challenge boundaries
export const CHALLENGE_START_DATE = '2026-11-10';
export const CHALLENGE_END_DATE = '2026-12-14';

/**
 * Get current date string in Asia/Kolkata (YYYY-MM-DD)
 */
export function getKolkataTodayString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(new Date());
  } catch {
    // Fallback
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

/**
 * Format YYYY-MM-DD into human-friendly Indian format: "20 Nov 2026"
 */
export function formatIndianDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'TBA';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day.toString().padStart(2, '0')} ${months[month]} ${year}`;
}

/**
 * Format into full day format: "Thursday, 20 Nov 2026"
 */
export function formatFullDayDate(dateStr: string): string {
  if (!dateStr) return 'TBA';
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]}, ${day.toString().padStart(2, '0')} ${months[month - 1]} ${year}`;
}

/**
 * Add or subtract days from a YYYY-MM-DD string
 */
export function shiftDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const nextY = date.getFullYear();
  const nextM = String(date.getMonth() + 1).padStart(2, '0');
  const nextD = String(date.getDate()).padStart(2, '0');
  return `${nextY}-${nextM}-${nextD}`;
}

/**
 * Calculate difference in days between two YYYY-MM-DD strings
 * (target - base)
 */
export function diffDays(baseDate: string, targetDate: string): number {
  const [y1, m1, d1] = baseDate.split('-').map(Number);
  const [y2, m2, d2] = targetDate.split('-').map(Number);
  const date1 = new Date(Date.UTC(y1, m1 - 1, d1));
  const date2 = new Date(Date.UTC(y2, m2 - 1, d2));
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((date2.getTime() - date1.getTime()) / msPerDay);
}

/**
 * Detailed countdown structure
 */
export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  isPast: boolean;
  isToday: boolean;
  formatted: string;
}

/**
 * Calculate live countdown to an exam date in Asia/Kolkata
 * Exam session is Forenoon (FN) - typically starts at 10:00 AM.
 */
export function calculateExamCountdown(examDateStr: string | null): CountdownResult {
  if (!examDateStr) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isPast: false,
      isToday: false,
      formatted: 'Date TBA',
    };
  }

  const todayStr = getKolkataTodayString();
  const dayDelta = diffDays(todayStr, examDateStr);

  if (dayDelta < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isPast: true,
      isToday: false,
      formatted: 'Completed',
    };
  }

  if (dayDelta === 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isPast: false,
      isToday: true,
      formatted: 'Today (Forenoon)',
    };
  }

  return {
    days: dayDelta,
    hours: dayDelta * 24,
    minutes: dayDelta * 24 * 60,
    seconds: dayDelta * 24 * 60 * 60,
    totalHours: dayDelta * 24,
    isPast: false,
    isToday: false,
    formatted: `${dayDelta} day${dayDelta === 1 ? '' : 's'} left`,
  };
}

/**
 * Generate range of YYYY-MM-DD dates between start and end
 */
export function getDateRange(startDate: string, endDate: string): string[] {
  const result: string[] = [];
  let current = startDate;
  while (diffDays(current, endDate) >= 0) {
    result.push(current);
    current = shiftDays(current, 1);
  }
  return result;
}

