import React, { useState, useMemo } from 'react';
import { StudentAgeTier } from '../../types';
import {
  FileText,
  Plus,
  Trash2,
  Pin,
  Sparkles,
  Search,
  BookOpen,
  Copy,
  CheckCircle2,
  Tag,
  Save,
  Clock,
  Lightbulb,
  Layers,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Shuffle,
  Flame,
  Trophy,
} from 'lucide-react';
import { useDashboardTheme } from '../../context/ThemeContext';

interface StudentNotesViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  activeSubject: string;
}

interface NoteItem {
  id: string;
  title: string;
  subject: string;
  content: string;
  date: string;
  isPinned: boolean;
  isAISummary?: boolean;
}

export const StudentNotesView: React.FC<StudentNotesViewProps> = ({
  tier,
  activeClass,
  activeSubject,
}) => {
  const { style } = useDashboardTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [activeViewMode, setActiveViewMode] = useState<'notes' | 'flashcards'>('notes');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState(activeSubject);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [flashcardMasteredIds, setFlashcardMasteredIds] = useState<Record<string, boolean>>({});

  const initialFlashcards = [
    {
      id: 'fc-1',
      subject: 'Mathematics',
      front: 'What is the Pythagorean Theorem equation and its conditions?',
      back: 'Formula: a² + b² = c²\n\nCondition: Only applies to right-angled triangles (where c is the hypotenuse opposite the 90° angle). Famous triples: (3, 4, 5) and (5, 12, 13).',
      topic: 'Geometry & Triangles',
    },
    {
      id: 'fc-2',
      subject: 'Science',
      front: 'What is the chemical balanced equation for Photosynthesis?',
      back: '6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂\n\nOccurs in the chloroplasts using chlorophyll to absorb sunlight. Guard cells regulate CO₂ intake through leaf stomata.',
      topic: 'Plant Physiology',
    },
    {
      id: 'fc-3',
      subject: 'Physics',
      front: 'State Ohm’s Law and its mathematical relationship.',
      back: 'V = I × R\n\n(Voltage = Current × Resistance). Current is directly proportional to voltage and inversely proportional to resistance at constant temperature.',
      topic: 'Current Electricity',
    },
    {
      id: 'fc-4',
      subject: 'English',
      front: 'How do you convert an Active Voice sentence to Passive Voice?',
      back: 'Active: [Subject] + [Verb] + [Object]\nPassive: [Object] + [Form of "to be"] + [Past Participle V3] + by [Subject]\n\nExample: "She solved the quiz" ➔ "The quiz was solved by her".',
      topic: 'Grammar Mastery',
    },
    {
      id: 'fc-5',
      subject: 'Mathematics',
      front: 'What is the sum of interior angles of any triangle?',
      back: '180 Degrees (π radians)\n\nExterior Angle Theorem: An exterior angle of a triangle is equal to the sum of the two opposite interior angles.',
      topic: 'Triangle Theorems',
    },
  ];

  const [flashcards, setFlashcards] = useState(initialFlashcards);

  const filteredFlashcards = flashcards.filter(
    (fc) => selectedSubjectFilter === 'All' || fc.subject.toLowerCase() === selectedSubjectFilter.toLowerCase()
  );

  const currentFlashcard = filteredFlashcards[activeCardIndex] || filteredFlashcards[0] || initialFlashcards[0];

  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note-1',
      title: 'Pythagorean Theorem & Right Triangles',
      subject: 'Mathematics',
      content: 'Formula: a² + b² = c² (where c is the hypotenuse).\n• Famous Pythagorean triples to memorize for quick test solving: (3, 4, 5), (5, 12, 13), (8, 15, 17).\n• Only works on 90° right-angled triangles!',
      date: 'Sep 16, 2026',
      isPinned: true,
      isAISummary: true,
    },
    {
      id: 'note-2',
      title: 'Photosynthesis Master Equation',
      subject: 'Science',
      content: '6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂\n• Chlorophyll in chloroplasts absorbs blue and red wavelengths, reflecting green.\n• Stomata on leaves open/close via guard cells to regulate gas exchange.',
      date: 'Sep 15, 2026',
      isPinned: true,
      isAISummary: false,
    },
    {
      id: 'note-3',
      title: 'Newton\'s Laws of Motion - Quick Summary',
      subject: 'Physics',
      content: '1. Law of Inertia: Resting bodies stay at rest.\n2. F = ma: Force = Mass × Acceleration.\n3. Action = Reaction: Every action has an equal & opposite reaction.',
      date: 'Sep 14, 2026',
      isPinned: false,
      isAISummary: true,
    },
    {
      id: 'note-4',
      title: 'Active vs Passive Voice Key Rules',
      subject: 'English',
      content: 'Active: Subject performs the action (e.g., "Aarav wrote the test").\nPassive: Action happens to the subject (e.g., "The test was written by Aarav").\nAlways check for the past participle (V3) form!',
      date: 'Sep 12, 2026',
      isPinned: false,
      isAISummary: false,
    },
  ]);

  // Exact Theme Grading definitions
  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          bannerBg: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-xs',
          badge: 'bg-[#246257] text-white',
          subtitleText: 'text-[#5C6670]',
          accentBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          secondaryBtn: 'bg-white border-[#DDD4C7] text-[#1C232B] hover:bg-[#F4EFEA]',
          cardBase: 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-xs',
          cardPinned: 'bg-[#FAF7F0] border-[#246257]/50 text-[#1C232B] shadow-xs',
          inputBg: 'bg-[#F4EFEA]/70 border-[#DDD4C7] text-[#1C232B]',
          tagActive: 'bg-[#246257] text-white',
          tagInactive: 'bg-white border-[#DDD4C7] text-[#5C6670] hover:text-[#1C232B]',
          pinColor: 'text-[#C85340]',
          highlightColor: 'text-[#246257]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          bannerBg: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          badge: 'bg-white/[0.08] text-white border border-white/15',
          subtitleText: 'text-[#8E95A5]',
          accentBtn: 'bg-white text-slate-950 font-black hover:bg-slate-200 shadow-md shadow-white/10',
          secondaryBtn: 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]',
          cardBase: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          cardPinned: 'bg-[#121520] border-white/25 text-white shadow-2xl shadow-black/80 ring-1 ring-white/10',
          inputBg: 'bg-white/[0.04] border-white/10 text-white focus:border-white/30',
          tagActive: 'bg-white text-slate-950 font-black shadow-md shadow-white/10',
          tagInactive: 'bg-white/[0.04] border-white/10 text-[#8E95A5] hover:text-white',
          pinColor: 'text-amber-400',
          highlightColor: 'text-amber-400',
        };
      case 'academic-warm':
        return {
          bannerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          badge: 'bg-[#8C4A2F] text-white',
          subtitleText: 'text-[#5C5346]',
          accentBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D] hover:bg-[#EAE4D8]',
          cardBase: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          cardPinned: 'bg-[#FAF7F2] border-[#8C4A2F]/50 text-[#28231D] shadow-xs',
          inputBg: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D]',
          tagActive: 'bg-[#8C4A2F] text-white shadow-xs',
          tagInactive: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#5C5346] hover:text-[#28231D]',
          pinColor: 'text-[#B45309]',
          highlightColor: 'text-[#8C4A2F]',
        };
      case 'clean':
      default:
        return {
          bannerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          badge: 'bg-blue-600 text-white',
          subtitleText: 'text-slate-500',
          accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          secondaryBtn: 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100',
          cardBase: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          cardPinned: 'bg-blue-50/40 border-blue-300 text-slate-900 shadow-xs',
          inputBg: 'bg-slate-50 border-slate-200 text-slate-900',
          tagActive: 'bg-blue-600 text-white shadow-xs',
          tagInactive: 'bg-white border-slate-200 text-slate-600 hover:text-slate-900',
          pinColor: 'text-amber-500',
          highlightColor: 'text-blue-600',
        };
    }
  }, [style]);

  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSaveNewNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNoteObj: NoteItem = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      content: newContent.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isPinned: false,
    };

    setNotes((prev) => [newNoteObj, ...prev]);
    setNewTitle('');
    setNewContent('');
    setIsCreatingNew(false);
  };

  const handleGenerateAISummary = () => {
    const aiNote: NoteItem = {
      id: `ai-note-${Date.now()}`,
      title: `AI High-Yield Review: ${activeSubject} Exam Core`,
      subject: activeSubject,
      content: `• Key diagnostic principles for ${activeClass} ${activeSubject}:\n1. Memorize the fundamental formula definitions before attempting word problems.\n2. Always verify dimensional units (e.g., m/s² vs m/s).\n3. Keep a dedicated formula cheat-sheet before diagnostic benchmark tests.`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isPinned: true,
      isAISummary: true,
    };

    setNotes((prev) => [aiNote, ...prev]);
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubjectFilter === 'All' ||
      n.subject.toLowerCase() === selectedSubjectFilter.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const regularNotes = filteredNotes.filter((n) => !n.isPinned);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Banner - Theme Graded */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 ${themeGrading.bannerBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-2xs w-fit">
              <span className={`px-2 py-0.5 rounded-md ${themeGrading.badge}`}>
                {activeClass}
              </span>
              <span className="font-bold opacity-80">Notebook & Revision Studio</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Study Notes & Revision Flashcards
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${themeGrading.subtitleText}`}>
              Organize conceptual cheat-sheets, track tricky test formulas, or generate high-yield AI chapter summaries with instant export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleGenerateAISummary}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${themeGrading.secondaryBtn}`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Summarize Chapter</span>
            </button>
            <button
              onClick={() => setIsCreatingNew(true)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${themeGrading.accentBtn}`}
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Mode Switcher & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* View Mode Toggle Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
          <button
            onClick={() => setActiveViewMode('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeViewMode === 'notes' ? themeGrading.tagActive : themeGrading.tagInactive
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Study Notes</span>
            <span className="px-1.5 py-0.2 rounded-md text-[10px] bg-black/20 dark:bg-white/20">
              {filteredNotes.length}
            </span>
          </button>
          <button
            onClick={() => setActiveViewMode('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeViewMode === 'flashcards' ? themeGrading.tagActive : themeGrading.tagInactive
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Revision Flashcards</span>
            <span className="px-1.5 py-0.2 rounded-md text-[10px] bg-black/20 dark:bg-white/20">
              {filteredFlashcards.length}
            </span>
          </button>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Mathematics', 'Science', 'Physics', 'English'].map((subj) => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubjectFilter(subj);
                setActiveCardIndex(0);
                setIsCardFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border ${
                selectedSubjectFilter === subj ? themeGrading.tagActive : themeGrading.tagInactive
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {activeViewMode === 'flashcards' ? (
        /* REVISION FLASHCARDS DECK VIEW */
        <div className="space-y-6">
          {/* Deck Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeGrading.cardBase}`}>
              <div>
                <span className="text-[10px] font-bold uppercase opacity-60">Current Deck</span>
                <div className="text-lg font-black text-white">{selectedSubjectFilter} Flashcards</div>
              </div>
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeGrading.cardBase}`}>
              <div>
                <span className="text-[10px] font-bold uppercase opacity-60">Cards Mastered</span>
                <div className="text-lg font-black text-emerald-400">
                  {Object.keys(flashcardMasteredIds).length} of {filteredFlashcards.length}
                </div>
              </div>
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeGrading.cardBase}`}>
              <div>
                <span className="text-[10px] font-bold uppercase opacity-60">XP Boost</span>
                <div className="text-lg font-black text-amber-400">
                  +{Object.keys(flashcardMasteredIds).length * 25} XP Earned
                </div>
              </div>
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          {/* Interactive Flashcard Container */}
          {filteredFlashcards.length > 0 ? (
            <div className="max-w-2xl mx-auto space-y-4">
              <div
                onClick={() => setIsCardFlipped((prev) => !prev)}
                className={`min-h-[280px] p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl relative select-none hover:border-white/30 ${
                  isCardFlipped
                    ? 'bg-gradient-to-br from-[#101420] to-[#0A0D15] border-amber-500/40 text-white'
                    : `${themeGrading.cardBase} border-white/15`
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg font-black uppercase text-[10px] bg-white/[0.08] text-white border border-white/10">
                    {currentFlashcard.subject} • {currentFlashcard.topic}
                  </span>
                  <span className="text-xs text-[#8E95A5] font-bold">
                    Card {activeCardIndex + 1} of {filteredFlashcards.length}
                  </span>
                </div>

                <div className="my-6 text-center space-y-3">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isCardFlipped ? 'Answer & Core Principle' : 'Conceptual Question'}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black leading-snug whitespace-pre-line text-white">
                    {isCardFlipped ? currentFlashcard.back : currentFlashcard.front}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-[#8E95A5]">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Click card to flip</span>
                  </span>
                  {flashcardMasteredIds[currentFlashcard.id] && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mastered (+25 XP)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Flashcard Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : filteredFlashcards.length - 1));
                    }}
                    className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition cursor-pointer"
                    title="Previous Card"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev + 1 < filteredFlashcards.length ? prev + 1 : 0));
                    }}
                    className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition cursor-pointer"
                    title="Next Card"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      const randomIndex = Math.floor(Math.random() * filteredFlashcards.length);
                      setActiveCardIndex(randomIndex);
                    }}
                    className="px-3.5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    title="Shuffle Deck"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFlashcardMasteredIds((prev) => {
                        const next = { ...prev };
                        delete next[currentFlashcard.id];
                        return next;
                      });
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev + 1 < filteredFlashcards.length ? prev + 1 : 0));
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-bold transition cursor-pointer"
                  >
                    Still Learning
                  </button>
                  <button
                    onClick={() => {
                      setFlashcardMasteredIds((prev) => ({
                        ...prev,
                        [currentFlashcard.id]: true,
                      }));
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev + 1 < filteredFlashcards.length ? prev + 1 : 0));
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I Know This! (+25 XP)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">No flashcards found for this subject.</div>
          )}
        </div>
      ) : (
        /* STUDY NOTES & CHEAT-SHEETS VIEW */
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50 text-white" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, formulas, topics..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-hidden ${themeGrading.inputBg}`}
            />
          </div>

      {/* 3. New Note Editor Card */}
      {isCreatingNew && (
        <div className={`p-5 rounded-3xl border-2 transition-all space-y-4 ${themeGrading.cardBase}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm flex items-center gap-2">
              <Plus className={`w-4 h-4 ${themeGrading.highlightColor}`} />
              <span>Create New Revision Note</span>
            </h3>
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Note Title (e.g., Ohm's Law Formula Sheet)"
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold focus:outline-hidden ${themeGrading.inputBg}`}
            />
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject (e.g., Physics)"
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold focus:outline-hidden ${themeGrading.inputBg}`}
            />
          </div>

          <textarea
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write key equations, definitions, or study bullet points..."
            className={`w-full px-4 py-3 rounded-xl border text-xs leading-relaxed focus:outline-hidden ${themeGrading.inputBg}`}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={handleSaveNewNote}
              disabled={!newTitle.trim() || !newContent.trim()}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${themeGrading.accentBtn}`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Notes Grid (Pinned & Regular) */}
      <div className="space-y-6">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider opacity-70 flex items-center gap-1.5">
              <Pin className={`w-3.5 h-3.5 ${themeGrading.pinColor}`} />
              <span>Pinned Revision Cards</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pinnedNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${themeGrading.cardPinned}`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${themeGrading.inputBg}`}>
                          {note.subject}
                        </span>
                        {note.isAISummary && (
                          <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md flex items-center gap-1 ${themeGrading.badge}`}>
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI Note</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleTogglePin(note.id)}
                          className={`p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer ${themeGrading.pinColor}`}
                          title="Unpin note"
                        >
                          <Pin className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 hover:text-rose-600 opacity-50 hover:opacity-100 cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-black text-base">{note.title}</h4>
                    <p className={`text-xs leading-relaxed whitespace-pre-line ${themeGrading.subtitleText}`}>
                      {note.content}
                    </p>
                  </div>

                  <div className="pt-3.5 mt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] opacity-70">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{note.date}</span>
                    </span>
                    <button
                      onClick={() => handleCopyNote(note.id, note.content)}
                      className={`hover:opacity-100 font-bold flex items-center gap-1 cursor-pointer ${themeGrading.highlightColor}`}
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedId === note.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        <div className="space-y-3">
          {pinnedNotes.length > 0 && (
            <h3 className="text-xs font-black uppercase tracking-wider opacity-70">
              Other Notes ({regularNotes.length})
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularNotes.map((note) => (
              <div
                key={note.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${themeGrading.cardBase}`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${themeGrading.inputBg}`}>
                      {note.subject}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePin(note.id)}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-50 hover:opacity-100 cursor-pointer"
                        title="Pin note"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 hover:text-rose-600 opacity-50 hover:opacity-100 cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-black text-base">{note.title}</h4>
                  <p className={`text-xs leading-relaxed whitespace-pre-line ${themeGrading.subtitleText}`}>
                    {note.content}
                  </p>
                </div>

                <div className="pt-3.5 mt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] opacity-70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{note.date}</span>
                  </span>
                  <button
                    onClick={() => handleCopyNote(note.id, note.content)}
                    className={`hover:opacity-100 font-bold flex items-center gap-1 cursor-pointer ${themeGrading.highlightColor}`}
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId === note.id ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};
