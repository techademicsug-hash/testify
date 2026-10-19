import React, { useState } from 'react';
import { Newspaper, Clock, ArrowRight, Search } from 'lucide-react';
import { BlogPost } from '../types';

interface ChristianBlogSectionProps {
  articles: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
}

const CATEGORIES: Array<BlogPost['category'] | 'All'> = [
  'All',
  'Family',
  'Youth',
  'Children',
  'Bible Teaching',
  'Prayer',
  'Evangelism',
  'Gospel Music',
  'Christian Leadership',
  'Testimonies',
  'Christian Living'
];

export const ChristianBlogSection: React.FC<ChristianBlogSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const standardArticles = filteredArticles.filter((a) => a.id !== featuredArticle.id || selectedCategory !== 'All' || searchQuery !== '');

  return (
    <section id="articles" className="py-16 bg-white border-t border-[#E3ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E3ECE6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#025735] mb-1.5">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Biblical Reflection &amp; Christian Living</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2922] tracking-tight">
              TestifyHub Journal &amp; Articles
            </h2>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A9B90] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles &amp; topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F8FAF8] border border-[#E3ECE6] rounded-xl text-xs text-[#1E2922] focus:outline-none focus:ring-1 focus:ring-[#025735]"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#025735] text-white shadow-2xs'
                  : 'bg-[#F0F5F2] hover:bg-[#E6F4EE] text-[#2F3D34]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Lead Article */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div className="mb-12 bg-[#F8FAF8] rounded-3xl border border-[#E3ECE6] overflow-hidden shadow-xs hover:border-[#025735]/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Image side */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-stone-900">
                <img
                  src={featuredArticle.imageUrl || '/src/assets/images/pastoral_study_desk_1791879094526.jpg'}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#025735]/90 text-white text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-xs">
                  Lead Article · {featuredArticle.category}
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#526057]">
                    <span>{featuredArticle.publishedDate}</span>
                    <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8A9B90]" /> {featuredArticle.readTime}
                    </span>
                    <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
                    <span>By {featuredArticle.author.name}</span>
                  </div>

                  <h3
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="text-2xl sm:text-3xl font-extrabold text-[#1E2922] hover:text-[#025735] cursor-pointer leading-tight transition-colors"
                  >
                    {featuredArticle.title}
                  </h3>

                  <p className="text-[#3E4E44] text-sm sm:text-base leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3ECE6] flex items-center justify-between">
                  <span className="text-xs text-[#526057] font-medium">
                    {featuredArticle.author.role}
                  </span>
                  <button
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="px-5 py-2.5 bg-[#025735] hover:bg-[#014026] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standardArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-[#F8FAF8] rounded-2xl border border-[#E3ECE6] overflow-hidden shadow-2xs hover:border-[#025735]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  <img
                    src={article.imageUrl || '/src/assets/images/pastoral_study_desk_1791879094526.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#025735]/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#526057]">
                    <span>{article.publishedDate}</span>
                    <span aria-hidden="true" className="text-[#c7d6cd]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8A9B90]" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E2922] group-hover:text-[#025735] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-[#526057] text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-[#526057] border-t border-[#E3ECE6] mt-2">
                <span className="font-semibold text-[#1E2922]">
                  {article.author.name}
                </span>
                <span className="font-bold text-[#025735] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {standardArticles.length === 0 && (
          <div className="py-16 text-center text-[#526057] text-sm">
            No articles found in this category. Check back soon for fresh editorial essays.
          </div>
        )}

      </div>
    </section>
  );
};
