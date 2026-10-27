import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Wine, Info, Check, BookmarkPlus, X, ChevronRight } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface DigitalMenuProps {
  onAddToWishlist: (item: { id: string; name: string; price: number }) => void;
  isWishlisted: (id: string) => boolean;
  onOpenBooking: () => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  onAddToWishlist,
  isWishlisted,
  onOpenBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'starters', label: 'Starters & Crudo' },
    { id: 'mains', label: 'Woodfire & Mains' },
    { id: 'tasting', label: 'Tasting Exclusives' },
    { id: 'desserts', label: 'Pastry & Desserts' },
    { id: 'drinks', label: 'Cocktails & Cellar' },
  ];

  const dietaryOptions = [
    { id: "100%-vegetarian", label: "100% Vegetarian" },
    { id: "vegan", label: "Vegan (Plant-Based)" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "dairy-free", label: "Dairy-Free" },
    { id: "chef-signature", label: "Chef Signature" },
  ];

  const toggleDietary = (tag: string) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const matchesAll = selectedDietary.every(d => item.dietary.includes(d as any));
        if (!matchesAll) return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inName = item.name.toLowerCase().includes(q);
        const inFrench = item.frenchName?.toLowerCase().includes(q) || false;
        const inDesc = item.description.toLowerCase().includes(q);
        const inOrigin = item.origin?.toLowerCase().includes(q) || false;
        if (!inName && !inFrench && !inDesc && !inOrigin) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#0D0E11] text-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            100% Vegetarian Hearth & Sommelier Cellar
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
            The 100% Vegetarian Menu
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
            Every dish is 100% vegetarian and crafted over cured red oak and California almond wood embers. 
            Select items to bookmark in your dinner tasting notes.
          </p>
        </div>

        {/* Controls Bar: Category Tabs & Search/Filter Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Category Tabs (Segmented Controls) */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-md font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#C5A059] text-[#0D0E11] font-semibold shadow'
                    : 'bg-[#18191E] text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#27272A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Dietary Filter Badges */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#14151A] border border-[#27272A] rounded-lg">
            
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ingredients, wagyu, seafood..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#18191E] border border-[#27272A] rounded pl-9 pr-8 py-2 text-xs text-[#FDFBF7] placeholder-[#71717A] focus:border-[#C5A059] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FDFBF7] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons (Interactive Toggles) */}
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium mr-1">
                Filter:
              </span>
              {dietaryOptions.map(option => {
                const active = selectedDietary.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleDietary(option.id)}
                    className={`px-3 py-1.5 text-xs rounded transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C5A059]/15 border border-[#C5A059] text-[#C5A059] font-medium'
                        : 'bg-[#18191E] border border-[#27272A] text-[#A1A1AA] hover:text-[#FDFBF7]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
              {selectedDietary.length > 0 && (
                <button
                  onClick={() => setSelectedDietary([])}
                  className="text-xs text-[#C5A059] hover:underline ml-2 cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#71717A] mb-6 px-1">
          <span>Displaying <strong className="text-[#FDFBF7] font-mono">{filteredItems.length}</strong> culinary selections</span>
          <span>Prices in USD · Service charge optional tableside</span>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-[#14151A] border border-[#27272A] rounded-lg space-y-3">
            <p className="text-base text-[#D4D4D8]">No culinary selections match your current criteria.</p>
            <p className="text-xs text-[#71717A]">Try clearing search keywords or loosening dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary([]);
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs uppercase tracking-wider text-[#C5A059] hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Menu Items Grid: Single-elevation clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map(item => {
            const wishlisted = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="p-6 bg-[#14151A] border border-[#27272A] hover:border-[#3F3F46] rounded-lg transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with typographic separators (NO PILLS) */}
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 text-[#A1A1AA] flex-wrap">
                      <span className="text-[#C5A059] uppercase tracking-wider font-medium">
                        {item.category.toUpperCase()}
                      </span>
                      {item.dietary.map(d => (
                        <React.Fragment key={d}>
                          <span aria-hidden="true" className="text-[#3F3F46]">·</span>
                          <span className="capitalize">{d.replace('-', ' ')}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="font-mono text-base font-medium text-[#FDFBF7] shrink-0">
                      ${item.price}
                    </span>
                  </div>

                  {/* Title & French Subtitle */}
                  <div>
                    <h3 className="font-editorial text-xl text-[#FDFBF7] group-hover:text-[#E4C381] transition-colors font-medium">
                      {item.name}
                    </h3>
                    {item.frenchName && (
                      <p className="text-xs text-[#71717A] italic mt-0.5">
                        {item.frenchName}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Sommelier Pairing Snippet */}
                  {item.pairingNote && (
                    <div className="flex items-center gap-2 text-xs text-[#C5A059]/90 pt-1">
                      <Wine className="w-3.5 h-3.5 shrink-0 text-[#C5A059]" />
                      <span className="truncate italic">Pairing: {item.pairingNote}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#222329] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveItemModal(item)}
                    className="text-xs text-[#A1A1AA] hover:text-[#FDFBF7] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Provenance</span>
                  </button>

                  <button
                    onClick={() => onAddToWishlist({ id: item.id, name: item.name, price: item.price })}
                    className={`px-3 py-1.5 text-xs rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                      wishlisted
                        ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/50 font-medium'
                        : 'border border-[#27272A] hover:border-[#C5A059] text-[#D4D4D8] hover:text-[#C5A059]'
                    }`}
                  >
                    {wishlisted ? (
                      <>
                        <Check className="w-3 h-3 text-[#C5A059]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-3 h-3" />
                        <span>Add to Notes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tasting Menu Banner Callout */}
        <div className="mt-14 p-8 bg-[#18191E] border border-[#3E3424] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              The Sovereign Experience
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#FDFBF7] font-normal">
              8-Course Woodfire Tasting Experience
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl">
              An unscripted seasonal voyage orchestrating rare Pacific crudo, dry-aged meats over live hearth, 
              and architectural confectionery. Available nightly for the entire table.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="text-center md:text-right pr-2">
              <span className="text-xs text-[#71717A] uppercase tracking-wider block">Per Guest</span>
              <span className="font-mono text-2xl font-semibold text-[#FDFBF7]">$195</span>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer shadow active:scale-[0.98]"
            >
              Reserve Tasting
            </button>
          </div>
        </div>

      </div>

      {/* Item Provenance & Sommelier Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14151A] border border-[#27272A] rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#FDFBF7] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C5A059] uppercase tracking-wider">
                <span>{activeItemModal.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#FDFBF7] font-semibold">${activeItemModal.price}</span>
              </div>
              <h3 className="font-editorial text-2xl text-[#FDFBF7] font-medium">
                {activeItemModal.name}
              </h3>
              {activeItemModal.frenchName && (
                <p className="text-xs text-[#71717A] italic">
                  {activeItemModal.frenchName}
                </p>
              )}
            </div>

            <p className="text-sm text-[#D4D4D8] leading-relaxed">
              {activeItemModal.description}
            </p>

            {activeItemModal.origin && (
              <div className="bg-[#18191E] border border-[#27272A] rounded p-3 text-xs space-y-1">
                <span className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] block">
                  Ingredient Provenance
                </span>
                <p className="text-[#A1A1AA]">{activeItemModal.origin}</p>
              </div>
            )}

            {activeItemModal.pairingNote && (
              <div className="bg-[#1B1A1E] border border-[#3E3424] rounded p-3 text-xs space-y-1">
                <span className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] block">
                  Sommelier Pairing Recommendation
                </span>
                <p className="text-[#FDFBF7]">{activeItemModal.pairingNote}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#27272A]">
              <span className="text-xs text-[#71717A]">
                {activeItemModal.calories || 'Freshly prepared for evening service'}
              </span>
              <button
                onClick={() => {
                  onAddToWishlist({
                    id: activeItemModal.id,
                    name: activeItemModal.name,
                    price: activeItemModal.price
                  });
                  setActiveItemModal(null);
                }}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Add to Dinner Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
