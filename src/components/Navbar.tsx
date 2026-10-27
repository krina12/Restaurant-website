import React, { useState } from "react";
import { Menu, X, Calendar, Phone, ArrowLeft, Utensils } from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurantData";

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateHome: (sectionId?: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  activeSection: string;
  isBookingPage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateHome,
  wishlistCount,
  onOpenWishlist,
  activeSection,
  isBookingPage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Menu", id: "menu" },
    { label: "Chef's Specials", id: "specials" },
    { label: "Our Story", id: "story" },
    { label: "Gallery", id: "gallery" },
    { label: "Reviews", id: "reviews" },
    { label: "Directions", id: "directions" },
    { label: "Book a Table", id: "reservations" },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "reservations") {
      onOpenBooking();
    } else {
      onNavigateHome(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D0E11]/95 backdrop-blur-md border-b border-[#27272A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => onNavigateHome()} 
          className="font-editorial text-2xl lg:text-3xl font-medium tracking-[0.15em] text-[#FDFBF7] hover:text-[#C5A059] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {RESTAURANT_INFO.name.toUpperCase()}
        </button>

        {/* Zone 2: Single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs uppercase tracking-[0.16em] font-medium text-[#A1A1AA]">
          {navLinks.map((link) => {
            const isActive = isBookingPage 
              ? link.id === "reservations" 
              : activeSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`hover:text-[#FDFBF7] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer border-b-2 ${
                  isActive
                    ? "border-[#C5A059] text-[#FDFBF7]"
                    : "border-transparent"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {wishlistCount > 0 && (
            <button
              onClick={onOpenWishlist}
              className="hidden sm:flex items-center gap-2 text-xs tracking-wider uppercase text-[#C5A059] hover:text-[#E4C381] px-3 py-2 rounded border border-[#C5A059]/30 hover:border-[#C5A059] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="View your saved dinner notes"
            >
              <span>Dining Notes</span>
              <span className="font-mono text-[11px] bg-[#C5A059] text-black font-semibold px-1.5 py-0.2 rounded">
                {wishlistCount}
              </span>
            </button>
          )}

          {isBookingPage ? (
            <button
              onClick={() => onNavigateHome("menu")}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FDFBF7] hover:text-[#C5A059] bg-[#18191E] border border-[#27272A] hover:border-[#C5A059] transition-all rounded whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Explore Menu</span>
            </button>
          ) : (
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0D0E11] bg-[#C5A059] hover:bg-[#D4AF37] transition-all rounded shadow-sm hover:shadow-[#C5A059]/20 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#A1A1AA] hover:text-[#FDFBF7] transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121316] border-b border-[#27272A] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-sm uppercase tracking-widest text-[#D4D4D8] hover:text-[#C5A059] py-1 cursor-pointer transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#27272A] flex items-center justify-between text-xs text-[#A1A1AA]">
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-2 hover:text-[#FDFBF7]">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            {wishlistCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="text-[#C5A059] underline cursor-pointer"
              >
                Dining Notes ({wishlistCount})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
