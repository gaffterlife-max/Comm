import React, { useState } from 'react';
import { Globe, Menu, Moon, Sparkles, Sun, X } from 'lucide-react';
import { artistProfile } from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { CurrencyCode, Language } from '../types';

interface NavbarProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onBookCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  lang,
  onLanguageChange,
  isDark,
  onToggleTheme,
  onBookCommission,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(lang);

  const navLinks = [
    { label: t.stylesAndRates, href: '#tiers' },
    { label: t.workflowAndTerms, href: '#terms' },
    { label: t.priceCalculator, href: '#calculator' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md dark:bg-[#1a1715]/95 bg-[#faf7f2]/95 border-b dark:border-[#332c27] border-[#e2d7c9] transition-colors">
      {/* Top Open Status Ticker */}
      <div className="dark:bg-[#26211d] bg-[#f2eae0] border-b dark:border-[#38312b] border-[#e2d7c9] px-2 sm:px-4 py-1 text-center text-[11px] sm:text-xs dark:text-amber-200 text-stone-800 font-medium flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{t.commissionsOpen}</span>
        <span
          aria-hidden="true"
          className="text-amber-700/40 dark:text-amber-300/30"
        >
          ·
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] bg-amber-400 text-stone-950 px-2 py-0.5 rounded-md font-bold shadow-xs">
          🎯 Slot 7/7
        </span>
        <span
          aria-hidden="true"
          className="text-amber-700/40 dark:text-amber-300/30 hidden xs:inline"
        >
          ·
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] bg-amber-400/20 px-2 py-0.5 rounded-md hidden xs:inline">
          USD ($) & IDR (Rp)
        </span>
        <span
          aria-hidden="true"
          className="text-amber-700/40 dark:text-amber-300/30 hidden xs:inline"
        >
          ·
        </span>
        <a
          href="#calculator"
          className="hidden xs:inline underline decoration-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          {t.calculateYourRate}
        </a>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6 relative">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 group hover:opacity-90 transition-opacity min-w-0"
          aria-label="Home"
        >
          <div className="relative shrink-0">
            <img
              src={artistProfile.logoImage}
              alt="Duck Logo"
              className="h-8.5 w-8.5 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105 duration-200 rounded-xl"
            />
          </div>
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-sm sm:text-base font-bold tracking-tight dark:text-amber-100 text-stone-900 font-display leading-tight truncate">
              {artistProfile.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-normal leading-none truncate max-w-[110px] xs:max-w-none">
              {artistProfile.title}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Shifted Left to avoid controls) */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 text-xs font-semibold dark:text-stone-300 text-stone-700 absolute left-[35%] xl:left-[42%] -translate-x-1/2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher (EN / ID) - Always visible and tap-friendly */}
          <div className="flex items-center gap-0.5 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full p-0.5 sm:p-1 text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('EN')}
              className={`px-2 sm:px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 min-h-[36px] sm:min-h-0 ${
                lang === 'EN'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'dark:text-stone-400 text-stone-600 hover:text-stone-900 dark:hover:text-white'
              }`}
              title="English"
            >
              <span>🇺🇸</span>
              <span>EN</span>
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ID')}
              className={`px-2 sm:px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 min-h-[36px] sm:min-h-0 ${
                lang === 'ID'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'dark:text-stone-400 text-stone-600 hover:text-stone-900 dark:hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
          </div>

          {/* Currency Switcher (Visible on sm+ screens to preserve mobile header space) */}
          <div className="hidden sm:flex items-center gap-0.5 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full p-1 text-xs">
            {(['USD', 'IDR'] as CurrencyCode[]).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => onCurrencyChange(cur)}
                className={`px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currency === cur
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'dark:text-stone-400 text-stone-600 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cur === 'USD' ? '$ USD' : 'Rp IDR'}
              </button>
            ))}
          </div>

          {/* Theme Toggle - Touch Target >= 40px */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 sm:w-9 sm:h-9 flex items-center justify-center dark:text-stone-300 text-stone-700 hover:text-amber-600 dark:hover:text-amber-300 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full transition-all cursor-pointer shrink-0 active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Order Commission CTA - Desktop / Tablet */}
          <button
            type="button"
            onClick={onBookCommission}
            className="hidden md:flex px-4 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-102 active:scale-98 whitespace-nowrap shrink-0 items-center gap-1.5 cursor-pointer ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            <span>{t.orderCommission}</span>
          </button>

          {/* Mobile Menu Toggle - Touch Target 44px */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center dark:text-stone-300 text-stone-700 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-xl cursor-pointer active:scale-95 shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b dark:border-[#332c27] border-[#e8dfd5] dark:bg-[#1f1b18]/98 bg-[#faf7f2]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-2xl">
          {/* Quick Currency Selector in Mobile Drawer */}
          <div className="flex items-center justify-between p-3 rounded-2xl dark:bg-[#28221e] bg-[#f0e7db] border dark:border-[#3a312a] border-[#e2d5c5]">
            <span className="text-xs font-bold dark:text-stone-300 text-stone-700 font-display">
              {lang === 'ID' ? 'Mata Uang (Currency)' : 'Currency'}
            </span>
            <div className="flex items-center gap-1 dark:bg-[#1d1916] bg-[#e5dbc9] p-1 rounded-xl">
              {(['USD', 'IDR'] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => onCurrencyChange(cur)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all min-h-[36px] ${
                    currency === cur
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'dark:text-stone-400 text-stone-600 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {cur === 'USD' ? '$ USD' : 'Rp IDR'}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links with large touch targets */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-bold dark:text-stone-100 text-stone-800 hover:bg-amber-400/20 active:bg-amber-400/30 hover:text-amber-600 dark:hover:text-amber-300 rounded-2xl transition-all flex items-center justify-between min-h-[46px]"
              >
                <span>{item.label}</span>
                <span className="text-xs text-amber-500 font-mono">→</span>
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookCommission();
                }}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 fill-stone-950" />
                <span>{t.orderCommission}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
