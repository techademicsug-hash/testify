import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Calendar,
  Share2, 
  Check, 
  RotateCcw, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  HeartHandshake
} from 'lucide-react';
import { useRadioPlayer } from '../context/RadioPlayerContext';
import { RadioProgram } from '../types';

interface LiveRadioHeroProps {
  onOpenSchedule: () => void;
  onOpenSubmitTestimony: () => void;
  onOpenSubmitPrayer: () => void;
  currentProgram: RadioProgram;
}

const LOGO_URL = 'https://news.hii5media.com/wp-content/uploads/2026/10/4b048e13-5464-42ca-9ae2-f29294d1964e.jpeg';
const LOCAL_LOGO = '/src/assets/images/testifyhub_logo_trimmed.png';

interface HeroSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
  ctaText: string;
  ctaAction: 'play' | 'testimony' | 'prayer' | 'devotional';
  secondaryText?: string;
  secondaryAction?: 'testimony' | 'prayer' | 'schedule';
  accentGradient: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Christian Digital Broadcast 24/7',
    badgeColor: 'bg-[#E6F4EE] text-[#025735] border-[#025735]/20',
    title: 'Proclaiming Christ, Grace & Truth',
    highlightWord: 'to the Nations',
    subtitle: 'Stream anointed worship, non-stop expository Bible teaching, and uplifting testimonies straight into your heart, vehicle, and home.',
    scripture: 'Enter his gates with thanksgiving, and his courts with praise! Give thanks to him; bless his name!',
    scriptureRef: 'Psalm 100:4',
    ctaText: 'Tune In Live (24/7)',
    ctaAction: 'play',
    secondaryText: 'Share a Testimony',
    secondaryAction: 'testimony',
    accentGradient: 'from-[#025735]/10 via-[#F2B83D]/10 to-transparent'
  },
  {
    id: 'slide-2',
    badge: 'Miracles & Answered Prayers',
    badgeColor: 'bg-[#F3EBFA] text-[#591C99] border-[#591C99]/20',
    title: 'Every Voice Becomes a Living',
    highlightWord: 'Testimony',
    subtitle: 'Real believers, genuine breakthroughs, and glorious reports of healing, supernatural provision, and life transformation in Christ Jesus.',
    scripture: 'And they overcame him by the blood of the Lamb and by the word of their testimony...',
    scriptureRef: 'Revelation 12:11',
    ctaText: 'Submit Your Testimony',
    ctaAction: 'testimony',
    secondaryText: 'Request Prayer Support',
    secondaryAction: 'prayer',
    accentGradient: 'from-[#591C99]/10 via-[#025735]/10 to-transparent'
  },
  {
    id: 'slide-3',
    badge: 'United Altar of Intercession',
    badgeColor: 'bg-[#FEF8EB] text-[#7D5300] border-[#F2B83D]/30',
    title: 'Standing in the Gap for Your',
    highlightWord: 'Family & Life',
    subtitle: 'You are never alone. Join our global fellowship of praying intercessors. Send your prayer petition to our pastoral team today.',
    scripture: 'The prayer of a righteous person has great power as it is working.',
    scriptureRef: 'James 5:16',
    ctaText: 'Submit Prayer Petition',
    ctaAction: 'prayer',
    secondaryText: 'View 7-Day Schedule',
    secondaryAction: 'schedule',
    accentGradient: 'from-[#F2B83D]/15 via-[#025735]/10 to-transparent'
  },
  {
    id: 'slide-4',
    badge: 'Daily Spiritual Bread',
    badgeColor: 'bg-[#E6F4EE] text-[#025735] border-[#025735]/20',
    title: 'Daily Devotions Renewed',
    highlightWord: 'Every Morning',
    subtitle: 'Root your days in God’s holy Word. Discover daily morning reflections, biblical wisdom, and prayers crafted for daily walk.',
    scripture: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.',
    scriptureRef: 'Lamentations 3:22-23',
    ctaText: 'Today’s Devotional',
    ctaAction: 'devotional',
    secondaryText: 'Listen Live 24/7',
    secondaryAction: 'schedule',
    accentGradient: 'from-[#025735]/10 via-[#591C99]/10 to-transparent'
  }
];

export const LiveRadioHero: React.FC<LiveRadioHeroProps> = ({
  onOpenSchedule,
  onOpenSubmitTestimony,
  onOpenSubmitPrayer,
  currentProgram
}) => {
  const {
    isPlaying,
    status,
    togglePlayPause,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    sleepTimerMinutes,
    sleepTimerRemaining,
    setSleepTimer,
    stationMeta,
    reconnectStream,
    errorMessage
  } = useRadioPlayer();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);
  const [copied, setCopied] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance slides every 6 seconds unless paused by hover
  useEffect(() => {
    if (isPausedByUser) return;
    slideTimerRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, [currentSlideIndex, isPausedByUser]);

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleCopyStream = () => {
    navigator.clipboard.writeText('http://cast5.asurahosting.com:8914/stream');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const formatTimerTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handleCtaClick = (action: HeroSlide['ctaAction']) => {
    switch (action) {
      case 'play':
        togglePlayPause();
        break;
      case 'testimony':
        onOpenSubmitTestimony();
        break;
      case 'prayer':
        onOpenSubmitPrayer();
        break;
      case 'devotional':
        {
          const el = document.getElementById('devotional');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        break;
    }
  };

  const handleSecondaryClick = (action?: HeroSlide['secondaryAction']) => {
    if (!action) return;
    switch (action) {
      case 'testimony':
        onOpenSubmitTestimony();
        break;
      case 'prayer':
        onOpenSubmitPrayer();
        break;
      case 'schedule':
        onOpenSchedule();
        break;
    }
  };

  return (
    <section id="live-radio" className="relative pt-6 pb-14 lg:pt-8 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#F2F7F4] via-[#F8FAF8] to-white">
      
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#025735]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#591C99]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#F2B83D]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Visual Slider Carousel (7 cols) */}
          <div 
            className="lg:col-span-7 relative"
            onMouseEnter={() => setIsPausedByUser(true)}
            onMouseLeave={() => setIsPausedByUser(false)}
          >
            {/* Slide Container Card with subtle shadow & border */}
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E3ECE6] shadow-lg overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Background gradient for active slide */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.accentGradient} pointer-events-none -z-10 transition-all duration-700`} />

              {/* Top Bar inside Slide: Logo, Badge & Slide Index */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white border border-[#E3ECE6] p-1 shadow-xs flex items-center justify-center shrink-0">
                    <img
                      src={logoSrc}
                      onError={() => setLogoSrc(LOCAL_LOGO)}
                      alt="TestifyHub Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#591C99] block">
                      Christian Digital Media
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#025735] tracking-tight leading-none">
                      Testify<span className="text-[#591C99]">Hub</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentSlide.badgeColor}`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{currentSlide.badge}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8A9B90] bg-[#F8FAF8] px-2 py-0.5 rounded-md border border-[#E3ECE6]">
                    0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>
              </div>

              {/* Main Slide Content with smooth transition */}
              <div className="py-6 space-y-4 transition-all duration-500 key={currentSlide.id}">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E2922] tracking-tight leading-[1.15]">
                  {currentSlide.title}{' '}
                  <span className="text-[#025735] underline decoration-[#F2B83D] decoration-4 underline-offset-4">
                    {currentSlide.highlightWord}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-[#526057] leading-relaxed max-w-2xl">
                  {currentSlide.subtitle}
                </p>

                {/* Scripture Highlight Box */}
                <blockquote className="p-3.5 bg-[#FEF8EB] border-l-4 border-[#F2B83D] rounded-r-xl text-xs sm:text-sm text-[#7D5300] italic leading-relaxed">
                  "{currentSlide.scripture}"
                  <span className="block not-italic font-bold text-[#A66F00] mt-1">
                    — {currentSlide.scriptureRef}
                  </span>
                </blockquote>
              </div>

              {/* Slide Actions & Navigation Buttons */}
              <div className="pt-2 border-t border-[#E3ECE6] flex flex-wrap items-center justify-between gap-4">
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleCtaClick(currentSlide.ctaAction)}
                    className="px-6 py-3 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    {currentSlide.ctaAction === 'play' ? (
                      status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>Pause Radio</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>{currentSlide.ctaText}</span>
                        </>
                      )
                    ) : (
                      <>
                        <HeartHandshake className="w-4 h-4 text-[#F2B83D]" />
                        <span>{currentSlide.ctaText}</span>
                      </>
                    )}
                  </button>

                  {currentSlide.secondaryText && (
                    <button
                      onClick={() => handleSecondaryClick(currentSlide.secondaryAction)}
                      className="px-5 py-3 bg-[#F0F5F2] hover:bg-[#E6F4EE] text-[#025735] border border-[#025735]/20 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      {currentSlide.secondaryText}
                    </button>
                  )}
                </div>

                {/* Slider Nav Controls: Dots and Prev / Next */}
                <div className="flex items-center gap-3">
                  {/* Dots */}
                  <div className="flex items-center gap-1.5">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentSlideIndex 
                            ? 'w-6 bg-[#025735]' 
                            : 'w-2 bg-[#c7d6cd] hover:bg-[#025735]/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPrevSlide}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-[#E6F4EE] border border-[#E3ECE6] text-[#2F3D34] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNextSlide}
                      className="w-8 h-8 rounded-lg bg-white hover:bg-[#E6F4EE] border border-[#E3ECE6] text-[#2F3D34] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Master Interactive Radio Player Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E3ECE6] shadow-xl overflow-hidden">
              
              {/* Decorative top accent gradient line */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#025735] via-[#591C99] to-[#F2B83D]" />

              {/* Status Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#025735]"></span>
                    {isPlaying && (
                      <span className="absolute w-5 h-5 rounded-full bg-[#025735]/40 animate-pulse-ring"></span>
                    )}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#025735]">
                    {isPlaying ? 'Live on Air Now' : status === 'loading' ? 'Connecting Stream...' : 'TestifyHub Radio 24/7'}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-[#025735] px-2.5 py-1 bg-[#E6F4EE] rounded-full border border-[#025735]/20">
                  HD 128 KBPS
                </span>
              </div>

              {/* Central Vinyl Player Animation Area */}
              <div className="flex flex-col sm:flex-row items-center gap-5 my-5 p-4 sm:p-5 bg-gradient-to-br from-[#F2F7F4] to-[#F8FAF8] rounded-2xl border border-[#E3ECE6]">
                
                {/* Vinyl Record Disc with Center Logo Emblem */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1A1A1A] border-4 border-[#333333] shadow-lg flex items-center justify-center relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    {/* Vinyl Grooves */}
                    <div className="absolute inset-2 rounded-full border border-[#2D2D2D]"></div>
                    <div className="absolute inset-4 rounded-full border border-[#262626]"></div>
                    <div className="absolute inset-6 rounded-full border border-[#303030]"></div>

                    {/* Center Label with TestifyHub Logo */}
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#F2B83D] flex items-center justify-center overflow-hidden p-0.5 shadow-sm">
                      <img
                        src={logoSrc}
                        onError={() => setLogoSrc(LOCAL_LOGO)}
                        alt="TestifyHub Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Pulsing glow ring when active */}
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-full bg-[#025735]/15 blur-md -z-10 animate-pulse"></div>
                  )}
                </div>

                {/* Show Details and Equalizer */}
                <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
                  <span className="text-[11px] font-bold text-[#591C99] uppercase tracking-wider block">
                    {currentProgram.category} · On Air
                  </span>
                  
                  <h3 className="text-base sm:text-lg font-bold text-[#1E2922] leading-snug truncate">
                    {currentProgram.title}
                  </h3>

                  <p className="text-xs text-[#526057] line-clamp-2">
                    {currentProgram.description || 'Christ-exalting praise, Scripture reflections & testimonies of God’s grace.'}
                  </p>

                  {/* Real-time Song Title ticker */}
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#025735] font-semibold bg-[#E6F4EE] px-2.5 py-1 rounded-lg border border-[#025735]/15 truncate">
                    <Headphones className="w-3.5 h-3.5 shrink-0 text-[#025735]" />
                    <span className="truncate">
                      {stationMeta.songTitle || 'TestifyHub Praise & Worship 24/7'}
                    </span>
                  </div>

                  {/* Audio Equalizer Spectrum Bar */}
                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-1 h-7">
                    {[
                      { anim: 'soundwave-1', dur: '0.6s', color: 'bg-[#025735]' },
                      { anim: 'soundwave-2', dur: '0.8s', color: 'bg-[#591C99]' },
                      { anim: 'soundwave-3', dur: '0.5s', color: 'bg-[#F2B83D]' },
                      { anim: 'soundwave-4', dur: '0.7s', color: 'bg-[#025735]' },
                      { anim: 'soundwave-5', dur: '0.9s', color: 'bg-[#591C99]' },
                      { anim: 'soundwave-6', dur: '0.65s', color: 'bg-[#F2B83D]' },
                      { anim: 'soundwave-2', dur: '0.75s', color: 'bg-[#025735]' },
                      { anim: 'soundwave-4', dur: '0.55s', color: 'bg-[#591C99]' }
                    ].map((bar, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 rounded-full transition-all duration-300 ${bar.color} ${
                          isPlaying ? `animate-[${bar.anim}_${bar.dur}_infinite]` : 'h-1.5 opacity-40'
                        }`}
                        style={{
                          height: isPlaying ? undefined : '5px'
                        }}
                      />
                    ))}
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-[#526057]">
                      {isPlaying ? `${stationMeta.bitrate || '128 kbps'} HD` : 'Ready to Stream'}
                    </span>
                  </div>

                </div>

              </div>

              {/* Error Alert if any */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-[#FEF8EB] border border-[#F2B83D] rounded-xl text-xs text-[#7D5300] flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <button
                    onClick={reconnectStream}
                    className="font-bold underline ml-2 cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retry
                  </button>
                </div>
              )}

              {/* Master Audio Controls Bar */}
              <div className="space-y-4 pt-1">
                
                {/* Main Action Bar */}
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Big Play / Pause button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="w-13 h-13 rounded-2xl bg-[#025735] hover:bg-[#014026] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                      aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <div>
                      <span className="text-[11px] font-semibold text-[#526057] block">
                        Broadcast Audio
                      </span>
                      <span className="text-sm font-bold text-[#1E2922]">
                        {isPlaying ? 'Playing Live Broadcast' : 'Click to Play'}
                      </span>
                    </div>
                  </div>

                  {/* Volume Slider with Mute Button */}
                  <div className="flex items-center gap-2 bg-[#F0F5F2] px-3 py-2 rounded-xl border border-[#E3ECE6]">
                    <button
                      onClick={toggleMute}
                      className="text-[#2F3D34] hover:text-[#025735] p-1 cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#025735]" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-16 sm:w-20 accent-[#025735] cursor-pointer h-1.5 bg-[#c7d6cd] rounded-lg"
                      aria-label="Volume level"
                    />
                    <span className="text-[11px] font-mono text-[#526057] w-7 text-right">
                      {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                    </span>
                  </div>

                </div>

                {/* Secondary Utility Strip: Sleep Timer & Schedule */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-3 border-t border-[#E3ECE6] text-[#526057]">
                  
                  {/* Sleep Timer Selector */}
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#591C99]" />
                    <label htmlFor="hero-sleep-timer" className="sr-only">Sleep Timer</label>
                    <select
                      id="hero-sleep-timer"
                      value={sleepTimerMinutes === null ? '' : sleepTimerMinutes}
                      onChange={(e) => {
                        const val = e.target.value === '' ? null : parseInt(e.target.value);
                        setSleepTimer(val);
                      }}
                      className="bg-transparent text-xs text-[#2F3D34] font-medium border-none focus:ring-0 cursor-pointer hover:text-[#025735]"
                    >
                      <option value="">Timer: Off</option>
                      <option value="15">Sleep in 15m</option>
                      <option value="30">Sleep in 30m</option>
                      <option value="45">Sleep in 45m</option>
                      <option value="60">Sleep in 60m</option>
                    </select>
                    {sleepTimerRemaining !== null && (
                      <span className="font-mono text-[#025735] font-bold text-[11px]">
                        ({formatTimerTime(sleepTimerRemaining)})
                      </span>
                    )}
                  </div>

                  {/* Schedule Trigger & Stream link */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onOpenSchedule}
                      className="hover:text-[#025735] font-semibold flex items-center gap-1 text-[#2F3D34] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#025735]" />
                      <span>7-Day Schedule</span>
                    </button>

                    <button
                      onClick={handleCopyStream}
                      className="hover:text-[#025735] font-medium text-[11px] text-[#526057] flex items-center gap-1 cursor-pointer"
                      title="Direct Stream: http://cast5.asurahosting.com:8914/stream"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#025735]" /> : <Share2 className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Stream Link'}</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
