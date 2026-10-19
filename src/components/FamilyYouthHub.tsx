import React, { useState } from 'react';
import { 
  Users, 
  Download, 
  Check, 
  ChevronRight
} from 'lucide-react';
import { MinistryResource } from '../types';

interface FamilyYouthHubProps {
  resources: MinistryResource[];
}

export const FamilyYouthHub: React.FC<FamilyYouthHubProps> = ({ resources }) => {
  const [activeAudience, setActiveAudience] = useState<'Family' | 'Youth' | 'Children' | 'Leaders'>('Family');
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const handleDownload = (filename: string) => {
    setDownloadedItem(filename);
    const blob = new Blob([
      `TestifyHub Christian Ministry Toolkit\nTitle: ${filename}\nPrepared for intentional discipleship in the home, campus, and church.\nWebsite: TestifyHub Radio 24/7`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadedItem(null);
    }, 3000);
  };

  const filteredResources = resources.filter(r => r.targetAudience === activeAudience);

  return (
    <section id="family-hub" className="py-16 bg-[#F8FAF8] border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E3ECE6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#025735] mb-1.5">
              <Users className="w-4 h-4" />
              <span>Generational Faith &amp; Discipleship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2922] tracking-tight">
              Family, Youth &amp; Children’s Ministry
            </h2>
            <p className="text-[#526057] text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
              Equipping every generation with timeless biblical truth, joyful home worship, and resilient conviction for contemporary life.
            </p>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E3ECE6] rounded-xl shadow-2xs">
            {(['Family', 'Youth', 'Children', 'Leaders'] as const).map((aud) => (
              <button
                key={aud}
                onClick={() => setActiveAudience(aud)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeAudience === aud
                    ? 'bg-[#025735] text-white shadow-xs'
                    : 'text-[#2F3D34] hover:bg-[#F0F5F2]'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E3ECE6] bg-stone-900 relative aspect-[16/11] shadow-xs">
            <img
              src={
                activeAudience === 'Youth'
                  ? '/src/assets/images/youth_worship_fellowship_1791879095140.jpg'
                  : activeAudience === 'Leaders'
                  ? '/src/assets/images/pastoral_study_desk_1791879094526.jpg'
                  : '/src/assets/images/family_bible_gathering_1791879093663.jpg'
              }
              alt={`${activeAudience} Discipleship Ministry`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#F2B83D] font-bold">
                {activeAudience} Focus
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">
                {activeAudience === 'Family' && 'Cultivating Christ-Centered Homes'}
                {activeAudience === 'Youth' && 'Unyielding Faith in a Rapid Culture'}
                {activeAudience === 'Children' && 'Sowing Gospel Seeds in Young Hearts'}
                {activeAudience === 'Leaders' && 'Biblical Wisdom for Faithful Shepherds'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 max-w-lg leading-relaxed">
                {activeAudience === 'Family' && 'Helping fathers and mothers build gentle, prayer-filled atmospheres where marriage flourishes and children experience unconditional love.'}
                {activeAudience === 'Youth' && 'Equipping high school and university students with apologetics, godly friendships, and gospel bravery on campus.'}
                {activeAudience === 'Children' && 'Simple, imaginative, and faithful resources that bring Bible stories to life without dumbing down God’s holiness.'}
                {activeAudience === 'Leaders' && 'Support, theological clarity, and practical pastoral tools for elders, pastors, and teachers.'}
              </p>
            </div>
          </div>

          {/* Core Pillars & Broadcast Integration */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3ECE6] flex flex-col justify-between shadow-xs space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#591C99] uppercase tracking-wider block">
                Radio &amp; Digital Community Integration
              </span>
              
              <h3 className="text-2xl font-extrabold text-[#1E2922] leading-tight">
                {activeAudience === 'Family' && 'On-Air: Family Altar Hour'}
                {activeAudience === 'Youth' && 'On-Air: Youth CrossFire & Campus Apologetics'}
                {activeAudience === 'Children' && 'On-Air: Little Shepherds Bedtime Stories'}
                {activeAudience === 'Leaders' && 'On-Air: The Pastor’s Study & Ministry Roundtable'}
              </h3>

              <p className="text-[#3E4E44] text-sm leading-relaxed">
                Tune in every weekday on TestifyHub Radio for dedicated teaching and community discussions addressing the specific challenges of this season of life.
              </p>

              {/* Action checklist */}
              <div className="space-y-2.5 pt-2 text-xs text-[#2F3D34]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#E6F4EE] text-[#025735] flex items-center justify-center text-[10px] shrink-0 font-bold">✓</div>
                  <span>Free printable guides updated monthly for personal or group study</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#E6F4EE] text-[#025735] flex items-center justify-center text-[10px] shrink-0 font-bold">✓</div>
                  <span>Podcasts archived for anytime listening in the car or home</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#E6F4EE] text-[#025735] flex items-center justify-center text-[10px] shrink-0 font-bold">✓</div>
                  <span>Interactive community prayer requests prayed for live on air</span>
                </div>
              </div>
            </div>

            {/* Quick Call to Action */}
            <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-[#E3ECE6] flex items-center justify-between text-xs">
              <span className="text-[#526057]">Need prayer or counsel for your household?</span>
              <a
                href="#prayer-wall"
                className="font-bold text-[#025735] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Request Prayer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Downloadable Toolkits & Resources Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#1E2922]">
              Discipleship Toolkits ({activeAudience})
            </h3>
            <span className="text-xs text-[#526057]">Free to download &amp; print for your church or home</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-6 border border-[#E3ECE6] flex flex-col justify-between shadow-2xs hover:border-[#025735]/40 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#526057]">
                    <span className="font-bold text-[#591C99] bg-[#F3EBFA] px-2.5 py-0.5 rounded-full text-[11px]">{res.type}</span>
                    <span>PDF Guide</span>
                  </div>

                  <h4 className="text-lg font-bold text-[#1E2922] leading-snug">
                    {res.title}
                  </h4>

                  <p className="text-xs text-[#526057] leading-relaxed">
                    {res.description}
                  </p>

                  <ul className="space-y-1 pt-2 text-[11px] text-[#3E4E44]">
                    {res.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#025735] font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E3ECE6] flex items-center justify-between">
                  <span className="text-[11px] text-[#8A9B90] font-mono">
                    {res.downloadName}
                  </span>

                  <button
                    onClick={() => handleDownload(res.downloadName)}
                    className="px-3.5 py-2 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    {downloadedItem === res.downloadName ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#F2B83D]" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Kit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
