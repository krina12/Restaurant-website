import React, { useState, useMemo } from 'react';
import { Star, CheckCircle, Quote, ThumbsUp, PlusCircle, X, Filter } from 'lucide-react';
import { REVIEWS_DATA, CRITIC_REVIEWS, ReviewItem } from '../data/restaurantData';

export const Reviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(() => {
    try {
      const stored = localStorage.getItem('aurelia_reviews');
      return stored ? JSON.parse(stored) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showWriteModal, setShowWriteModal] = useState<boolean>(false);

  // New review form state
  const [authorName, setAuthorName] = useState<string>('');
  const [authorLocation, setAuthorLocation] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newOccasion, setNewOccasion] = useState<string>('Weekend Dinner');
  const [newComment, setNewComment] = useState<string>('');
  const [recommendedDish, setRecommendedDish] = useState<string>('Wild Turbot & Truffled Sunchoke');

  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return reviewsList;
    return reviewsList.filter(r => r.rating === filterRating);
  }, [reviewsList, filterRating]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      location: authorLocation.trim() || 'San Francisco, CA',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: newRating,
      occasion: newOccasion,
      comment: newComment.trim(),
      verified: true,
      dishRecommended: recommendedDish
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem('aurelia_reviews', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Reset form
    setAuthorName('');
    setAuthorLocation('');
    setNewComment('');
    setShowWriteModal(false);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0D0E11] text-[#E4E4E7] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              Guest Testimonials & Critic Accolades
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
              Voices from the Table
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              Authentic reflections from culinary institutions, critics, and guests who have gathered around our hearth.
            </p>
          </div>

          <button
            onClick={() => setShowWriteModal(true)}
            className="px-5 py-3 bg-[#18191E] hover:bg-[#202127] border border-[#C5A059] text-[#C5A059] hover:text-[#E4C381] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Quantitative Rating Summary & Critic Quotes Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Aggregate Rating Score Card */}
          <div className="lg:col-span-4 p-8 bg-[#14151A] border border-[#27272A] rounded-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#A1A1AA]">Overall Guest Rating</div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-mono text-5xl font-bold text-[#FDFBF7]">4.9</span>
                <span className="text-sm text-[#71717A]">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 text-[#C5A059] mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
                <span className="text-xs text-[#A1A1AA] ml-2 font-mono">840+ Verified Diners</span>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="space-y-3 pt-4 border-t border-[#222329] text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Culinary & Hearth Flavor</span>
                <span className="font-mono text-[#FDFBF7] font-medium">4.9 / 5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Attentive Table Hospitality</span>
                <span className="font-mono text-[#FDFBF7] font-medium">5.0 / 5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Atmosphere & Acoustics</span>
                <span className="font-mono text-[#FDFBF7] font-medium">4.9 / 5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Wine Program & Pairings</span>
                <span className="font-mono text-[#FDFBF7] font-medium">4.8 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Critic Quotes Strip */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {CRITIC_REVIEWS.map(critic => (
              <div
                key={critic.id}
                className="p-6 bg-[#14151A] border border-[#27272A] rounded-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C5A059] font-medium">{critic.ratingBadge}</span>
                    <span className="text-[11px] text-[#71717A]">{critic.year}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed italic">
                    "{critic.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#222329]">
                  <div className="font-editorial text-base text-[#FDFBF7] font-medium">
                    {critic.outlet}
                  </div>
                  <div className="text-[11px] text-[#71717A]">
                    {critic.critic}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#27272A] mb-8 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#71717A] uppercase tracking-wider text-[11px]">Filter by stars:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                filterRating === 'all'
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'bg-[#18191E] text-[#A1A1AA] hover:text-white'
              }`}
            >
              All ({reviewsList.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded cursor-pointer transition-colors flex items-center gap-1 ${
                filterRating === 5
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'bg-[#18191E] text-[#A1A1AA] hover:text-white'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          </div>

          <div className="text-xs text-[#71717A]">
            Showing <strong className="text-[#FDFBF7] font-mono">{filteredReviews.length}</strong> reviews
          </div>
        </div>

        {/* Verified Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="p-6 bg-[#14151A] border border-[#27272A] rounded-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Stars & Unboxed Metadata */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#71717A]">
                    {rev.verified && (
                      <span className="text-[#C5A059] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Guest</span>
                      </span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Review Prose */}
                <p className="text-xs sm:text-sm text-[#D4D4D8] font-light leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Recommended Dish */}
                {rev.dishRecommended && (
                  <div className="text-xs text-[#A1A1AA] pt-1">
                    <span className="text-[#71717A]">Recommended: </span>
                    <strong className="text-[#E4C381] font-normal">{rev.dishRecommended}</strong>
                  </div>
                )}
              </div>

              {/* Author & Occasion */}
              <div className="pt-3 border-t border-[#222329] flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-[#FDFBF7]">{rev.author}</div>
                  <div className="text-[11px] text-[#71717A]">{rev.location}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#C5A059]">{rev.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Your Experience Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#14151A] border border-[#27272A] rounded-xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowWriteModal(false)}
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#FDFBF7] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium">Guest Reflection</span>
              <h3 className="font-editorial text-2xl text-[#FDFBF7] font-medium">Share Your Shivar Experience</h3>
              <p className="text-xs text-[#A1A1AA]">
                Your review helps future guests navigate their culinary journey.
              </p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              
              {/* Star Rating Selector */}
              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-[#3F3F46]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#C5A059] ml-2 font-mono">{newRating} of 5 Stars</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcella Fontaine"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Location / City</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={authorLocation}
                    onChange={e => setAuthorLocation(e.target.value)}
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Dining Occasion</label>
                  <select
                    value={newOccasion}
                    onChange={e => setNewOccasion(e.target.value)}
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none cursor-pointer"
                  >
                    <option value="Anniversary Dinner">Anniversary Dinner</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Chef's Counter Repast">Chef's Counter Repast</option>
                    <option value="Tasting Menu & Wine Flight">Tasting Menu & Wine Flight</option>
                    <option value="Executive Business Dinner">Executive Business Dinner</option>
                    <option value="Casual Fine Dining">Casual Fine Dining</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Favorite Dish</label>
                  <input
                    type="text"
                    value={recommendedDish}
                    onChange={e => setRecommendedDish(e.target.value)}
                    placeholder="e.g. Wild Turbot or A5 Wagyu"
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#A1A1AA]">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your dining experience, standout flavors, wine pairings, or service moments..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="px-4 py-2 text-xs text-[#A1A1AA] hover:text-[#FDFBF7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
