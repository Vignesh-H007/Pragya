import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Volume2,
  Copy,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '../../types';
import { useDashboardTheme } from '../../context/ThemeContext';

interface FloatingAITutorProps {
  role?: UserRole;
  currentClass?: string;
  currentSubject?: string;
}

interface FloatingMessage {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  time: string;
  chips?: string[];
}

export const FloatingAITutor: React.FC<FloatingAITutorProps> = ({
  role = 'faculty',
  currentClass = 'Class 7',
  currentSubject = 'Mathematics',
}) => {
  const { style } = useDashboardTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Role-specific initial prompts and messages
  const defaultContext = {
    student: {
      title: 'Pragya AI Study Buddy',
      subtitle: `Assisting with ${currentClass} • ${currentSubject}`,
      badge: '24/7 AI Tutor',
      welcome: `Hi there! I'm your AI Study Buddy! 🚀 Ask me any homework doubt, math formula, science concept, or request a quick practice quiz. What are you studying right now?`,
      chips: [
        'Explain photosynthesis simply 🌿',
        'Solve Pythagorean theorem step-by-step 📐',
        'What are Newton\'s 3 Laws? ⚡',
        'Give me a 2-minute quick quiz ✍️',
      ],
    },
    parent: {
      title: 'Parent Learning Advisor',
      subtitle: `Academic Guidance for ${currentClass}`,
      badge: 'Family Advisor',
      welcome: `Hello! I am your AI Parent Learning Advisor. I can help interpret diagnostic scores, suggest home support strategies, and answer questions about the curriculum. How can I assist your family today?`,
      chips: [
        'How can I help my child in Math? 📚',
        'Explain this week\'s diagnostic report 📊',
        'Healthy study routines for Class 7 ⏰',
        'How to reduce exam anxiety? 💡',
      ],
    },
    faculty: {
      title: 'Pragya AI Faculty Co-Pilot',
      subtitle: `Curriculum & Diagnostic Assistant (${currentClass})`,
      badge: 'Teaching Co-Pilot',
      welcome: `Greetings Professor. I am your Pragya Pedagogical Assistant. I can help draft targeted remediation micro-lessons, construct formative exit tickets, analyze class failure bottlenecks, or synthesize parent progress notes.`,
      chips: [
        'Draft 3-tier remediation for Math 🎯',
        'Suggest concrete-to-abstract micro-lesson 📝',
        'Analyze common misconception distractor 🔍',
        'Draft parent alert for inactive students ✉️',
      ],
    },
  }[role || 'faculty'];

  const [messages, setMessages] = useState<FloatingMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: defaultContext.welcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chips: defaultContext.chips,
    },
  ]);

  // Update welcome message if role changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${role}`,
        sender: 'tutor',
        text: defaultContext.welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: defaultContext.chips,
      },
    ]);
  }, [role, currentClass, currentSubject]);

  // Global event listener for custom "Ask AI Tutor" requests across all pages
  useEffect(() => {
    const handleAskAITutor = (event: Event) => {
      const customEvent = event as CustomEvent<{ question?: string; autoSend?: boolean }>;
      if (customEvent.detail?.question) {
        setIsOpen(true);
        handleSendMessage(customEvent.detail.question);
      }
    };
    window.addEventListener('pragya_ask_ai_tutor', handleAskAITutor);
    return () => window.removeEventListener('pragya_ask_ai_tutor', handleAskAITutor);
  }, [role, currentSubject]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: FloatingMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let nextChips: string[] = [];
      const lower = text.toLowerCase();

      if (role === 'student') {
        if (lower.includes('photo') || lower.includes('plant') || lower.includes('chloroplast')) {
          reply = `🌱 **Photosynthesis Breakdown:**\nPlants convert **Sunlight + Water (H₂O) + Carbon Dioxide (CO₂)** into **Glucose (Food)** and **Oxygen (O₂)** inside chloroplasts with chlorophyll!\n\nEquation: 6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂\n\n*Key Tip:* Light energy is absorbed by chlorophyll pigment in the thylakoid membrane!`;
          nextChips = ['Why do leaves change color?', 'Quiz me on photosynthesis', 'Give me a memory trick'];
        } else if (lower.includes('pythag') || lower.includes('triangle') || lower.includes('hypotenuse')) {
          reply = `📐 **Pythagoras Theorem:**\nIn any right-angled triangle: **a² + b² = c²**, where **c** is the hypotenuse (the longest side opposite the 90° angle).\n\n*Classic Pythagorean Triples to memorize:*\n• 3, 4, 5 (since 9 + 16 = 25)\n• 5, 12, 13 (since 25 + 144 = 169)\n• 8, 15, 17`;
          nextChips = ['How to find the shortest side?', 'Quiz me on triangles', 'Show a real-world problem'];
        } else if (lower.includes('integer') || lower.includes('negative') || lower.includes('subtract')) {
          reply = `🔢 **Integer Subtraction Secret:**\nRemember: **Subtracting a negative is the exact same as adding a positive!**\n\nFormula: a - (-b) = a + b\nExample: 5 - (-3) = 5 + 3 = 8\n\nThink of taking away debt — you become richer!`;
          nextChips = ['Give me 3 practice problems', 'Rules for multiplication', 'Quiz me now'];
        } else if (lower.includes('fraction') || lower.includes('denominator')) {
          reply = `🍰 **Fractions Made Simple:**\nTo add or subtract fractions, they must share a **Common Denominator** (same size slices!)\n\nExample: 1/2 + 1/4 ➔ convert 1/2 into 2/4 ➔ 2/4 + 1/4 = 3/4!`;
          nextChips = ['How to multiply fractions?', 'Give a quick practice question', 'What is an improper fraction?'];
        } else if (lower.includes('badge') || lower.includes('medal') || lower.includes('unlock')) {
          reply = `🏆 **Quest Medal Unlock Strategy:**\nTo unlock scholar badges:\n• Complete chapter practice quizzes with ≥80% score\n• Maintain your weekly study streak (log in daily)\n• Resolve flagged diagnostic roadblock concepts in the Student Matrix!\n\nCheck your **Achievements & Quest Badges** tab to view remaining XP requirements!`;
          nextChips = ['How much XP to Level 5?', 'Take a practice quiz', 'Review my flashcards'];
        } else if (lower.includes('drill') || lower.includes('practice') || lower.includes('quiz')) {
          reply = `🎯 **Adaptive Practice Question for ${currentSubject}:**\nWhat is the absolute value of -17, and which side of zero does it lie on the number line?\n\nA) 17, right side of 0\nB) -17, left side of 0\nC) 0, origin\n\n*Reply with your answer and I'll verify step-by-step!*`;
          nextChips = ['Option A: 17', 'Option B: -17', 'Option C: 0'];
        } else {
          reply = `That's a fantastic academic inquiry! In ${currentSubject}, the best way to master this is to understand the fundamental mechanism, test yourself with a quick problem, and connect it to a real-world scenario. Would you like a practice challenge, flashcard summary, or step-by-step walkthrough?`;
          nextChips = ['Step-by-step example', 'Quick 2-minute quiz', 'Explain more simply'];
        }
      } else if (role === 'parent') {
        if (lower.includes('math') || lower.includes('help')) {
          reply = `💡 **Home Support Strategies for ${currentClass} Math:**\n1. **Focus on Reasoning over Speed:** Praise their problem-solving steps rather than quick mental answers.\n2. **Daily 20-min Habit:** Consistent daily mini-sessions retain 40% more than cramming.\n3. **Use Pragya Quest Map:** Encourage 1 chapter trail every 2 days to reinforce foundational biomes.`;
          nextChips = ['How to praise effort?', 'Recommend weekly study schedule', 'Contact teacher'];
        } else {
          reply = `Thank you for supporting your child's learning journey! Based on class analytics for ${currentClass}, staying engaged with regular positive reinforcement and reviewing chapter exit-tickets makes a noticeable difference.`;
          nextChips = ['Review this week\'s progress', 'Tips for exam confidence', 'Ask teacher a question'];
        }
      } else {
        // Faculty Co-Pilot
        if (lower.includes('remediation') || lower.includes('tier')) {
          reply = `📋 **Targeted 3-Tier Remediation Plan (${currentClass}):**\n• **Tier 1 (Core Class):** 10-minute Concrete-to-Abstract (CPA) manipulative warm-up.\n• **Tier 2 (Struggling Quartile):** Visual scaffolded formula cards with common distractor analysis.\n• **Tier 3 (Individual Intervention):** 1-on-1 diagnostic peer pairing and gamified checkpoint test.`;
          nextChips = ['Export remediation to class', 'Draft exit ticket questions', 'Send parent advisory'];
        } else if (lower.includes('exit') || lower.includes('quiz')) {
          reply = `✍️ **Formative Exit-Ticket (3 Items):**\n1. Conceptual anchor question (definitions/properties).\n2. Computational verification (requires showing work).\n3. Common misconception distractor check (diagnoses trap reasoning).`;
          nextChips = ['Assign to Class 7', 'Show answer key', 'Create similar quiz'];
        } else {
          reply = `Analyzing pedagogical data for ${currentClass} • ${currentSubject}:\nI recommend pairing formative diagnostics with immediate feedback loops. Would you like me to generate a lesson plan, draft remedial practice, or analyze student roadblock metrics?`;
          nextChips = ['Draft remedial lesson', 'Inspect roadblock heatmaps', 'Draft parent update'];
        }
      }

      const botMsg: FloatingMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: nextChips,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*_#$`]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          className={`mb-3 flex flex-col rounded-3xl border shadow-2xl transition-all duration-300 overflow-hidden ${
            isExpanded
              ? 'w-[90vw] md:w-[600px] h-[80vh] max-h-[700px]'
              : 'w-[92vw] sm:w-[380px] md:w-[420px] h-[520px]'
          } ${
            isDark
              ? 'bg-[#0D0F17]/95 border-white/[0.12] text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
              : style === 'academic-warm'
              ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`p-4 border-b flex items-center justify-between gap-3 ${
              isDark
                ? 'bg-gradient-to-r from-[#0D0F17] via-[#161925] to-[#0D0F17] border-white/10 text-white'
                : role === 'student'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white'
                : role === 'parent'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs ${
                isDark ? 'bg-white/[0.08] border border-white/15' : 'bg-white/20 backdrop-blur-xs'
              }`}>
                <Bot className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-white'}`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm tracking-tight">{defaultContext.title}</h3>
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                    isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/25 text-white'
                  }`}>
                    {defaultContext.badge}
                  </span>
                </div>
                <p className={`text-[11px] leading-tight ${isDark ? 'text-[#8E95A5]' : 'opacity-85'}`}>{defaultContext.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
                title={isExpanded ? 'Collapse size' : 'Expand size'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
                title="Close AI Tutor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] opacity-60 mb-1 px-1 font-semibold">
                  {m.sender === 'user' ? 'You' : 'AI Tutor'} • {m.time}
                </div>

                <div
                  className={`p-3.5 max-w-[88%] rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                    m.sender === 'user'
                      ? isDark
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-tr-xs shadow-md shadow-amber-500/20'
                        : role === 'student'
                        ? 'bg-emerald-600 text-white rounded-tr-xs'
                        : 'bg-indigo-600 text-white rounded-tr-xs'
                      : isDark
                      ? 'bg-white/[0.05] border border-white/[0.08] text-slate-100 rounded-tl-xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-xs'
                  }`}
                >
                  {m.text}

                  {m.sender === 'tutor' && (
                    <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 text-[10px]">
                      <button
                        onClick={() => handleSpeak(m.id, m.text)}
                        className={`font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                          isDark ? 'text-amber-400' : 'text-emerald-600'
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{speakingId === m.id ? 'Stop' : 'Listen'}</span>
                      </button>
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="opacity-70 hover:opacity-100 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Quick Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 max-w-[88%]">
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                          isDark
                            ? 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.12]'
                            : 'border-black/10 bg-black/5 hover:bg-black/10 text-slate-700'
                        }`}
                      >
                        <span>{chip}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className={`flex items-center gap-1.5 text-[11px] p-2 rounded-xl w-fit ${
                isDark ? 'bg-white/[0.05] border border-white/10 text-slate-300' : 'bg-black/5 text-slate-600'
              }`}>
                <Bot className={`w-3.5 h-3.5 animate-bounce ${isDark ? 'text-amber-400' : 'text-emerald-600'}`} />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className={`p-3 border-t ${isDark ? 'border-white/10 bg-[#07080B]/80' : 'border-black/10 bg-black/5'}`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  role === 'student'
                    ? 'Ask homework doubt or concept...'
                    : role === 'parent'
                    ? 'Ask about progress, study tips...'
                    : 'Ask about remediation, exit tickets...'
                }
                className={`flex-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-hidden focus:ring-2 ${
                  isDark
                    ? 'bg-white/[0.05] border-white/15 text-white placeholder-[#8E95A5] focus:ring-amber-400'
                    : 'border-black/15 bg-white text-slate-900 focus:ring-emerald-500'
                }`}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className={`p-2 rounded-xl transition cursor-pointer disabled:opacity-50 ${
                  isDark
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow-sm'
                    : role === 'student'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : role === 'parent'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Launcher Pill Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group px-4 py-3 rounded-full active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
          isDark
            ? 'bg-[#0D0F17]/95 hover:bg-[#161925] text-white border border-white/20 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/20'
            : 'bg-[#00875A] hover:bg-[#00704A] text-white shadow-xl ring-4 ring-emerald-500/20'
        }`}
        aria-label="Toggle Floating AI Tutor"
      >
        <div className="relative">
          <Bot className={`w-5 h-5 transition-transform group-hover:scale-110 ${isDark ? 'text-amber-400' : 'text-white'}`} />
          <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse ${
            isDark ? 'bg-amber-400 ring-2 ring-[#07080B]' : 'bg-amber-400 ring-2 ring-emerald-600'
          }`} />
        </div>
        <span className="text-xs font-black tracking-wide pr-0.5">
          {isOpen ? 'Close AI Tutor' : 'AI Tutor'}
        </span>
        <Sparkles className={`w-3.5 h-3.5 fill-current ${isDark ? 'text-amber-400' : 'text-amber-300'}`} />
      </button>
    </div>
  );
};
