import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ChefSpecials } from "./components/ChefSpecials";
import { DigitalMenu } from "./components/DigitalMenu";
import { OurStory } from "./components/OurStory";
import { Gallery } from "./components/Gallery";
import { Reviews } from "./components/Reviews";
import { ReservationSystem } from "./components/ReservationSystem";
import { DirectionsAndContact } from "./components/DirectionsAndContact";
import { Footer } from "./components/Footer";
import { DiningNotesDrawer } from "./components/DiningNotesDrawer";
import { ChefSpecial, RESTAURANT_INFO } from "./data/restaurantData";
import { Check, Calendar, ArrowLeft, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";

export default function App() {
  // Page view state: "home" or "book-a-table"
  const [currentView, setCurrentView] = useState<"home" | "book-a-table">("home");

  // Booking parameters
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("19:00");
  const [selectedSpecial, setSelectedSpecial] = useState<ChefSpecial | null>(null);

  // Dining wishlist state (saved to localStorage)
  const [wishlistItems, setWishlistItems] = useState<{ id: string; name: string; price: number }[]>(() => {
    try {
      const stored = localStorage.getItem("aurelia_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aurelia_wishlist", JSON.stringify(wishlistItems));
    } catch (err) {
      console.error(err);
    }
  }, [wishlistItems]);

  // Section observer for active navbar highlighting in home view
  useEffect(() => {
    if (currentView !== "home") return;

    const sectionIds = ["menu", "specials", "story", "gallery", "reviews", "reservations", "directions"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Wishlist actions
  const handleAddToWishlist = (item: { id: string; name: string; price: number }) => {
    if (wishlistItems.some(i => i.id === item.id)) {
      setWishlistItems(prev => prev.filter(i => i.id !== item.id));
      showToast(`Removed "${item.name}" from your dinner notes`);
    } else {
      setWishlistItems(prev => [...prev, item]);
      showToast(`Added "${item.name}" to your dinner notes`);
    }
  };

  const isWishlisted = (id: string) => wishlistItems.some(i => i.id === id);

  const handleRemoveWishlistItem = (id: string) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
    showToast("Dining notes cleared");
  };

  // Switch to Book a Table page (keeping navigation bar visible at the top)
  const handleOpenBooking = (guests?: number, date?: string, time?: string, special?: ChefSpecial | null) => {
    if (guests) setBookingGuests(guests);
    if (date) setBookingDate(date);
    if (time) setBookingTime(time);
    if (special !== undefined) setSelectedSpecial(special);
    
    setCurrentView("book-a-table");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate back to home or a specific section
  const handleNavigateHome = (sectionId?: string) => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBookWithSpecial = (special: ChefSpecial) => {
    handleOpenBooking(undefined, undefined, undefined, special);
  };

  const handleProceedWishlistBooking = () => {
    setIsWishlistOpen(false);
    handleOpenBooking();
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#E4E4E7] flex flex-col font-sans selection:bg-[#C5A059] selection:text-black">
      
      {/* Strict 3-zone Top Bar Contract Navbar - Always visible in both Home and Book a Table page */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onNavigateHome={handleNavigateHome}
        wishlistCount={wishlistItems.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeSection={activeSection}
        isBookingPage={currentView === "book-a-table"}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: DEDICATED BOOK A TABLE PAGE (With Navigation Bar always visible above) */}
        {currentView === "book-a-table" ? (
          <div className="py-10 bg-[#0F1013] min-h-[85vh]">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-8">
              
              {/* Breadcrumb & Navigation helper */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#27272A] text-xs">
                <div className="flex items-center gap-2 text-[#A1A1AA]">
                  <button
                    onClick={() => handleNavigateHome()}
                    className="hover:text-[#FDFBF7] flex items-center gap-1.5 cursor-pointer text-[#C5A059]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Restaurant Home</span>
                  </button>
                  <span aria-hidden="true" className="text-[#3F3F46]">/</span>
                  <span className="text-[#FDFBF7] font-medium">Book a Table</span>
                </div>

                <div className="text-[11px] text-[#C5A059] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Two Michelin Stars · 100% Vegetarian Woodfire Gastronomy</span>
                </div>
              </div>

              {/* Page Title & Scent/Atmosphere Introduction */}
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
                  Table Reservations & Private Vault
                </span>
                <h1 className="font-editorial text-4xl sm:text-5xl text-[#FDFBF7] font-normal tracking-tight">
                  Reserve Your Evening at Aurelia
                </h1>
                <p className="text-sm text-[#A1A1AA] max-w-2xl font-light leading-relaxed">
                  Join us around the live almond-wood hearth. We accommodate intimate celebrations, solo diners 
                  at the Chef's Hearth Counter, and private gatherings in the subterranean wine vault.
                </p>
              </div>

              {/* Special Pre-selection Callout if triggered from a chef special */}
              {selectedSpecial && (
                <div className="p-4 bg-[#18191E] border border-[#C5A059] rounded-xl flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[#C5A059] uppercase tracking-wider text-[10px] font-medium block">
                      Pre-Selected Chef Special
                    </span>
                    <strong className="text-[#FDFBF7] text-sm font-medium">{selectedSpecial.title}</strong>
                    <span className="text-[#A1A1AA] block text-[11px] mt-0.5">
                      $${selectedSpecial.price} · {selectedSpecial.subtitle}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedSpecial(null)}
                    className="text-xs text-[#71717A] hover:text-[#EF4444] underline cursor-pointer"
                  >
                    Change selection
                  </button>
                </div>
              )}

              {/* The Core Reservation Booking System */}
              <ReservationSystem
                initialGuests={bookingGuests}
                initialDate={bookingDate}
                initialTime={bookingTime}
                preselectedNote={selectedSpecial ? `Requested Chef Special: ${selectedSpecial.title} ($${selectedSpecial.price})` : ""}
                wishlistItems={wishlistItems}
              />

              {/* Hospitality Policies & Valet Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-[#A1A1AA]">
                <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-1">
                  <div className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Dining Duration</span>
                  </div>
                  <p>2 hours allocated for à la carte dining; 2.5 hours for the 8-course Botanical Hearth Tasting.</p>
                </div>

                <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-1">
                  <div className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Complimentary Valet</span>
                  </div>
                  <p>Attendants greet arriving diners at our 450 Heritage Quay Blvd porte-cochère starting at 4:00 PM.</p>
                </div>

                <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-1">
                  <div className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Cancellation Courtesy</span>
                  </div>
                  <p>Modify or cancel with no penalty up to 24 hours prior to service.</p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* VIEW 2: FULL RESTAURANT HOME PAGE */
          <>
            {/* 1. Hero Section with Atmosphere & Quick Booking Strip */}
            <Hero
              onQuickBook={(g, d, t) => handleOpenBooking(g, d, t)}
              onExploreMenu={() => handleNavigateHome("menu")}
            />

            {/* 2. Interactive Featured 100% Vegetarian Chef Specials */}
            <ChefSpecials
              onAddToWishlist={handleAddToWishlist}
              isWishlisted={isWishlisted}
              onBookWithSpecial={handleBookWithSpecial}
            />

            {/* 3. Digital Menu with 100% Vegetarian Dishes & Dietary Filters */}
            <DigitalMenu
              onAddToWishlist={handleAddToWishlist}
              isWishlisted={isWishlisted}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 4. History & Story of Aurelia + Interactive Timeline */}
            <OurStory />

            {/* 5. Curated Gallery of High-Quality Photos with Lightbox */}
            <Gallery />

            {/* 6. Reviews & Critic Endorsements + Submit Review Modal */}
            <Reviews />

            {/* 7. Dedicated Online Reservation Section in Flow */}
            <ReservationSystem
              initialGuests={bookingGuests}
              initialDate={bookingDate}
              initialTime={bookingTime}
              wishlistItems={wishlistItems}
            />

            {/* 8. Google Map Directions & Transit Planner + Contact Form */}
            <DirectionsAndContact />
          </>
        )}

      </main>

      {/* Clean Disciplined Footer */}
      <Footer />

      {/* Slide-out Dining Notes Drawer */}
      <DiningNotesDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveWishlistItem}
        onClearAll={handleClearWishlist}
        onProceedToBooking={handleProceedWishlistBooking}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14151A] border border-[#C5A059] text-xs text-[#FDFBF7] px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 animate-fade-in">
          <div className="p-1 rounded-full bg-[#C5A059]/20 text-[#C5A059]">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Quick Booking Pill (under 15% mobile viewport cap) */}
      {currentView === "home" && (
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => handleOpenBooking()}
            className="w-full py-3 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded-lg shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Table</span>
          </button>
        </div>
      )}

    </div>
  );
}
