import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
];

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Affiliates', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const Footer = () => {
  return (
    <footer className="relative py-12 md:py-16 bg-charcoal-light border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Center - Copyright */}
          <div className="text-ivory/50 text-sm tracking-widest uppercase">
            © BROTHERS
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-ivory/60 text-sm tracking-wider uppercase hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
