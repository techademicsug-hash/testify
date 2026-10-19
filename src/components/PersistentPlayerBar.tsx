import React from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronUp } from 'lucide-react';
import { useRadioPlayer } from '../context/RadioPlayerContext';

interface PersistentPlayerBarProps {
  onScrollToRadio: () => void;
}

const LOGO_URL = 'https://news.hii5media.com/wp-content/uploads/2026/10/4b048e13-5464-42ca-9ae2-f29294d1964e.jpeg';
const LOCAL_LOGO = '/src/assets/images/testifyhub_logo_trimmed.png';

export const PersistentPlayerBar: React.FC<PersistentPlayerBarProps> = ({
  onScrollToRadio
}) => {
  const {
    isPlaying,
    status,
    togglePlayPause,
    currentTrack,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    stationMeta
  } = useRadioPlayer();

  const displayTitle = currentTrack.isLive && stationMeta.songTitle
    ? stationMeta.songTitle
    : currentTrack.title;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0B2519]/95 backdrop-blur-md text-white border-t border-[#025735] py-2.5 px-4 sm:px-6 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-xl bg-[#F2B83D] hover:bg-[#d99c1e] text-[#0B2519] flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer font-bold"
            aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-[#0B2519] border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2B83D] bg-[#025735] px-1.5 py-0.5 rounded border border-[#025735]/40 shrink-0">
                {currentTrack.isLive ? 'Live 24/7' : 'Archive'}
              </span>
              <span className="text-xs font-bold text-white truncate block">
                {displayTitle}
              </span>
            </div>
            <span className="text-[11px] text-[#A6C4B2] truncate block">
              {currentTrack.isLive ? 'TestifyHub Christian Radio · 128 kbps' : currentTrack.speakerOrHost}
            </span>
          </div>
        </div>

        {/* Center / Equalizer animation */}
        <div className="hidden md:flex items-center gap-1 h-5 px-3 py-1 bg-[#025735]/60 rounded-lg border border-[#025735]/40">
          <span className={`w-1 bg-[#F2B83D] rounded-full transition-all ${isPlaying ? 'h-4 animate-[soundwave-1_0.6s_infinite]' : 'h-1.5'}`} />
          <span className={`w-1 bg-white rounded-full transition-all ${isPlaying ? 'h-5 animate-[soundwave-2_0.8s_infinite]' : 'h-1.5'}`} />
          <span className={`w-1 bg-[#591C99] rounded-full transition-all ${isPlaying ? 'h-3 animate-[soundwave-3_0.5s_infinite]' : 'h-1.5'}`} />
          <span className={`w-1 bg-[#F2B83D] rounded-full transition-all ${isPlaying ? 'h-4 animate-[soundwave-4_0.7s_infinite]' : 'h-1.5'}`} />
        </div>

        {/* Right Volume & Full Player Trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-[#A6C4B2] hover:text-white p-1 cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
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
              className="w-20 accent-[#F2B83D] h-1.5 bg-[#025735] rounded-lg cursor-pointer"
              aria-label="Volume level"
            />
          </div>

          <button
            onClick={onScrollToRadio}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0B2519] px-3 py-1.5 bg-[#F2B83D] hover:bg-[#d99c1e] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
            title="View Radio Player"
          >
            <span>Station Player</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#0B2519]" />
          </button>
        </div>

      </div>
    </div>
  );
};
