export type StreamStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface RadioProgram {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  title: string;
  host: string;
  description: string;
  category: 'Teaching' | 'Worship' | 'Youth' | 'Family' | 'Prayer' | 'Children';
  isLiveNow?: boolean;
  audioArchiveUrl?: string;
  duration?: string;
}

export interface Devotional {
  id: string;
  date: string;
  displayDate?: string;
  isToday?: boolean;
  title: string;
  scriptureRef: string;
  scriptureText: string;
  message: string;
  reflectionQuestions: string[];
  prayerText: string;
  author: string;
  audioUrl?: string;
  tags: string[];
}

export interface PrayerRequest {
  id: string;
  authorName: string;
  isAnonymous: boolean;
  isPrivate: boolean;
  title: string;
  message: string;
  category: 'Healing & Health' | 'Family & Marriage' | 'Youth & Children' | 'Spiritual Growth' | 'Employment & Provision' | 'Global Church';
  prayerCount: number;
  hasUserPrayed?: boolean;
  createdAt: string;
  status: 'approved' | 'pending' | 'flagged';
  answered?: boolean;
  testimonyId?: string;
}

export interface Testimony {
  id: string;
  authorName: string;
  title: string;
  story: string;
  date: string;
  category: string;
  verified: boolean;
  imageUrl?: string;
  location?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Family' | 'Youth' | 'Children' | 'Bible Teaching' | 'Prayer' | 'Evangelism' | 'Gospel Music' | 'Christian Leadership' | 'Testimonies' | 'Christian Living';
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  publishedDate: string;
  imageUrl: string;
  featured?: boolean;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  category: 'Radio Outreach' | 'Youth Ministry' | 'Children Curriculum' | 'Benevolence & Food';
  active: boolean;
}

export interface MinistryResource {
  id: string;
  title: string;
  targetAudience: 'Family' | 'Youth' | 'Children' | 'Leaders';
  type: 'Guide' | 'Scripture Memory' | 'Discussion Cards' | 'Devotional Study';
  description: string;
  highlights: string[];
  downloadName: string;
}

export interface AdSlotConfig {
  id: string;
  name: string;
  slotType: 'leaderboard' | 'rectangle' | 'vast_audio';
  active: boolean;
  sponsorName: string;
  fallbackText: string;
}
