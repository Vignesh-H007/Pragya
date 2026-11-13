import React, { useState, useRef, useEffect } from 'react';
import { StudentAgeTier, EscalationTicket } from '../../types';
import {
  Bot,
  Send,
  Paperclip,
  Sparkles,
  ChevronDown,
  Smile,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { EscalateToTeacherModal } from './EscalateToTeacherModal';
import { EscalationsListModal } from './EscalationsListModal';
import { getTeacherForSubject, getEscalationTickets } from '../../utils/escalationStore';

interface StudentAITutorChatProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
}

interface Message {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  time?: string;
  isEscalationSuggestion?: boolean;
  escalationTicket?: EscalationTicket;
}

export const StudentAITutorChat: React.FC<StudentAITutorChatProps> = ({
  tier,
  activeClass,
  activeSubject,
}) => {
  const teacher = getTeacherForSubject(activeSubject);

  // Preset conversations matching the screenshot
  const initialMessagesByTier: Record<StudentAgeTier, Message[]> = {
    primary: [
      {
        id: 'p1',
        sender: 'tutor',
        text: "Hi Aarav! I'm your AI tutor. Ask me anything! We can learn, solve doubts, or even explore fun facts together. What would you like to learn today? 🌟",
      },
      {
        id: 'p2',
        sender: 'student',
        text: 'Tell me a fun fact about animals!',
      },
      {
        id: 'p3',
        sender: 'tutor',
        text: 'Sure! Did you know? A dolphin can sleep with one eye open! They keep half of their brain awake to stay alert in the water. 🐬',
      },
    ],
    middle: [
      {
        id: 'm1',
        sender: 'tutor',
        text: "Hi Aarav! I'm your AI tutor. You can ask me doubts, request explanations, get practice questions or explore concepts in a simple way. What would you like to learn today?",
      },
      {
        id: 'm2',
        sender: 'student',
        text: 'Can you explain photosynthesis in simple words?',
      },
      {
        id: 'm3',
        sender: 'tutor',
        text: 'Sure! Photosynthesis is the process by which plants make their own food using sunlight, water and carbon dioxide. Would you like a diagram to understand it better?',
      },
    ],
    high: [
      {
        id: 'h1',
        sender: 'tutor',
        text: "Hi Aarav! I'm your AI tutor. Ask me any question, get step-by-step explanations, solve past papers, or explore advanced concepts. What would you like to learn today?",
      },
      {
        id: 'h2',
        sender: 'student',
        text: "Explain Newton's third law with a real life example.",
      },
      {
        id: 'h3',
        sender: 'tutor',
        text: "Sure! Newton's third law states that for every action, there is an equal and opposite reaction.\n\nExample: When you push a wall, the wall pushes you back with the same force in the opposite direction. Would you like a diagram or a practice question on this?",
      },
    ],
  };

  const chipsByTier: Record<StudentAgeTier, string[]> = {
    primary: ['Tell me more', 'Show a picture', "I don't understand ❓", 'Ask Teacher 🙋'],
    middle: ['Show a diagram', 'Make it simpler', "I don't understand ❓", 'Ask Teacher 🙋'],
    high: ['Show a diagram', 'Explain in detail', "Still confused? Ask Teacher 🙋", 'Give practice questions'],
  };

  const [messages, setMessages] = useState<Message[]>(initialMessagesByTier[tier]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [escalationsCount, setEscalationsCount] = useState(() => getEscalationTickets().length);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync count on custom event
  useEffect(() => {
    const handleUpdate = () => {
      setEscalationsCount(getEscalationTickets().length);
    };
    window.addEventListener('pragya_escalation_updated', handleUpdate);
    return () => window.removeEventListener('pragya_escalation_updated', handleUpdate);
  }, []);

  // Update messages when switching tier
  useEffect(() => {
    setMessages(initialMessagesByTier[tier]);
  }, [tier]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    // Check if clicking direct "Ask Teacher" chip
    if (text.includes('Ask Teacher')) {
      setEscalateModalOpen(true);
      return;
    }

    const studentMsg: Message = {
      id: Date.now().toString(),
      sender: 'student',
      text,
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInputText('');
    setIsTyping(true);

    const lower = text.toLowerCase();
    const isConfused =
      lower.includes("don't understand") ||
      lower.includes('dont understand') ||
      lower.includes('confused') ||
      lower.includes("can't understand") ||
      lower.includes('cant understand') ||
      lower.includes("still don't get") ||
      lower.includes('hard to understand') ||
      lower.includes('explain again') ||
      lower.includes('stuck');

    // Realistic smart response generator
    setTimeout(() => {
      if (isConfused) {
        // Empathetic escalation response
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: `It's completely normal to feel stuck—concept breakthroughs often happen after exploring different angles! 💡\n\nSince this ${activeSubject} concept isn't clicking through our chat, would you like me to escalate this directly to your teacher, ${teacher.name}? I can send our chat transcript so they can guide you personally!`,
          isEscalationSuggestion: true,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        return;
      }

      let reply = '';
      if (tier === 'primary') {
        if (lower.includes('more') || lower.includes('dolphin')) {
          reply = "Another amazing animal fact: Sea otters hold hands when they sleep so they don't drift apart in the ocean currents! Isn't that sweet? 🦦💖";
        } else if (lower.includes('picture')) {
          reply = "Here is a snapshot idea: Imagine a playful dolphin leaping above sparkling blue ocean waves under a warm yellow sun! 🌊☀️";
        } else {
          reply = `That's a fantastic question for ${activeSubject || 'EVS'}! Let's explore step-by-step together. Want a quick mini-game to test it? 🎈`;
        }
      } else if (tier === 'middle') {
        if (lower.includes('diagram')) {
          reply = "Here is the key diagram formula:\n6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ (Glucose) + 6O₂\nSunlight is trapped by chlorophyll in the chloroplasts!";
        } else if (lower.includes('practice') || lower.includes('question')) {
          reply = "Practice Question: Which gas is released as a byproduct of photosynthesis? (A) Carbon Dioxide, (B) Oxygen, (C) Nitrogen. What do you think?";
        } else if (lower.includes('simpler')) {
          reply = "In super simple terms: Sunlight + Water + Air = Plant Food (Sugar) + Fresh Oxygen for us to breathe! 🌱";
        } else {
          reply = `Great concept question for ${activeClass} ${activeSubject}! Let's break down the main principles clearly.`;
        }
      } else {
        // High School
        if (lower.includes('diagram')) {
          reply = "Consider vector forces: F_A_on_B = -F_B_on_A. The action and reaction forces are equal in magnitude, opposite in direction, and act on two DIFFERENT bodies.";
        } else if (lower.includes('practice')) {
          reply = "Problem: A 60 kg swimmer pushes against the pool wall with a horizontal force of 120 N. Calculate the swimmer's initial acceleration. (Hint: a = F / m)";
        } else if (lower.includes('detail')) {
          reply = "Key nuance: Action and reaction forces never cancel each other out because they act on different objects. For instance, in walking, your shoe exerts force on the ground, and the ground exerts normal and frictional reaction force on your shoe.";
        } else {
          reply = `Let's analyze this ${activeSubject} concept rigorously, deriving from fundamental principles and testing with exam applications.`;
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: reply,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleEscalateSuccess = (ticket: EscalationTicket) => {
    const confirmationMsg: Message = {
      id: Date.now().toString(),
      sender: 'tutor',
      text: `✅ Escalation Ticket #${ticket.ticketNumber} has been delivered to ${ticket.teacherName}! They will review your question and our chat context. You can track their reply in your Escalations queue.`,
      escalationTicket: ticket,
    };
    setMessages((prev) => [...prev, confirmationMsg]);
  };

  // Convert current chat messages to snippet format for modal
  const chatSnippet = messages.map((m) => ({
    sender: m.sender,
    text: m.text,
  }));

  // Styling rules per tier
  const styles = {
    primary: {
      cardBg: 'bg-white/95 border-2 border-rose-200/70',
      headerBg: 'bg-rose-50/70 border-b border-rose-100',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      tutorBubble: 'bg-amber-50/90 text-slate-800 border border-amber-200/70',
      studentBubble: 'bg-rose-500 text-white font-medium shadow-sm',
      chip: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200',
      sendBtn: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20',
      inputBorder: 'border-rose-200 focus-within:border-rose-400 bg-slate-50/70',
      escalateBtn: 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs',
    },
    middle: {
      cardBg: 'bg-white border border-emerald-200/80',
      headerBg: 'bg-emerald-50/50 border-b border-emerald-100',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      tutorBubble: 'bg-slate-50 text-slate-800 border border-slate-200',
      studentBubble: 'bg-teal-600 text-white font-medium shadow-sm',
      chip: 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border-slate-200',
      sendBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20',
      inputBorder: 'border-slate-200 focus-within:border-teal-500 bg-slate-50/50',
      escalateBtn: 'bg-[#9A3412] hover:bg-[#832B0E] text-white shadow-xs',
    },
    high: {
      cardBg: 'bg-slate-900/95 border border-slate-800 text-slate-100',
      headerBg: 'bg-slate-950/70 border-b border-slate-800',
      badge: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      tutorBubble: 'bg-slate-800/90 text-slate-200 border border-slate-700',
      studentBubble: 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20',
      chip: 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700',
      sendBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30',
      inputBorder: 'border-slate-700 focus-within:border-indigo-500 bg-slate-950/80',
      escalateBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs',
    },
  }[tier];

  return (
    <>
      <div className={`rounded-3xl shadow-sm overflow-hidden flex flex-col transition-colors duration-300 ${styles.cardBg}`}>
        {/* Header with Class & Subject badge AND Teacher Escalation Trigger */}
        <div className={`px-4 py-3 flex items-center justify-between gap-3 ${styles.headerBg}`}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              {tier === 'high' ? (
                <Sparkles className="w-4 h-4 text-indigo-400" />
              ) : (
                <Bot className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="leading-tight truncate">
              <span className="text-xs font-bold tracking-tight block">Chat with AI Tutor</span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                Mentor: {teacher.name}
              </span>
            </div>
          </div>

          {/* Right Header Actions: Class Badge + ESCALATE TO TEACHER button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Escalations Tracker button */}
            <button
              onClick={() => setListModalOpen(true)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="View all doubts escalated to teacher"
            >
              <span>📋</span>
              <span className="hidden sm:inline">Doubts</span>
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
                {escalationsCount}
              </span>
            </button>

            {/* Direct Escalate to Teacher button */}
            <button
              onClick={() => setEscalateModalOpen(true)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer hover:scale-105 ${styles.escalateBtn}`}
              title="If you can't understand from AI tutor, send an escalation to your teacher"
            >
              <span>🙋‍♂️</span>
              <span className="hidden sm:inline">Ask Teacher</span>
            </button>

            {/* Dynamic Class & Subject Dropdown Pill */}
            <div className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border shadow-2xs ${styles.badge}`}>
              <span>
                {activeClass} • {activeSubject}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="p-4 space-y-3.5 max-h-[340px] min-h-[230px] overflow-y-auto">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isTutor ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`flex gap-2.5 ${isTutor ? 'justify-start' : 'justify-end items-end'} w-full`}
                >
                  {/* Tutor avatar */}
                  {isTutor && (
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-200">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Chat Bubble */}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isTutor
                        ? `rounded-tl-xs ${styles.tutorBubble}`
                        : `rounded-br-xs ${styles.studentBubble}`
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Student avatar */}
                  {!isTutor && (
                    <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 text-xs font-bold border border-amber-300">
                      👦
                    </div>
                  )}
                </div>

                {/* Escalation Prompt Button inside chat bubble */}
                {msg.isEscalationSuggestion && (
                  <div className="pl-9 mt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setEscalateModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-[11px] font-black shadow-md shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>🙋‍♂️ Yes, Escalate to {teacher.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSendMessage('Can you explain it with an everyday story?')}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition cursor-pointer"
                    >
                      💡 Try Simpler Analogy First
                    </button>
                  </div>
                )}

                {/* Ticket Receipt Card if this message represents an escalation */}
                {msg.escalationTicket && (
                  <div className="pl-9 mt-2 w-full max-w-sm">
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-950 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Forwarded to {msg.escalationTicket.teacherName}</span>
                        </span>
                        <span className="text-[10px] font-black uppercase text-amber-800 px-2 py-0.5 rounded bg-amber-100">
                          #{msg.escalationTicket.ticketNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900 line-clamp-1">
                        Doubt: &ldquo;{msg.escalationTicket.studentDoubt}&rdquo;
                      </p>
                      <button
                        onClick={() => setListModalOpen(true)}
                        className="w-full text-center py-1 rounded-xl bg-white border border-amber-200 text-amber-900 text-[10px] font-bold hover:bg-amber-100/50 transition cursor-pointer"
                      >
                        View Status &amp; Teacher History →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`px-3 py-2 rounded-2xl rounded-tl-xs text-xs flex items-center gap-1.5 ${styles.tutorBubble}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-4 py-2 flex flex-wrap items-center gap-2">
          {chipsByTier[tier].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
                chip.includes('Ask Teacher') || chip.includes("don't understand")
                  ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold hover:bg-rose-100'
                  : styles.chip
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-3 border-t border-slate-200/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all ${styles.inputBorder}`}
          >
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
              title="Attach a worksheet or image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything, or type 'I don't understand' to request teacher help..."
              className="flex-1 bg-transparent text-xs outline-none py-1.5 placeholder-slate-400"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${styles.sendBtn}`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Escalate to Teacher Modal */}
      <EscalateToTeacherModal
        isOpen={escalateModalOpen}
        onClose={() => setEscalateModalOpen(false)}
        tier={tier}
        activeClass={activeClass}
        activeSubject={activeSubject}
        chatSnippet={chatSnippet}
        suggestedTopic={`${activeSubject} - Concept Doubt`}
        onSuccess={handleEscalateSuccess}
      />

      {/* Escalations List & Teacher Replies Modal */}
      <EscalationsListModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        tier={tier}
        onNewEscalationClick={() => setEscalateModalOpen(true)}
      />
    </>
  );
};

