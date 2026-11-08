import React, { useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  CircleAlert,
  Copy,
  Check,
  Download,
  Send,
} from 'lucide-react';
import {
  commissionTiers,
  currencyConfigs,
  formatCurrency,
  illustrationScopes,
  mangaPanelCategories,
} from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { CurrencyCode, Language, OrderInquiry } from '../types';

interface CalculatorSectionProps {
  currency: CurrencyCode;
  lang: Language;
  selectedTierId: string;
  onSelectTier: (tierId: string) => void;
  onSubmitSuccess: (order: OrderInquiry) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  currency,
  lang,
  selectedTierId = 'manga-coloring',
  onSelectTier,
  onSubmitSuccess,
}) => {
  const t = getTranslation(lang);
  const [activeTierId, setActiveTierId] = useState(
    selectedTierId === 'illustration' ? 'illustration' : 'manga-coloring'
  );
  const [selectedMangaCatId, setSelectedMangaCatId] = useState('full-panel');
  const [selectedIllustrationScopeId, setSelectedIllustrationScopeId] =
    useState('half-body');
  const [quantity, setQuantity] = useState(1);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientHandle, setClientHandle] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [lineartStatus, setLineartStatus] = useState<
    'client-provided' | 'artist-draws'
  >('client-provided');
  const [referenceUrls, setReferenceUrls] = useState('');
  const [colorMood, setColorMood] = useState('');
  const [notes, setNotes] = useState('');

  const [copiedSummary, setCopiedSummary] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (selectedTierId) {
      if (selectedTierId === 'illustration') {
        setActiveTierId('illustration');
      } else if (
        selectedTierId === 'manga-coloring' ||
        selectedTierId === 'full-panel' ||
        selectedTierId === 'character-focused-panel' ||
        selectedTierId === 'double-spread'
      ) {
        setActiveTierId('manga-coloring');
        if (selectedTierId !== 'manga-coloring') {
          setSelectedMangaCatId(selectedTierId);
        }
      }
    }
  }, [selectedTierId]);

  const currentTier = useMemo(
    () => commissionTiers.find((t) => t.id === activeTierId) || commissionTiers[0],
    [activeTierId]
  );

  const currentOption = useMemo(
    () =>
      activeTierId === 'illustration'
        ? illustrationScopes.find((s) => s.id === selectedIllustrationScopeId) ||
          illustrationScopes[1]
        : mangaPanelCategories.find((c) => c.id === selectedMangaCatId) ||
          mangaPanelCategories[0],
    [activeTierId, selectedMangaCatId, selectedIllustrationScopeId]
  );

  const { totalUSD, breakdown, estimatedDays } = useMemo(() => {
    const basePrice = currentOption.priceUSD;
    const total = basePrice * quantity;
    const unitLabel =
      quantity === 1
        ? activeTierId === 'illustration'
          ? lang === 'ID'
            ? 'karya'
            : 'piece'
          : 'panel'
        : activeTierId === 'illustration'
          ? lang === 'ID'
            ? 'karya'
            : 'pieces'
          : 'panels';

    const daySuffix = lang === 'ID' ? 'hari' : 'days';

    return {
      totalUSD: total,
      breakdown: [
        {
          label: `${currentTier.name} — ${currentOption.name} (${quantity} ${unitLabel} @ ${formatCurrency(basePrice, currency)})`,
          amount: total,
        },
      ],
      estimatedDays:
        currentOption.id === 'double-spread' || currentOption.id === 'full-body'
          ? `${Math.min(2 * quantity, 10)}–${Math.min(3 * quantity, 14)} ${daySuffix}`
          : `${Math.min(1 * quantity, 7)}–${Math.min(2 * quantity, 14)} ${daySuffix}`,
    };
  }, [currentTier, currentOption, activeTierId, quantity, lang, currency]);

  const handleSelectPackage = (id: string) => {
    setActiveTierId(id);
    onSelectTier?.(id);
  };

  const generateBriefText = () => {
    const unitLabel =
      quantity === 1
        ? activeTierId === 'illustration'
          ? lang === 'ID'
            ? 'karya'
            : 'piece'
          : 'panel'
        : activeTierId === 'illustration'
          ? lang === 'ID'
            ? 'karya'
            : 'pieces'
          : 'panels';

    if (lang === 'ID') {
      return [
        '=============================================',
        'PENGAJUAN KOMISI UNTUK GAFFTERDUCK',
        '=============================================',
        `Paket Layanan: ${currentTier.name}`,
        `Opsi Dipilih: ${currentOption.name}`,
        `Jumlah: ${quantity} ${unitLabel}`,
        '---------------------------------------------',
        `Estimasi Harga: ${formatCurrency(totalUSD, currency)} (${formatCurrency(
          totalUSD,
          'USD'
        )} USD)`,
        `Waktu Pengerjaan: ~${estimatedDays}`,
        '---------------------------------------------',
        `Nama Klien: ${clientName || 'Tidak diisi'}`,
        `Username Handle: ${clientHandle || 'Tidak ada'}`,
        `Email: ${clientEmail || 'Tidak ada'}`,
        `Judul Proyek: ${projectTitle || 'Tanpa Judul'}`,
        `Pengarahan Warna/Pencahayaan: ${colorMood || 'Tidak diisi'}`,
        `Tautan Referensi: ${referenceUrls || 'Akan dikirim via DM/email'}`,
        `Catatan: ${notes || 'Permintaan komisi standar'}`,
        '=============================================',
      ].join('\n');
    }

    return [
      '=============================================',
      'COMMISSION INQUIRY FOR GAFFTERDUCK',
      '=============================================',
      `Service Package: ${currentTier.name}`,
      `Selected Option: ${currentOption.name}`,
      `Quantity: ${quantity} ${unitLabel}`,
      '---------------------------------------------',
      `Estimated Rate: ${formatCurrency(totalUSD, currency)} (${formatCurrency(
        totalUSD,
        'USD'
      )} USD)`,
      `Turnaround: ~${estimatedDays}`,
      '---------------------------------------------',
      `Client Name: ${clientName || 'Not specified'}`,
      `Handle: ${clientHandle || 'Not provided'}`,
      `Email: ${clientEmail || 'Not provided'}`,
      `Project Title: ${projectTitle || 'Untitled'}`,
      `Color & Mood: ${colorMood || 'Not specified'}`,
      `Reference Links: ${referenceUrls || 'Will send via DMs/email'}`,
      `Notes: ${notes || 'Standard commission request'}`,
      '=============================================',
    ].join('\n');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setFormError(
        lang === 'ID'
          ? 'Mohon isi nama dan alamat email Anda agar saya dapat memproses pesanan Anda.'
          : 'Please provide your name and email so I can respond to your request.'
      );
      return;
    }
    setFormError('');

    const newOrder: OrderInquiry = {
      orderId: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      tier: currentTier,
      categoryOption: currentOption,
      pageCount: quantity,
      totalUSD: totalUSD,
      currency: currency,
      clientName: clientName,
      clientHandle: clientHandle,
      clientEmail: clientEmail,
      projectTitle: projectTitle || 'Untitled Project',
      lineartStatus: lineartStatus,
      referenceUrls: referenceUrls,
      colorMood: colorMood,
      notes: notes,
      estimatedDays: estimatedDays,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const subject = encodeURIComponent(
      `Commission Inquiry [${newOrder.orderId}] - ${currentTier.name} (${currentOption.name})`
    );
    const body = encodeURIComponent(generateBriefText());

    window.location.href = `mailto:gaffterlife@gmail.com?subject=${subject}&body=${body}`;
    onSubmitSuccess(newOrder);
  };

  return (
    <section
      id="calculator"
      className="py-12 sm:py-18 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 dark:border-[#332c27] border-[#e8dfd5]"
    >
      {/* Header bar */}
      <div className="mb-8 sm:mb-12 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b-2 dark:border-[#332c27] border-[#e8dfd5] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-[11px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 mb-2 sm:mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t.interactiveCalculator}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight dark:text-amber-50 text-stone-900 font-display">
            {t.calculatorAndFormTitle}
          </h2>
          <p className="mt-2 dark:text-stone-300 text-stone-600 text-xs sm:text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            {t.calculatorSubtitle}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 text-[11px] sm:text-xs dark:text-stone-400 text-stone-600 flex items-center justify-center sm:justify-start gap-2 font-medium">
          <span>{t.ratesShownIn}:</span>
          <span className="font-mono text-[11px] sm:text-xs dark:text-amber-300 text-stone-900 font-bold dark:bg-[#25201c] bg-[#ede5db] border dark:border-[#38312b] border-[#dfd4c7] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
            {currencyConfigs[currency].label}
          </span>
        </div>
      </div>

      {/* Mobile Current Estimate Quick Pill */}
      <div className="lg:hidden mb-6 p-3.5 rounded-2xl bg-amber-400/15 dark:bg-amber-400/10 border border-amber-400/30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧾</span>
          <div>
            <div className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
              {t.currentEstimate}
            </div>
            <div className="text-xs font-bold dark:text-white text-stone-900">
              {currentTier.name} — {currentOption.name}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-bold font-mono text-amber-700 dark:text-amber-300">
            {formatCurrency(totalUSD, currency)}
          </div>
          <div className="text-[10px] text-stone-500 font-mono">
            ~{estimatedDays}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls & Form / Right Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* Step 1: Select Package */}
          <div className="dark:bg-[#231f1c] bg-white border dark:border-[#38312b] border-[#e8dfd5] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-bold dark:text-amber-100 text-stone-900 font-display flex items-center gap-2">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-400 text-stone-950 text-xs flex items-center justify-center font-bold shadow-xs shrink-0">
                  1
                </span>
                <span>{t.step1Title}</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commissionTiers.map((tier) => {
                const isSelected = tier.id === activeTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectPackage(tier.id)}
                    className={`text-left p-4 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 dark:bg-amber-400/10 bg-amber-50/70 shadow-sm'
                        : 'dark:border-[#38312b] border-[#eee5d8] dark:bg-[#2a2420]/40 bg-[#faf7f2] hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{tier.emoji}</span>
                        <div className="text-sm font-bold dark:text-amber-100 text-stone-900 font-display">
                          {tier.name}
                        </div>
                      </div>
                      <p className="text-[11px] dark:text-stone-300 text-stone-600 mt-1 leading-relaxed">
                        {tier.tagline}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t dark:border-[#38312b] border-[#eee5d8] flex items-center justify-between">
                      <span className="text-[11px] font-medium text-amber-700 dark:text-amber-300">
                        {tier.id === 'manga-coloring'
                          ? t.panelStyles
                          : t.artworkScopes}
                      </span>
                      <span className="text-xs font-mono font-bold dark:text-amber-300 text-amber-900">
                        {t.from} {formatCurrency(tier.basePriceUSD, currency)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Category Option & Quantity */}
          <div className="dark:bg-[#231f1c] bg-white border dark:border-[#38312b] border-[#e8dfd5] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm space-y-4">
            <h3 className="text-sm sm:text-base font-bold dark:text-amber-100 text-stone-900 font-display flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-400 text-stone-950 text-xs flex items-center justify-center font-bold shadow-xs shrink-0">
                2
              </span>
              <span>{t.step2Title}</span>
            </h3>

            {/* Scope / Category Sub-selectors */}
            <div>
              <label className="block text-xs font-bold dark:text-amber-200 text-stone-800 uppercase tracking-wider mb-2 font-display">
                {activeTierId === 'manga-coloring'
                  ? t.selectPanelCategory
                  : t.selectIllustrationScope}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {(activeTierId === 'manga-coloring'
                  ? mangaPanelCategories
                  : illustrationScopes
                ).map((opt) => {
                  const isSelected =
                    activeTierId === 'manga-coloring'
                      ? selectedMangaCatId === opt.id
                      : selectedIllustrationScopeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (activeTierId === 'manga-coloring') {
                          setSelectedMangaCatId(opt.id);
                        } else {
                          setSelectedIllustrationScopeId(opt.id);
                        }
                      }}
                      className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-400 dark:bg-amber-400/15 bg-amber-100/70 shadow-xs'
                          : 'dark:border-[#38312b] border-[#eee5d8] dark:bg-[#1a1715]/40 bg-[#faf7f2] hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <div className="text-xl mb-1">{opt.emoji}</div>
                        <div className="text-xs font-bold dark:text-amber-100 text-stone-900 font-display">
                          {opt.name}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t dark:border-[#38312b] border-[#eee5d8] font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        {formatCurrency(opt.priceUSD, currency)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Counter - Mobile Thumb Friendly */}
            <div className="p-3.5 sm:p-4 dark:bg-[#1a1715] bg-[#faf7f2] rounded-xl sm:rounded-2xl border dark:border-[#38312b] border-[#eee5d8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs sm:text-sm font-bold dark:text-amber-100 text-stone-900 font-display">
                  {activeTierId === 'manga-coloring'
                    ? t.numberOfPanels
                    : t.numberOfArtworks}
                </div>
                <div className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 font-normal">
                  {activeTierId === 'manga-coloring'
                    ? t.selectQuantityPanels
                    : t.selectQuantityArtworks}
                </div>
              </div>
              <div className="flex items-center gap-3 self-center sm:self-auto">
                <button
                  type="button"
                  aria-label="Decrease count"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 min-w-[46px] min-h-[46px] rounded-xl dark:bg-[#2e2722] bg-white hover:bg-amber-100 text-stone-900 dark:text-white font-bold flex items-center justify-center text-2xl border dark:border-[#423932] border-[#ded3c3] shadow-xs cursor-pointer active:scale-95"
                >
                  -
                </button>
                <span className="font-mono text-xl font-bold dark:text-amber-300 text-amber-900 w-10 text-center select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase count"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 min-w-[46px] min-h-[46px] rounded-xl dark:bg-[#2e2722] bg-white hover:bg-amber-100 text-stone-900 dark:text-white font-bold flex items-center justify-center text-2xl border dark:border-[#423932] border-[#ded3c3] shadow-xs cursor-pointer active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Project Brief & Contact Information Form */}
          <form
            onSubmit={handleFormSubmit}
            className="dark:bg-[#231f1c] bg-white border dark:border-[#38312b] border-[#e8dfd5] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm space-y-3.5 sm:space-y-4"
          >
            <h3 className="text-sm sm:text-base font-bold dark:text-amber-100 text-stone-900 font-display flex items-center gap-2 mb-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-400 text-stone-950 text-xs flex items-center justify-center font-bold shadow-xs shrink-0">
                3
              </span>
              <span>{t.step3Title}</span>
            </h3>

            {formError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <CircleAlert className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                  {t.yourName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                  {t.handleLabel}
                </label>
                <input
                  type="text"
                  value={clientHandle}
                  onChange={(e) => setClientHandle(e.target.value)}
                  placeholder={t.handlePlaceholder}
                  className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                  {t.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                  {t.projectTitleLabel}
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder={t.projectTitlePlaceholder}
                  className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                {t.referenceLinksLabel}
              </label>
              <input
                type="text"
                value={referenceUrls}
                onChange={(e) => setReferenceUrls(e.target.value)}
                placeholder={t.referenceLinksPlaceholder}
                className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                {t.colorMoodLabel}
              </label>
              <input
                type="text"
                value={colorMood}
                onChange={(e) => setColorMood(e.target.value)}
                placeholder={t.colorMoodPlaceholder}
                className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold dark:text-stone-200 text-stone-800 mb-1">
                {t.notesLabel}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full dark:bg-[#1a1715] bg-[#faf7f2] border dark:border-[#38312b] border-[#eee5d8] rounded-xl sm:rounded-2xl px-3.5 py-2.5 text-base sm:text-xs dark:text-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[50px] py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-101 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{t.submitInquiry}</span>
              </button>
              <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 text-center mt-2">
                {t.submitNote}
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Sticky Order Estimate Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="dark:bg-[#231f1c] bg-white border dark:border-[#38312b] border-[#e8dfd5] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b dark:border-[#38312b] border-[#eee5d8]">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🧾</span>
                <span className="text-xs font-bold dark:text-amber-200 text-stone-900 uppercase tracking-wider font-display">
                  {t.orderEstimate}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-medium dark:text-amber-300 text-amber-800 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-300/30">
                {lang === 'ID' ? 'Pengerjaan:' : 'Turnaround:'} ~{estimatedDays}
              </span>
            </div>

            {/* Selected Package Badge */}
            <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 dark:bg-[#1a1715] bg-[#faf7f2] rounded-xl sm:rounded-2xl border dark:border-[#38312b] border-[#eee5d8]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">
                    {t.selectedPackageAndOption}
                  </div>
                  <div className="text-xs sm:text-sm font-bold dark:text-amber-100 text-stone-900 font-display">
                    {currentTier.emoji} {currentTier.name} ({currentOption.name})
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold dark:text-amber-300 text-amber-900">
                  {formatCurrency(currentOption.priceUSD, currency)}
                </div>
              </div>
            </div>

            {/* Itemized Summary */}
            <div className="mt-4 sm:mt-5 space-y-1.5 sm:space-y-2 text-xs">
              <div className="text-[10px] sm:text-[11px] font-bold dark:text-amber-300 text-stone-900 uppercase tracking-wider font-display">
                {t.itemizedSummary}
              </div>
              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1 border-b dark:border-[#38312b]/60 border-[#f0e7dc]"
                >
                  <span className="dark:text-stone-300 text-stone-700 pr-2 text-[11px] sm:text-xs">
                    {item.label}
                  </span>
                  <span className="font-mono dark:text-amber-200 text-stone-950 font-bold shrink-0 text-xs">
                    {formatCurrency(item.amount, currency)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total & Deposit Calculation */}
            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t dark:border-[#38312b] border-[#eee5d8]">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-display font-bold">
                    {t.estimatedTotal}
                  </span>
                  <span className="text-[10px] sm:text-xs dark:text-amber-400 text-amber-700 font-medium">
                    {t.deposit50} {formatCurrency(totalUSD / 2, currency)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono dark:text-amber-300 text-amber-900 tabular-nums">
                    {formatCurrency(totalUSD, currency)}
                  </div>
                </div>
              </div>
            </div>

            {/* Included highlights */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-400/10 dark:bg-amber-400/5 border border-amber-400/25 text-xs space-y-1 sm:space-y-1.5">
              <div className="font-bold dark:text-amber-200 text-stone-900 flex items-center gap-1.5 font-display text-xs">
                <span>{t.includedWithCommission}</span>
              </div>
              <ul className="dark:text-stone-300 text-stone-700 space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] leading-relaxed">
                <li>{t.includedItem1}</li>
                <li>{t.includedItem2}</li>
                <li>{t.includedItem3}</li>
              </ul>
            </div>

            {/* Copy Brief & Download Text Actions */}
            <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t dark:border-[#38312b] border-[#eee5d8] flex items-center gap-2">
              <button
                type="button"
                onClick={async () => {
                  const text = generateBriefText();
                  try {
                    await navigator.clipboard.writeText(text);
                    setCopiedSummary(true);
                    setTimeout(() => setCopiedSummary(false), 2500);
                  } catch {}
                }}
                className="flex-1 min-h-[46px] py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl dark:bg-[#2a2420] bg-[#faf7f2] hover:bg-amber-100 dark:hover:bg-[#38302a] dark:text-amber-100 text-stone-900 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border dark:border-[#423932] border-[#ded3c3] cursor-pointer active:scale-98"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {t.copied}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{t.copyForm}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const text = generateBriefText();
                  const blob = new Blob([text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Commission_Brief_${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                title={t.downloadText}
                className="min-h-[46px] min-w-[46px] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl dark:bg-[#2a2420] bg-[#faf7f2] hover:bg-amber-100 dark:hover:bg-[#38302a] text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors border dark:border-[#423932] border-[#ded3c3] cursor-pointer flex items-center justify-center active:scale-95"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
