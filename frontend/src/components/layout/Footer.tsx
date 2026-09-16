import { Link } from 'react-router-dom';
import { Zap, Instagram, Twitter, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Take Free Assessment', href: '/#assessment-form' },
    { label: 'Diagnostic Skill Report', href: '/#assessment-form' },
    { label: 'Admin Portal', href: '/admin' },
  ],
  Domains: [
    { label: 'Python', href: '/quiz/python' },
    { label: 'Web Development', href: '/quiz/web-development' },
    { label: 'AI / Machine Learning', href: '/quiz/ai-ml' },
    { label: 'Data Science', href: '/quiz/data-science' },
    { label: 'Cyber Security', href: '/quiz/cyber-security' },
    { label: 'Java', href: '/quiz/java' },
  ],
  Company: [
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/' },
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Hadescore PVT LTD Logo"
                className="w-10 h-10 object-contain drop-shadow-md"
              />
              <span className="font-display font-black text-xl tracking-tight">
                <span className="text-[#00D8F6]">HADES</span>
                <span className="text-white">CORE</span>
                <span className="text-[#00D8F6] ml-2">PVT LTD</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Empowering students and professionals to discover their real technical skill level with industry-grade diagnostic assessments by HADESCORE PVT LTD.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <a href="mailto:contact@hadescore.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                contact@hadescore.com
              </a>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +91 XX XXXX XXXX
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-semibold text-white text-sm mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} HADESCORE PVT LTD. All rights reserved. Made with ❤️ for tech learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
