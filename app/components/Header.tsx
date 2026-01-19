// app/components/Header.tsx
import {ShoppingCart, Menu, X} from 'lucide-react';
import {Button} from '~/ui/button';
import {Badge} from '~/ui/badge';
import {useState, useEffect, Suspense} from 'react';
import fireUpLogo from '../assets/fireup-logo.png';
import {Await} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
interface HeaderProps {
  header?: unknown;
  cart?: Promise<CartApiQueryFragment | null>;
  isLoggedIn?: unknown;
  publicStoreDomain?: string;
}

export function Header({header, cart}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] =
    useState<'home' | 'about' | 'contact'>('home');

  // ✅ Hydrogen Aside hook (template style)
const {open} = useAside();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;

    if (path.includes('/about')) setCurrentPage('about');
    else if (path.includes('/contact')) setCurrentPage('contact');
    else setCurrentPage('home');
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  const linkClasses = (active: boolean) =>
    `text-[12px] md:text-[13px] font-semibold tracking-[0.16em] uppercase ${
      active ? '!text-orange-400' : '!text-white'
    } hover:!text-orange-400 transition-colors`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] isolate bg-black/85 backdrop-blur-md pointer-events-auto">
      <div className="container mx-auto px-4 h-14">
        <div className="h-full flex items-center justify-between">
          {/* Brand */}
          <a
            href="/"
            onClick={closeMobile}
            className="h-full flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={fireUpLogo}
              alt="Fire Up logo"
              className="w-8 h-8 rounded-lg object-cover shadow-lg shrink-0"
            />
            <div className="flex flex-col justify-center leading-none whitespace-nowrap translate-y-[1px]">
              <h1 className="text-white text-[15px] font-semibold tracking-[0.18em] uppercase leading-[1]">
                FIRE UP
              </h1>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
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
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              
              onClick={() => {
                console.log('CART CLICKED'); // ✅ debug
                open('cart');
              }}
              className="relative h-8 w-8 p-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />

              {/* Cart count from Hydrogen cart promise */}
              {cart ? (
                <Suspense fallback={null}>
                  <Await resolve={cart}>
                    {(c) =>
                      c?.totalQuantity ? (
                        <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black hover:bg-yellow-400 text-[10px] px-1.5 py-0.5">
                          {c.totalQuantity}
                        </Badge>
                      ) : null
                    }
                  </Await>
                </Suspense>
              ) : null}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white h-9 w-9"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-3 pt-2 flex flex-col items-center gap-2">
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