import React, { useState } from 'react';
import { Check, CircleCheck, Copy, Mail, Send, X } from 'lucide-react';
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

  const summaryText = `Commission Inquiry [Ref #${order.orderId}]
• Client Name: ${order.clientName}
• Handle: ${order.clientHandle || 'Not provided'}
• Email: ${order.clientEmail}
• Service: ${order.tier.name}
• Category/Scope: ${order.categoryOption?.name || 'Standard'}
• Quantity: ${order.pageCount}
• Estimated Total: ${formatCurrency(order.totalUSD, order.currency)}
• Turnaround: ~${order.estimatedDays}
• Color/Mood Direction: ${order.colorMood || 'Not specified'}
• Notes: ${order.notes || 'None'}`;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleSendEmail = () => {
    const recipient = artistProfile.socials.email; // gaffterlife@gmail.com
    const subject = encodeURIComponent(
      `Commission Inquiry - ${order.tier.name} [Ref #${order.orderId}]`
    );
    const body = encodeURIComponent(
      `Hi gaffterduck,\n\nI would like to order a commission with the following details:\n\n${summaryText}\n\nLooking forward to hearing from you!`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 dark:bg-black/80 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
    >
      <div className="relative max-w-lg w-full max-h-[92vh] overflow-y-auto dark:bg-[#201c19] bg-white border dark:border-[#382f2a] border-amber-300 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-4">
        {/* Close Icon Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-xl dark:bg-[#2a2420] bg-stone-100 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer border dark:border-[#382f2a] border-stone-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Section */}
        <div className="text-center pb-4 border-b dark:border-[#2e2722] border-stone-200 space-y-2">
          <div className="relative inline-block">
            <img
              src={artistProfile.logoImage}
              alt="Duck Mascot"
              className="w-16 h-16 sm:w-18 sm:h-18 object-contain mx-auto p-1.5 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 shadow-sm"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300/40 mb-1.5 shadow-xs">
              <CircleCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {lang === 'ID'
                  ? 'Formulir Berhasil Dibuat'
                  : 'Inquiry Brief Created'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold dark:text-[#fdf9f3] text-stone-900 font-display">
              Reference #{order.orderId}
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ID' ? 'Dicatat pada' : 'Logged on'} {order.createdAt}
            </p>
          </div>
        </div>

        {/* Order Details Summary Box */}
        <div className="space-y-3">
          <div className="p-4 dark:bg-[#1a1715] bg-stone-50 rounded-2xl border dark:border-[#2e2722] border-stone-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                {lang === 'ID' ? 'Layanan' : 'Service'}
              </span>
              <span className="font-bold dark:text-[#fdf9f3] text-stone-900">
                {order.tier.name}
              </span>
            </div>
            {order.categoryOption && (
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 font-medium">
                  {lang === 'ID' ? 'Kategori / Skala' : 'Category / Scope'}
                </span>
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  {order.categoryOption.name}
                </span>
              </div>
            )}
            {order.pageCount > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-stone-500 dark:text-stone-400 font-medium">
                  {lang === 'ID' ? 'Jumlah' : 'Quantity'}
                </span>
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  {order.pageCount}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-stone-500 dark:text-stone-400 font-medium">
                {lang === 'ID' ? 'Waktu Pengerjaan' : 'Estimated Turnaround'}
              </span>
              <span className="font-medium dark:text-[#fdf9f3] text-stone-900">
                ~{order.estimatedDays}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t dark:border-[#2e2722] border-stone-200">
              <span className="font-bold dark:text-[#fdf9f3] text-stone-900">
                {lang === 'ID' ? 'Total Estimasi' : 'Estimated Total'}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-amber-700 dark:text-amber-300 font-mono">
                {formatCurrency(order.totalUSD, order.currency)}
              </span>
            </div>
          </div>

          {/* Next Steps Box */}
          <div className="p-4 dark:bg-[#28221e] bg-amber-50/70 border dark:border-[#3d332d] border-amber-200/60 rounded-2xl space-y-2 text-xs">
            <div className="font-bold dark:text-amber-200 text-stone-900 text-xs font-display">
              {lang === 'ID' ? 'Langkah Selanjutnya:' : 'Next Steps:'}
            </div>
            <ul className="space-y-2 text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">
                  1.
                </span>
                <span>
                  {lang === 'ID'
                    ? 'Saya akan meninjau formulir dan tautan referensi Anda dalam '
                    : 'I will review your brief and reference links within '}
                  <strong>24 business hours</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">
                  2.
                </span>
                <span>
                  {lang === 'ID' ? (
                    <>
                      Faktur DP 50% akan dikirimkan ke{' '}
                      <strong className="text-stone-900 dark:text-stone-100">
                        {order.clientEmail}
                      </strong>{' '}
                      (PayPal/Wise untuk USD, atau Bank Rakyat Indonesia (BRImo)
                      / QRIS untuk IDR).
                    </>
                  ) : (
                    <>
                      A 50% deposit invoice will be sent to{' '}
                      <strong className="text-stone-900 dark:text-stone-100">
                        {order.clientEmail}
                      </strong>{' '}
                      (PayPal/Wise for USD, or Bank Rakyat Indonesia (BRImo) /
                      QRIS for IDR).
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">
                  3.
                </span>
                <span>
                  {lang === 'ID'
                    ? 'Setelah DP dikonfirmasi, pengerjaan komisi akan langsung dimulai!'
                    : 'Once the deposit is confirmed, production starts immediately!'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions Button Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-2">
          {/* Main Direct Email Action Button */}
          <button
            type="button"
            onClick={handleSendEmail}
            className="flex-1 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-500/20 active:scale-98"
          >
            <Mail className="w-4 h-4 fill-stone-950" />
            <span>
              {lang === 'ID'
                ? 'Kirim Email ke Artist (gaffterlife@gmail.com)'
                : 'Send Email to Artist (gaffterlife@gmail.com)'}
            </span>
          </button>

          {/* Copy Summary Button */}
          <button
            type="button"
            onClick={copySummary}
            className="py-3 px-4 rounded-2xl dark:bg-[#2a2420] bg-stone-100 hover:dark:bg-[#332b27] hover:bg-stone-200 text-stone-900 dark:text-stone-100 text-xs font-semibold transition-all flex items-center justify-center gap-2 border dark:border-[#3d332d] border-stone-300 cursor-pointer active:scale-98"
            title="Copy inquiry summary text"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-bold">
                  {lang === 'ID' ? 'Tersalin!' : 'Copied!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-500" />
                <span>{lang === 'ID' ? 'Salin Ringkasan' : 'Copy Summary'}</span>
              </>
            )}
          </button>

          {/* Done / Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-2xl dark:bg-[#25201c] bg-[#ede5db] hover:bg-[#e4dbcf] dark:hover:bg-[#302a25] dark:text-stone-200 text-stone-800 font-semibold text-xs border dark:border-[#38312b] border-[#dfd4c7] transition-all cursor-pointer active:scale-98"
          >
            {lang === 'ID' ? 'Selesai' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
