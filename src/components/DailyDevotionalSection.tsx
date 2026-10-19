import React, { useState } from 'react';
import { 
  BookOpen, 
  Share2, 
  Check, 
  Volume2, 
  Archive, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { Devotional } from '../types';
import { useRadioPlayer } from '../context/RadioPlayerContext';

interface DailyDevotionalSectionProps {
  devotional: Devotional;
  onOpenArchive: () => void;
}

export const DailyDevotionalSection: React.FC<DailyDevotionalSectionProps> = ({
  devotional,
  onOpenArchive
}) => {
  const { playTrack } = useRadioPlayer();
  const [copied, setCopied] = useState(false);
  const [savedToHeart, setSavedToHeart] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}#devotional`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `*TestifyHub Daily Devotional: ${devotional.title}*\n"${devotional.scriptureText}" - ${devotional.scriptureRef}\n\nRead more at TestifyHub Christian Radio: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `Today's Devotional on TestifyHub: "${devotional.title}" (${devotional.scriptureRef})`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handlePlayDevotionalAudio = () => {
    playTrack({
      id: devotional.id,
      title: `Daily Devotional: ${devotional.title}`,
      speaker: devotional.author,
      url: devotional.audioUrl || '/audio/broadcast_preview.mp3',
      category: 'Devotional Reading'
    });
  };

  return (
    <section id="devotional" className="py-16 bg-[#F8FAF8] border-t border-[#E3ECE6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E3ECE6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#025735]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Daily Spiritual Bread</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2922] mt-1 tracking-tight">
              Today’s Devotional
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenArchive}
              className="px-3.5 py-2 text-xs font-semibold text-[#025735] bg-white hover:bg-[#E6F4EE] border border-[#025735]/30 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Devotional Archive</span>
            </button>
          </div>
        </div>

        {/* Devotional Sheet Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3ECE6] shadow-sm space-y-8">
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#526057] pb-4 border-b border-[#E3ECE6]">
            <div className="flex items-center gap-2 font-medium">
              <span className="font-semibold text-[#1E2922]">{devotional.displayDate || devotional.date}</span>
              <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
              <span>Written by {devotional.author}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePlayDevotionalAudio}
                className="px-3 py-1.5 bg-[#E6F4EE] text-[#025735] hover:bg-[#d4edd0] border border-[#025735]/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Listen to audio reading of this devotional"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#025735]" />
                <span>Listen to Audio</span>
              </button>
              <button
                onClick={() => setSavedToHeart(!savedToHeart)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  savedToHeart ? 'text-[#591C99] bg-[#F3EBFA]' : 'text-[#8A9B90] hover:text-[#025735]'
                }`}
                title="Bookmark devotional"
                aria-label="Bookmark devotional"
              >
                <Heart className={`w-4 h-4 ${savedToHeart ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Devotional Headline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1E2922] leading-tight">
              {devotional.title}
            </h3>
          </div>

          {/* Scripture Box */}
          <div className="bg-[#FEF8EB] rounded-2xl p-6 border-l-4 border-[#F2B83D] my-6">
            <blockquote className="text-base sm:text-lg text-[#6A4700] italic leading-relaxed font-normal">
              "{devotional.scriptureText}"
            </blockquote>
            <cite className="block text-xs uppercase tracking-widest font-bold text-[#A66F00] mt-3 not-italic">
              {devotional.scriptureRef}
            </cite>
          </div>

          {/* Main Devotional Prose */}
          <div className="prose max-w-none text-[#2F3D34] text-base leading-relaxed space-y-4">
            {devotional.message.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "first-letter:text-4xl first-letter:font-extrabold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#025735]" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Reflection Questions */}
          {devotional.reflectionQuestions.length > 0 && (
            <div className="pt-6 border-t border-[#E3ECE6]">
              <h4 className="text-base sm:text-lg font-bold text-[#1E2922] mb-3">
                Points for Personal Reflection
              </h4>
              <ul className="space-y-2.5 text-sm text-[#3E4E44]">
                {devotional.reflectionQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#025735] font-bold text-sm shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guided Prayer Box */}
          <div className="bg-[#E6F4EE]/60 rounded-2xl p-6 border border-[#025735]/20">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#025735] mb-2">
              Guided Prayer for Today
            </h4>
            <p className="text-sm sm:text-base italic text-[#1E2922] leading-relaxed">
              "{devotional.prayerText}"
            </p>
          </div>

          {/* Share Bar */}
          <div className="pt-6 border-t border-[#E3ECE6] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#526057]">
              Share today’s spiritual encouragement with friends or family:
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleShareTwitter}
                className="px-3.5 py-2 bg-[#1E2922] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>X / Twitter</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-[#F0F5F2] text-[#1E2922] hover:bg-[#E6F4EE] border border-[#E3ECE6] rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#025735]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </article>

      </div>
    </section>
  );
};
