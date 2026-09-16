import { z } from 'zod';

// ── Student Registration ──────────────────────────────────────
export const studentRegistrationSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  college: z
    .string()
    .min(3, 'College name must be at least 3 characters')
    .max(200, 'College name is too long'),
  branch: z
    .string()
    .min(2, 'Branch / Course is required'),
  academic_year: z
    .string()
    .min(1, 'Academic year is required'),
  state: z
    .string()
    .min(2, 'State is required'),
  city: z.string().optional(),
  graduation_year: z
    .number()
    .int()
    .min(2020)
    .max(2035)
    .optional()
    .or(z.literal(undefined)),
  preferred_domain_id: z.string().min(1, 'Please select a tech domain'),
  linkedin_url: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Please agree to continue',
  }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referral_code: z.string().optional(),
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;

// ── Bootcamp Registration ─────────────────────────────────────
export const bootcampRegistrationSchema = z.object({
  preferred_timing: z.string().min(1, 'Please select your preferred timing'),
  learning_goal: z
    .string()
    .min(10, 'Please describe your learning goal (at least 10 characters)')
    .max(500, 'Learning goal is too long'),
});

export type BootcampRegistrationInput = z.infer<typeof bootcampRegistrationSchema>;

// ── Admin Login ───────────────────────────────────────────────
export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

// ── Question Management ───────────────────────────────────────
export const questionSchema = z.object({
  domain_id: z.string().uuid('Domain is required'),
  question_text: z.string().min(10, 'Question must be at least 10 characters'),
  explanation: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  marks: z.number().int().min(1).max(10),
  options: z
    .array(
      z.object({
        option_text: z.string().min(1, 'Option text is required'),
        is_correct: z.boolean(),
      })
    )
    .min(2, 'At least 2 options required')
    .max(6, 'Maximum 6 options allowed')
    .refine(
      (opts) => opts.filter((o) => o.is_correct).length === 1,
      'Exactly one option must be marked as correct'
    ),
});

export type QuestionInput = z.infer<typeof questionSchema>;

// ── Domain Management ─────────────────────────────────────────
export const domainSchema = z.object({
  name: z.string().min(2, 'Domain name is required'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().min(10, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimated_minutes: z.number().int().min(5).max(120),
});

export type DomainInput = z.infer<typeof domainSchema>;

// ── Bootcamp Management ───────────────────────────────────────
export const bootcampSchema = z.object({
  name: z.string().min(3, 'Bootcamp name is required'),
  description: z.string().min(10, 'Description is required'),
  domain_id: z.string().uuid().optional().or(z.literal('')),
  mentor_name: z.string().optional(),
  mentor_bio: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  start_time: z.string().optional(),
  duration_weeks: z.number().int().min(1).max(52),
  mode: z.enum(['online', 'offline', 'hybrid']),
  platform: z.string().optional(),
  total_seats: z.number().int().min(1),
  is_free: z.boolean(),
  price: z.number().min(0),
  status: z.enum(['draft', 'upcoming', 'live', 'completed', 'cancelled']),
  benefits: z.array(z.string()).optional(),
});

export type BootcampInput = z.infer<typeof bootcampSchema>;

// ── Constants ─────────────────────────────────────────────────
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep',
  'Puducherry',
];

export const ACADEMIC_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Graduated',
  'Others',
];

export const BRANCHES = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Data Science',
  'Artificial Intelligence & ML',
  'Cyber Security',
  'BCA', 'MCA', 'BSc Computer Science',
  'BSc IT', 'BSc Mathematics', 'B.Tech', 'M.Tech',
  'MBA', 'BBA', 'Other',
];
