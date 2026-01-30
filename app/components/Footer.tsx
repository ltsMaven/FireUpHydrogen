import {Instagram, Mail} from 'lucide-react';
import {FaTiktok} from 'react-icons/fa';
import fireUpLogo from '../assets/fireup-logo.png';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';

type Page = 'home' | 'about' | 'contact' | 'terms';

interface FooterProps {
  footer?: unknown;
  header?: unknown;
  publicStoreDomain?: string;
  onNavigate?: (page: Exclude<Page, 'terms'>, section?: string) => void;
}

export function Footer({onNavigate}: FooterProps) {
  const navigate = useNavigate();

  const handleNavClick = (page: Page, section?: string) => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const maybeLocale = parts[0];
    const hasLocale = !!maybeLocale && maybeLocale.length === 2;
    const prefix = hasLocale ? `/${maybeLocale}` : '';

    // Terms page is a real route
    if (page === 'terms') {
      navigate(`${prefix}/terms`);
      return;
    }

    // Decide destination route
    // If your HOME page contains sections like #product/#contact/#faq:
    const targetRoute =
      page === 'home'
        ? `${prefix}/`
        : page === 'about'
          ? `${prefix}/about`
          : page === 'contact'
            ? `${prefix}/#contact`
            : `${prefix}/`;

    // If "Product" / "FAQ" etc should always scroll on HOME:
    const shouldScrollOnHome = Boolean(section);
    const homeRoute = `${prefix}/`;

    if (shouldScrollOnHome) {
      // go home first, then scroll after route change
      navigate(homeRoute);

      // wait a tick for the new page to render
      setTimeout(() => {
        document.getElementById(section!)?.scrollIntoView({behavior: 'smooth'});
      }, 200);

      return;
    }

    // For About / Contact as pages:
    navigate(targetRoute);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer id="contact" className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={fireUpLogo}
                alt="Fire Up logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-lg border-0"
              />
              <div>
                <h3 className="text-white uppercase">Fire Up</h3>
                <p className="text-xs text-orange-400">Energy Drink</p>
              </div>
            </div>

            <p className="text-gray-400 mb-4 max-w-md">
              Ignite your potential with FireUp – the ultimate energy drink for
              champions who refuse to settle.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/drinkfireup?igsh=dGcxc3hmcmU4dHJr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors"
                aria-label="Fire Up on Instagram"
              >
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

              <a
                href="mailto:support@fireup.com"
                className="w-10 h-10 bg-white/5 hover:bg-orange-500/20 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-colors"
                aria-label="Email Fire Up"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('home', 'product')}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Product
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact', 'faq')}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  FAQ
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleNavClick('terms'); // ✅ relative to current locale segment
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Fire Up Energy Drink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
