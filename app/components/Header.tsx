// app/components/Header.tsx
import {ShoppingCart, Menu, X} from 'lucide-react';
import {Button} from '~/ui/button';
import {Badge} from '~/ui/badge';
import {useState, Suspense} from 'react';
import fireUpLogo from '../assets/fireup-logo.png';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Await, NavLink, useLocation} from 'react-router';

interface HeaderProps {
  header?: unknown;
  cart?: Promise<CartApiQueryFragment | null>;
  isLoggedIn?: unknown;
  publicStoreDomain?: string;
}

export function Header({cart}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {open} = useAside();
  const location = useLocation();

  const closeMobile = () => setMobileMenuOpen(false);

  const baseLink =
    'text-[12px] md:text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors hover:!text-orange-400';
  const activeLink = '!text-orange-400';
  const idleLink = '!text-white';

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] isolate bg-black/85 backdrop-blur-md pointer-events-auto">
      <div className="container mx-auto px-4 h-14">
        <div className="h-full flex items-center justify-between">
          {/* Brand */}
          <NavLink
            to="/"
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
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <NavLink
              to="/"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
              end
            >
              Home
            </NavLink>

            {/* If you want Product to scroll on home page */}
            <a
              href="/#product"
              onClick={closeMobile}
              className={`${baseLink} ${location.pathname === '/' ? idleLink : idleLink}`}
            >
              Product
            </a>

            <NavLink
              to="/about"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              onClick={() => open('cart')}
              className="relative h-8 w-8 p-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />

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
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-3 pt-2 flex flex-col items-center gap-2">
            <NavLink
              to="/"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
              end
            >
              Home
            </NavLink>
            <a href="/#product" onClick={closeMobile} className={`${baseLink} ${idleLink}`}>
              Product
            </a>
            <NavLink
              to="/about"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMobile}
              className={({isActive}) =>
                `${baseLink} ${isActive ? activeLink : idleLink}`
              }
            >
              Contact
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}