import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  BookOpen,
  HelpCircle,
  BarChart3,
  Rocket,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Bell,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Target, label: 'Leads', href: '/admin/leads' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BookOpen, label: 'Domains', href: '/admin/domains' },
  { icon: HelpCircle, label: 'Questions', href: '/admin/questions' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('admin_sidebar_collapsed') === 'true';
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    localStorage.setItem('admin_sidebar_collapsed', String(collapsed));
  }, [collapsed]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'A';
  const userName = user?.email?.split('@')[0] || 'Administrator';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/70 to-slate-100 text-slate-800 flex font-sans selection:bg-emerald-100 selection:text-emerald-900 relative overflow-x-hidden">
      {/* Dynamic Animated Ambient Background Aura & Dot Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft emerald aura */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-emerald-400/15 via-teal-300/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        {/* Soft indigo/sky aura */}
        <div className="absolute top-1/4 -right-28 w-[480px] h-[480px] bg-gradient-to-bl from-indigo-400/12 via-sky-300/10 to-transparent rounded-full blur-3xl animate-float-reverse" />
        {/* Soft warm aura */}
        <div className="absolute -bottom-24 left-1/3 w-[540px] h-[540px] bg-gradient-to-tr from-emerald-300/10 via-teal-200/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
        {/* Fine technical dot matrix texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'hidden lg:flex lg:flex-col bg-white/85 backdrop-blur-2xl border-r border-slate-200/80 shadow-[4px_0_24px_0_rgba(15,23,42,0.03)] fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo & Collapse Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100/90">
          <Link
            to="/admin"
            className={cn(
              'flex items-center gap-2.5 overflow-hidden transition-all duration-200',
              collapsed ? 'justify-center w-full' : 'px-2'
            )}
            title="Hadescore Admin Portal"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/domains/default.svg';
                }}
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 text-sm tracking-tight truncate">
                    Hadescore
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  Assessment & CRM
                </span>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group',
                  collapsed ? 'justify-center px-0 py-3' : '',
                  isActive
                    ? 'bg-emerald-50/90 text-emerald-800 font-semibold shadow-2xs translate-x-0.5'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:translate-x-1'
                )}
              >
                {/* Active vertical pill indicator */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-600 rounded-r-full" />
                )}

                <item.icon
                  className={cn(
                    'w-[18px] h-[18px] shrink-0 transition-colors',
                    isActive ? 'text-emerald-700' : 'text-slate-500 group-hover:text-slate-700'
                  )}
                />

                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    )}
                    {isActive && !item.badge && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-600/70" />
                    )}
                  </>
                )}

                {/* Floating Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Collapse Toggle & User Profile */}
        <div className="p-3 border-t border-slate-100/90 space-y-2">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full py-2 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}

          <div
            className={cn(
              'flex items-center gap-3 p-2 rounded-xl bg-slate-50/80 border border-slate-100/80 transition-all',
              collapsed ? 'justify-center p-1.5' : ''
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 border border-emerald-200/60 flex items-center justify-center text-xs font-bold shrink-0">
              {userInitial}
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate capitalize">
                  {userName}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Super Admin</span>
                </div>
              </div>
            )}

            {!collapsed && (
              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-2xl border-r border-slate-200/80 shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm">Hadescore</span>
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-2xs translate-x-0.5'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                )}
              >
                <item.icon
                  className={cn(
                    'w-4 h-4 shrink-0 transition-colors',
                    isActive ? 'text-emerald-700' : 'text-slate-500'
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate capitalize">{userName}</p>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out',
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white/80 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_2px_12px_0_rgba(15,23,42,0.02)] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 transition-all duration-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              {title && (
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {title}
                  </h1>
                </div>
              )}
              {subtitle && (
                <p className="text-xs text-slate-400 hidden sm:block font-normal mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Custom page action slots */}
            {actions}

            {/* Live System Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Portal Live</span>
            </div>

            {/* Quick Profile Pill on Desktop */}
            <div className="flex items-center pl-2 border-l border-slate-200/70">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-medium transition-colors"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Main Content with smooth entrance animation */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 animate-in fade-in-50 slide-in-from-bottom-2 duration-500 ease-out">
          {children}
        </main>
      </div>
    </div>
  );
}
