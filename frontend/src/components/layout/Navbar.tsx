import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md w-full">
      <div className="w-full px-3.5 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Company Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="HADESCORE PVT LTD Home">
            <img
              src="/logo.png"
              alt="HADESCORE PVT LTD Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_12px_rgba(0,216,246,0.35)] group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="font-display font-black text-base sm:text-xl md:text-2xl tracking-tight leading-none">
              <span className="text-[#00D8F6]">HADES</span>
              <span className="text-white">CORE</span>
              <span className="text-[#00D8F6] ml-1.5 sm:ml-2 text-xs sm:text-base font-extrabold tracking-normal">PVT LTD</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
