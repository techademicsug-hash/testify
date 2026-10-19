import React, { useState, useEffect, useCallback } from 'react';
import { RadioPlayerProvider } from './context/RadioPlayerContext';
import { 
  INITIAL_PROGRAMS, 
  INITIAL_DEVOTIONALS, 
  INITIAL_ARTICLES, 
  INITIAL_PRAYERS, 
  INITIAL_TESTIMONIES, 
  INITIAL_CAMPAIGNS 
} from './data/mockData';
import { 
  RadioProgram, 
  Devotional, 
  BlogPost, 
  PrayerRequest, 
  Testimony, 
  DonationCampaign 
} from './types';

// Components
import { Navbar } from './components/Navbar';
import { LiveRadioHero } from './components/LiveRadioHero';
import { TestimoniesHubSection } from './components/TestimoniesHubSection';
import { ProgrammeScheduleModal } from './components/ProgrammeScheduleModal';
import { DailyDevotionalSection } from './components/DailyDevotionalSection';
import { DevotionalArchiveModal } from './components/DevotionalArchiveModal';
import { SubmitPrayerModal } from './components/SubmitPrayerModal';
import { DonationSection } from './components/DonationSection';
import { DonationModal } from './components/DonationModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { PolicyModal } from './components/PolicyModal';
import { PersistentPlayerBar } from './components/PersistentPlayerBar';
import { Footer } from './components/Footer';

function MainApp() {
  // Data states
  const [programs] = useState<RadioProgram[]>(INITIAL_PROGRAMS);
  const [devotionals, setDevotionals] = useState<Devotional[]>(INITIAL_DEVOTIONALS);
  const [activeDevotional, setActiveDevotional] = useState<Devotional>(INITIAL_DEVOTIONALS[0]);
  const [articles, setArticles] = useState<BlogPost[]>(INITIAL_ARTICLES);
  const [prayers, setPrayers] = useState<PrayerRequest[]>(INITIAL_PRAYERS);
  const [testimonies, setTestimonies] = useState<Testimony[]>(INITIAL_TESTIMONIES);
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(INITIAL_CAMPAIGNS);

  // Active section for header nav
  const [activeSection, setActiveSection] = useState<string>('live-radio');

  // Modals
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDevotionalArchiveOpen, setIsDevotionalArchiveOpen] = useState(false);
  const [isSubmitPrayerOpen, setIsSubmitPrayerOpen] = useState(false);
  const [submitPrayerMode, setSubmitPrayerMode] = useState<'prayer' | 'testimony'>('prayer');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateTargetCampaign, setDonateTargetCampaign] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyInitialTab, setPolicyInitialTab] = useState<'faith' | 'privacy' | 'terms'>('faith');

  // AUTOMATIC DAILY DEVOTIONS FETCH & BACKEND SYNC
  const fetchDevotionsFromBackend = useCallback(async () => {
    try {
      // 1. Fetch today's calculated daily devotion
      const todayRes = await fetch('/api/devotions/today');
      if (todayRes.ok) {
        const todayData = await todayRes.json();
        if (todayData.success && todayData.devotional) {
          setActiveDevotional(todayData.devotional);
        }
      }

      // 2. Fetch full rotation library
      const listRes = await fetch('/api/devotions');
      if (listRes.ok) {
        const listData = await listRes.json();
        if (listData.success && Array.isArray(listData.devotionals)) {
          setDevotionals(listData.devotionals);
        }
      }
    } catch (err) {
      console.error('Error fetching devotions from backend:', err);
    }
  }, []);

  useEffect(() => {
    fetchDevotionsFromBackend();
    // Daily rollover listener: checks every 30 minutes to auto-change devotion on date transition
    const interval = setInterval(fetchDevotionsFromBackend, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDevotionsFromBackend]);

  const handleSubmitPrayer = (newReq: Omit<PrayerRequest, 'id' | 'prayerCount' | 'createdAt' | 'status'>) => {
    const item: PrayerRequest = {
      ...newReq,
      id: `pray-${Date.now()}`,
      prayerCount: 1,
      createdAt: 'Just now',
      status: 'approved'
    };
    setPrayers((prev) => [item, ...prev]);
  };

  const handleSubmitTestimony = (newTestimony: { title: string; story: string; category: string; authorName: string }) => {
    const item: Testimony = {
      id: `test-${Date.now()}`,
      title: newTestimony.title,
      story: newTestimony.story,
      category: newTestimony.category,
      authorName: newTestimony.authorName,
      date: 'Just now',
      verified: true
    };
    setTestimonies((prev) => [item, ...prev]);
  };

  // Donation actions
  const handleProcessDonation = (amount: number, campaignId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId || campaignId === 'general') {
          return {
            ...c,
            currentAmount: c.currentAmount + (campaignId === 'general' ? Math.round(amount / prev.length) : amount),
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      })
    );
  };

  // CMS backend actions for devotions
  const handleUpdateTodayDevotional = async (updated: Partial<Devotional>) => {
    try {
      const res = await fetch('/api/devotions/today', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.devotional) {
          setActiveDevotional(data.devotional);
        }
        await fetchDevotionsFromBackend();
      }
    } catch (err) {
      console.error('Error updating today devotion on backend:', err);
    }
  };

  const handleAddDevotional = async (dev: Devotional) => {
    try {
      const res = await fetch('/api/devotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dev)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.devotional) {
          setDevotionals((prev) => [data.devotional, ...prev]);
        }
        await fetchDevotionsFromBackend();
      }
    } catch {
      setDevotionals((prev) => [dev, ...prev]);
      setActiveDevotional(dev);
    }
  };

  const handleDeleteDevotional = async (id: string) => {
    try {
      await fetch(`/api/devotions/${id}`, { method: 'DELETE' });
      setDevotionals((prev) => prev.filter((d) => d.id !== id));
      if (activeDevotional.id === id && devotionals.length > 1) {
        setActiveDevotional(devotionals.find((d) => d.id !== id)!);
      }
    } catch {
      setDevotionals((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleAddArticle = (art: BlogPost) => {
    setArticles((prev) => [art, ...prev]);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleApprovePrayer = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
  };

  const handleRejectPrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleOpenDonateModal = (campaignId?: string) => {
    setDonateTargetCampaign(campaignId);
    setIsDonateOpen(true);
  };

  const handleOpenPolicy = (tab: 'faith' | 'privacy' | 'terms' = 'faith') => {
    setPolicyInitialTab(tab);
    setIsPolicyOpen(true);
  };

  const currentProgram = programs.find((p) => p.isLiveNow) || programs[1];

  const scrollToRadio = () => {
    setActiveSection('live-radio');
    const el = document.getElementById('live-radio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col font-sans text-[14px] selection:bg-[#F2B83D] selection:text-[#025735]">
      
      {/* Navigation Top Bar */}
      <Navbar
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenDonate={() => handleOpenDonateModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 1. Live Radio Hero Section with Visual Slider & Master Player (No host names, No times) */}
      <LiveRadioHero
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenSubmitTestimony={() => {
          setSubmitPrayerMode('testimony');
          setIsSubmitPrayerOpen(true);
        }}
        onOpenSubmitPrayer={() => {
          setSubmitPrayerMode('prayer');
          setIsSubmitPrayerOpen(true);
        }}
        currentProgram={currentProgram}
      />

      {/* 2. Testimonies & Praise Reports Hub (Core to TestifyHub!) */}
      <TestimoniesHubSection
        testimonies={testimonies}
        onOpenSubmitTestimony={() => {
          setSubmitPrayerMode('testimony');
          setIsSubmitPrayerOpen(true);
        }}
      />

      {/* 3. Daily Bible Devotional (Automatically changes every day & editable by Admin) */}
      <DailyDevotionalSection
        devotional={activeDevotional}
        onOpenArchive={() => setIsDevotionalArchiveOpen(true)}
      />

      {/* 4. Giving & Ministry Partnership */}
      <DonationSection
        campaigns={campaigns}
        onOpenDonateModal={handleOpenDonateModal}
      />

      {/* Footer */}
      <Footer
        onOpenPolicy={handleOpenPolicy}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenDonate={() => handleOpenDonateModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Persistent Audio Dock Bar at Viewport Bottom */}
      <PersistentPlayerBar 
        onScrollToRadio={scrollToRadio} 
      />

      {/* MODALS */}

      {/* 7-Day Programme Schedule Modal */}
      <ProgrammeScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        programs={programs}
      />

      {/* Devotional Archive Search & Modal */}
      <DevotionalArchiveModal
        isOpen={isDevotionalArchiveOpen}
        onClose={() => setIsDevotionalArchiveOpen(false)}
        devotionals={devotionals}
        onSelectDevotional={(dev) => setActiveDevotional(dev)}
      />

      {/* Submit Prayer Request / Praise Report Modal (Sends to WhatsApp +256784264941) */}
      <SubmitPrayerModal
        isOpen={isSubmitPrayerOpen}
        onClose={() => setIsSubmitPrayerOpen(false)}
        onSubmit={handleSubmitPrayer}
        onSubmitTestimony={handleSubmitTestimony}
        mode={submitPrayerMode}
      />

      {/* Donation & Giving Modal with Tax Receipt (Sends to WhatsApp +256784264941) */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        campaigns={campaigns}
        defaultCampaignId={donateTargetCampaign}
        onProcessDonation={handleProcessDonation}
      />

      {/* Institutional Policies & Statement of Faith Modal */}
      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        initialTab={policyInitialTab}
      />

      {/* Comprehensive Administrator CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        devotionals={devotionals}
        todayDevotional={activeDevotional}
        onUpdateTodayDevotional={handleUpdateTodayDevotional}
        onAddDevotional={handleAddDevotional}
        onDeleteDevotional={handleDeleteDevotional}
        articles={articles}
        onAddArticle={handleAddArticle}
        onDeleteArticle={handleDeleteArticle}
        prayers={prayers}
        onApprovePrayer={handleApprovePrayer}
        onRejectPrayer={handleRejectPrayer}
        testimonies={testimonies}
        campaigns={campaigns}
      />

    </div>
  );
}

export default function App() {
  return (
    <RadioPlayerProvider>
      <MainApp />
    </RadioPlayerProvider>
  );
}
