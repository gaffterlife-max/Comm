import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  commissionTiers,
  formatCurrency,
  illustrationScopes,
  mangaPanelCategories,
} from '../data/commissionData';
import { CurrencyCode } from '../types';

interface TiersSectionProps {
  currency: CurrencyCode;
  onSelectTier: (tierId: string) => void;
}

interface SampleImage {
  title: string;
  image: string;
}

const mangaSamples: Record<string, SampleImage[]> = {
  'full-panel': [
    {
      title: 'The Blazing Duel · Climax Action Panel',
      image: '/assets/images/manga_colored_page_epic_1793799150669.jpg',
    },
    {
      title: 'Awakening Impact · Dynamic Manga Panel',
      image: '/assets/images/10000954181.png',
    },
  ],
  'character-focused-panel': [
    {
      title: 'Warrior Focus · Climax Battle Portrait',
      image: '/assets/images/regenerated_image_1793811718575.png',
    },
    {
      title: 'Dual Blades Stance · Inked Foundation & Shading',
      image: '/assets/images/manga_lineart_raw_1793799152507.jpg',
    },
  ],
  'double-spread': [
    {
      title: 'Skyline Echoes · Cinematic Double Spread',
      image: '/assets/images/manga_cover_spread_1793799153733.jpg',
    },
  ],
};

const illustrationSamples: Record<string, SampleImage[]> = {
  bust: [
    {
      title: 'Astral Seraph · Expressive Headshot Icon',
      image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    },
    {
      title: 'Gaffter Mascot Avatar · Profile Icon',
      image: '/assets/aistudio/wmm_newss_ccb81ada.png',
    },
  ],
  'half-body': [
    {
      title: 'Celestial Guardian · Half-Body Dynamic Stance',
      image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    },
  ],
  'full-body': [
    {
      title: 'Seraphim of the Astral Dawn · Full-Body Showcase',
      image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    },
  ],
};

export const TiersSection: React.FC<TiersSectionProps> = ({
  currency,
  onSelectTier,
}) => {
  const [selectedMangaCatId, setSelectedMangaCatId] = useState('full-panel');
  const [selectedIllustrationScopeId, setSelectedIllustrationScopeId] =
    useState('bust');

  const [mangaSlideIndex, setMangaSlideIndex] = useState(0);
  const [illustrationSlideIndex, setIllustrationSlideIndex] = useState(0);

  // Zoom lightbox state
  const [zoomImage, setZoomImage] = useState<SampleImage | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Reset slide index when category changes
  useEffect(() => {
    setMangaSlideIndex(0);
  }, [selectedMangaCatId]);

  useEffect(() => {
    setIllustrationSlideIndex(0);
  }, [selectedIllustrationScopeId]);

  const selectedMangaCat =
    mangaPanelCategories.find((c) => c.id === selectedMangaCatId) ||
    mangaPanelCategories[0];
  const selectedIllustrationScope =
    illustrationScopes.find((s) => s.id === selectedIllustrationScopeId) ||
    illustrationScopes[0];

  const mangaTier =
    commissionTiers.find((t) => t.id === 'manga-coloring') ||
    commissionTiers[0];
  const illustrationTier =
    commissionTiers.find((t) => t.id === 'illustration') ||
    commissionTiers[1];

  const currentMangaImages = mangaSamples[selectedMangaCatId] || [];
  const currentIllustrationImages =
    illustrationSamples[selectedIllustrationScopeId] || [];

  return (
    <section
      id="tiers"
      className="py-12 sm:py-18 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 dark:border-[#332c27] border-[#e8dfd5]"
    >
      <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Commission Packages</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight dark:text-amber-50 text-stone-900 font-display">
          Select Your Commission Type
        </h2>
        <p className="dark:text-stone-300 text-stone-600 text-xs sm:text-sm sm:text-base leading-relaxed font-normal">
          Choose between <strong>Manga Coloring</strong> or{' '}
          <strong>Illustration</strong>. Select your category below to view
          rates and slide through artwork samples.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: Manga Coloring */}
        <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border-2 dark:border-amber-400/60 border-amber-400 dark:bg-[#25201c] bg-white p-4 sm:p-7 relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-200">
          <div className="absolute top-0 right-0 bg-amber-400 text-stone-950 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-3 sm:py-1.5 sm:px-4 rounded-bl-2xl shadow-xs">
            {mangaTier.badge || 'Popular'}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">{mangaTier.emoji}</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold dark:text-amber-50 text-stone-900 font-display">
                  {mangaTier.name}
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-amber-700 dark:text-amber-300">
                  3 Category Options Available
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm dark:text-stone-300 text-stone-600 mt-1 leading-relaxed">
              {mangaTier.tagline}
            </p>

            {/* Manga Category Buttons */}
            <div className="mt-4 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
              <label className="block text-[11px] sm:text-xs font-bold dark:text-amber-200 text-stone-800 uppercase tracking-wider mb-2 font-display">
                Choose Manga Category:
              </label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#e8dfd5]">
                {mangaPanelCategories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMangaCatId(item.id)}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      selectedMangaCatId === item.id
                        ? 'bg-amber-400 text-stone-950 shadow-xs'
                        : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
                    }`}
                  >
                    <span className="text-center leading-tight">
                      {item.emoji} {item.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono opacity-90">
                      {formatCurrency(item.priceUSD, currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Slideable Picture Section for Manga Coloring */}
            {currentMangaImages.length > 0 && (
              <div className="relative mt-3.5 rounded-xl sm:rounded-2xl overflow-hidden border dark:border-[#38312b] border-[#e8dfd5] bg-stone-950 h-44 sm:h-48 w-full group/slider shadow-inner flex items-center justify-center">
                <img
                  src={currentMangaImages[mangaSlideIndex]?.image}
                  alt={currentMangaImages[mangaSlideIndex]?.title}
                  className="w-full h-full object-cover select-none transition-transform duration-300 group-hover/slider:scale-102 cursor-zoom-in"
                  onClick={() => {
                    setZoomImage(currentMangaImages[mangaSlideIndex]);
                    setZoomScale(1);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Sub-Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold tracking-wide shadow-xs">
                    {selectedMangaCat.name}
                  </span>
                </div>

                {/* Zoom Trigger Button */}
                <button
                  type="button"
                  onClick={() => {
                    setZoomImage(currentMangaImages[mangaSlideIndex]);
                    setZoomScale(1);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors backdrop-blur-md shadow-xs cursor-pointer"
                  title="Zoom sample picture"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-2 left-2.5 right-14 text-white text-[11px] font-semibold truncate pointer-events-none drop-shadow">
                  {currentMangaImages[mangaSlideIndex]?.title}
                </div>

                {/* Prev / Next Controls if multiple pictures */}
                {currentMangaImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMangaSlideIndex((prev) =>
                          prev === 0 ? currentMangaImages.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors cursor-pointer shadow-md active:scale-95"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMangaSlideIndex((prev) =>
                          prev === currentMangaImages.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors cursor-pointer shadow-md active:scale-95"
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 right-2.5 flex items-center gap-1">
                      {currentMangaImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMangaSlideIndex(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === mangaSlideIndex
                              ? 'w-3.5 bg-amber-400'
                              : 'w-1.5 bg-white/50 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Detail Preview Box */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-2xl dark:bg-[#1f1b18] bg-[#fcf9f5] border dark:border-[#38312b] border-[#e8dfd5] space-y-2.5">
              <div className="flex items-baseline justify-between border-b dark:border-[#332c27] border-[#ede5db] pb-2">
                <div>
                  <span className="text-xs font-bold dark:text-amber-100 text-stone-900 font-display block">
                    {selectedMangaCat.emoji} {selectedMangaCat.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Selected Category
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-amber-700 dark:text-amber-300">
                    {formatCurrency(selectedMangaCat.priceUSD, currency)}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono block">
                    / panel
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium pt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Turnaround:{' '}
                  <strong className="text-stone-800 dark:text-stone-200">
                    {selectedMangaCat.turnaroundDays}
                  </strong>
                </span>
              </div>

              <div className="pt-2 border-t dark:border-[#332c27] border-[#ede5db]">
                <div className="text-[10px] font-bold dark:text-amber-300 text-stone-900 uppercase tracking-wider mb-1 font-display">
                  Category Deliverables:
                </div>
                <ul className="space-y-1 text-xs dark:text-stone-300 text-stone-700">
                  {selectedMangaCat.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="mt-5 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
            <button
              type="button"
              onClick={() => {
                onSelectTier('manga-coloring');
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-98"
            >
              <span>Calculate & Order Manga Coloring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Illustration */}
        <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border-2 dark:border-[#38312b] border-[#e2d7c9] dark:bg-[#231f1c] bg-white p-4 sm:p-7 relative overflow-hidden group hover:shadow-xl transition-all duration-200">
          <div className="absolute top-0 right-0 bg-stone-200 dark:bg-[#332b24] text-stone-800 dark:text-stone-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-3 sm:py-1.5 sm:px-4 rounded-bl-2xl shadow-xs border-l border-b border-[#e2d7c9] dark:border-[#38312b]">
            {illustrationTier.badge || 'Custom Art'}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">
                {illustrationTier.emoji}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold dark:text-amber-50 text-stone-900 font-display">
                  {illustrationTier.name}
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-amber-700 dark:text-amber-300">
                  3 Scope Options Available
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm dark:text-stone-300 text-stone-600 mt-1 leading-relaxed">
              {illustrationTier.tagline}
            </p>

            {/* Illustration Scope Buttons */}
            <div className="mt-4 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
              <label className="block text-[11px] sm:text-xs font-bold dark:text-amber-200 text-stone-800 uppercase tracking-wider mb-2 font-display">
                Choose Illustration Scope:
              </label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#e8dfd5]">
                {illustrationScopes.map((scope) => (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setSelectedIllustrationScopeId(scope.id)}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      selectedIllustrationScopeId === scope.id
                        ? 'bg-amber-400 text-stone-950 shadow-xs'
                        : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
                    }`}
                  >
                    <span className="text-center leading-tight">
                      {scope.emoji} {scope.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono opacity-90">
                      {formatCurrency(scope.priceUSD, currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Slideable Picture Section for Illustration */}
            {currentIllustrationImages.length > 0 && (
              <div className="relative mt-3.5 rounded-xl sm:rounded-2xl overflow-hidden border dark:border-[#38312b] border-[#e8dfd5] bg-stone-950 h-44 sm:h-48 w-full group/slider shadow-inner flex items-center justify-center">
                <img
                  src={
                    currentIllustrationImages[illustrationSlideIndex]?.image
                  }
                  alt={
                    currentIllustrationImages[illustrationSlideIndex]?.title
                  }
                  className="w-full h-full object-cover select-none transition-transform duration-300 group-hover/slider:scale-102 cursor-zoom-in"
                  onClick={() => {
                    setZoomImage(
                      currentIllustrationImages[illustrationSlideIndex]
                    );
                    setZoomScale(1);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Sub-Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold tracking-wide shadow-xs">
                    {selectedIllustrationScope.name}
                  </span>
                </div>

                {/* Zoom Trigger Button */}
                <button
                  type="button"
                  onClick={() => {
                    setZoomImage(
                      currentIllustrationImages[illustrationSlideIndex]
                    );
                    setZoomScale(1);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors backdrop-blur-md shadow-xs cursor-pointer"
                  title="Zoom sample picture"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-2 left-2.5 right-14 text-white text-[11px] font-semibold truncate pointer-events-none drop-shadow">
                  {currentIllustrationImages[illustrationSlideIndex]?.title}
                </div>

                {/* Prev / Next Controls if multiple pictures */}
                {currentIllustrationImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIllustrationSlideIndex((prev) =>
                          prev === 0
                            ? currentIllustrationImages.length - 1
                            : prev - 1
                        );
                      }}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors cursor-pointer shadow-md active:scale-95"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIllustrationSlideIndex((prev) =>
                          prev === currentIllustrationImages.length - 1
                            ? 0
                            : prev + 1
                        );
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-stone-950 text-white transition-colors cursor-pointer shadow-md active:scale-95"
                      aria-label="Next image"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 right-2.5 flex items-center gap-1">
                      {currentIllustrationImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setIllustrationSlideIndex(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === illustrationSlideIndex
                              ? 'w-3.5 bg-amber-400'
                              : 'w-1.5 bg-white/50 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Detail Preview Box */}
            <div className="mt-4 p-3.5 sm:p-4 rounded-2xl dark:bg-[#1f1b18] bg-[#fcf9f5] border dark:border-[#38312b] border-[#e8dfd5] space-y-2.5">
              <div className="flex items-baseline justify-between border-b dark:border-[#332c27] border-[#ede5db] pb-2">
                <div>
                  <span className="text-xs font-bold dark:text-amber-100 text-stone-900 font-display block">
                    {selectedIllustrationScope.emoji}{' '}
                    {selectedIllustrationScope.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Selected Scope
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-extrabold font-mono text-amber-700 dark:text-amber-300">
                    {formatCurrency(
                      selectedIllustrationScope.priceUSD,
                      currency
                    )}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono block">
                    base price
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium pt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Turnaround:{' '}
                  <strong className="text-stone-800 dark:text-stone-200">
                    {selectedIllustrationScope.turnaroundDays}
                  </strong>
                </span>
              </div>

              <div className="pt-2 border-t dark:border-[#332c27] border-[#ede5db]">
                <div className="text-[10px] font-bold dark:text-amber-300 text-stone-900 uppercase tracking-wider mb-1 font-display">
                  Scope Deliverables:
                </div>
                <ul className="space-y-1 text-xs dark:text-stone-300 text-stone-700">
                  {selectedIllustrationScope.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="mt-5 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
            <button
              type="button"
              onClick={() => {
                onSelectTier('illustration');
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-5 rounded-2xl dark:bg-[#2e2722] bg-[#f0e7dc] hover:bg-[#e6dccf] dark:hover:bg-[#38302a] dark:text-amber-200 text-stone-900 font-bold text-xs sm:text-sm border dark:border-[#423932] border-[#ded3c3] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>Calculate & Order Illustration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal for Tiers Sample Pictures */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-3 sm:p-6 animate-fadeIn select-none"
        >
          <div className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-stone-900/80 border border-stone-800 text-white backdrop-blur-md shadow-2xl">
            <span className="text-xs sm:text-sm font-bold truncate">
              {zoomImage.title}
            </span>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(s - 0.5, 1))}
                disabled={zoomScale <= 1}
                className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs w-12 text-center text-amber-300 font-bold">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(s + 0.5, 3))}
                disabled={zoomScale >= 3}
                className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomScale(1)}
                className="px-2.5 py-1 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-stone-300 transition-colors cursor-pointer"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-500 text-white transition-colors cursor-pointer ml-1"
                aria-label="Close Zoom"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2 sm:my-4">
            <img
              src={zoomImage.image}
              alt={zoomImage.title}
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.15s ease-out',
              }}
              className="max-h-[80vh] max-w-[95vw] object-contain select-none shadow-2xl rounded-lg"
            />
          </div>

          <div className="text-center text-xs text-stone-500 pb-2">
            Click Reset or Close (Esc) to return
          </div>
        </div>
      )}
    </section>
  );
};
