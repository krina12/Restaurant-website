import React, { useState } from 'react';
import { Wine, Flame, Sparkles, Check, BookmarkPlus, ChevronRight, Volume2, Info } from 'lucide-react';
import { CHEF_SPECIALS, ChefSpecial } from '../data/restaurantData';

interface ChefSpecialsProps {
  onAddToWishlist: (item: { id: string; name: string; price: number }) => void;
  isWishlisted: (id: string) => boolean;
  onBookWithSpecial: (special: ChefSpecial) => void;
}

export const ChefSpecials: React.FC<ChefSpecialsProps> = ({
  onAddToWishlist,
  isWishlisted,
  onBookWithSpecial
}) => {
  const [activeSpecialIndex, setActiveSpecialIndex] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);
  const currentSpecial = CHEF_SPECIALS[activeSpecialIndex];

  const handlePlayVoice = () => {
    setPlayingAudio(true);
    // Simulate audio chef notes
    setTimeout(() => {
      setPlayingAudio(false);
    }, 3000);
  };

  return (
    <section id="specials" className="py-24 bg-[#0F1013] border-t border-[#27272A] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C5A059] font-medium">
              <Flame className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>100% Vegetarian Seasonal Repast</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
              Featured Chef Specials
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              Limited-run culinary explorations conceived daily by Executive Chef Elena Rostova, 
              crafted around rare micro-harvests and cellar releases.
            </p>
          </div>

          {/* Interactive Selector Tabs (Functional Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#18191E] border border-[#27272A] rounded-lg">
            {CHEF_SPECIALS.map((special, idx) => (
              <button
                key={special.id}
                onClick={() => setActiveSpecialIndex(idx)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeSpecialIndex === idx
                    ? 'bg-[#C5A059] text-[#0D0E11] font-semibold shadow'
                    : 'text-[#A1A1AA] hover:text-[#FDFBF7] hover:bg-[#202127]'
                }`}
              >
                {special.title.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Feature Display (Split 2-Column Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#14151A] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl">
          
          {/* Left Column: High-Res Imagery */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[540px] group overflow-hidden bg-[#0A0B0E]">
            <img
              src={currentSpecial.image}
              alt={currentSpecial.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] via-transparent to-transparent lg:hidden" />
            
            {/* Price Badge / Overlay */}
            <div className="absolute top-5 left-5 bg-[#0D0E11]/85 backdrop-blur-md border border-[#27272A] px-3.5 py-1.5 rounded text-xs text-[#FDFBF7] flex items-center gap-2">
              <span className="text-[#C5A059] font-medium uppercase tracking-wider">A la Carte</span>
              <span className="font-mono text-sm font-semibold">${currentSpecial.price}</span>
            </div>

            {/* Provenance Footer on Image */}
            <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-center justify-between text-xs text-[#E4E4E7] bg-[#0D0E11]/80 backdrop-blur-md border border-[#27272A] px-4 py-2.5 rounded">
              <span className="text-[#A1A1AA] truncate">Provenance: <strong className="text-[#FDFBF7] font-normal">{currentSpecial.origin}</strong></span>
              <span className="text-[#C5A059] text-[11px] uppercase tracking-wider shrink-0 ml-2">Verified Sourcing</span>
            </div>
          </div>

          {/* Right Column: Culinary Narrative & Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category & Title */}
              <div className="space-y-1">
                <div className="text-xs text-[#C5A059] uppercase tracking-[0.2em] font-medium">
                  Dish {activeSpecialIndex + 1} of {CHEF_SPECIALS.length}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#FDFBF7] font-medium">
                  {currentSpecial.title}
                </h3>
                <p className="text-sm text-[#D4D4D8] italic">
                  {currentSpecial.subtitle}
                </p>
              </div>

              {/* Chef's Personal Note Quote */}
              <div className="bg-[#18191E] border border-[#27272A] rounded-lg p-4 relative space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                    Chef Elena Rostova's Reflection
                  </span>
                  <button
                    onClick={handlePlayVoice}
                    className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] hover:text-[#C5A059] transition-colors cursor-pointer"
                    title="Listen to Chef's note"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingAudio ? 'text-[#C5A059] animate-pulse' : ''}`} />
                    <span>{playingAudio ? 'Playing note...' : 'Listen note'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
                  "{currentSpecial.chefQuote}"
                </p>
              </div>

              {/* Sommelier Pairing Strip */}
              <div className="flex items-start gap-3 p-3.5 bg-[#1B1A1E] border border-[#3E3424] rounded-lg">
                <Wine className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div className="text-[#C5A059] font-medium uppercase tracking-wider">
                    Sommelier Glass Pairing
                  </div>
                  <div className="text-[#FDFBF7] font-medium">
                    {currentSpecial.sommelierPairing}
                  </div>
                  <div className="text-[#A1A1AA] text-[11px]">
                    {currentSpecial.pairingVintage}
                  </div>
                </div>
              </div>

              {/* Flavor Profile Notes (Clean unboxed text metadata with separators) */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                  Palette Profile
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4D4D8]">
                  {currentSpecial.flavorNotes.map((note, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-[#E4E4E7]">{note}</span>
                      {idx < currentSpecial.flavorNotes.length - 1 && (
                        <span aria-hidden="true" className="text-[#52525B]">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Technique */}
              <div className="text-xs text-[#A1A1AA] pt-1">
                <span className="text-[#71717A] uppercase tracking-wider text-[11px]">Preparation: </span>
                <span>{currentSpecial.technique}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#27272A] flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookWithSpecial(currentSpecial)}
                className="flex-1 min-w-[200px] px-5 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer shadow active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Reserve with this Special</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onAddToWishlist({
                  id: currentSpecial.id,
                  name: currentSpecial.title,
                  price: currentSpecial.price
                })}
                className={`px-4 py-3 border text-xs font-medium rounded transition-all cursor-pointer flex items-center gap-2 ${
                  isWishlisted(currentSpecial.id)
                    ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                    : 'border-[#3F3F46] text-[#FDFBF7] hover:border-[#C5A059] hover:text-[#C5A059]'
                }`}
              >
                {isWishlisted(currentSpecial.id) ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Saved to Notes</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Save to Dinner Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
