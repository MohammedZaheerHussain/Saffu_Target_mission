import { AppState } from '../types';
import { initialAppState } from '../data/seedData';

export const STORAGE_KEY = 'semester-survival-data-v1';
export const CURRENT_SCHEMA_VERSION = 1;

/**
 * Safe load of state from localStorage with migration checks
 */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time initialization
      saveState(initialAppState);
      return initialAppState;
    }

    const parsed = JSON.parse(raw) as Partial<AppState>;

    // Basic structure integrity check
    if (!parsed || typeof parsed !== 'object' || !parsed.profile || !Array.isArray(parsed.exams)) {
      console.warn('Storage data corrupted or incompatible, resetting to initial state');
      saveState(initialAppState);
      return initialAppState;
    }

    // Migration logic if schemaVersion is updated in future
    if (!parsed.schemaVersion || parsed.schemaVersion < CURRENT_SCHEMA_VERSION) {
      // Perform migration if needed
      const migratedState: AppState = {
        ...initialAppState,
        ...parsed,
        schemaVersion: CURRENT_SCHEMA_VERSION,
      };
      saveState(migratedState);
      return migratedState;
    }

    // Merge with initial data in case new subjects or fields were added
    return {
      ...initialAppState,
      ...parsed,
      profile: { ...initialAppState.profile, ...(parsed.profile || {}) },
      streak: { ...initialAppState.streak, ...(parsed.streak || {}) },
      exams: parsed.exams && parsed.exams.length > 0 ? (parsed.exams as AppState['exams']) : initialAppState.exams,
      subjects: parsed.subjects && parsed.subjects.length > 0 ? (parsed.subjects as AppState['subjects']) : initialAppState.subjects,
      questions: parsed.questions && parsed.questions.length > 0 ? (parsed.questions as AppState['questions']) : initialAppState.questions,
      tasks: parsed.tasks && parsed.tasks.length > 0 ? (parsed.tasks as AppState['tasks']) : initialAppState.tasks,
      achievements: parsed.achievements && parsed.achievements.length > 0 ? (parsed.achievements as AppState['achievements']) : initialAppState.achievements,
      rewards: parsed.rewards && parsed.rewards.length > 0 ? (parsed.rewards as AppState['rewards']) : initialAppState.rewards,
      xpLedger: parsed.xpLedger || [],
      focusSessions: parsed.focusSessions || [],
      mockExams: parsed.mockExams || [],
      recallQuizzes: parsed.recallQuizzes || [],
      daySchedules: parsed.daySchedules || {},
    };
  } catch (error) {
    console.error('Failed to load application state from localStorage:', error);
    return initialAppState;
  }
}

/**
 * Save state to localStorage
 */
export function saveState(state: AppState): boolean {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Failed to save application state to localStorage:', error);
    return false;
  }
}

/**
 * Export state as formatted JSON string for download
 */
export function exportStateAsJSON(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Validate and import state from JSON string
 */
export function importStateFromJSON(jsonString: string): { success: boolean; data?: AppState; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Invalid JSON format: not an object' };
    }
    if (!parsed.profile || !Array.isArray(parsed.exams) || !Array.isArray(parsed.tasks)) {
      return { success: false, error: 'Incompatible file: missing essential study profile, exams or tasks data' };
    }

    const state: AppState = {
      ...initialAppState,
      ...parsed,
      schemaVersion: CURRENT_SCHEMA_VERSION,
    };

    saveState(state);
    return { success: true, data: state };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown JSON parse error';
    return { success: false, error: errorMsg };
  }
}

/**
 * Reset application data to fresh seed state
 */
export function resetApplicationState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  saveState(initialAppState);
  return initialAppState;
}

