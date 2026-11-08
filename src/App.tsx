import { useEffect, useState } from 'react';
import { CalculatorSection } from './components/CalculatorSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Navbar } from './components/Navbar';
import {
  DEFAULT_OPERATOR_CONFIG,
  OperatorConfig,
  OperatorModal,
} from './components/OperatorModal';
import { ResetHomeButton } from './components/ResetHomeButton';
import { SuccessModal } from './components/SuccessModal';
import { TiersSection } from './components/TiersSection';
import { WorkflowTermsSection } from './components/WorkflowTermsSection';
import { CurrencyCode, Language, OrderInquiry } from './types';

const OPERATOR_STORAGE_KEY = 'gaffterduck_operator_config';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [lang, setLang] = useState<Language>('EN');
  const [isDark, setIsDark] = useState(true);
  const [selectedTierId, setSelectedTierId] = useState('full-panel');
  const [orderModal, setOrderModal] = useState<OrderInquiry | null>(null);

  // Operator Mode State
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);
  const [isOperatorActive, setIsOperatorActive] = useState(() => {
    try {
      return sessionStorage.getItem('gaffterduck_operator_active') === 'true';
    } catch {
      return false;
    }
  });

  const [operatorConfig, setOperatorConfig] = useState<OperatorConfig>(() => {
    try {
      const saved = localStorage.getItem(OPERATOR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_OPERATOR_CONFIG,
          ...parsed,
          customPrices: {
            ...DEFAULT_OPERATOR_CONFIG.customPrices,
            ...(parsed.customPrices || {}),
          },
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_OPERATOR_CONFIG;
  });

  // Secret URL hash listener (#admin or #operator)
  useEffect(() => {
    const checkHash = () => {
      if (
        window.location.hash === '#admin' ||
        window.location.hash === '#operator'
      ) {
        setIsOperatorModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (newCurrency === 'IDR') {
      setLang('ID');
    } else if (newCurrency === 'USD') {
      setLang('EN');
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    if (newLang === 'ID') {
      setCurrency('IDR');
    } else if (newLang === 'EN') {
      setCurrency('USD');
    }
  };

  const handleSaveOperatorConfig = (newConfig: OperatorConfig) => {
    setOperatorConfig(newConfig);
    setIsOperatorActive(true);
    try {
      localStorage.setItem(OPERATOR_STORAGE_KEY, JSON.stringify(newConfig));
      sessionStorage.setItem('gaffterduck_operator_active', 'true');
    } catch (e) {
      console.error('Could not save operator config', e);
    }
  };

  const handleOpenCalculator = (tierId?: string) => {
    if (tierId) setSelectedTierId(tierId);
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'dark bg-[#181614] text-[#f5efe6] bg-warm-dots-dark'
          : 'bg-[#faf7f2] text-stone-900 bg-warm-dots-light'
      } transition-colors duration-200 pb-28 lg:pb-0 font-sans overflow-x-hidden`}
    >
      <Navbar
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onBookCommission={() => handleOpenCalculator()}
        operatorConfig={operatorConfig}
        onOpenOperator={() => setIsOperatorModalOpen(true)}
        isOperatorActive={isOperatorActive}
      />
      <main>
        <Hero
          currency={currency}
          lang={lang}
          onOpenCalculator={() => handleOpenCalculator()}
          onViewTiers={() => {
            const el = document.getElementById('tiers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          operatorConfig={operatorConfig}
        />
        <TiersSection
          currency={currency}
          lang={lang}
          onSelectTier={(tierId) => setSelectedTierId(tierId)}
          operatorConfig={operatorConfig}
        />
        <CalculatorSection
          currency={currency}
          lang={lang}
          selectedTierId={selectedTierId}
          onSelectTier={setSelectedTierId}
          onSubmitSuccess={(order) => setOrderModal(order)}
          operatorConfig={operatorConfig}
        />
        <WorkflowTermsSection lang={lang} />
      </main>
      <Footer
        lang={lang}
        onOpenOperator={() => setIsOperatorModalOpen(true)}
        isOperatorActive={isOperatorActive}
      />
      <MobileBottomBar
        currency={currency}
        lang={lang}
        onOpenCalculator={() => handleOpenCalculator()}
      />
      <ResetHomeButton />
      <SuccessModal
        order={orderModal}
        lang={lang}
        onClose={() => setOrderModal(null)}
      />
      <OperatorModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        config={operatorConfig}
        onSaveConfig={handleSaveOperatorConfig}
        lang={lang}
        currency={currency}
      />
    </div>
  );
}
