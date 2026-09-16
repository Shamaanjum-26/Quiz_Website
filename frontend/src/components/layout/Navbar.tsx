import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Company Name moved to the corner left */}
          <Link to="/home" className="flex items-center gap-3 group" aria-label="Hadescore Pvt Ltd Home">
            <img
              src="/logo.png"
              alt="Hadescore Pvt Ltd Logo"
              className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">
              Hadescore <span className="text-brand-600">Pvt Ltd</span>
            </span>
          </Link>

          {/* Admin Login Link */}
          <Link
            to="/admin/login"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:text-brand-600 hover:border-brand-300 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
