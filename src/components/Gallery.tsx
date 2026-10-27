import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Atmosphere', 'Culinary Art', 'The Kitchen', 'The Wine Cellar'];

  const filteredGallery = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0F1013] text-[#E4E4E7] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C5A059] font-medium">
              <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Visual Anthology</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
              Aurelia in Light & Shadow
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              Glimpses of the amber-lit dining rooms, ember-roasted courses, and subterranean cellar reserves.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#18191E] border border-[#27272A] rounded-lg overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C5A059] text-black font-semibold shadow'
                    : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (Bento/Mosaic Masonry layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => {
            const actualIndex = GALLERY_ITEMS.findIndex(g => g.id === item.id);
            const isLarge = idx === 0 || idx === 4;

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(actualIndex)}
                className={`relative rounded-xl overflow-hidden group cursor-pointer bg-[#14151A] border border-[#27272A] shadow-lg ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="h-72 sm:h-96 w-full relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[11px] uppercase tracking-wider text-[#C5A059] font-medium">
                    {item.category}
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#C5A059] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#FDFBF7] font-medium leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#D4D4D8] line-clamp-2 font-light">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-[#A1A1AA] hover:text-[#FDFBF7] p-2 rounded-full bg-[#18191E] border border-[#27272A] cursor-pointer z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full border border-white/10 cursor-pointer z-10 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full border border-white/10 cursor-pointer z-10 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              <img
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center space-y-1">
                <span className="text-xs text-[#C5A059] uppercase tracking-widest">
                  {GALLERY_ITEMS[lightboxIndex].category} · Photo {lightboxIndex + 1} of {GALLERY_ITEMS.length}
                </span>
                <h3 className="font-editorial text-2xl text-[#FDFBF7]">
                  {GALLERY_ITEMS[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg mx-auto">
                  {GALLERY_ITEMS[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
