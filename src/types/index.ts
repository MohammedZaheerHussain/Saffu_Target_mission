export type SessionType = 'FN' | 'AN' | 'TBA';

export interface UserProfile {
  displayName: string;
  course: string;
  college: string;
  location: string;
  university: string;
  preparationStatus: string;
  wakeUpTime: string; // e.g. "08:00"
  dailyStudyTargetMinutes: number; // e.g. 330 (5.5 hrs)
  targetOption: '5.0' | '5.5' | '6.0';
  currentCommitments: string;
  learningPreferences: string[];
}

export interface Exam {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string | null; // ISO YYYY-MM-DD or null for TBA
  session: SessionType;
  status: 'upcoming' | 'completed' | 'tba';
  paperCode?: string;
  notes?: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface SyllabusUnit {
  id: string;
  unitNumber: number;
  unitTitle: string;
  topics: SyllabusTopic[];
  handwrittenNotesDone: boolean;
  notesUrlOrPath?: string;
}

export interface Subject {
  id: string;
  name: string;
  code?: string;
  isTBA: boolean;
  examDate: string | null;
  session: SessionType;
  color: string;
  textColor: string;
  bgLight: string;
  badgeBg: string;
  units: SyllabusUnit[];
  handwrittenNotesStatus: 'Not Started' | 'In Progress' | 'Completed';
  mockExamStatus: 'Not Started' | 'Practised' | 'Mastered';
  personalRemarks: string;
  prescribedNovelOrText?: string;
  externalLinks?: { title: string; url: string }[];
}

export type QuestionPriority = 'A' | 'B' | 'C';
export type QuestionType =
  | 'Essay'
  | 'Long answer'
  | 'Short answer'
  | 'Definition'
  | 'Comparison'
  | 'Critical analysis'
  | 'Character analysis'
  | 'Literary interpretation';

export type QuestionPrepStatus =
  | 'Not Started'
  | 'Studying'
  | 'Notes Completed'
  | 'Answer Practised'
  | 'Revised';

export type QuestionSource =
  | 'Syllabus-based suggestion'
  | 'Previous-year question – unverified'
  | 'Verified PYQ';

export interface Question {
  id: string;
  subjectId: string;
  unit?: number;
  questionText: string;
  type: QuestionType;
  priority: QuestionPriority;
  preparationStatus: QuestionPrepStatus;
  sourceClassification: QuestionSource;
  examinationYears?: number[];
  sourceReference?: string;
  personalNotes?: string;
  writtenAnswerDraft?: {
    introduction?: string;
    mainArguments?: string;
    textualReferences?: string;
    conclusion?: string;
    selfAssessmentScore?: number;
  };
}

export type TaskStatus = 'pending' | 'completed' | 'in_progress';
export type TaskCategory = 'session1' | 'session2' | 'session3' | 'session4' | 'custom' | 'mock' | 'notes';

export interface StudyTask {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  scheduledDate: string; // YYYY-MM-DD
  sessionNumber?: 1 | 2 | 3 | 4;
  estimatedMinutes: number;
  actualMinutes?: number;
  xpValue: number;
  priority: QuestionPriority;
  status: TaskStatus;
  completedAt?: string; // ISO
  linkedQuestionId?: string;
  category?: TaskCategory;
  isExamDayTask?: boolean;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayType: 'normal' | 'exam' | 'recovery' | 'rest';
  notes?: string;
}

export interface XPTransaction {
  id: string;
  taskId?: string;
  amount: number; // can be negative if reversing
  reason: string;
  timestamp: string; // ISO string
  category: 'task' | 'notes' | 'quiz' | 'mock' | 'bonus' | 'reversal';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  thresholdXP?: number;
  unlocked: boolean;
  unlockedAt?: string;
  levelNumber?: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  xpThreshold: number;
  status: 'locked' | 'unlocked' | 'claimed';
  claimedAt?: string;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  taskTitle?: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  mode: '25/5' | '50/10' | 'custom';
  completedAt: string; // ISO
}

export interface MockExamRecord {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  totalMarks: number;
  marksObtained: number;
  percentage: number;
  timeSpentMinutes: number;
  weakTopics: string[];
  notes: string;
}

export interface RecallQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface RecallQuizRecord {
  id: string;
  subjectId: string;
  date: string;
  score: number;
  totalQuestions: number;
  passed: boolean; // score >= 4 out of 5
}

export interface AppState {
  schemaVersion: number;
  profile: UserProfile;
  exams: Exam[];
  subjects: Subject[];
  questions: Question[];
  tasks: StudyTask[];
  daySchedules: Record<string, DaySchedule>;
  xpLedger: XPTransaction[];
  achievements: Achievement[];
  rewards: Reward[];
  focusSessions: FocusSession[];
  mockExams: MockExamRecord[];
  recallQuizzes: RecallQuizRecord[];
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
  };
}

