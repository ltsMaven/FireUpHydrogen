// app/components/Header.tsx

import {ShoppingCart, Menu, X} from 'lucide-react';
import {Button} from '~/ui/button';
import {Badge} from '~/ui/badge';
import {useState, useEffect} from 'react';
import fireUpLogo from '../assets/fireup-logo.png';
import {Aside} from '~/components/Aside';

interface HeaderProps {
  header?: unknown;
  cart?: unknown;
  isLoggedIn?: unknown;
  publicStoreDomain?: string;
}

export function Header({header, cart, isLoggedIn, publicStoreDomain}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] =
    useState<'home' | 'about' | 'contact'>('home');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;

    if (path.includes('/about')) setCurrentPage('about');
    else if (path.includes('/contact')) setCurrentPage('contact');
    else setCurrentPage('home');
  }, []);

  let openCart: (() => void) | undefined;
  try {
    // @ts-ignore
    const {open} = Aside.useAside?.() ?? {};
    openCart = () => open?.('cart');
  } catch {
    openCart = () => console.log('Cart clicked');
  }

  const cartCount = 0;

  const closeMobile = () => setMobileMenuOpen(false);

  const linkClasses = (active: boolean) =>
    `text-sm md:text-base font-semibold tracking-[0.18em] uppercase ${
      active ? '!text-orange-400' : '!text-white'
    } hover:!text-orange-400 transition-colors`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo -> home */}
          <a
            href="/"
            onClick={closeMobile}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <img
                src={fireUpLogo}
                alt="Fire Up logo"
                className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 bg-yellow-400 rounded-full animate-pulse" />
            </div>
            <div className="leading-tight">
              <h1 className="text-white text-lg md:text-xl font-semibold tracking-[0.2em] uppercase">
                FIRE UP
              </h1>
              <p className="text-[11px] text-orange-400 mt-0.5">
                Energy Drink
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" onClick={closeMobile} className={linkClasses(currentPage === 'home')}>
              Home
            </a>
            <a href="/#product" onClick={closeMobile} className={linkClasses(false)}>
              Product
            </a>
            <a href="/about" onClick={closeMobile} className={linkClasses(currentPage === 'about')}>
              About Us
            </a>
            <a href="/contact" onClick={closeMobile} className={linkClasses(currentPage === 'contact')}>
              Contact
            </a>
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openCart}
              className="relative h-9 px-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black hover:bg-yellow-400">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-2 pt-3 flex flex-col items-center gap-2 pb-3">
            <a href="/" onClick={closeMobile} className={linkClasses(currentPage === 'home')}>
              Home
            </a>
            <a href="/#product" onClick={closeMobile} className={linkClasses(false)}>
              Product
            </a>
            <a href="/about" onClick={closeMobile} className={linkClasses(currentPage === 'about')}>
              About Us
            </a>
            <a href="/contact" onClick={closeMobile} className={linkClasses(currentPage === 'contact')}>
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}