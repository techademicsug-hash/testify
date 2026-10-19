import { Devotional, BlogPost, RadioProgram, PrayerRequest, Testimony, DonationCampaign, MinistryResource, AdSlotConfig } from '../types';

export const INITIAL_PROGRAMS: RadioProgram[] = [
  {
    id: 'prog-1',
    day: 'Monday',
    time: '06:00 - 08:00',
    title: 'Dawn Intercession & Psalms',
    host: 'Elder Marcus Graham',
    description: 'Begin your day with reverent prayer, Scripture readings from the Psalms, and gentle acoustic hymns to quiet your soul before the Lord.',
    category: 'Prayer',
    isLiveNow: false,
    duration: '2h',
    audioArchiveUrl: '/audio/broadcast_preview.mp3'
  },
  {
    id: 'prog-2',
    day: 'Monday',
    time: '08:00 - 10:00',
    title: 'Grace & Truth Morning Broadcast',
    host: 'Pastor Thomas Vance',
    description: 'Expository Bible verse study, practical biblical encouragement for daily work, and warm conversation addressing real family questions.',
    category: 'Teaching',
    isLiveNow: true,
    duration: '2h',
    audioArchiveUrl: '/audio/broadcast_preview.mp3'
  },
  {
    id: 'prog-3',
    day: 'Monday',
    time: '10:00 - 12:00',
    title: 'Hymns of the Ages & Sacred Choirs',
    host: 'Sister Abigail Cole',
    description: 'Timeless Reformed and historical hymns, choral anthems, and the stories behind the great songwriters of Christian history.',
    category: 'Worship',
    isLiveNow: false,
    duration: '2h'
  },
  {
    id: 'prog-4',
    day: 'Monday',
    time: '12:00 - 14:00',
    title: 'Midday Manna & Community Prayer',
    host: 'Rev. Samuel Osei',
    description: 'Taking live prayer requests from listeners across regions, lifting up the sick, the broken-hearted, and praying for revival in our cities.',
    category: 'Prayer',
    isLiveNow: false,
    duration: '2h'
  },
  {
    id: 'prog-5',
    day: 'Monday',
    time: '14:00 - 16:00',
    title: 'Christian Family Altar Hour',
    host: 'David & Rachel Miller',
    description: 'Practical biblical guidance on marriage communication, raising children with gentle discipline, and cultivating peaceful homes.',
    category: 'Family',
    isLiveNow: false,
    duration: '2h'
  },
  {
    id: 'prog-6',
    day: 'Monday',
    time: '16:00 - 17:30',
    title: 'Children’s Little Shepherds Hour',
    host: 'Auntie Mary Foster',
    description: 'Engaging dramatized Bible stories, character lessons, memory verse songs, and bedtime blessings crafted especially for young children.',
    category: 'Children',
    isLiveNow: false,
    duration: '1h 30m'
  },
  {
    id: 'prog-7',
    day: 'Monday',
    time: '17:30 - 19:30',
    title: 'Youth CrossFire & Apologetics',
    host: 'Brother Jordan Hayes',
    description: 'Addressing tough cultural questions facing teens and college students, biblical worldview discussions, and uplifting contemporary gospel worship.',
    category: 'Youth',
    isLiveNow: false,
    duration: '2h'
  },
  {
    id: 'prog-8',
    day: 'Monday',
    time: '19:30 - 21:00',
    title: 'The Pastor’s Study & Systematic Exegesis',
    host: 'Dr. Arthur Bennett',
    description: 'In-depth systematic theology explained in accessible, warm language for believers wanting to dig deeper into the original Greek and Hebrew texts.',
    category: 'Teaching',
    isLiveNow: false,
    duration: '1h 30m'
  },
  {
    id: 'prog-9',
    day: 'Monday',
    time: '21:00 - 23:00',
    title: 'Quiet Waters: Evening Praise & Fellowship',
    host: 'Pastor Joseph Wright',
    description: 'Restful gospel melodies, peaceful Scripture readings, and closing evening prayers for families preparing for rest.',
    category: 'Worship',
    isLiveNow: false,
    duration: '2h'
  },
  // Tuesday
  {
    id: 'prog-10',
    day: 'Tuesday',
    time: '08:00 - 10:00',
    title: 'Grace & Truth: Walking Through the Epistles',
    host: 'Pastor Thomas Vance',
    description: 'Detailed verse-by-verse journey through Paul’s letter to the Ephesians.',
    category: 'Teaching',
    isLiveNow: false,
    duration: '2h'
  },
  {
    id: 'prog-11',
    day: 'Tuesday',
    time: '14:00 - 16:00',
    title: 'Wisdom for Christian Mothers',
    host: 'Hannah Vance & Sarah Jenkins',
    description: 'Grace-filled encouragement for mothers navigating weary days, toddler tantrums, and teenage transitions.',
    category: 'Family',
    isLiveNow: false,
    duration: '2h'
  },
  // Wednesday
  {
    id: 'prog-12',
    day: 'Wednesday',
    time: '19:00 - 21:00',
    title: 'Midweek Live Fellowship & Evening Prayer Broadcast',
    host: 'Pastoral Team',
    description: 'Live interactive communion of saints, pastoral intercession for nationwide needs, and corporate worship.',
    category: 'Prayer',
    isLiveNow: false,
    duration: '2h'
  },
  // Friday
  {
    id: 'prog-13',
    day: 'Friday',
    time: '18:00 - 20:30',
    title: 'Friday Youth Night: Faith on the Frontline',
    host: 'Jordan Hayes & Youth Panel',
    description: 'Honest questions on purity, peer pressure, identity, and walking faithfully with Jesus on campus.',
    category: 'Youth',
    isLiveNow: false,
    duration: '2h 30m'
  },
  // Saturday
  {
    id: 'prog-14',
    day: 'Saturday',
    time: '09:00 - 11:00',
    title: 'Saturday Bible Club & Kids Adventures',
    host: 'Auntie Mary & Uncle Stephen',
    description: 'Fun Bible quizzes, children missionary stories, and sing-along songs.',
    category: 'Children',
    isLiveNow: false,
    duration: '2h'
  },
  // Sunday
  {
    id: 'prog-15',
    day: 'Sunday',
    time: '10:00 - 12:30',
    title: 'Lord’s Day Morning Service & Sermon Broadcast',
    host: 'Senior Pastor & Choir',
    description: 'Full Sunday morning worship service broadcast live with corporate singing, congregational prayer, and the preached Word.',
    category: 'Teaching',
    isLiveNow: false,
    duration: '2h 30m'
  }
];

export const INITIAL_DEVOTIONALS: Devotional[] = [
  {
    id: 'dev-1',
    date: 'Tuesday, October 13, 2026',
    title: 'New Mercies for Weary Mornings',
    scriptureRef: 'Lamentations 3:22-23',
    scriptureText: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.',
    message: `Jeremiah penned these timeless words in the deepest valley of his life. Jerusalem had fallen, the temple lay in ruins, and sorrow felt like a heavy shroud. Yet in chapter three, right in the heart of his lamentation, the prophet halts his grief to anchor his soul on an immutable truth: God’s compassions do not expire at sunset.

When you wake with unresolved burdens, anxious thoughts about your family, or regret over yesterday’s missteps, remember that God does not expect you to run on yesterday’s exhausted strength. His mercies are not rations scooped from a dwindling pantry. They are a fresh spring, bubbling up anew with the sunrise. Whatever demands await your attention today, divine mercy has already arrived before you stepped out of bed.`,
    reflectionQuestions: [
      'What specific worry from yesterday are you carrying into today instead of laying down?',
      'How does knowing God’s mercy is fresh today change the way you face your hardest task?'
    ],
    prayerText: 'Heavenly Father, thank You that Your faithfulness does not waver with my circumstances. Forgive me for holding onto yesterday’s anxiety. I receive Your fresh mercy for this day. Give me peace in my home, patience with my family, and eyes to see Your gentle hand in every hour. In Jesus’ name, Amen.',
    author: 'Pastor Thomas Vance',
    tags: ['Faithfulness', 'Mercy', 'Morning Peace', 'Hope']
  },
  {
    id: 'dev-2',
    date: 'Monday, October 12, 2026',
    title: 'A Shelter in the Gathering Tempest',
    scriptureRef: 'Psalm 46:1-2',
    scriptureText: 'God is our refuge and strength, a very present help in trouble. Therefore we will not fear though the earth gives way, though the mountains be moved into the heart of the sea.',
    message: `Notice the psalmist does not say God will make all trouble vanish instantaneously. Rather, God is our very present help inside the trouble. The Hebrew word implies help that is found close at hand, within arm’s reach, ready at the exact second of need. When the world feels shaken and headlines trigger anxiety, the believer’s refuge is not worldly financial security or human approval, but the unchanging shelter of our Sovereign King.`,
    reflectionQuestions: [
      'Where do you habitually run first when you feel threatened or overwhelmed?',
      'How can you cultivate quiet stillness before God in the middle of a noisy workday?'
    ],
    prayerText: 'Lord God, You are my fortress and high tower. When the ground under my feet feels unsteady, remind my heart that You sit enthroned over the flood. Grant strength to my spirit today. Amen.',
    author: 'Sister Abigail Cole',
    tags: ['Refuge', 'Trust', 'Strength', 'Peace']
  },
  {
    id: 'dev-3',
    date: 'Sunday, October 11, 2026',
    title: 'Clothed with Gentle Compassion in the Home',
    scriptureRef: 'Colossians 3:12-13',
    scriptureText: 'Put on then, as God’s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.',
    message: `Paul compares Christian character to garments we intentionally dress ourselves with each morning. Kindness is not a mood we wait to feel; it is a spiritual choice we make toward our spouses, our energetic children, and our aging parents. Bearing with one another requires a generous cushion of grace, recognizing that Christ bore our immense debt with unfathomable tenderness on Calvary.`,
    reflectionQuestions: [
      'Is there someone in your household who needs your quiet forgiveness today?',
      'What practical word of appreciation can you speak to a family member before sunset?'
    ],
    prayerText: 'Lord Jesus, melt any hardness in my heart. Clothe my thoughts in humility and my speech in patience. Help our household reflect Your sacrificial love to all who visit us. Amen.',
    author: 'Elder Marcus Graham',
    tags: ['Family', 'Forgiveness', 'Humility', 'Love']
  }
];

export const INITIAL_ARTICLES: BlogPost[] = [
  {
    id: 'art-1',
    title: 'Building an Unhurried Family Altar in a Busy Home',
    slug: 'building-unhurried-family-altar',
    category: 'Family',
    excerpt: 'How fifteen intentional minutes of Scripture reading and simple prayer around the kitchen table can shape the eternal destiny of your children.',
    content: `Many Christian parents feel overwhelmed by the thought of family worship. We picture elaborate thirty-minute theological lectures, children sitting in stone-still reverent silence, and parents who have all the answers. When the reality of spilled milk, fidgety six-year-olds, and evening fatigue sets in, many give up altogether.

The secret to a durable family altar is not perfection or length, but joyful consistency. Fifteen focused minutes around the dinner table or living room rug is enough to plant seeds that bear fruit across decades.

Start with three simple elements:
1. Read a short passage: five to seven verses from the Gospels or Proverbs. Let older children take turns reading aloud.
2. Ask one simple question: "What does this passage teach us about God’s heart?" or "How can we practice this at school tomorrow?"
3. Pray together: Go around the room and let each person voice one thanksgiving and one personal petition. Finish by blessing your children by name.

Do not despair if evenings feel chaotic. God works through small, faithful habits. Your children will remember that God was welcome in your home every single day.`,
    author: {
      name: 'David Miller',
      role: 'Family Ministry Director'
    },
    readTime: '5 min read',
    publishedDate: 'Oct 11, 2026',
    imageUrl: '/src/assets/images/family_bible_gathering_1791879093663.jpg',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Anchored Conviction: How Youth Can Stand Boldly for Christ',
    slug: 'youth-standing-boldly-for-christ',
    category: 'Youth',
    excerpt: 'Equipping our young people with thoughtful biblical convictions, gracious speech, and unshakable faith in university lecture halls and high school corridors.',
    content: `Today's Christian youth are navigating cultural pressures unlike previous generations. Digital devices subject them to relentless peer judgment, shifting definitions of truth, and social penalties for holding historical biblical views.

Daniel and his three friends in Babylon offer a profound model for Christian young people today. Notice three things Daniel did not do: he did not compromise his integrity, he did not run away into isolation, and he did not respond with hateful arrogance. Instead, he requested an alternative with courteous humility, excelled in knowledge, and kept his private prayer life vibrant.

When young people know *why* they believe Scripture, their faith transforms from borrowed parent tradition into living personal conviction. Let us walk beside our youth, listen to their hardest questions without panic, and show them that Christ is worth losing worldly popularity for.`,
    author: {
      name: 'Jordan Hayes',
      role: 'Youth Pastor & Campus Evangelist'
    },
    readTime: '6 min read',
    publishedDate: 'Oct 09, 2026',
    imageUrl: '/src/assets/images/youth_worship_fellowship_1791879095140.jpg',
    featured: false
  },
  {
    id: 'art-3',
    title: 'Teaching Little Hearts to Pray Before Bedtime',
    slug: 'teaching-children-to-pray',
    category: 'Children',
    excerpt: 'Practical ways to guide young children beyond rote recitation into heartfelt, honest conversations with their Heavenly Father.',
    content: `Children have a natural, innocent openness to spiritual reality. Jesus told his disciples, "Let the little children come to me, and do not hinder them, for to such belongs the kingdom of God."

When teaching children to pray, move beyond recited rhymes to conversational honesty. Use the four fingers of prayer:
- Thumb (close to heart): Praise God for Who He is ("God, You are kind and strong").
- Index (pointing finger): Thanksgiving for what He has made ("Thank You for my friends and our home").
- Middle (tallest): Prayers for others ("Please heal Grandma and give the teacher wisdom").
- Little finger (smallest): Prayers for myself ("Help me to share my toys and speak kindly").

Praying over your sleeping child as you tuck them in leaves an indelible mark of security that stays with them through adulthood.`,
    author: {
      name: 'Mary Foster',
      role: 'Children’s Ministry Coordinator'
    },
    readTime: '4 min read',
    publishedDate: 'Oct 08, 2026',
    imageUrl: '/src/assets/images/family_bible_gathering_1791879093663.jpg',
    featured: false
  },
  {
    id: 'art-4',
    title: 'Understanding the Covenants: The Golden Thread of Scripture',
    slug: 'understanding-biblical-covenants',
    category: 'Bible Teaching',
    excerpt: 'From Noah and Abraham to the Davidic promise and the New Covenant in Christ, discover how God’s redemptive promises hold the whole Bible together.',
    content: `The Bible is not a disjointed collection of moral fables; it is one grand, unified story of redemption centered on the person and work of Jesus Christ. At the heart of this unfolding story are God’s divine covenants.

From the Noahic covenant guaranteeing earth’s preservation, to the Abrahamic covenant promising a universal blessing through one seed, to the Sinai law exposing our need for a savior, to the Davidic covenant promising an eternal King, every covenant finds its "Yes" and "Amen" in Christ Jesus.

When we read the Old Testament through the lens of the New Covenant, verses we once found obscure suddenly illuminate our Savior’s steadfast pursuit of His people.`,
    author: {
      name: 'Dr. Arthur Bennett',
      role: 'Professor of Biblical Theology'
    },
    readTime: '8 min read',
    publishedDate: 'Oct 06, 2026',
    imageUrl: '/src/assets/images/pastoral_study_desk_1791879094526.jpg',
    featured: true
  },
  {
    id: 'art-5',
    title: 'The Secret Place: Rekindling Joy in Personal Intercession',
    slug: 'rekindling-joy-personal-intercession',
    category: 'Prayer',
    excerpt: 'Why closet prayer is the wellspring of all spiritual vitality, and how to revive a dry prayer life when words feel scarce.',
    content: `Martin Luther once remarked that to be a Christian without prayer is no more possible than to be alive without breathing. Yet almost every sincere believer experiences seasons of spiritual dryness where opening our mouth in prayer feels like wading through mud.

When prayer feels mechanical, start by praying Scripture back to God. Open Psalm 23 or Psalm 103 and pray verse by verse. Second, keep a quiet prayer journal where you record specific requests with the date, leaving space on the opposite page to record God’s answers. Seeing ink on paper testify to God’s past interventions gives courage to pray for present mountains to be moved.`,
    author: {
      name: 'Elder Marcus Graham',
      role: 'Intercessory Prayer Leader'
    },
    readTime: '5 min read',
    publishedDate: 'Oct 04, 2026',
    imageUrl: '/src/assets/images/radio_broadcast_studio_1791879092340.jpg',
    featured: false
  },
  {
    id: 'art-6',
    title: 'Neighborly Grace: Everyday Conversations That Open Hearts',
    slug: 'neighborly-grace-everyday-evangelism',
    category: 'Evangelism',
    excerpt: 'Sharing the gospel does not require high-pressure sales techniques; it begins with genuine hospitality, active listening, and simple kindness.',
    content: `Most people in our neighborhoods are not looking for an intellectual debate; they are starving for genuine community and longing for hope in an anxious world. Evangelism is often as simple as pulling weeds for an elderly neighbor, inviting a lonely coworker for homemade soup, or asking how you can pray for someone walking through a grief.

When our neighbors see that we genuinely care about them as image-bearers of God regardless of whether they agree with us, trust is born. From that soil of friendship, natural opportunities arise to explain the reason for the hope that is within us with gentleness and respect.`,
    author: {
      name: 'Rev. Samuel Osei',
      role: 'Community Outreach Pastor'
    },
    readTime: '6 min read',
    publishedDate: 'Oct 02, 2026',
    imageUrl: '/src/assets/images/pastoral_study_desk_1791879094526.jpg',
    featured: false
  },
  {
    id: 'art-7',
    title: 'Hymns and Spiritual Songs: Melody as Medicine for the Grieving',
    slug: 'hymns-melody-medicine-grief',
    category: 'Gospel Music',
    excerpt: 'Exploring why the great hymns of our faith carry such unique pastoral power in the hospital room, funeral service, and dark night of the soul.',
    content: `When Horatio Spafford wrote "It Is Well With My Soul," he had just lost his four precious daughters in the icy waters of the Atlantic Ocean. The hymn was not born out of easy prosperity, but forged in the furnace of unimaginable loss.

Great Christian music does not merely stimulate emotional highs; it teaches our theology to sing. In moments when our minds cannot formulate coherent sentences, a hymn line learned in childhood rises from the depths of memory to remind us that Christ will hold us fast.`,
    author: {
      name: 'Sister Abigail Cole',
      role: 'Sacred Music Coordinator'
    },
    readTime: '5 min read',
    publishedDate: 'Sep 29, 2026',
    imageUrl: '/src/assets/images/radio_broadcast_studio_1791879092340.jpg',
    featured: false
  },
  {
    id: 'art-8',
    title: 'Shepherd-Hearted Leadership in the Local Church',
    slug: 'shepherd-hearted-leadership',
    category: 'Christian Leadership',
    excerpt: 'Why true spiritual authority is measured not by platforms or popularity, but by towel-and-basin servant leadership.',
    content: `The modern world measures leaders by organizational scale, branding polish, and charisma. But when the Apostle Peter instructed elders, he used the ancient pastoral metaphor: "Shepherd the flock of God that is among you, exercising oversight, not under compulsion, but willingly, as God would have you; not for shameful gain, but eagerly; not domineering over those in your charge, but being examples to the flock."

A shepherd smells like the sheep. He knows their names, binds up their wounds, and guards them against spiritual wolves. May our churches be filled with men and women who lead on their knees.`,
    author: {
      name: 'Pastor Thomas Vance',
      role: 'Senior Broadcaster'
    },
    readTime: '7 min read',
    publishedDate: 'Sep 25, 2026',
    imageUrl: '/src/assets/images/pastoral_study_desk_1791879094526.jpg',
    featured: false
  },
  {
    id: 'art-9',
    title: 'From Despair to Deliverance: A Marriage Restored by God’s Hand',
    slug: 'marriage-restored-by-god',
    category: 'Testimonies',
    excerpt: 'Robert and Catherine share their remarkable journey from separation and bitterness to deep covenant healing through prayer and counseling.',
    content: `Seven years ago, our marriage was legally and emotionally over. We had separated, stopped speaking except through attorneys, and believed that too much damage had been inflicted to ever repair.

One evening in our empty living room, Catherine tuned into the evening prayer broadcast of this radio station. The minister on air was praying specifically for broken families on the brink of divorce. That night, both of us broke down before God in our separate apartments. The healing took two years of patient pastoral counseling, deep repentance, and learning to forgive, but today our home is full of laughter and our children see the living power of Jesus Christ.`,
    author: {
      name: 'Robert & Catherine Davies',
      role: 'Ministry Partners'
    },
    readTime: '6 min read',
    publishedDate: 'Sep 20, 2026',
    imageUrl: '/src/assets/images/family_bible_gathering_1791879093663.jpg',
    featured: false
  },
  {
    id: 'art-10',
    title: 'Sabbath Rest as an Act of Spiritual Trust',
    slug: 'sabbath-rest-act-of-trust',
    category: 'Christian Living',
    excerpt: 'Stepping off the relentless treadmill of endless hustle to confess that God runs the universe, not our frenetic labor.',
    content: `We live in a culture that treats exhaustion as a badge of honor and burnout as proof of importance. Yet in the Ten Commandments, God gave as much prominence to resting on the Sabbath as He did to honoring father and mother or avoiding idolatry.

When we intentionally stop working for twenty-four hours, we make a profound theological confession: "God, You are in control of my job, my bank account, and my family. You can sustain the world without my frantic effort." Sabbath is not merely physical inactivity; it is a spiritual feast of delight in the Lord.`,
    author: {
      name: 'Pastor Joseph Wright',
      role: 'Associate Pastor'
    },
    readTime: '5 min read',
    publishedDate: 'Sep 15, 2026',
    imageUrl: '/src/assets/images/pastoral_study_desk_1791879094526.jpg',
    featured: false
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pray-1',
    authorName: 'Sarah M.',
    isAnonymous: false,
    isPrivate: false,
    title: 'Healing for My Mother Undergoing Chemotherapy',
    message: 'Please join our family in praying for my mother Martha who starts her third cycle of chemotherapy on Thursday. Pray for minimal nausea, spiritual peace, and that the doctors see significant shrinkage in the tumor.',
    category: 'Healing & Health',
    prayerCount: 142,
    hasUserPrayed: false,
    createdAt: 'Today, 2 hours ago',
    status: 'approved'
  },
  {
    id: 'pray-2',
    authorName: 'A Father in Faith',
    isAnonymous: true,
    isPrivate: false,
    title: 'Prodigal Son in College',
    message: 'My nineteen-year-old son has walked away from church and is battling depression and substance use at university. Pray that the Holy Spirit pursues his heart and surrounds him with godly mentors.',
    category: 'Youth & Children',
    prayerCount: 218,
    hasUserPrayed: false,
    createdAt: 'Yesterday',
    status: 'approved'
  },
  {
    id: 'pray-3',
    authorName: 'Emmanuel K.',
    isAnonymous: false,
    isPrivate: false,
    title: 'Job Provision and Ethical Workplace',
    message: 'I was recently laid off after twelve years with my firm. We have three young children. Pray for peace for my wife and open doors for an honest job where I can provide and honor the Lord.',
    category: 'Employment & Provision',
    prayerCount: 95,
    hasUserPrayed: false,
    createdAt: '2 days ago',
    status: 'approved'
  },
  {
    id: 'pray-4',
    authorName: 'Hannah & David',
    isAnonymous: false,
    isPrivate: false,
    title: 'Covenant Reconciliation in Marriage',
    message: 'We are facing deep communication barriers and feeling distant. Please pray that God gives us grace to listen, forgive old wounds, and rebuild our home on Christ.',
    category: 'Family & Marriage',
    prayerCount: 180,
    hasUserPrayed: false,
    createdAt: '3 days ago',
    status: 'approved'
  },
  {
    id: 'pray-5',
    authorName: 'Pastor Daniel G.',
    isAnonymous: false,
    isPrivate: false,
    title: 'Pastoral Sabbatical and Spiritual Renewal',
    message: 'Carrying heavy burdens from counseling and hospital visits. Pray for fresh spiritual fire, protection over my family, and clarity for upcoming church outreach.',
    category: 'Global Church',
    prayerCount: 76,
    hasUserPrayed: false,
    createdAt: '4 days ago',
    status: 'approved'
  }
];

export const INITIAL_TESTIMONIES: Testimony[] = [
  {
    id: 'test-1',
    authorName: 'Brother Timothy N.',
    location: 'Nairobi, Kenya',
    title: 'Completely Cancer-Free After 8 Months of Prayer',
    story: 'In January, our family submitted a prayer request when my stage 3 lymphoma was diagnosed. Hundreds of saints on this radio station prayed for us. Yesterday, my oncologist gave me the official pathology report: complete remission! All glory to Jesus Christ our Healer.',
    date: 'October 10, 2026',
    category: 'Healing & Health',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'test-2',
    authorName: 'Grace M.',
    location: 'Texas, USA',
    title: 'My Daughter Returned to Faith After 6 Years',
    story: 'After years of silence, my twenty-two-year-old daughter called me on Sunday evening weeping. She had listened to the broadcast and surrendered her life back to Christ. We are worshiping together again!',
    date: 'October 05, 2026',
    category: 'Youth & Children',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'test-3',
    authorName: 'Kofi & Beatrice',
    location: 'Accra, Ghana',
    title: 'Miraculous Provision for Church Roof & Community Altar',
    story: 'Our rural fellowship prayed for funds to repair our storm-damaged roof before the rainy season. An anonymous donor through this ministry covered the exact contractor amount down to the last dollar.',
    date: 'September 28, 2026',
    category: 'Employment & Provision',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'test-4',
    authorName: 'Caleb & Campus Fellowship',
    location: 'Columbus, Ohio',
    title: 'Youth Campus Prayer Awakening and 40 Baptisms',
    story: 'Three students started listening to the morning broadcast in our dorm. We held an acoustic praise circle on the lawn, and over 40 classmates gave their lives to Christ this semester!',
    date: 'September 22, 2026',
    category: 'Youth & Children',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'test-5',
    authorName: 'Sister Hannah & David',
    location: 'London, UK',
    title: 'Baby Samuel Born After 7 Years of Infertility',
    story: 'Doctors told us it was medically impossible. During a Tuesday intercession broadcast, the pastor led a prayer for barren wombs. Ten months later, we welcomed our miracle baby boy into our arms.',
    date: 'September 15, 2026',
    category: 'Family & Marriage',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'test-6',
    authorName: 'Elder Marcus R.',
    location: 'Toronto, Canada',
    title: 'Delivered from 10 Years of Alcoholism',
    story: 'I was broken and alone in my truck when TestifyHub came on the radio. The preaching of the Cross pierced my soul. I gave up drinking that very night and was reconciled with my children.',
    date: 'September 08, 2026',
    category: 'Healing & Health',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'camp-1',
    title: '24/7 Digital Radio Transmitter & Satellite Uplink Outreach',
    description: 'Upgrading our high-bandwidth audio streaming infrastructure, satellite distribution, and redundant broadcast servers to reach unreached remote towns and diaspora communities 24 hours a day.',
    targetAmount: 50000,
    currentAmount: 38450,
    donorsCount: 420,
    category: 'Radio Outreach',
    active: true
  },
  {
    id: 'camp-2',
    title: 'Children & Youth Bible Curriculum Fund',
    description: 'Publishing free, high-quality Sunday school workbooks, memory verse coloring packages, and biblical apologetics toolkits for 120 underserved community churches.',
    targetAmount: 25000,
    currentAmount: 18200,
    donorsCount: 195,
    category: 'Children Curriculum',
    active: true
  },
  {
    id: 'camp-3',
    title: 'Benevolence, Widows & Emergency Food Relief',
    description: 'Providing monthly food parcels, prescription assistance, and pastoral care to elderly widows and struggling families in our listening community.',
    targetAmount: 15000,
    currentAmount: 14100,
    donorsCount: 310,
    category: 'Benevolence & Food',
    active: true
  }
];

export const INITIAL_RESOURCES: MinistryResource[] = [
  {
    id: 'res-1',
    title: 'The Family Altar Starter Kit (4-Week Guide)',
    targetAudience: 'Family',
    type: 'Guide',
    description: 'A practical, non-intimidating four-week guide with 10-minute dinner readings, discussion starters, and easy family prayers.',
    highlights: ['28 Daily 5-minute devotionals', 'Printable dinner table question cards', 'Recommended family hymns with lyrics'],
    downloadName: 'Family-Altar-Starter-Kit.pdf'
  },
  {
    id: 'res-2',
    title: 'Youth Apologetics: 10 Tough Questions Answered Biblically',
    targetAudience: 'Youth',
    type: 'Discussion Cards',
    description: 'Concise, intellectually solid answers to common questions about science and faith, the reliability of Scripture, and the problem of evil.',
    highlights: ['Pocket-sized reference cards', 'Key Greek/Hebrew word explanations', 'Recommended reading list for students'],
    downloadName: 'Youth-Apologetics-Guide.pdf'
  },
  {
    id: 'res-3',
    title: 'Little Shepherds 52 Memory Verse Cards with Illustrations',
    targetAudience: 'Children',
    type: 'Scripture Memory',
    description: 'One scripture verse per week for young children with easy explanations, printable coloring sheets, and hand-motion guides.',
    highlights: ['52 Printable cards', 'Coloring pages for each passage', 'Parent guide for repetition and praise'],
    downloadName: 'Children-52-Memory-Verses.pdf'
  },
  {
    id: 'res-4',
    title: 'Church Elder & Deacon Shepherding Handbook',
    targetAudience: 'Leaders',
    type: 'Devotional Study',
    description: 'Biblical patterns for visiting the sick, hospital prayer etiquette, confidentiality standards, and supporting grieving members.',
    highlights: ['Hospital visitation checklist', 'Sample prayers for the dying', 'Pastoral counseling ethics guide'],
    downloadName: 'Pastoral-Shepherding-Handbook.pdf'
  }
];

export const INITIAL_ADS: AdSlotConfig[] = [
  {
    id: 'ad-top-leaderboard',
    name: 'Top Header Leaderboard (728x90)',
    slotType: 'leaderboard',
    active: true,
    sponsorName: 'Grace Christian Bookstore & Bibles',
    fallbackText: 'Support Kingdom Businesses: Visit Grace Christian Bookstore for Study Bibles & Commentaries'
  },
  {
    id: 'ad-sidebar-rect',
    name: 'Content Sidebar (300x250)',
    slotType: 'rectangle',
    active: true,
    sponsorName: 'Faith & Family Biblical Counseling Network',
    fallbackText: 'Certified Biblical Counseling for Marriages & Individuals: Find a Christian Counselor Near You'
  },
  {
    id: 'ad-radio-vast',
    name: 'VAST Audio Sponsorship Slot',
    slotType: 'vast_audio',
    active: true,
    sponsorName: 'Living Word Global Ministries',
    fallbackText: 'Broadcast underwriting: This hour of continuous praise is supported by generous listeners like you.'
  }
];
