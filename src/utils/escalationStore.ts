import { EscalationTicket } from '../types';

export interface TeacherInfo {
  name: string;
  role: string;
  subject: string;
  avatar: string;
  email: string;
  responseTime: string;
}

export const TEACHER_DIRECTORY: Record<string, TeacherInfo> = {
  Mathematics: {
    name: 'Ms. Shalini Roy',
    role: 'Class Teacher & Senior Math Mentor',
    subject: 'Mathematics',
    avatar: 'SR',
    email: 'shalini.roy@oakridge.edu',
    responseTime: '~2 hours (during school hours)',
  },
  Science: {
    name: 'Mr. Vikram Rao',
    role: 'Science Lead & Biology Mentor',
    subject: 'Science',
    avatar: 'VR',
    email: 'vikram.rao@oakridge.edu',
    responseTime: '~1.5 hours',
  },
  Physics: {
    name: 'Mr. Vikram Rao',
    role: 'Senior Physics Specialist',
    subject: 'Physics',
    avatar: 'VR',
    email: 'vikram.rao@oakridge.edu',
    responseTime: '~1.5 hours',
  },
  EVS: {
    name: 'Ms. Preeti Verma',
    role: 'Primary Environmental Studies Guide',
    subject: 'EVS',
    avatar: 'PV',
    email: 'preeti.verma@oakridge.edu',
    responseTime: '~1 hour',
  },
  English: {
    name: 'Mrs. Ananya Gupta',
    role: 'Department Head - Language & Literature',
    subject: 'English',
    avatar: 'AG',
    email: 'ananya.gupta@oakridge.edu',
    responseTime: '~3 hours',
  },
  'Social Science': {
    name: 'Dr. Rajesh Mehta',
    role: 'Social Studies & Civics Faculty',
    subject: 'Social Science',
    avatar: 'RM',
    email: 'rajesh.mehta@oakridge.edu',
    responseTime: '~2 hours',
  },
  Hindi: {
    name: 'Mrs. Sunita Sharma',
    role: 'Senior Hindi Language Faculty',
    subject: 'Hindi',
    avatar: 'SS',
    email: 'sunita.sharma@oakridge.edu',
    responseTime: '~2.5 hours',
  },
};

export const getTeacherForSubject = (subject: string): TeacherInfo => {
  return (
    TEACHER_DIRECTORY[subject] || {
      name: 'Ms. Shalini Roy',
      role: 'Class Teacher & Academic Mentor',
      subject: subject || 'General',
      avatar: 'SR',
      email: 'shalini.roy@oakridge.edu',
      responseTime: '~2 hours',
    }
  );
};

const STORAGE_KEY = 'pragya_escalation_tickets_v1';

const INITIAL_SEEDED_TICKETS: EscalationTicket[] = [];

export const DEMO_SEEDED_TICKETS: EscalationTicket[] = [
  {
    id: 'esc-seed-1',
    ticketNumber: 'ESC-301',
    studentName: 'Aarav Sharma',
    studentClass: 'Class 7',
    subject: 'Mathematics',
    topic: 'Fraction Division & Reciprocals',
    studentDoubt: 'I understand regular division, but I do not get why we must flip the second fraction (reciprocal) when dividing fractions.',
    teacherName: 'Ms. Shalini Roy',
    teacherRole: 'Class Teacher & Senior Math Mentor',
    createdAt: 'Today at 10:15 AM',
    status: 'Teacher Responded',
    priority: 'Normal',
    aiChatSnippet: [
      { sender: 'student', text: 'Can you explain why 3/4 ÷ 1/2 equals 3/4 × 2/1?' },
      { sender: 'tutor', text: 'Dividing by a fraction is the same as multiplying by its reciprocal. For example, dividing by 1/2 asks: how many halves fit inside 3/4?' },
      { sender: 'student', text: 'I still don\'t get why flipping works logically.' },
    ],
    teacherResponse: 'Hi Aarav! Think of it like this: If you have 3 chocolate bars and divide each in half, how many half-bars do you get? 3 ÷ 1/2 = 6! Because each whole bar gives TWO halves, dividing by 1/2 is literally multiplying the count by 2. We will also draw pizza slices in class tomorrow!',
    respondedAt: 'Today at 11:30 AM',
  },
];

export const getEscalationTickets = (): EscalationTicket[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_TICKETS));
      return INITIAL_SEEDED_TICKETS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEEDED_TICKETS;
  }
};

export const saveEscalationTicket = (
  ticket: Omit<EscalationTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status'>
): EscalationTicket => {
  const existing = getEscalationTickets();
  const nextNum = Math.floor(100 + Math.random() * 900);
  const newTicket: EscalationTicket = {
    ...ticket,
    id: `esc-${Date.now()}`,
    ticketNumber: `ESC-${nextNum}`,
    createdAt: 'Just now',
    status: 'Pending Review',
  };

  const updated = [newTicket, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('pragya_escalation_updated', { detail: newTicket }));
  return newTicket;
};

export const respondToTicket = (ticketId: string, response: string): EscalationTicket | null => {
  const existing = getEscalationTickets();
  const idx = existing.findIndex((t) => t.id === ticketId);
  if (idx === -1) return null;

  existing[idx] = {
    ...existing[idx],
    status: 'Teacher Responded',
    teacherResponse: response,
    respondedAt: 'Just now',
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent('pragya_escalation_updated', { detail: existing[idx] }));
  return existing[idx];
};

export const resolveTicket = (ticketId: string): EscalationTicket | null => {
  const existing = getEscalationTickets();
  const idx = existing.findIndex((t) => t.id === ticketId);
  if (idx === -1) return null;

  existing[idx] = {
    ...existing[idx],
    status: 'Resolved',
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent('pragya_escalation_updated', { detail: existing[idx] }));
  return existing[idx];
};
