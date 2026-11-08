import React from 'react';
import { ArrowRight } from 'lucide-react';
import { artistProfile, formatCurrency } from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { CurrencyCode, Language } from '../types';

interface MobileBottomBarProps {
  currency: CurrencyCode;
  lang?: Language;
  onOpenCalculator: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currency,
  lang = 'EN',
  onOpenCalculator,
}) => {
  const t = getTranslation(lang);
  return (
    <div className="lg:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 z-40 max-w-md mx-auto">
      <div className="dark:bg-[#201c19]/95 bg-white/95 backdrop-blur-lg border dark:border-[#382f2a] border-amber-300 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2.5 shadow-xl">
        <div className="flex items-center gap-2">
          <img
            src={artistProfile.logoImage}
            alt="Duck"
            className="w-9 h-9 object-contain rounded-xl p-0.5 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 shrink-0"
          />
          <div className="text-left leading-tight">
            <div className="text-[11px] font-bold dark:text-[#fdf9f3] text-stone-900 flex items-center gap-1 font-mono">
              <span>
                {t.from} {formatCurrency(20, currency)}
              </span>
            </div>
            <div className="text-[9px] text-stone-500 dark:text-stone-400 font-medium truncate max-w-[120px]">
              {lang === 'ID' ? 'Mewarnai & Ilustrasi' : 'Manga & Character Art'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCalculator}
          className="min-h-[44px] py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <span>{t.getQuote}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
};
