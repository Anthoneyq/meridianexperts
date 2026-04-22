"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/approach", label: "Approach" },
  { href: "/process", label: "Process" },
  { href: "/credentials", label: "Credentials" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className="nav"
      style={{
        background: scrolled
          ? "rgba(17, 24, 33, 0.95)"
          : "rgba(37, 86, 110, 0.92)",
        borderBottomColor: scrolled
          ? "rgba(196, 173, 130, 0.15)"
          : "rgba(176, 211, 223, 0.08)",
      }}
    >
      <div className="nav__inner">
        <Link href="/" className="wordmark" aria-label="Meridian Experts — Home">
          <span className="wordmark__mark">
            <span className="wordmark__cross" />
          </span>
          <span className="wordmark__text">
            MERIDIAN
            <small>EXPERTS</small>
          </span>
        </Link>

        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="nav__cta">
              Case Review
            </Link>
          </li>
        </ul>

        <button
          className="nav__burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="nav__cta">
                Case Review
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
