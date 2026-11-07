import React, { useState } from 'react';
import {
  ChevronDown,
  CircleCheck,
  CircleHelp,
  CircleX,
  CreditCard,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { commissionTerms, workflowSteps } from '../data/commissionData';

export const WorkflowTermsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'scope' | 'policies'>('workflow');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I provide finished lineart, or do you draw from scratch?',
      a: 'Both options are welcome. For Manga Page Coloring, i can provide your high-resolution panel. For Illustrations, I create the entire piece from initial thumbnail sketches to final coloring.',
    },
    {
      q: 'What payment methods and currencies are supported?',
      a: 'International clients can pay in USD ($) via PayPal or Wise. For clients in Indonesia, I accept IDR (Rp) via direct Bank Transfer or QRIS. Commissions require a standard 50% deposit before work begins, and the remaining 50% upon final preview approval before releasing uncompressed files.',
    },
    {
      q: 'What deliverable file formats and resolutions will I receive?',
      a: 'All completed work is delivered via a shared Google Drive link. You will receive 144 uncompressed PNG in RGB. And also a layered source files (.CLIP) are available upon request.',
    },
    {
      q: 'How are revisions and color adjustments handled?',
      a: 'Every commission includes 5 revision throughout the work and also dedicated review check-ins: Stage 1 (base color flats and general lighting mood) and Stage 2 (detailed shading and effects polish). Minor hue and lighting shifts before final approval are complimentary.',
    },
  ];

  return (
    <section
      id="terms"
      className="py-12 sm:py-18 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-2 dark:border-[#332c27] border-[#e8dfd5]"
    >
      <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold dark:bg-amber-400/15 bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-400/30 mb-2 sm:mb-3 shadow-xs">
          <span>Production Pipeline & Terms</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight dark:text-[#fdf9f3] text-stone-900 font-display">
          Workflow Pipeline & Guidelines
        </h2>
        <p className="mt-2 dark:text-stone-300 text-stone-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          A clear, predictable roadmap from your initial brief to finished
          artwork, with transparent policies on payment, revisions, and usage
          rights.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 sm:mb-12 overflow-x-auto pb-1 max-w-full">
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 dark:bg-[#25201d] bg-stone-100 border dark:border-[#38312b] border-stone-300 rounded-2xl shadow-inner shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'workflow'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
            }`}
          >
            5-Step Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scope')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'scope'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
            }`}
          >
            Accepted & Declined Themes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policies')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'policies'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                : 'dark:text-stone-300 text-stone-600 hover:dark:text-white hover:text-stone-900'
            }`}
          >
            Payment, Revisions & FAQ
          </button>
        </div>
      </div>

      {/* Tab 1: 5-Step Pipeline */}
      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.step}
              className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative hover:shadow-md hover:border-amber-400/60 transition-all group duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                    Phase {idx + 1}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold dark:text-[#fdf9f3] text-stone-900 font-display mb-1.5 sm:mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs dark:text-stone-300 text-stone-600 leading-relaxed mb-3 sm:mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t dark:border-[#2e2722] border-stone-100 text-[10px] sm:text-[11px]">
                <span className="text-stone-400 dark:text-stone-500 block font-medium">
                  Deliverable:
                </span>
                <span className="dark:text-amber-300 text-stone-800 font-semibold">
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Accepted & Declined */}
      {activeTab === 'scope' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {/* Dos */}
          <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b dark:border-[#2e2722] border-stone-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <CircleCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold dark:text-[#fdf9f3] text-stone-900 font-display">
                  Accepted Themes & Specializations
                </h3>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-normal">
                  Core creative strengths
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm dark:text-stone-300 text-stone-700">
              {commissionTerms.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Donts */}
          <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b dark:border-[#2e2722] border-stone-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-400/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <CircleX className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold dark:text-[#fdf9f3] text-stone-900 font-display">
                  Declined Themes & Boundaries
                </h3>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-normal">
                  Firm project boundaries
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm dark:text-stone-300 text-stone-700">
              {commissionTerms.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Policies & FAQ */}
      {activeTab === 'policies' && (
        <div className="space-y-4 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            {/* Payment & Deposit */}
            <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs">
              <div className="flex items-center gap-2 font-bold dark:text-[#fdf9f3] text-stone-900 text-xs sm:text-sm mb-3 sm:mb-4">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>Payment & Deposit</span>
              </div>
              <ul className="space-y-2 text-[11px] sm:text-xs dark:text-stone-300 text-stone-700">
                {commissionTerms.paymentRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Revisions */}
            <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs">
              <div className="flex items-center gap-2 font-bold dark:text-[#fdf9f3] text-stone-900 text-xs sm:text-sm mb-3 sm:mb-4">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                <span>Revisions & Milestone Reviews</span>
              </div>
              <ul className="space-y-2 text-[11px] sm:text-xs dark:text-stone-300 text-stone-700">
                {commissionTerms.revisionRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage Rights */}
            <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xs">
              <div className="flex items-center gap-2 font-bold dark:text-[#fdf9f3] text-stone-900 text-xs sm:text-sm mb-3 sm:mb-4">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Usage Rights & Copyright</span>
              </div>
              <ul className="space-y-2 text-[11px] sm:text-xs dark:text-stone-300 text-stone-700">
                {commissionTerms.copyrightRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Accordion FAQ */}
          <div className="dark:bg-[#201c19] bg-white border dark:border-[#2e2722] border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <CircleHelp className="w-5 h-5 text-amber-500" />
              <h3 className="text-base sm:text-lg font-bold dark:text-[#fdf9f3] text-stone-900 font-display">
                Frequently Asked Questions
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border dark:border-[#2e2722] border-stone-200 rounded-xl sm:rounded-2xl overflow-hidden dark:bg-[#1a1715] bg-stone-50 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 sm:p-4.5 flex items-center justify-between text-xs sm:text-sm font-semibold dark:text-[#fdf9f3] text-stone-900 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-500 transition-transform shrink-0 ml-2 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 sm:p-4.5 pt-0 text-xs sm:text-sm dark:text-stone-300 text-stone-600 border-t dark:border-[#2e2722] border-stone-200/50 leading-relaxed font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
