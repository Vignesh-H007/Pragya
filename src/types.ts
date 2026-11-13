export type Subject = 'Mathematics' | 'Science' | 'English' | 'Social Science' | 'Hindi' | 'All';

export type UserRole = 'student' | 'parent' | 'faculty' | null;

export type StudentAgeTier = 'primary' | 'middle' | 'high';

export type RemediationStatus = 'Not Fixed' | 'In Progress' | 'Fixed';

export type DashboardStyle = 'editorial-command' | 'clean' | 'obsidian-dark' | 'academic-warm' | 'command-dark';

export type PageId =
  | 'overview'
  | 'roadblocks'
  | 'matrix'
  | 'curricula'
  | 'settings'
  | 'profile';

export interface FacultyProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  institution: string;
  facultyId: string;
  email: string;
  phone: string;
  officeLocation: string;
  avatarUrl: string;
  coverUrl?: string;
  bio: string;
  teachingPhilosophy: string;
  yearsOfExperience: number;
  qualifications: string[];
  assignedClasses: string[];
  primarySubjects: Subject[];
  consultationHours: string;
  metrics: {
    studentsMentored: number;
    gapsRemediated: number;
    remediationSuccessRate: number;
    pedagogicRating: number;
    activeInterventions: number;
  };
  badges: Array<{
    id: string;
    title: string;
    desc: string;
    icon: string;
    earnedDate: string;
  }>;
  notificationPreferences: {
    emailDigest: boolean;
    urgentGapAlerts: boolean;
    dailyMorningBrief: boolean;
    parentEscalationSMS: boolean;
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  classGrade: string;
  section: string;
  avatarUrl: string;
  bio: string;
  favoriteSubject: string;
  guardianName: string;
  guardianContact: string;
  targetGoal: string;
}

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: Array<{
    id: string;
    name: string;
    classGrade: string;
    avatarUrl: string;
  }>;
}

export interface StudentGapRecord {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  classGrade: string; // e.g., 'Class 7'
  subject: Subject;
  failedBasicTopic: string;
  failedConceptDetail: string;
  diagnosticScore: number; // e.g. 35%
  attemptsCount: number;
  dateFlagged: string;
  fixedStatus: RemediationStatus;
  remediationNote?: string;
  sampleFailedQuestion?: {
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    misconception: string;
  };
}

export interface TopicFailureStat {
  id: string;
  topicName: string;
  subject: Subject;
  classGrade: string;
  failureRate: number; // percentage, e.g., 46%
  totalStudentsStuck: number;
  totalTested: number;
  averageAttempts: number;
  difficultyLevel: 'High' | 'Medium' | 'Critical';
  isNumberOneHardest: boolean;
  rootCause: string;
  recommendedIntervention: string;
}

export interface ClassSummaryStats {
  classPassRate: number; // e.g., 74.2%
  passRateTrend: number; // e.g., +3.5%
  totalStudents: number;
  activeLearningGaps: number; // e.g., 19
  urgentGapsCount: number;
  inProgressGapsCount: number;
  fixedThisMonthCount: number;
  averageMasteryScore: number; // e.g., 71.8
  masteryScoreMax: number; // 100
  masteryTier: string; // 'Satisfactory B+'
}

export interface GoalItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface RemedialResource {
  id: string;
  title: string;
  subject: string;
  classGrade: string;
  type: 'video' | 'concept' | 'quiz' | 'worksheet';
  duration: string;
  color: string;
  url?: string;
  description?: string;
  scaffoldLevel?: string;
  assignedCount?: number;
  stepsCount?: number;
}

export type EscalationStatus = 'Pending Review' | 'Teacher Responded' | 'Resolved';
export type EscalationPriority = 'Normal' | 'High' | 'Urgent';

export interface EscalationTicket {
  id: string;
  ticketNumber: string;
  studentName: string;
  studentClass: string;
  subject: string;
  topic: string;
  studentDoubt: string;
  teacherName: string;
  teacherRole: string;
  createdAt: string;
  status: EscalationStatus;
  priority: EscalationPriority;
  aiChatSnippet: Array<{ sender: 'tutor' | 'student'; text: string }>;
  teacherResponse?: string;
  respondedAt?: string;
}
