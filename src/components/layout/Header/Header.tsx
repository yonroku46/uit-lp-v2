'use client';

import { useState, useEffect } from 'react';
import * as tracking from '@/lib/tracking';
import styles from './Header.module.scss';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '選ばれる理由', href: '#value' },
    { label: 'カウンセリング', href: '#philosophy' },
    { label: 'ご利用の流れ', href: '#process' },
    { label: 'カウンセラー紹介', href: '#counselor' },
    { label: 'よくある質問', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === '#contact') {
      tracking.trackContact();
    }
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ block: 'start' });
  };

  return (
    <header className={`${styles.header} ${(scrolled || menuOpen) ? styles['header--scrolled'] : ''}`}>
      <div className={styles.header__inner}>
        <a
          href="/"
          className={styles.header__logo}
          onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="UIT-Fukuokaトップへ戻る"
        >
          UIT-Fukuoka
        </a>

        <nav className={`${styles.header__nav} ${menuOpen ? styles['header__nav--open'] : ''}`} aria-label="メインナビゲーション">
          <ul className={styles.header__navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  className={styles.header__navLink}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles['header__cta-mobile']}
            onClick={() => handleNavClick('#contact')}
          >
            無料相談はこちら
          </button>
        </nav>

        <button
          className={styles['header__cta-desktop']}
          onClick={() => handleNavClick('#contact')}
        >
          無料相談はこちら
        </button>

        <button
          className={`${styles.header__burger} ${menuOpen ? styles['header__burger--open'] : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div
          className={styles.header__overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
