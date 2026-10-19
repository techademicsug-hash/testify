import React from 'react';
import { HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { DonationCampaign } from '../types';

interface DonationSectionProps {
  campaigns: DonationCampaign[];
  onOpenDonateModal: (campaignId?: string) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  campaigns,
  onOpenDonateModal
}) => {
  return (
    <section id="giving" className="py-16 bg-white border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E3ECE6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#025735] mb-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>Biblical Partnership &amp; Giving</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2922] tracking-tight">
              Support TestifyHub Ministry
            </h2>
            <p className="text-[#526057] text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
              "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7).
            </p>
          </div>

          <button
            onClick={() => onOpenDonateModal()}
            className="px-6 py-3.5 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
          >
            <span>Partner with TestifyHub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stewardship Assurance Banner */}
        <div className="mb-10 p-5 bg-[#E6F4EE]/60 rounded-2xl border border-[#025735]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#013D25]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#025735] shrink-0" />
            <span>
              <strong>Financial Integrity Pledge:</strong> TestifyHub operates under independent pastoral board oversight. All contributions directly support gospel broadcasting, prayer counseling, and children's literature.
            </span>
          </div>
          <span className="font-bold underline cursor-pointer text-[#025735]">
            Read Stewardship Covenant
          </span>
        </div>

        {/* Giving Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((camp) => {
            const percentage = Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100));
            return (
              <div
                key={camp.id}
                className="bg-[#F8FAF8] rounded-3xl p-6 sm:p-8 border border-[#E3ECE6] flex flex-col justify-between shadow-2xs hover:border-[#025735]/40 transition-all space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#526057]">
                    <span className="font-bold text-[#591C99] bg-[#F3EBFA] px-2.5 py-0.5 rounded-full text-[11px]">{camp.category}</span>
                    <span className="font-mono">{camp.donorsCount} Partners</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E2922] leading-snug">
                    {camp.title}
                  </h3>

                  <p className="text-[#526057] text-xs sm:text-sm leading-relaxed">
                    {camp.description}
                  </p>
                </div>

                {/* Progress Bar & Numbers */}
                <div className="space-y-2 pt-2 border-t border-[#E3ECE6]">
                  <div className="flex justify-between text-xs text-[#2F3D34] font-medium">
                    <span className="font-mono tabular-nums font-bold text-[#025735] text-sm">
                      ${camp.currentAmount.toLocaleString()}
                    </span>
                    <span className="font-mono tabular-nums text-[#526057]">
                      Goal: ${camp.targetAmount.toLocaleString()} ({percentage}%)
                    </span>
                  </div>

                  {/* Progress Line with brand gradient */}
                  <div className="w-full bg-[#E3ECE6] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#025735] to-[#591C99] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenDonateModal(camp.id)}
                    className="w-full py-3 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
                  >
                    <span>Support This Outreach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
