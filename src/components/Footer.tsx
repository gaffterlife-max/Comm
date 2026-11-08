import { Layers, Lock, Mail, Monitor } from 'lucide-react';
import { artistProfile } from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { Language } from '../types';

interface FooterProps {
  lang?: Language;
  onOpenOperator?: () => void;
  isOperatorActive?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  lang = 'EN',
  onOpenOperator,
  isOperatorActive = false,
}) => {
  const t = getTranslation(lang);
  return (
    <footer className="dark:bg-[#161311] bg-stone-900 border-t dark:border-[#2e2722] border-stone-800 text-stone-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Col 1: Mascot & Profile */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative shrink-0">
                <img
                  src={artistProfile.logoImage}
                  alt="Duck Mascot"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-2xl p-1 bg-amber-400/15 border border-amber-400/30"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {artistProfile.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-semibold flex items-center gap-1">
                    <span>{t.openForCommissions}</span>
                    <span className="font-mono font-bold bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded">7/7</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-300/90 font-medium">
                  {artistProfile.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              {artistProfile.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-400 pt-0.5">
              <span className="text-amber-300/90 font-medium">
                {artistProfile.experience}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {lang === 'ID'
                  ? 'Menerima USD ($) & IDR (Rp)'
                  : 'USD ($) & IDR (Rp) Accepted'}
              </span>
            </div>
          </div>

          {/* Col 2: Production Setup */}
          <div className="md:col-span-4 space-y-2.5 sm:space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span>{t.productionSetup}</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/80">
                <Monitor className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{artistProfile.hardware.join(' & ')} Graphic Tablet</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 border border-stone-700/80">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{artistProfile.software.join(' & ')} PRO ver 4.0</span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact & Links */}
          <div className="md:col-span-3 space-y-2.5 sm:space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {t.contactAndInquiries}
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${artistProfile.socials.email}`}
                className="flex items-center gap-2.5 text-white hover:text-amber-400 transition-colors p-2.5 sm:p-3 rounded-xl bg-stone-800/80 border border-stone-700 font-medium"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{artistProfile.socials.email}</span>
              </a>
              <div className="flex flex-wrap gap-2 pt-1 text-stone-300">
                <a
                  href={artistProfile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-amber-400 hover:text-stone-950 transition-all border border-stone-700 text-xs font-medium flex items-center justify-center active:scale-95"
                >
                  Twitter / X
                </a>
                <a
                  href={artistProfile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-amber-400 hover:text-stone-950 transition-all border border-stone-700 text-xs font-medium flex items-center justify-center active:scale-95"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 sm:mt-14 pt-4 sm:pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-normal">
          <div className="text-center sm:text-left flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} {artistProfile.name} ({artistProfile.handle}) · All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 text-stone-400 font-medium">
            <a href="#tiers" className="hover:text-amber-400 transition-colors">
              {t.rates}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#calculator"
              className="hover:text-amber-400 transition-colors"
            >
              {t.calculator}
            </a>
            <span aria-hidden="true">·</span>
            <a href="#terms" className="hover:text-amber-400 transition-colors">
              {t.terms}
            </a>
            {isOperatorActive && onOpenOperator && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onOpenOperator}
                  className="text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                  title="Operator Mode Access"
                >
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>Operator</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
