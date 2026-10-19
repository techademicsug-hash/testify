import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Newspaper, 
  HeartHandshake, 
  DollarSign, 
  Plus, 
  Trash2, 
  MessageSquare,
  TrendingUp,
  Check
} from 'lucide-react';
import { Devotional, BlogPost, RadioProgram, PrayerRequest, Testimony, DonationCampaign } from '../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  devotionals: Devotional[];
  todayDevotional?: Devotional;
  onUpdateTodayDevotional?: (dev: Partial<Devotional>) => Promise<void>;
  onAddDevotional: (dev: Devotional) => void;
  onDeleteDevotional: (id: string) => void;
  articles: BlogPost[];
  onAddArticle: (art: BlogPost) => void;
  onDeleteArticle: (id: string) => void;
  prayers: PrayerRequest[];
  onApprovePrayer: (id: string) => void;
  onRejectPrayer: (id: string) => void;
  testimonies: Testimony[];
  onAddTestimony?: (t: Testimony) => void;
  campaigns: DonationCampaign[];
}

type AdminTab = 'overview' | 'devotionals' | 'articles' | 'prayers' | 'testimonies' | 'campaigns';

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  devotionals,
  todayDevotional,
  onUpdateTodayDevotional,
  onAddDevotional,
  onDeleteDevotional,
  articles,
  onAddArticle,
  onDeleteArticle,
  prayers,
  onApprovePrayer,
  onRejectPrayer,
  testimonies,
  campaigns
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Today's devotion live edit state
  const [todayTitle, setTodayTitle] = useState(todayDevotional?.title || '');
  const [todayRef, setTodayRef] = useState(todayDevotional?.scriptureRef || '');
  const [todayVerse, setTodayVerse] = useState(todayDevotional?.scriptureText || '');
  const [todayMessage, setTodayMessage] = useState(todayDevotional?.message || '');
  const [todayPrayer, setTodayPrayer] = useState(todayDevotional?.prayerText || '');
  const [todayAuthor, setTodayAuthor] = useState(todayDevotional?.author || 'Pastor Thomas Vance');
  const [todaySavedSuccess, setTodaySavedSuccess] = useState(false);
  const [isSavingToday, setIsSavingToday] = useState(false);

  // Sync when todayDevotional changes
  React.useEffect(() => {
    if (todayDevotional) {
      setTodayTitle(todayDevotional.title);
      setTodayRef(todayDevotional.scriptureRef);
      setTodayVerse(todayDevotional.scriptureText);
      setTodayMessage(todayDevotional.message);
      setTodayPrayer(todayDevotional.prayerText);
      setTodayAuthor(todayDevotional.author);
    }
  }, [todayDevotional]);
  
  // Devotional form state
  const [showNewDevotionalForm, setShowNewDevotionalForm] = useState(false);
  const [newDevDate, setNewDevDate] = useState('Wednesday, October 14, 2026');
  const [newDevTitle, setNewDevTitle] = useState('');
  const [newDevRef, setNewDevRef] = useState('');
  const [newDevVerse, setNewDevVerse] = useState('');
  const [newDevMessage, setNewDevMessage] = useState('');
  const [newDevPrayer, setNewDevPrayer] = useState('');
  const [newDevAuthor, setNewDevAuthor] = useState('Pastor Thomas Vance');

  // Article form state
  const [showNewArticleForm, setShowNewArticleForm] = useState(false);
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState<BlogPost['category']>('Bible Teaching');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');
  const [newArtContent, setNewArtContent] = useState('');
  const [newArtAuthor, setNewArtAuthor] = useState('Pastor Thomas Vance');

  if (!isOpen) return null;

  const handleSaveTodayToBackend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayTitle.trim() || !todayMessage.trim()) return;

    setIsSavingToday(true);
    setTodaySavedSuccess(false);

    try {
      if (onUpdateTodayDevotional) {
        await onUpdateTodayDevotional({
          title: todayTitle.trim(),
          scriptureRef: todayRef.trim(),
          scriptureText: todayVerse.trim(),
          message: todayMessage.trim(),
          prayerText: todayPrayer.trim(),
          author: todayAuthor.trim()
        });
      } else {
        const res = await fetch('/api/devotions/today', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: todayTitle.trim(),
            scriptureRef: todayRef.trim(),
            scriptureText: todayVerse.trim(),
            message: todayMessage.trim(),
            prayerText: todayPrayer.trim(),
            author: todayAuthor.trim()
          })
        });
        if (!res.ok) throw new Error('Backend failed to update devotion');
      }
      setTodaySavedSuccess(true);
      setTimeout(() => setTodaySavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving today devotion to backend:', err);
    } finally {
      setIsSavingToday(false);
    }
  };

  const handleCreateDevotional = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevTitle.trim() || !newDevMessage.trim()) return;

    const newDev: Devotional = {
      id: `dev-${Date.now()}`,
      date: newDevDate,
      title: newDevTitle,
      scriptureRef: newDevRef,
      scriptureText: newDevVerse,
      message: newDevMessage,
      reflectionQuestions: ['How can you apply this passage to your walk today?'],
      prayerText: newDevPrayer,
      author: newDevAuthor,
      tags: ['TestifyHub Bread', 'Scripture']
    };

    onAddDevotional(newDev);
    setShowNewDevotionalForm(false);
    setNewDevTitle('');
    setNewDevRef('');
    setNewDevVerse('');
    setNewDevMessage('');
    setNewDevPrayer('');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim() || !newArtContent.trim()) return;

    const newArt: BlogPost = {
      id: `art-${Date.now()}`,
      title: newArtTitle,
      slug: newArtTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newArtCategory,
      excerpt: newArtExcerpt,
      content: newArtContent,
      author: {
        name: newArtAuthor,
        role: 'TestifyHub Contributing Broadcaster'
      },
      readTime: '5 min read',
      publishedDate: 'Just now',
      imageUrl: '/src/assets/images/pastoral_study_desk_1791879094526.jpg'
    };

    onAddArticle(newArt);
    setShowNewArticleForm(false);
    setNewArtTitle('');
    setNewArtExcerpt('');
    setNewArtContent('');
  };

  const pendingPrayers = prayers.filter(p => p.status === 'pending');
  const approvedPrayers = prayers.filter(p => p.status === 'approved');
  const totalDonations = campaigns.reduce((acc, c) => acc + c.currentAmount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex justify-center p-2 sm:p-6">
      <div className="bg-white border border-[#E3ECE6] rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0B2519] text-white flex items-center justify-between border-b border-[#025735]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#025735] text-[#F2B83D] flex items-center justify-center font-bold text-lg">
              ✝
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                TestifyHub Administration Portal
              </h2>
              <span className="text-[11px] text-[#A6C4B2]">
                Broadcast Operations, Editorial Journal &amp; Pastoral Moderation
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A6C4B2] hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close Admin Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="px-6 bg-[#F8FAF8] border-b border-[#E3ECE6] overflow-x-auto scrollbar-none flex gap-2 pt-2">
          {[
            { id: 'overview', label: 'Analytics & Overview', icon: TrendingUp },
            { id: 'devotionals', label: `Devotionals (${devotionals.length})`, icon: BookOpen },
            { id: 'articles', label: `Articles (${articles.length})`, icon: Newspaper },
            { id: 'prayers', label: `Prayer Queue (${pendingPrayers.length})`, icon: HeartHandshake },
            { id: 'testimonies', label: `Testimonies (${testimonies.length})`, icon: MessageSquare },
            { id: 'campaigns', label: 'Partnership Giving', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-t border-x cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#025735] border-[#E3ECE6] border-b-white -mb-px shadow-xs'
                    : 'text-[#526057] hover:text-[#1E2922] border-transparent hover:bg-[#F0F5F2]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#025735]' : 'text-[#8A9B90]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CMS Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-[#E3ECE6]">
                  <span className="text-[11px] font-bold text-[#526057] uppercase tracking-wider block">
                    Active Stream Listeners
                  </span>
                  <div className="text-3xl font-extrabold text-[#025735] mt-2">
                    1,482
                  </div>
                  <span className="text-xs text-[#025735] font-semibold mt-1 block">● 24/7 Audio Stream Active</span>
                </div>

                <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-[#E3ECE6]">
                  <span className="text-[11px] font-bold text-[#526057] uppercase tracking-wider block">
                    Praise Reports &amp; Testimonies
                  </span>
                  <div className="text-3xl font-extrabold text-[#591C99] mt-2">
                    {testimonies.length}
                  </div>
                  <span className="text-xs text-[#526057] mt-1 block">Published on TestifyHub</span>
                </div>

                <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-[#E3ECE6]">
                  <span className="text-[11px] font-bold text-[#526057] uppercase tracking-wider block">
                    Total Prayers Lifted
                  </span>
                  <div className="text-3xl font-extrabold text-[#1E2922] mt-2">
                    {prayers.reduce((acc, p) => acc + p.prayerCount, 0)}
                  </div>
                  <span className="text-xs text-[#526057] mt-1 block">Across {prayers.length} petitions</span>
                </div>

                <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-[#E3ECE6]">
                  <span className="text-[11px] font-bold text-[#526057] uppercase tracking-wider block">
                    Partnership Giving
                  </span>
                  <div className="text-3xl font-extrabold text-[#025735] mt-2">
                    ${totalDonations.toLocaleString()}
                  </div>
                  <span className="text-xs text-[#526057] mt-1 block">Across active campaigns</span>
                </div>
              </div>

              {/* Broadcast Server Health Card */}
              <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-[#E3ECE6] space-y-3">
                <h3 className="text-base font-bold text-[#1E2922]">
                  Audio Stream Configuration &amp; Health
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-[#E3ECE6]">
                    <span className="text-[#526057] block font-medium">AsuraHosting Audio Endpoint</span>
                    <span className="font-mono text-[#025735] font-bold break-all">http://cast5.asurahosting.com:8914/stream</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#E3ECE6]">
                    <span className="text-[#526057] block font-medium">Mixed Content Server Proxy</span>
                    <span className="font-mono text-[#591C99] font-bold">/api/radio-stream (Active Express)</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#E3ECE6]">
                    <span className="text-[#526057] block font-medium">Stream Format &amp; Bitrate</span>
                    <span className="font-mono text-[#1E2922] font-bold">128 kbps / 44.1 kHz Stereo MP3</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveTab('devotionals');
                    setShowNewDevotionalForm(true);
                  }}
                  className="px-4 py-2.5 bg-[#025735] text-white rounded-xl text-xs font-bold hover:bg-[#014026] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Devotional</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('articles');
                    setShowNewArticleForm(true);
                  }}
                  className="px-4 py-2.5 bg-[#591C99] text-white rounded-xl text-xs font-bold hover:bg-[#451379] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Blog Article</span>
                </button>
                <button
                  onClick={() => setActiveTab('prayers')}
                  className="px-4 py-2.5 bg-white text-[#025735] border border-[#025735] rounded-xl text-xs font-bold hover:bg-[#E6F4EE] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Moderate Prayer Requests</span>
                </button>
              </div>

            </div>
          )}

          {/* DEVOTIONALS TAB */}
          {activeTab === 'devotionals' && (
            <div className="space-y-8">
              
              {/* 1. Today's Live Active Devotion Editor (Backend) */}
              <div className="bg-white border-2 border-[#025735]/30 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E3ECE6]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#025735] animate-pulse"></span>
                      <h3 className="text-lg font-bold text-[#1E2922]">
                        Today's Active Devotion (Live on Backend)
                      </h3>
                    </div>
                    <p className="text-xs text-[#526057] mt-0.5">
                      Automatically updates every calendar day. Changes saved below take effect immediately across the live website.
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-[#E6F4EE] text-[#025735] text-xs font-bold rounded-full border border-[#025735]/20">
                    Live Status: Active
                  </span>
                </div>

                {todaySavedSuccess && (
                  <div className="p-3.5 bg-[#E6F4EE] border border-[#025735] rounded-xl text-xs text-[#013D25] flex items-center gap-2 font-semibold animate-in fade-in">
                    <Check className="w-4 h-4 text-[#025735]" />
                    <span>✓ Today's devotion saved to backend and published to the live site successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveTodayToBackend} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Today's Devotional Title</label>
                      <input
                        type="text"
                        required
                        value={todayTitle}
                        onChange={(e) => setTodayTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs font-bold text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Author / Pastor</label>
                      <input
                        type="text"
                        required
                        value={todayAuthor}
                        onChange={(e) => setTodayAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Scripture Reference</label>
                      <input
                        type="text"
                        required
                        value={todayRef}
                        onChange={(e) => setTodayRef(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Bible Verse Passage</label>
                      <input
                        type="text"
                        required
                        value={todayVerse}
                        onChange={(e) => setTodayVerse(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F3D34] mb-1">Devotional Reflection Message</label>
                    <textarea
                      rows={4}
                      required
                      value={todayMessage}
                      onChange={(e) => setTodayMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735] resize-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F3D34] mb-1">Closing Guided Prayer</label>
                    <input
                      type="text"
                      required
                      value={todayPrayer}
                      onChange={(e) => setTodayPrayer(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#025735]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#526057] italic">
                      Backend updates persist to devotions-store.json on the server.
                    </span>
                    <button
                      type="submit"
                      disabled={isSavingToday}
                      className="px-6 py-2.5 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isSavingToday ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving to Backend...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Save &amp; Publish Today's Devotion</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Devotionals Library & Rotation Schedule */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#1E2922]">
                      Devotionals Library &amp; Daily Rotation
                    </h4>
                    <span className="text-xs text-[#526057]">
                      Library automatically cycles daily so listeners receive fresh morning bread every day
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNewDevotionalForm(!showNewDevotionalForm)}
                    className="px-4 py-2 bg-white text-[#025735] border border-[#025735] rounded-xl text-xs font-bold hover:bg-[#E6F4EE] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showNewDevotionalForm ? 'Cancel Form' : 'Add Devotional to Library'}</span>
                  </button>
                </div>

                {showNewDevotionalForm && (
                  <form onSubmit={handleCreateDevotional} className="p-6 bg-[#F8FAF8] border border-[#E3ECE6] rounded-2xl space-y-4">
                    <h5 className="text-sm font-bold text-[#1E2922]">Add New Devotional to Library</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2F3D34] mb-1">Rotation Day / Date</label>
                        <input
                          type="text"
                          required
                          value={newDevDate}
                          onChange={(e) => setNewDevDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#2F3D34] mb-1">Author</label>
                        <input
                          type="text"
                          required
                          value={newDevAuthor}
                          onChange={(e) => setNewDevAuthor(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2F3D34] mb-1">Devotional Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. In All Things Give Thanks"
                          value={newDevTitle}
                          onChange={(e) => setNewDevTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#2F3D34] mb-1">Scripture Reference</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1 Thessalonians 5:18"
                          value={newDevRef}
                          onChange={(e) => setNewDevRef(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Bible Verse Text</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Give thanks in all circumstances..."
                        value={newDevVerse}
                        onChange={(e) => setNewDevVerse(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Devotional Message</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Write the reflection message..."
                        value={newDevMessage}
                        onChange={(e) => setNewDevMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Closing Prayer</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lord, teach my heart to praise You..."
                        value={newDevPrayer}
                        onChange={(e) => setNewDevPrayer(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowNewDevotionalForm(false)}
                        className="px-4 py-2 text-xs font-semibold text-[#526057] hover:text-[#1E2922]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#025735] text-white rounded-xl text-xs font-bold hover:bg-[#014026]"
                      >
                        Add to Library
                      </button>
                    </div>
                  </form>
                )}

                {/* Devotionals Table */}
                <div className="bg-white border border-[#E3ECE6] rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8FAF8] border-b border-[#E3ECE6] text-[#2F3D34] font-bold">
                      <tr>
                        <th className="p-3.5">Schedule / Day</th>
                        <th className="p-3.5">Title &amp; Scripture</th>
                        <th className="p-3.5">Author</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3ECE6]">
                      {devotionals.map((dev) => (
                        <tr key={dev.id} className="hover:bg-[#F8FAF8]">
                          <td className="p-3.5 font-medium text-[#1E2922] whitespace-nowrap">{dev.date}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-[#1E2922] block">{dev.title}</span>
                            <span className="text-[11px] text-[#025735] font-semibold">{dev.scriptureRef}</span>
                          </td>
                          <td className="p-3.5 text-[#526057] whitespace-nowrap">{dev.author}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => onDeleteDevotional(dev.id)}
                              className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                              title="Delete devotional"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ARTICLES TAB */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1E2922]">
                    Articles &amp; Ministry Journal CMS
                  </h3>
                  <span className="text-xs text-[#526057]">Manage 10 Christian categories &amp; essays</span>
                </div>
                <button
                  onClick={() => setShowNewArticleForm(!showNewArticleForm)}
                  className="px-4 py-2 bg-[#025735] text-white rounded-xl text-xs font-bold hover:bg-[#014026] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showNewArticleForm ? 'Cancel' : 'Write Article'}</span>
                </button>
              </div>

              {showNewArticleForm && (
                <form onSubmit={handleCreateArticle} className="p-6 bg-[#F8FAF8] border border-[#E3ECE6] rounded-2xl space-y-4">
                  <h4 className="text-base font-bold text-[#1E2922]">Publish New Article</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newArtTitle}
                        onChange={(e) => setNewArtTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2F3D34] mb-1">Category</label>
                      <select
                        value={newArtCategory}
                        onChange={(e) => setNewArtCategory(e.target.value as BlogPost['category'])}
                        className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                      >
                        <option value="Family">Family</option>
                        <option value="Youth">Youth</option>
                        <option value="Children">Children</option>
                        <option value="Bible Teaching">Bible Teaching</option>
                        <option value="Prayer">Prayer</option>
                        <option value="Evangelism">Evangelism</option>
                        <option value="Gospel Music">Gospel Music</option>
                        <option value="Christian Leadership">Christian Leadership</option>
                        <option value="Testimonies">Testimonies</option>
                        <option value="Christian Living">Christian Living</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F3D34] mb-1">Author Name</label>
                    <input
                      type="text"
                      required
                      value={newArtAuthor}
                      onChange={(e) => setNewArtAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F3D34] mb-1">Summary / Excerpt</label>
                    <input
                      type="text"
                      required
                      value={newArtExcerpt}
                      onChange={(e) => setNewArtExcerpt(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2F3D34] mb-1">Full Article Prose</label>
                    <textarea
                      rows={5}
                      required
                      value={newArtContent}
                      onChange={(e) => setNewArtContent(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E3ECE6] rounded-xl text-xs resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewArticleForm(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#526057]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#025735] text-white rounded-xl text-xs font-bold"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}

              {/* Articles Table */}
              <div className="bg-white border border-[#E3ECE6] rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F8FAF8] border-b border-[#E3ECE6] text-[#2F3D34] font-bold">
                    <tr>
                      <th className="p-3.5">Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Author</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3ECE6]">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-[#F8FAF8]">
                        <td className="p-3.5 font-bold text-[#1E2922]">{art.title}</td>
                        <td className="p-3.5 text-[#591C99] font-bold">{art.category}</td>
                        <td className="p-3.5 text-[#526057]">{art.author.name}</td>
                        <td className="p-3.5 text-[#526057]">{art.publishedDate}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => onDeleteArticle(art.id)}
                            className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                            title="Delete article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRAYERS MODERATION TAB */}
          {activeTab === 'prayers' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1E2922]">
                  Prayer Moderation Queue
                </h3>
                <span className="text-xs text-[#526057]">
                  Review submitted petitions for biblical dignity and pastoral care
                </span>
              </div>

              {pendingPrayers.length === 0 ? (
                <div className="p-8 bg-[#F8FAF8] rounded-2xl border border-[#E3ECE6] text-center text-xs text-[#526057]">
                  No pending prayer requests awaiting review. All current requests have been processed!
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingPrayers.map((prayer) => (
                    <div key={prayer.id} className="p-4 bg-white border border-[#F2B83D] rounded-2xl shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#025735]">{prayer.category}</span>
                        <span className="text-[#526057]">{prayer.isPrivate ? 'Confidential' : 'Public Request'}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#1E2922]">{prayer.title}</h4>
                      <p className="text-xs text-[#3E4E44]">{prayer.message}</p>
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-[#526057]">From: {prayer.authorName}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRejectPrayer(prayer.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onApprovePrayer(prayer.id)}
                            className="px-3 py-1.5 bg-[#025735] text-white hover:bg-[#014026] rounded-lg font-bold cursor-pointer"
                          >
                            Approve for Wall
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Approved list */}
              <div className="pt-4 border-t border-[#E3ECE6]">
                <h4 className="text-base font-bold text-[#1E2922] mb-3">
                  Currently Active on Wall ({approvedPrayers.length})
                </h4>
                <div className="space-y-2">
                  {approvedPrayers.map((p) => (
                    <div key={p.id} className="p-3 bg-[#F8FAF8] rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1E2922]">{p.title}</span>
                        <span className="text-[#526057] ml-2 font-mono">({p.prayerCount} prayers)</span>
                      </div>
                      <button
                        onClick={() => onRejectPrayer(p.id)}
                        className="text-[#8A9B90] hover:text-red-700 cursor-pointer p-1"
                        title="Remove from public wall"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TESTIMONIES TAB */}
          {activeTab === 'testimonies' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1E2922]">
                  Testimonies &amp; Praise Reports
                </h3>
                <span className="text-xs text-[#526057]">
                  Published praise reports celebrating God's interventions
                </span>
              </div>

              <div className="space-y-3">
                {testimonies.map((t) => (
                  <div key={t.id} className="p-4 bg-[#F8FAF8] border border-[#E3ECE6] rounded-2xl flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#025735]">{t.category}</span>
                        <span className="text-[#526057]">· {t.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1E2922]">{t.title}</h4>
                      <p className="text-xs text-[#526057] italic">"{t.story}"</p>
                      <span className="text-[11px] font-semibold text-[#1E2922] block mt-1">Submitted by: {t.authorName}</span>
                    </div>

                    <span className="px-2.5 py-1 bg-[#E6F4EE] text-[#025735] text-[11px] font-bold rounded-full shrink-0">
                      Published
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAMPAIGNS TAB */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1E2922]">
                  Partnership Funds &amp; Financial Stewardship
                </h3>
                <span className="text-xs text-[#526057]">Track ministry outreach funds and donor contributions</span>
              </div>

              <div className="space-y-4">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="p-5 bg-[#F8FAF8] border border-[#E3ECE6] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-[#1E2922]">{camp.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#025735]">
                        ${camp.currentAmount.toLocaleString()} / ${camp.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-[#E3ECE6] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#025735] to-[#591C99] h-full rounded-full"
                        style={{ width: `${Math.min(100, Math.round((camp.currentAmount / camp.targetAmount) * 100))}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-[#526057]">
                      <span>{camp.donorsCount} Contributed Partners</span>
                      <span>Status: {camp.active ? 'Active' : 'Paused'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8FAF8] border-t border-[#E3ECE6] flex justify-between items-center text-xs text-[#526057]">
          <span>TestifyHub Platform CMS</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#025735] text-white rounded-xl hover:bg-[#014026] font-bold cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
