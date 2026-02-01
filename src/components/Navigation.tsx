import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { getCurrentUser, signOut } from '@/lib/supabase';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check auth status
    getCurrentUser().then(setUser).catch(() => setUser(null));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'City Guides', href: '/#city-guides' },
    { label: 'Tools & Perks', href: '/#tools-perks' },
  ];

  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-charcoal/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-xl md:text-2xl tracking-wider text-ivory hover:text-gold transition-colors duration-300"
          >
            BROTHERS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase text-ivory/80 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-ivory/60 hover:text-gold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm tracking-widest uppercase text-ivory/80 hover:text-gold transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/join"
                  className="bg-gold text-charcoal px-6 py-2 rounded text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
                >
                  Apply
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ivory p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-charcoal/98 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {isHomePage && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm tracking-widest uppercase text-ivory/80 hover:text-gold transition-colors duration-300 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-sm tracking-widest uppercase text-ivory/80 hover:text-gold transition-colors duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block text-sm tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors duration-300 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-sm tracking-widest uppercase text-ivory/80 hover:text-gold transition-colors duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/join"
                className="block w-full bg-gold text-charcoal px-6 py-3 rounded text-sm font-medium tracking-wider uppercase mt-4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
