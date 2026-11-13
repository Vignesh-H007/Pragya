import { Subject } from '../types';

export interface HeatmapTopicCell {
  dimensionId: 'definition' | 'procedure' | 'word_problem' | 'multi_step';
  dimensionLabel: string;
  weaknessScore: number; // 0 - 100 percentage
  severity: 'critical' | 'high' | 'moderate' | 'low';
  studentsCount: number;
  keyMisconception: string;
}

export interface TopicWeaknessRow {
  id: string;
  topicName: string;
  subject: Subject;
  classGrade: string;
  overallWeaknessScore: number; // failure/weakness rate %
  severity: 'critical' | 'high' | 'moderate' | 'low';
  totalStuckStudents: number;
  totalTested: number;
  rootMisconception: string;
  recommendedIntervention: string;
  subDimensions: HeatmapTopicCell[];
  stuckStudentNames: string[];
}

export interface FrequentlyAskedDoubt {
  id: string;
  question: string;
  subject: Subject;
  classGrade: string;
  topicName: string;
  frequencyCount: number; // e.g. 19 students
  frequencyPercentage: number; // e.g. 45%
  studentAvatars: { name: string; avatar: string }[];
  underlyingMisconception: string;
  status: 'pending' | 'agenda_added' | 'explained';
  upvotes: number;
  dateReported: string;
  sampleClarification: string;
}

export interface InactiveAtRiskStudent {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  classGrade: string;
  section: string;
  daysInactive: number;
  lastLogin: string;
  riskLevel: 'critical' | 'high' | 'moderate';
  missedMilestones: string[];
  attendanceRate: number; // e.g. 42%
  parentName: string;
  parentPhone: string;
  parentAlertStatus: 'Not Sent' | 'SMS Sent' | 'WhatsApp Alert' | 'Call Required';
  academicLagReason: string;
  counselorFlagged: boolean;
}

export interface StudentProgressProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  classGrade: string;
  section: string;
  subject: Subject;
  overallMasteryScore: number; // 0 - 100
  attendanceStatus: 'active_today' | 'active_recently' | 'at_risk';
  lastActiveText: string;
  quizzesCompleted: number;
  quizzesTotal: number;
  masteredTopicsCount: number;
  weakTopicsCount: number;
  masteredTopics: string[];
  strugglingTopics: { topic: string; score: number; level: 'critical' | 'high' | 'moderate' }[];
  diagnosticScore: number;
  attemptsCount: number;
  status: 'Needs Help' | 'In Progress' | 'Mastered';
  recentAchievement: string;
}

// 1. Topic Weakness Heatmap Data - Clean slate by default
export const MOCK_HEATMAP_TOPICS: TopicWeaknessRow[] = [];

export const DEMO_HEATMAP_TOPICS: TopicWeaknessRow[] = [
  {
    id: 'h-1',
    topicName: 'Integers: Operations with Negative Signs',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    overallWeaknessScore: 68,
    severity: 'critical',
    totalStuckStudents: 21,
    totalTested: 42,
    rootMisconception: 'Confusing subtraction of negatives (- -) with multiplication rules, leading to sign flip errors.',
    recommendedIntervention: 'Provide a dynamic interactive elevation line model with 10 visual floor-lift scenarios before symbolic notation.',
    stuckStudentNames: ['Aarav Patel', 'Rohan Mehra', 'Kabir Verma', 'Diya Sharma', 'Ananya Roy', 'Vivaan Joshi'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 54,
        severity: 'critical',
        studentsCount: 16,
        keyMisconception: 'Treats negative numbers as absolute values without direction.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 72,
        severity: 'critical',
        studentsCount: 22,
        keyMisconception: 'Calculates (-7) - (-12) as -19 instead of +5.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 76,
        severity: 'critical',
        studentsCount: 24,
        keyMisconception: 'Unable to formulate depth below sea level as negative integers.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 70,
        severity: 'critical',
        studentsCount: 20,
        keyMisconception: 'Order of operations fails when combining brackets with double negative signs.',
      },
    ],
  },
  {
    id: 'h-2',
    topicName: 'Fraction Division & Reciprocal Operations',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    overallWeaknessScore: 52,
    severity: 'critical',
    totalStuckStudents: 17,
    totalTested: 42,
    rootMisconception: 'Inverting dividend rather than divisor; unable to visualize division as grouping parts.',
    recommendedIntervention: 'Use visual fraction tile partitioning drills and benchmark pizza-slice problem sets.',
    stuckStudentNames: ['Diya Sharma', 'Rohan Mehra', 'Ishaan Gupta', 'Meera Nair', 'Tanvi Shah'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 42,
        severity: 'high',
        studentsCount: 13,
        keyMisconception: 'Thinks dividing by 1/2 makes a quantity smaller rather than twice as many parts.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 58,
        severity: 'critical',
        studentsCount: 18,
        keyMisconception: 'Multiplies straight across without flipping second fraction: (2/3) ÷ (4/5) = 8/15.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 61,
        severity: 'critical',
        studentsCount: 19,
        keyMisconception: 'Struggles to identify which quantity is being divided into equal containers.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 47,
        severity: 'high',
        studentsCount: 15,
        keyMisconception: 'Fails to convert mixed fractions into improper before finding reciprocals.',
      },
    ],
  },
  {
    id: 'h-3',
    topicName: 'Linear Equations: Variable Balancing',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    overallWeaknessScore: 44,
    severity: 'high',
    totalStuckStudents: 14,
    totalTested: 42,
    rootMisconception: 'Moving terms across equal signs without reversing arithmetic sign (+ to -, × to ÷).',
    recommendedIntervention: 'Physical/digital balance scale manipulatives where both sides must maintain equilibrium.',
    stuckStudentNames: ['Kabir Verma', 'Aarav Patel', 'Aditya Sen', 'Pooja Iyer'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 36,
        severity: 'high',
        studentsCount: 11,
        keyMisconception: 'Views equal sign as "answer comes next" rather than an equivalence relation.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 48,
        severity: 'high',
        studentsCount: 15,
        keyMisconception: 'Subtracts from only one side when transposing constants: 3x + 5 = 20 -> 3x = 25.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 56,
        severity: 'critical',
        studentsCount: 17,
        keyMisconception: 'Confuses "five less than twice x" with 5 - 2x instead of 2x - 5.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 38,
        severity: 'high',
        studentsCount: 12,
        keyMisconception: 'Errors in distributive property when expanding expressions like 4(2x - 3).',
      },
    ],
  },
  {
    id: 'h-4',
    topicName: 'Triangles: Exterior Angle Property & Congruence',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    overallWeaknessScore: 35,
    severity: 'high',
    totalStuckStudents: 12,
    totalTested: 42,
    rootMisconception: 'Confusing exterior angle with adjacent interior angle instead of sum of opposite interior angles.',
    recommendedIntervention: 'Geometric tracing exercises and dynamic angle-tear proof demonstration.',
    stuckStudentNames: ['Meera Nair', 'Tanvi Shah', 'Vivaan Joshi'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 30,
        severity: 'moderate',
        studentsCount: 9,
        keyMisconception: 'Identifies non-extended adjacent angles as exterior angles.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 37,
        severity: 'high',
        studentsCount: 11,
        keyMisconception: 'Subtracts from 180° instead of adding opposite interior angles directly.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 41,
        severity: 'high',
        studentsCount: 13,
        keyMisconception: 'Struggles with composite geometric figures containing parallel lines.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 32,
        severity: 'moderate',
        studentsCount: 10,
        keyMisconception: 'Applying ASA vs AAS criteria inconsistently in proof statements.',
      },
    ],
  },
  {
    id: 'h-5',
    topicName: 'Ratios, Percentages & Unitary Method',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    overallWeaknessScore: 26,
    severity: 'moderate',
    totalStuckStudents: 9,
    totalTested: 42,
    rootMisconception: 'Difficulty computing percentage increases vs decreases; denominator selection confusion.',
    recommendedIntervention: 'Real-world retail discount and bill receipt analysis worksheets.',
    stuckStudentNames: ['Siddharth Rao', 'Ishaan Gupta'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 22,
        severity: 'moderate',
        studentsCount: 7,
        keyMisconception: 'Confusing ratio 3:4 with fraction of whole (3/7 vs 3/4).',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 25,
        severity: 'moderate',
        studentsCount: 8,
        keyMisconception: 'Multiplication by 100 misplaced when converting decimal to percentage.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 34,
        severity: 'moderate',
        studentsCount: 11,
        keyMisconception: 'Using new price instead of original cost as base in profit percentage.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 24,
        severity: 'moderate',
        studentsCount: 8,
        keyMisconception: 'Multi-item unitary method scaling steps skipped prematurely.',
      },
    ],
  },
  {
    id: 'h-6',
    topicName: 'Acids, Bases & pH Neutralization Reactions',
    subject: 'Science',
    classGrade: 'Class 7',
    overallWeaknessScore: 48,
    severity: 'high',
    totalStuckStudents: 16,
    totalTested: 42,
    rootMisconception: 'Belief that neutralization always results in neutral pH 7 without considering weak/strong reagents.',
    recommendedIntervention: 'Virtual indicator lab showing litmus and phenolphthalein color titration transitions.',
    stuckStudentNames: ['Ananya Roy', 'Aarav Patel', 'Rohan Mehra', 'Meera Nair'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 38,
        severity: 'high',
        studentsCount: 12,
        keyMisconception: 'Associating all sour substances with harmful mineral acids.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 46,
        severity: 'high',
        studentsCount: 15,
        keyMisconception: 'Writing chemical formulas for salts produced in neutralization (e.g. NaCl, MgSO4).',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 54,
        severity: 'critical',
        studentsCount: 17,
        keyMisconception: 'Explaining soil treatment with slaked lime in agricultural scenarios.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 52,
        severity: 'critical',
        studentsCount: 16,
        keyMisconception: 'Predicting color change sequences through dual indicators.',
      },
    ],
  },
  {
    id: 'h-7',
    topicName: 'Heat Transfer: Conduction, Convection & Radiation',
    subject: 'Science',
    classGrade: 'Class 7',
    overallWeaknessScore: 38,
    severity: 'high',
    totalStuckStudents: 13,
    totalTested: 42,
    rootMisconception: 'Confusing heat (thermal energy transfer) with temperature (average kinetic energy).',
    recommendedIntervention: 'Thermal simulator demonstrating molecular particle collisions and vacuum flask mechanics.',
    stuckStudentNames: ['Vivaan Joshi', 'Tanvi Shah', 'Kabir Verma'],
    subDimensions: [
      {
        dimensionId: 'definition',
        dimensionLabel: 'Conceptual Foundations',
        weaknessScore: 32,
        severity: 'moderate',
        studentsCount: 10,
        keyMisconception: 'Believing wool blankets "generate heat" rather than acting as thermal insulators.',
      },
      {
        dimensionId: 'procedure',
        dimensionLabel: 'Procedural Execution',
        weaknessScore: 36,
        severity: 'high',
        studentsCount: 12,
        keyMisconception: 'Calculating Celsius to Fahrenheit conversions accurately.',
      },
      {
        dimensionId: 'word_problem',
        dimensionLabel: 'Word Problem Contexts',
        weaknessScore: 44,
        severity: 'high',
        studentsCount: 14,
        keyMisconception: 'Differentiating sea breeze vs land breeze convection currents.',
      },
      {
        dimensionId: 'multi_step',
        dimensionLabel: 'Multi-Step Expressions',
        weaknessScore: 40,
        severity: 'high',
        studentsCount: 13,
        keyMisconception: 'Analyzing multi-layer vacuum thermos insulation mechanisms.',
      },
    ],
  },
];

// 2. Frequently Asked Doubts Data - Clean slate by default
export const MOCK_FREQUENT_DOUBTS: FrequentlyAskedDoubt[] = [];

export const DEMO_FREQUENT_DOUBTS: FrequentlyAskedDoubt[] = [
  {
    id: 'fd-1',
    question: 'Why do we flip the second fraction (find reciprocal) when dividing fractions instead of dividing numerator and denominator directly?',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    topicName: 'Fraction Division & Reciprocals',
    frequencyCount: 19,
    frequencyPercentage: 45,
    studentAvatars: [
      { name: 'Diya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
      { name: 'Aarav Patel', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
      { name: 'Rohan Mehra', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
      { name: 'Meera Nair', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    ],
    underlyingMisconception: 'Students memorize "keep, change, flip" mechanically without grasping that dividing by 1/4 asks "how many one-fourths fit into the whole", which multiplies the count by 4.',
    status: 'pending',
    upvotes: 27,
    dateReported: '2 hours ago',
    sampleClarification: 'Show with a ribbon of length 3 meters: If each strip is 1/2 meter, how many strips? 3 ÷ (1/2) = 3 × 2 = 6 strips!',
  },
  {
    id: 'fd-2',
    question: 'Why does multiplying two negative numbers (-4) × (-3) result in a positive (+12), but adding them (-4) + (-3) gives a negative (-7)?',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    topicName: 'Integers: Negative Numbers Operations',
    frequencyCount: 22,
    frequencyPercentage: 52,
    studentAvatars: [
      { name: 'Rohan Mehra', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
      { name: 'Kabir Verma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
      { name: 'Aarav Patel', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
      { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
    ],
    underlyingMisconception: 'Students conflate the addition rule ("debt plus more debt is deeper debt") with the multiplication rule ("reversing direction twice points forward").',
    status: 'agenda_added',
    upvotes: 34,
    dateReported: 'Today, 11:30 AM',
    sampleClarification: 'Walking analogy: Moving backwards at 3 steps/min for 4 minutes backwards in time (-4 × -3) puts you 12 steps ahead of where you started.',
  },
  {
    id: 'fd-3',
    question: 'Why does temperature stay constant at 100°C during boiling even though heat is continuously being supplied?',
    subject: 'Science',
    classGrade: 'Class 7',
    topicName: 'Heat Transfer & Latent Heat',
    frequencyCount: 16,
    frequencyPercentage: 38,
    studentAvatars: [
      { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
      { name: 'Vivaan Joshi', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80' },
      { name: 'Tanvi Shah', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
    ],
    underlyingMisconception: 'Assuming all added heat must increase thermometer readings, unaware that latent heat of vaporization is spent breaking intermolecular hydrogen bonds.',
    status: 'pending',
    upvotes: 21,
    dateReported: 'Yesterday',
    sampleClarification: 'Energy is consumed to untangle water molecules from liquid state into free vapor, not to increase particle speed (temperature).',
  },
  {
    id: 'fd-4',
    question: 'How do I know whether to switch the inequality sign when solving equations with negative variables like -2x < 8?',
    subject: 'Mathematics',
    classGrade: 'Class 7',
    topicName: 'Linear Equations & Inequalities',
    frequencyCount: 14,
    frequencyPercentage: 33,
    studentAvatars: [
      { name: 'Kabir Verma', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
      { name: 'Ishaan Gupta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80' },
    ],
    underlyingMisconception: 'Students memorize rules blindly without testing on numbers: 2 < 4, but if we multiply by -1, -2 is actually greater than -4.',
    status: 'explained',
    upvotes: 18,
    dateReported: '3 days ago',
    sampleClarification: 'Test with a thermometer or number line: -2 is higher/hotter than -4 on the vertical scale.',
  },
  {
    id: 'fd-5',
    question: 'If baking soda is basic and lemon juice is acidic, why does mixing them bubble violently if they neutralize each other?',
    subject: 'Science',
    classGrade: 'Class 7',
    topicName: 'Acids, Bases & Neutralization',
    frequencyCount: 12,
    frequencyPercentage: 29,
    studentAvatars: [
      { name: 'Aarav Patel', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
      { name: 'Meera Nair', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    ],
    underlyingMisconception: 'Students expect neutralization to be instantaneous and quiet, forgetting that carbonic acid rapidly decomposes into water and CO2 gas bubbles.',
    status: 'pending',
    upvotes: 15,
    dateReported: '4 days ago',
    sampleClarification: 'The bubbling IS the reaction happening: sodium bicarbonate + citric acid releases carbon dioxide gas as products settle.',
  },
];

// 3. Students Who Haven't Logged In (At-Risk Alert) Data - Clean slate by default
export const MOCK_INACTIVE_AT_RISK_STUDENTS: InactiveAtRiskStudent[] = [];

export const DEMO_INACTIVE_AT_RISK_STUDENTS: InactiveAtRiskStudent[] = [
  {
    id: 'ar-1',
    name: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-18',
    classGrade: 'Class 7',
    section: 'Section B',
    daysInactive: 9,
    lastLogin: 'Oct 09, 04:12 PM',
    riskLevel: 'critical',
    missedMilestones: [
      'Missed Mid-Term Diagnostic Quiz #2',
      'Zero Practice Drills in 2 weeks',
      '3 Pending Homework Modules',
    ],
    attendanceRate: 38,
    parentName: 'Sanjay Malhotra',
    parentPhone: '+91 98201 44521',
    parentAlertStatus: 'Call Required',
    academicLagReason: 'Prolonged illness reported early October; no portal access recorded since recovery.',
    counselorFlagged: true,
  },
  {
    id: 'ar-2',
    name: 'Pooja Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-23',
    classGrade: 'Class 7',
    section: 'Section A',
    daysInactive: 7,
    lastLogin: 'Oct 11, 09:45 AM',
    riskLevel: 'critical',
    missedMilestones: [
      'Missed Negative Integers Remedial Quiz',
      'Linear Equations Practice Drill Overdue',
    ],
    attendanceRate: 46,
    parentName: 'Lakshmi Iyer',
    parentPhone: '+91 98410 88219',
    parentAlertStatus: 'SMS Sent',
    academicLagReason: 'Family travel; mobile hotspot connection reported unstable.',
    counselorFlagged: true,
  },
  {
    id: 'ar-3',
    name: 'Devanshu Nambiar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-31',
    classGrade: 'Class 7',
    section: 'Section B',
    daysInactive: 5,
    lastLogin: 'Oct 13, 06:20 PM',
    riskLevel: 'high',
    missedMilestones: [
      'Science Heat Transfer Virtual Lab Incomplete',
      '1 Weekly Mastery Checkpoint Missed',
    ],
    attendanceRate: 58,
    parentName: 'Girish Nambiar',
    parentPhone: '+91 97112 33490',
    parentAlertStatus: 'WhatsApp Alert',
    academicLagReason: 'Device sharing with elder sibling during exam week.',
    counselorFlagged: false,
  },
  {
    id: 'ar-4',
    name: 'Simran Kaur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-35',
    classGrade: 'Class 7',
    section: 'Section A',
    daysInactive: 4,
    lastLogin: 'Oct 14, 02:15 PM',
    riskLevel: 'moderate',
    missedMilestones: [
      'Fraction Division Remediation Drill Pending',
    ],
    attendanceRate: 64,
    parentName: 'Harpreet Kaur',
    parentPhone: '+91 99880 77123',
    parentAlertStatus: 'Not Sent',
    academicLagReason: 'Participating in inter-school basketball championship camp.',
    counselorFlagged: false,
  },
  {
    id: 'ar-5',
    name: 'Vikramaditya Rao',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-39',
    classGrade: 'Class 7',
    section: 'Section C',
    daysInactive: 6,
    lastLogin: 'Oct 12, 11:10 AM',
    riskLevel: 'high',
    missedMilestones: [
      'Missed 2 Class Diagnostic Assessments',
      'No Practice Submissions for 10 days',
    ],
    attendanceRate: 52,
    parentName: 'Venkatesh Rao',
    parentPhone: '+91 98450 11982',
    parentAlertStatus: 'WhatsApp Alert',
    academicLagReason: 'Frequent logins initiated on parent phone but quiz sessions abandoned mid-way.',
    counselorFlagged: true,
  },
];

// 4. Individual Student Progress Profiles - Clean slate by default
export const MOCK_STUDENT_PROFILES: StudentProgressProfile[] = [];

export const DEMO_STUDENT_PROFILES: StudentProgressProfile[] = [
  {
    id: 'sp-1',
    name: 'Aarav Patel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-01',
    classGrade: 'Class 7',
    section: 'Section A',
    subject: 'Mathematics',
    overallMasteryScore: 48,
    attendanceStatus: 'active_today',
    lastActiveText: 'Active 25 mins ago',
    quizzesCompleted: 6,
    quizzesTotal: 10,
    masteredTopicsCount: 4,
    weakTopicsCount: 3,
    masteredTopics: ['Simple Equations', 'Lines & Angles', 'Data Handling', 'Rational Numbers'],
    strugglingTopics: [
      { topic: 'Integers: Negative Signs', score: 32, level: 'critical' },
      { topic: 'Fraction Division', score: 44, level: 'high' },
      { topic: 'Linear Equations', score: 52, level: 'moderate' },
    ],
    diagnosticScore: 32,
    attemptsCount: 3,
    status: 'Needs Help',
    recentAchievement: 'Mastered Rational Number conversion module with 90% in drill 2.',
  },
  {
    id: 'sp-2',
    name: 'Diya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-04',
    classGrade: 'Class 7',
    section: 'Section A',
    subject: 'Mathematics',
    overallMasteryScore: 62,
    attendanceStatus: 'active_today',
    lastActiveText: 'Active 1 hour ago',
    quizzesCompleted: 8,
    quizzesTotal: 10,
    masteredTopicsCount: 6,
    weakTopicsCount: 2,
    masteredTopics: ['Integers Addition', 'Decimals & Units', 'Perimeter & Area', 'Algebra Basics', 'Angles & Transversal', 'Symmetry'],
    strugglingTopics: [
      { topic: 'Fraction Division & Reciprocals', score: 40, level: 'critical' },
      { topic: 'Percentage Unitary Method', score: 55, level: 'moderate' },
    ],
    diagnosticScore: 40,
    attemptsCount: 2,
    status: 'In Progress',
    recentAchievement: 'Completed 3 visual pizza fraction exercises yesterday.',
  },
  {
    id: 'sp-3',
    name: 'Rohan Mehra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-09',
    classGrade: 'Class 7',
    section: 'Section B',
    subject: 'Mathematics',
    overallMasteryScore: 38,
    attendanceStatus: 'active_recently',
    lastActiveText: 'Active yesterday',
    quizzesCompleted: 5,
    quizzesTotal: 10,
    masteredTopicsCount: 3,
    weakTopicsCount: 4,
    masteredTopics: ['Basic Arithmetic', 'Bar Graphs', '2D Shapes'],
    strugglingTopics: [
      { topic: 'Negative Integers Multiplication', score: 28, level: 'critical' },
      { topic: 'Fraction Reciprocals', score: 35, level: 'critical' },
      { topic: 'Linear Equations Transposition', score: 42, level: 'high' },
      { topic: 'Triangle Congruence Rules', score: 48, level: 'moderate' },
    ],
    diagnosticScore: 28,
    attemptsCount: 4,
    status: 'Needs Help',
    recentAchievement: 'Practiced 15 number line problems on Pragya practice mode.',
  },
  {
    id: 'sp-4',
    name: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-12',
    classGrade: 'Class 7',
    section: 'Section A',
    subject: 'Science',
    overallMasteryScore: 71,
    attendanceStatus: 'active_today',
    lastActiveText: 'Active 10 mins ago',
    quizzesCompleted: 9,
    quizzesTotal: 10,
    masteredTopicsCount: 7,
    weakTopicsCount: 1,
    masteredTopics: ['Nutrition in Plants', 'Respiration in Organisms', 'Motion & Time', 'Electric Circuits', 'Light & Reflection', 'Physical & Chemical Changes', 'Water: A Precious Resource'],
    strugglingTopics: [
      { topic: 'Acids, Bases & Neutralization', score: 44, level: 'high' },
    ],
    diagnosticScore: 44,
    attemptsCount: 2,
    status: 'In Progress',
    recentAchievement: 'Scored 100% on Electric Circuits simulation test.',
  },
  {
    id: 'sp-5',
    name: 'Kabir Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-15',
    classGrade: 'Class 7',
    section: 'Section B',
    subject: 'Mathematics',
    overallMasteryScore: 54,
    attendanceStatus: 'active_recently',
    lastActiveText: 'Active 2 days ago',
    quizzesCompleted: 7,
    quizzesTotal: 10,
    masteredTopicsCount: 5,
    weakTopicsCount: 2,
    masteredTopics: ['Fractions Addition', 'Integers Basics', 'Data Tables', 'Simple Perimeter', 'Exponents'],
    strugglingTopics: [
      { topic: 'Linear Equations in One Variable', score: 38, level: 'critical' },
      { topic: 'Negative Number Division', score: 48, level: 'high' },
    ],
    diagnosticScore: 38,
    attemptsCount: 3,
    status: 'In Progress',
    recentAchievement: 'Improved from 22% to 48% on integer division review.',
  },
  {
    id: 'sp-6',
    name: 'Meera Nair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rollNumber: 'C7-20',
    classGrade: 'Class 7',
    section: 'Section C',
    subject: 'Mathematics',
    overallMasteryScore: 84,
    attendanceStatus: 'active_today',
    lastActiveText: 'Active 5 mins ago',
    quizzesCompleted: 10,
    quizzesTotal: 10,
    masteredTopicsCount: 9,
    weakTopicsCount: 1,
    masteredTopics: ['Integers Master', 'Fractions & Decimals', 'Linear Equations', 'Ratio & Proportion', 'Perimeter & Area', 'Probability', 'Exponents', 'Congruence', 'Solid Shapes'],
    strugglingTopics: [
      { topic: 'Exterior Angle Proof Writing', score: 62, level: 'moderate' },
    ],
    diagnosticScore: 78,
    attemptsCount: 1,
    status: 'Mastered',
    recentAchievement: 'Earned Class 7 Mathematics Top Performer Badge with 10 completed quizzes.',
  },
];
