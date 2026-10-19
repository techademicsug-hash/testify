import React, { useState } from 'react';
import { X, HeartHandshake, CreditCard, ShieldCheck, Printer } from 'lucide-react';
import { DonationCampaign } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: DonationCampaign[];
  defaultCampaignId?: string;
  onProcessDonation: (amount: number, campaignId: string) => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  defaultCampaignId,
  onProcessDonation
}) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [selectedCampaign, setSelectedCampaign] = useState<string>(defaultCampaignId || 'general');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');

  // Donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedication, setDedication] = useState('');

  // Receipt state
  const [receipt, setReceipt] = useState<{
    id: string;
    amount: number;
    frequency: string;
    date: string;
    name: string;
    campaign: string;
  } | null>(null);

  if (!isOpen) return null;

  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;

    onProcessDonation(effectiveAmount, selectedCampaign);

    const targetCamp = campaigns.find(c => c.id === selectedCampaign);
    const campaignTitle = targetCamp ? targetCamp.title : 'TestifyHub General Broadcast & Prayer Ministry';
    const donor = donorName.trim() || 'Faithful Partner';
    const freqLabel = frequency === 'monthly' ? 'Monthly Partner' : 'One-Time Seed';

    // Send pledge & details to WhatsApp +256784264941
    const whatsappText = `*TestifyHub Radio - Ministry Partnership & Giving*\n` +
      `👤 *Partner Name:* ${donor}\n` +
      `📧 *Email:* ${donorEmail.trim() || 'Not specified'}\n` +
      `💰 *Amount:* $${effectiveAmount.toFixed(2)} (${freqLabel})\n` +
      `🎯 *Ministry Area:* ${campaignTitle}\n` +
      (dedication.trim() ? `🕊️ *Dedication / Prayer Request:* ${dedication.trim()}\n` : '') +
      `\nHello TestifyHub, I have submitted my partnership gift and wish to connect with your finance team on WhatsApp.`;

    const waUrl = `https://wa.me/256784264941?text=${encodeURIComponent(whatsappText)}`;
    try {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = waUrl;
    }

    setReceipt({
      id: `TH-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: effectiveAmount,
      frequency: frequency === 'monthly' ? 'Monthly Recurring' : 'One-Time Gift',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      name: donor,
      campaign: campaignTitle
    });
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleClose = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E3ECE6] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3ECE6] bg-[#F8FAF8]">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-[#025735]" />
            <div>
              <h2 className="text-xl font-bold text-[#1E2922] leading-tight">
                {receipt ? 'Tax-Deductible Donation Receipt' : 'Partner with TestifyHub Radio'}
              </h2>
              <span className="text-xs text-[#526057]">
                {receipt ? 'Official Record of Ministry Support' : 'Proclaiming Christ and sharing answered prayers 24/7'}
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#8A9B90] hover:text-[#1E2922] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {receipt ? (
          /* Receipt Card */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-6 bg-[#F8FAF8] border border-[#E3ECE6] rounded-2xl space-y-4">
              <div className="flex justify-between items-start border-b border-[#E3ECE6] pb-4">
                <div>
                  <span className="text-xs text-[#526057] uppercase tracking-widest block font-medium">Receipt Number</span>
                  <span className="font-mono text-sm font-bold text-[#025735]">{receipt.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#526057] uppercase tracking-widest block font-medium">Date Issued</span>
                  <span className="text-xs text-[#1E2922] font-semibold">{receipt.date}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-[#526057]">Gift Amount:</span>
                <div className="text-3xl font-extrabold text-[#025735]">
                  ${receipt.amount.toFixed(2)} <span className="text-xs text-[#526057] font-normal">({receipt.frequency})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <span className="text-[#526057] block">Donor Name:</span>
                  <span className="font-bold text-[#1E2922]">{receipt.name}</span>
                </div>
                <div>
                  <span className="text-[#526057] block">Purpose:</span>
                  <span className="font-bold text-[#1E2922] line-clamp-1">{receipt.campaign}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3ECE6] text-[11px] text-[#526057] italic">
                Thank you for your partnership in TestifyHub. May the Lord bless and multiply your seed sown for His kingdom.
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2.5 border border-[#E3ECE6] bg-white hover:bg-[#F0F5F2] text-[#1E2922] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#025735]" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-[#025735] text-white hover:bg-[#014026] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Frequency Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F0F5F2] rounded-xl">
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  frequency === 'once'
                    ? 'bg-white text-[#025735] shadow-xs'
                    : 'text-[#526057] hover:text-[#1E2922]'
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  frequency === 'monthly'
                    ? 'bg-white text-[#025735] shadow-xs'
                    : 'text-[#526057] hover:text-[#1E2922]'
                }`}
              >
                Monthly Partner
              </button>
            </div>

            {/* Campaign Selection */}
            <div>
              <label htmlFor="designation" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                Designate Gift Purpose
              </label>
              <select
                id="designation"
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
              >
                <option value="general">TestifyHub General Outreach &amp; 24/7 Broadcast</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Preset Amounts */}
            <div>
              <label className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-2">
                Select Amount (USD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setIsCustom(false);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !isCustom && amount === val
                        ? 'border-[#025735] bg-[#025735] text-white shadow-xs'
                        : 'border-[#E3ECE6] bg-[#F8FAF8] text-[#1E2922] hover:border-[#025735]/40'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isCustom
                      ? 'border-[#025735] bg-[#025735] text-white shadow-xs'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] text-[#1E2922] hover:border-[#025735]/40'
                  }`}
                >
                  Custom
                </button>
              </div>

              {isCustom && (
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#526057]">$</span>
                    <input
                      type="number"
                      min="5"
                      step="1"
                      required
                      placeholder="Enter custom gift amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 bg-white border border-[#E3ECE6] rounded-xl text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Gateway */}
            <div>
              <label className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-2">
                Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#025735] bg-[#E6F4EE] text-[#025735] font-bold'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] text-[#526057]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#025735]" />
                  <span className="text-xs block">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-[#025735] bg-[#E6F4EE] text-[#025735] font-bold'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] text-[#526057]'
                  }`}
                >
                  <span className="font-bold text-xs text-[#003087] block mb-1">PayPal</span>
                  <span className="text-xs block">PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'border-[#025735] bg-[#E6F4EE] text-[#025735] font-bold'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] text-[#526057]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#025735]" />
                  <span className="text-xs block">Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="donor-name" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  id="donor-name"
                  type="text"
                  required
                  placeholder="e.g. Brother Samuel Vance"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
                />
              </div>

              <div>
                <label htmlFor="donor-email" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                  Email (for Tax Receipt)
                </label>
                <input
                  id="donor-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
                />
              </div>
            </div>

            {/* Dedication Note */}
            <div>
              <label htmlFor="dedication" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                Gift Dedication (Optional)
              </label>
              <input
                id="dedication"
                type="text"
                placeholder="e.g. In thanksgiving for healed marriage / In memory of parents"
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
              />
            </div>

            {/* Total and Submit */}
            <div className="pt-3 border-t border-[#E3ECE6] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#526057] block">Total Contribution</span>
                <span className="text-2xl font-bold text-[#025735]">
                  ${effectiveAmount.toFixed(2)}
                  <span className="text-xs font-normal text-[#526057] ml-1">
                    {frequency === 'monthly' ? '/ month' : 'USD'}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#526057] hover:text-[#1E2922] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={effectiveAmount <= 0}
                  className="px-6 py-2.5 bg-[#025735] hover:bg-[#014026] disabled:bg-stone-300 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <span>Confirm via WhatsApp</span>
                  <span className="text-[10px] bg-[#013D25] px-1.5 py-0.5 rounded text-[#F2B83D] font-mono">+256784264941</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
