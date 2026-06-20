'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useT, LocaleSwitcher } from './i18n';
import { ThemeToggle } from './ThemeToggle';

const ITEMS = [
  { href: '/', label: 'Start' },
  { href: '/abfahrten', label: 'Abfahrten' },
  { href: '/muell', label: 'Müll' },
  { href: '/schulen', label: 'Schulen' },
  { href: '/sitzungen', label: 'Sitzungen' },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  // Council-session detail pages live under /meetings/* but belong to "Sitzungen".
  if (href === '/sitzungen' && pathname.startsWith('/meetings')) return true;
  return false;
}

export function SiteNav() {
  const pathname = usePathname();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape closes (returning focus to the toggle); a pointer
  // outside the menu closes it.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !btnRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  // Desktop: keep the nav inline next to the brand + utilities while it fits;
  // when it no longer does (e.g. a long language like Ukrainian) drop it onto
  // its own full-width row below. Measured so it's language-agnostic, not a
  // guessed breakpoint. Mobile (<=768px) is handled by the hamburger in CSS.
  useEffect(() => {
    const nav = navRef.current;
    const container = nav?.closest<HTMLElement>('.container') ?? null;
    const header = nav?.closest<HTMLElement>('.site-header') ?? null;
    if (!nav || !container || !header) return;

    let naturalNav = 0;
    function measure() {
      if (!nav || !container || !header) return;
      if (window.innerWidth <= 768) {
        header.classList.remove('is-tworow');
        return;
      }
      // Natural nav width is only meaningful while it's laid out inline.
      if (!header.classList.contains('is-tworow')) naturalNav = nav.scrollWidth;
      const brand = container.querySelector<HTMLElement>('.brand');
      const utils = container.querySelector<HTMLElement>('.nav-utils');
      const needed = (brand?.offsetWidth ?? 0) + naturalNav + (utils?.offsetWidth ?? 0) + 48;
      header.classList.toggle('is-tworow', needed > container.clientWidth);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Mobile-only toggle; on wider screens the menu flows inline and this is hidden. */}
      <button
        ref={btnRef}
        type="button"
        className="nav-burger kern-btn kern-btn--tertiary"
        aria-label={open ? t('Menü schließen') : t('Menü öffnen')}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-burger__box" aria-hidden="true">
          <span className="nav-burger__bar" />
          <span className="nav-burger__bar" />
          <span className="nav-burger__bar" />
        </span>
      </button>

      <div id="site-menu" ref={menuRef} className={`site-menu${open ? ' is-open' : ''}`}>
        <nav ref={navRef} className="site-nav" aria-label={t('Hauptnavigation')}>
          {ITEMS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`kern-btn kern-btn--${active ? 'secondary' : 'tertiary'}`}
                onClick={() => setOpen(false)}
              >
                <span className="kern-label">{t(label)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nav-utils">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
