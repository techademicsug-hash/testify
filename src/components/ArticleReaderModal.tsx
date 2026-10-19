import React, { useState } from 'react';
import { X, Clock, Share2, Check, User, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';

interface ArticleReaderModalProps {
  article: BlogPost | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShareWhatsApp = () => {
    const text = `*${article.title}*\n${article.excerpt}\n\nRead more at TestifyHub Christian Platform: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-4xl min-h-screen sm:min-h-0 sm:my-8 sm:rounded-3xl border border-[#E3ECE6] overflow-hidden shadow-2xl flex flex-col justify-between">
        
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E3ECE6] flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-[#025735] hover:text-[#014026] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#F0F5F2] hover:bg-[#E6F4EE] border border-[#E3ECE6] text-[#1E2922] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#025735]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8A9B90] hover:text-[#1E2922] rounded-lg ml-2 cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="p-6 sm:p-12 max-w-prose mx-auto w-full space-y-8">
          
          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#591C99] uppercase tracking-wider">
              <span>{article.category}</span>
              <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
              <span className="text-[#526057] font-normal">{article.publishedDate}</span>
              <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
              <span className="text-[#526057] font-normal flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8A9B90]" /> {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E2922] leading-tight">
              {article.title}
            </h1>

            <p className="text-[#3E4E44] text-base sm:text-lg italic leading-relaxed pt-2">
              "{article.excerpt}"
            </p>
          </div>

          {/* Hero Image */}
          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 my-6 shadow-xs">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Main Prose with Drop Cap */}
          <div className="prose max-w-none text-[#2F3D34] text-base leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:text-[#025735] leading-relaxed" : "leading-relaxed"}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Byline Card */}
          <div className="mt-12 pt-8 border-t border-[#E3ECE6] bg-[#F8FAF8] p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E6F4EE] text-[#025735] flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-[#526057] block uppercase tracking-wider font-semibold">Written by</span>
              <h4 className="text-base font-bold text-[#1E2922]">
                {article.author.name}
              </h4>
              <p className="text-xs text-[#526057] mt-0.5">
                {article.author.role} · TestifyHub Ministry Contributor
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#F8FAF8] px-6 py-4 border-t border-[#E3ECE6] flex justify-between items-center text-xs text-[#526057]">
          <span>TestifyHub Christian Journal · Truth, Grace &amp; Fellowship</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#025735] text-white font-bold rounded-xl hover:bg-[#014026] transition-colors cursor-pointer"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};
