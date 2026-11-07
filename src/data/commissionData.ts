import {
  ArtistProfile,
  CategoryOption,
  CommissionTerms,
  CurrencyCode,
  CurrencyConfig,
  MainTier,
  PortfolioItem,
  WorkflowStep,
} from '../types';

export const artistProfile: ArtistProfile = {
  name: 'gaffterduck',
  handle: '@gaffterduck',
  logoImage: '/assets/aistudio/wmm_newss_ccb81ada.png',
  title: 'Manga Colorist & Illustrator',
  tagline:
    "I'm gaffterduck — an illustrator and manga colorist specializing in atmospheric lighting, vibrant color grading, and custom manga page coloring.",
  location: 'Remote · Worldwide',
  experience: '2+ Years Experience',
  turnaroundAverage: '1–2 Business Days',
  avatarImage: '/assets/aistudio/wmm_newss_ccb81ada.png',
  software: ['Clip Studio Paint'],
  hardware: ['HUION H640P'],
  socials: {
    twitter: 'https://x.com/gduckx_',
    instagram: 'https://instagram.com/gaffterduck_',
    email: 'gaffterlife@gmail.com',
  },
};

export const mangaPanelCategories: CategoryOption[] = [
  {
    id: 'full-panel',
    name: 'Full Panel',
    priceUSD: 25,
    turnaroundDays: '1–2 days / page',
    description:
      'High-contrast, vibrant color grading for a complete manga panel. Includes background scenery, dynamic lighting, volumetric shadows, environmental mood, and colored sound effects.',
    deliverables: [
      'Progress updates (Cleaning → Base Colors → Rendering)',
      'High-resolution RGB file (144 dpi)',
      'Layered source file (.CLIP) included',
    ],
    recommendedFor: 'Full manga pages, action scenes, and scenic panels',
    emoji: '📖',
    sampleImage: '/assets/images/10000954181.png',
  },
  {
    id: 'character-focused-panel',
    name: 'Character Focused Panel',
    priceUSD: 20,
    turnaroundDays: '1–2 days',
    description:
      'Character-focused manga panel colorization. Emphasizes expressive facial rendering, detailed hair/clothing shading, rim lighting, and atmospheric focus.',
    deliverables: [
      'Progress updates (Cleaning → Base Colors → Rendering)',
      'High-resolution RGB file (144 dpi)',
      'Layered source file (.CLIP) included',
      'Matching profile avatar & wallpaper',
    ],
    recommendedFor:
      'Character portraits in manga, emotional close-ups, reaction panels',
    emoji: '👤',
    sampleImage: '/assets/images/10000954181.png',
  },
  {
    id: 'double-spread',
    name: 'Double Spread',
    priceUSD: 30,
    turnaroundDays: '1–2 days',
    description:
      'A cinematic two-page spread colorization. Features complex perspective, detailed background scenery painting, dramatic lighting, and special effects.',
    deliverables: [
      'Progress updates (Cleaning → Base Colors → Rendering)',
      'High-resolution RGB files (144 dpi)',
      'Textless clean art version (more charge included)',
      'Layered source file (.CLIP) included',
    ],
    recommendedFor:
      'Climax scenes, double-page spreads, key chapter highlights',
    emoji: '🌟',
    sampleImage: '/assets/images/manga_cover_spread_1793799153733.jpg',
  },
];

export const illustrationScopes: CategoryOption[] = [
  {
    id: 'bust',
    name: 'Headshot / Bust',
    priceUSD: 20,
    turnaroundDays: '1–2 days',
    description:
      'Detailed headshot or chest-up character illustration with clean lineart, vibrant shading, and expressive lighting.',
    deliverables: [
      'Progress updates (Sketch → Lineart → Colors → Rendering)',
      'High-resolution PNG file (144 dpi)',
      'Layered file (.CLIP) included',
      'Transparent background version included',
    ],
    recommendedFor: 'Social media avatars, profile icons, character icons',
    emoji: '✨',
    sampleImage:
      '/assets/images/character_illustration_showcase_1793799152713.jpg',
  },
  {
    id: 'half-body',
    name: 'Half-Body (Waist-Up)',
    priceUSD: 25,
    turnaroundDays: '1–2 days',
    description:
      'Waist-up character drawing featuring dynamic posture, detailed outfit texturing, lighting effects, and soft background depth.',
    deliverables: [
      'Progress updates (Sketch → Lineart → Colors → Rendering)',
      'High-resolution PNG file (144 dpi)',
      'Layered file (.CLIP) included',
      'Transparent background version included',
    ],
    recommendedFor: 'VTuber art, light novel illustrations, character banners',
    emoji: '🎨',
    sampleImage:
      '/assets/images/character_illustration_showcase_1793799152713.jpg',
  },
  {
    id: 'full-body',
    name: 'Full-Body Character',
    priceUSD: 30,
    turnaroundDays: '1–2 days',
    description:
      'Complete head-to-toe character illustration with intricate costume detailing, props, weapon rendering, and atmospheric lighting.',
    deliverables: [
      'Progress updates (Sketch → Lineart → Colors → Rendering)',
      'High-resolution PNG & .CLIP files (144 dpi)',
      'Transparent background version included',
    ],
    recommendedFor: 'Character design sheets, book covers, merch art',
    emoji: '🌟',
    sampleImage:
      '/assets/images/character_illustration_showcase_1793799152713.jpg',
  },
];

export const commissionTiers: MainTier[] = [
  {
    id: 'manga-coloring',
    name: 'Manga Coloring',
    emoji: '📖',
    category: 'manga-page',
    badge: 'Popular',
    tagline:
      'Manga panel colorization with atmospheric lighting & color grading.',
    basePriceUSD: 20,
    turnaroundDays: '1–2 days',
    description:
      'Complete colorization for manga pages and panels. Choose your panel style: Full Panel, Character Focused Panel, or Double Spread.',
    deliverables: [
      'Cleaning & line pre-processing',
      'High-resolution RGB file (144dpi)',
      'Layered Clip Studio Paint (.CLIP) source file',
    ],
    revisions: '5 revision passes across milestones',
    recommendedFor:
      'Youtube thumbnail, content across all platform, and Personal project',
    sampleImage: '/assets/images/10000954181.png',
  },
  {
    id: 'illustration',
    name: 'Illustration',
    emoji: '🎨',
    category: 'character',
    badge: 'Custom Art',
    tagline:
      'Full digital character artwork, original character drawings, and custom illustrations.',
    basePriceUSD: 20,
    turnaroundDays: '1–2 days',
    description:
      'Custom character artwork drawn from sketch to final rendering. Select your scope: Headshot/Bust, Half-Body, or Full-Body.',
    deliverables: [
      'Initial sketch preview for composition approval',
      'High-resolution PNG file (144 dpi)',
      'Transparent background version included',
    ],
    revisions: '5 revision passes across sketch & rendering stages',
    recommendedFor: 'Original Characters (OCs), personal project & avatars',
    sampleImage:
      '/assets/images/character_illustration_showcase_1793799152713.jpg',
  },
];

export const portfolioWorks: PortfolioItem[] = [
  // Manga Coloring — Full Panel
  {
    id: 'mc-full-1',
    title: 'The Blazing Duel · Climax Action Panel',
    category: 'manga-coloring',
    subCategory: 'full-panel',
    subCategoryLabel: 'Full Panel',
    image: '/assets/images/manga_colored_page_epic_1793799150669.jpg',
    secondaryImage: '/assets/images/manga_lineart_raw_1793799152507.jpg',
    clientType: 'Manga Coloring · Full Panel',
    software: 'Clip Studio Paint EX',
    resolution: '3840 x 5120 px · 600 DPI',
    colorPalette: ['#E63946', '#F4A261', '#1D3557', '#F1FAEE', '#2A0845'],
    year: '2026',
    aspectRatio: '3:4',
  },
  {
    id: 'mc-full-2',
    title: 'Awakening Impact · Dynamic Manga Panel',
    category: 'manga-coloring',
    subCategory: 'full-panel',
    subCategoryLabel: 'Full Panel',
    image: '/assets/images/10000954181.png',
    clientType: 'Manga Coloring · Full Panel',
    software: 'Clip Studio Paint EX',
    resolution: '3600 x 4800 px · 600 DPI',
    colorPalette: ['#E76F51', '#2A9D8F', '#264653', '#F4A261', '#E9C46A'],
    year: '2026',
    aspectRatio: '3:4',
  },
  // Manga Coloring — Character Focused Panel
  {
    id: 'mc-char-1',
    title: 'Warrior Focus · Climax Battle Portrait',
    category: 'manga-coloring',
    subCategory: 'character-focused-panel',
    subCategoryLabel: 'Character Focused Panel',
    image: '/assets/images/regenerated_image_1793811718575.png',
    clientType: 'Manga Coloring · Character Focused Panel',
    software: 'Clip Studio Paint EX',
    resolution: '3600 x 4800 px · 600 DPI',
    colorPalette: ['#F59E0B', '#EF4444', '#1E293B', '#F8FAFC', '#3B82F6'],
    year: '2026',
    aspectRatio: '3:4',
  },
  {
    id: 'mc-char-2',
    title: 'Dual Blades Stance · Inked Foundation & Shading',
    category: 'manga-coloring',
    subCategory: 'character-focused-panel',
    subCategoryLabel: 'Character Focused Panel',
    image: '/assets/images/manga_lineart_raw_1793799152507.jpg',
    clientType: 'Manga Coloring · Lineart Prep',
    software: 'Clip Studio Paint',
    resolution: '3600 x 4800 px · 600 DPI',
    colorPalette: ['#09090B', '#27272A', '#71717A', '#E4E4E7', '#FAFAFA'],
    year: '2025',
    aspectRatio: '3:4',
  },
  // Manga Coloring — Double Spread
  {
    id: 'mc-spread-1',
    title: 'Skyline Echoes · Double Spread Twilight',
    category: 'manga-coloring',
    subCategory: 'double-spread',
    subCategoryLabel: 'Double Spread',
    image: '/assets/images/manga_cover_spread_1793799153733.jpg',
    clientType: 'Manga Coloring · Double Spread',
    software: 'Clip Studio Paint EX',
    resolution: '7680 x 4320 px · 300 DPI',
    colorPalette: ['#F97316', '#7C3AED', '#38BDF8', '#0F172A', '#FEF08A'],
    year: '2026',
    aspectRatio: '16:9',
  },
  // Illustration — Headshot
  {
    id: 'ill-head-1',
    title: 'Astral Seraph · Expressive Headshot Icon',
    category: 'illustration',
    subCategory: 'headshot',
    subCategoryLabel: 'Headshot',
    image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    clientType: 'Illustration · Headshot',
    software: 'Clip Studio Paint EX',
    resolution: '2400 x 2400 px · 350 DPI',
    colorPalette: ['#A78BFA', '#FDE047', '#38BDF8', '#1E1B4B', '#F8FAFC'],
    year: '2026',
    aspectRatio: '3:4',
  },
  {
    id: 'ill-head-2',
    title: 'Gaffter Mascot Avatar · Profile Icon',
    category: 'illustration',
    subCategory: 'headshot',
    subCategoryLabel: 'Headshot',
    image: '/assets/aistudio/wmm_newss_ccb81ada.png',
    clientType: 'Illustration · Avatar Icon',
    software: 'Clip Studio Paint EX',
    resolution: '2000 x 2000 px · 300 DPI',
    colorPalette: ['#FBBF24', '#D97706', '#1C1917', '#FEF3C7', '#78350F'],
    year: '2026',
    aspectRatio: '3:4',
  },
  // Illustration — Half Body
  {
    id: 'ill-half-1',
    title: 'Celestial Guardian · Half-Body Dynamic Stance',
    category: 'illustration',
    subCategory: 'half-body',
    subCategoryLabel: 'Half Body',
    image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    clientType: 'Illustration · Half Body',
    software: 'Clip Studio Paint EX',
    resolution: '3200 x 4200 px · 350 DPI',
    colorPalette: ['#8B5CF6', '#EC4899', '#06B6D4', '#0F172A', '#FFFBEB'],
    year: '2026',
    aspectRatio: '3:4',
  },
  // Illustration — Full Body
  {
    id: 'ill-full-1',
    title: 'Seraphim of the Astral Dawn · Full-Body Showcase',
    category: 'illustration',
    subCategory: 'full-body',
    subCategoryLabel: 'Full Body',
    image: '/assets/images/character_illustration_showcase_1793799152713.jpg',
    clientType: 'Illustration · Full Body',
    software: 'Clip Studio Paint EX',
    resolution: '4000 x 5600 px · 350 DPI',
    colorPalette: ['#A78BFA', '#FDE047', '#38BDF8', '#1E1B4B', '#F8FAFC'],
    year: '2026',
    aspectRatio: '3:4',
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: '01',
    emoji: '💬',
    title: 'Project Inquiry & Brief',
    description:
      'Choose your preferred service, page count, and describe your concept or attach reference images using the form above.',
    deliverable: 'Confirmed quote & delivery timeline',
  },
  {
    step: '02',
    emoji: '📋',
    title: 'Deposit & Slot Confirmation',
    description:
      'A 50% deposit confirms your spot on the production schedule. Lineart files are inspected and prepped for work.',
    deliverable: 'Schedule confirmed & work commences',
  },
  {
    step: '03',
    emoji: '🎨',
    title: 'Color Flats & Lighting Draft',
    description:
      'You receive a work-in-progress draft showing base colors and overall lighting mood for review and adjustments.',
    deliverable: 'Milestone 1 check-in (Base colors)',
  },
  {
    step: '04',
    emoji: '✨',
    title: 'Shading & Atmospheric Render',
    description:
      'Full rendering is completed: shadows, rim lights, particle effects, and final color grading.',
    deliverable: 'Milestone 2 preview (Watermarked)',
  },
  {
    step: '05',
    emoji: '📦',
    title: 'Final Clearance & Delivery',
    description:
      'Once the final preview is approved and the remaining 50% balance is cleared, high-resolution master files are shared via Google Drive.',
    deliverable: 'High-res master files',
  },
];

export const commissionTerms: CommissionTerms = {
  dos: [
    'Black & white manga pages',
    'Original Characters (OCs) with reference pictures or clear visual descriptions',
    'Action, Fantasy, Romance, Sci-Fi, Gore (nsfw or full gore) and Slice of Life manga genres',
    'Special effects, lighting passes, armor filigree, and magical weapons',
    'Character interactions, paired poses, and dynamic panel compositions',
  ],
  donts: [
    'Chibi Art',
    'Explicit NSFW or hateful/offensive content',
    'NFT / Crypto / Web3 projects',
    'AI dataset training, AI model ingestion, or image scraping',
    'Tracing or modifying other artists work without explicit consent',
  ],
  paymentRules: [
    'International clients: PayPal invoice or Wise in USD ($).',
    'Indonesian clients: Direct Bank Transfer or QRIS in IDR (Rp).',
    'Standard 50% deposit upfront before work begins; remaining 50% upon final preview approval.',
    'Rush delivery is available upon request subject to schedule availability.',
  ],
  revisionRules: [
    'Includes up to 5 revision rounds during sketch, base color, and rendering stages.',
    'Minor color hue and lighting shifts before final approval are complimentary.',
    'Significant changes requested after linework or final rendering approval may incur an additional fee.',
  ],
  copyrightRules: [
    'Personal use: You may freely post the artwork online, use it as an avatar, or print it for personal display.',
    'Commercial licensing (! Illustration only !): Available if you plan to publish books, sell merchandise, or monetize the illustration.',
    'The artist reserves the right to display completed work in online portfolios unless an NDA is requested.',
  ],
};

export const currencyConfigs: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromUSD: 1,
    label: 'USD ($)',
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp ',
    rateFromUSD: 13600, // Fixed Indonesian local rate (15% off standard 16,000 rate)
    label: 'IDR (Rp)',
  },
};

export function formatCurrency(
  amountUSD: number,
  currency: CurrencyCode = 'USD'
): string {
  const config = currencyConfigs[currency] || currencyConfigs.USD;
  const converted = amountUSD * config.rateFromUSD;
  if (currency === 'IDR') {
    // Round to the nearest Rp 5.000 for clean, round Indonesian pricing
    const rounded = Math.round(converted / 5000) * 5000;
    return `${config.symbol}${rounded.toLocaleString('id-ID')}`;
  }
  return `${config.symbol}${converted.toFixed(0)}`;
}
