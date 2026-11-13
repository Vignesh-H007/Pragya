import React, { useState } from 'react';
import {
  X,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { StudentGapRecord, RemediationStatus } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface StudentDetailModalProps {
  student: StudentGapRecord | null;
  onClose: () => void;
  onUpdateStatus: (studentId: string, status: RemediationStatus) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onUpdateStatus,
}) => {
  const { style } = useDashboardTheme();
  if (!student) return null;

  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello! I'm Pragya AI Tutor. I'm analyzing ${student.name}'s roadblock in "${student.failedBasicTopic}". How would you like to address this misconception?`,
    },
    {
      sender: 'user',
      text: `Can you explain why ${student.name} failed this question and suggest a visual analogy?`,
    },
    {
      sender: 'ai',
      text: `Sure! ${student.name} is struggling with: "${student.sampleFailedQuestion?.misconception || 'Signs rule confusion'}". \n\nReal life example: Imagine a submarine or elevator. If you start 3 floors down (-3) and go 5 floors up, you end at floor +2. I have prepared 3 interactive lift simulation questions for them!`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setAiChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Great instruction! I've assigned an adaptive practice module on "${student.failedBasicTopic}" with step-by-step hints to ${student.name}'s student dashboard.`,
        },
      ]);
    }, 600);
  };

  const sampleQ = student.sampleFailedQuestion || {
    question: `Evaluate the basic principle in ${student.failedBasicTopic}`,
    studentAnswer: 'Incorrect sign (-)',
    correctAnswer: 'Positive (+)',
    misconception: 'Arithmetic sign transposition confusion.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="student-diagnostic-modal"
        className={`rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl flex flex-col ${
          style === 'editorial-command'
            ? 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-5 border-b flex items-center justify-between sticky top-0 backdrop-blur-xs z-10 ${
            style === 'editorial-command'
              ? 'bg-[#FAF7F0]/95 border-[#DDD4C7]'
              : 'bg-white/95 border-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className={`w-11 h-11 rounded-full object-cover ring-2 ${
                style === 'editorial-command' ? 'ring-[#246257]/30' : 'ring-blue-500/20'
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-base font-extrabold ${
                    style === 'editorial-command' ? 'font-serif text-[#1C232B] text-lg font-normal' : 'text-slate-900'
                  }`}
                >
                  {student.name}
                </h3>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    style === 'editorial-command'
                      ? 'bg-[#E5F2EE] text-[#246257] font-mono border border-[#BFDFD6]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {student.rollNumber}
                </span>
              </div>
              <p
                className={`text-xs ${
                  style === 'editorial-command' ? 'text-[#7C7267]' : 'text-slate-500'
                }`}
              >
                {student.classGrade} • {student.subject} Diagnostic Profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition cursor-pointer ${
              style === 'editorial-command'
                ? 'text-[#7C7267] hover:text-[#1C232B] hover:bg-[#EFE9DF]'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Status & Topic Overview */}
          <div
            className={`rounded-2xl p-4 border space-y-3 ${
              style === 'editorial-command'
                ? 'bg-white border-[#DDD4C7]'
                : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    style === 'editorial-command' ? 'text-[#7C7267] font-mono' : 'text-slate-400'
                  }`}
                >
                  Failed Basic Topic
                </span>
                <h4
                  className={`text-sm font-extrabold ${
                    style === 'editorial-command' ? 'font-serif text-base text-[#1C232B]' : 'text-slate-900'
                  }`}
                >
                  {student.failedBasicTopic}
                </h4>
              </div>

              {/* Status Switcher */}
              <div
                className={`flex items-center gap-1.5 p-1 rounded-xl border ${
                  style === 'editorial-command'
                    ? 'bg-[#FAF7F0] border-[#DDD4C7]'
                    : 'bg-white border-slate-200'
                }`}
              >
                {(['Not Fixed', 'In Progress', 'Fixed'] as RemediationStatus[]).map((st) => {
                  const active = student.fixedStatus === st;
                  return (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(student.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        active
                          ? st === 'Fixed'
                            ? style === 'editorial-command'
                              ? 'bg-[#246257] text-white shadow-2xs'
                              : 'bg-emerald-600 text-white'
                            : st === 'In Progress'
                            ? 'bg-amber-500 text-white'
                            : style === 'editorial-command'
                            ? 'bg-[#C25E3E] text-white'
                            : 'bg-rose-600 text-white'
                          : style === 'editorial-command'
                          ? 'text-[#5C6670] hover:bg-[#EFE9DF]'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            <p
              className={`text-xs ${
                style === 'editorial-command' ? 'text-[#5C6670]' : 'text-slate-600'
              }`}
            >
              <strong>Specific Difficulty: </strong> {student.failedConceptDetail}
            </p>
          </div>

          {/* Diagnostic Question Breakdown */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>Diagnostic Question Missed by {student.name}</span>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-blue-100/80 font-mono text-xs text-slate-800">
              {sampleQ.question}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase text-rose-700 block mb-0.5">
                  Student's Incorrect Answer
                </span>
                <span className="font-bold text-rose-900 text-sm font-mono">
                  {sampleQ.studentAnswer}
                </span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-0.5">
                  Expected Correct Answer
                </span>
                <span className="font-bold text-emerald-900 text-sm font-mono">
                  {sampleQ.correctAnswer}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80">
              <strong className="text-slate-900">Cognitive Misconception: </strong>
              {sampleQ.misconception}
            </div>
          </div>

          {/* LearnBuddy AI Tutor Remediation Chat (matching 1.2.jpeg Chat with AI Tutor!) */}
          <div
            className={`rounded-2xl border p-4 space-y-3 ${
              style === 'editorial-command'
                ? 'bg-white border-[#DDD4C7]'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                    style === 'editorial-command' ? 'bg-[#246257]' : 'bg-blue-600'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold ${
                      style === 'editorial-command' ? 'font-serif text-[#1C232B] text-sm' : 'text-slate-900'
                    }`}
                  >
                    Pragya Remedial AI Coach
                  </h4>
                  <p className="text-[10px] text-slate-400">Class 7 • Mathematics Assistant</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  style === 'editorial-command'
                    ? 'bg-[#E5F2EE] text-[#246257] border-[#BFDFD6] font-mono'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                Online
              </span>
            </div>

            {/* Chat Messages Log */}
            <div
              className={`space-y-2.5 max-h-48 overflow-y-auto p-2 rounded-xl text-xs ${
                style === 'editorial-command' ? 'bg-[#FAF7F0] border border-[#EBE3D5]' : 'bg-slate-50'
              }`}
            >
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? style === 'editorial-command'
                          ? 'bg-[#246257] text-white rounded-tr-xs'
                          : 'bg-blue-600 text-white rounded-tr-xs'
                        : style === 'editorial-command'
                        ? 'bg-white text-[#1C232B] border border-[#DDD4C7] rounded-tl-xs shadow-2xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Pills (matching 1.2.jpeg pills) */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Give practice questions',
                'Explain with a diagram',
                'Make it simpler',
                'Tell me a real life example',
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => {
                    setChatInput(pill);
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition cursor-pointer border ${
                    style === 'editorial-command'
                      ? 'text-[#246257] bg-[#E5F2EE] hover:bg-[#D5EAE3] border-[#BFDFD6]'
                      : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200/70'
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Chat input box */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask AI Tutor to generate adaptive practice..."
                className={`flex-1 text-xs px-3 py-2 rounded-xl border focus:outline-none transition ${
                  style === 'editorial-command'
                    ? 'bg-[#FAF7F0] focus:bg-white text-[#1C232B] border-[#DDD4C7] focus:border-[#246257]'
                    : 'bg-slate-100 focus:bg-white text-slate-800 border-slate-200 focus:border-blue-400'
                }`}
              />
              <button
                onClick={handleSendMessage}
                className={`p-2 rounded-xl transition cursor-pointer shadow-2xs text-white ${
                  style === 'editorial-command'
                    ? 'bg-[#246257] hover:bg-[#1D4F46]'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between rounded-b-3xl ${
            style === 'editorial-command'
              ? 'bg-[#FAF7F0] border-[#DDD4C7]'
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          <button
            onClick={() => {
              onUpdateStatus(student.id, student.fixedStatus === 'Fixed' ? 'Not Fixed' : 'Fixed');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              student.fixedStatus === 'Fixed'
                ? style === 'editorial-command'
                  ? 'bg-[#EFE9DF] text-[#5C6670] hover:bg-[#E5DDCF]'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : style === 'editorial-command'
                ? 'bg-[#246257] text-white hover:bg-[#1D4F46] shadow-2xs'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
            }`}
          >
            {student.fixedStatus === 'Fixed' ? 'Reopen Gap' : 'Mark as Fixed & Retested'}
          </button>

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              style === 'editorial-command'
                ? 'text-[#5C6670] hover:bg-[#EFE9DF]'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
