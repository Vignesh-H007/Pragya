import React, { useState } from 'react';
import { StudentAgeTier } from '../types';
import { StudentNavbar } from '../components/student/StudentNavbar';
import { StudentSidebar } from '../components/student/StudentSidebar';
import { StudentBanner } from '../components/student/StudentBanner';
import { StudentClassSelector } from '../components/student/StudentClassSelector';
import { StudentSubjectSelector } from '../components/student/StudentSubjectSelector';
import { StudentAITutorChat } from '../components/student/StudentAITutorChat';
import { StudentProgressCard } from '../components/student/StudentProgressCard';
import { StudentGoalsCard } from '../components/student/StudentGoalsCard';
import { StudentRecommendationsCard } from '../components/student/StudentRecommendationsCard';
import { StudentInspirationCard } from '../components/student/StudentInspirationCard';
import { GamifiedLearningMap } from '../components/student/GamifiedLearningMap';
import { PixelBoyCharacter, PixelGirlCharacter } from '../components/student/MinecraftBiomeAssets';
import { StudentEscalationsView } from '../components/student/StudentEscalationsView';
import { StudentEscalationBanner } from '../components/student/StudentEscalationBanner';
import { RoleSwitchSection } from '../components/student/RoleSwitchSection';
import { StudentMenuDrawer } from '../components/student/StudentMenuDrawer';
import { StudentAITutorView } from '../components/student/StudentAITutorView';
import { StudentSubjectsView } from '../components/student/StudentSubjectsView';
import { StudentQuizzesView } from '../components/student/StudentQuizzesView';
import { StudentProgressView } from '../components/student/StudentProgressView';
import { StudentAchievementsView } from '../components/student/StudentAchievementsView';
import { StudentNotesView } from '../components/student/StudentNotesView';
import { UserRole } from '../types';
import { Play, Sparkles, MapPin, Compass, Star, ClipboardList, Map } from 'lucide-react';

interface StudentDashboardPageProps {
  onSwitchRole: () => void;
  onSelectRole?: (role: UserRole | null) => void;
  initialClass?: string;
  onRetakePreTest?: () => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  onSwitchRole,
  onSelectRole,
  initialClass,
  onRetakePreTest,
}) => {
  // Determine tier based on initialClass if provided
  const getTierForClass = (cls?: string): StudentAgeTier => {
    if (!cls) return 'primary';
    const num = parseInt(cls.replace('Class ', ''), 10);
    if (num <= 4) return 'primary';
    if (num <= 7) return 'middle';
    return 'high';
  };

  // Age tier state: 'primary' (6-10), 'middle' (11-14), 'high' (15-18)
  const [tier, setTier] = useState<StudentAgeTier>(() => getTierForClass(initialClass));
  const [activeNav, setActiveNav] = useState('home');

  // Default active class & subject per tier
  // Primary: Class 1 to 4, Middle: Class 5 to 7, High: Class 8 to 10
  const defaultClassByTier: Record<StudentAgeTier, string> = {
    primary: 'Class 4',
    middle: 'Class 7',
    high: 'Class 10',
  };

  const defaultSubjectByTier: Record<StudentAgeTier, string> = {
    primary: 'EVS',
    middle: 'Science',
    high: 'Physics',
  };

  const [activeClass, setActiveClass] = useState(() => initialClass || defaultClassByTier.primary);
  const [activeSubject, setActiveSubject] = useState(defaultSubjectByTier.primary);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // When class is changed, adapt tier and default subject
  const handleSelectClass = (newClass: string) => {
    setActiveClass(newClass);
    const num = parseInt(newClass.replace(/\D/g, '')) || 4;
    let newTier: StudentAgeTier = 'primary';
    if (num >= 8) newTier = 'high';
    else if (num >= 5) newTier = 'middle';
    
    if (newTier !== tier) {
      setTier(newTier);
      setActiveSubject(defaultSubjectByTier[newTier]);
    }
  };

  // Handler for opening a course in the gamified progress map
  const handleSelectCourseToLearn = (courseTitle: string) => {
    setActiveNav('learning');
  };

  // Background and canvas styling per tier
  const pageBgClass = {
    primary: 'bg-[#FFFDF7] text-slate-900',
    middle: 'bg-[#F8FAFC] text-slate-900',
    high: 'bg-[#0B0F19] text-slate-100',
  }[tier];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${pageBgClass}`}>
      {/* Top Navigation Bar with Upper Left Menu Icon */}
      <StudentNavbar
        tier={tier}
        activeClass={activeClass}
        onSwitchRole={onSwitchRole}
        onOpenQuestMap={() => setActiveNav(activeNav === 'learning' ? 'home' : 'learning')}
        onOpenEscalations={() => setActiveNav('escalations')}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* Slide-out Menu Navigation Drawer */}
      <StudentMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        tier={tier}
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          setIsMenuOpen(false);
        }}
        activeClass={activeClass}
        activeSubject={activeSubject}
        onSwitchRole={onSwitchRole}
      />

      {/* 3. Main Dashboard Body */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <StudentSidebar
            tier={tier}
            activeNav={activeNav}
            onSelectNav={setActiveNav}
            onSwitchRole={onSwitchRole}
          />
        </div>

        {/* Center & Right Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {activeNav === 'learning' ? (
            /* GAMIFIED LEARNING JOURNEY MAP VIEW (matching map.html) */
            <GamifiedLearningMap
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onBackToDashboard={() => setActiveNav('home')}
            />
          ) : activeNav === 'escalations' ? (
            /* TEACHER ESCALATIONS & DOUBTS VIEW */
            <StudentEscalationsView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onBackToDashboard={() => setActiveNav('home')}
            />
          ) : activeNav === 'aitutor' ? (
            /* DEDICATED AI TUTOR EXPERIENCE */
            <StudentAITutorView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onNavigateToSyllabus={() => setActiveNav('learning')}
              onNavigateToQuiz={() => setActiveNav('quizzes')}
            />
          ) : activeNav === 'subjects' ? (
            /* CURRICULUM SUBJECTS DIRECTORY */
            <StudentSubjectsView
              tier={tier}
              activeClass={activeClass}
              selectedSubject={activeSubject}
              onSelectSubject={(subj) => setActiveSubject(subj)}
              onOpenSyllabusMap={() => setActiveNav('learning')}
              onStartQuiz={(subj) => {
                setActiveSubject(subj);
                setActiveNav('quizzes');
              }}
            />
          ) : activeNav === 'quizzes' ? (
            /* QUIZZES & BENCHMARK ASSESSMENTS */
            <StudentQuizzesView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onRetakePreTest={onRetakePreTest}
              onOpenMobBattle={() => setActiveNav('learning')}
            />
          ) : activeNav === 'progress' ? (
            /* PROGRESS & LEARNING ANALYTICS */
            <StudentProgressView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onOpenQuizzes={() => setActiveNav('quizzes')}
              onOpenMap={() => setActiveNav('learning')}
            />
          ) : activeNav === 'achievements' ? (
            /* ACHIEVEMENTS & QUEST BADGES */
            <StudentAchievementsView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
              onOpenMap={() => setActiveNav('learning')}
            />
          ) : activeNav === 'notes' ? (
            /* REVISION NOTES & CHEAT-SHEETS */
            <StudentNotesView
              tier={tier}
              activeClass={activeClass}
              activeSubject={activeSubject}
            />
          ) : activeNav === 'switch-role' ? (
            /* DEDICATED SWITCH ROLE SECTION */
            <div className="max-w-5xl mx-auto">
              <RoleSwitchSection
                currentRole="student"
                onSelectRole={(targetRole) => {
                  if (onSelectRole) onSelectRole(targetRole);
                  else onSwitchRole();
                }}
                tier={tier}
              />
            </div>
          ) : (
            /* STANDARD DASHBOARD OVERVIEW */
            <div className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Center Main Flow (8 cols on XL) */}
                <div className="xl:col-span-8 space-y-6">
                  {/* Hero Banner */}
                  <StudentBanner tier={tier} />

                  {/* Escalation Notification Banner if doubts are active */}
                  <StudentEscalationBanner
                    tier={tier}
                    onOpenEscalations={() => setActiveNav('escalations')}
                  />

                  {/* Minecraft-inspired 4-Biome Syllabus Quest Journey Card */}
                  <div
                    onClick={() => setActiveNav('learning')}
                    className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md hover:scale-[1.01] ${
                      tier === 'high'
                        ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-700/60 text-white'
                        : tier === 'middle'
                        ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-emerald-300 text-slate-900'
                        : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900/10 border-2 border-emerald-500/40 p-1 flex items-center justify-center shrink-0">
                        {localStorage.getItem('learnbuddy_quest_character_gender') === 'girl' ? (
                          <PixelGirlCharacter size={36} isWalking={true} />
                        ) : (
                          <PixelBoyCharacter size={36} isWalking={true} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-2xs">
                            Syllabus Biome Quest
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <Compass className="w-3 h-3 text-emerald-700" />
                            <span>Plains → Ocean → Nether → The End</span>
                          </span>
                          <span className="text-xs text-amber-500 font-extrabold flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>6/36 Stars</span>
                          </span>
                        </div>
                        <h3 className="text-sm font-black tracking-tight">
                          Active Chapter: Plains • Chapter 3 ({activeSubject})
                        </h3>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${tier === 'high' ? 'text-slate-300' : 'text-slate-600'}`}>
                          Scroll through the syllabus trail, conquer 12 chapters across 4 Minecraft-inspired biomes!
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                      {onRetakePreTest && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRetakePreTest();
                          }}
                          className="px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-800 text-[11px] font-bold border border-black/10 shadow-2xs transition flex items-center gap-1.5"
                          title="Retake 5-question adaptive pre-test"
                        >
                          <ClipboardList className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Pre-Test</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveNav('learning');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black shadow-md hover:shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Open Quest Map</span>
                        <Map className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Class Selector (Class 1 to 10 properly split) */}
                  <StudentClassSelector
                    tier={tier}
                    selectedClass={activeClass}
                    onSelectClass={handleSelectClass}
                  />

                  {/* Subject Selector */}
                  <StudentSubjectSelector
                    tier={tier}
                    selectedSubject={activeSubject}
                    onSelectSubject={setActiveSubject}
                  />

                  {/* AI Tutor Chat */}
                  <StudentAITutorChat
                    tier={tier}
                    activeClass={activeClass}
                    activeSubject={activeSubject}
                  />
                </div>

                {/* Right Side Info Column (4 cols on XL) */}
                <div className="xl:col-span-4 space-y-5">
                  {/* Radial Progress */}
                  <StudentProgressCard tier={tier} />

                  {/* Today's Goals Checklist */}
                  <StudentGoalsCard tier={tier} />

                  {/* Recommended Lessons (Clicking any course starts gamified journey) */}
                  <StudentRecommendationsCard
                    tier={tier}
                    onSelectCourse={handleSelectCourseToLearn}
                  />

                  {/* Bottom Motivational Inspiration Card */}
                  <StudentInspirationCard tier={tier} />
                </div>
              </div>

              {/* Dedicated Role Switcher Section at the bottom of the workspace */}
              <RoleSwitchSection
                currentRole="student"
                onSelectRole={(targetRole) => {
                  if (onSelectRole) onSelectRole(targetRole);
                  else onSwitchRole();
                }}
                tier={tier}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
