import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Shield, 
  Lock, 
  Check, 
  Clock, 
  Flame
} from 'lucide-react';
import { PrayerRequest } from '../types';

interface PrayerCommunitySectionProps {
  prayers: PrayerRequest[];
  onOpenSubmitPrayer: () => void;
  onOpenSubmitTestimony: () => void;
  onPrayForRequest: (id: string) => void;
}

const CATEGORIES = [
  'All Requests',
  'Healing & Health',
  'Family & Marriage',
  'Youth & Children',
  'Spiritual Growth',
  'Employment & Provision'
];

export const PrayerCommunitySection: React.FC<PrayerCommunitySectionProps> = ({
  prayers,
  onOpenSubmitPrayer,
  onOpenSubmitTestimony,
  onPrayForRequest
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Requests');
  const [justPrayedId, setJustPrayedId] = useState<string | null>(null);

  const handlePrayClick = (id: string) => {
    onPrayForRequest(id);
    setJustPrayedId(id);
    setTimeout(() => {
      setJustPrayedId(null);
    }, 2500);
  };

  const filteredPrayers = prayers.filter((p) => {
    if (p.isPrivate) return false;
    if (p.status !== 'approved') return false;
    if (selectedCategory === 'All Requests') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="prayer-wall" className="py-16 bg-[#F8FAF8] border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E3ECE6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#025735] mb-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>Intercession &amp; Fellowship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2922] tracking-tight">
              Community Prayer Wall
            </h2>
            <p className="text-[#526057] text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
              "Bear one another’s burdens, and so fulfill the law of Christ." (Galatians 6:2). Stand in the gap for brothers and sisters worldwide or submit your petition for pastoral intercession.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSubmitPrayer}
              className="px-5 py-3 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              Submit Prayer Request
            </button>
            <button
              onClick={onOpenSubmitTestimony}
              className="px-5 py-3 bg-white hover:bg-[#F0F5F2] text-[#591C99] border border-[#591C99]/30 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
            >
              Share Praise Report
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#025735] text-white shadow-2xs'
                    : 'bg-white text-[#2F3D34] hover:bg-[#E6F4EE] border border-[#E3ECE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#526057] shrink-0">
            <Shield className="w-3.5 h-3.5 text-[#025735]" />
            <span>Pastorally moderated for privacy</span>
          </div>
        </div>

        {/* Prayer Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white rounded-2xl p-6 border border-[#E3ECE6] hover:border-[#025735]/40 flex flex-col justify-between shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#526057]">
                  <span className="font-bold text-[#025735] bg-[#E6F4EE] px-2.5 py-0.5 rounded-full text-[11px]">
                    {prayer.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#8A9B90]" />
                    {prayer.createdAt}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1E2922] leading-snug">
                  {prayer.title}
                </h3>

                <p className="text-[#3E4E44] text-xs sm:text-sm leading-relaxed">
                  "{prayer.message}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E3ECE6] flex items-center justify-between">
                <span className="text-xs text-[#526057] font-medium">
                  By {prayer.isAnonymous ? 'Anonymous Believer' : prayer.authorName}
                </span>

                {/* "I Prayed for This" Button */}
                <button
                  onClick={() => handlePrayClick(prayer.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 ${
                    prayer.hasUserPrayed
                      ? 'bg-[#E6F4EE] text-[#025735] border border-[#025735]/30'
                      : 'bg-[#F0F5F2] hover:bg-[#E6F4EE] text-[#1E2922] border border-[#E3ECE6]'
                  }`}
                  title="Commit to pray for this request"
                >
                  {justPrayedId === prayer.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#025735]" />
                      <span className="text-[#025735] font-bold">Prayed!</span>
                    </>
                  ) : (
                    <>
                      <Flame className={`w-3.5 h-3.5 ${prayer.hasUserPrayed ? 'text-[#025735] fill-current' : 'text-[#8A9B90]'}`} />
                      <span>I Prayed ({prayer.prayerCount})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice about confidential pastoral prayers */}
        <div className="mt-10 p-5 bg-white border border-[#E3ECE6] rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs text-[#3E4E44] shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#591C99]" />
            <span>
              <strong>Confidential Intercession Needed?</strong> You can submit private requests visible only to our ordained pastoral prayer team.
            </span>
          </div>
          <button
            onClick={onOpenSubmitPrayer}
            className="text-[#025735] font-bold hover:underline cursor-pointer"
          >
            Submit Confidential Petition →
          </button>
        </div>

      </div>
    </section>
  );
};
