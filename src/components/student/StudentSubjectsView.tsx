import React, { useState, useMemo } from 'react';
import { StudentAgeTier } from '../../types';
import {
  LayoutGrid,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  Play,
  FileQuestion,
  ChevronRight,
  TrendingUp,
  Layers,
  Search,
  Compass,
  Trophy,
  X,
  Check,
  Bot,
} from 'lucide-react';
import { getSyllabusForSubject } from '../../data/syllabusCurriculum';
import { useDashboardTheme } from '../../context/ThemeContext';

interface StudentSubjectsViewProps {
  tier: StudentAgeTier;
  activeClass: string;
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
  onOpenSyllabusMap: () => void;
  onStartQuiz: (subj: string) => void;
}

interface SubjectDetail {
  id: string;
  name: string;
  code: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
  starsEarned: number;
  totalStars: number;
  nextChapterTitle: string;
  topics: string[];
}

export const StudentSubjectsView: React.FC<StudentSubjectsViewProps> = ({
  tier,
  activeClass,
  selectedSubject,
  onSelectSubject,
  onOpenSyllabusMap,
  onStartQuiz,
}) => {
  const { style } = useDashboardTheme();
  const [activeBiomeFilter, setActiveBiomeFilter] = useState<'all' | 'plains' | 'ocean' | 'nether' | 'end'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterForStudy, setSelectedChapterForStudy] = useState<any | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, boolean>>({
    'c7-math-1': true,
    'c7-math-2': true,
    'c7-math-3': true,
  });
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Define subjects mapped per tier
  const subjectsByTier: Record<StudentAgeTier, SubjectDetail[]> = {
    primary: [
      {
        id: 'evs',
        name: 'EVS',
        code: 'EVS-101',
        progress: 68,
        totalChapters: 8,
        completedChapters: 5,
        starsEarned: 18,
        totalStars: 24,
        nextChapterTitle: 'Living Beings & Habitats',
        topics: ['Animal Homes', 'Water Cycle', 'Plant Growth', 'Community Helpers'],
      },
      {
        id: 'math',
        name: 'Mathematics',
        code: 'MATH-102',
        progress: 54,
        totalChapters: 10,
        completedChapters: 5,
        starsEarned: 15,
        totalStars: 30,
        nextChapterTitle: 'Shapes & Patterns',
        topics: ['Multiplication Tables', '2D & 3D Shapes', 'Money Math', 'Fractions Intro'],
      },
      {
        id: 'english',
        name: 'English',
        code: 'ENG-103',
        progress: 82,
        totalChapters: 8,
        completedChapters: 6,
        starsEarned: 22,
        totalStars: 24,
        nextChapterTitle: 'Grammar: Action Verbs',
        topics: ['Rhyme & Rhythm', 'Nouns & Verbs', 'Story Reading', 'Spelling Bee'],
      },
      {
        id: 'logic',
        name: 'Logic & Puzzles',
        code: 'LOG-104',
        progress: 75,
        totalChapters: 6,
        completedChapters: 4,
        starsEarned: 14,
        totalStars: 18,
        nextChapterTitle: 'Pattern Completion',
        topics: ['Spatial Puzzles', 'Number Riddles', 'Odd One Out', 'Sequencing'],
      },
    ],
    middle: [
      {
        id: 'math',
        name: 'Mathematics',
        code: 'MATH-701',
        progress: 62,
        totalChapters: 12,
        completedChapters: 7,
        starsEarned: 21,
        totalStars: 36,
        nextChapterTitle: 'Algebraic Expressions & Identities',
        topics: ['Integers & Rational Numbers', 'Linear Equations', 'Lines & Angles', 'Triangle Properties'],
      },
      {
        id: 'science',
        name: 'Science',
        code: 'SCI-702',
        progress: 70,
        totalChapters: 14,
        completedChapters: 9,
        starsEarned: 28,
        totalStars: 42,
        nextChapterTitle: 'Respiration in Organisms',
        topics: ['Photosynthesis & Nutrition', 'Acids, Bases & Salts', 'Physical & Chemical Changes', 'Motion & Time'],
      },
      {
        id: 'social',
        name: 'Social Science',
        code: 'SST-703',
        progress: 58,
        totalChapters: 10,
        completedChapters: 6,
        starsEarned: 16,
        totalStars: 30,
        nextChapterTitle: 'Our Changing Earth',
        topics: ['Medieval Dynasties', 'Atmosphere & Weather', 'Democracy & Equality', 'Tribes & Nomadic Communities'],
      },
      {
        id: 'english',
        name: 'English Language & Lit',
        code: 'ENG-704',
        progress: 80,
        totalChapters: 8,
        completedChapters: 6,
        starsEarned: 20,
        totalStars: 24,
        nextChapterTitle: 'Poetic Devices & Metaphors',
        topics: ['Direct & Indirect Speech', 'Active & Passive Voice', 'Comprehension Mastery', 'Formal Letter Writing'],
      },
    ],
    high: [
      {
        id: 'physics',
        name: 'Physics',
        code: 'PHY-1001',
        progress: 65,
        totalChapters: 12,
        completedChapters: 8,
        starsEarned: 24,
        totalStars: 36,
        nextChapterTitle: 'Electricity & Ohm’s Law Circuits',
        topics: ['Light: Reflection & Refraction', 'Human Eye & Colourful World', 'Magnetic Effects of Current', 'Sources of Energy'],
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        code: 'CHEM-1002',
        progress: 72,
        totalChapters: 10,
        completedChapters: 7,
        starsEarned: 22,
        totalStars: 30,
        nextChapterTitle: 'Carbon & its Compounds',
        topics: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Periodic Classification'],
      },
      {
        id: 'biology',
        name: 'Biology',
        code: 'BIO-1003',
        progress: 78,
        totalChapters: 8,
        completedChapters: 6,
        starsEarned: 20,
        totalStars: 24,
        nextChapterTitle: 'Heredity & Evolution',
        topics: ['Life Processes: Nutrition & Transport', 'Control & Coordination', 'How do Organisms Reproduce?', 'Our Environment'],
      },
      {
        id: 'math',
        name: 'Mathematics',
        code: 'MATH-1004',
        progress: 55,
        totalChapters: 15,
        completedChapters: 8,
        starsEarned: 26,
        totalStars: 45,
        nextChapterTitle: 'Trigonometry & Applications',
        topics: ['Quadratic Equations', 'Arithmetic Progressions', 'Coordinate Geometry', 'Surface Areas & Volumes'],
      },
    ],
  };

  const subjectList = subjectsByTier[tier];
  const activeSubjectObj = subjectList.find(
    (s) => s.name.toLowerCase() === selectedSubject.toLowerCase()
  ) || subjectList[0];

  const syllabusLessons = getSyllabusForSubject(activeClass, activeSubjectObj.name);

  const filteredLessons = useMemo(() => {
    return syllabusLessons.filter((lesson) => {
      const matchBiome = activeBiomeFilter === 'all' || lesson.biome === activeBiomeFilter;
      const matchSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.conceptSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBiome && matchSearch;
    });
  }, [syllabusLessons, activeBiomeFilter, searchQuery]);

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
          cardSelected: 'bg-white border-[#246257] shadow-md ring-2 ring-[#246257]/20 text-[#1C232B]',
          cardUnselected: 'bg-[#FAF7F0]/70 border-[#DDD4C7] hover:border-[#246257]/60 text-[#1C232B]',
          statBox: 'bg-[#F4EFEA] border-[#DDD4C7] text-[#1C232B]',
          progressTrack: 'bg-[#DDD4C7]/60',
          progressFill: 'bg-[#246257]',
          tabActive: 'bg-[#246257] text-white shadow-xs',
          tabInactive: 'bg-white border-[#DDD4C7] text-[#5C6670] hover:text-[#1C232B]',
          chapterCard: 'bg-white border-[#DDD4C7] text-[#1C232B] hover:border-[#246257] shadow-2xs',
          chapterDivider: 'border-[#DDD4C7]',
          highlightColor: 'text-[#246257]',
          starColor: 'text-[#C85340]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          bannerBg: 'bg-[#0D0F17]/90 border-white/[0.08] text-white shadow-2xl shadow-black/80 backdrop-blur-xl',
          badge: 'bg-white/[0.08] text-white border border-white/15',
          subtitleText: 'text-[#8E95A5]',
          accentBtn: 'bg-white text-slate-950 font-black hover:bg-slate-200 shadow-md shadow-white/10',
          secondaryBtn: 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]',
          cardSelected: 'bg-[#121520] border-white/30 shadow-xl ring-1 ring-white/20 text-white',
          cardUnselected: 'bg-[#0D0F17] border-white/[0.08] hover:border-white/20 text-[#8E95A5] hover:text-white',
          statBox: 'bg-white/[0.04] border-white/10 text-white',
          progressTrack: 'bg-white/[0.08]',
          progressFill: 'bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400',
          tabActive: 'bg-white text-slate-950 font-black shadow-md shadow-white/10',
          tabInactive: 'bg-white/[0.04] border-white/10 text-[#8E95A5] hover:text-white',
          chapterCard: 'bg-[#0D0F17] border-white/[0.08] text-white hover:border-white/20 shadow-xl hover:bg-white/[0.02]',
          chapterDivider: 'border-white/[0.08]',
          highlightColor: 'text-amber-400',
          starColor: 'text-amber-400',
        };
      case 'academic-warm':
        return {
          bannerBg: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          badge: 'bg-[#8C4A2F] text-white',
          subtitleText: 'text-[#5C5346]',
          accentBtn: 'bg-[#8C4A2F] hover:bg-[#783E26] text-white shadow-xs',
          secondaryBtn: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D] hover:bg-[#EAE4D8]',
          cardSelected: 'bg-[#FFFDFB] border-[#8C4A2F] shadow-md ring-2 ring-[#8C4A2F]/20 text-[#28231D]',
          cardUnselected: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#8C4A2F]/60 text-[#28231D]',
          statBox: 'bg-[#F5F1E9] border-[#E2DBD0] text-[#28231D]',
          progressTrack: 'bg-[#E2DBD0]',
          progressFill: 'bg-[#8C4A2F]',
          tabActive: 'bg-[#8C4A2F] text-white shadow-xs',
          tabInactive: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#5C5346] hover:text-[#28231D]',
          chapterCard: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] hover:border-[#8C4A2F] shadow-2xs',
          chapterDivider: 'border-[#E6DFD3]',
          highlightColor: 'text-[#8C4A2F]',
          starColor: 'text-[#B45309]',
        };
      case 'clean':
      default:
        return {
          bannerBg: 'bg-white border-slate-200 text-slate-900 shadow-xs',
          badge: 'bg-blue-600 text-white',
          subtitleText: 'text-slate-500',
          accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          secondaryBtn: 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100',
          cardSelected: 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20 text-slate-900',
          cardUnselected: 'bg-slate-50/60 border-slate-200 hover:border-blue-400 text-slate-800',
          statBox: 'bg-slate-50 border-slate-200 text-slate-800',
          progressTrack: 'bg-slate-200',
          progressFill: 'bg-blue-600',
          tabActive: 'bg-blue-600 text-white shadow-xs',
          tabInactive: 'bg-white border-slate-200 text-slate-600 hover:text-slate-900',
          chapterCard: 'bg-white border-slate-200 text-slate-900 hover:border-blue-500 shadow-2xs',
          chapterDivider: 'border-slate-200',
          highlightColor: 'text-blue-600',
          starColor: 'text-amber-500',
        };
    }
  }, [style]);

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
              <span className="font-bold opacity-80">Academic Curriculum Directory</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Academic Subjects & Chapters
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${themeGrading.subtitleText}`}>
              Explore your active curriculum standards, monitor chapter completion status, and dive into the 4-biome gamified learning trail.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onStartQuiz(activeSubjectObj.name)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${themeGrading.secondaryBtn}`}
            >
              <FileQuestion className="w-4 h-4" />
              <span>Practice Quiz</span>
            </button>
            <button
              onClick={onOpenSyllabusMap}
              className={`px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${themeGrading.accentBtn}`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Quest Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Subjects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjectList.map((subject) => {
          const isSelected =
            selectedSubject.toLowerCase().includes(subject.name.toLowerCase()) ||
            subject.name.toLowerCase().includes(selectedSubject.toLowerCase());

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject.name)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected ? themeGrading.cardSelected : themeGrading.cardUnselected
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${themeGrading.statBox}`}>
                    {subject.code}
                  </span>
                  <div className={`flex items-center gap-1 text-xs font-black ${themeGrading.starColor}`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{subject.starsEarned}/{subject.totalStars}</span>
                  </div>
                </div>

                <h3 className="font-black text-lg mb-1">{subject.name}</h3>
                <p className={`text-xs mb-3 ${themeGrading.subtitleText}`}>
                  {subject.completedChapters} of {subject.totalChapters} Chapters Completed
                </p>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="opacity-75">Mastery</span>
                    <span className={themeGrading.highlightColor}>{subject.progress}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${themeGrading.progressTrack}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${themeGrading.progressFill}`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={`pt-3 border-t flex items-center justify-between ${themeGrading.chapterDivider}`}>
                <span className={`text-[11px] font-bold flex items-center gap-1 ${themeGrading.highlightColor}`}>
                  <span>Next: {subject.nextChapterTitle.split(' ')[0]}</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Detailed Syllabus Chapters View */}
      <div className={`p-6 rounded-3xl border shadow-xs space-y-6 ${themeGrading.bannerBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className={`w-5 h-5 ${themeGrading.highlightColor}`} />
              <h2 className="text-xl font-black">{activeSubjectObj.name} Chapter Matrix</h2>
            </div>
            <p className={`text-xs mt-0.5 ${themeGrading.subtitleText}`}>
              12 progressive chapters partitioned across Plains, Ocean, Nether, and End biomes.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters or topics..."
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border focus:outline-hidden ${themeGrading.statBox}`}
            />
          </div>
        </div>

        {/* Biome Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Chapters' },
            { id: 'plains', label: '🌿 Plains (Ch 1-3)' },
            { id: 'ocean', label: '🌊 Ocean (Ch 4-6)' },
            { id: 'nether', label: '🔥 Nether (Ch 7-9)' },
            { id: 'end', label: '🐉 The End (Ch 10-12)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveBiomeFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeBiomeFilter === tab.id ? themeGrading.tabActive : themeGrading.tabInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessonIds[lesson.id] || lesson.lessonNumber <= 3;
            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setSelectedChapterForStudy(lesson);
                  setQuizAnswerSelected(null);
                  setQuizSubmitted(false);
                }}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-3 cursor-pointer hover:scale-[1.01] ${themeGrading.chapterCard}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${themeGrading.statBox}`}>
                      {lesson.biome.toUpperCase()} • CH {lesson.lessonNumber}
                    </span>
                    <span className={`text-[11px] font-black flex items-center gap-1 ${themeGrading.starColor}`}>
                      <Star className="w-3 h-3 fill-current" />
                      <span>+{lesson.xpReward} XP</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-sm leading-snug">{lesson.title}</h4>
                  <p className={`text-xs line-clamp-2 ${themeGrading.subtitleText}`}>
                    {lesson.conceptSummary}
                  </p>
                </div>

                <div className={`pt-2.5 border-t flex items-center justify-between text-xs ${themeGrading.chapterDivider}`}>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    {isCompleted ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mastered</span>
                      </span>
                    ) : (
                      <span className="opacity-70 font-medium">Study Chapter</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChapterForStudy(lesson);
                      setQuizAnswerSelected(null);
                      setQuizSubmitted(false);
                    }}
                    className={`font-bold hover:underline flex items-center gap-1 cursor-pointer ${themeGrading.highlightColor}`}
                  >
                    <span>Read & Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Interactive Chapter Study & Practice Modal */}
      {selectedChapterForStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D0F17] border border-white/15 text-white shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedChapterForStudy.biome.toUpperCase()} BIOME
                  </span>
                  <span className="text-xs text-[#8E95A5] font-semibold">
                    {activeClass} • {activeSubjectObj.name} • Chapter {selectedChapterForStudy.lessonNumber}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{selectedChapterForStudy.title}</h3>
              </div>
              <button
                onClick={() => setSelectedChapterForStudy(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Concept Summary & Key Takeaways */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                Core Conceptual Breakdown
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/[0.08]">
                {selectedChapterForStudy.conceptSummary}
              </p>
            </div>

            {/* Key Formula / Rules Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border border-amber-500/30">
              <div className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>Essential Rule & Exam Takeaway</span>
              </div>
              <p className="text-xs text-slate-200">
                Always break down problems into initial givens, identify unknown variables, and cross-verify with dimensional units before computing.
              </p>
            </div>

            {/* Quick Concept Check Question */}
            <div className="space-y-3 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400">Quick Check Question</span>
                <span className="text-[11px] text-emerald-400 font-bold">+{selectedChapterForStudy.xpReward} XP</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Which best describes the primary principle taught in {selectedChapterForStudy.title}?
              </p>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {[
                  { id: 0, text: 'Fundamental relationship governing forces and quantitative balance' },
                  { id: 1, text: 'A secondary non-essential empirical observation' },
                  { id: 2, text: 'Only applicable under extreme atmospheric pressures' },
                ].map((opt) => {
                  const isSelected = quizAnswerSelected === opt.id;
                  const isCorrect = opt.id === 0;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setQuizAnswerSelected(opt.id);
                        setQuizSubmitted(true);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition border ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : 'bg-rose-500/20 border-rose-500 text-rose-200'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className={`p-3 rounded-xl text-xs font-medium ${quizAnswerSelected === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                  {quizAnswerSelected === 0 ? '🎉 Excellent! You correctly understood the core principle.' : '💡 Not quite. The first principle explains the direct governing relationship.'}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setCompletedLessonIds((prev) => ({
                    ...prev,
                    [selectedChapterForStudy.id]: !prev[selectedChapterForStudy.id],
                  }));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${
                  completedLessonIds[selectedChapterForStudy.id]
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{completedLessonIds[selectedChapterForStudy.id] ? 'Completed & Mastered' : 'Mark as Mastered'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedChapterForStudy(null);
                    onOpenSyllabusMap();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-white text-slate-950 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-white/10"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch 4-Biome Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
