import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { StudentDetailModal } from './components/StudentDetailModal';
import { AddGapModal } from './components/AddGapModal';
import { useDashboardTheme } from './context/ThemeContext';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { RoadblocksPage } from './pages/RoadblocksPage';
import { StudentMatrixPage } from './pages/StudentMatrixPage';
import { CurriculaPage } from './pages/CurriculaPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

import {
  INITIAL_SUMMARY_STATS,
  TOPIC_FAILURE_STATS,
  INITIAL_STUDENT_GAPS,
  FACULTY_GOALS,
  REMEDIAL_RESOURCES,
  DEMO_STUDENT_GAPS,
  DEMO_TOPIC_FAILURE_STATS,
  DEMO_FACULTY_GOALS,
} from './data/mockData';
import {
  Subject,
  StudentGapRecord,
  RemediationStatus,
  RemedialResource,
  PageId,
  UserRole,
  TopicFailureStat,
  GoalItem,
  ClassSummaryStats,
} from './types';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { ParentDashboardPage } from './pages/ParentDashboardPage';
import { StudentPreTestModal } from './components/student/StudentPreTestModal';
import { FloatingAITutor } from './components/common/FloatingAITutor';
import { MessageAtRiskModal } from './components/teacher/MessageAtRiskModal';
import { AssignRemedialModal } from './components/teacher/AssignRemedialModal';
import { QuickExitTicketModal } from './components/teacher/QuickExitTicketModal';
import { ToastNotification, ToastData } from './components/common/ToastNotification';

export default function App() {
  const { style } = useDashboardTheme();

  // User Role State
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('learnbuddy_role') as UserRole) || null;
  });

  // Pre-test assessment modal for student
  const [showStudentPreTest, setShowStudentPreTest] = useState<boolean>(false);
  const [studentInitialClass, setStudentInitialClass] = useState<string>('Class 7');

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole) {
      localStorage.setItem('learnbuddy_role', selectedRole);
      // Immediately open pretest quiz when student role is selected
      if (selectedRole === 'student') {
        setShowStudentPreTest(true);
      }
    } else {
      localStorage.removeItem('learnbuddy_role');
      setShowStudentPreTest(false);
    }
  };

  // Active Page Routing State
  const [activePage, setActivePage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'overview',
      'roadblocks',
      'matrix',
      'curricula',
      'settings',
      'profile',
    ];
    return validPages.includes(hash) ? hash : 'overview';
  });

  const [activeTopTab, setActiveTopTab] = useState('Faculty');
  const [searchQuery, setSearchQuery] = useState('');

  // Class & Subject Filters
  const [selectedClass, setSelectedClass] = useState('Class 7');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Mathematics');

  // Student gap records state (interactive status changes, persisted in localStorage)
  const [students, setStudents] = useState<StudentGapRecord[]>(() => {
    try {
      const stored = localStorage.getItem('pragya_students_records_v2');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_STUDENT_GAPS;
  });

  // Topics failure stats
  const [topics, setTopics] = useState<TopicFailureStat[]>(() => {
    try {
      const stored = localStorage.getItem('pragya_topics_records_v2');
      if (stored) return JSON.parse(stored);
    } catch {}
    return TOPIC_FAILURE_STATS;
  });

  // Today's goals state
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    try {
      const stored = localStorage.getItem('pragya_goals_records_v2');
      if (stored) return JSON.parse(stored);
    } catch {}
    return FACULTY_GOALS;
  });

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pragya_students_records_v2', JSON.stringify(students));
    } catch {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('pragya_topics_records_v2', JSON.stringify(topics));
    } catch {}
  }, [topics]);

  useEffect(() => {
    try {
      localStorage.setItem('pragya_goals_records_v2', JSON.stringify(goals));
    } catch {}
  }, [goals]);

  // Selected student for diagnostic modal
  const [selectedStudent, setSelectedStudent] = useState<StudentGapRecord | null>(null);

  // Add Gap modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Quick Actions floating menu modals & toast
  const [isMessageAtRiskOpen, setIsMessageAtRiskOpen] = useState(false);
  const [isAssignRemedialOpen, setIsAssignRemedialOpen] = useState(false);
  const [isExitTicketOpen, setIsExitTicketOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Topic passed to AI Tutor
  const [initialTopicForAITutor, setInitialTopicForAITutor] = useState<string | null>(null);

  // Notifications count
  const [notificationCount, setNotificationCount] = useState(0);

  // Keep hash in sync for back/forward navigation
  const navigateToPage = (page: PageId) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'overview',
        'roadblocks',
        'matrix',
        'curricula',
        'settings',
        'profile',
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic calculations based on real student records
  const classStats = useMemo<ClassSummaryStats>(() => {
    const classStudents = students.filter((s) => s.classGrade === selectedClass);
    const total = classStudents.length;
    const fixed = classStudents.filter((s) => s.fixedStatus === 'Fixed').length;
    const active = classStudents.filter((s) => s.fixedStatus !== 'Fixed').length;
    const urgent = classStudents.filter((s) => s.fixedStatus === 'Not Fixed').length;
    const inProg = classStudents.filter((s) => s.fixedStatus === 'In Progress').length;
    const passRate = total > 0 ? Math.round((fixed / total) * 100 * 10) / 10 : 0;
    const avgScore = total > 0 ? Math.round(classStudents.reduce((acc, s) => acc + s.diagnosticScore, 0) / total) : 0;

    return {
      classPassRate: passRate,
      passRateTrend: 0,
      totalStudents: total,
      activeLearningGaps: active,
      urgentGapsCount: urgent,
      inProgressGapsCount: inProg,
      fixedThisMonthCount: fixed,
      averageMasteryScore: avgScore,
      masteryScoreMax: 100,
      masteryTier: total === 0 ? 'No diagnostics logged' : passRate >= 80 ? 'A Tier (High Mastery)' : passRate >= 60 ? 'B Tier (Developing)' : 'C Tier (Urgent Intervention Needed)',
    };
  }, [students, selectedClass]);

  // Current active gaps (students whose status is not 'Fixed')
  const activeGapsCount = useMemo(() => {
    return students.filter((s) => s.fixedStatus !== 'Fixed').length;
  }, [students]);

  const fixedCount = useMemo(() => {
    return students.filter((s) => s.fixedStatus === 'Fixed').length;
  }, [students]);

  // Recalculate dynamic pass rate
  const dynamicPassRate = useMemo(() => {
    if (students.length === 0) return classStats.classPassRate;
    return Math.round((fixedCount / students.length) * 100 * 10) / 10;
  }, [students, fixedCount, classStats.classPassRate]);

  // Handler to toggle student remediation status
  const handleToggleStatus = (studentId: string, nextStatus: RemediationStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, fixedStatus: nextStatus } : s))
    );
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) => (prev ? { ...prev, fixedStatus: nextStatus } : null));
    }
  };

  // Handler to toggle faculty goals
  const handleToggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  // Handler to add a new student diagnostic record
  const handleAddStudentGap = (newRecord: StudentGapRecord) => {
    setStudents((prev) => [newRecord, ...prev]);
  };

  // Handler to load demo sample data for preview or testing
  const handleLoadSampleData = () => {
    setStudents(DEMO_STUDENT_GAPS);
    setTopics(DEMO_TOPIC_FAILURE_STATS);
    setGoals(DEMO_FACULTY_GOALS);
    setToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'Sample Data Loaded',
      description: 'Loaded sample student diagnostics and topics for preview.',
    });
  };

  // Handler to clear all data to an empty clean slate
  const handleClearAllData = () => {
    setStudents([]);
    setTopics([]);
    setGoals([]);
    localStorage.removeItem('pragya_students_records_v2');
    localStorage.removeItem('pragya_topics_records_v2');
    localStorage.removeItem('pragya_goals_records_v2');
    setToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'Clean Slate Restored',
      description: 'All student gap records and topics reset to zero.',
    });
  };

  // Handler for resource click
  const handleOpenResource = (res: RemedialResource) => {
    navigateToPage('curricula');
  };

  // Available topics for add modal
  const availableTopics = useMemo(() => {
    if (topics.length > 0) return topics.map((t) => t.topicName);
    return [
      'Integers: Negative Numbers Operations',
      'Fraction Division & Reciprocals',
      'Acids, Bases & Salts Reactions',
      'Linear Equations in One Variable',
      'Lines and Angles: Transversals',
      'Active & Passive Voice Transformations',
    ];
  }, [topics]);

  // Quick Action Handlers
  const handleSendMessageAtRisk = (
    selectedStudentIds: string[],
    message: string,
    channels: string[]
  ) => {
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Alerts Dispatched Successfully',
      description: `Personalized notification sent to ${selectedStudentIds.length} at-risk students via ${channels.join(', ')}.`,
    });
    setNotificationCount((prev) => prev + 1);
  };

  const handleAssignHomework = (data: {
    topic: string;
    format: string;
    targetType: string;
    studentCount: number;
    dueDate: string;
    xpBounty: number;
    instructions: string;
  }) => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      text: `Review ${data.studentCount} student submissions for '${data.topic}' remedial drill`,
      completed: false,
      category: 'Remediation',
    };
    setGoals((prev) => [newGoal, ...prev]);
    setNotificationCount((prev) => prev + 1);

    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Remedial Homework Assigned',
      description: `Assigned '${data.topic}' (${data.format}) to ${data.studentCount} students. Due: ${data.dueDate}. (+${data.xpBounty} XP Bounty)`,
    });
  };

  const handleLaunchExitTicket = (topic: string, count: number) => {
    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: '3-Min Exit Ticket Published',
      description: `Published 3-question diagnostic pulse check for '${topic}' to ${selectedClass} devices.`,
    });
    setNotificationCount((prev) => prev + 1);
  };

  const handleBroadcastParent = () => {
    setToast({
      id: `toast-${Date.now()}`,
      type: 'info',
      title: 'Parent Notice Broadcasted',
      description: `Weekly diagnostic progress summary for ${selectedClass} dispatched to parent WhatsApp/SMS portals.`,
    });
  };

  const handleExportReport = () => {
    const filteredStudents = students.filter(
      (s) => s.classGrade === selectedClass && (selectedSubject === 'All' || s.subject === selectedSubject)
    );
    const headers = [
      'Student ID',
      'Student Name',
      'Roll Number',
      'Class',
      'Subject',
      'Roadblock Topic',
      'Concept Misconception',
      'Diagnostic Score (%)',
      'Attempts',
      'Status',
      'Date Flagged',
    ];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      s.rollNumber,
      s.classGrade,
      s.subject,
      `"${s.failedBasicTopic.replace(/"/g, '""')}"`,
      `"${s.failedConceptDetail.replace(/"/g, '""')}"`,
      s.diagnosticScore,
      s.attemptsCount,
      s.fixedStatus,
      s.dateFlagged,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Pragya_${selectedClass.replace(/\s+/g, '_')}_${selectedSubject}_Diagnostic_Report.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast({
      id: `toast-${Date.now()}`,
      type: 'success',
      title: 'Diagnostic Report Exported',
      description: `Downloaded Pragya_${selectedClass}_${selectedSubject}_Diagnostic_Report.csv (${filteredStudents.length} records).`,
    });
  };

  if (!role) {
    return <RoleSelectionPage onSelectRole={handleSelectRole} />;
  }

  if (role === 'student') {
    return (
      <>
        {showStudentPreTest && (
          <StudentPreTestModal
            initialClass={studentInitialClass}
            onComplete={(results) => {
              setStudentInitialClass(results.selectedClass);
              setShowStudentPreTest(false);
              localStorage.setItem('learnbuddy_student_pretest_done', 'true');
            }}
            onSkip={() => setShowStudentPreTest(false)}
          />
        )}
        <StudentDashboardPage
          initialClass={studentInitialClass}
          onSwitchRole={() => handleSelectRole(null)}
          onSelectRole={(targetRole) => handleSelectRole(targetRole)}
          onRetakePreTest={() => setShowStudentPreTest(true)}
        />
        <FloatingAITutor
          role="student"
          currentClass={studentInitialClass}
          currentSubject="Science"
        />
      </>
    );
  }

  if (role === 'parent') {
    return (
      <>
        <ParentDashboardPage onSwitchRole={() => handleSelectRole(null)} />
        <FloatingAITutor
          role="parent"
          currentClass="Class 7"
          currentSubject="Mathematics"
        />
      </>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300 relative overflow-x-hidden ${
        style === 'obsidian-dark' || style === 'command-dark'
          ? 'bg-[#07080B] text-white'
          : style === 'academic-warm'
          ? 'bg-[#FAF7F2] text-[#28231D]'
          : 'bg-[#F4EFEA] text-[#1C232B]'
      }`}
    >
      {/* Quantix Celestial Nebula Ambient Glow for Obsidian Dark */}
      {(style === 'obsidian-dark' || style === 'command-dark') && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 w-[650px] h-[550px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 18% 12%, rgba(100, 80, 165, 0.22) 0%, rgba(55, 40, 95, 0.12) 40%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
      )}
      {/* 1. Pragya Primary Navbar */}
      <Navbar
        activeTopTab={activeTopTab}
        setActiveTopTab={setActiveTopTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notificationCount={notificationCount}
        activePage={activePage}
        onNavigate={navigateToPage}
        onSwitchRole={() => handleSelectRole(null)}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        atRiskCount={activeGapsCount}
        onOpenMessageAtRisk={() => setIsMessageAtRiskOpen(true)}
        onOpenAssignRemedial={() => setIsAssignRemedialOpen(true)}
        onOpenAddGap={() => setIsAddModalOpen(true)}
        onScheduleExitTicket={() => setIsExitTicketOpen(true)}
        onBroadcastParent={handleBroadcastParent}
        onExportReport={handleExportReport}
      />

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        {/* 2. Left Navigation Sidebar for Desktop */}
        <Sidebar
          activePage={activePage}
          onNavigate={navigateToPage}
          activeGapsCount={activeGapsCount}
        />

        {/* 3. Main Workspace with Active Page Rendering */}
        <main className="flex-1 p-4 md:p-6 lg:p-7 overflow-y-auto pb-24 md:pb-8">
          {/* Page 1: Overview */}
          {activePage === 'overview' && (
            <OverviewPage
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              classStats={classStats}
              activeGapsCount={activeGapsCount}
              fixedCount={fixedCount}
              students={students}
              topics={topics}
              goals={goals}
              onNavigate={navigateToPage}
              onSelectStudent={(student) => setSelectedStudent(student)}
            />
          )}

          {/* Page 2: Roadblocks & AI Prescriptions */}
          {activePage === 'roadblocks' && (
            <RoadblocksPage
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              topics={topics}
              onNavigate={navigateToPage}
              onSendTopicToAITutor={(topicName) => setInitialTopicForAITutor(topicName)}
            />
          )}

          {/* Page 3: Student Mastery Matrix */}
          {activePage === 'matrix' && (
            <StudentMatrixPage
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              students={students}
              onSelectStudent={(student) => setSelectedStudent(student)}
              onToggleStatus={handleToggleStatus}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onNavigate={navigateToPage}
            />
          )}

          {/* Page 4: Curricula & Batch Journey */}
          {activePage === 'curricula' && (
            <CurriculaPage
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              passRate={dynamicPassRate}
              fixedCount={fixedCount}
              activeGapsCount={activeGapsCount}
              goals={goals}
              onToggleGoal={handleToggleGoal}
              resources={REMEDIAL_RESOURCES}
              onOpenResource={handleOpenResource}
              onNavigate={navigateToPage}
            />
          )}

          {/* Page: Faculty Profile */}
          {activePage === 'profile' && (
            <ProfilePage
              onNavigate={navigateToPage}
              onSelectClass={(cls) => setSelectedClass(cls)}
            />
          )}

          {/* Page 8: Settings & Theme */}
          {activePage === 'settings' && (
            <SettingsPage
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              onNavigate={navigateToPage}
              onLoadDemoData={handleLoadSampleData}
              onClearData={handleClearAllData}
              totalStudents={students.length}
            />
          )}
        </main>
      </div>

      {/* 4. Bottom Navigation Bar for Mobile */}
      <BottomNav
        activePage={activePage}
        onNavigate={navigateToPage}
        activeGapsCount={activeGapsCount}
      />

      {/* 5. Student Diagnostic Breakdown Modal */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onUpdateStatus={handleToggleStatus}
      />

      {/* 6. Add New Learning Gap Record Modal */}
      <AddGapModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudentGap}
        availableTopics={availableTopics}
      />

      {/* 7. Global Floating AI Tutor across all pages */}
      <FloatingAITutor
        role="faculty"
        currentClass={selectedClass}
        currentSubject={selectedSubject}
      />

      {/* 8. Quick Actions: Message At-Risk Students Modal */}
      <MessageAtRiskModal
        isOpen={isMessageAtRiskOpen}
        onClose={() => setIsMessageAtRiskOpen(false)}
        students={students}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onSendMessage={handleSendMessageAtRisk}
      />

      {/* 9. Quick Actions: Assign Remedial Homework Modal */}
      <AssignRemedialModal
        isOpen={isAssignRemedialOpen}
        onClose={() => setIsAssignRemedialOpen(false)}
        students={students}
        topics={topics}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onAssignHomework={handleAssignHomework}
      />

      {/* 10. Quick Actions: Quick 3-Min Exit Ticket Modal */}
      <QuickExitTicketModal
        isOpen={isExitTicketOpen}
        onClose={() => setIsExitTicketOpen(false)}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onLaunchTicket={handleLaunchExitTicket}
      />

      {/* 11. Toast Feedback for Triggered Quick Actions */}
      <ToastNotification
        toast={toast}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
