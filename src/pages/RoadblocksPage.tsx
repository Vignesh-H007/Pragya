import React, { useState, useMemo } from 'react';
import {
  Flame,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Users,
  Brain,
  Layers,
  Send,
} from 'lucide-react';
import { HardestTopicBarChart } from '../components/HardestTopicBarChart';
import { ClassSubjectSelector } from '../components/ClassSubjectSelector';
import { FacultyEscalationsQueue } from '../components/faculty/FacultyEscalationsQueue';
import { useDashboardTheme } from '../context/ThemeContext';
import { Subject, TopicFailureStat, PageId } from '../types';

interface RoadblocksPageProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
  topics: TopicFailureStat[];
  onNavigate: (page: PageId) => void;
  onSendTopicToAITutor?: (topicName: string) => void;
}

export const RoadblocksPage: React.FC<RoadblocksPageProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  topics,
  onNavigate,
  onSendTopicToAITutor,
}) => {
  const { style } = useDashboardTheme();
  const [activeFilterTopic, setActiveFilterTopic] = useState<string | null>(null);
  const [prescribedSuccessTopic, setPrescribedSuccessTopic] = useState<string | null>(null);
  const [breakdownMode, setBreakdownMode] = useState<'focused-one' | 'all'>('focused-one');
  const [selectedRoadblockId, setSelectedRoadblockId] = useState<string>(
    topics.find((t) => t.isNumberOneHardest)?.id || topics[0]?.id || ''
  );

  // Filter topics based on selected subject (if not 'All')
  const filteredTopics = useMemo(() => {
    let list = topics;
    if (selectedSubject !== 'All') {
      list = list.filter((t) => t.subject === selectedSubject || selectedSubject === 'Mathematics');
    }
    if (activeFilterTopic) {
      list = list.filter((t) => t.topicName === activeFilterTopic);
    }
    return list;
  }, [topics, selectedSubject, activeFilterTopic]);

  const activeFocusedTopic = useMemo(() => {
    return filteredTopics.find((t) => t.id === selectedRoadblockId) || filteredTopics[0];
  }, [filteredTopics, selectedRoadblockId]);

  const handlePrescribeAction = (topicName: string) => {
    setPrescribedSuccessTopic(topicName);
    setTimeout(() => {
      setPrescribedSuccessTopic(null);
    }, 4000);
  };

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  const themeGrading = useMemo(() => {
    switch (style) {
      case 'editorial-command':
        return {
          pageHeader: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B] shadow-xs',
          bannerBadge: 'bg-[#C85340] text-white',
          headerSub: 'text-[#5C6670]',
          navBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white',
          filterBar: 'bg-white border-[#DDD4C7] text-[#1C232B]',
          filterHighlight: 'text-[#246257]',
          filterReset: 'text-[#C85340] hover:text-[#A83D2B]',
          sectionTitle: 'text-[#1C232B]',
          sectionIcon: 'text-[#C85340]',
          cardHardest: 'bg-[#FAF7F0] border-[#C85340]/50 shadow-sm text-[#1C232B]',
          cardStandard: 'bg-white border-[#DDD4C7] text-[#1C232B] shadow-xs',
          cardActiveChip: 'bg-[#246257] text-white border-[#246257]',
          cardInactiveChip: 'bg-white border-[#DDD4C7] text-[#5C6670] hover:border-[#246257]',
          statBox: 'bg-[#FAF7F0] border-[#DDD4C7] text-[#1C232B]',
          statVal: 'text-[#1C232B]',
          statLabel: 'text-[#8A8276]',
          misconceptionBox: 'bg-[#C85340]/10 border-[#C85340]/25 text-[#1C232B]',
          interventionBox: 'bg-[#246257]/10 border-[#246257]/25 text-[#1C232B]',
          actionBtn: 'bg-[#246257] hover:bg-[#1C4E45] text-white shadow-xs',
          badgeSubject: 'bg-[#FAF7F0] border border-[#DDD4C7] text-[#5C6670]',
          toggleActive: 'bg-[#246257] text-white',
          toggleInactive: 'text-[#5C6670] hover:text-[#1C232B]',
        };
      case 'obsidian-dark':
      case 'command-dark':
        return {
          pageHeader: 'bg-gradient-to-r from-rose-950/40 via-[#121218] to-[#121218] border-rose-900/40 text-slate-100 shadow-xl',
          bannerBadge: 'bg-rose-600 text-white',
          headerSub: 'text-slate-400',
          navBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg',
          filterBar: 'bg-[#161622] border-[#262633] text-slate-200',
          filterHighlight: 'text-indigo-400',
          filterReset: 'text-cyan-400 hover:text-cyan-300',
          sectionTitle: 'text-slate-100',
          sectionIcon: 'text-rose-400',
          cardHardest: 'bg-[#181824] border-rose-800/80 shadow-lg text-slate-100',
          cardStandard: 'bg-[#14141C] border-[#262633] text-slate-200',
          cardActiveChip: 'bg-indigo-600 text-white border-indigo-500',
          cardInactiveChip: 'bg-[#161622] border-[#262633] text-slate-400 hover:border-indigo-500/50',
          statBox: 'bg-[#161622] border-[#262633] text-slate-200',
          statVal: 'text-slate-100',
          statLabel: 'text-slate-400',
          misconceptionBox: 'bg-rose-950/40 border-rose-800/50 text-rose-200',
          interventionBox: 'bg-indigo-950/40 border-indigo-800/50 text-indigo-200',
          actionBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg',
          badgeSubject: 'bg-[#1E1E2E] text-slate-300 border border-[#262633]',
          toggleActive: 'bg-indigo-600 text-white',
          toggleInactive: 'text-slate-400 hover:text-slate-200',
        };
      case 'academic-warm':
        return {
          pageHeader: 'bg-gradient-to-r from-[#F7EBE8] via-[#FFFDFB] to-[#FFFDFB] border-[#ECCBC4] text-[#28231D] shadow-xs',
          bannerBadge: 'bg-[#8C4A2F] text-white',
          headerSub: 'text-[#7D7363]',
          navBtn: 'bg-[#8C4A2F] hover:bg-[#723B25] text-white shadow-sm',
          filterBar: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]',
          filterHighlight: 'text-[#8C4A2F]',
          filterReset: 'text-[#8C4A2F] hover:underline',
          sectionTitle: 'text-[#28231D]',
          sectionIcon: 'text-[#8C4A2F]',
          cardHardest: 'bg-[#FFF9F7] border-[#E8C2B8] shadow-sm text-[#28231D]',
          cardStandard: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D] shadow-xs',
          cardActiveChip: 'bg-[#8C4A2F] text-white border-[#8C4A2F]',
          cardInactiveChip: 'bg-[#FFFDFB] border-[#E6DFD3] text-[#7D7363] hover:border-[#8C4A2F]',
          statBox: 'bg-[#FAF7F2] border-[#E6DFD3] text-[#28231D]',
          statVal: 'text-[#28231D]',
          statLabel: 'text-[#7D7363]',
          misconceptionBox: 'bg-[#9A3412]/10 border-[#9A3412]/25 text-[#28231D]',
          interventionBox: 'bg-[#15803D]/10 border-[#15803D]/25 text-[#28231D]',
          actionBtn: 'bg-[#8C4A2F] hover:bg-[#723B25] text-white shadow-xs',
          badgeSubject: 'bg-[#FAF7F2] border border-[#E6DFD3] text-[#7D7363]',
          toggleActive: 'bg-[#8C4A2F] text-white',
          toggleInactive: 'text-[#7D7363] hover:text-[#28231D]',
        };
      case 'clean':
      default:
        return {
          pageHeader: 'bg-gradient-to-r from-rose-50/90 via-white to-white border-rose-200/80 text-slate-900 shadow-xs',
          bannerBadge: 'bg-rose-500 text-white',
          headerSub: 'text-slate-600',
          navBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          filterBar: 'bg-blue-50 border-blue-200 text-slate-900',
          filterHighlight: 'text-blue-700',
          filterReset: 'text-blue-600 hover:underline',
          sectionTitle: 'text-slate-900',
          sectionIcon: 'text-rose-500',
          cardHardest: 'bg-rose-50/40 border-rose-200 shadow-sm text-slate-900',
          cardStandard: 'bg-white border-slate-200/90 text-slate-900 shadow-xs',
          cardActiveChip: 'bg-blue-600 text-white border-blue-600',
          cardInactiveChip: 'bg-slate-100 border-slate-200 text-slate-600 hover:border-blue-400',
          statBox: 'bg-slate-50 border-slate-100 text-slate-900',
          statVal: 'text-slate-800',
          statLabel: 'text-slate-400',
          misconceptionBox: 'bg-amber-50/70 border-amber-200/80 text-amber-900',
          interventionBox: 'bg-blue-50/70 border-blue-200/80 text-blue-900',
          actionBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs',
          badgeSubject: 'bg-slate-100 border border-slate-200 text-slate-700',
          toggleActive: 'bg-blue-600 text-white',
          toggleInactive: 'text-slate-600 hover:text-slate-900',
        };
    }
  }, [style]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div
        className={`rounded-3xl p-6 border transition-all ${themeGrading.pageHeader}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${themeGrading.bannerBadge}`}>
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>Failure Bottlenecks & Interventions</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Roadblocks & AI Prescriptions
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl leading-relaxed ${themeGrading.headerSub}`}>
              Identify the exact topics causing students to fail diagnostic assessments in {selectedClass}.
              Click any bar to inspect specific pedagogical root causes and dispatch automated remedial guides.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('curricula')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${themeGrading.navBtn}`}
            >
              <span>View Batch Curricula</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Select Class & Choose Subject */}
      <ClassSubjectSelector
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      {/* Filter Topic Pill Indicator */}
      {activeFilterTopic && (
        <div className={`flex items-center justify-between p-3 rounded-2xl border text-xs ${themeGrading.filterBar}`}>
          <span className={`font-bold ${themeGrading.filterHighlight}`}>
            Active Filter: <span className="underline">{activeFilterTopic}</span>
          </span>
          <button
            onClick={() => setActiveFilterTopic(null)}
            className={`flex items-center gap-1 font-bold cursor-pointer ${themeGrading.filterReset}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show All Topics</span>
          </button>
        </div>
      )}

      {/* Student Doubts Escalated from AI Tutor */}
      <FacultyEscalationsQueue
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
      />

      {/* Hardest Topic Bar Chart */}
      <HardestTopicBarChart
        topics={topics}
        selectedSubject={selectedSubject}
        onSelectTopicFilter={(topic) => setActiveFilterTopic(topic || null)}
        activeFilterTopic={activeFilterTopic}
      />

      {/* Notification banner when prescribed */}
      {prescribedSuccessTopic && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-between text-xs font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Remedial visual scaffold and 5 practice exercises dispatched to {selectedClass} for:{' '}
              <span className="underline">{prescribedSuccessTopic}</span>
            </span>
          </div>
          <button
            onClick={() => setPrescribedSuccessTopic(null)}
            className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 cursor-pointer text-sm"
          >
            ×
          </button>
        </div>
      )}

      {/* Deep-Dive Roadblock Analysis Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className={`text-lg font-extrabold flex items-center gap-2 ${themeGrading.sectionTitle}`}>
            <Brain className={`w-5 h-5 ${themeGrading.sectionIcon}`} />
            <span>
              {breakdownMode === 'focused-one'
                ? 'Detailed Pedagogical Breakdown (1 Roadblock Focus)'
                : `Detailed Pedagogical Breakdown (${filteredTopics.length} Roadblocks)`}
            </span>
          </h2>

          {/* View Mode Toggle: 1 Roadblock vs All */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold bg-black/5 dark:bg-white/5 self-start sm:self-auto">
            <button
              onClick={() => setBreakdownMode('focused-one')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                breakdownMode === 'focused-one'
                  ? themeGrading.toggleActive
                  : themeGrading.toggleInactive
              }`}
            >
              1 Roadblock Focus
            </button>
            <button
              onClick={() => setBreakdownMode('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                breakdownMode === 'all'
                  ? themeGrading.toggleActive
                  : themeGrading.toggleInactive
              }`}
            >
              All Roadblocks ({filteredTopics.length})
            </button>
          </div>
        </div>

        {/* Roadblock Selector Ribbon for 1-Roadblock Focus Mode */}
        {breakdownMode === 'focused-one' && (
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${themeGrading.headerSub}`}>
              Select Roadblock:
            </span>
            {filteredTopics.map((topic) => {
              const isSelected = (activeFocusedTopic?.id === topic.id);
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedRoadblockId(topic.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? themeGrading.cardActiveChip
                      : themeGrading.cardInactiveChip
                  }`}
                >
                  {topic.isNumberOneHardest && <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />}
                  <span>{topic.topicName.split(':')[0]}</span>
                  <span className="text-[10px] opacity-80">({topic.failureRate}%)</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Rendering either the 1 focused roadblock or all */}
        <div className={breakdownMode === 'focused-one' ? 'grid grid-cols-1' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
          {(breakdownMode === 'focused-one' && activeFocusedTopic ? [activeFocusedTopic] : filteredTopics).map((topic) => (
            <div
              key={topic.id}
              className={`rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                topic.isNumberOneHardest
                  ? themeGrading.cardHardest
                  : themeGrading.cardStandard
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {topic.isNumberOneHardest && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-500 text-white shadow-xs">
                        <Flame className="w-3 h-3 fill-white" />
                        #1 Critical Failure
                      </span>
                    )}
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${themeGrading.badgeSubject}`}>
                      {topic.subject}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        topic.difficultyLevel === 'Critical'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : topic.difficultyLevel === 'High'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {topic.difficultyLevel} Risk
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-rose-600 dark:text-rose-400">
                      {topic.failureRate}%
                    </div>
                    <div className="text-[10px] uppercase font-semibold opacity-70">
                      Diagnostic Failure
                    </div>
                  </div>
                </div>

                <h3 className="font-black text-base leading-snug mb-3">{topic.topicName}</h3>

                {/* Metrics bar */}
                <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-xl border text-center mb-3 ${themeGrading.statBox}`}>
                  <div>
                    <div className={`text-xs font-black ${themeGrading.statVal}`}>
                      {topic.totalStudentsStuck}
                    </div>
                    <div className={`text-[10px] ${themeGrading.statLabel}`}>Students Stuck</div>
                  </div>
                  <div>
                    <div className={`text-xs font-black ${themeGrading.statVal}`}>
                      {topic.averageAttempts}x
                    </div>
                    <div className={`text-[10px] ${themeGrading.statLabel}`}>Avg. Attempts</div>
                  </div>
                  <div>
                    <div className={`text-xs font-black ${themeGrading.statVal}`}>
                      {topic.totalTested}
                    </div>
                    <div className={`text-[10px] ${themeGrading.statLabel}`}>Total Tested</div>
                  </div>
                </div>

                {/* Root Cause & Misconception */}
                <div className="space-y-2 text-xs mb-4">
                  <div className={`p-3 rounded-xl border ${themeGrading.misconceptionBox}`}>
                    <div className="font-extrabold mb-0.5 flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Diagnosed Misconception & Root Cause:</span>
                    </div>
                    <div className="leading-relaxed opacity-95">{topic.rootCause}</div>
                  </div>

                  <div className={`p-3 rounded-xl border ${themeGrading.interventionBox}`}>
                    <div className="font-extrabold mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Pedagogical Intervention Prescription:</span>
                    </div>
                    <div className="leading-relaxed opacity-95">{topic.recommendedIntervention}</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handlePrescribeAction(topic.topicName)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${themeGrading.actionBtn}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Assign Remediation to {selectedClass}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
