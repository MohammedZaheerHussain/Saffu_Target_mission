import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatIndianDate } from '../../utils/dateUtils';
import {
  Settings as SettingsIcon,
  User,
  Clock,
  Calendar,
  BookOpen,
  Database,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Check,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    state,
    updateProfile,
    updateExam,
    addUnitToSubject,
    updateSubject,
    exportData,
    importData,
    resetData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'schedule' | 'exams' | 'syllabus' | 'data'>('profile');

  // Profile local state
  const [displayName, setDisplayName] = useState(state.profile.displayName);
  const [college, setCollege] = useState(state.profile.college);
  const [university, setUniversity] = useState(state.profile.university);
  const [course, setCourse] = useState(state.profile.course);

  // Schedule local state
  const [wakeUpTime, setWakeUpTime] = useState(state.profile.wakeUpTime);
  const [targetOption, setTargetOption] = useState<'5.0' | '5.5' | '6.0'>(state.profile.targetOption || '5.5');

  // Syllabus creator state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-ve');
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [pastedTopicsText, setPastedTopicsText] = useState('');

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName: displayName.trim(),
      college: college.trim(),
      university: university.trim(),
      course: course.trim(),
    });
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    let mins = 330;
    if (targetOption === '5.0') mins = 300;
    if (targetOption === '6.0') mins = 360;

    updateProfile({
      wakeUpTime,
      targetOption,
      dailyStudyTargetMinutes: mins,
    });
  };

  const handleAddSyllabusUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitTitle.trim()) return;

    const topics = pastedTopicsText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addUnitToSubject(selectedSubjectId, newUnitTitle.trim(), topics);
    setNewUnitTitle('');
    setPastedTopicsText('');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const res = importData(importJsonText);
    if (res.success) {
      setImportStatus('Backup restored successfully!');
      setImportJsonText('');
    } else {
      setImportStatus(`Error: ${res.error}`);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const res = importData(text);
        if (res.success) {
          setImportStatus('Backup file loaded successfully!');
        } else {
          setImportStatus(`Error: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetConfirm = () => {
    if (
      confirm(
        'WARNING: Are you sure you want to reset all data? This will restore the initial schedule, exams, and question bank. This action cannot be undone!'
      )
    ) {
      resetData();
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-serif font-bold text-primary">Settings & Preferences</h2>
        <p className="text-xs text-muted mt-0.5">
          Manage your student profile, study hours, examination dates, syllabus units, and local backups.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-[#ECE7D8] pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'schedule'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Daily Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'exams'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Examination Dates</span>
        </button>

        <button
          onClick={() => setActiveTab('syllabus')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'syllabus'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Syllabus Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'data'
              ? 'bg-primary text-white shadow-sm'
              : 'text-muted hover:text-charcoal hover:bg-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Data & Backups</span>
        </button>
      </div>

      {/* ---------------- 1. PROFILE ---------------- */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="card-parchment p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-primary">Student Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Display Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Saffu / Scholar"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Degree & Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">College</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Affiliated University</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5] focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      )}

      {/* ---------------- 2. DAILY SCHEDULE ---------------- */}
      {activeTab === 'schedule' && (
        <form onSubmit={handleSaveSchedule} className="card-parchment p-6 space-y-5">
          <div>
            <h3 className="font-serif font-bold text-base text-primary">Daily Study Routine Customization</h3>
            <p className="text-xs text-muted mt-0.5">
              Personalize wake-up time and focused daily study target.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Wake-up Time</label>
              <input
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
              <span className="text-[10px] text-muted mt-1 block">Default: 08:00 AM breakfast and morning preparation</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Daily Study Target</label>
              <div className="flex gap-2">
                {(['5.0', '5.5', '6.0'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTargetOption(opt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      targetOption === opt
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-[#FAF9F5] text-charcoal border-[#ECE7D8] hover:bg-white'
                    }`}
                  >
                    {opt} Hours
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-muted mt-1 block">
                Standard: 5.5 hours (330 minutes) spread across 4 focused blocks.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] text-xs text-muted">
            <span className="font-bold text-primary block mb-1">Free Evening Policy:</span>
            Compulsory study sessions conclude at 04:45 PM. Evenings remain 100% free for leisure, relaxation, and peaceful rest!
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all"
          >
            Save Schedule Preferences
          </button>
        </form>
      )}

      {/* ---------------- 3. EXAM DATES ---------------- */}
      {activeTab === 'exams' && (
        <div className="card-parchment p-6 space-y-4">
          <div>
            <h3 className="font-serif font-bold text-base text-primary">Examination Dates & Requirements</h3>
            <p className="text-xs text-muted mt-0.5">
              Update exam dates or add dates for TBA academic requirements once announced by Kamban College.
            </p>
          </div>

          <div className="space-y-3">
            {state.exams.map((exam) => (
              <div
                key={exam.id}
                className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{exam.subjectName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#ECE7D8] font-mono">
                      {exam.session} Session
                    </span>
                  </div>
                  <span className="text-[11px] text-muted">
                    {exam.date ? formatIndianDate(exam.date) : 'Date TBA'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={exam.date || ''}
                    onChange={(e) => updateExam(exam.id, { date: e.target.value || null })}
                    className="text-xs p-1.5 rounded-xl border border-[#ECE7D8] bg-white"
                  />
                  <select
                    value={exam.session}
                    onChange={(e) => updateExam(exam.id, { session: e.target.value as 'FN' | 'AN' | 'TBA' })}
                    className="text-xs p-1.5 rounded-xl border border-[#ECE7D8] bg-white font-medium"
                  >
                    <option value="FN">FN (Forenoon)</option>
                    <option value="AN">AN (Afternoon)</option>
                    <option value="TBA">TBA</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- 4. SYLLABUS MANAGER ---------------- */}
      {activeTab === 'syllabus' && (
        <div className="card-parchment p-6 space-y-5">
          <div>
            <h3 className="font-serif font-bold text-base text-primary">Syllabus Management Interface</h3>
            <p className="text-xs text-muted mt-0.5">
              Paste or manually add syllabus units and topics (especially useful for Value Education when friends share notes).
            </p>
          </div>

          <form onSubmit={handleAddSyllabusUnit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Select Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              >
                {state.subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Unit Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Unit 1: Human Values, Ethics & Social Responsibility"
                value={newUnitTitle}
                onChange={(e) => setNewUnitTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Unit Topics (One topic per line)
              </label>
              <textarea
                rows={4}
                placeholder="Topic 1: Definition of Ethics&#10;Topic 2: Moral dilemmas in modern society&#10;Topic 3: Civic virtues and community service"
                value={pastedTopicsText}
                onChange={(e) => setPastedTopicsText(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#ECE7D8] bg-[#FAF9F5]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all"
            >
              Add Unit to Syllabus
            </button>
          </form>

          {/* Current Units Summary for selected subject */}
          <div className="pt-4 border-t border-[#ECE7D8] space-y-2">
            <h4 className="text-xs font-bold text-primary">
              Current Units for {state.subjects.find((s) => s.id === selectedSubjectId)?.name}:
            </h4>

            {state.subjects.find((s) => s.id === selectedSubjectId)?.units.length === 0 ? (
              <p className="text-xs text-muted italic">No units registered yet for this subject.</p>
            ) : (
              state.subjects
                .find((s) => s.id === selectedSubjectId)
                ?.units.map((u) => (
                  <div key={u.id} className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7D8] text-xs">
                    <span className="font-bold text-primary">Unit {u.unitNumber}: {u.unitTitle}</span>
                    <span className="text-muted block text-[10px] mt-0.5">
                      {u.topics.length} topic{u.topics.length === 1 ? '' : 's'} registered
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* ---------------- 5. DATA & BACKUPS ---------------- */}
      {activeTab === 'data' && (
        <div className="card-parchment p-6 space-y-6">
          <div>
            <h3 className="font-serif font-bold text-base text-primary">Data Persistence & Backups</h3>
            <p className="text-xs text-muted mt-0.5">
              Semester Survival stores 100% of your progress locally on this device in browser localStorage (
              <code className="font-mono text-charcoal">semester-survival-data-v1</code>).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-start gap-2.5 text-xs text-secondary-dark">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <div className="leading-relaxed">
              <span className="font-bold">Zero Cloud Tracking: </span>
              Your handwritten remarks, mock test scores, and streak data stay private on your browser. To transfer your progress to another device or create a backup, use the JSON export below.
            </div>
          </div>

          {/* Export JSON */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-primary">Export Progress Backup</h4>
              <p className="text-[11px] text-muted mt-0.5">
                Download all your tasks, questions, and XP transactions as a JSON file.
              </p>
            </div>
            <button
              onClick={exportData}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-soft transition-all shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-accent" />
              <span>Export Backup JSON</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#ECE7D8] space-y-3">
            <div>
              <h4 className="text-xs font-bold text-primary">Restore from JSON Backup</h4>
              <p className="text-[11px] text-muted mt-0.5">
                Upload a previously saved <code className="font-mono text-charcoal">semester-survival-backup.json</code> file.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="text-xs text-charcoal file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-[#ECE7D8] file:text-xs file:font-semibold file:bg-white hover:file:bg-[#FAF8F2] file:cursor-pointer"
              />
            </div>

            {importStatus && (
              <p className="text-xs font-semibold text-secondary-dark">{importStatus}</p>
            )}
          </div>

          {/* Reset Danger Zone */}
          <div className="pt-4 border-t border-red-200 p-4 rounded-2xl bg-red-50/50 border border-red-200">
            <div className="flex items-center gap-2 text-red-800 font-bold text-xs mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Danger Zone: Reset Application Data</span>
            </div>
            <p className="text-[11px] text-red-700/80 mb-3">
              This will erase all custom tasks, rewards, and reset the question bank and timetable to fresh defaults.
            </p>
            <button
              onClick={handleResetConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Reset to Fresh Challenge Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

