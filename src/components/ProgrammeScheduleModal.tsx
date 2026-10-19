import React, { useState } from 'react';
import { X, Play, Clock, Radio, Calendar } from 'lucide-react';
import { RadioProgram } from '../types';
import { useRadioPlayer } from '../context/RadioPlayerContext';

interface ProgrammeScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs: RadioProgram[];
}

const DAYS: Array<RadioProgram['day']> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const ProgrammeScheduleModal: React.FC<ProgrammeScheduleModalProps> = ({
  isOpen,
  onClose,
  programs
}) => {
  const [selectedDay, setSelectedDay] = useState<RadioProgram['day']>('Monday');
  const { playTrack, playLiveRadio } = useRadioPlayer();

  if (!isOpen) return null;

  const filteredPrograms = programs.filter(
    (p) => p.day === selectedDay || (selectedDay !== 'Monday' && p.day === 'Monday' && programs.filter(x => x.day === selectedDay).length === 0)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E3ECE6] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3ECE6] bg-[#F8FAF8]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#025735]" />
            <div>
              <h2 className="text-xl font-bold text-[#1E2922] leading-tight">
                TestifyHub Broadcast Schedule
              </h2>
              <span className="text-xs text-[#526057]">
                Weekly radio schedule across preaching, worship, family &amp; testimonies
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A9B90] hover:text-[#1E2922] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close schedule modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Selector Segmented Bar */}
        <div className="px-6 pt-3 pb-2 bg-[#F8FAF8] border-b border-[#E3ECE6]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {DAYS.map((day) => {
              const count = programs.filter(p => p.day === day).length;
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#025735] text-white shadow-2xs'
                      : 'text-[#2F3D34] hover:bg-[#E6F4EE]'
                  }`}
                >
                  <span>{day}</span>
                  {count > 0 && (
                    <span className={`ml-1 text-[10px] ${isActive ? 'text-[#F2B83D]' : 'text-[#8A9B90]'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programme List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {filteredPrograms.length === 0 ? (
            <div className="py-12 text-center text-[#526057] text-sm">
              <p>Continuous Christian Praise, Scripture &amp; Testimonies broadcast on this day.</p>
              <button
                onClick={() => {
                  playLiveRadio();
                  onClose();
                }}
                className="mt-4 px-5 py-2.5 bg-[#025735] text-white rounded-xl text-xs font-bold hover:bg-[#014026] cursor-pointer"
              >
                Tune In to Live Stream Now
              </button>
            </div>
          ) : (
            filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className={`p-4 rounded-2xl border transition-all ${
                  prog.isLiveNow
                    ? 'bg-[#E6F4EE] border-[#025735]/40 shadow-xs'
                    : 'bg-[#F8FAF8] border-[#E3ECE6] hover:border-[#025735]/40'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#526057]">
                      <span className="font-bold text-[#591C99] bg-[#F3EBFA] px-2.5 py-0.5 rounded-md text-[11px]">{prog.category}</span>
                      {prog.isLiveNow && (
                        <>
                          <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
                          <span className="text-[#025735] font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#025735] animate-pulse"></span>
                            Currently on Air
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-base font-bold text-[#1E2922]">
                      {prog.title}
                    </h3>
                    
                    <p className="text-xs text-[#526057] pt-1 leading-relaxed max-w-xl">
                      {prog.description}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    {prog.isLiveNow ? (
                      <button
                        onClick={() => {
                          playLiveRadio();
                          onClose();
                        }}
                        className="px-4 py-2 bg-[#025735] text-white hover:bg-[#014026] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                      >
                        <Radio className="w-3.5 h-3.5 text-[#F2B83D]" />
                        <span>Listen Live</span>
                      </button>
                    ) : prog.audioArchiveUrl ? (
                      <button
                        onClick={() => {
                          playTrack({
                            id: prog.id,
                            title: prog.title,
                            speaker: prog.host,
                            url: prog.audioArchiveUrl!,
                            category: prog.category
                          });
                          onClose();
                        }}
                        className="px-3.5 py-1.5 bg-white hover:bg-[#E6F4EE] text-[#025735] border border-[#025735]/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Play Archive</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#8A9B90] italic">
                        Air Broadcast Only
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAF8] border-t border-[#E3ECE6] flex flex-wrap items-center justify-between gap-4 text-xs text-[#526057]">
          <span>Times shown in Central Broadcast Time (UTC+0 / GMT).</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#025735] text-white font-bold rounded-xl hover:bg-[#014026] transition-colors cursor-pointer"
          >
            Close Schedule
          </button>
        </div>

      </div>
    </div>
  );
};
