import React from 'react';
import { ArrowDown, Clock, Sparkles } from 'lucide-react';
import { artistProfile, formatCurrency } from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { CurrencyCode, Language } from '../types';

interface HeroProps {
  currency: CurrencyCode;
  lang: Language;
  onOpenCalculator: () => void;
  onViewTiers: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  lang,
  onOpenCalculator,
  onViewTiers,
}) => {
  const t = getTranslation(lang);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18 lg:pt-20 lg:pb-24 border-b-2 dark:border-[#332c27] border-[#e8dfd5]">
      {/* Background patterns & atmospheric glow */}
      <div className="absolute inset-0 dark:bg-warm-dots-dark bg-warm-dots-light opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[400px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-3.5 sm:space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 shadow-xs max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">{t.commissionsOpenBadge}</span>
          </div>

          {/* Heading */}
          <div className="space-y-1 text-center w-full px-1">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider dark:text-amber-50 text-stone-900 font-display leading-[1.15] uppercase break-words text-balance">
              {t.commissionSheetTitle}
            </h1>
            <div className="text-xs sm:text-base font-bold text-amber-600 dark:text-amber-400 tracking-widest font-mono uppercase pt-0.5">
              {artistProfile.name}
            </div>
          </div>

          {/* Centered Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold pt-0.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#3d332a] border-[#d8ccbe] shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                {t.fastTurnaround} ({artistProfile.turnaroundAverage})
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#3d332a] border-[#d8ccbe] shadow-xs">
              <span>{t.usdIdrAccepted}</span>
            </div>
          </div>

          {/* Centered Action Buttons - Large Touch Target on Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenCalculator}
              className="w-full sm:w-auto min-h-[48px] py-3.5 sm:py-4 px-6 sm:px-9 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-101 active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-amber-500/20"
            >
              <Sparkles className="w-4 h-4 fill-stone-950 shrink-0" />
              <span>{t.calculatePriceAndOrder}</span>
            </button>
            <button
              type="button"
              onClick={onViewTiers}
              className="w-full sm:w-auto min-h-[48px] py-3.5 sm:py-4 px-6 sm:px-7 rounded-2xl dark:bg-[#25201c] bg-[#ede5db] hover:bg-[#e4dbcf] dark:hover:bg-[#302a25] dark:text-stone-200 text-stone-800 font-semibold text-xs sm:text-sm border dark:border-[#38312b] border-[#dfd4c7] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>{t.viewRatesAndStyles}</span>
              <ArrowDown className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            </button>
          </div>

          {/* Price teaser line */}
          <div className="text-[11px] sm:text-xs dark:text-stone-400 text-stone-600 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 font-sans text-center">
            <span>
              {t.mangaColoringStarts}{' '}
              <strong className="text-amber-700 dark:text-amber-300 font-mono font-bold">
                {formatCurrency(20, currency)}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t.characterArtFrom}{' '}
              <strong className="text-amber-700 dark:text-amber-300 font-mono font-bold">
                {formatCurrency(20, currency)}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
