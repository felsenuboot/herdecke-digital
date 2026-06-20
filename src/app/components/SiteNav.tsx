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
        <nav className="site-nav" aria-label={t('Hauptnavigation')}>
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
