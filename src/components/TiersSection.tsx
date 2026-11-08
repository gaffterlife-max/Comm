import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
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
import { getTranslation } from '../data/translations';
import { CurrencyCode, Language } from '../types';

interface TiersSectionProps {
  currency: CurrencyCode;
  lang: Language;
  onSelectTier: (tierId: string) => void;
}

interface SampleImage {
  title: string;
  image: string;
  aspectRatio?: number; // width / height
}

const mangaSamples: Record<string, SampleImage[]> = {
  'full-panel': [
    {
      title: 'World Hater Majik',
      image: '/assets/images/whm ichi the magic full panel.jpg',
      aspectRatio: 1200 / 1800, // 0.667 (2:3)
    },
    {
      title: 'Hild',
      image: '/assets/images/vinland saga full panel.jpg',
      aspectRatio: 2355 / 3366, // 0.700
    },
    {
      title: 'Julian',
      image: '/assets/images/julian full panel.jpg',
      aspectRatio: 2400 / 3444, // 0.697
    },
    {
      title: 'Frieren',
      image: '/assets/images/frieren full panel.jpg',
      aspectRatio: 1067 / 1600, // 0.667
    },
    {
      title: 'Shidou',
      image: '/assets/images/shidou ful panel.jpg',
      aspectRatio: 3840 / 5512, // 0.697
    },
  ],
  'character-focused-panel': [
    {
      title: 'Teddy',
      image: '/assets/images/teddy cfp1.jpg',
      aspectRatio: 2648 / 3302, // 0.802
    },
    {
      title: 'Loki',
      image: '/assets/images/loki cfp.jpg',
      aspectRatio: 1667 / 1546, // 1.078
    },
    {
      title: 'Isagi',
      image: '/assets/images/isagi yoichi cfp2.jpg',
      aspectRatio: 2739 / 3668, // 0.747
    },
    {
      title: 'Teddy',
      image: '/assets/images/teddy cfp2.jpg',
      aspectRatio: 3840 / 3302, // 1.163
    },
    {
      title: 'Isagi',
      image: '/assets/images/isagi yoichi cfp3.jpg',
      aspectRatio: 3470 / 3877, // 0.895
    },
  ],
  'double-spread': [
    {
      title: 'Isagi Vs Hugo',
      image: '/assets/images/hugo vs isagi spread.jpg',
      aspectRatio: 4167 / 2991, // 1.393
    },
    {
      title: 'Sun Ken Rock',
      image: '/assets/images/sun ken rock spread.jpg',
      aspectRatio: 4266 / 3080, // 1.385
    },
    {
      title: 'Asta the Wizard King',
      image: '/assets/images/asta spread.jpg',
      aspectRatio: 3136 / 2290, // 1.369
    },
    {
      title: 'Nagi',
      image: '/assets/images/Nuts1.png',
      aspectRatio: 2950 / 2197, // 1.343
    },
    {
      title: 'Rin vs Loki',
      image: '/assets/images/Barely.jpg',
      aspectRatio: 10000 / 7176, // 1.393
    },
  ],
};

const illustrationSamples: Record<string, SampleImage[]> = {
  bust: [
    {
      title: 'Isagi',
      image: 'public/assets/images/1000074271.jpg',
      aspectRatio: 3360 / 1822, // 1.844
    },
    {
      title: 'Kaneki',
      image: 'public/assets/images/kneki.png',
      aspectRatio: 2532 / 3426, // 0.739
    },
  ],
  'half-body': [
    {
      title: 'Hugo Fanart · Half-Body',
      image: '/assets/images/hugo fanart.jpg',
      aspectRatio: 3001 / 4192, // 0.716
    },
    {
      title: 'Rin',
      image: 'public/assets/images/rin fanart bust.jpg',
      aspectRatio: 4211 / 2988, // 1.409
    },
  ],
  'full-body': [
    {
      title: 'Teddy Fanart · Full-Body',
      image: '/assets/images/teddy fanart full body.jpg',
      aspectRatio: 3119 / 2205, // 1.414
    },
    {
      title: 'Celestial Seraph · Full-Body Showcase',
      image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
      aspectRatio: 896 / 1200, // 0.747
    },
  ],
};

export const TiersSection: React.FC<TiersSectionProps> = ({
  currency,
  lang,
  onSelectTier,
}) => {
  const [selectedMangaCatId, setSelectedMangaCatId] = useState('full-panel');
  const [selectedIllustrationScopeId, setSelectedIllustrationScopeId] =
    useState('bust');

  const t = getTranslation(lang);

  const [mangaSlideIndex, setMangaSlideIndex] = useState(0);
  const [illustrationSlideIndex, setIllustrationSlideIndex] = useState(0);

  // Dynamic aspect ratio cache for images detected on load
  const [dynamicRatios, setDynamicRatios] = useState<Record<string, number>>({});

  const handleImageLoad = (imgSrc: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      const ratio = naturalWidth / naturalHeight;
      setDynamicRatios((prev) => (prev[imgSrc] === ratio ? prev : { ...prev, [imgSrc]: ratio }));
    }
  };

  // Swipe handling for touch devices
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Zoom lightbox state with gallery navigation
  const [zoomImageList, setZoomImageList] = useState<SampleImage[]>([]);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
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

  const currentMangaItem =
    currentMangaImages[mangaSlideIndex] || currentMangaImages[0];
  const currentMangaRatio =
    (currentMangaItem &&
      (currentMangaItem.aspectRatio || dynamicRatios[currentMangaItem.image])) ||
    (selectedMangaCatId === 'double-spread' ? 1.39 : 0.7);

  const currentIllustrationItem =
    currentIllustrationImages[illustrationSlideIndex] ||
    currentIllustrationImages[0];
  const currentIllustrationRatio =
    (currentIllustrationItem &&
      (currentIllustrationItem.aspectRatio ||
        dynamicRatios[currentIllustrationItem.image])) ||
    1;

  const handleOpenZoom = (images: SampleImage[], initialIdx: number) => {
    setZoomImageList(images);
    setZoomIndex(initialIdx);
    setZoomScale(1);
  };

  const handleCloseZoom = () => {
    setZoomIndex(null);
    setZoomImageList([]);
    setZoomScale(1);
  };

  const handleZoomNext = () => {
    if (zoomIndex === null || zoomImageList.length <= 1) return;
    setZoomIndex((prev) => (prev! + 1) % zoomImageList.length);
    setZoomScale(1);
  };

  const handleZoomPrev = () => {
    if (zoomIndex === null || zoomImageList.length <= 1) return;
    setZoomIndex(
      (prev) => (prev! - 1 + zoomImageList.length) % zoomImageList.length
    );
    setZoomScale(1);
  };

  // Generic touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleMangaTouchEnd = () => {
    if (!touchStartX || !touchEndX || currentMangaImages.length <= 1) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      // Swiped Left -> Next
      setMangaSlideIndex((prev) => (prev + 1) % currentMangaImages.length);
    } else if (distance < -45) {
      // Swiped Right -> Prev
      setMangaSlideIndex(
        (prev) => (prev - 1 + currentMangaImages.length) % currentMangaImages.length
      );
    }
  };

  const handleIllustrationTouchEnd = () => {
    if (!touchStartX || !touchEndX || currentIllustrationImages.length <= 1) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      // Swiped Left -> Next
      setIllustrationSlideIndex((prev) => (prev + 1) % currentIllustrationImages.length);
    } else if (distance < -45) {
      // Swiped Right -> Prev
      setIllustrationSlideIndex(
        (prev) => (prev - 1 + currentIllustrationImages.length) % currentIllustrationImages.length
      );
    }
  };

  const handleZoomTouchEnd = () => {
    if (!touchStartX || !touchEndX || zoomImageList.length <= 1) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleZoomNext();
    } else if (distance < -45) {
      handleZoomPrev();
    }
  };

  // Keyboard navigation for zoom lightbox
  useEffect(() => {
    if (zoomIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseZoom();
      } else if (e.key === 'ArrowRight') {
        handleZoomNext();
      } else if (e.key === 'ArrowLeft') {
        handleZoomPrev();
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((s) => Math.min(s + 0.5, 3));
      } else if (e.key === '-') {
        setZoomScale((s) => Math.max(s - 0.5, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIndex, zoomImageList.length]);

  const activeZoomImage =
    zoomIndex !== null && zoomImageList[zoomIndex]
      ? zoomImageList[zoomIndex]
      : null;

  return (
    <section
      id="tiers"
      className="py-12 sm:py-20 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 dark:border-[#332c27] border-[#e8dfd5]"
    >
      <div className="mb-8 sm:mb-14 text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.commissionPackagesBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight dark:text-amber-50 text-stone-900 font-display">
          {t.selectCommissionType}
        </h2>
        <p className="dark:text-stone-300 text-stone-600 text-xs sm:text-sm sm:text-base leading-relaxed font-normal">
          {t.selectCommissionTypeSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Manga Coloring */}
        <div className="flex flex-col justify-between rounded-3xl border-2 dark:border-amber-400/60 border-amber-400 dark:bg-[#25201c] bg-white p-4 sm:p-7 relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-200">
          <div className="absolute top-0 right-0 bg-amber-400 text-stone-950 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-3 sm:py-1.5 sm:px-4 rounded-bl-2xl shadow-xs">
            {mangaTier.badge || 'Popular'}
          </div>

          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">{mangaTier.emoji}</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold dark:text-amber-50 text-stone-900 font-display">
                  {mangaTier.name}
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-amber-700 dark:text-amber-300">
                  {t.categoryOptionsAvailable}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm dark:text-stone-300 text-stone-600 mt-1 leading-relaxed">
              {mangaTier.tagline}
            </p>

            {/* Manga Category Sub-selectors - Touch Friendly */}
            <div className="mt-4 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
              <label className="block text-[11px] sm:text-xs font-bold dark:text-amber-200 text-stone-800 uppercase tracking-wider mb-2 font-display">
                {t.chooseMangaCategory}
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 sm:p-1.5 rounded-2xl dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#e8dfd5]">
                {mangaPanelCategories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMangaCatId(item.id)}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 min-h-[46px] ${
                      selectedMangaCatId === item.id
                        ? 'bg-amber-400 text-stone-950 shadow-xs font-black'
                        : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
                    }`}
                  >
                    <span className="text-center leading-tight line-clamp-1">
                      {item.emoji} {item.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono opacity-90">
                      {formatCurrency(item.priceUSD, currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Aspect Ratio Picture Slider for Manga Coloring with Touch Swipe */}
            {currentMangaImages.length > 0 && currentMangaItem && (
              <div className="mt-4 w-full flex items-center justify-center">
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMangaTouchEnd}
                  style={{
                    aspectRatio: `${currentMangaRatio}`,
                    width: `min(100%, calc(var(--slider-max-h, 450px) * ${currentMangaRatio}))`,
                  }}
                  className="relative rounded-2xl overflow-hidden border-2 dark:border-[#38312b] border-[#e2d7c9] bg-stone-950 group/slider shadow-md flex items-center justify-center touch-pan-y transition-all duration-300 ease-out max-w-full [--slider-max-h:340px] sm:[--slider-max-h:450px]"
                >
                  {/* Ambient Blurred Artwork Backdrop */}
                  <img
                    src={currentMangaItem.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                  />

                  {/* Main Foreground Artwork */}
                  <img
                    src={currentMangaItem.image}
                    alt={currentMangaItem.title}
                    onLoad={(e) => handleImageLoad(currentMangaItem.image, e)}
                    className="relative z-10 w-full h-full object-contain select-none transition-transform duration-300 group-hover/slider:scale-[1.015] cursor-zoom-in drop-shadow-2xl"
                    onClick={() =>
                      handleOpenZoom(currentMangaImages, mangaSlideIndex)
                    }
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                  {/* Sub-Category Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-extrabold tracking-wide shadow-md flex items-center gap-1.5 font-display">
                      <span>{selectedMangaCat.emoji}</span>
                      <span>{selectedMangaCat.name}</span>
                    </span>
                  </div>

                  {/* Zoom Trigger Button - Touch Target >= 40px */}
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenZoom(currentMangaImages, mangaSlideIndex)
                    }
                    className="absolute top-2.5 right-2.5 z-20 p-2 sm:p-2.5 rounded-xl bg-black/75 hover:bg-amber-400 hover:text-stone-950 text-white transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1 text-xs font-semibold active:scale-95"
                    title={t.zoomSamplePicture}
                  >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-[11px] sm:inline">{t.zoom}</span>
                  </button>

                  {/* Artwork Title overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-20 z-20 text-white text-[11px] sm:text-xs font-bold truncate pointer-events-none drop-shadow-md">
                    {currentMangaItem.title}
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
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-lg active:scale-95 border border-white/10"
                        aria-label="Previous artwork image"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMangaSlideIndex((prev) =>
                            prev === currentMangaImages.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-lg active:scale-95 border border-white/10"
                        aria-label="Next artwork image"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full backdrop-blur-xs">
                        {currentMangaImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setMangaSlideIndex(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                              idx === mangaSlideIndex
                                ? 'w-4 sm:w-5 bg-amber-400'
                                : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
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
                    {t.selectedCategory}
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
                  {t.turnaround}{' '}
                  <strong className="text-stone-800 dark:text-stone-200">
                    {selectedMangaCat.turnaroundDays}
                  </strong>
                </span>
              </div>

              <div className="pt-2 border-t dark:border-[#332c27] border-[#ede5db]">
                <div className="text-[10px] font-bold dark:text-amber-300 text-stone-900 uppercase tracking-wider mb-1 font-display">
                  {t.categoryDeliverables}
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
              className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-98"
            >
              <span>{t.calculateAndOrderManga}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Illustration */}
        <div className="flex flex-col justify-between rounded-3xl border-2 dark:border-[#38312b] border-[#e2d7c9] dark:bg-[#231f1c] bg-white p-4 sm:p-7 relative overflow-hidden group hover:shadow-xl transition-all duration-200">
          <div className="absolute top-0 right-0 bg-stone-200 dark:bg-[#332b24] text-stone-800 dark:text-stone-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1 px-3 sm:py-1.5 sm:px-4 rounded-bl-2xl shadow-xs border-l border-b border-[#e2d7c9] dark:border-[#38312b]">
            {illustrationTier.badge || 'Custom Art'}
          </div>

          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">
                {illustrationTier.emoji}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold dark:text-amber-50 text-stone-900 font-display">
                  {illustrationTier.name}
                </h3>
                <span className="text-[11px] sm:text-xs font-medium text-amber-700 dark:text-amber-300">
                  {t.scopeOptionsAvailable}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm dark:text-stone-300 text-stone-600 mt-1 leading-relaxed">
              {illustrationTier.tagline}
            </p>

            {/* Illustration Scope Sub-selectors - Touch Friendly */}
            <div className="mt-4 pt-3.5 border-t dark:border-[#38312b] border-[#eee5d8]">
              <label className="block text-[11px] sm:text-xs font-bold dark:text-amber-200 text-stone-800 uppercase tracking-wider mb-2 font-display">
                {t.chooseIllustrationScope}
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 sm:p-1.5 rounded-2xl dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#e8dfd5]">
                {illustrationScopes.map((scope) => (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setSelectedIllustrationScopeId(scope.id)}
                    className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 min-h-[46px] ${
                      selectedIllustrationScopeId === scope.id
                        ? 'bg-amber-400 text-stone-950 shadow-xs font-black'
                        : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
                    }`}
                  >
                    <span className="text-center leading-tight line-clamp-1">
                      {scope.emoji} {scope.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono opacity-90">
                      {formatCurrency(scope.priceUSD, currency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Aspect Ratio Picture Slider for Illustration with Touch Swipe */}
            {currentIllustrationImages.length > 0 && currentIllustrationItem && (
              <div className="mt-4 w-full flex items-center justify-center">
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleIllustrationTouchEnd}
                  style={{
                    aspectRatio: `${currentIllustrationRatio}`,
                    width: `min(100%, calc(var(--slider-max-h, 450px) * ${currentIllustrationRatio}))`,
                  }}
                  className="relative rounded-2xl overflow-hidden border-2 dark:border-[#38312b] border-[#e2d7c9] bg-stone-950 group/slider shadow-md flex items-center justify-center touch-pan-y transition-all duration-300 ease-out max-w-full [--slider-max-h:340px] sm:[--slider-max-h:450px]"
                >
                  {/* Ambient Blurred Artwork Backdrop */}
                  <img
                    src={currentIllustrationItem.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                  />

                  {/* Main Foreground Artwork */}
                  <img
                    src={currentIllustrationItem.image}
                    alt={currentIllustrationItem.title}
                    onLoad={(e) => handleImageLoad(currentIllustrationItem.image, e)}
                    className="relative z-10 w-full h-full object-contain select-none transition-transform duration-300 group-hover/slider:scale-[1.015] cursor-zoom-in drop-shadow-2xl"
                    onClick={() =>
                      handleOpenZoom(
                        currentIllustrationImages,
                        illustrationSlideIndex
                      )
                    }
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                  {/* Sub-Category Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-extrabold tracking-wide shadow-md flex items-center gap-1.5 font-display">
                      <span>{selectedIllustrationScope.emoji}</span>
                      <span>{selectedIllustrationScope.name}</span>
                    </span>
                  </div>

                  {/* Zoom Trigger Button - Touch Target >= 40px */}
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenZoom(
                        currentIllustrationImages,
                        illustrationSlideIndex
                      )
                    }
                    className="absolute top-2.5 right-2.5 z-20 p-2 sm:p-2.5 rounded-xl bg-black/75 hover:bg-amber-400 hover:text-stone-950 text-white transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1 text-xs font-semibold active:scale-95"
                    title={t.zoomSamplePicture}
                  >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-[11px] sm:inline">{t.zoom}</span>
                  </button>

                  {/* Artwork Title overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-20 z-20 text-white text-[11px] sm:text-xs font-bold truncate pointer-events-none drop-shadow-md">
                    {currentIllustrationItem.title}
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
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-lg active:scale-95 border border-white/10"
                        aria-label="Previous artwork image"
                      >
                        <ArrowLeft className="w-4 h-4" />
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
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-lg active:scale-95 border border-white/10"
                        aria-label="Next artwork image"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full backdrop-blur-xs">
                        {currentIllustrationImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setIllustrationSlideIndex(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                              idx === illustrationSlideIndex
                                ? 'w-4 sm:w-5 bg-amber-400'
                                : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
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
                    {t.selectedScope}
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
                  {t.turnaround}{' '}
                  <strong className="text-stone-800 dark:text-stone-200">
                    {selectedIllustrationScope.turnaroundDays}
                  </strong>
                </span>
              </div>

              <div className="pt-2 border-t dark:border-[#332c27] border-[#ede5db]">
                <div className="text-[10px] font-bold dark:text-amber-300 text-stone-900 uppercase tracking-wider mb-1 font-display">
                  {t.scopeDeliverables}
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
              className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl dark:bg-[#2e2722] bg-[#f0e7dc] hover:bg-[#e6dccf] dark:hover:bg-[#38302a] dark:text-amber-200 text-stone-900 font-bold text-xs sm:text-sm border dark:border-[#423932] border-[#ded3c3] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>{t.calculateAndOrderIllustration}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal with Touch Swipe & Left/Right Navigation */}
      {activeZoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-2.5 sm:p-6 animate-fadeIn select-none"
        >
          {/* Top Control Bar */}
          <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between gap-2 p-2 sm:p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-white backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs sm:text-sm font-bold truncate">
                {activeZoomImage.title}
              </span>
              {zoomImageList.length > 1 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-mono text-[10px] sm:text-xs font-bold shrink-0">
                  {zoomIndex! + 1} / {zoomImageList.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(s - 0.5, 1))}
                disabled={zoomScale <= 1}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-35 text-white transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <span className="font-mono text-[11px] sm:text-xs w-10 sm:w-12 text-center text-amber-300 font-bold">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(s + 0.5, 3))}
                disabled={zoomScale >= 3}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-35 text-white transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={handleCloseZoom}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-stone-800 hover:bg-rose-500 text-white transition-colors cursor-pointer ml-1"
                aria-label="Close Zoom Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Image Showcase with Left & Right Buttons & Touch Swipe */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleZoomTouchEnd}
            className="relative flex-1 flex items-center justify-center overflow-hidden my-2 sm:my-4 touch-pan-y"
          >
            {/* Left Nav Button */}
            {zoomImageList.length > 1 && (
              <button
                type="button"
                onClick={handleZoomPrev}
                className="absolute left-1.5 sm:left-6 z-30 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-stone-900/80 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-2xl backdrop-blur-md border border-white/10 active:scale-95 group"
                aria-label="Previous artwork image (Left arrow)"
                title="Previous image (←)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
              </button>
            )}

            <img
              src={activeZoomImage.image}
              alt={activeZoomImage.title}
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.15s ease-out',
              }}
              className="max-h-[75vh] sm:max-h-[82vh] max-w-[94vw] object-contain select-none shadow-2xl rounded-xl cursor-default"
            />

            {/* Right Nav Button */}
            {zoomImageList.length > 1 && (
              <button
                type="button"
                onClick={handleZoomNext}
                className="absolute right-1.5 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-stone-900/80 hover:bg-amber-400 hover:text-stone-950 text-white transition-all cursor-pointer shadow-2xl backdrop-blur-md border border-white/10 active:scale-95 group"
                aria-label="Next artwork image (Right arrow)"
                title="Next image (→)"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>

          {/* Bottom helper text */}
          <div className="text-center text-[11px] sm:text-xs text-stone-400 pb-2 flex items-center justify-center gap-2">
            <span>{lang === 'ID' ? 'Geser layar atau gunakan tombol panah untuk melihat karya lain' : 'Swipe or use arrow buttons to browse'}</span>
            <span aria-hidden="true">·</span>
            <span>Esc / Close</span>
          </div>
        </div>
      )}
    </section>
  );
};
