import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'faith' | 'privacy' | 'terms';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'faith'
}) => {
  const [activeTab, setActiveTab] = useState<'faith' | 'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E3ECE6] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3ECE6] bg-[#F8FAF8]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#025735]" />
            <h2 className="text-xl font-bold text-[#1E2922] leading-tight">
              TestifyHub Covenants &amp; Policies
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A9B90] hover:text-[#1E2922] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 bg-[#F8FAF8] border-b border-[#E3ECE6] overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'faith', label: 'Statement of Faith' },
            { id: 'privacy', label: 'Privacy & Prayer Confidentiality' },
            { id: 'terms', label: 'Terms of Ministry Service' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#025735] text-white shadow-2xs'
                  : 'text-[#526057] hover:text-[#1E2922] hover:bg-[#F0F5F2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#2F3D34] leading-relaxed max-w-none">
          {activeTab === 'faith' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#025735]">Our Christian Statement of Faith</h3>
              <p>
                <strong>1. The Holy Scriptures:</strong> We believe the 66 books of the Old and New Testaments to be the inspired, infallible, and inerrant Word of God, the supreme authority in all matters of faith, doctrine, and conduct.
              </p>
              <p>
                <strong>2. The Triune God:</strong> We believe in one God, eternally existing in three distinct co-equal Persons: Father, Son, and Holy Spirit.
              </p>
              <p>
                <strong>3. The Lord Jesus Christ:</strong> We believe in His virgin birth, sinless life, substitutionary atonement on the cross, bodily resurrection from the grave, ascension to the Father’s right hand, and personal, visible return in glory.
              </p>
              <p>
                <strong>4. Salvation by Grace Through Faith:</strong> We confess that sinner reconciliation to God is solely through sovereign grace by faith in Jesus Christ alone, apart from human works.
              </p>
              <p>
                <strong>5. The Power of Testimony:</strong> We believe Revelation 12:11 teaches that the people of God overcome the accuser by the blood of the Lamb and by the word of their testimony. Sharing God's wonders strengthens the body of Christ.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#025735]">Privacy &amp; Data Stewardship</h3>
              <p>
                TestifyHub Christian Ministry is committed to biblical dignity and digital privacy. We do not sell, rent, or trade your personal email, phone number, or prayer requests with third-party data brokers.
              </p>
              <p>
                <strong>Prayer Wall Confidentiality:</strong> Requests submitted under the "Confidential Pastoral" option are shielded strictly for our prayer intercessors and never indexed by search engines or displayed to the public.
              </p>
              <p>
                <strong>Donor Security:</strong> Financial contributions are handled via PCI-compliant payment partners (Stripe / PayPal). No card security numbers are stored on our servers.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#025735]">Terms of Ministry Service</h3>
              <p>
                TestifyHub exists to glorify God and build up the body of Christ. Users agree to submit respectful, truthful prayer petitions and testimonies. Harassment, spam, solicitations, or profane language will be moderated and removed immediately by pastoral administrators.
              </p>
              <p>
                Audio streams and daily devotionals may be shared freely for non-commercial ministry, small group study, and personal encouragement.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAF8] border-t border-[#E3ECE6] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#025735] text-white rounded-xl text-xs font-bold hover:bg-[#014026] cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
