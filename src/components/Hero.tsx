import React, { useState } from 'react';
import { Calendar, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';

interface HeroProps {
  onQuickBook: (guests: number, date: string, time: string) => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook, onExploreMenu }) => {
  // Pre-fill quick reservation parameters
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('19:00');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(guests, date, time);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0D0E11]">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Shivar main dining room at dusk with glowing candles and wine wall"
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-[#0D0E11]/60 to-[#0D0E11]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,14,17,0.7)_100%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Subtle editorial kicker without static pill enclosures */}
          <div className="flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase text-[#C5A059] font-medium">
            <span>Two Michelin Stars & Green Star</span>
            <span aria-hidden="true" className="text-[#71717A]">·</span>
            <span>Relais & Châteaux Member</span>
            <span aria-hidden="true" className="text-[#71717A]">·</span>
            <span>100% Vegetarian Hearth</span>
          </div>

          {/* Refined Display Headline */}
          <h1 
            className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FDFBF7] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Elemental Fire. <br />
            <span className="italic font-normal text-[#E4C381]">Unhurried Grace.</span>
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-[#D4D4D8] font-light leading-relaxed max-w-2xl">
            A celebration of plant-forward coastal terroir and classical French hearthcraft. Woodfire cooking over cured red oak, wild Sierra mushrooms, organic biodynamic harvests, and an architectural library of 2,200 cellar vintages.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onQuickBook(guests, date, time)}
              className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-[0.15em] rounded transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Reserve Your Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreMenu}
              className="px-6 py-3.5 border border-[#3F3F46] hover:border-[#C5A059] text-[#FDFBF7] hover:text-[#C5A059] text-xs font-medium uppercase tracking-[0.15em] rounded transition-colors backdrop-blur-sm bg-[#18181B]/40 cursor-pointer"
            >
              Explore Digital Menu
            </button>
          </div>
        </div>

        {/* Quick Booking Strip (Functional Table Reservation Search) */}
        <div className="mt-14 max-w-4xl bg-[#121316]/90 border border-[#27272A] backdrop-blur-md rounded-lg p-4 sm:p-5 shadow-2xl">
          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 lg:gap-4 items-center">
            
            {/* Party Size */}
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-[#18181B] border border-[#27272A] rounded px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
              >
                <option value={1}>1 Guest (Solo / Counter)</option>
                <option value={2}>2 Guests (Table / Counter)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6 Guests (Large Table)</option>
                <option value={8}>8 Guests (Private Section)</option>
                <option value={12}>10–14 Guests (Wine Vault)</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#18181B] border border-[#27272A] rounded px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Service Time</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-[#18181B] border border-[#27272A] rounded px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
              >
                <option value="17:00">5:00 PM (Early Seating)</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:15">6:15 PM</option>
                <option value="19:00">7:00 PM (Prime Dinner)</option>
                <option value="19:45">7:45 PM (Prime Dinner)</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:15">9:15 PM (Late Seating)</option>
              </select>
            </div>

            {/* Action */}
            <div className="sm:pt-5">
              <button
                type="submit"
                className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition-all cursor-pointer shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Find Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full-width 4-Column Credential Strip */}
      <div className="relative z-10 border-t border-[#27272A] bg-[#0A0B0D]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#A1A1AA]">
          <div className="flex flex-col">
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">Michelin Guide 2026</span>
            <span className="text-[#FDFBF7] font-editorial text-base mt-0.5">Two Michelin Stars</span>
            <span className="text-[#71717A] text-[11px] mt-0.5">Chef Elena Rostova</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">Wine Spectator</span>
            <span className="text-[#FDFBF7] font-editorial text-base mt-0.5">Grand Award Winner</span>
            <span className="text-[#71717A] text-[11px] mt-0.5">2,200 Subterranean Labels</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">Culinary Philosophy</span>
            <span className="text-[#FDFBF7] font-editorial text-base mt-0.5">Live Fire & Hearth</span>
            <span className="text-[#71717A] text-[11px] mt-0.5">Aged California Almond Wood</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">San Francisco</span>
            <span className="text-[#FDFBF7] font-editorial text-base mt-0.5">Heritage Quay Pier 14</span>
            <span className="text-[#71717A] text-[11px] mt-0.5">Complimentary Valet Service</span>
          </div>
        </div>
      </div>
    </section>
  );
};
