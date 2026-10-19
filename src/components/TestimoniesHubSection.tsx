import React, { useState } from 'react';
import { Heart, Share2, Check, PlusCircle, Quote, Flame } from 'lucide-react';
import { Testimony } from '../types';

interface TestimoniesHubSectionProps {
  testimonies: Testimony[];
  onOpenSubmitTestimony: () => void;
}

export const TestimoniesHubSection: React.FC<TestimoniesHubSectionProps> = ({
  testimonies,
  onOpenSubmitTestimony
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedIds, setLikedIds] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Healing & Health', 'Youth & Children', 'Employment & Provision', 'Family & Marriage'];

  const filtered = testimonies.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const handlePraiseClick = (id: string) => {
    setLikedIds((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleShareTestimony = (testimony: Testimony) => {
    const text = `Testimony: "${testimony.title}"\n${testimony.story}\n\nRead more stories of God's faithfulness on TestifyHub Radio: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: testimony.title,
        text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(testimony.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="testimonies-hub" className="py-16 bg-white border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E3ECE6]">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#591C99] mb-1.5">
              <span>Stories of Answered Prayer &amp; Faithfulness</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#025735] tracking-tight">
              Testimonies of God’s Grace
            </h2>
            <p className="text-[#526057] text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
              Every miracle is meant to be shared. Read real, inspiring accounts of how God answered prayers and restored lives across our global radio community.
            </p>
          </div>

          <button
            onClick={onOpenSubmitTestimony}
            className="px-5 py-3 bg-[#591C99] hover:bg-[#451379] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Testimony</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#025735] text-white shadow-2xs'
                  : 'bg-[#F0F5F2] text-[#2F3D34] hover:bg-[#E6F4EE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const extraPraises = likedIds[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E3ECE6] hover:border-[#025735]/40 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group overflow-hidden"
              >
                {/* Photo Header */}
                <div className="relative w-full h-44 bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#591C99] shadow-xs">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#025735] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                    ✓ Verified
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#526057] mb-2">
                      <span className="text-[11px] font-medium text-[#7D5300]">{item.location || 'Global Witness'}</span>
                      <span className="text-[11px]">{item.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1E2922] group-hover:text-[#025735] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#3E4E44] leading-relaxed italic line-clamp-4">
                      "{item.story}"
                    </p>
                  </div>

                  {/* Card Footer: Author and Praise Reaction */}
                  <div className="pt-4 border-t border-[#E3ECE6] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=100&q=80'}
                        alt={item.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-[#E3ECE6]"
                      />
                      <div>
                        <span className="font-bold text-[#1E2922] block leading-tight">{item.authorName}</span>
                        <span className="text-[10px] text-[#025735] font-semibold">Answered Prayer</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePraiseClick(item.id)}
                        className="px-3 py-1.5 bg-[#FEF8EB] hover:bg-[#FDE8B8] text-[#7D5300] border border-[#F2B83D]/50 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                        title="Give praise to God for this testimony"
                      >
                        <Flame className="w-3.5 h-3.5 text-[#F2B83D] fill-current" />
                        <span>Amen ({24 + extraPraises})</span>
                      </button>

                      <button
                        onClick={() => handleShareTestimony(item)}
                        className="p-1.5 text-[#526057] hover:text-[#025735] bg-white rounded-lg border border-[#E3ECE6] transition-colors cursor-pointer"
                        title="Share this story"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#025735]" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Encouragement Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#025735] to-[#591C99] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Has God Answered Your Prayer Recently?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              Don't keep the miracle to yourself. When you testify, you inspire faith in someone who is about to give up today.
            </p>
          </div>

          <button
            onClick={onOpenSubmitTestimony}
            className="px-6 py-3 bg-[#F2B83D] hover:bg-[#d99c1e] text-[#1E2922] font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm shrink-0 cursor-pointer"
          >
            Share My Praise Report
          </button>
        </div>

      </div>
    </section>
  );
};
