import React, { useState } from 'react';
import { Sparkles, Award, Compass, Flame, Leaf, Wine } from 'lucide-react';
import { TIMELINE_EVENTS, TEAM_MEMBERS, TimelineEvent } from '../data/restaurantData';

export const OurStory: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState<number>(TIMELINE_EVENTS.length - 1);
  const activeEvent = TIMELINE_EVENTS[activeEventIndex];

  return (
    <section id="story" className="py-24 bg-[#0D0E11] text-[#E4E4E7] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            Heritage & Culinary Philosophy
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
            Thirty-Eight Years of Live Fire & Coastal Terroir
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
            From an intimate 24-seat woodfire hearth in Paris to the historic waterfront warehouse on San Francisco's 
            Heritage Quay. Aurelia was conceived on a singular premise: that fire is not merely heat, but a living seasoning.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6 text-sm text-[#A1A1AA] leading-relaxed font-light">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#FDFBF7] font-normal leading-snug">
              "The hearth cannot be rushed. It teaches patience, reverence, and unmasked honesty."
            </h3>
            
            <p>
              When Master Chef Henri Aurelia opened our first kitchen on Rue de Seine in 1988, French fine dining was dominated 
              by heavy sauces and masked reductions. Aurelia rebelled by installing an open hearth fueled by French vineyard trimmings 
              and seasoned beechwood—exposing raw ingredients to the primal truth of ember cooking.
            </p>

            <p>
              In 2004, the search for biodiversity led the team to Northern California. Here, surrounded by the marine upwelling of 
              the Pacific Coast, the biodynamic farms of Sonoma County, and ancient orchards of almond and oak, Aurelia found its 
              permanent soul in a converted 1894 maritime grain warehouse on Pier 14.
            </p>

            {/* Sourcing badges without pill containers */}
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-1">
                <span className="text-[#C5A059] font-medium uppercase tracking-wider block text-[11px]">Zero-Waste Kitchen</span>
                <p className="text-[#D4D4D8]">Every bone, shell, and botanical stem is fermented, smoked, or converted to broths and glazes.</p>
              </div>

              <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-1">
                <span className="text-[#C5A059] font-medium uppercase tracking-wider block text-[11px]">Aged Cured Woods</span>
                <p className="text-[#D4D4D8]">We burn exclusively 3-year cured California almond wood and coastal white oak embers.</p>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden bg-[#14151A] border border-[#27272A] shadow-2xl">
            <img
              src="/src/assets/images/restaurant_woodfire_hearth_1793094174668.jpg"
              alt="Artisanal open woodfire hearth at Aurelia"
              className="w-full h-[460px] object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-xs text-[#E4E4E7] bg-[#0D0E11]/85 backdrop-blur-md border border-[#27272A] p-4 rounded-lg">
              <div className="text-[#C5A059] uppercase tracking-wider text-[11px] font-medium">The Living Hearth</div>
              <p className="text-[#A1A1AA] mt-0.5">
                Executive Chef Elena Rostova overseeing dinner service over open almond wood coals.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Heritage Timeline */}
        <div className="p-8 bg-[#14151A] border border-[#27272A] rounded-xl space-y-8 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">Interactive Archives</span>
              <h3 className="font-editorial text-2xl text-[#FDFBF7] font-normal mt-0.5">Historical Timeline</h3>
            </div>
            <span className="text-xs text-[#71717A]">Click any era to view milestones</span>
          </div>

          {/* Timeline Buttons (Functional tabs) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-[#27272A] pb-4">
            {TIMELINE_EVENTS.map((event, idx) => (
              <button
                key={event.year}
                onClick={() => setActiveEventIndex(idx)}
                className={`py-3 px-2 text-center rounded transition-all cursor-pointer ${
                  activeEventIndex === idx
                    ? 'bg-[#C5A059] text-black font-bold shadow'
                    : 'bg-[#18191E] border border-[#27272A] text-[#A1A1AA] hover:text-[#FDFBF7]'
                }`}
              >
                <div className="font-mono text-base">{event.year}</div>
                <div className={`text-[10px] uppercase truncate ${activeEventIndex === idx ? 'text-black/80' : 'text-[#71717A]'}`}>
                  {event.title.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Active Era Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            <div className="md:col-span-3 text-center md:text-left">
              <span className="font-mono text-5xl font-light text-[#C5A059] block">
                {activeEvent.year}
              </span>
              <span className="text-xs text-[#71717A] uppercase tracking-wider mt-1 block">
                {activeEvent.location}
              </span>
            </div>
            <div className="md:col-span-9 space-y-2">
              <h4 className="font-editorial text-xl text-[#FDFBF7] font-medium">
                {activeEvent.title}
              </h4>
              <p className="text-sm text-[#A1A1AA] font-light leading-relaxed">
                {activeEvent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Brigade */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">The Custodians of Craft</span>
            <h3 className="font-editorial text-3xl text-[#FDFBF7] font-normal">
              Culinary Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-[#14151A] border border-[#27272A] rounded-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium block">
                      {member.role}
                    </span>
                    <h4 className="font-editorial text-2xl text-[#FDFBF7] font-medium">
                      {member.name}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#222329] text-[11px] text-[#D4D4D8]">
                  <span className="text-[#71717A]">Accolade: </span>
                  <span className="font-medium text-[#E4C381]">{member.accolade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
