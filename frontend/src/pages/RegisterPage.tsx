import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight, AlertCircle, CheckCircle2, Loader2, UserCheck, Search, ChevronDown, Check, X, Sparkles, BookOpen,
  User, Mail, Phone, Building2, GraduationCap, Calendar, MapPin, Layers, Zap
} from 'lucide-react';
import {
  studentRegistrationSchema,
  type StudentRegistrationInput,
  INDIAN_STATES,
  ACADEMIC_YEARS,
  BRANCHES,
} from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createOrGetStudent, getStudentByEmail } from '@/services/studentService';
import { getLeadForStudent } from '@/services/leadService';
import { getStoredQuizConfig } from '@/services/quizService';
import { getDomains } from '@/services/quizService';
import { useUTM } from '@/hooks/useUTM';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/useToast';
import { TECH_DOMAINS, type TechDomainOption } from '@/data/techDomains';
import type { Domain } from '@/types';
import { FullscreenProctorConfirmModal } from '@/components/quiz/FullscreenProctorConfirmModal';

export default function RegisterPage() {
  const navigate = useNavigate();
  const utm = useUTM();
  const [domainsList, setDomainsList] = useState<TechDomainOption[]>(TECH_DOMAINS);
  const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [isDomainPickerOpen, setIsDomainPickerOpen] = useState(false);
  const [domainSearch, setDomainSearch] = useState('');
  const [customDomainText, setCustomDomainText] = useState('');
  const [customDomainError, setCustomDomainError] = useState(false);
  const [showProctorModal, setShowProctorModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<StudentRegistrationInput | null>(null);
  const [otherAcademicYearText, setOtherAcademicYearText] = useState('');
  const [otherAcademicYearError, setOtherAcademicYearError] = useState(false);
  const domainPickerRef = useRef<HTMLDivElement>(null);
  const customDomainInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<StudentRegistrationInput>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
      referral_code: utm.referral_code,
      preferred_domain_id: '',
      consent: false,
    },
  });

  const selectedAcademicYear = watch('academic_year');
  const isOtherAcademicYear = selectedAcademicYear === 'Others';
  const selectedDomainId = watch('preferred_domain_id');
  const isCustomDomain = selectedDomainId === 'custom';
  const selectedDomainObj = selectedDomainId ? domainsList.find((d) => d.id === selectedDomainId) : undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (domainPickerRef.current && !domainPickerRef.current.contains(event.target as Node)) {
        setIsDomainPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getDomains()
      .then((data) => {
        if (data && data.length > 0) {
          const merged: TechDomainOption[] = [
            ...data.map((d) => ({
              id: d.id,
              name: d.name,
              slug: d.slug,
              category: 'Featured Domains',
              icon: d.icon || '💻',
            })),
            ...TECH_DOMAINS.filter((td) => !data.some((d) => d.slug === td.slug)),
          ];
          setDomainsList(merged);
        }
      })
      .catch(() => {});
  }, []);

  const onFormSubmit = async (data: StudentRegistrationInput) => {
    if (isCustomDomain && !customDomainText.trim()) {
      setCustomDomainError(true);
      customDomainInputRef.current?.focus();
      toast({
        title: 'Domain Required',
        description: 'Please specify the name of your tech domain or subject.',
        variant: 'destructive',
      });
      return;
    }

    if (data.academic_year === 'Others') {
      if (!otherAcademicYearText.trim()) {
        setOtherAcademicYearError(true);
        toast({
          title: 'Academic Status Required',
          description: 'Please type your academic year or status in the field provided.',
          variant: 'destructive',
        });
        return;
      }
      data.academic_year = otherAcademicYearText.trim();
    }

    // Check if email is already registered before showing modal
    setIsLoading(true);
    try {
      const existingStudent = await getStudentByEmail(data.email);
      if (existingStudent) {
        toast({
          title: '⚠️ Email Already Registered',
          description: `Candidate email '${data.email}' has already attended / registered for the assessment. Re-attempts with the same email are not permitted.`,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }

    setPendingFormData(data);
    setShowProctorModal(true);
  };

  const handleConfirmedStart = async () => {
    if (!pendingFormData) return;
    const data = pendingFormData;

    setIsLoading(true);
    try {
      // ── Strict 1 Attempt Per Email Limit Enforcement ─────────────
      const existingStudent = await getStudentByEmail(data.email);
      if (existingStudent) {
        toast({
          title: '⚠️ Assessment Attempt Limit Reached',
          description: `Candidate email '${data.email}' has already registered / attended this assessment. Only 1 attempt is allowed per candidate.`,
          variant: 'destructive',
        });
        setIsLoading(false);
        setShowProctorModal(false);
        return;
      }

      let chosenName = selectedDomainObj?.name || 'Python';
      let chosenSlug = selectedDomainObj?.slug || 'python';
      let targetDomainId = selectedDomainObj?.id;

      if (isCustomDomain) {
        chosenName = customDomainText.trim();
        chosenSlug = chosenName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        targetDomainId = undefined;
      }

      let studentId = 'student-' + Date.now();

      if (isSupabaseConfigured) {
        try {
          const { student, isNew } = await createOrGetStudent({
            ...data,
            preferred_domain_id: targetDomainId && targetDomainId !== 'custom' ? targetDomainId : undefined,
            linkedin_url: data.linkedin_url || undefined,
          });
          studentId = student.id;
          setIsExisting(!isNew);
          toast({
            title: isNew ? 'Registration successful! 🎉' : 'Welcome back! 👋',
            description: `Starting your timed ${chosenName} assessment now...`,
            variant: 'success',
          });
        } catch (dbErr) {
          console.warn('Database note:', dbErr);
          toast({
            title: 'Starting Assessment',
            description: `Preparing your ${chosenName} quiz...`,
            variant: 'default',
          });
        }
      } else {
        toast({
          title: 'Demo Mode Active',
          description: `Starting your ${chosenName} assessment...`,
          variant: 'default',
        });
      }

      setShowProctorModal(false);

      setTimeout(() => {
        navigate(`/quiz/${chosenSlug}`, {
          state: {
            studentId,
            domainId: targetDomainId,
            customDomainName: isCustomDomain ? chosenName : undefined,
          },
        });
      }, 500);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
      setShowProctorModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/40 py-10 sm:py-16">
      {/* Interactive Dynamic Animated Background Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-violet-400/25 to-fuchsia-400/20 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-gradient-to-bl from-sky-400/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700 duration-1000" />
      <div className="absolute -bottom-28 left-1/3 w-80 h-80 bg-gradient-to-tr from-emerald-400/15 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-3 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent drop-shadow-xs">
              Let’s Quiz!
            </span>
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-indigo-500/30 transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer animate-bounce">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-lg mx-auto font-medium">
            Fill in your details to begin your assessment and test your skills.
          </p>
        </div>



        {/* Existing student notice */}
        {isExisting && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 shadow-xs">
            <UserCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">Welcome Back!</p>
              <p className="text-emerald-700 text-sm mt-1">
                We found your existing account. Continuing your journey.
              </p>
            </div>
          </div>
        )}

        {/* Form Card (Interactive Glassmorphic Container) */}
        <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl border border-indigo-100/90 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.12)] hover:shadow-[0_25px_70px_-15px_rgba(79,70,229,0.18)] transition-all duration-300">
          {/* Top Vibrant Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 rounded-t-3xl" />
          
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
              <div className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="full_name" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-violet-600" />
                    <span>Full Name *</span>
                  </Label>
                  <Input
                    id="full_name"
                    placeholder="Enter your full name"
                    {...register('full_name')}
                    className="h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 text-sm font-medium transition-all duration-200"
                    aria-describedby={errors.full_name ? 'full_name_error' : undefined}
                  />
                  {errors.full_name && (
                    <p id="full_name_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>Email Address *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email')}
                    className="h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 text-sm font-medium transition-all duration-200"
                    aria-describedby={errors.email ? 'email_error' : undefined}
                  />
                  {errors.email && (
                    <p id="email_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Mobile Number *</span>
                  </Label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3.5 bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-sm font-bold rounded-xl whitespace-nowrap shadow-xs">
                      +91
                    </span>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      {...register('mobile')}
                      className="flex-1 h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-sm font-medium transition-all duration-200"
                      aria-describedby={errors.mobile ? 'mobile_error' : undefined}
                    />
                  </div>
                  {errors.mobile && (
                    <p id="mobile_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* College */}
                <div className="space-y-1.5">
                  <Label htmlFor="college" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-sky-600" />
                    <span>College / University *</span>
                  </Label>
                  <Input
                    id="college"
                    placeholder="Enter your college or university name"
                    {...register('college')}
                    className="h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-sm font-medium transition-all duration-200"
                    aria-describedby={errors.college ? 'college_error' : undefined}
                  />
                  {errors.college && (
                    <p id="college_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.college.message}
                    </p>
                  )}
                </div>

                {/* Branch / Course Textarea */}
                <div className="space-y-1.5">
                  <Label htmlFor="branch" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>Branch / Course *</span>
                  </Label>
                  <textarea
                    id="branch"
                    rows={2}
                    placeholder="Enter your degree and field of study"
                    className="w-full bg-slate-50/70 hover:bg-white border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 rounded-xl text-sm font-medium text-slate-900 shadow-xs p-3 transition-all duration-200 resize-none outline-none leading-relaxed"
                    {...register('branch')}
                  />
                  {errors.branch && (
                    <p id="branch_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.branch.message}
                    </p>
                  )}
                </div>

                {/* Academic Year */}
                <div className="space-y-1.5">
                  <Label htmlFor="academic_year" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Academic Year *</span>
                  </Label>
                  <Controller
                    name="academic_year"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          if (val !== 'Others') {
                            setOtherAcademicYearError(false);
                          }
                        }}
                        value={field.value}
                      >
                        <SelectTrigger id="academic_year" className="h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 text-sm font-medium transition-all duration-200">
                          <SelectValue placeholder="Select academic year" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACADEMIC_YEARS.map((y) => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.academic_year && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.academic_year.message}
                    </p>
                  )}

                  {/* Custom input when 'Others' is selected */}
                  {isOtherAcademicYear && (
                    <div className="pt-2 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <Label htmlFor="other_academic_year" className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                        <span>Please specify your academic status / opinion *</span>
                      </Label>
                      <Input
                        id="other_academic_year"
                        placeholder="Type your current year, course, or opinion here..."
                        value={otherAcademicYearText}
                        onChange={(e) => {
                          setOtherAcademicYearText(e.target.value);
                          if (e.target.value.trim()) {
                            setOtherAcademicYearError(false);
                          }
                        }}
                        className="bg-white border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 rounded-xl text-sm"
                        autoFocus
                      />
                      {otherAcademicYearError && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Please type your academic status or opinion.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>State *</span>
                  </Label>
                  <Input
                    id="state"
                    placeholder="Enter your state or union territory"
                    {...register('state')}
                    className="h-11 rounded-xl bg-slate-50/70 hover:bg-white border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 text-sm font-medium transition-all duration-200"
                    aria-describedby={errors.state ? 'state_error' : undefined}
                  />
                  {errors.state && (
                    <p id="state_error" className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Preferred Domain (Simple Clean Dropdown) */}
                <div className="space-y-1.5 relative" ref={domainPickerRef}>
                  <Label htmlFor="domain-trigger" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    <span>Select Tech Domain / Subject *</span>
                  </Label>

                  {/* Clean Trigger Button */}
                  <button
                    id="domain-trigger"
                    type="button"
                    onClick={() => setIsDomainPickerOpen(!isDomainPickerOpen)}
                    className="w-full h-11 px-3.5 bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-cyan-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 rounded-xl text-sm shadow-xs flex items-center justify-between text-left transition-all duration-200 cursor-pointer"
                  >
                    <span className={selectedDomainObj || (isCustomDomain && customDomainText.trim()) ? 'text-slate-900 font-bold truncate' : isCustomDomain ? 'text-slate-900 font-medium truncate' : 'text-slate-400 truncate'}>
                      {isCustomDomain
                        ? (customDomainText.trim() ? `Others (${customDomainText.trim()})` : 'Others')
                        : (selectedDomainObj?.name || 'Select your domain')}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${isDomainPickerOpen ? 'rotate-180 text-cyan-600' : ''}`} />
                  </button>

                  {/* Simple Clean Dropdown Popover */}
                  {isDomainPickerOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-150">
                      {/* Minimal Inline Search */}
                      <div className="px-3.5 py-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={domainSearch}
                          onChange={(e) => setDomainSearch(e.target.value)}
                          placeholder="Search domain..."
                          className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent outline-none font-medium"
                          autoFocus
                        />
                        {domainSearch && (
                          <button
                            type="button"
                            onClick={() => setDomainSearch('')}
                            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Scrollable Domains List */}
                      <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                        {/* Clean "Others" Option at the top */}
                        {(!domainSearch.trim() || 'others'.includes(domainSearch.toLowerCase().trim())) && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('preferred_domain_id', 'custom');
                              setIsDomainPickerOpen(false);
                              setDomainSearch('');
                              setCustomDomainError(false);
                              setTimeout(() => customDomainInputRef.current?.focus(), 60);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl text-left transition-all duration-150 cursor-pointer ${
                              isCustomDomain
                                ? 'bg-indigo-50 text-indigo-700 font-bold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <span className="truncate">Others</span>
                            {isCustomDomain && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                          </button>
                        )}

                        {(() => {
                          const filtered = domainsList
                            .filter((d) => d.id !== 'custom')
                            .filter((d) =>
                              domainSearch.trim() === '' ||
                              d.name.toLowerCase().includes(domainSearch.toLowerCase()) ||
                              (d.category && d.category.toLowerCase().includes(domainSearch.toLowerCase()))
                            );

                          if (filtered.length === 0 && domainSearch.trim() && !'others'.includes(domainSearch.toLowerCase().trim())) {
                            return (
                              <div className="py-3 px-3 text-center">
                                <p className="text-xs text-slate-500 mb-2">
                                  No predefined domain matching <span className="font-semibold text-slate-700">"{domainSearch}"</span>
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setValue('preferred_domain_id', 'custom');
                                    setCustomDomainText(domainSearch.trim());
                                    setCustomDomainError(false);
                                    setIsDomainPickerOpen(false);
                                    setDomainSearch('');
                                    setTimeout(() => customDomainInputRef.current?.focus(), 60);
                                  }}
                                  className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors cursor-pointer"
                                >
                                  Select Others
                                </button>
                              </div>
                            );
                          }

                          return filtered.map((d) => {
                            const isSelected = d.id === selectedDomainId;
                            return (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => {
                                  setValue('preferred_domain_id', d.id);
                                  setIsDomainPickerOpen(false);
                                  setDomainSearch('');
                                  setCustomDomainError(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm rounded-xl text-left transition-all duration-150 cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                }`}
                              >
                                <span className="truncate">{d.name}</span>
                                {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {errors.preferred_domain_id && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.preferred_domain_id.message}
                    </p>
                  )}

                  {/* Clean Custom Domain Input when Others is selected */}
                  {isCustomDomain && (
                    <div className="pt-2 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <Label htmlFor="custom_domain_text_register" className="text-xs font-semibold text-slate-700">
                        Enter Your Domain / Subject *
                      </Label>
                      <Input
                        ref={customDomainInputRef}
                        id="custom_domain_text_register"
                        placeholder="Enter your domain or specialization"
                        value={customDomainText}
                        onChange={(e) => {
                          setCustomDomainText(e.target.value);
                          if (e.target.value.trim()) {
                            setCustomDomainError(false);
                          }
                        }}
                        className={`h-11 rounded-xl bg-white text-sm font-medium transition-all duration-200 ${
                          customDomainError
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15'
                            : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15'
                        }`}
                        autoFocus
                        required
                      />
                      {customDomainError && (
                        <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          Please type your domain or subject name.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Hidden UTM fields */}
                <input type="hidden" {...register('utm_source')} value={utm.utm_source} />
                <input type="hidden" {...register('utm_medium')} value={utm.utm_medium} />
                <input type="hidden" {...register('utm_campaign')} value={utm.utm_campaign} />
                <input type="hidden" {...register('utm_content')} value={utm.utm_content} />
                <input type="hidden" {...register('utm_term')} value={utm.utm_term} />

                {/* Consent (Simplified) */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/50 hover:bg-indigo-50/80 border border-indigo-100/90 transition-colors cursor-pointer">
                  <input
                    id="consent"
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 cursor-pointer"
                    aria-describedby={errors.consent ? 'consent_error' : undefined}
                  />
                  <label htmlFor="consent" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer leading-relaxed">
                    I agree to start the skill assessment and receive my score report.
                  </label>
                </div>
                {errors.consent && (
                  <p id="consent_error" className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.consent.message}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 text-base font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:via-indigo-500 hover:to-sky-400 text-white rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 gap-2.5 cursor-pointer group transition-all duration-200 border-0"
                  disabled={isLoading}
                  id="register-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving your details...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Quiz</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fullscreen & Proctoring Confirmation Modal */}
      <FullscreenProctorConfirmModal
        isOpen={showProctorModal}
        onClose={() => setShowProctorModal(false)}
        onConfirm={handleConfirmedStart}
        domainName={isCustomDomain ? customDomainText.trim() || 'Custom' : selectedDomainObj?.name || 'Skill'}
        isLoading={isLoading}
      />
    </div>
  );
}
