import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { StudentGapRecord, Subject, RemediationStatus } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface AddGapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newRecord: StudentGapRecord) => void;
  availableTopics: string[];
}

export const AddGapModal: React.FC<AddGapModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  availableTopics,
}) => {
  const { style } = useDashboardTheme();
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('C7-');
  const [subject, setSubject] = useState<Subject>('Mathematics');
  const [topic, setTopic] = useState(availableTopics[0] || 'Integers: Negative Numbers Operations');
  const [conceptDetail, setConceptDetail] = useState('');
  const [score, setScore] = useState(35);
  const [status, setStatus] = useState<RemediationStatus>('Not Fixed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: StudentGapRecord = {
      id: `sg-${Date.now()}`,
      name: name.trim(),
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 90000)}?w=120&auto=format&fit=crop&q=80`,
      rollNumber: rollNumber.trim() || `C7-${Math.floor(Math.random() * 50) + 10}`,
      classGrade: 'Class 7',
      subject,
      failedBasicTopic: topic,
      failedConceptDetail: conceptDetail.trim() || 'Struggled with foundational arithmetic logic.',
      diagnosticScore: Number(score),
      attemptsCount: 1,
      dateFlagged: 'Just now',
      fixedStatus: status,
      sampleFailedQuestion: {
        question: `Test problem for ${topic}`,
        studentAnswer: 'Incorrect response',
        correctAnswer: 'Correct derivation',
        misconception: conceptDetail.trim() || 'Core prerequisite gap.',
      },
    };

    onAdd(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`rounded-3xl max-w-lg w-full border shadow-2xl p-6 space-y-5 ${
          style === 'editorial-command'
            ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div
          className={`flex items-center justify-between pb-3 border-b ${
            style === 'editorial-command' ? 'border-[#DDD4C7]' : 'border-slate-100'
          }`}
        >
          <div>
            <h3
              className={`text-base font-extrabold ${
                style === 'editorial-command' ? 'font-serif text-lg text-[#1C232B]' : 'text-slate-900'
              }`}
            >
              Log Diagnostic Learning Gap
            </h3>
            <p
              className={`text-xs ${
                style === 'editorial-command' ? 'text-[#7C7267]' : 'text-slate-500'
              }`}
            >
              Record a student who failed a basic concept quiz
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition cursor-pointer ${
              style === 'editorial-command'
                ? 'text-[#7C7267] hover:text-[#1C232B] hover:bg-[#EFE9DF]'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label
              className={`block font-bold mb-1 ${
                style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
              }`}
            >
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aryan Khurana"
              className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                style === 'editorial-command'
                  ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                  : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block font-bold mb-1 ${
                  style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
                }`}
              >
                Roll / Student ID
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="C7-31"
                className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                  style === 'editorial-command'
                    ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257] font-mono'
                    : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
                }`}
              />
            </div>

            <div>
              <label
                className={`block font-bold mb-1 ${
                  style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
                }`}
              >
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                  style === 'editorial-command'
                    ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                    : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
                }`}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>
          </div>

          <div>
            <label
              className={`block font-bold mb-1 ${
                style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
              }`}
            >
              Failed Basic Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                style === 'editorial-command'
                  ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                  : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
              }`}
            >
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block font-bold mb-1 ${
                style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
              }`}
            >
              Specific Misconception / Error Observed
            </label>
            <input
              type="text"
              value={conceptDetail}
              onChange={(e) => setConceptDetail(e.target.value)}
              placeholder="e.g. Confuses negative product sign with addition"
              className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                style === 'editorial-command'
                  ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                  : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block font-bold mb-1 ${
                  style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
                }`}
              >
                Diagnostic Score: {score}%
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className={`w-full cursor-pointer ${
                  style === 'editorial-command' ? 'accent-[#246257]' : 'accent-blue-600'
                }`}
              />
            </div>

            <div>
              <label
                className={`block font-bold mb-1 ${
                  style === 'editorial-command' ? 'text-[#1C232B]' : 'text-slate-700'
                }`}
              >
                Current Remediation Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RemediationStatus)}
                className={`w-full p-2.5 rounded-xl border focus:outline-none transition ${
                  style === 'editorial-command'
                    ? 'bg-white focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                    : 'bg-slate-50 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
                }`}
              >
                <option value="Not Fixed">Not Fixed (Needs Help)</option>
                <option value="In Progress">In Progress (Remediating)</option>
                <option value="Fixed">Fixed (Mastered)</option>
              </select>
            </div>
          </div>

          <div
            className={`flex items-center justify-end gap-2 pt-3 border-t ${
              style === 'editorial-command' ? 'border-[#DDD4C7]' : 'border-slate-100'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer ${
                style === 'editorial-command'
                  ? 'text-[#5C6670] hover:bg-[#EFE9DF]'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl font-bold transition shadow-xs cursor-pointer text-white ${
                style === 'editorial-command'
                  ? 'bg-[#246257] hover:bg-[#1D4F46]'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Save Diagnostic Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
