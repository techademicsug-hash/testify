import React, { useState } from 'react';
import { Radio, Menu, X, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useRadioPlayer } from '../context/RadioPlayerContext';

interface NavbarProps {
  onOpenSchedule: () => void;
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const LOGO_URL = 'https://news.hii5media.com/wp-content/uploads/2026/10/4b048e13-5464-42ca-9ae2-f29294d1964e.jpeg';
const LOCAL_LOGO = '/src/assets/images/testifyhub_logo_trimmed.png';

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
  onOpenAdmin,
  activeSection,
  setActiveSection
}) => {
  const { isPlaying, togglePlayPause } = useRadioPlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3ECE6] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Brand Wordmark & Official Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('live-radio');
              }}
              className="flex items-center gap-3 group"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-white border border-[#E3ECE6] flex items-center justify-center p-0.5 shadow-xs group-hover:border-[#025735] transition-colors">
                <img
                  src={logoSrc}
                  onError={() => setLogoSrc(LOCAL_LOGO)}
                  alt="TestifyHub Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#025735] font-sans leading-none">
                    Testify<span className="text-[#591C99]">Hub</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#FEF8EB] text-[#D99C1E] border border-[#F2B83D]/40 rounded">
                    Radio
                  </span>
                </div>
                <span className="text-[11px] text-[#526057] block mt-1 tracking-wide font-normal">
                  Stories of Grace · 24/7 Christian Broadcast
                </span>
              </div>
            </a>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#2F3D34]">
            <button
              onClick={() => scrollTo('live-radio')}
              className={`hover:text-[#025735] transition-colors whitespace-nowrap py-1 font-sans ${
                activeSection === 'live-radio' ? 'text-[#025735] font-bold border-b-2 border-[#025735]' : ''
              }`}
            >
              Listen Live
            </button>
            <button
              onClick={() => scrollTo('testimonies-hub')}
              className={`hover:text-[#025735] transition-colors whitespace-nowrap py-1 font-sans ${
                activeSection === 'testimonies-hub' ? 'text-[#025735] font-bold border-b-2 border-[#025735]' : ''
              }`}
            >
              Testimonies
            </button>
            <button
              onClick={() => scrollTo('devotional')}
              className={`hover:text-[#025735] transition-colors whitespace-nowrap py-1 font-sans ${
                activeSection === 'devotional' ? 'text-[#025735] font-bold border-b-2 border-[#025735]' : ''
              }`}
            >
              Daily Devotional
            </button>
            <button
              onClick={() => scrollTo('giving')}
              className={`hover:text-[#025735] transition-colors whitespace-nowrap py-1 font-sans ${
                activeSection === 'giving' ? 'text-[#025735] font-bold border-b-2 border-[#025735]' : ''
              }`}
            >
              Partner
            </button>
          </nav>

          {/* Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live Audio Player Action Button */}
            <button
              onClick={togglePlayPause}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shadow-xs active:scale-95 ${
                isPlaying
                  ? 'bg-[#025735] text-white hover:bg-[#014026] ring-2 ring-[#025735]/20'
                  : 'bg-[#591C99] text-white hover:bg-[#451379]'
              }`}
              title={isPlaying ? 'Pause TestifyHub stream' : 'Listen live to 24/7 TestifyHub Radio'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                    <span className="w-0.5 bg-[#F2B83D] animate-[soundwave-1_0.7s_infinite] h-full"></span>
                    <span className="w-0.5 bg-white animate-[soundwave-2_0.9s_infinite] h-2"></span>
                    <span className="w-0.5 bg-[#F2B83D] animate-[soundwave-3_0.6s_infinite] h-3"></span>
                  </div>
                  <span>On Air Now</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 text-[#F2B83D]" />
                  <span>Listen Live</span>
                </>
              )}
            </button>

            {/* Quiet Give Button */}
            <button
              onClick={onOpenDonate}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#025735] bg-[#E6F4EE] hover:bg-[#d8ecdf] rounded-lg transition-colors border border-[#025735]/20"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#025735]" />
              <span>Partner</span>
            </button>

            {/* Admin Portal Key */}
            <button
              onClick={onOpenAdmin}
              className="hidden md:flex items-center p-2 text-[#526057] hover:text-[#025735] hover:bg-[#F0F5F2] rounded-lg transition-colors"
              title="Admin CMS Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2F3D34] hover:bg-[#F0F5F2] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E3ECE6] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => scrollTo('live-radio')}
              className="text-left px-3 py-2 text-[#2F3D34] hover:bg-[#E6F4EE] hover:text-[#025735] rounded-lg"
            >
              Listen Live
            </button>
            <button
              onClick={() => scrollTo('testimonies-hub')}
              className="text-left px-3 py-2 text-[#2F3D34] hover:bg-[#E6F4EE] hover:text-[#025735] rounded-lg font-semibold"
            >
              Testimonies
            </button>
            <button
              onClick={() => scrollTo('devotional')}
              className="text-left px-3 py-2 text-[#2F3D34] hover:bg-[#E6F4EE] hover:text-[#025735] rounded-lg"
            >
              Daily Devotional
            </button>
            <button
              onClick={() => scrollTo('giving')}
              className="text-left px-3 py-2 text-[#2F3D34] hover:bg-[#E6F4EE] hover:text-[#025735] rounded-lg"
            >
              Partner
            </button>
          </div>

          <div className="pt-3 border-t border-[#E3ECE6] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#025735] hover:bg-[#014026] rounded-lg"
            >
              Support Ministry
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-[#526057] hover:text-[#025735] underline"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
