
import { Instagram, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import fireUpLogo from '../assets/fireup-logo.png';

interface FooterProps {
  // these are what PageLayout passes – keep them but we don't have to use them
  footer?: unknown;
  header?: unknown;
  publicStoreDomain?: string;

  // your navigation callback (optional so PageLayout doesn't *have* to supply it)
  onNavigate?: (page: 'home' | 'about' | 'contact', section?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (
    page: 'home' | 'about' | 'contact',
    section?: string,
  ) => {
    // only call it if someone passed it in
    onNavigate?.(page, section);

    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={fireUpLogo}
                alt="Fire Up logo"
                className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-xl
                  object-cover
                  shadow-lg
                  border border-white/20
                "
              />
              <div>
                <h3 className="text-white uppercase">Fire Up</h3>
                <p className="text-xs text-orange-400">Energy Drink</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Ignite your potential with FireUp – the ultimate energy drink for champions who refuse to settle.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/drinkfireup?igsh=dGcxc3hmcmU4dHJr" target="_blank" className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@drinkfireup"
                target="_blank"
                rel="noreferrer"
                aria-label="Fire Up on TikTok"
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavClick('home')} className="text-gray-400 hover:text-orange-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('home', 'product')} className="text-gray-400 hover:text-orange-400 transition-colors">Product</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="text-gray-400 hover:text-orange-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="text-gray-400 hover:text-orange-400 transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('contact', 'faq')} className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Fire Up Energy Drink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
