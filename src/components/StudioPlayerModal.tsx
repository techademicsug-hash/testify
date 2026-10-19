import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Calendar, 
  Radio, 
  Share2, 
  Check, 
  Download, 
  RotateCcw, 
  Wifi, 
  Sparkles,
  Headphones,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { useRadioPlayer } from '../context/RadioPlayerContext';
import { RadioProgram } from '../types';

interface StudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProgram: RadioProgram;
  onOpenSchedule: () => void;
}

const LOGO_URL = 'https://news.hii5media.com/wp-content/uploads/2026/10/4b048e13-5464-42ca-9ae2-f29294d1964e.jpeg';
const LOCAL_LOGO = '/src/assets/images/testifyhub_logo_trimmed.png';

export const StudioPlayerModal: React.FC<StudioPlayerModalProps> = ({
  isOpen,
  onClose,
  currentProgram,
  onOpenSchedule
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
    useProxyStream,
    setUseProxyStream,
    downloadM3uPlaylist,
    downloadPlsPlaylist,
    errorMessage
  } = useRadioPlayer();

  const [copied, setCopied] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);
  const [activeTab, setActiveTab] = useState<'station' | 'schedule' | 'tunein'>('station');

  if (!isOpen) return null;

  const handleCopyStream = () => {
    navigator.clipboard.writeText('http://cast5.asurahosting.com:8914/stream');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatTimerTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#0B2519] via-[#081C13] to-[#04100A] text-white rounded-3xl border border-[#025735]/60 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glowing Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#025735] via-[#F2B83D] to-[#591C99]" />

        {/* Studio Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-white/20 shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src={logoSrc}
                onError={() => setLogoSrc(LOCAL_LOGO)}
                alt="TestifyHub Studio"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-wide text-white">
                  Testify<span className="text-[#F2B83D]">Hub</span> Live Studio
                </span>
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live On Air
                </span>
              </div>
              <span className="text-xs text-[#A6C4B2] block">
                24/7 Global Christian Streaming · 128 kbps HD Stereo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyStream}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
              title="Copy Direct Audio Stream Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#F2B83D]" />}
              <span>{copied ? 'Stream URL Copied' : 'Share Stream'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close Studio Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Main Workspace */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Visual Showcase: Turntable Console & Dynamic Wave Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/40 rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            
            {/* Background Ambient Aura */}
            <div className={`absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
              isPlaying ? 'bg-[#025735]/40 opacity-100' : 'bg-transparent opacity-0'
            }`} />
            <div className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
              isPlaying ? 'bg-[#591C99]/30 opacity-100' : 'bg-transparent opacity-0'
            }`} />

            {/* Left Vinyl Deck with Spinning Rings */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative group">
                {/* Glow ring */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 blur-xl ${
                  isPlaying ? 'bg-gradient-to-tr from-[#025735] via-[#F2B83D]/40 to-[#591C99] opacity-70 animate-pulse' : 'opacity-0'
                }`} />

                {/* Vinyl Record */}
                <div className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#121212] border-8 border-[#242424] shadow-2xl flex items-center justify-center relative transition-transform ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}>
                  {/* Groove rings */}
                  <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute inset-9 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute inset-15 rounded-full border border-white/5 pointer-events-none" />

                  {/* High gloss reflection highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Center Label */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FEF8EB] to-[#F2B83D] border-4 border-[#0B2519] shadow-lg flex items-center justify-center p-1 overflow-hidden z-10">
                    <img
                      src={logoSrc}
                      onError={() => setLogoSrc(LOCAL_LOGO)}
                      alt="TestifyHub Disc"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Status pill under disc */}
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#A6C4B2]">
                <Radio className="w-3.5 h-3.5 text-[#F2B83D]" />
                <span>Shoutcast v2 · 128 kbps MP3</span>
              </div>
            </div>

            {/* Right Side: Now Playing Details & Spectrum EQ */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Live Program Badge */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#F2B83D] text-[#0B2519] font-extrabold uppercase tracking-wider text-[11px]">
                  {currentProgram.category}
                </span>
                <span className="text-[#A6C4B2] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F2B83D]" />
                  {currentProgram.time}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-emerald-400 font-medium">
                  {stationMeta.listeners || 1} Listener Live
                </span>
              </div>

              {/* Program Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {currentProgram.title}
                </h3>
                <p className="text-sm text-[#A6C4B2] mt-1">
                  Hosted by <strong className="text-white">{currentProgram.host}</strong>
                </p>
              </div>

              {/* Real-time Song Title ticker */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#025735] flex items-center justify-center text-[#F2B83D] shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A6C4B2] block">
                    Now Broadcasting:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                    {stationMeta.songTitle || 'TestifyHub Praise & Worship 24/7'}
                  </span>
                </div>
              </div>

              {/* Multi-Band Dynamic Equalizer Spectrum */}
              <div className="pt-2">
                <div className="flex items-end gap-1.5 h-12 p-2 bg-black/60 rounded-xl border border-white/10">
                  {[
                    { h: '60%', anim: 'soundwave-1', dur: '0.6s', color: 'from-[#025735] to-emerald-400' },
                    { h: '85%', anim: 'soundwave-2', dur: '0.8s', color: 'from-[#591C99] to-purple-400' },
                    { h: '45%', anim: 'soundwave-3', dur: '0.5s', color: 'from-[#F2B83D] to-amber-300' },
                    { h: '95%', anim: 'soundwave-4', dur: '0.7s', color: 'from-[#025735] to-emerald-400' },
                    { h: '70%', anim: 'soundwave-5', dur: '0.9s', color: 'from-[#591C99] to-purple-400' },
                    { h: '55%', anim: 'soundwave-6', dur: '0.65s', color: 'from-[#F2B83D] to-amber-300' },
                    { h: '80%', anim: 'soundwave-2', dur: '0.75s', color: 'from-[#025735] to-emerald-400' },
                    { h: '65%', anim: 'soundwave-4', dur: '0.55s', color: 'from-[#591C99] to-purple-400' },
                    { h: '90%', anim: 'soundwave-1', dur: '0.85s', color: 'from-[#025735] to-emerald-400' },
                    { h: '75%', anim: 'soundwave-3', dur: '0.6s', color: 'from-[#F2B83D] to-amber-300' },
                    { h: '50%', anim: 'soundwave-5', dur: '0.7s', color: 'from-[#591C99] to-purple-400' },
                    { h: '85%', anim: 'soundwave-2', dur: '0.9s', color: 'from-[#025735] to-emerald-400' },
                  ].map((band, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t-sm bg-gradient-to-t transition-all duration-300"
                      style={{
                        height: isPlaying ? band.h : '4px',
                        background: isPlaying 
                          ? `linear-gradient(to top, #025735, #F2B83D)` 
                          : '#243b30'
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-[#A6C4B2]">
                  <span>20 Hz</span>
                  <span className="font-semibold text-[#F2B83D]">
                    {isPlaying ? 'Live Audio Head Connected' : 'Audio Suspended'}
                  </span>
                  <span>20 kHz</span>
                </div>
              </div>

            </div>

          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={reconnectStream}
                className="font-bold underline ml-3 flex items-center gap-1 cursor-pointer text-[#F2B83D]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reconnect
              </button>
            </div>
          )}

          {/* Master Transport & Audio Controls */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Left: Huge Tactile Play/Pause Trigger */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#F2B83D] to-[#E5A726] hover:from-[#f3bd4b] hover:to-[#efa824] text-[#0B2519] flex items-center justify-center shadow-lg hover:shadow-[#F2B83D]/30 transition-all active:scale-95 cursor-pointer font-black"
                  aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-3 border-[#0B2519] border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </button>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F2B83D] block">
                    {isPlaying ? 'Broadcasting Real-Time' : 'Live Stream Paused'}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {isPlaying ? 'TestifyHub Christian Radio 24/7' : 'Click Play to Stream Live'}
                  </h4>
                  <span className="text-xs text-[#A6C4B2] block">
                    http://cast5.asurahosting.com:8914/stream
                  </span>
                </div>
              </div>

              {/* Right: Volume & Fast Reconnect */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <button
                  onClick={reconnectStream}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#A6C4B2] hover:text-white transition-colors cursor-pointer"
                  title="Reconnect to stream"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 bg-black/40 px-3.5 py-2.5 rounded-xl border border-white/10">
                  <button
                    onClick={toggleMute}
                    className="text-[#A6C4B2] hover:text-white p-1 cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#F2B83D]" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 sm:w-32 accent-[#F2B83D] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                    aria-label="Volume level"
                  />
                  <span className="text-xs font-mono text-[#A6C4B2] w-8 text-right">
                    {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Utilities: Sleep Timer, Playlist Downloads, Stream Pipeline */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A6C4B2]">
              
              {/* Sleep timer */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F2B83D]" />
                <span className="font-medium text-white">Sleep Timer:</span>
                <select
                  value={sleepTimerMinutes === null ? '' : sleepTimerMinutes}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : parseInt(e.target.value);
                    setSleepTimer(val);
                  }}
                  className="bg-black/40 text-xs text-white border border-white/20 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#F2B83D] cursor-pointer"
                >
                  <option value="">Off</option>
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
                {sleepTimerRemaining !== null && (
                  <span className="font-mono text-[#F2B83D] font-bold">
                    ({formatTimerTime(sleepTimerRemaining)})
                  </span>
                )}
              </div>

              {/* Downloads & External Players */}
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadM3uPlaylist}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Download .M3U playlist for VLC / iTunes"
                >
                  <Download className="w-3.5 h-3.5 text-[#F2B83D]" />
                  <span>.M3U</span>
                </button>

                <button
                  onClick={downloadPlsPlaylist}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Download .PLS playlist for Winamp / Media Player"
                >
                  <Download className="w-3.5 h-3.5 text-[#F2B83D]" />
                  <span>.PLS</span>
                </button>

                <button
                  onClick={handleCopyStream}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#F2B83D]" />}
                  <span>{copied ? 'Copied' : 'Direct URL'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Scripture Encouragement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#025735]/40 via-[#591C99]/30 to-[#F2B83D]/20 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#F2B83D] shrink-0" />
              <p className="text-xs text-white/90 italic">
                "And they overcame him by the blood of the Lamb and by the word of their testimony..."
                <span className="not-italic font-bold text-[#F2B83D] ml-1.5">— Revelation 12:11</span>
              </p>
            </div>

            <button
              onClick={onOpenSchedule}
              className="text-xs font-semibold text-white hover:text-[#F2B83D] flex items-center gap-1 shrink-0 underline underline-offset-4 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Schedule</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
