import React from 'react';
import {
  Subject,
  ClassSummaryStats,
  StudentGapRecord,
  TopicFailureStat,
  GoalItem,
  PageId,
} from '../types';
import { ClassSubjectSelector } from '../components/ClassSubjectSelector';
import { ClassTopicWeaknessHeatmap } from '../components/teacher/ClassTopicWeaknessHeatmap';
import { IndividualStudentProgressCards } from '../components/teacher/IndividualStudentProgressCards';
import { FrequentlyAskedDoubtsList } from '../components/teacher/FrequentlyAskedDoubtsList';
import { InactiveStudentsAtRiskAlert } from '../components/teacher/InactiveStudentsAtRiskAlert';

interface OverviewPageProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
  classStats: ClassSummaryStats;
  activeGapsCount: number;
  fixedCount: number;
  students: StudentGapRecord[];
  topics: TopicFailureStat[];
  goals: GoalItem[];
  onNavigate: (page: PageId) => void;
  onSelectStudent: (student: StudentGapRecord) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  students,
  onNavigate,
  onSelectStudent,
}) => {
  return (
    <div className="space-y-6 pb-8">
      {/* Target Cohort & Diagnostic Domain Selectors */}
      <ClassSubjectSelector
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      {/* 1. Class-wide topic weakness heatmap */}
      <ClassTopicWeaknessHeatmap
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onNavigateToMatrix={() => onNavigate('matrix')}
      />

      {/* 2. Individual student progress cards */}
      <IndividualStudentProgressCards
        selectedClass={selectedClass}
        onSelectStudent={onSelectStudent}
        studentsList={students}
      />

      {/* 3. Most frequently asked doubts list */}
      <FrequentlyAskedDoubtsList selectedClass={selectedClass} />

      {/* 4. Students who haven't logged in (at-risk alert) */}
      <InactiveStudentsAtRiskAlert selectedClass={selectedClass} />
    </div>
  );
};
