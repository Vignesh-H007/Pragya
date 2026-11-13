import React, { useState, useMemo } from 'react';
import {
  Flame,
  AlertCircle,
  Sparkles,
  Users,
  ChevronRight,
  Filter,
  Calculator,
  FlaskConical,
  BookOpen,
  Globe,
  Bot,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Layers,
  ArrowRight,
  Copy,
  Check,
  HelpCircle,
  Maximize2,
  Minimize2,
  Brain,
  ShieldAlert,
  ListChecks,
  Target,
  Clock,
  Sparkle,
} from 'lucide-react';
import { TopicFailureStat, Subject } from '../types';
import { useDashboardTheme } from '../context/ThemeContext';

interface HardestTopicBarChartProps {
  topics: TopicFailureStat[];
  selectedSubject: Subject;
  onSelectTopicFilter: (topicName: string) => void;
  activeFilterTopic: string | null;
}

export const HardestTopicBarChart: React.FC<HardestTopicBarChartProps> = ({
  topics,
  selectedSubject,
  onSelectTopicFilter,
  activeFilterTopic,
}) => {
  const { style } = useDashboardTheme();
  const filteredTopics =
    selectedSubject === 'All'
      ? topics
      : topics.filter((t) => t.subject === selectedSubject || t.isNumberOneHardest);


  // Sort descending by failureRate
  const sortedTopics = [...filteredTopics].sort((a, b) => b.failureRate - a.failureRate);
  const numberOneHardest = sortedTopics.find((t) => t.isNumberOneHardest) || sortedTopics[0];

  const [selectedTopic, setSelectedTopic] = useState<TopicFailureStat>(
    activeFilterTopic
      ? sortedTopics.find((t) => t.topicName === activeFilterTopic) || numberOneHardest
      : numberOneHardest
  );

  const [aiTipState, setAiTipState] = useState<'diagnosis' | 'action' | 'resource'>('diagnosis');

  // Helper for Subject icon and styling
  const getSubjectBadge = (subject: Subject) => {
    switch (subject) {
      case 'Mathematics':
        return {
          icon: <Calculator className="w-3.5 h-3.5" />,
          pillClass: 'bg-blue-100/80 text-blue-700 border-blue-200/90',
          accent: 'from-blue-500 to-indigo-600',
          lightBg: 'bg-blue-50',
          borderColor: 'border-blue-200',
        };
      case 'Science':
        return {
          icon: <FlaskConical className="w-3.5 h-3.5" />,
          pillClass: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/90',
          accent: 'from-emerald-500 to-teal-600',
          lightBg: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
        };
      case 'English':
        return {
          icon: <BookOpen className="w-3.5 h-3.5" />,
          pillClass: 'bg-rose-100/80 text-rose-700 border-rose-200/90',
          accent: 'from-rose-500 to-pink-600',
          lightBg: 'bg-rose-50',
          borderColor: 'border-rose-200',
        };
      case 'Social Science':
        return {
          icon: <Globe className="w-3.5 h-3.5" />,
          pillClass: 'bg-amber-100/80 text-amber-700 border-amber-200/90',
          accent: 'from-amber-500 to-orange-600',
          lightBg: 'bg-amber-50',
          borderColor: 'border-amber-200',
        };
      default:
        return {
          icon: <Layers className="w-3.5 h-3.5" />,
          pillClass: 'bg-purple-100/80 text-purple-700 border-purple-200/90',
          accent: 'from-purple-500 to-indigo-600',
          lightBg: 'bg-purple-50',
          borderColor: 'border-purple-200',
        };
    }
  };

  // AI Prescription Interactive State
  const [prescriptionView, setPrescriptionView] = useState<'all' | 'script' | 'question' | 'scaffold'>('all');
  const [showDistractorAnalysis, setShowDistractorAnalysis] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);

  // Helper to retrieve detailed diagnostic prescription facets per topic
  const getPrescriptionDetails = (topic: TopicFailureStat) => {
    const isIntegers = topic.topicName.toLowerCase().includes('integer');
    const isFractions = topic.topicName.toLowerCase().includes('fraction');
    const isLinear = topic.topicName.toLowerCase().includes('linear');
    const isScience = topic.subject === 'Science';

    if (isIntegers) {
      return {
        mentalTrapQuote: '“I see three minus signs in (-5) - (-8), so subtracting a negative must make it more negative: -13.”',
        studentIntuition: 'Students conflate the minus operation symbol with directional negative magnitude, failing to see subtracting negative as removing debt.',
        lessonSteps: [
          { phase: '1. Concrete (3 min)', text: 'Use a toy elevator: ground floor is 0, basement is -5. Subtraction means removing downward pressure: moving UP 8 floors.' },
          { phase: '2. Pictorial (4 min)', text: 'Draw red (-) and blue (+) counters. To take away 8 red counters from 5 red counters, add 3 zero-pairs (+/-).' },
          { phase: '3. Abstract (3 min)', text: 'Synthesize the sign inversion identity: a - (-b) ≡ a + b. Drill 5 rapid-fire mental conversions.' },
        ],
        exitQuestion: {
          prompt: 'During winter in Leh, the morning temperature is -4°C. By noon it rises by 9°C, but by midnight it drops by 12°C. What is the midnight temperature?',
          options: [
            { id: 'A', text: '-7°C', isCorrect: true, explanation: '-4 + 9 = +5°C; +5 - 12 = -7°C. Correct two-step execution.' },
            { id: 'B', text: '-25°C', isCorrect: false, explanation: 'Cognitive Trap: Student treated all operations as additive negative accumulations.' },
            { id: 'C', text: '+7°C', isCorrect: false, explanation: 'Sign error on the final drop: +5 - 12 incorrectly inverted to positive 7.' },
            { id: 'D', text: '-15°C', isCorrect: false, explanation: 'Arithmetic step failure during first addition.' },
          ],
        },
        scaffolding: {
          level1: 'Level 1 (Struggling): Interactive physical number line slider with colored directional arrows.',
          level2: 'Level 2 (Developing): 2-step rewrite template turning subtraction into addition of opposites.',
          level3: 'Level 3 (Extension): Real-world bank statement balance sheets with overdraft debits and credits.',
        },
        cascadeRisk: 'Immediate bottleneck for Class 8 Algebra (Polynomial expansions) and Physics (Kinematics coordinate systems).',
      };
    }

    if (isFractions) {
      return {
        mentalTrapQuote: '“To divide 3/4 by 2/3, I just divide 3 by 2 and 4 by 3, or flip the first fraction.”',
        studentIntuition: 'Students execute arbitrary algorithmic flipping without comprehending that division asks: “How many groups of 2/3 fit into 3/4?”',
        lessonSteps: [
          { phase: '1. Concrete (3 min)', text: 'Cut paper strips representing whole units into halves, thirds, and fourths to physically measure overlap.' },
          { phase: '2. Pictorial (4 min)', text: 'Bar model comparison: shade 3/4 of a bar, then shade units of 2/3 to show 1 full unit plus an 1/8 portion fits.' },
          { phase: '3. Abstract (3 min)', text: 'Establish reciprocal principle: multiplying by divisor reciprocal is mathematically identical to division.' },
        ],
        exitQuestion: {
          prompt: 'A recipe requires 3/4 cup of sugar. You only have a measuring scoop of size 1/8 cup. How many full scoops do you need?',
          options: [
            { id: 'A', text: '6 scoops', isCorrect: true, explanation: '3/4 ÷ 1/8 = 3/4 × 8/1 = 24/4 = 6. Correct reciprocal logic.' },
            { id: 'B', text: '3/32 scoops', isCorrect: false, explanation: 'Common Trap: Multiplied numerators and denominators without inverting the divisor.' },
            { id: 'C', text: '2 scoops', isCorrect: false, explanation: 'Rough estimation error without computing precise fractions.' },
            { id: 'D', text: '8/3 scoops', isCorrect: false, explanation: 'Inverted the dividend (3/4) instead of the divisor (1/8).' },
          ],
        },
        scaffolding: {
          level1: 'Level 1 (Struggling): Visual grid models with transparent fractional overlays.',
          level2: 'Level 2 (Developing): “Keep-Change-Flip” guided anchor chart with color-coded reciprocals.',
          level3: 'Level 3 (Extension): Unit rate word problems involving speed, fuel consumption, and scale drawings.',
        },
        cascadeRisk: 'Critical prerequisite for Ratios & Proportions, Geometric Scaling, and Percentage equations.',
      };
    }

    if (isLinear) {
      return {
        mentalTrapQuote: '“When I move +7 across the equals sign to solve 3x + 7 = 22, it stays positive +7 on the other side.”',
        studentIntuition: 'Students treat the equals sign as an announcement of an answer rather than a balanced relational fulcrum.',
        lessonSteps: [
          { phase: '1. Concrete (3 min)', text: 'Physical two-pan balance scale: place 3 identical mystery bags (x) and 7 blocks on left, 22 on right.' },
          { phase: '2. Pictorial (4 min)', text: 'Dual-column algebra tiles showing inverse zero-pairing subtracted from both sides simultaneously.' },
          { phase: '3. Abstract (3 min)', text: 'Formal transposition rule: every term crossing the equality boundary inverts its sign (+ ↔ -, × ↔ ÷).' },
        ],
        exitQuestion: {
          prompt: 'Solve for x: 4x - 9 = 15. What is the value of x?',
          options: [
            { id: 'A', text: 'x = 6', isCorrect: true, explanation: '4x = 15 + 9 = 24; x = 24/4 = 6. Correct inverse operation steps.' },
            { id: 'B', text: 'x = 1.5', isCorrect: false, explanation: 'Common Trap: Subtracted 9 from 15 (15 - 9 = 6; 6/4 = 1.5) instead of adding.' },
            { id: 'C', text: 'x = 24', isCorrect: false, explanation: 'Forgot to perform the final division by the coefficient 4.' },
            { id: 'D', text: 'x = -6', isCorrect: false, explanation: 'Sign error during the final arithmetic division.' },
          ],
        },
        scaffolding: {
          level1: 'Level 1 (Struggling): Digital balance scale simulator with instant weight feedback.',
          level2: 'Level 2 (Developing): 2-step “Do/Undo” function machine flowcharts.',
          level3: 'Level 3 (Extension): Modeling geometry perimeter and angle sum equations.',
        },
        cascadeRisk: 'Blocks Grade 8 Simultaneous Equations, Quadratic Factorization, and Coordinate Geometry.',
      };
    }

    // Default / Science & General
    return {
      mentalTrapQuote: '“Students struggle to connect symbolic definitions with empirical cause-and-effect.”',
      studentIntuition: topic.rootCause,
      lessonSteps: [
        { phase: '1. Concrete (3 min)', text: 'Real-world visual or experimental hook: live indicator demonstration / sentence sorting.' },
        { phase: '2. Pictorial (4 min)', text: 'Comparative concept map contrasting core rules, exceptions, and key triggers.' },
        { phase: '3. Abstract (3 min)', text: 'Independent student exit check with 3 rapid targeted diagnostic prompts.' },
      ],
      exitQuestion: {
        prompt: `Diagnostic Check on ${topic.topicName.split(':')[0]}: Which statement correctly resolves the key principle?`,
        options: [
          { id: 'A', text: 'Standard application adhering strictly to fundamental concept rule.', isCorrect: true, explanation: 'Demonstrates clear grasp of foundational mechanics without common stumbling traps.' },
          { id: 'B', text: 'Common distractor relying on superficial memorization.', isCorrect: false, explanation: 'Cognitive Trap: Selected by students who confuse surface terminology with underlying logic.' },
          { id: 'C', text: 'Inverted operation based on incomplete rule recall.', isCorrect: false, explanation: 'Reflects partial understanding with procedural execution breakdown.' },
          { id: 'D', text: 'Irrelevant choice showing basic conceptual disengagement.', isCorrect: false, explanation: 'Indicates need for Level 1 concrete foundational re-orientation.' },
        ],
      },
      scaffolding: {
        level1: 'Level 1 (Struggling): Hands-on visual cards with color-coded prompt cues.',
        level2: 'Level 2 (Developing): Guided practice sheets with worked examples and step hints.',
        level3: 'Level 3 (Extension): Open-ended synthesis problems and peer-tutoring challenges.',
      },
      cascadeRisk: 'Impairs subsequent term units and summative diagnostic assessments.',
    };
  };

  const currentPrescription = selectedTopic ? getPrescriptionDetails(selectedTopic) : null;

  const handleCopyScript = () => {
    if (!currentPrescription || !selectedTopic) return;
    const text = `AI DIAGNOSTIC PRESCRIPTION: ${selectedTopic.topicName}\n\n1. MISCONCEPTION: ${selectedTopic.rootCause}\nStudent Logic: ${currentPrescription.mentalTrapQuote}\n\n2. 10-MIN LESSON SCRIPT:\n${currentPrescription.lessonSteps.map(s => `${s.phase}: ${s.text}`).join('\n')}\n\n3. EXIT TICKET:\n${currentPrescription.exitQuestion.prompt}\nCorrect: Option A\n\n4. SCAFFOLDING:\n${currentPrescription.scaffolding.level1}\n${currentPrescription.scaffolding.level2}\n${currentPrescription.scaffolding.level3}`;
    navigator.clipboard?.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };
  const parseTopicStructure = (fullName: string) => {
    if (fullName.includes(':')) {
      const [domain, ...rest] = fullName.split(':');
      return { domain: domain.trim(), concept: rest.join(':').trim() };
    }
    return { domain: fullName, concept: 'Foundational Competency' };
  };

  const handleBarClick = (topic: TopicFailureStat) => {
    setSelectedTopic(topic);
    onSelectTopicFilter(activeFilterTopic === topic.topicName ? '' : topic.topicName);
  };

  // Max failure rate for graph scale
  const maxRate = Math.max(...sortedTopics.map((t) => t.failureRate), 50);
  const yTicks = [50, 40, 30, 20, 10, 0];

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          container: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-xs',
          headerBorder: 'border-[#DDD4C7]',
          titleText: 'text-[#1C232B]',
          subText: 'text-[#5C6670]',
          accentIcon: 'text-[#246257]',
          botCard: 'bg-gradient-to-r from-[#246257] via-[#1C4E45] to-[#153D36] border border-[#246257]/40 text-white shadow-sm',
          botEyes: 'bg-[#12181C] border-emerald-400/60',
          botPulse: 'bg-emerald-300',
          botTipBtn: 'bg-white text-[#246257] hover:bg-emerald-50',
          cardBase: 'bg-white border-[#DDD4C7] hover:border-[#246257]/70 hover:bg-[#FAF7F0] text-[#1C232B]',
          cardActive: 'bg-white border-[#246257] ring-2 ring-[#246257]/30 text-[#246257] shadow-sm',
          cardTop: 'bg-[#C85340]/10 border-[#C85340]/30 hover:border-[#C85340]',
          graphCanvas: 'bg-white/80 border-[#DDD4C7]',
          graphTitle: 'text-[#1C232B]',
          graphBadge: 'bg-[#FAF7F0] text-[#5C6670] border-[#DDD4C7]',
          yAxisText: 'text-[#8A8276]',
          yAxisBorder: 'border-[#DDD4C7]/60',
          barTopGrad: 'bg-gradient-to-t from-[#C85340] via-orange-500 to-amber-400',
          barHighGrad: 'bg-gradient-to-t from-[#246257] to-teal-400',
          barStandardGrad: 'bg-gradient-to-t from-[#1C4E45] to-[#246257]',
          diagnosticCard: 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-sm',
          diagnosticHeaderBorder: 'border-[#DDD4C7]',
          tabActive: 'bg-[#246257] text-white shadow-xs',
          tabInactive: 'text-[#5C6670] hover:text-[#1C232B] hover:bg-[#FAF7F0]',
          misconceptionBox: 'bg-[#C85340]/10 border-[#C85340]/25 text-[#1C232B]',
          lessonScriptBox: 'bg-[#246257]/10 border-[#246257]/25 text-[#1C232B]',
          exitTicketBox: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          scaffoldBox: 'bg-[#D97706]/10 border-[#D97706]/25 text-[#1C232B]',
          cascadeBox: 'bg-[#C85340]/10 border-[#C85340]/25 text-[#1C232B]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          container: 'bg-[#121218] border-[#262633] text-slate-100 shadow-xl',
          headerBorder: 'border-[#262633]',
          titleText: 'text-slate-100',
          subText: 'text-slate-400',
          accentIcon: 'text-indigo-400',
          botCard: 'bg-gradient-to-r from-indigo-950 via-[#181828] to-slate-900 border border-indigo-500/30 text-white shadow-md',
          botEyes: 'bg-[#0A0A10] border-cyan-400/60',
          botPulse: 'bg-cyan-400',
          botTipBtn: 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 hover:bg-indigo-500/30',
          cardBase: 'bg-[#161622] border-[#262633] hover:border-indigo-500/50 hover:bg-[#1B1B2A] text-slate-200',
          cardActive: 'bg-[#1A1A2A] border-indigo-500 ring-2 ring-indigo-500/30 text-indigo-300 shadow-sm',
          cardTop: 'bg-amber-950/30 border-amber-800/60 hover:border-amber-600',
          graphCanvas: 'bg-[#161622] border-[#262633]',
          graphTitle: 'text-slate-200',
          graphBadge: 'bg-[#121218] text-slate-400 border-[#262633]',
          yAxisText: 'text-slate-500',
          yAxisBorder: 'border-[#262633]/70',
          barTopGrad: 'bg-gradient-to-t from-rose-600 via-amber-500 to-amber-400',
          barHighGrad: 'bg-gradient-to-t from-indigo-600 to-cyan-400',
          barStandardGrad: 'bg-gradient-to-t from-purple-600 to-indigo-400',
          diagnosticCard: 'bg-[#161622] border-[#262633] text-slate-100 shadow-lg',
          diagnosticHeaderBorder: 'border-[#262633]',
          tabActive: 'bg-indigo-600 text-white shadow-xs',
          tabInactive: 'text-slate-400 hover:text-slate-200 hover:bg-[#1F1F30]',
          misconceptionBox: 'bg-rose-950/40 border-rose-800/50 text-rose-200',
          lessonScriptBox: 'bg-indigo-950/40 border-indigo-800/50 text-indigo-200',
          exitTicketBox: 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200',
          scaffoldBox: 'bg-amber-950/40 border-amber-800/50 text-amber-200',
          cascadeBox: 'bg-rose-950/40 border-rose-800/50 text-rose-200',
        };
      case 'academic-warm':
        return {
          container: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          headerBorder: 'border-[#E6DFD3]',
          titleText: 'text-[#28231D]',
          subText: 'text-[#7D7363]',
          accentIcon: 'text-[#8C4A2F]',
          botCard: 'bg-gradient-to-r from-[#8C4A2F] via-[#753B23] to-[#592B18] border border-[#8C4A2F]/40 text-white shadow-sm',
          botEyes: 'bg-[#1F1914] border-amber-400/60',
          botPulse: 'bg-amber-300',
          botTipBtn: 'bg-[#FFFDFB] text-[#8C4A2F] hover:bg-amber-50',
          cardBase: 'bg-[#FAF7F2] border-[#E6DFD3] hover:border-[#8C4A2F]/60 hover:bg-[#F4EFEB] text-[#28231D]',
          cardActive: 'bg-[#FFFDFB] border-[#8C4A2F] ring-2 ring-[#8C4A2F]/30 text-[#8C4A2F] shadow-sm',
          cardTop: 'bg-[#8C4A2F]/10 border-[#8C4A2F]/30 hover:border-[#8C4A2F]',
          graphCanvas: 'bg-[#FAF7F2] border-[#E6DFD3]',
          graphTitle: 'text-[#28231D]',
          graphBadge: 'bg-[#FFFDFB] text-[#7D7363] border-[#E6DFD3]',
          yAxisText: 'text-[#8A7F70]',
          yAxisBorder: 'border-[#E6DFD3]',
          barTopGrad: 'bg-gradient-to-t from-[#8C4A2F] via-orange-600 to-amber-500',
          barHighGrad: 'bg-gradient-to-t from-[#15803D] to-[#4ADE80]',
          barStandardGrad: 'bg-gradient-to-t from-[#B45309] to-[#FBBF24]',
          diagnosticCard: 'bg-[#FAF7F2] border-[#E6DFD3] text-[#28231D] shadow-sm',
          diagnosticHeaderBorder: 'border-[#E6DFD3]',
          tabActive: 'bg-[#8C4A2F] text-white shadow-xs',
          tabInactive: 'text-[#7D7363] hover:text-[#28231D] hover:bg-[#FFFDFB]',
          misconceptionBox: 'bg-[#9A3412]/10 border-[#9A3412]/25 text-[#28231D]',
          lessonScriptBox: 'bg-[#15803D]/10 border-[#15803D]/25 text-[#28231D]',
          exitTicketBox: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          scaffoldBox: 'bg-[#B45309]/10 border-[#B45309]/25 text-[#28231D]',
          cascadeBox: 'bg-[#9A3412]/10 border-[#9A3412]/25 text-[#28231D]',
        };
      case 'clean':
      default:
        return {
          container: 'bg-white border-slate-200/80 text-slate-900 shadow-xs',
          headerBorder: 'border-slate-100',
          titleText: 'text-slate-900',
          subText: 'text-slate-500',
          accentIcon: 'text-blue-600',
          botCard: 'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white shadow-sm',
          botEyes: 'bg-slate-800 border-cyan-400/60',
          botPulse: 'bg-cyan-300',
          botTipBtn: 'bg-white text-blue-700 hover:bg-cyan-50',
          cardBase: 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70 hover:border-slate-300 text-slate-800',
          cardActive: 'bg-blue-50/40 border-blue-500 ring-2 ring-blue-500/20 text-blue-800 shadow-xs',
          cardTop: 'bg-amber-50/30 border-amber-200/90 hover:border-amber-300',
          graphCanvas: 'bg-slate-50/40 border-slate-200/90',
          graphTitle: 'text-slate-800',
          graphBadge: 'bg-white text-slate-500 border-slate-200',
          yAxisText: 'text-slate-400',
          yAxisBorder: 'border-slate-200/60',
          barTopGrad: 'bg-gradient-to-t from-amber-500 via-orange-500 to-amber-400',
          barHighGrad: 'bg-gradient-to-t from-blue-600 to-sky-400',
          barStandardGrad: 'bg-gradient-to-t from-indigo-500 to-sky-300',
          diagnosticCard: 'bg-white border-slate-200/90 text-slate-900 shadow-xs',
          diagnosticHeaderBorder: 'border-slate-100',
          tabActive: 'bg-blue-600 text-white shadow-xs',
          tabInactive: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
          misconceptionBox: 'bg-purple-50/60 border-purple-200/90 text-purple-950',
          lessonScriptBox: 'bg-blue-50/60 border-blue-200/90 text-blue-950',
          exitTicketBox: 'bg-emerald-50/60 border-emerald-200/90 text-emerald-950',
          scaffoldBox: 'bg-amber-50/60 border-amber-200/90 text-amber-950',
          cascadeBox: 'bg-rose-50/70 border-rose-200 text-rose-950',
        };
    }
  }, [style]);

  if (sortedTopics.length === 0) {
    return (
      <div
        id="hardest-topic-section"
        className={`rounded-2xl p-8 border text-center space-y-4 transition-colors duration-200 ${themeGrading.container}`}
      >
        <div className="flex flex-col items-center justify-center py-6 max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h3 className={`text-base font-extrabold ${themeGrading.titleText}`}>
            No Roadblock Topics Recorded Yet
          </h3>
          <p className={`text-xs ${themeGrading.subText} leading-relaxed`}>
            Topics and diagnostic struggle rates will appear here automatically once diagnostic quizzes are taken or student learning gaps are logged.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hardest-topic-section"
      className={`rounded-2xl p-5 md:p-6 border space-y-6 transition-colors duration-200 ${themeGrading.container}`}
    >
      {/* 1. Header with AI Diagnostic Bot Assistant integrated right near the section */}
      <div
        className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b ${themeGrading.headerBorder}`}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${themeGrading.titleText}`}
            >
              <BarChart2 className={`w-5 h-5 ${themeGrading.accentIcon}`} />
              Batch Learning Roadblocks & Hardest Topics
            </h2>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                  : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              #1 Hardest: {numberOneHardest?.topicName.split(':')[0]}
            </span>
          </div>
          <p className={`text-xs ${themeGrading.subText}`}>
            Visual struggle-rate bar graph identifying concept bottlenecks across 42 batch students
          </p>
        </div>

        {/* AI Diagnostic Bot Helper Card */}
        <div
          id="ai-diagnostic-bot-companion"
          className={`relative p-3 rounded-2xl flex items-center gap-3 w-full lg:w-auto max-w-md ${themeGrading.botCard}`}
        >
          {/* Animated Mascot Head */}
          <div className={`relative shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center shadow-inner ${themeGrading.botEyes}`}>
            {/* Pulsing Antenna */}
            <div className={`w-1.5 h-1.5 rounded-full absolute -top-1 animate-ping ${themeGrading.botPulse}`} />
            <div className={`w-1.5 h-1.5 rounded-full absolute -top-1 ${themeGrading.botPulse}`} />
            {/* Robot Eyes */}
            <div className="w-7 h-4 rounded-md bg-black/40 border border-white/20 flex items-center justify-around px-1">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${themeGrading.botPulse}`} />
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${themeGrading.botPulse}`} />
            </div>
            {/* Mouth */}
            <div className={`w-3 h-0.5 rounded-full mt-1 ${themeGrading.botPulse}`} />
          </div>

          {/* Bot Guidance Speech */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-white/90 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                AI Diagnostic Assistant
              </span>
              <span className="text-[9px] bg-white/20 text-white font-bold px-1.5 py-0.2 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-white/95 font-medium leading-snug mt-0.5 truncate">
              Struggle alert on{' '}
              <strong className="underline underline-offset-2">
                {selectedTopic ? selectedTopic.topicName.split(':')[0] : 'Integers'}
              </strong>{' '}
              ({selectedTopic ? selectedTopic.failureRate : 46}% batch stuck)
            </p>
          </div>

          {/* Quick AI Tip Button */}
          <button
            onClick={() =>
              setAiTipState((prev) =>
                prev === 'diagnosis' ? 'action' : prev === 'action' ? 'resource' : 'diagnosis'
              )
            }
            className={`shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-xl shadow-2xs transition cursor-pointer ${themeGrading.botTipBtn}`}
            title="Toggle AI suggestion"
          >
            {aiTipState === 'diagnosis' ? 'Action Tip' : aiTipState === 'action' ? 'Resources' : 'Diagnosis'}
          </button>
        </div>
      </div>

      {/* 2. Interactive Catchy Topic & Subject Ribbon Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${themeGrading.subText}`}>
            Categorized Roadblocks by Subject & Concept
          </span>
          {activeFilterTopic && (
            <button
              onClick={() => onSelectTopicFilter('')}
              className={`text-[11px] font-bold flex items-center gap-1 cursor-pointer ${themeGrading.accentIcon} hover:underline`}
            >
              <Filter className="w-3 h-3" />
              Reset filter
            </button>
          )}
        </div>

        {/* Catchy Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {sortedTopics.map((topic) => {
            const { domain, concept } = parseTopicStructure(topic.topicName);
            const badge = getSubjectBadge(topic.subject);
            const isSelected = selectedTopic?.id === topic.id;
            const isTop = topic.isNumberOneHardest;

            return (
              <div
                key={topic.id}
                id={`catchy-topic-card-${topic.id}`}
                onClick={() => handleBarClick(topic)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? themeGrading.cardActive
                    : isTop
                    ? themeGrading.cardTop
                    : themeGrading.cardBase
                }`}
              >
                {/* Top Banner Row */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  {/* Subject Tag with icon */}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${badge.pillClass}`}
                  >
                    {badge.icon}
                    <span>{topic.subject}</span>
                  </span>

                  {/* Failure Rate Badge */}
                  <div className="flex items-center gap-1">
                    {isTop && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                        #1
                      </span>
                    )}
                    <span
                      className={`text-xs font-black ${
                        isTop ? 'text-amber-600 dark:text-amber-400' : themeGrading.titleText
                      }`}
                    >
                      {topic.failureRate}%
                    </span>
                  </div>
                </div>

                {/* Catchy Topic Title Representation */}
                <div className="space-y-0.5">
                  <h4 className={`text-xs font-extrabold transition-colors line-clamp-1 ${themeGrading.titleText}`}>
                    {domain}
                  </h4>
                  <p className={`text-[11px] font-medium line-clamp-1 ${themeGrading.subText}`}>
                    {concept}
                  </p>
                </div>

                {/* Mini Visual Gauge */}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex-1 bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isTop
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${topic.failureRate}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold shrink-0 ${themeGrading.subText}`}>
                    {topic.totalStudentsStuck} stuck
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. The Bar Graph Component with Axes & Visual Columns */}
      <div
        id="roadblocks-bar-graph"
        className={`rounded-2xl border p-4 md:p-5 space-y-4 ${themeGrading.graphCanvas}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-extrabold ${themeGrading.graphTitle}`}>
              Batch Failure Rate Bar Graph
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${themeGrading.graphBadge}`}>
              % of tested students stuck
            </span>
          </div>

          <div className={`flex items-center gap-3 text-[11px] ${themeGrading.subText}`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold">#1 Hardest</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="font-semibold">Standard Roadblocks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t-2 border-dashed border-rose-400" />
              <span className="text-rose-600 font-bold">Critical Threshold (30%)</span>
            </div>
          </div>
        </div>

        {/* Graphic Bar Chart Canvas */}
        <div className="relative pt-4 pb-2">
          {/* Y-Axis Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 pt-6">
            {yTicks.map((tick) => (
              <div key={tick} className="relative flex items-center w-full">
                <span className={`text-[10px] font-bold w-8 shrink-0 text-right pr-2 ${themeGrading.yAxisText}`}>
                  {tick}%
                </span>
                <div
                  className={`flex-1 border-b ${
                    tick === 30
                      ? 'border-dashed border-rose-400/80 z-0'
                      : themeGrading.yAxisBorder
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Bar Graph Columns */}
          <div className="relative z-10 flex items-end justify-around pl-10 pr-2 h-64 sm:h-72">
            {sortedTopics.map((topic, index) => {
              const { domain } = parseTopicStructure(topic.topicName);
              const badge = getSubjectBadge(topic.subject);
              const isSelected = selectedTopic?.id === topic.id;
              const isTop = topic.isNumberOneHardest;
              const heightPercent = Math.min(100, Math.round((topic.failureRate / 50) * 100));

              return (
                <div
                  key={topic.id}
                  id={`bar-column-${topic.id}`}
                  onClick={() => handleBarClick(topic)}
                  className="flex flex-col items-center group cursor-pointer w-full max-w-[84px] px-1 h-full justify-end"
                >
                  {/* Floating Percentage Tag on Top of Bar */}
                  <div
                    className={`mb-1.5 px-2 py-0.5 rounded-lg text-[11px] font-black tracking-tight transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-110'
                        : isTop
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                  >
                    {topic.failureRate}%
                  </div>

                  {/* The Vertical Bar */}
                  <div className="w-full relative flex flex-col justify-end items-center h-44 sm:h-52">
                    <div
                      className={`w-full max-w-[46px] rounded-t-xl transition-all duration-300 relative shadow-sm ${
                        isSelected
                          ? 'ring-4 ring-blue-400/40 shadow-blue-500/20'
                          : 'group-hover:opacity-90'
                      } ${
                        isTop
                          ? themeGrading.barTopGrad
                          : topic.failureRate > 30
                          ? themeGrading.barHighGrad
                          : themeGrading.barStandardGrad
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      {/* Top Accent Strip */}
                      <div className="w-full h-1.5 bg-white/40 rounded-t-xl" />

                      {/* Rank Indicator inside bar */}
                      <div className="absolute bottom-2 inset-x-0 flex justify-center">
                        <span className="text-[10px] font-black text-white/90 bg-black/20 px-1.5 py-0.2 rounded-full">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Catchy X-Axis Label: Subject Icon + Domain Name */}
                  <div className="mt-2.5 text-center flex flex-col items-center max-w-full">
                    {/* Subject Icon Dot */}
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center mb-1 transition-transform ${
                        isSelected ? 'scale-110 shadow-xs' : ''
                      } ${badge.pillClass}`}
                      title={`${topic.subject}: ${domain}`}
                    >
                      {badge.icon}
                    </div>

                    {/* Domain Label */}
                    <span
                      className={`text-[11px] font-extrabold truncate max-w-[80px] leading-tight transition-colors ${
                        isSelected
                          ? themeGrading.accentIcon
                          : themeGrading.titleText
                      }`}
                    >
                      {domain}
                    </span>
                    <span className={`text-[9px] font-semibold truncate max-w-[80px] ${themeGrading.subText}`}>
                      {topic.totalStudentsStuck} stuck
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Catchy AI Diagnostic Breakdown of the Selected Topic with Different Colors & Interactive Controls */}
      {selectedTopic && currentPrescription && (
        <div
          id="selected-topic-diagnostic-card"
          className={`rounded-2xl border transition-all duration-300 ${
            presentationMode
              ? 'border-indigo-400 bg-slate-900 text-white p-6 md:p-8 shadow-xl'
              : `p-4 md:p-5 space-y-4 ${themeGrading.diagnosticCard}`
          }`}
        >
          {/* Header Bar */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${themeGrading.diagnosticHeaderBorder}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-black tracking-tight ${themeGrading.titleText}`}>
                    AI Diagnostic Prescription: {selectedTopic.topicName}
                  </span>
                  {selectedTopic.isNumberOneHardest && (
                    <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                      Batch Priority #1 Roadblock
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-medium ${themeGrading.subText}`}>
                  {selectedTopic.subject} • {selectedTopic.totalStudentsStuck} of {selectedTopic.totalTested} students flagged ({selectedTopic.failureRate}% failure rate)
                </span>
              </div>
            </div>

            {/* Interactive Prescription Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleCopyScript}
                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                title="Copy Reteach Plan to Clipboard"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                    <span>Copy Plan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSelectTopicFilter(selectedTopic.topicName)}
                className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition shadow-2xs cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
              >
                <span>Filter Student Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Facet Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setPrescriptionView('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                prescriptionView === 'all'
                  ? themeGrading.tabActive
                  : themeGrading.tabInactive
              }`}
            >
              Full Comprehensive Diagnostic
            </button>
            <button
              onClick={() => setPrescriptionView('script')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                prescriptionView === 'script'
                  ? themeGrading.tabActive
                  : themeGrading.tabInactive
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>10-Min Lesson Script</span>
            </button>
            <button
              onClick={() => setPrescriptionView('question')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                prescriptionView === 'question'
                  ? themeGrading.tabActive
                  : themeGrading.tabInactive
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Exit Ticket Question</span>
            </button>
            <button
              onClick={() => setPrescriptionView('scaffold')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                prescriptionView === 'scaffold'
                  ? themeGrading.tabActive
                  : themeGrading.tabInactive
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Scaffolding Ladder</span>
            </button>
          </div>

          {/* COLOR-CODED DIAGNOSTIC FACETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* 1. Cognitive Misconception & Mental Trap */}
            {(prescriptionView === 'all' || prescriptionView === 'script') && (
              <div className={`rounded-2xl p-4 border space-y-2 relative overflow-hidden ${themeGrading.misconceptionBox}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-rose-200/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center justify-center font-bold">
                      <Brain className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black tracking-tight">
                      Cognitive Misconception & Mental Trap
                    </h4>
                  </div>
                  <span className="text-[10px] font-extrabold bg-rose-200/60 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 px-2 py-0.2 rounded-full">
                    Root Cause
                  </span>
                </div>

                <p className="text-xs font-semibold leading-relaxed">
                  {selectedTopic.rootCause}
                </p>

                {/* Real Student Thought Pattern Quote */}
                <div className="p-2.5 bg-white/80 dark:bg-black/30 rounded-xl border border-black/5 dark:border-white/5 text-[11px] italic font-medium">
                  {currentPrescription.mentalTrapQuote}
                </div>
              </div>
            )}

            {/* 2. 10-Minute Classroom Micro-Lesson Script */}
            {(prescriptionView === 'all' || prescriptionView === 'script') && (
              <div className={`rounded-2xl p-4 border space-y-2 ${themeGrading.lessonScriptBox}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold">
                      <ListChecks className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black tracking-tight">
                      10-Minute Classroom Reteach (CPA Method)
                    </h4>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-200/60 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 px-2 py-0.2 rounded-full">
                    Concrete → Abstract
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentPrescription.lessonSteps.map((step, sIdx) => (
                    <div key={sIdx} className="bg-white/80 dark:bg-black/30 p-2 rounded-xl border border-black/5 dark:border-white/5 text-xs">
                      <span className="font-extrabold block text-[11px]">
                        {step.phase}
                      </span>
                      <p className={`text-[11px] font-medium mt-0.5 leading-relaxed opacity-90`}>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Formative Exit Ticket Question */}
            {(prescriptionView === 'all' || prescriptionView === 'question') && (
              <div className={`rounded-2xl p-4 border space-y-2.5 ${themeGrading.exitTicketBox}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-200/80 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 flex items-center justify-center font-bold">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black tracking-tight">
                      Formative Exit Ticket Question
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowDistractorAnalysis(!showDistractorAnalysis)}
                    className="text-[10px] font-extrabold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 px-2 py-0.5 rounded-lg transition cursor-pointer"
                  >
                    {showDistractorAnalysis ? 'Hide Traps' : 'Reveal Distractor Traps'}
                  </button>
                </div>

                {/* Question Prompt */}
                <div className="bg-white/80 dark:bg-black/30 p-3 rounded-xl border border-black/5 dark:border-white/5 text-xs font-bold leading-relaxed">
                  {currentPrescription.exitQuestion.prompt}
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentPrescription.exitQuestion.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border transition-all ${
                        opt.isCorrect
                          ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold'
                          : 'bg-white/80 dark:bg-black/30 border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-[11px]">
                          Option {opt.id}: {opt.text}
                        </span>
                        {opt.isCorrect && (
                          <span className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.2 rounded">
                            Correct
                          </span>
                        )}
                      </div>
                      {showDistractorAnalysis && (
                        <p className="text-[10px] opacity-75 font-medium leading-tight">
                          {opt.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Differentiated Scaffolding Strategy */}
            {(prescriptionView === 'all' || prescriptionView === 'scaffold') && (
              <div className={`rounded-2xl p-4 border space-y-2 ${themeGrading.scaffoldBox}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center justify-center font-bold">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-black tracking-tight">
                      Differentiated Scaffolding Ladder
                    </h4>
                  </div>
                  <span className="text-[10px] font-extrabold bg-amber-200/60 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-2 py-0.2 rounded-full">
                    3 Tiers
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="bg-white/80 dark:bg-black/30 p-2 rounded-xl border border-black/5 dark:border-white/5 font-medium text-[11px]">
                    <strong className="font-bold">Tier 1: </strong>
                    {currentPrescription.scaffolding.level1}
                  </div>
                  <div className="bg-white/80 dark:bg-black/30 p-2 rounded-xl border border-black/5 dark:border-white/5 font-medium text-[11px]">
                    <strong className="font-bold">Tier 2: </strong>
                    {currentPrescription.scaffolding.level2}
                  </div>
                  <div className="bg-white/80 dark:bg-black/30 p-2 rounded-xl border border-black/5 dark:border-white/5 font-medium text-[11px]">
                    <strong className="font-bold">Tier 3: </strong>
                    {currentPrescription.scaffolding.level3}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. Downstream Cascade Risk Alert */}
          <div className={`rounded-xl p-3 border flex items-start gap-2.5 ${themeGrading.cascadeBox}`}>
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold">
                Long-Term Curricular Impact Risk:
              </span>
              <p className="font-medium text-[11px] mt-0.5 leading-relaxed opacity-90">
                {currentPrescription.cascadeRisk}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
