import React, { useState } from 'react';
import { X, Search, Calendar, ArrowRight } from 'lucide-react';
import { Devotional } from '../types';

interface DevotionalArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  devotionals: Devotional[];
  onSelectDevotional: (devotional: Devotional) => void;
}

export const DevotionalArchiveModal: React.FC<DevotionalArchiveModalProps> = ({
  isOpen,
  onClose,
  devotionals,
  onSelectDevotional
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = devotionals.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.scriptureRef.toLowerCase().includes(q) ||
      d.message.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E3ECE6] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3ECE6] bg-[#F8FAF8]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#025735]" />
            <div>
              <h2 className="text-xl font-bold text-[#1E2922] leading-tight">
                Devotional Archive
              </h2>
              <span className="text-xs text-[#526057]">
                Search previous daily readings and scripture reflections
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A9B90] hover:text-[#1E2922] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close archive modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-3 border-b border-[#E3ECE6] bg-[#F8FAF8]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A9B90] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, scripture passage, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E3ECE6] rounded-xl text-xs sm:text-sm text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
            />
          </div>
        </div>

        {/* Devotional List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#526057] text-sm">
              No devotionals found matching "{searchQuery}".
            </div>
          ) : (
            filtered.map((dev) => (
              <div
                key={dev.id}
                onClick={() => {
                  onSelectDevotional(dev);
                  onClose();
                }}
                className="p-4 bg-[#F8FAF8] hover:bg-[#E6F4EE] border border-[#E3ECE6] rounded-2xl cursor-pointer transition-all hover:border-[#025735]/40 group"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-[#526057] mb-1">
                  <span className="font-semibold text-[#1E2922]">{dev.date}</span>
                  <span className="font-bold text-[#025735]">{dev.scriptureRef}</span>
                </div>
                
                <h3 className="text-base font-bold text-[#1E2922] group-hover:text-[#025735] transition-colors">
                  {dev.title}
                </h3>
                
                <p className="text-xs text-[#526057] line-clamp-2 mt-1">
                  {dev.scriptureText}
                </p>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E3ECE6] text-[11px] text-[#526057]">
                  <span>Author: {dev.author}</span>
                  <span className="flex items-center gap-1 font-bold text-[#025735] group-hover:translate-x-0.5 transition-transform">
                    Read Devotional <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAF8] border-t border-[#E3ECE6] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#025735] text-white font-bold rounded-xl hover:bg-[#014026] text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
