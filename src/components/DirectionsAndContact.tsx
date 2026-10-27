import React, { useState } from 'react';
import { MapPin, Navigation, Car, Train, Footprints, ExternalLink, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO, DIRECTION_ROUTES, DirectionRoute } from '../data/restaurantData';

export const DirectionsAndContact: React.FC = () => {
  // Directions state
  const [selectedRouteId, setSelectedRouteId] = useState<string>('sfo');
  const [travelMode, setTravelMode] = useState<'drive' | 'transit' | 'walk'>('drive');
  const [customOrigin, setCustomOrigin] = useState<string>('');

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<string>('Private Dining & Buyouts');
  const [message, setMessage] = useState<string>('');
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const currentRoute = DIRECTION_ROUTES.find(r => r.id === selectedRouteId) || DIRECTION_ROUTES[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !message) return;

    const storedInquiries = (() => {
      try {
        const stored = localStorage.getItem('aurelia_inquiries');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    })();

    const newInquiry = {
      id: Date.now().toString(),
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      type: inquiryType,
      message,
      date: new Date().toLocaleDateString('en-US')
    };

    try {
      localStorage.setItem('aurelia_inquiries', JSON.stringify([newInquiry, ...storedInquiries]));
    } catch (err) {
      console.error(err);
    }

    setSubmittedMessage(true);
  };

  return (
    <section id="directions" className="py-24 bg-[#0F1013] text-[#E4E4E7] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            Location, Transit & Inquiries
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#FDFBF7] tracking-tight">
            Finding Your Way to the Hearth
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed">
            Situated on the historic Embarcadero waterfront overlooking the San Francisco Bay, 
            steps from Pier 14 with valet attendants stationed at our private portico.
          </p>
        </div>

        {/* PART 1: Interactive Google Maps & Directions Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Route Planner & Steps */}
          <div className="lg:col-span-5 bg-[#14151A] border border-[#27272A] rounded-xl p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                <span>Interactive Route Planner</span>
              </span>
              <h3 className="font-editorial text-2xl text-[#FDFBF7] font-medium">
                Turn-by-Turn Directions
              </h3>
            </div>

            {/* Origin Selector */}
            <div className="space-y-2">
              <label className="text-xs text-[#A1A1AA] font-medium">Starting Location</label>
              <div className="space-y-2">
                {DIRECTION_ROUTES.map(route => (
                  <button
                    key={route.id}
                    onClick={() => { setSelectedRouteId(route.id); setCustomOrigin(''); }}
                    className={`w-full p-3 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                      selectedRouteId === route.id && !customOrigin
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#FDFBF7]'
                        : 'border-[#27272A] bg-[#18191E] text-[#A1A1AA] hover:text-[#FDFBF7]'
                    }`}
                  >
                    <div className="font-medium text-[#FDFBF7]">{route.originName}</div>
                    <div className="text-[11px] text-[#71717A] mt-0.5">
                      Distance: {route.distance} · Driving: {route.durationDrive}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Mode Selector */}
            <div className="flex items-center gap-2 p-1 bg-[#18191E] border border-[#27272A] rounded-lg text-xs">
              <button
                onClick={() => setTravelMode('drive')}
                className={`flex-1 py-2 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  travelMode === 'drive'
                    ? 'bg-[#C5A059] text-black font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Drive ({currentRoute.durationDrive})</span>
              </button>

              <button
                onClick={() => setTravelMode('transit')}
                className={`flex-1 py-2 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  travelMode === 'transit'
                    ? 'bg-[#C5A059] text-black font-semibold'
                    : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>Transit</span>
              </button>

              {currentRoute.durationWalk && (
                <button
                  onClick={() => setTravelMode('walk')}
                  className={`flex-1 py-2 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    travelMode === 'walk'
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Walk</span>
                </button>
              )}
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-wider text-[#71717A] font-medium">
                Routing Instructions ({travelMode.toUpperCase()})
              </div>
              <div className="space-y-2 text-xs text-[#D4D4D8]">
                {travelMode === 'transit' ? (
                  <div className="p-3 bg-[#18191E] border border-[#27272A] rounded space-y-1.5">
                    <div className="font-medium text-[#C5A059]">BART & Muni Route:</div>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Take any BART line or Muni Metro (J, K, M, N, T) to <strong>Embarcadero Station</strong>. 
                      Exit toward Ferry Building / Market Street and walk 4 minutes south on The Embarcadero toward Pier 14. 
                      Historic F-Line streetcar stops directly opposite Heritage Quay Blvd.
                    </p>
                  </div>
                ) : travelMode === 'walk' ? (
                  <div className="p-3 bg-[#18191E] border border-[#27272A] rounded space-y-1.5">
                    <div className="font-medium text-[#C5A059]">Scenic Waterfront Promenade:</div>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      Stroll east down Market Street past the historic Ferry Building tower, then south along the 
                      Embarcadero promenade with unobstructed panoramic views of the illuminated Bay Bridge.
                    </p>
                  </div>
                ) : (
                  currentRoute.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-[11px] text-[#C5A059] shrink-0 mt-0.5">0{idx + 1}.</span>
                      <span className="leading-relaxed text-[#A1A1AA]">{step}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Direct Google Maps Live Link Button */}
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow active:scale-[0.98]"
              >
                <span>Open in Google Maps Navigation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Canvas & Logistics */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Styled Map Viewport */}
            <div className="bg-[#14151A] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl relative">
              
              {/* Map Canvas / Visual simulation with landmarks */}
              <div className="h-96 sm:h-[420px] w-full bg-[#121316] relative overflow-hidden flex flex-col justify-between p-6">
                
                {/* SVG Dark Luxury Stylized Map with Roads & Waterfront */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272A" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Bay Water simulation curve */}
                  <path d="M 300 0 Q 420 180 500 450 L 900 450 L 900 0 Z" fill="#18202A" opacity="0.6" />
                  {/* Embarcadero Highway Line */}
                  <path d="M 280 0 Q 390 180 470 450" fill="none" stroke="#3F3F46" strokeWidth="6" />
                  <path d="M 280 0 Q 390 180 470 450" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="6,4" />
                  {/* Market street crossing */}
                  <path d="M 0 160 L 375 160" fill="none" stroke="#3F3F46" strokeWidth="4" />
                  {/* Bay Bridge approach */}
                  <path d="M 120 400 L 700 240" fill="none" stroke="#3F3F46" strokeWidth="5" />
                </svg>

                {/* Map Overlay Controls */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="bg-[#0D0E11]/90 backdrop-blur-md border border-[#27272A] px-3.5 py-2 rounded-lg text-xs space-y-0.5">
                    <div className="text-[#C5A059] font-medium uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Shivar Restaurant & Hearth</span>
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      {RESTAURANT_INFO.address}
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#A1A1AA] bg-[#0D0E11]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#27272A]">
                    <span>37.7915° N, 122.3925° W</span>
                  </div>
                </div>

                {/* Center Pin Marker for Shivar */}
                <div className="relative z-10 self-center my-auto flex flex-col items-center animate-bounce">
                  <div className="p-3 rounded-full bg-[#C5A059] text-black shadow-[0_0_25px_rgba(197,160,89,0.6)]">
                    <MapPin className="w-6 h-6 fill-current" />
                  </div>
                  <div className="mt-1 px-2.5 py-0.5 rounded bg-black/90 text-[11px] font-medium text-[#FDFBF7] border border-[#C5A059]">
                    Shivar Main Portico
                  </div>
                </div>

                {/* Nearby Waterfront Landmarks */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#71717A] bg-[#0D0E11]/85 backdrop-blur-md border border-[#27272A] p-3 rounded-lg">
                  <span>Landmarks: Pier 14 Promenade (50m)</span>
                  <span>· Ferry Building (350m)</span>
                  <span>· Bay Bridge Span (400m)</span>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A059] hover:underline flex items-center gap-1 ml-auto"
                  >
                    <span>View satellite in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Practical Logistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#14151A] border border-[#27272A] rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                  <Car className="w-4 h-4 text-[#C5A059]" />
                  <span>Complimentary Valet</span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Attendants will greet your vehicle at the porte-cochère portico starting at 4:00 PM daily. 
                  Secure covered climate-controlled parking.
                </p>
              </div>

              <div className="p-5 bg-[#14151A] border border-[#27272A] rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Atmosphere & Dress Code</span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Smart Elegant. We encourage collared shirts, blazers, and cocktail attire. 
                  Athletic wear and casual beachwear are politely discouraged.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* PART 2: Comprehensive Contact & Event Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-[#27272A]">
          
          {/* Left Contact Directory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">Get in Touch</span>
              <h3 className="font-editorial text-3xl text-[#FDFBF7] font-normal">Contact & Enquiries</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
                Whether orchestrating a buyout of the Private Wine Vault, dietary consultations with Chef Elena, 
                or press inquiries, our concierge desk is at your service.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-4 bg-[#14151A] border border-[#27272A] rounded-lg">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#71717A] uppercase text-[10px] tracking-wider block">Direct Concierge</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-sm font-medium text-[#FDFBF7] hover:text-[#C5A059] transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                  <span className="text-[11px] text-[#71717A] block mt-0.5">Lines open Tuesday–Sunday 12:00 PM – 11:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#14151A] border border-[#27272A] rounded-lg">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#71717A] uppercase text-[10px] tracking-wider block">Direct Inquiries</span>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-sm font-medium text-[#FDFBF7] hover:text-[#C5A059] transition-colors">
                    {RESTAURANT_INFO.email}
                  </a>
                  <span className="text-[11px] text-[#71717A] block mt-0.5">Response guaranteed within 6 business hours</span>
                </div>
              </div>

              <div className="p-4 bg-[#14151A] border border-[#27272A] rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Service Schedule</span>
                </div>
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] border-b border-[#222329] pb-1.5 last:border-none">
                    <span className="text-[#A1A1AA]">{h.days}</span>
                    <span className="text-[#FDFBF7] font-mono">{h.dinner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-8 bg-[#14151A] border border-[#27272A] rounded-xl p-6 sm:p-8">
            {submittedMessage ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-editorial text-2xl text-[#FDFBF7]">Message Received</h4>
                <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto">
                  Thank you for reaching out to Shivar. Our maître d' or private events director will review your message 
                  and contact you shortly at <strong className="text-[#FDFBF7]">{contactEmail}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmittedMessage(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#18191E] border border-[#27272A] hover:border-[#C5A059] text-xs text-[#FDFBF7] rounded transition-colors cursor-pointer mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <h4 className="font-editorial text-2xl text-[#FDFBF7] font-medium">
                    Send a Message to the Concierge
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    For private dining buyouts, event menus, or bespoke reservations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-[#A1A1AA]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Ross"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A1A1AA]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. julian@company.com"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A1A1AA]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (415) 000-0000"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Nature of Inquiry</label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none cursor-pointer"
                  >
                    <option value="Private Dining & Buyouts">Private Dining & Wine Vault Buyouts (up to 14 guests)</option>
                    <option value="Full Restaurant Buyout">Full Restaurant Buyout & Celebrations (up to 90 guests)</option>
                    <option value="Table Reservation Assistance">Table Reservation Assistance / Special Request</option>
                    <option value="Sommelier Cellar Tour">Private Sommelier Cellar Tour & Tasting</option>
                    <option value="Press & Media Inquiries">Press, Editorial & Media Inquiries</option>
                    <option value="Culinary Careers">Culinary & Front-of-House Careers</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#A1A1AA]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your date preference, party size, dietary parameters, or event vision..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#71717A]">
                    We treat all guest inquiries with absolute discretion.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2 shadow active:scale-[0.98]"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
