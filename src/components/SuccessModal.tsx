import React, { useState } from 'react';
import { Check, CircleCheck, Copy, X } from 'lucide-react';
import { artistProfile, formatCurrency } from '../data/commissionData';
import { getTranslation } from '../data/translations';
import { Language, OrderInquiry } from '../types';

interface SuccessModalProps {
  order: OrderInquiry | null;
  lang?: Language;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  order,
  lang = 'EN',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslation(lang);

  if (!order) return null;

  const copySummary = async () => {
    const text = `Commission Inquiry [${order.orderId}]
• Client: ${order.clientName} (${order.clientHandle || 'No handle'})
• Service: ${order.tier.name}
• Estimated Total: ${formatCurrency(order.totalUSD, order.currency)}
• Estimated Turnaround: ~${order.estimatedDays}
• Email: ${order.clientEmail}
• Color/Mood Direction: ${order.colorMood}
• Notes: ${order.notes || 'None'}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 dark:bg-black/80 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="relative max-w-lg w-full max-h-[94vh] overflow-y-auto dark:bg-[#201c19] bg-white border dark:border-[#382f2a] border-amber-300 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl dark:bg-[#2a2420] bg-stone-100 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer border dark:border-[#382f2a] border-stone-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot & Title */}
        <div className="text-center pb-4 sm:pb-6 border-b dark:border-[#2e2722] border-stone-200">
          <div className="relative inline-block mb-2 sm:mb-3">
            <img
              src={artistProfile.logoImage}
              alt="Duck Mascot"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 sm:py-1 rounded-full border border-emerald-300/40 mb-1.5 sm:mb-2">
            <CircleCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Inquiry Received Successfully</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold dark:text-[#fdf9f3] text-stone-900 font-display">
            Reference #{order.orderId}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5 sm:mt-1">
            Logged on {order.createdAt} · Thank you for your inquiry!
          </p>
        </div>

        {/* Order Details */}
        <div className="py-3.5 sm:py-5 space-y-2.5 sm:space-y-3.5 text-xs">
          <div className="p-3.5 sm:p-4 dark:bg-[#1a1715] bg-stone-50 rounded-xl sm:rounded-2xl border dark:border-[#2e2722] border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                Service
              </span>
              <span className="font-bold dark:text-[#fdf9f3] text-stone-900">
                {order.tier.name}
              </span>
            </div>
            {order.categoryOption && (
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 font-medium">
                  Category / Scope
                </span>
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  {order.categoryOption.name}
                </span>
              </div>
            )}
            {order.pageCount > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 font-medium">
                  Pages
                </span>
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  {order.pageCount} Pages
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                Estimated Turnaround
              </span>
              <span className="font-medium dark:text-[#fdf9f3] text-stone-900">
                ~{order.estimatedDays}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t dark:border-[#2e2722] border-stone-200">
              <span className="font-bold dark:text-[#fdf9f3] text-stone-900">
                Estimated Total
              </span>
              <span className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-300 font-mono">
                {formatCurrency(order.totalUSD, order.currency)}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="p-3 sm:p-4 dark:bg-[#28221e] bg-amber-50/70 border dark:border-[#3d332d] border-amber-200/60 rounded-xl sm:rounded-2xl space-y-1.5 sm:space-y-2">
            <div className="font-bold dark:text-amber-200 text-stone-900 text-xs">
              Next Steps:
            </div>
            <ul className="space-y-1 sm:space-y-1.5 text-stone-600 dark:text-stone-300 text-[10px] sm:text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  1.
                </span>
                <span>
                  I will review your brief and reference links within{' '}
                  <strong>24 business hours</strong>.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  2.
                </span>
                <span>
                  A 50% deposit invoice will be sent to{' '}
                  <strong className="text-stone-900 dark:text-stone-100">
                    {order.clientEmail}
                  </strong>{' '}
                  (PayPal/Stripe/Wise for USD, or BCA/QRIS for IDR).
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  3.
                </span>
                <span>
                  Once the deposit is confirmed, production starts and milestone
                  review check-ins will be shared!
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <button
            type="button"
            onClick={copySummary}
            className="py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl dark:bg-[#2a2420] bg-stone-100 hover:dark:bg-[#332b27] hover:bg-stone-200 text-stone-900 dark:text-stone-100 text-xs font-semibold transition-all flex items-center justify-center gap-2 border dark:border-[#3d332d] border-stone-300 cursor-pointer active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-500" />
                <span>Copy Summary for DMs</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 sm:py-3 px-6 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-98"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
