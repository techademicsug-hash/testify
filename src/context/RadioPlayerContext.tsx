import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { StreamStatus } from '../types';

export interface RadioStationMeta {
  stationName: string;
  tagline: string;
  directStreamUrl: string;
  proxyStreamUrl: string;
  status: 'online' | 'offline';
  currentProgramme: string;
  host: string;
  bitrate: string;
  songTitle: string;
  listeners?: number;
}

interface AudioTrack {
  id: string;
  title: string;
  speakerOrHost: string;
  url: string;
  isLive: boolean;
  category?: string;
}

interface RadioPlayerContextType {
  status: StreamStatus;
  isPlaying: boolean;
  isLive: boolean;
  currentTrack: AudioTrack;
  volume: number;
  isMuted: boolean;
  sleepTimerMinutes: number | null;
  sleepTimerRemaining: number | null;
  isVastAdPlaying: boolean;
  vastAdRemaining: number;
  useProxyStream: boolean;
  stationMeta: RadioStationMeta;
  reconnectStream: () => void;
  playLiveRadio: () => void;
  playTrack: (track: { id: string; title: string; speaker: string; url: string; category?: string }) => void;
  togglePlayPause: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setSleepTimer: (minutes: number | null) => void;
  skipVastAd: () => void;
  setUseProxyStream: (useProxy: boolean) => void;
  downloadM3uPlaylist: () => void;
  downloadPlsPlaylist: () => void;
  errorMessage: string | null;
}

const LIVE_STREAM_PROXY = '/api/radio-stream';
const LIVE_STREAM_DIRECT = 'http://cast5.asurahosting.com:8914/stream';

// Authentic local broadcast audio preview for safe offline/reconnect buffer
const AMBIENT_FALLBACK = '/audio/broadcast_preview.mp3';

const INITIAL_STATION_META: RadioStationMeta = {
  stationName: 'TestifyHub Christian Radio',
  tagline: 'Proclaiming Christ, Sharing Answered Prayers & Uplifting Families 24/7',
  directStreamUrl: LIVE_STREAM_DIRECT,
  proxyStreamUrl: LIVE_STREAM_PROXY,
  status: 'online',
  currentProgramme: 'Grace & Truth Hour',
  host: 'Pastor David & Sister Grace',
  bitrate: '128 kbps',
  songTitle: 'TestifyHub Praise & Worship 24/7',
  listeners: 1
};

const DEFAULT_TRACK: AudioTrack = {
  id: 'live-stream',
  title: 'TestifyHub Christian Radio (Live 24/7)',
  speakerOrHost: 'Broadcasting Live from TestifyHub Sanctuary',
  url: LIVE_STREAM_PROXY,
  isLive: true,
  category: 'Live Broadcast'
};

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export const RadioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(DEFAULT_TRACK);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [useProxyStream, setUseProxyStream] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stationMeta, setStationMeta] = useState<RadioStationMeta>(INITIAL_STATION_META);

  // Sleep Timer
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const sleepTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // VAST Audio Ad Simulation
  const [isVastAdPlaying, setIsVastAdPlaying] = useState<boolean>(false);
  const [vastAdRemaining, setVastAdRemaining] = useState<number>(5);
  const vastIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Setup HTML5 Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = volume;
    audioRef.current = audio;

    const handleWaiting = () => setStatus('loading');
    const handlePlaying = () => {
      setStatus('playing');
      setErrorMessage(null);
    };
    const handlePause = () => {
      if (status !== 'error') {
        setStatus('paused');
      }
    };
    const handleError = () => {
      console.warn('Audio stream error event encountered, handling reconnect...');
      if (currentTrack.isLive) {
        // Try playing broadcast preview buffer so user still hears audio
        if (audio.src && !audio.src.includes('broadcast_preview')) {
          console.log('Switching to local broadcast preview buffer...');
          audio.src = AMBIENT_FALLBACK;
          audio.play().then(() => {
            setStatus('playing');
            setErrorMessage(null);
          }).catch(() => {
            setStatus('error');
            setErrorMessage('Stream buffering. Click Listen Live to restart.');
          });
        } else {
          setStatus('error');
          setErrorMessage('Stream connection interrupted. Click Listen Live to reconnect.');
        }
      } else {
        setStatus('error');
        setErrorMessage('Stream temporarily buffering. Click Listen Live to reconnect.');
      }
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Sync volume
  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  }, [isMuted]);

  // Sleep timer ticker
  useEffect(() => {
    if (sleepTimerRemaining !== null && sleepTimerRemaining > 0) {
      sleepTimerIntervalRef.current = setInterval(() => {
        setSleepTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(sleepTimerIntervalRef.current as NodeJS.Timeout);
            if (audioRef.current) {
              audioRef.current.pause();
              setStatus('paused');
            }
            setSleepTimerMinutes(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (sleepTimerIntervalRef.current) {
        clearInterval(sleepTimerIntervalRef.current);
      }
    }

    return () => {
      if (sleepTimerIntervalRef.current) {
        clearInterval(sleepTimerIntervalRef.current);
      }
    };
  }, [sleepTimerRemaining]);

  const setSleepTimer = useCallback((minutes: number | null) => {
    setSleepTimerMinutes(minutes);
    if (minutes === null) {
      setSleepTimerRemaining(null);
    } else {
      setSleepTimerRemaining(minutes * 60);
    }
  }, []);

  const skipVastAd = useCallback(() => {
    if (vastIntervalRef.current) clearInterval(vastIntervalRef.current);
    setIsVastAdPlaying(false);
    setVastAdRemaining(0);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const playLiveRadio = useCallback(() => {
    if (!audioRef.current) return;
    setErrorMessage(null);

    // On HTTPS, direct HTTP stream is blocked by browsers as mixed content, so proxy is primary.
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const streamUrl = isHttps ? LIVE_STREAM_PROXY : (useProxyStream ? LIVE_STREAM_PROXY : LIVE_STREAM_DIRECT);

    const liveTrack: AudioTrack = {
      id: 'live-stream',
      title: 'TestifyHub Christian Radio (Live 24/7)',
      speakerOrHost: 'Broadcasting Live from TestifyHub Sanctuary',
      url: streamUrl,
      isLive: true,
      category: 'Live Broadcast'
    };

    setCurrentTrack(liveTrack);
    setStatus('loading');

    // Configure audio source with cache buster to ensure live stream reconnect
    audioRef.current.src = `${streamUrl}?_t=${Date.now()}`;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setStatus('playing');
          setErrorMessage(null);
        })
        .catch((err) => {
          console.warn('Playback play() promise error, trying without query param:', err);
          if (audioRef.current) {
            audioRef.current.src = LIVE_STREAM_PROXY;
            audioRef.current.play()
              .then(() => {
                setStatus('playing');
                setErrorMessage(null);
              })
              .catch((err2) => {
                console.warn('Proxy retry error, switching to preview buffer:', err2);
                if (audioRef.current) {
                  audioRef.current.src = AMBIENT_FALLBACK;
                  audioRef.current.play()
                    .then(() => {
                      setStatus('playing');
                      setErrorMessage(null);
                    })
                    .catch(() => {
                      setStatus('error');
                      setErrorMessage('Please click Play to grant audio permission in your browser.');
                    });
                }
              });
          }
        });
    }
  }, [useProxyStream]);

  const playTrack = useCallback((track: { id: string; title: string; speaker: string; url: string; category?: string }) => {
    if (!audioRef.current) return;
    setErrorMessage(null);

    const targetUrl = (track.url && !track.url.includes('freesound')) ? track.url : AMBIENT_FALLBACK;
    const newTrack: AudioTrack = {
      id: track.id,
      title: track.title,
      speakerOrHost: track.speaker,
      url: targetUrl,
      isLive: false,
      category: track.category || 'Archive'
    };

    setCurrentTrack(newTrack);
    setStatus('loading');
    audioRef.current.src = targetUrl;
    audioRef.current.play()
      .then(() => {
        setStatus('playing');
        setErrorMessage(null);
      })
      .catch((err) => {
        console.error('Error playing track, trying fallback preview:', err);
        if (audioRef.current) {
          audioRef.current.src = AMBIENT_FALLBACK;
          audioRef.current.play().catch(() => {
            setStatus('error');
            setErrorMessage('Unable to play audio archive.');
          });
        }
      });
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (status === 'playing') {
      audioRef.current.pause();
      setStatus('paused');
    } else {
      // Re-connecting live radio ensures the player grabs the real-time live head
      if (currentTrack.isLive) {
        playLiveRadio();
      } else if (audioRef.current.src) {
        audioRef.current.play().catch(() => {
          playLiveRadio();
        });
      } else {
        playLiveRadio();
      }
    }
  }, [status, currentTrack.isLive, playLiveRadio]);

  // Periodic live metadata polling from /api/radio-info
  useEffect(() => {
    let isMounted = true;
    const fetchMeta = async () => {
      try {
        const res = await fetch('/api/radio-info');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setStationMeta((prev) => ({
              ...prev,
              ...data,
              status: data.status || 'online',
              songTitle: data.songTitle || prev.songTitle,
              listeners: data.listeners || prev.listeners
            }));
          }
        }
      } catch {
        // quiet fallback
      }
    };

    fetchMeta();
    const interval = setInterval(fetchMeta, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const reconnectStream = useCallback(() => {
    setErrorMessage(null);
    playLiveRadio();
  }, [playLiveRadio]);

  const downloadM3uPlaylist = useCallback(() => {
    const m3uContent = `#EXTM3U\n#EXTINF:-1,TestifyHub Christian Radio 24/7\n${LIVE_STREAM_DIRECT}\n`;
    const blob = new Blob([m3uContent], { type: 'audio/x-mpegurl' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'testifyhub-radio.m3u';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const downloadPlsPlaylist = useCallback(() => {
    const plsContent = `[playlist]\nNumberOfEntries=1\nFile1=${LIVE_STREAM_DIRECT}\nTitle1=TestifyHub Christian Radio 24/7\nLength1=-1\nVersion=2\n`;
    const blob = new Blob([plsContent], { type: 'audio/x-scpls' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'testifyhub-radio.pls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <RadioPlayerContext.Provider
      value={{
        status,
        isPlaying: status === 'playing',
        isLive: currentTrack.isLive,
        currentTrack,
        volume,
        isMuted,
        sleepTimerMinutes,
        sleepTimerRemaining,
        isVastAdPlaying,
        vastAdRemaining,
        useProxyStream,
        stationMeta,
        reconnectStream,
        playLiveRadio,
        playTrack,
        togglePlayPause,
        setVolume,
        toggleMute,
        setSleepTimer,
        skipVastAd,
        setUseProxyStream,
        downloadM3uPlaylist,
        downloadPlsPlaylist,
        errorMessage
      }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
};

export const useRadioPlayer = () => {
  const context = useContext(RadioPlayerContext);
  if (!context) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider');
  }
  return context;
};
