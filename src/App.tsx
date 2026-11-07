import { useEffect, useState } from 'react';
import { CalculatorSection } from './components/CalculatorSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Navbar } from './components/Navbar';
import { ResetHomeButton } from './components/ResetHomeButton';
import { SuccessModal } from './components/SuccessModal';
import { TiersSection } from './components/TiersSection';
import { WorkflowTermsSection } from './components/WorkflowTermsSection';
import { CurrencyCode, OrderInquiry } from './types';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [isDark, setIsDark] = useState(true);
  const [selectedTierId, setSelectedTierId] = useState('full-panel');
  const [orderModal, setOrderModal] = useState<OrderInquiry | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

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
        onCurrencyChange={setCurrency}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onBookCommission={() => handleOpenCalculator()}
      />
      <main>
        <Hero
          currency={currency}
          onOpenCalculator={() => handleOpenCalculator()}
          onViewTiers={() => {
            const el = document.getElementById('tiers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <TiersSection
          currency={currency}
          onSelectTier={(tierId) => setSelectedTierId(tierId)}
        />
        <CalculatorSection
          currency={currency}
          selectedTierId={selectedTierId}
          onSelectTier={setSelectedTierId}
          onSubmitSuccess={(order) => setOrderModal(order)}
        />
        <WorkflowTermsSection />
      </main>
      <Footer />
      <MobileBottomBar
        currency={currency}
        onOpenCalculator={() => handleOpenCalculator()}
      />
      <ResetHomeButton />
      <SuccessModal order={orderModal} onClose={() => setOrderModal(null)} />
    </div>
  );
}
