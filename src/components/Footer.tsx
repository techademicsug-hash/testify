import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart, Radio, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (tab?: 'faith' | 'privacy' | 'terms') => void;
  onOpenSchedule: () => void;
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
}

const LOGO_URL = 'https://news.hii5media.com/wp-content/uploads/2026/10/4b048e13-5464-42ca-9ae2-f29294d1964e.jpeg';
const LOCAL_LOGO = '/src/assets/images/testifyhub_logo_trimmed.png';

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onOpenSchedule,
  onOpenDonate,
  onOpenAdmin
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Send devotional subscription request to WhatsApp +256784264941
    const msg = `*TestifyHub Daily Devotional Subscription*\n` +
      `📧 *Email:* ${email.trim()}\n` +
      `Please subscribe me to receive TestifyHub daily Scripture reflections, prayer alerts, and praise reports on WhatsApp!`;

    const waUrl = `https://wa.me/256784264941?text=${encodeURIComponent(msg)}`;
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

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0B2519] text-[#E0ECE4] pt-16 pb-24 border-t border-[#025735]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#14472F]">
          
          {/* Mission & Brand */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-0.5 flex items-center justify-center overflow-hidden border border-[#E3ECE6]">
                <img
                  src={logoSrc}
                  onError={() => setLogoSrc(LOCAL_LOGO)}
                  alt="TestifyHub Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="text-2xl font-extrabold text-white block leading-none">
                  Testify<span className="text-[#F2B83D]">Hub</span>
                </span>
                <span className="text-[11px] text-[#A6C4B2] uppercase tracking-widest block mt-1">
                  Christian Online Radio &amp; Testimony Platform
                </span>
              </div>
            </div>

            <p className="text-[#A6C4B2] text-sm leading-relaxed max-w-lg">
              Dedicated to proclaiming Christ, giving voice to answered prayers, and uplifting believers 24 hours a day. We equip homes, pray for the broken, and broadcast the gospel without compromise.
            </p>

            <div className="pt-2 text-xs text-[#F2B83D] italic">
              "And they overcame him by the blood of the Lamb and by the word of their testimony..." (Revelation 12:11)
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#0E3222] p-6 sm:p-8 rounded-2xl border border-[#14472F] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F2B83D]">
              <Mail className="w-4 h-4" />
              <span>Daily Devotional &amp; Praise Reports</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Start each morning in the Word
            </h3>

            <p className="text-[#A6C4B2] text-xs sm:text-sm">
              Receive our daily morning Scripture reflection, inspiring praise reports of answered prayers, and broadcast alerts on WhatsApp (+256784264941).
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#025735] text-white rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F2B83D]" />
                <span>Grace and peace! Forwarded to WhatsApp (+256784264941) for TestifyHub reflections.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 bg-[#0B2519] border border-[#1A573A] rounded-xl text-xs text-white placeholder-[#789A84] focus:outline-none focus:ring-1 focus:ring-[#F2B83D] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe via WhatsApp</span>
                </button>
              </form>
            )}

            <span className="text-[10px] text-[#789A84] block">
              We respect your privacy. Inquiries and reflections sent to +256784264941.
            </span>
          </div>

        </div>

        {/* Navigation & Ministry Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
          
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Audio &amp; Broadcast
            </h4>
            <ul className="space-y-2 text-[#A6C4B2]">
              <li>
                <a href="#live-radio" className="hover:text-white transition-colors">Listen Live 24/7</a>
              </li>
              <li>
                <button onClick={onOpenSchedule} className="hover:text-white transition-colors text-left cursor-pointer">Programme Schedule</button>
              </li>
              <li>
                <a href="http://cast5.asurahosting.com:8914/stream" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Direct Stream Link</span>
                  <ExternalLink className="w-3 h-3 text-[#A6C4B2]" />
                </a>
              </li>
              <li>
                <a href="#devotional" className="hover:text-white transition-colors">Daily Audio Devotional</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Faith &amp; Testimony
            </h4>
            <ul className="space-y-2 text-[#A6C4B2]">
              <li>
                <a href="#testimonies-hub" className="hover:text-white transition-colors">Answered Praise Reports</a>
              </li>
              <li>
                <a href="#devotional" className="hover:text-white transition-colors">Today’s Devotional</a>
              </li>
              <li>
                <a href="#giving" className="hover:text-white transition-colors">Ministry Partnership</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Trust &amp; Governance
            </h4>
            <ul className="space-y-2 text-[#A6C4B2]">
              <li>
                <button onClick={() => onOpenPolicy('faith')} className="hover:text-white transition-colors text-left cursor-pointer">Statement of Faith</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors text-left cursor-pointer">Privacy &amp; Data Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition-colors text-left cursor-pointer">Terms of Service</button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-[#F2B83D] hover:underline transition-colors text-left font-bold cursor-pointer">Admin Portal</button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-[#14472F] flex flex-wrap items-center justify-between gap-4 text-xs text-[#789A84]">
          <div>
            © {new Date().getFullYear()} TestifyHub Christian Radio. All rights reserved. Proclaiming the gospel to the nations.
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A6C4B2]">
            <span>WhatsApp Ministry Line:</span>
            <a
              href="https://wa.me/256784264941"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F2B83D] hover:underline font-mono font-bold"
            >
              +256784264941
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
