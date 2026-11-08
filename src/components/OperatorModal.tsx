import React, { useState } from 'react';
import {
  Check,
  CircleAlert,
  KeyRound,
  Lock,
  RefreshCw,
  Save,
  ShieldCheck,
  Sliders,
  Sparkles,
  Unlock,
  X,
} from 'lucide-react';
import {
  illustrationScopes,
  mangaPanelCategories,
} from '../data/commissionData';
import { CurrencyCode, Language } from '../types';

export interface OperatorConfig {
  isOpen: boolean;
  availableSlots: number;
  totalSlots: number;
  customPrices: Record<string, { priceUSD: number; priceIDR: number }>;
  operatorPin: string;
}

export const DEFAULT_OPERATOR_CONFIG: OperatorConfig = {
  isOpen: true,
  availableSlots: 7,
  totalSlots: 7,
  customPrices: {
    'full-panel': { priceUSD: 25, priceIDR: 380000 },
    'character-focused-panel': { priceUSD: 20, priceIDR: 280000 },
    'double-spread': { priceUSD: 30, priceIDR: 450000 },
    bust: { priceUSD: 20, priceIDR: 280000 },
    'half-body': { priceUSD: 25, priceIDR: 380000 },
    'full-body': { priceUSD: 30, priceIDR: 400000 },
  },
  operatorPin: '1234',
};

interface OperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: OperatorConfig;
  onSaveConfig: (newConfig: OperatorConfig) => void;
  lang: Language;
  currency: CurrencyCode;
}

export const OperatorModal: React.FC<OperatorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  lang,
}) => {
  // Authentication State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Editing State
  const [editingConfig, setEditingConfig] = useState<OperatorConfig>(config);
  const [newPin, setNewPin] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditingConfig(config);
      setPinInput('');
      setPinError('');
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === config.operatorPin) {
      setIsUnlocked(true);
      setPinError('');
      setEditingConfig(config);
    } else {
      setPinError(
        lang === 'ID'
          ? 'PIN Salah. Silakan coba lagi. (Default: 1234)'
          : 'Invalid PIN. Please try again. (Default: 1234)'
      );
    }
  };

  const handlePriceChange = (
    catId: string,
    field: 'priceUSD' | 'priceIDR',
    val: number
  ) => {
    setEditingConfig((prev) => ({
      ...prev,
      customPrices: {
        ...prev.customPrices,
        [catId]: {
          ...prev.customPrices[catId],
          [field]: Math.max(0, val),
        },
      },
    }));
  };

  const handleSave = () => {
    const updated = {
      ...editingConfig,
      operatorPin: newPin.trim() ? newPin.trim() : editingConfig.operatorPin,
    };
    onSaveConfig(updated);
    setNewPin('');
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2500);
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        lang === 'ID'
          ? 'Kembalikan semua data ke harga dan slot default asli?'
          : 'Reset all prices and slots back to default values?'
      )
    ) {
      setEditingConfig(DEFAULT_OPERATOR_CONFIG);
      onSaveConfig(DEFAULT_OPERATOR_CONFIG);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1e1a17] text-stone-100 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#362f29] bg-[#26201b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-stone-950 font-bold shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-amber-100 flex items-center gap-2">
                <span>
                  {lang === 'ID'
                    ? 'Operator Control Panel'
                    : 'Artist Operator Panel'}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono">
                  {lang === 'ID' ? 'Khusus Gaffterduck' : 'Artist Only'}
                </span>
              </h2>
              <p className="text-[11px] text-stone-400">
                {lang === 'ID'
                  ? 'Atur slot, status komisi, dan harga secara langsung'
                  : 'Manage slots, commission status, and pricing live'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#332b24] text-stone-300 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock / Security Verification View */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2 max-w-sm mx-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-stone-100 font-display">
                {lang === 'ID'
                  ? 'Verifikasi Keamanan Operator'
                  : 'Operator Passcode Verification'}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {lang === 'ID'
                  ? 'Masukkan PIN Operator 4-digit untuk mengakses menu pengaturan slot & harga. (Klien/Pengunjung biasa tidak memiliki PIN ini).'
                  : 'Enter your 4-digit Operator PIN to unlock live slot and pricing management.'}
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder={
                    lang === 'ID' ? 'Masukkan PIN (Default: 1234)' : 'Enter PIN (Default: 1234)'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#151210] border border-[#3d342c] rounded-2xl text-center font-mono text-base tracking-widest text-white focus:outline-none focus:border-amber-400 transition-colors"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 justify-center">
                  <CircleAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98 min-h-[46px]"
              >
                <Unlock className="w-4 h-4" />
                <span>
                  {lang === 'ID' ? 'Buka Akses Operator' : 'Unlock Operator Panel'}
                </span>
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-stone-500 font-mono">
                  Default PIN: <strong className="text-amber-400 font-bold">1234</strong>
                </span>
              </div>
            </div>
          </form>
        ) : (
          /* Unlocked Control Panel */
          <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Success Toast */}
            {showSuccessToast && (
              <div className="p-3 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'ID'
                    ? 'Pengaturan berhasil diperbarui dan diterapkan secara langsung ke seluruh aplikasi!'
                    : 'Settings saved and applied live across the entire commission app!'}
                </span>
              </div>
            )}

            {/* Section 1: Commission Status & Slot Control */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#251f1a] border border-[#3a3128]">
              <div className="flex items-center justify-between border-b border-[#382f28] pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200 font-mono">
                    {lang === 'ID'
                      ? '1. Status Komisi & Ketersediaan Slot'
                      : '1. Commission Status & Slot Availability'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingConfig((prev) => ({
                      ...prev,
                      isOpen: !prev.isOpen,
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    editingConfig.isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      editingConfig.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                    }`}
                  />
                  <span>
                    {editingConfig.isOpen
                      ? lang === 'ID'
                        ? '🟢 DIBUKA (OPEN)'
                        : '🟢 OPEN'
                      : lang === 'ID'
                      ? '🔴 DITUTUP (CLOSED)'
                      : '🔴 CLOSED'}
                  </span>
                </button>
              </div>

              {/* Slot Adjusters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] text-stone-400 font-medium mb-1">
                    {lang === 'ID' ? 'Slot Tersedia (Available):' : 'Available Slots:'}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingConfig((prev) => ({
                          ...prev,
                          availableSlots: Math.max(0, prev.availableSlots - 1),
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-[#171412] border border-[#3b322a] text-stone-300 hover:text-white font-bold text-base cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={editingConfig.totalSlots}
                      value={editingConfig.availableSlots}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setEditingConfig((prev) => ({
                          ...prev,
                          availableSlots: Math.min(prev.totalSlots, Math.max(0, val)),
                        }));
                      }}
                      className="w-full py-2 bg-[#14110f] border border-[#3b322a] rounded-xl text-center font-mono font-bold text-amber-300 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingConfig((prev) => ({
                          ...prev,
                          availableSlots: Math.min(
                            prev.totalSlots,
                            prev.availableSlots + 1
                          ),
                        }))
                      }
                      className="w-10 h-10 rounded-xl bg-[#171412] border border-[#3b322a] text-stone-300 hover:text-white font-bold text-base cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-400 font-medium mb-1">
                    {lang === 'ID' ? 'Total Kapasitas Slot (Max):' : 'Total Max Slots:'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={editingConfig.totalSlots}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setEditingConfig((prev) => ({
                        ...prev,
                        totalSlots: Math.max(1, val),
                      }));
                    }}
                    className="w-full py-2 px-3 bg-[#14110f] border border-[#3b322a] rounded-xl text-center font-mono font-bold text-stone-200 text-lg"
                  />
                </div>
              </div>

              {/* Slot Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[10px] text-stone-400 font-mono uppercase">
                  Quick Presets:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setEditingConfig((prev) => ({
                      ...prev,
                      isOpen: true,
                      availableSlots: prev.totalSlots,
                    }))
                  }
                  className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/30 border border-amber-400/30 text-amber-200 text-[11px] font-mono font-bold cursor-pointer"
                >
                  Full Slots ({editingConfig.totalSlots}/{editingConfig.totalSlots})
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingConfig((prev) => ({
                      ...prev,
                      isOpen: true,
                      availableSlots: Math.ceil(prev.totalSlots / 2),
                    }))
                  }
                  className="px-2.5 py-1 rounded-lg bg-[#332b24] hover:bg-[#42382f] text-stone-300 text-[11px] font-mono cursor-pointer"
                >
                  Half Slots ({Math.ceil(editingConfig.totalSlots / 2)}/{editingConfig.totalSlots})
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingConfig((prev) => ({
                      ...prev,
                      isOpen: false,
                      availableSlots: 0,
                    }))
                  }
                  className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-[11px] font-mono cursor-pointer"
                >
                  Slots Full / Closed (0/{editingConfig.totalSlots})
                </button>
              </div>
            </div>

            {/* Section 2: Live Price Customizer */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#251f1a] border border-[#3a3128]">
              <div className="flex items-center justify-between border-b border-[#382f28] pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200 font-mono">
                    {lang === 'ID'
                      ? '2. Edit Harga Komisi (USD & IDR)'
                      : '2. Custom Price List (USD & IDR)'}
                  </h3>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  Real-time Update
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-[11px] font-bold text-amber-300 font-display">
                  📖 Manga Coloring Categories
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {mangaPanelCategories.map((cat) => {
                    const price = editingConfig.customPrices[cat.id] || {
                      priceUSD: cat.priceUSD,
                      priceIDR: cat.priceIDR || 280000,
                    };
                    return (
                      <div
                        key={cat.id}
                        className="p-2.5 rounded-xl bg-[#171412] border border-[#352c25] space-y-1.5"
                      >
                        <div className="text-xs font-bold text-stone-200 truncate">
                          {cat.emoji} {cat.name}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <span className="text-[9px] text-stone-400 font-mono block">
                              USD ($)
                            </span>
                            <input
                              type="number"
                              value={price.priceUSD}
                              onChange={(e) =>
                                handlePriceChange(
                                  cat.id,
                                  'priceUSD',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full p-1.5 bg-[#0f0d0c] border border-[#3a3027] rounded-lg text-xs font-mono font-bold text-amber-300"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] text-stone-400 font-mono block">
                              IDR (Rp)
                            </span>
                            <input
                              type="number"
                              step={10000}
                              value={price.priceIDR}
                              onChange={(e) =>
                                handlePriceChange(
                                  cat.id,
                                  'priceIDR',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full p-1.5 bg-[#0f0d0c] border border-[#3a3027] rounded-lg text-xs font-mono font-bold text-amber-300"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] font-bold text-amber-300 font-display pt-2">
                  🎨 Illustration Scopes
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {illustrationScopes.map((scope) => {
                    const price = editingConfig.customPrices[scope.id] || {
                      priceUSD: scope.priceUSD,
                      priceIDR: scope.priceIDR || 280000,
                    };
                    return (
                      <div
                        key={scope.id}
                        className="p-2.5 rounded-xl bg-[#171412] border border-[#352c25] space-y-1.5"
                      >
                        <div className="text-xs font-bold text-stone-200 truncate">
                          {scope.emoji} {scope.name}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <span className="text-[9px] text-stone-400 font-mono block">
                              USD ($)
                            </span>
                            <input
                              type="number"
                              value={price.priceUSD}
                              onChange={(e) =>
                                handlePriceChange(
                                  scope.id,
                                  'priceUSD',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full p-1.5 bg-[#0f0d0c] border border-[#3a3027] rounded-lg text-xs font-mono font-bold text-amber-300"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] text-stone-400 font-mono block">
                              IDR (Rp)
                            </span>
                            <input
                              type="number"
                              step={10000}
                              value={price.priceIDR}
                              onChange={(e) =>
                                handlePriceChange(
                                  scope.id,
                                  'priceIDR',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full p-1.5 bg-[#0f0d0c] border border-[#3a3027] rounded-lg text-xs font-mono font-bold text-amber-300"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Change PIN Security */}
            <div className="p-4 rounded-2xl bg-[#251f1a] border border-[#3a3128] space-y-3">
              <div className="flex items-center gap-2 border-b border-[#382f28] pb-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200 font-mono">
                  {lang === 'ID' ? '3. Ganti PIN Keamanan Operator' : '3. Change Operator PIN'}
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  maxLength={10}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder={
                    lang === 'ID' ? 'Masukkan PIN Baru (e.g. 8888)' : 'Enter New PIN (e.g. 8888)'
                  }
                  className="w-full sm:w-1/2 p-2.5 bg-[#14110f] border border-[#3b322a] rounded-xl text-xs font-mono text-stone-100"
                />
                <span className="text-[11px] text-stone-400 font-mono">
                  Current PIN:{' '}
                  <strong className="text-amber-400 font-bold">
                    {editingConfig.operatorPin}
                  </strong>
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#352d27]">
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#2e2620] hover:bg-rose-950/80 text-rose-300 border border-[#3d332a] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ID'
                    ? 'Reset ke Harga Default'
                    : 'Reset to Original Defaults'}
                </span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-[#2c241f] text-stone-300 text-xs font-bold hover:bg-[#382f28] cursor-pointer"
                >
                  {lang === 'ID' ? 'Tutup' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {lang === 'ID' ? 'Simpan & Terapkan' : 'Save & Apply Live'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
