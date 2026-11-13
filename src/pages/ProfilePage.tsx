import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  Check,
  Copy,
  Camera,
  ShieldCheck,
  Building2,
  Users,
  Target,
  Star,
  Bot,
  ExternalLink,
  Plus,
  Trash2,
  Bell,
  X,
  Share2,
} from 'lucide-react';
import { useDashboardTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { PageId, Subject } from '../types';

interface ProfilePageProps {
  onNavigate: (page: PageId) => void;
  onSelectClass?: (cls: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onSelectClass }) => {
  const { style } = useDashboardTheme();
  const { facultyProfile, updateFacultyProfile, resetFacultyProfile, avatarPresets } = useProfile();

  const isDark = style === 'obsidian-dark' || style === 'command-dark';

  // Active Tab: 'portfolio' | 'schedule' | 'edit'
  const [activeTab, setActiveTab] = useState<'portfolio' | 'schedule' | 'edit'>('portfolio');

  // Avatar Picker Modal
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  // Form state for editing
  const [formData, setFormData] = useState(facultyProfile);
  const [saveToast, setSaveToast] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [newQualificationInput, setNewQualificationInput] = useState('');
  const [shareToast, setShareToast] = useState(false);

  // Sync formData when facultyProfile updates externally
  const handleStartEdit = () => {
    setFormData(facultyProfile);
    setActiveTab('edit');
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateFacultyProfile(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(facultyProfile.facultyId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSharePortfolio = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleSelectPresetAvatar = (url: string) => {
    updateFacultyProfile({ avatarUrl: url });
    setFormData((prev) => ({ ...prev, avatarUrl: url }));
    setAvatarModalOpen(false);
  };

  const handleApplyCustomAvatar = () => {
    if (customAvatarUrl.trim()) {
      updateFacultyProfile({ avatarUrl: customAvatarUrl.trim() });
      setFormData((prev) => ({ ...prev, avatarUrl: customAvatarUrl.trim() }));
      setCustomAvatarUrl('');
      setAvatarModalOpen(false);
    }
  };

  const handleAddQualification = () => {
    if (newQualificationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualificationInput.trim()],
      }));
      setNewQualificationInput('');
    }
  };

  const handleRemoveQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const allAvailableClasses = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const allAvailableSubjects: Subject[] = ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'];

  const toggleClass = (cls: string) => {
    setFormData((prev) => {
      const exists = prev.assignedClasses.includes(cls);
      return {
        ...prev,
        assignedClasses: exists
          ? prev.assignedClasses.filter((c) => c !== cls)
          : [...prev.assignedClasses, cls],
      };
    });
  };

  const toggleSubject = (subj: Subject) => {
    setFormData((prev) => {
      const exists = prev.primarySubjects.includes(subj);
      return {
        ...prev,
        primarySubjects: exists
          ? prev.primarySubjects.filter((s) => s !== subj)
          : [...prev.primarySubjects, subj],
      };
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-100" />
          <span>Profile changes saved and synced successfully!</span>
        </div>
      )}

      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Share2 className="w-4 h-4 text-indigo-100" />
          <span>Faculty academic portfolio link copied to clipboard!</span>
        </div>
      )}

      {/* 1. Hero Profile Card & Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl border transition-all ${
          isDark
            ? 'bg-[#121218] border-[#2A2A38] text-slate-100'
            : style === 'academic-warm'
            ? 'bg-[#FFFDFB] border-[#E6DFD3] text-[#28231D]'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        {/* Cover Header Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-r from-slate-800 via-indigo-950 to-blue-900">
          <img
            src={facultyProfile.coverUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'}
            alt="Academic Banner"
            className="w-full h-full object-cover opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Top badges on cover */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CBSE Verified Faculty</span>
            </span>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="relative px-5 sm:px-8 pb-6 pt-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            {/* Avatar & Identifiers */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="relative group shrink-0">
                <img
                  src={facultyProfile.avatarUrl}
                  alt={facultyProfile.name}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 shadow-xl ${
                    isDark
                      ? 'ring-[#121218] border-2 border-indigo-500/50'
                      : style === 'academic-warm'
                      ? 'ring-[#FFFDFB] border-2 border-[#8C4A2F]'
                      : 'ring-white border-2 border-blue-600'
                  }`}
                />
                <button
                  onClick={() => setAvatarModalOpen(true)}
                  className="absolute bottom-1 right-1 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  title="Change Avatar Photo"
                  aria-label="Change Avatar Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                    {facultyProfile.name}
                  </h1>
                  <button
                    onClick={handleCopyId}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold border transition-colors cursor-pointer ${
                      copiedId
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isDark
                        ? 'bg-[#181824] text-slate-300 border-[#2A2A38] hover:border-indigo-500/50'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                    title="Click to copy Faculty ID"
                  >
                    <span>{facultyProfile.facultyId}</span>
                    {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-bold text-indigo-500 dark:text-indigo-400">
                  {facultyProfile.title}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 opacity-70" />
                    {facultyProfile.department}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 opacity-70" />
                    {facultyProfile.institution}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Header Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSharePortfolio}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  isDark
                    ? 'bg-[#181824] border-[#2A2A38] text-slate-200 hover:bg-[#20202E]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Profile</span>
              </button>

              {activeTab === 'edit' ? (
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={handleStartEdit}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Key Metrics Ribbon */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 rounded-2xl border ${
              isDark
                ? 'bg-[#181824]/80 border-[#2A2A38]'
                : style === 'academic-warm'
                ? 'bg-[#FAF7F2] border-[#E8E2D6]'
                : 'bg-slate-50/90 border-slate-200/80'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span>Students Mentored</span>
              </div>
              <div className="text-lg sm:text-xl font-black">{facultyProfile.metrics.studentsMentored}</div>
              <div className="text-[10px] text-slate-500 font-medium">Across 5 cohorts</div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                <span>Gaps Remediated</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-500">
                {facultyProfile.metrics.gapsRemediated}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Over this academic term</div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Success Velocity</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-indigo-500">
                {facultyProfile.metrics.remediationSuccessRate}%
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Diagnostic recovery rate</div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Pedagogic Rating</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-500">
                {facultyProfile.metrics.pedagogicRating} / 5.0
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Based on student feedback</div>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                <span>Experience</span>
              </div>
              <div className="text-lg sm:text-xl font-black">{facultyProfile.yearsOfExperience} Years</div>
              <div className="text-[10px] text-slate-500 font-medium">CBSE & STEM Pedagogy</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div
          className={`flex items-center gap-2 px-5 sm:px-8 border-t overflow-x-auto ${
            isDark ? 'border-[#2A2A38] bg-[#0E0E14]' : 'border-slate-200 bg-slate-50/50'
          }`}
        >
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === 'portfolio'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Academic Portfolio & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Teaching Cohorts & Schedule</span>
          </button>

          <button
            onClick={() => {
              setFormData(facultyProfile);
              setActiveTab('edit');
            }}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
              activeTab === 'edit'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile & Preferences</span>
          </button>
        </div>
      </div>

      {/* 2. Tab Content: PORTFOLIO & BIO */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Bio, Philosophy & Badges */}
          <div className="lg:col-span-2 space-y-6">
            {/* About / Bio Card */}
            <div
              className={`rounded-2xl p-6 border transition-all ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
                {facultyProfile.bio}
              </p>

              {/* Teaching Philosophy Blockquote */}
              <div
                className={`mt-5 p-4 rounded-xl border-l-4 border-indigo-600 ${
                  isDark ? 'bg-[#181824]' : 'bg-indigo-50/50'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                  Core Teaching Philosophy
                </div>
                <p className="text-xs sm:text-sm italic font-medium text-slate-700 dark:text-slate-300">
                  &ldquo;{facultyProfile.teachingPhilosophy}&rdquo;
                </p>
              </div>
            </div>

            {/* Badges & Recognitions Card */}
            <div
              className={`rounded-2xl p-6 border transition-all ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Accredited Badges & Honours</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facultyProfile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isDark ? 'bg-[#181824] border-[#2A2A38]' : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                      {badge.icon === 'Award' && <Award className="w-5 h-5" />}
                      {badge.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                      {badge.icon === 'CheckCircle2' && <CheckCircle2 className="w-5 h-5" />}
                      {badge.icon === 'Bot' && <Bot className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xs font-bold leading-snug">{badge.title}</h3>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">{badge.earnedDate}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug font-normal">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Qualifications & Quick Contact Card */}
          <div className="space-y-6">
            {/* Academic Degrees & Certifications */}
            <div
              className={`rounded-2xl p-6 border transition-all ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>Degrees & Credentials</span>
              </h2>

              <div className="space-y-3">
                {facultyProfile.qualifications.map((qual, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2.5 ${
                      isDark ? 'bg-[#181824] border-[#2A2A38]' : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug text-slate-700 dark:text-slate-300">{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Contact & Office Card */}
            <div
              className={`rounded-2xl p-6 border transition-all space-y-4 ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Office & Consultation</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Official Email</div>
                    <a
                      href={`mailto:${facultyProfile.email}`}
                      className="text-indigo-500 hover:underline font-medium break-all"
                    >
                      {facultyProfile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Desk / Mobile</div>
                    <div className="font-medium text-slate-700 dark:text-slate-300">{facultyProfile.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Office Location</div>
                    <div className="font-medium text-slate-700 dark:text-slate-300">{facultyProfile.officeLocation}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Open Doubt-Clearing Hours</div>
                    <div className="font-medium text-slate-700 dark:text-slate-300">{facultyProfile.consultationHours}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate('overview')}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Go to Overview Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tab Content: TEACHING COHORTS & SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Classes Roster Card */}
          <div
            className={`rounded-2xl p-6 border transition-all ${
              isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Assigned Cohorts & Classes</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">{facultyProfile.assignedClasses.length} Classes</span>
            </div>

            <div className="space-y-3">
              {facultyProfile.assignedClasses.map((cls) => (
                <div
                  key={cls}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isDark
                      ? 'bg-[#181824] border-[#2A2A38] hover:border-indigo-500/50'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {cls.replace('Class ', 'C-')}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold">{cls}</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Curriculum: CBSE 2024-25 • 42 Students</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectClass) onSelectClass(cls);
                      onNavigate('overview');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white transition cursor-pointer"
                  >
                    View Analytics
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Subjects & Consultation Timings Card */}
          <div className="space-y-6">
            <div
              className={`rounded-2xl p-6 border transition-all ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>Teaching Domains & Subjects</span>
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {facultyProfile.primarySubjects.map((subj) => (
                  <span
                    key={subj}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{subj}</span>
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 border transition-all ${
                isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Weekly Consultation Schedule</span>
              </h2>

              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#181824] border-[#2A2A38]' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="text-xs font-bold text-indigo-400">{facultyProfile.consultationHours}</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  Walk-in doubt sessions held at {facultyProfile.officeLocation}. Priority given to students with active
                  learning gaps flagged by the Pragya Diagnostic Radar.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tab Content: EDIT PROFILE & PREFERENCES */}
      {activeTab === 'edit' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div
            className={`rounded-2xl p-6 border transition-all space-y-6 ${
              isDark ? 'bg-[#121218] border-[#2A2A38]' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <h2 className="text-base font-black tracking-tight flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-500" />
                <span>General Information</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your academic profile details shown on diagnostic cards and reports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Designation / Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Institution / School
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Faculty ID</label>
                <input
                  type="text"
                  value={formData.facultyId}
                  onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Official Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Office Location</label>
                <input
                  type="text"
                  value={formData.officeLocation}
                  onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Consultation Hours
                </label>
                <input
                  type="text"
                  value={formData.consultationHours}
                  onChange={(e) => setFormData({ ...formData, consultationHours: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Bio & Philosophy */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Teaching Philosophy
                </label>
                <textarea
                  rows={2}
                  value={formData.teachingPhilosophy}
                  onChange={(e) => setFormData({ ...formData, teachingPhilosophy: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Classes & Subjects Pickers */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Assigned Classes (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {allAvailableClasses.map((cls) => {
                    const isSelected = formData.assignedClasses.includes(cls);
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => toggleClass(cls)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : isDark
                            ? 'bg-[#181824] border-[#2A2A38] text-slate-400 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Primary Subjects (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {allAvailableSubjects.map((subj) => {
                    const isSelected = formData.primarySubjects.includes(subj);
                    return (
                      <button
                        type="button"
                        key={subj}
                        onClick={() => toggleSubject(subj)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : isDark
                            ? 'bg-[#181824] border-[#2A2A38] text-slate-400 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {subj}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Qualifications List Editor */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                Degrees & Qualifications
              </label>
              <div className="space-y-2">
                {formData.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border ${
                        isDark ? 'bg-[#181824] border-[#2A2A38] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {q}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQualification(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                      title="Remove Qualification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., M.Sc. Data Pedagogy — Oxford University"
                  value={newQualificationInput}
                  onChange={(e) => setNewQualificationInput(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddQualification}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                Notification & Alert Preferences
              </label>

              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.urgentGapAlerts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          urgentGapAlerts: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-medium">Urgent Topic Roadblock Alerts (&gt;40% Failure Spike)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.dailyMorningBrief}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          dailyMorningBrief: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-medium">Daily Morning Diagnostic Digest & Faculty Goals</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.emailDigest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          emailDigest: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-medium">Weekly Cohort Mastery Summary via Email</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notificationPreferences.parentEscalationSMS}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          parentEscalationSMS: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-medium">SMS alerts for unresolved critical parent doubt escalations</span>
                </label>
              </div>
            </div>

            {/* Action Bar at bottom */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  resetFacultyProfile();
                  setFormData(facultyProfile);
                  setSaveToast(true);
                  setTimeout(() => setSaveToast(false), 2500);
                }}
                className="flex items-center gap-1.5 text-xs text-rose-500 font-bold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to System Defaults</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Avatar Picker Modal */}
      {avatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 ${
              isDark ? 'bg-[#14141C] border-[#2A2A38] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-black tracking-tight">Choose Faculty Avatar</h3>
              </div>
              <button
                onClick={() => setAvatarModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400">Select from Academic Presets:</div>
              <div className="grid grid-cols-4 gap-3">
                {avatarPresets.map((preset) => {
                  const isSelected = facultyProfile.avatarUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPresetAvatar(preset.url)}
                      className={`relative group rounded-2xl overflow-hidden p-1 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 ring-2 ring-indigo-500/40 scale-105'
                          : 'border-transparent hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-20 sm:h-24 rounded-xl object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-400">Or Paste Custom Image URL:</div>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark ? 'bg-[#181824] border-[#2A2A38] text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleApplyCustomAvatar}
                  disabled={!customAvatarUrl.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
