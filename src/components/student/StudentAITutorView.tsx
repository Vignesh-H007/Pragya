import React, { useState, useRef, useEffect } from 'react';
import { StudentAgeTier } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  FileQuestion,
  Volume2,
  Copy,
  ThumbsUp,
  ArrowRight,
  LifeBuoy,
} from 'lucide-react';
import { getTeacherForSubject } from '../../utils/escalationStore';
import { EscalateToTeacherModal } from './EscalateToTeacherModal';

interface StudentAITutorViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
  onNavigateToSyllabus?: () => void;
  onNavigateToQuiz?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  timestamp: string;
  category?: 'explanation' | 'quiz' | 'hint' | 'general';
  suggestedFollowUps?: string[];
  hasAudio?: boolean;
}

export const StudentAITutorView: React.FC<StudentAITutorViewProps> = ({
  tier,
  activeClass,
  activeSubject,
  onNavigateToSyllabus,
  onNavigateToQuiz,
}) => {
  const teacher = getTeacherForSubject(activeSubject);
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState<'explain' | 'stepbystep' | 'quizme' | 'flashcards'>('explain');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialPrompts: Record<StudentAgeTier, string[]> = {
    primary: [
      'Explain like I am 7 years old 🌟',
      'Tell me a fun memory trick! 🧠',
      'Give me an animal analogy 🐶',
      'Ask me an easy riddle! ❓',
    ],
    middle: [
      'Explain with a real-life example 🔍',
      'Step-by-step formula breakdown 📐',
      'What are common exam mistakes? ⚠️',
      'Give me 3 quick practice questions ✍️',
    ],
    high: [
      'Derive key formulas and principles 📊',
      'Show board exam model solution 📝',
      'Compare competing theories & mechanisms 🔬',
      'Provide rapid conceptual review ⚡',
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `Hello! I am your dedicated AI Tutor for **${activeClass} • ${activeSubject}**! 🎓\n\nI can explain any tough chapter, break down tricky homework questions, generate practice quizzes, or help you master difficult exam formulas. How can I help you excel today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps: initialPrompts[tier],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent pedagogical response
    setTimeout(() => {
      let botResponse = '';
      let followUps: string[] = [];

      const query = text.toLowerCase();

      if (query.includes('photosynthesis') || query.includes('plant')) {
        botResponse = `🌱 **Photosynthesis Simplified:**\n\n1. **Ingredients:** Sunlight ☀️ + Water (H₂O) from roots 💧 + Carbon Dioxide (CO₂) from air 💨\n2. **The Kitchen:** Chloroplasts in the leaves contain **chlorophyll**, the green pigment that traps sunlight energy.\n3. **The Feast Produced:** Glucose (Sugar for energy) 🍯 + Oxygen (O₂) released for us to breathe! 🫁\n\n*Equation:* \n6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂`;
        followUps = ['Why do leaves turn yellow in autumn?', 'What happens during the night?', 'Give me a 1-question quiz on this'];
      } else if (query.includes('triangle') || query.includes('pythagor') || query.includes('math') || query.includes('fraction')) {
        botResponse = `📐 **Math Concept Breakdown:**\n\nRemember the golden rule:\n- In a right-angled triangle, the square of the longest side (hypotenuse) equals the sum of squares of the other two sides: **$a^2 + b^2 = c^2$**.\n\n*Example:* If side $a = 3$ and side $b = 4$:\n$3^2 + 4^2 = 9 + 16 = 25$\n$\sqrt{25} = 5$ units! That famous 3-4-5 triangle!`;
        followUps = ['What if the triangle is not right-angled?', 'Give me a practice problem to solve', 'Explain with visual diagram'];
      } else if (query.includes('newton') || query.includes('force') || query.includes('physics')) {
        botResponse = `⚡ **Newton's Laws at a Glance:**\n\n- **1st Law (Inertia):** Objects keep doing what they are doing unless an external force acts (like a rolling ball on grass stopping due to friction).\n- **2nd Law ($F = ma$):** Pushing a heavy truck requires more force than pushing a bicycle to get the same acceleration!\n- **3rd Law (Action-Reaction):** When you jump off a canoe onto a dock, the boat pushes backwards!`;
        followUps = ['Explain terminal velocity', 'Can force exist without mass?', 'Ask teacher for extra homework hints'];
      } else if (query.includes('riddle') || query.includes('trick') || query.includes('fun')) {
        botResponse = `✨ **Quick Brain Teaser:**\n\nI speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? 🤔\n\n*(Answer: An Echo! 🔊)*\n\n**Study Memory Tip:** To remember the colors of the rainbow, think of **VIBGYOR** (Violet, Indigo, Blue, Green, Yellow, Orange, Red)!`;
        followUps = ['Tell me another riddle!', 'Teach me a memory trick for History dates', 'Quiz me now!'];
      } else {
        botResponse = `Great question about **${text}**!\n\nHere is the core concept you need to remember:\n- **Core Principle:** Focus on identifying the fundamental building blocks first before memorizing definitions.\n- **How it applies in ${activeSubject}:** In your ${activeClass} syllabus, examiners love testing this concept by changing variables or using word problems.\n\nWould you like a step-by-step example, a quick 2-minute practice quiz, or should we escalate this to ${teacher.name}?`;
        followUps = ['Show step-by-step example', 'Test me with a quick quiz', 'Escalate doubt to teacher'];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: followUps,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#$`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const themeClasses = {
    primary: {
      card: 'bg-white border-amber-200 shadow-sm',
      headerBg: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      activeTab: 'bg-amber-500 text-white shadow-xs',
      inactiveTab: 'bg-amber-50 text-amber-900 hover:bg-amber-100',
      userBubble: 'bg-amber-500 text-white rounded-2xl rounded-tr-xs',
      botBubble: 'bg-amber-50/70 border border-amber-200/80 text-slate-800 rounded-2xl rounded-tl-xs',
      accentBtn: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
    },
    middle: {
      card: 'bg-white border-emerald-200 shadow-sm',
      headerBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      activeTab: 'bg-emerald-600 text-white shadow-xs',
      inactiveTab: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
      userBubble: 'bg-emerald-600 text-white rounded-2xl rounded-tr-xs',
      botBubble: 'bg-emerald-50/60 border border-emerald-200/80 text-slate-800 rounded-2xl rounded-tl-xs',
      accentBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    },
    high: {
      card: 'bg-[#111827] border-slate-800 shadow-lg text-slate-100',
      headerBg: 'bg-gradient-to-r from-indigo-900 via-slate-900 to-cyan-950 text-white border-b border-indigo-900/60',
      badge: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      activeTab: 'bg-indigo-600 text-white shadow-xs',
      inactiveTab: 'bg-slate-800 text-slate-300 hover:bg-slate-700',
      userBubble: 'bg-indigo-600 text-white rounded-2xl rounded-tr-xs',
      botBubble: 'bg-[#1F2937] border border-slate-700 text-slate-100 rounded-2xl rounded-tl-xs',
      accentBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm',
    },
  }[tier];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl transition-all shadow-md overflow-hidden relative ${themeClasses.headerBg}`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wide">
              <Bot className="w-4 h-4" />
              <span>Pragya 24/7 AI Tutor • {activeClass}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Interactive AI Learning Companion
            </h1>
            <p className="text-xs md:text-sm text-white/90 max-w-2xl">
              Ask anything about {activeSubject}, get step-by-step explanations, generate instant quizzes, or request teacher escalation if you get stuck.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setEscalateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <LifeBuoy className="w-4 h-4 text-rose-600" />
              <span>Ask {teacher.name}</span>
            </button>
            {onNavigateToQuiz && (
              <button
                onClick={onNavigateToQuiz}
                className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 text-white text-xs font-bold backdrop-blur-xs transition flex items-center gap-2 cursor-pointer"
              >
                <FileQuestion className="w-4 h-4" />
                <span>Take Practice Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveMode('explain')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeMode === 'explain' ? themeClasses.activeTab : themeClasses.inactiveTab
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Explain Concept</span>
        </button>
        <button
          onClick={() => setActiveMode('stepbystep')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeMode === 'stepbystep' ? themeClasses.activeTab : themeClasses.inactiveTab
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step-by-Step Problem Solver</span>
        </button>
        <button
          onClick={() => {
            setActiveMode('quizme');
            handleSendMessage('Quiz me with 3 rapid questions on this chapter!');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeMode === 'quizme' ? themeClasses.activeTab : themeClasses.inactiveTab
          }`}
        >
          <FileQuestion className="w-3.5 h-3.5" />
          <span>Instant Quiz Me</span>
        </button>
        <button
          onClick={() => {
            setActiveMode('flashcards');
            handleSendMessage('Give me 3 key revision flashcards with definitions and formulas.');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeMode === 'flashcards' ? themeClasses.activeTab : themeClasses.inactiveTab
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter Flashcards</span>
        </button>
      </div>

      {/* Main Chat Box Container */}
      <div className={`rounded-3xl border flex flex-col h-[560px] overflow-hidden ${themeClasses.card}`}>
        {/* Chat Feed */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] opacity-70">
                <span className="font-bold">
                  {msg.sender === 'student' ? 'You' : 'Pragya AI Tutor'}
                </span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div className={`p-4 max-w-[85%] md:max-w-[78%] text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'student' ? themeClasses.userBubble : themeClasses.botBubble
              }`}>
                {msg.text}

                {/* Assistant Controls: Read Aloud & Copy */}
                {msg.sender === 'tutor' && (
                  <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:opacity-80 transition cursor-pointer text-blue-600 dark:text-cyan-400 font-bold"
                        title="Read out loud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{speakingId === msg.id ? 'Stop Audio' : 'Listen'}</span>
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:opacity-80 transition cursor-pointer opacity-80"
                        title="Copy text"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setEscalateModalOpen(true)}
                      className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <LifeBuoy className="w-3 h-3" />
                      <span>Still confused? Ask {teacher.name}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up quick buttons */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[85%]">
                  {msg.suggestedFollowUps.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{chip}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs opacity-70 p-3 rounded-2xl bg-black/5 dark:bg-white/5 w-fit">
              <Bot className="w-4 h-4 animate-bounce text-emerald-600" />
              <span>Pragya AI is crafting your explanation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
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
              placeholder={`Ask a question about ${activeClass} ${activeSubject}...`}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-slate-900 text-xs md:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses.accentBtn}`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>

      {/* Teacher Escalation Modal */}
      {escalateModalOpen && (
        <EscalateToTeacherModal
          isOpen={escalateModalOpen}
          onClose={() => setEscalateModalOpen(false)}
          activeSubject={activeSubject}
          activeClass={activeClass}
          tier={tier}
          suggestedTopic={`Doubts in ${activeSubject}`}
          onSuccess={() => setEscalateModalOpen(false)}
        />
      )}
    </div>
  );
};
