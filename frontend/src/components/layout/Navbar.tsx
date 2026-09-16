import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Company Name */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="HADESCORE PVT LTD Home">
            <img
              src="/logo.png"
              alt="HADESCORE PVT LTD Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,216,246,0.35)] group-hover:scale-105 transition-transform"
            />
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight">
              <span className="text-[#00D8F6]">HADES</span>
              <span className="text-white">CORE</span>
              <span className="text-[#00D8F6] ml-2">PVT LTD</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
