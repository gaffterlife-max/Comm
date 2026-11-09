import {
  ArtistProfile,
  CategoryOption,
  CommissionTerms,
  CurrencyCode,
  CurrencyConfig,
  Language,
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
    priceIDR: 380000,
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
    sampleImage: '/assets/images/10000954181.jpg',
  },
  {
    id: 'character-focused-panel',
    name: 'Character Focused Panel',
    priceUSD: 20,
    priceIDR: 280000,
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
    sampleImage: '/assets/images/10000954181.jpg',
  },
  {
    id: 'double-spread',
    name: 'Double Spread',
    priceUSD: 30,
    priceIDR: 450000,
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
    priceIDR: 280000,
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
    priceIDR: 380000,
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
    priceIDR: 400000,
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
    basePriceIDR: 280000,
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
    sampleImage: '/assets/images/10000954181.jpg',
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
    basePriceIDR: 280000,
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

export function getWorkflowSteps(lang: Language = 'EN'): WorkflowStep[] {
  if (lang === 'ID') {
    return [
      {
        step: '01',
        emoji: '💬',
        title: 'Pengajuan & Brief Proyek',
        description:
          'Pilih layanan yang diinginkan, jumlah halaman, dan jelaskan konsep Anda atau lampirkan gambar referensi menggunakan formulir di atas.',
        deliverable: 'Konfirmasi estimasi harga & jadwal pengerjaan',
      },
      {
        step: '02',
        emoji: '📋',
        title: 'DP & Konfirmasi Slot',
        description:
          'DP 50% mengonfirmasi slot Anda dalam jadwal pengerjaan. Berkas lineart diperiksa dan disiapkan untuk diwarnai.',
        deliverable: 'Jadwal dikonfirmasi & pengerjaan dimulai',
      },
      {
        step: '03',
        emoji: '🎨',
        title: 'Draf Warna Dasar & Pencahayaan',
        description:
          'Anda menerima draf pengerjaan yang menampilkan warna dasar dan suasana pencahayaan untuk ditinjau dan disesuaikan.',
        deliverable: 'Peninjauan Tahap 1 (Warna dasar)',
      },
      {
        step: '04',
        emoji: '✨',
        title: 'Bayangan & Rendering Suasana',
        description:
          'Rendering penuh diselesaikan: bayangan, pencahayaan rim, efek partikel, dan gradasi warna akhir.',
        deliverable: 'Pratinjau Tahap 2 (Watermark)',
      },
      {
        step: '05',
        emoji: '📦',
        title: 'Pelunasan & Pengiriman Berkas',
        description:
          'Setelah pratinjau akhir disetujui dan sisa 50% dilunasi, berkas master resolusi tinggi akan dikirimkan via Google Drive.',
        deliverable: 'Berkas master resolusi tinggi',
      },
    ];
  }
  return workflowSteps;
}

export const commissionTerms: CommissionTerms = {
  dos: [
    'Black & white manga pages',
    'Original Characters (OCs) with reference pictures or clear visual descriptions',
    'Action, Fantasy, Romance, Sci-Fi, Gore and Slice of Life manga genres/types',
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

export function getCommissionTerms(lang: Language = 'EN'): CommissionTerms {
  if (lang === 'ID') {
    return {
      dos: [
        'Halaman manga hitam putih',
        'Original Character (OC) dengan gambar referensi atau deskripsi visual yang jelas',
        'Manga genre/tipe Action, Fantasy, Romance, Sci-Fi, Gore dan Slice of Life',
        'Efek khusus, efek pencahayaan, detail zirah, dan senjata magis',
        'Interaksi karakter, pose berpasangan, dan komposisi panel dinamis',
      ],
      donts: [
        'Chibi Art',
        'Konten NSFW eksplisit berlebihan atau ujaran kebencian/SARA',
        'Proyek NFT / Crypto / Web3',
        'Pelatihan dataset AI, ingesti model AI, atau scraping gambar',
        'Meniplak atau memodifikasi karya seniman lain tanpa izin eksplisit',
      ],
      paymentRules: [
        'Klien internasional: Faktur PayPal atau Wise dalam USD ($).',
        'Klien Indonesia: Transfer Bank langsung (Bank Rakyat Indonesia / BRImo) atau QRIS dalam IDR (Rp).',
        'DP standar 50% di awal sebelum pengerjaan dimulai; sisa 50% setelah pratinjau akhir disetujui.',
        'Pengerjaan cepat (rush delivery) tersedia berdasarkan ketersediaan jadwal.',
      ],
      revisionRules: [
        'Mencakup hingga 5 kali revisi di sepanjang tahap sketsa, warna dasar, dan rendering.',
        'Perubahan kecil rona warna dan pencahayaan sebelum persetujuan akhir bersifat gratis.',
        'Perubahan signifikan yang diminta setelah persetujuan lineart atau rendering akhir dapat dikenakan biaya tambahan.',
      ],
      copyrightRules: [
        'Penggunaan pribadi: Anda bebas mengunggah karya ke media sosial, menggunakannya sebagai avatar, atau mencetaknya untuk pajangan pribadi.',
        'Lisensi komersial (! Khusus Ilustrasi !): Tersedia jika Anda berencana menerbitkan buku, menjual merchandise, atau memonetisasi ilustrasi.',
        'Seniman berhak menampilkan karya yang telah selesai di portofolio online kecuali jika ada perjanjian NDA.',
      ],
    };
  }
  return commissionTerms;
}

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

export function getOptionPrice(
  option: CategoryOption,
  currency: CurrencyCode = 'USD',
  customPrices?: Record<string, { priceUSD: number; priceIDR: number }>
): number {
  if (customPrices && customPrices[option.id]) {
    const custom = customPrices[option.id];
    if (currency === 'IDR' && custom.priceIDR) {
      return custom.priceIDR;
    }
    if (currency === 'USD' && custom.priceUSD) {
      return custom.priceUSD;
    }
  }
  if (currency === 'IDR' && option.priceIDR) {
    return option.priceIDR;
  }
  return option.priceUSD;
}

export function getTierBasePrice(
  tier: MainTier,
  currency: CurrencyCode = 'USD'
): number {
  if (currency === 'IDR' && tier.basePriceIDR) {
    return tier.basePriceIDR;
  }
  return tier.basePriceUSD;
}

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'USD'
): string {
  const config = currencyConfigs[currency] || currencyConfigs.USD;
  if (currency === 'IDR') {
    // If already in IDR (>= 1000, e.g. 280000, 380000, 400000, 450000)
    if (amount >= 1000) {
      return `${config.symbol}${Math.round(amount).toLocaleString('id-ID')}`;
    }
    // Mapping for base tier prices passed as USD
    if (amount === 20) return `${config.symbol}280.000`;
    if (amount === 25) return `${config.symbol}380.000`;
    if (amount === 30) return `${config.symbol}400.000`;

    const converted = amount * 14000;
    const rounded = Math.round(converted / 5000) * 5000;
    return `${config.symbol}${rounded.toLocaleString('id-ID')}`;
  }
  return `${config.symbol}${amount.toFixed(0)}`;
}
