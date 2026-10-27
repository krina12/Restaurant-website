import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowUp, Mail, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0B0D] border-t border-[#222329] text-[#A1A1AA] text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top Tier: Brand, Hours, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-editorial text-2xl font-medium tracking-[0.15em] text-[#FDFBF7] block">
              {RESTAURANT_INFO.name.toUpperCase()}
            </span>
            <p className="text-xs text-[#71717A] leading-relaxed max-w-sm">
              Contemporary fine dining and live woodfire hearth. Rooted in Northern California's seasonal biodiversity 
              and classic French culinary tradition.
            </p>
            <div className="text-[11px] text-[#C5A059] pt-1">
              Two Michelin Stars · Relais & Châteaux · Wine Spectator Grand Award
            </div>
          </div>

          {/* Location & Contact Details */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="text-xs uppercase tracking-wider text-[#FDFBF7] font-medium block">
              San Francisco Portico
            </span>
            <p className="text-[#A1A1AA]">{RESTAURANT_INFO.address}</p>
            <p className="text-[#71717A]">{RESTAURANT_INFO.neighborhood}</p>
            <div className="pt-2 space-y-1">
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="block hover:text-[#C5A059] transition-colors">
                Phone: {RESTAURANT_INFO.phone}
              </a>
              <a href={`mailto:${RESTAURANT_INFO.email}`} className="block hover:text-[#C5A059] transition-colors">
                Email: {RESTAURANT_INFO.email}
              </a>
            </div>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FDFBF7] font-medium block">
              Seasonal Releases & Cellar Allocations
            </span>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Receive private invitations for quarterly menu changes, guest chef residencies, and library cellar flights.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#18191E] border border-[#C5A059] rounded text-xs text-[#C5A059] flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>You are subscribed to the Aurelia Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={subscribedEmail}
                  onChange={e => setSubscribedEmail(e.target.value)}
                  className="bg-[#14151A] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] placeholder-[#71717A] focus:border-[#C5A059] focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Tier: Nav anchors, Copyright, Back to top */}
        <div className="pt-8 border-t border-[#1C1D22] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717A]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a href="#menu" className="hover:text-[#FDFBF7] transition-colors">Digital Menu</a>
            <a href="#specials" className="hover:text-[#FDFBF7] transition-colors">Chef Specials</a>
            <a href="#reservations" className="hover:text-[#FDFBF7] transition-colors">Reservations</a>
            <a href="#story" className="hover:text-[#FDFBF7] transition-colors">Our Story</a>
            <a href="#reviews" className="hover:text-[#FDFBF7] transition-colors">Reviews</a>
            <a href="#directions" className="hover:text-[#FDFBF7] transition-colors">Directions</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <span>Top of Hearth</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
