import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2, Mail, BookOpen, ArrowRight, Award, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Student } from '@/types';

export default function SuccessPage() {
  const location = useLocation();
  const state = location.state as {
    student?: Student;
    isBootcampRegistration?: boolean;
    studentName?: string;
    bootcampName?: string;
    batch?: string;
    timing?: string;
    mode?: string;
    domainName?: string;
  } | null;

  const isBootcamp = Boolean(state?.isBootcampRegistration);
  const student = state?.student;
  const studentName = state?.studentName || student?.full_name?.split(' ')[0] || 'Student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-brand-50 flex items-center justify-center p-3.5 sm:p-4 py-8 sm:py-12">
      <div className="max-w-xl w-full text-center">

        {/* Success icon */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-emerald-500/10 animate-count-up">
          <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600" />
        </div>

        {isBootcamp ? (
          <>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-gray-900 mb-2 sm:mb-3 tracking-tight">
              🎉 You're Registered!
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
              Your Bootcamp registration has been successfully submitted. We will share the next steps with you.
            </p>

            {/* Next Steps Card */}
            <div className="bg-indigo-50/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 text-left border border-indigo-100/80">
              <h3 className="font-bold text-indigo-950 mb-3 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                What Happens Next
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-indigo-900">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/80 flex items-center justify-center text-xs font-bold text-indigo-800 shrink-0 mt-0.5">1</span>
                  <span><strong>Check your Email:</strong> Your calendar invite and Zoom joining links will be delivered before orientation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/80 flex items-center justify-center text-xs font-bold text-indigo-800 shrink-0 mt-0.5">2</span>
                  <span><strong>Join Community:</strong> <a href="https://chat.whatsapp.com/E3OZRJip3Gx1y0XXNmKXvo" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-800 font-bold underline">Join Company WhatsApp Community</a> to connect directly with mentors and peers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-200/80 flex items-center justify-center text-xs font-bold text-indigo-800 shrink-0 mt-0.5">3</span>
                  <span><strong>Pre-Bootcamp Toolkit:</strong> Software setup guides and starter repository instructions will be unlocked.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <Link to="/home" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 h-12 sm:h-13 text-sm sm:text-base font-semibold cursor-pointer rounded-xl sm:rounded-2xl">
                  Back to Assessment Home
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display font-bold text-2xl sm:text-4xl text-gray-900 mb-2 sm:mb-3">
              You're Registered! 🎉
            </h1>
            <p className="text-gray-500 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {student ? `Welcome, ${student.full_name.split(' ')[0]}!` : 'Welcome!'}{' '}
              Your assessment profile has been created.
            </p>

            {/* Next steps */}
            <div className="bg-brand-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 text-left border border-brand-100">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">✅ What Happens Next</h3>
              <div className="space-y-3.5 sm:space-y-4">
                {[
                  {
                    icon: BookOpen,
                    title: 'Start your technical skill assessment',
                    desc: 'Choose your preferred domain track and begin the 15-minute diagnostic quiz.',
                  },
                  {
                    icon: Award,
                    title: 'Receive your instant diagnostic report',
                    desc: 'Get an immediate breakdown of your strengths, weaknesses, and peer percentiles.',
                  },
                  {
                    icon: Mail,
                    title: 'Check your email inbox',
                    desc: 'Your personalized skill score and learning roadmap will be delivered directly.',
                  },
                ].map((step) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm">{step.title}</p>
                      <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link to="/home" className="flex-1">
                <Button size="lg" className="w-full h-12 sm:h-13 rounded-xl sm:rounded-2xl gap-2 text-sm sm:text-base">
                  Take Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/home" className="flex-1">
                <Button variant="outline" size="lg" className="w-full h-12 sm:h-13 rounded-xl sm:rounded-2xl text-sm sm:text-base">
                  Back to Home
                </Button>
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
