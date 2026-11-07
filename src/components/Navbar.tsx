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
        <span className="font-mono text-[10px] sm:text-[11px] bg-amber-400/20 px-2 py-0.5 rounded-md">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6 relative">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 group hover:opacity-90 transition-opacity"
          aria-label="Home"
        >
          <div className="relative">
            <img
              src={artistProfile.logoImage}
              alt="Duck Logo"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight dark:text-amber-100 text-stone-900 font-display leading-tight">
              {artistProfile.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-normal leading-none">
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
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Switcher (EN / ID) */}
          <div className="flex items-center gap-0.5 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full p-1 text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('EN')}
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
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
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
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

          {/* Currency Switcher */}
          <div className="flex items-center gap-0.5 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full p-1 text-xs">
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

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 dark:text-stone-300 text-stone-700 hover:text-amber-600 dark:hover:text-amber-300 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-full transition-all cursor-pointer shrink-0"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Order Commission CTA */}
          <button
            type="button"
            onClick={onBookCommission}
            className="hidden sm:flex px-4 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-102 active:scale-98 whitespace-nowrap shrink-0 items-center gap-1.5 cursor-pointer ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
            <span>{t.orderCommission}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-1.5 sm:p-2 dark:text-stone-300 text-stone-700 dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] rounded-xl cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b dark:border-[#332c27] border-[#e8dfd5] dark:bg-[#1a1715] bg-[#faf7f2] px-4 pt-3 pb-5 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b dark:border-[#332c27] border-[#e8dfd5] text-xs font-semibold">
            <span className="text-stone-500 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Language
            </span>
            <div className="flex items-center gap-1 dark:bg-[#25201c] bg-[#ede5db] p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => onLanguageChange('EN')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  lang === 'EN'
                    ? 'bg-amber-400 text-stone-950'
                    : 'dark:text-stone-400 text-stone-600'
                }`}
              >
                🇺🇸 EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ID')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  lang === 'ID'
                    ? 'bg-amber-400 text-stone-950'
                    : 'dark:text-stone-400 text-stone-600'
                }`}
              >
                🇮🇩 ID
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold dark:text-stone-200 text-stone-800 hover:bg-amber-400/15 hover:text-amber-700 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookCommission();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold bg-amber-400 text-stone-950 rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                <span>{t.orderCommission}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
