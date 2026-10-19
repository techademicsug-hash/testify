import React, { useState } from 'react';
import { X, HeartHandshake, Lock, Globe, Check, AlertCircle } from 'lucide-react';
import { PrayerRequest } from '../types';

interface SubmitPrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRequest: Omit<PrayerRequest, 'id' | 'prayerCount' | 'createdAt' | 'status'>) => void;
  onSubmitTestimony?: (testimony: { title: string; story: string; category: string; authorName: string }) => void;
  mode?: 'prayer' | 'testimony';
}

export const SubmitPrayerModal: React.FC<SubmitPrayerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSubmitTestimony,
  mode = 'prayer'
}) => {
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [category, setCategory] = useState<PrayerRequest['category']>('Healing & Health');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const senderName = isAnonymous ? 'Anonymous Believer' : authorName.trim() || 'A Grateful Believer';
    const header = mode === 'testimony' ? 'TestifyHub Praise Report / Testimony' : 'TestifyHub Prayer Petition';
    const privacyNote = mode === 'prayer' ? (isPrivate ? 'Confidential (Pastoral Team Only)' : 'Public Prayer Wall') : 'Testimony for Broadcast & Web';

    if (mode === 'testimony' && onSubmitTestimony) {
      onSubmitTestimony({
        title: title.trim(),
        story: message.trim(),
        category,
        authorName: senderName
      });
    } else {
      onSubmit({
        authorName: senderName,
        isAnonymous,
        isPrivate,
        title: title.trim(),
        message: message.trim(),
        category
      });
    }

    // Direct WhatsApp message integration to +256784264941
    const whatsappText = `*${header}*\n` +
      `👤 *From:* ${senderName}\n` +
      `🏷️ *Category:* ${category}\n` +
      `🔒 *Privacy:* ${privacyNote}\n` +
      `📌 *Title:* ${title.trim()}\n\n` +
      `📖 *Message:*\n${message.trim()}`;

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
      // Fallback
      window.location.href = waUrl;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setTitle('');
      setMessage('');
      setAuthorName('');
      setIsAnonymous(false);
      setIsPrivate(false);
    }, 2500);
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
                {mode === 'prayer' ? 'Submit a Prayer Petition' : 'Share a Praise Report / Testimony'}
              </h2>
              <span className="text-xs text-[#526057]">
                {mode === 'prayer' 
                  ? 'Our global prayer family stands with you in faith' 
                  : 'Testify of what the Lord has done to encourage others'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A9B90] hover:text-[#1E2922] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-[#E6F4EE] text-[#025735] rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E2922]">
              {mode === 'prayer' ? 'Petition Received' : 'Testimony Received!'}
            </h3>
            <p className="text-sm text-[#526057] max-w-md mx-auto">
              {mode === 'prayer'
                ? 'Thank you. Your prayer request has been received. Our prayer partners and pastoral team will be interceding for you before the throne of grace.'
                : 'Praise the Lord! Your testimony has been received. Thank you for glorifying God and inspiring faith across TestifyHub!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Privacy Selection (Only for prayers) */}
            {mode === 'prayer' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsPrivate(false)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    !isPrivate
                      ? 'border-[#025735] bg-[#E6F4EE] ring-1 ring-[#025735]'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#025735] mb-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Public Prayer Wall</span>
                  </div>
                  <p className="text-[11px] text-[#526057]">
                    Shared on the wall so believers worldwide can pray for you.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPrivate(true)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isPrivate
                      ? 'border-[#591C99] bg-[#F3EBFA] ring-1 ring-[#591C99]'
                      : 'border-[#E3ECE6] bg-[#F8FAF8] hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#591C99] mb-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confidential Pastoral</span>
                  </div>
                  <p className="text-[11px] text-[#526057]">
                    Seen only by ordained pastoral intercessors.
                  </p>
                </button>
              </div>
            )}

            {/* Category */}
            <div>
              <label htmlFor="prayer-category" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                id="prayer-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as PrayerRequest['category'])}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
              >
                <option value="Healing & Health">Healing &amp; Health</option>
                <option value="Family & Marriage">Family &amp; Marriage</option>
                <option value="Youth & Children">Youth &amp; Children</option>
                <option value="Spiritual Growth">Spiritual Growth</option>
                <option value="Employment & Provision">Employment &amp; Provision</option>
                <option value="Global Church">Global Church &amp; Missions</option>
              </select>
            </div>

            {/* Request Title */}
            <div>
              <label htmlFor="prayer-title" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                {mode === 'prayer' ? 'Summary Title' : 'Praise Report Headline'}
              </label>
              <input
                id="prayer-title"
                type="text"
                required
                placeholder={mode === 'prayer' ? "e.g. Complete healing for my mother's surgery" : "e.g. Cancer-free after 6 months of prayer!"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
              />
            </div>

            {/* Details */}
            <div>
              <label htmlFor="prayer-details" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                {mode === 'prayer' ? 'Prayer Details & Needs' : 'Your Testimony & Story'}
              </label>
              <textarea
                id="prayer-details"
                rows={4}
                required
                placeholder={mode === 'prayer' 
                  ? "Share your heart openly. Please omit sensitive confidential medical IDs or full addresses..." 
                  : "Tell us how the Lord stepped in and answered your prayer. Include the before, how you prayed, and what God did..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735] resize-none"
              />
            </div>

            {/* Name & Anonymous Checkbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              <div>
                <label htmlFor="author-name" className="block text-xs font-bold text-[#2F3D34] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  id="author-name"
                  type="text"
                  disabled={isAnonymous}
                  placeholder={isAnonymous ? 'Anonymous' : 'First Name & Initial'}
                  value={isAnonymous ? '' : authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735] disabled:bg-[#F0F5F2] disabled:text-[#8A9B90]"
                />
              </div>

              <div className="sm:pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2F3D34]">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-[#E3ECE6] text-[#025735] focus:ring-[#025735]"
                  />
                  <span>Submit Anonymously</span>
                </label>
              </div>
            </div>

            {/* WhatsApp Integration Note */}
            <div className="p-3 bg-[#E6F4EE] border border-[#025735]/20 rounded-xl text-[11px] text-[#013D25] flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#025735] shrink-0 mt-0.5" />
              <span>
                Your message is securely recorded and forwarded directly to the TestifyHub Pastoral Prayer Line on WhatsApp (<strong>+256784264941</strong>).
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#526057] hover:text-[#1E2922] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#025735] hover:bg-[#014026] text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>{mode === 'prayer' ? 'Send Petition to WhatsApp' : 'Send Testimony to WhatsApp'}</span>
                <span className="text-[10px] bg-[#013D25] px-1.5 py-0.5 rounded text-[#F2B83D] font-mono">+256784264941</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
