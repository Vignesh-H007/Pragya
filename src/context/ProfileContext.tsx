import React, { createContext, useContext, useState, useEffect } from 'react';
import { FacultyProfile, StudentProfile, ParentProfile, Subject } from '../types';

export const AVATAR_PRESETS = [
  {
    id: 'faculty-1',
    label: 'Prof. Aarav (Academic Lead)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-2',
    label: 'Dr. Vikram (Mathematics)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-3',
    label: 'Prof. Priya (Science & Pedagogy)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-4',
    label: 'Dr. Raman (Curriculum Dean)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-5',
    label: 'Prof. Meera (STEM Diagnostic)',
    url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-6',
    label: 'Mr. Aniket (Digital Learning)',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-7',
    label: 'Dr. Sunita (English & Humanities)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
  {
    id: 'faculty-8',
    label: 'Prof. Rajesh (Computer Science)',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    category: 'faculty',
  },
];

export const DEFAULT_FACULTY_PROFILE: FacultyProfile = {
  id: 'fac-8841',
  name: 'Prof. Aarav Sundaram',
  title: 'Senior Faculty & Diagnostic Lead',
  department: 'Department of Mathematics & Pedagogic Science',
  institution: 'Sairam Vidyalaya CBSE',
  facultyId: 'FAC-2024-8841',
  email: 'aarav.sundaram@sairam.edu.in',
  phone: '+91 98765 43210',
  officeLocation: 'Ramanujan Academic Block, Room 304',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  bio: 'Passionate educator with 12+ years of experience specializing in cognitive gap remediation, scaffolded concept diagnosis, and interactive mathematics mastery across CBSE middle & high school curricula.',
  teachingPhilosophy: 'Every misconception is simply an unpaved stepping stone. With diagnostic precision and compassionate scaffolding, no student is left behind.',
  yearsOfExperience: 12,
  qualifications: [
    'M.Sc. Mathematics — Indian Institute of Technology (IIT) Madras',
    'B.Ed. Pedagogy & Curriculum Evaluation — Delhi University',
    'CBSE Certified Master Diagnostician & Item Writer',
    'National Science & Math Olympiad Faculty Mentor',
  ],
  assignedClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
  primarySubjects: ['Mathematics', 'Science'],
  consultationHours: 'Monday to Friday • 3:30 PM - 5:00 PM (IST)',
  metrics: {
    studentsMentored: 248,
    gapsRemediated: 184,
    remediationSuccessRate: 92.4,
    pedagogicRating: 4.9,
    activeInterventions: 19,
  },
  badges: [
    {
      id: 'b1',
      title: 'Top Diagnostic Specialist',
      desc: 'Identified and scaffolded over 150 critical learning gaps in real-time.',
      icon: 'Award',
      earnedDate: 'Aug 2024',
    },
    {
      id: 'b2',
      title: 'CBSE Master Trainer',
      desc: 'Accredited faculty trainer for competency-based questioning frameworks.',
      icon: 'Sparkles',
      earnedDate: 'Jan 2024',
    },
    {
      id: 'b3',
      title: 'Zero-Stuck Batch Leader',
      desc: 'Achieved 90%+ diagnostic mastery rate in Grade 7 linear equations cohort.',
      icon: 'CheckCircle2',
      earnedDate: 'Jul 2024',
    },
    {
      id: 'b4',
      title: 'AI Diagnostic Co-Pilot',
      desc: 'Pioneered Pragya AI diagnostic escalation and remediation system.',
      icon: 'Bot',
      earnedDate: 'Sep 2024',
    },
  ],
  notificationPreferences: {
    emailDigest: true,
    urgentGapAlerts: true,
    dailyMorningBrief: true,
    parentEscalationSMS: true,
  },
};

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'stud-1029',
  name: 'Aarav Sharma',
  rollNumber: '7B-14',
  classGrade: 'Class 7',
  section: 'Section B',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  bio: 'Curious learner enthusiastic about geometry, robotics, and Minecraft quest exploration.',
  favoriteSubject: 'Mathematics',
  guardianName: 'Rajesh & Priya Sharma',
  guardianContact: '+91 98450 11223',
  targetGoal: 'Master negative integers and algebraic expressions before mid-term exams.',
};

export const DEFAULT_PARENT_PROFILE: ParentProfile = {
  id: 'parent-302',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@example.com',
  phone: '+91 98450 11223',
  children: [
    {
      id: 'stud-1029',
      name: 'Aarav Sharma',
      classGrade: 'Class 7',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'stud-2041',
      name: 'Ananya Sharma',
      classGrade: 'Class 4',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    },
  ],
};

interface ProfileContextType {
  facultyProfile: FacultyProfile;
  updateFacultyProfile: (updates: Partial<FacultyProfile>) => void;
  resetFacultyProfile: () => void;
  studentProfile: StudentProfile;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  parentProfile: ParentProfile;
  updateParentProfile: (updates: Partial<ParentProfile>) => void;
  avatarPresets: typeof AVATAR_PRESETS;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [facultyProfile, setFacultyProfile] = useState<FacultyProfile>(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_faculty_profile_v1');
      if (saved) {
        return { ...DEFAULT_FACULTY_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load faculty profile', e);
    }
    return DEFAULT_FACULTY_PROFILE;
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_student_profile_v1');
      if (saved) {
        return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load student profile', e);
    }
    return DEFAULT_STUDENT_PROFILE;
  });

  const [parentProfile, setParentProfile] = useState<ParentProfile>(() => {
    try {
      const saved = localStorage.getItem('learnbuddy_parent_profile_v1');
      if (saved) {
        return { ...DEFAULT_PARENT_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load parent profile', e);
    }
    return DEFAULT_PARENT_PROFILE;
  });

  const updateFacultyProfile = (updates: Partial<FacultyProfile>) => {
    setFacultyProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('learnbuddy_faculty_profile_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save faculty profile', e);
      }
      return updated;
    });
  };

  const resetFacultyProfile = () => {
    setFacultyProfile(DEFAULT_FACULTY_PROFILE);
    try {
      localStorage.setItem('learnbuddy_faculty_profile_v1', JSON.stringify(DEFAULT_FACULTY_PROFILE));
    } catch (e) {
      console.error('Failed to reset faculty profile', e);
    }
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('learnbuddy_student_profile_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save student profile', e);
      }
      return updated;
    });
  };

  const updateParentProfile = (updates: Partial<ParentProfile>) => {
    setParentProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('learnbuddy_parent_profile_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save parent profile', e);
      }
      return updated;
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        facultyProfile,
        updateFacultyProfile,
        resetFacultyProfile,
        studentProfile,
        updateStudentProfile,
        parentProfile,
        updateParentProfile,
        avatarPresets: AVATAR_PRESETS,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
