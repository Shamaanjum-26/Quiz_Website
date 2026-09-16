import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { adminLoginSchema, type AdminLoginInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginInput) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(data.email, data.password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070b14] flex items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-transparent rounded-full blur-[140px] animate-pulse duration-1000" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-500 duration-1000" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px] animate-pulse delay-1000 duration-1000" />
        
        {/* Subtle high-tech radial grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="relative w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Header Branding with Interactive Glow */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.25)] hover:shadow-[0_0_70px_rgba(99,102,241,0.45)] hover:scale-105 transition-all duration-300 mb-4 backdrop-blur-xl group cursor-pointer">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/logo.png"
              alt="Hadescore Logo"
              className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:rotate-3"
            />
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-2 flex flex-wrap items-center justify-center gap-2">
            <span>
              <span className="text-[#00D8F6]">HADES</span><span className="text-white">CORE</span> <span className="text-[#00D8F6]">PVT LTD</span>
            </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">
              Admin
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Sign in to access the assessment dashboard
          </p>
        </div>

        {/* Clean Glassmorphic Login Card */}
        <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-white/[0.08] hover:border-indigo-500/30 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden">
          {/* Top Iridescent Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div className="p-7 sm:p-9">


            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2.5 text-rose-300 text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Email Address</span>
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your administrator email"
                    className="h-12 bg-slate-950/70 hover:bg-slate-950/90 border-slate-800 text-white placeholder:text-slate-500 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/20 rounded-xl text-sm font-medium transition-all duration-200"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Password</span>
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 bg-slate-950/70 hover:bg-slate-950/90 border-slate-800 text-white placeholder:text-slate-500 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/20 rounded-xl pr-12 text-sm font-medium transition-all duration-200"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button with Gradient & Micro-Animation */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 active:scale-[0.99] text-white rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:shadow-xl gap-2 cursor-pointer transition-all duration-200 border-0 group"
                  size="lg"
                  disabled={loading}
                  id="admin-login-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                      <span>Sign In to Admin Panel</span>
                      <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Clean Portal Link with Hover Shift */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
              <Link
                to="/home"
                className="text-xs text-slate-400 hover:text-indigo-400 font-medium transition-all duration-200 inline-flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
                <span>Go to Student Assessment Portal</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
