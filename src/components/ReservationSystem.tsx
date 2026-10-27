import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle2, AlertCircle, Sparkles, X, ChevronRight, ChevronLeft, Download, Trash2, Edit3 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface Booking {
  id: string;
  referenceCode: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: string;
  guestName: string;
  email: string;
  phone: string;
  occasion: string;
  specialRequests: string;
  selectedDishes?: string[];
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

interface ReservationSystemProps {
  initialGuests?: number;
  initialDate?: string;
  initialTime?: string;
  preselectedNote?: string;
  wishlistItems?: { id: string; name: string; price: number }[];
  onClose?: () => void;
  isModal?: boolean;
}

export const ReservationSystem: React.FC<ReservationSystemProps> = ({
  initialGuests = 2,
  initialDate,
  initialTime = '19:00',
  preselectedNote = '',
  wishlistItems = [],
  onClose,
  isModal = false
}) => {
  // Booking state
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'new' | 'my-bookings'>('new');
  
  // Step 1: Party & Area
  const [guests, setGuests] = useState<number>(initialGuests);
  const [seatingArea, setSeatingArea] = useState<string>('main-hall');

  // Step 2: Date & Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = initialDate || tomorrow.toISOString().split('T')[0];
  const [date, setDate] = useState<string>(defaultDateStr);
  const [time, setTime] = useState<string>(initialTime);

  // Step 3: Contact & Occasion
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Casual Fine Dining');
  const [dietary, setDietary] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>(preselectedNote);

  // Completed booking
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Existing bookings stored in localStorage
  const [savedBookings, setSavedBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('aurelia_reservations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Lookup state
  const [lookupCode, setLookupCode] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<Booking | null | 'not_found'>(null);

  // Seating Areas definition
  const seatingAreas = [
    {
      id: 'main-hall',
      name: 'Main Dining Hall',
      desc: 'Architectural vaulted room, candlelit dark timber tables with Bay view.',
      capacity: '1–8 guests'
    },
    {
      id: 'chefs-counter',
      name: "Chef's Hearth Counter",
      desc: 'Front row facing the open woodfire hearth. Interactive kitchen views.',
      capacity: '1–4 guests'
    },
    {
      id: 'garden-pergola',
      name: 'Heated Maritime Pergola',
      desc: 'Covered glass terrace with outdoor radiant warmth and harbor breezes.',
      capacity: '2–6 guests'
    },
    {
      id: 'wine-vault',
      name: 'Private Subterranean Vault',
      desc: 'Secluded private room surrounded by 2,200 rare collector vintages.',
      capacity: '6–14 guests'
    }
  ];

  // Available Time Slots
  const timeSlots = [
    { time: '17:00', label: '5:00 PM', availability: 'Available' },
    { time: '17:30', label: '5:30 PM', availability: 'Available' },
    { time: '18:15', label: '6:15 PM', availability: 'Few tables' },
    { time: '19:00', label: '7:00 PM', availability: 'Popular' },
    { time: '19:45', label: '7:45 PM', availability: 'Few tables' },
    { time: '20:30', label: '8:30 PM', availability: 'Available' },
    { time: '21:15', label: '9:15 PM', availability: 'Available' },
  ];

  const occasions = [
    'Casual Fine Dining',
    'Anniversary Celebration',
    'Birthday Gathering',
    'Executive Business Dinner',
    'Romantic Evening',
    'Gastronomy Explorer'
  ];

  // Auto-sync initial params
  useEffect(() => {
    if (initialGuests) setGuests(initialGuests);
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
    if (preselectedNote) setSpecialRequests(preselectedNote);
  }, [initialGuests, initialDate, initialTime, preselectedNote]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email || !phone) return;

    const ref = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      id: Date.now().toString(),
      referenceCode: ref,
      guests,
      date,
      time,
      seatingArea: seatingAreas.find(a => a.id === seatingArea)?.name || seatingArea,
      guestName,
      email,
      phone,
      occasion,
      specialRequests: `${dietary ? `[Dietary: ${dietary}] ` : ''}${specialRequests}`,
      selectedDishes: wishlistItems.map(i => i.name),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'confirmed'
    };

    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    try {
      localStorage.setItem('aurelia_reservations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setConfirmedBooking(newBooking);
    setStep(4); // Confirmation step
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = savedBookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
    setSavedBookings(updated);
    try {
      localStorage.setItem('aurelia_reservations', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    if (lookupResult && typeof lookupResult === 'object' && lookupResult.id === bookingId) {
      setLookupResult({ ...lookupResult, status: 'cancelled' });
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = lookupCode.trim().toUpperCase();
    const found = savedBookings.find(b => b.referenceCode === clean || b.phone.includes(clean));
    setLookupResult(found || 'not_found');
  };

  const downloadCalendarEvent = (booking: Booking) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aurelia Restaurant//Reservation//EN
BEGIN:VEVENT
UID:${booking.referenceCode}@aureliasf.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${booking.date.replace(/-/g, '')}T${booking.time.replace(':', '')}00
DTEND:${booking.date.replace(/-/g, '')}T${Number(booking.time.split(':')[0]) + 2}${booking.time.split(':')[1]}00
SUMMARY:Table Reservation at Aurelia (${booking.guests} Guests)
DESCRIPTION:Reservation Ref: ${booking.referenceCode}\\nSeating: ${booking.seatingArea}\\nOccasion: ${booking.occasion}
LOCATION:450 Heritage Quay Blvd, San Francisco, CA 94105
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aurelia-reservation-${booking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="reservations" className={`${isModal ? 'p-6' : 'py-24 bg-[#0F1013] border-t border-[#27272A]'}`}>
      <div className={`${isModal ? 'w-full' : 'max-w-4xl mx-auto px-6 lg:px-8'}`}>
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              Immediate Guaranteed Table Booking
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FDFBF7] font-normal mt-1">
              Online Reservations
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#18191E] border border-[#27272A] rounded-lg text-xs">
            <button
              onClick={() => { setActiveTab('new'); setStep(1); setConfirmedBooking(null); }}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#C5A059] text-[#0D0E11] font-semibold shadow'
                  : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
              }`}
            >
              Book Table
            </button>
            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'my-bookings'
                  ? 'bg-[#C5A059] text-[#0D0E11] font-semibold shadow'
                  : 'text-[#A1A1AA] hover:text-[#FDFBF7]'
              }`}
            >
              <span>Manage Bookings</span>
              {savedBookings.length > 0 && (
                <span className="font-mono text-[10px] bg-[#27272A] text-[#FDFBF7] px-1 rounded">
                  {savedBookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: New Booking Wizard */}
        {activeTab === 'new' && (
          <div className="bg-[#14151A] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl">
            
            {/* Step Progress Header */}
            {step < 4 && (
              <div className="px-6 py-4 bg-[#18191E] border-b border-[#27272A] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className={`font-mono px-2 py-0.5 rounded text-[11px] font-semibold ${
                    step >= 1 ? 'bg-[#C5A059] text-black' : 'bg-[#27272A] text-[#A1A1AA]'
                  }`}>
                    01
                  </span>
                  <span className={step === 1 ? 'text-[#FDFBF7] font-medium' : 'text-[#71717A]'}>
                    Party & Seating
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#3F3F46]" />

                  <span className={`font-mono px-2 py-0.5 rounded text-[11px] font-semibold ${
                    step >= 2 ? 'bg-[#C5A059] text-black' : 'bg-[#27272A] text-[#A1A1AA]'
                  }`}>
                    02
                  </span>
                  <span className={step === 2 ? 'text-[#FDFBF7] font-medium' : 'text-[#71717A]'}>
                    Date & Time
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#3F3F46]" />

                  <span className={`font-mono px-2 py-0.5 rounded text-[11px] font-semibold ${
                    step >= 3 ? 'bg-[#C5A059] text-black' : 'bg-[#27272A] text-[#A1A1AA]'
                  }`}>
                    03
                  </span>
                  <span className={step === 3 ? 'text-[#FDFBF7] font-medium' : 'text-[#71717A]'}>
                    Guest Information
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              
              {/* STEP 1: Guests & Seating Area */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-[#FDFBF7] font-medium">Party Size</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Select number of diners. For parties exceeding 8, we recommend our Private Wine Vault.
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`py-3 rounded text-sm font-medium transition-all cursor-pointer ${
                            guests === num
                              ? 'bg-[#C5A059] text-[#0D0E11] font-bold shadow'
                              : 'bg-[#18191E] border border-[#27272A] text-[#D4D4D8] hover:border-[#3F3F46]'
                          }`}
                        >
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-[#FDFBF7] font-medium">Seating Environment</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Each dining zone provides a distinct acoustic and visual relationship to the hearth.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {seatingAreas.map(area => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSeatingArea(area.id)}
                          className={`p-4 rounded-lg text-left transition-all cursor-pointer border ${
                            seatingArea === area.id
                              ? 'border-[#C5A059] bg-[#C5A059]/10'
                              : 'border-[#27272A] bg-[#18191E] hover:border-[#3F3F46]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-editorial text-base text-[#FDFBF7] font-medium">
                              {area.name}
                            </span>
                            <span className="text-[11px] text-[#A1A1AA] font-mono">
                              {area.capacity}
                            </span>
                          </div>
                          <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                            {area.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Continue to Date & Time</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg text-[#FDFBF7] font-medium">Select Evening Date</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Bookings available up to 60 days in advance. Aurelia is closed Mondays.
                    </p>
                    <div className="mt-3 max-w-sm">
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setDate(e.target.value)}
                        className="w-full bg-[#18191E] border border-[#27272A] rounded px-4 py-2.5 text-sm text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none transition-colors cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg text-[#FDFBF7] font-medium">Service Time Slot</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Average dining duration is approximately 2 hours (2.5 hours for Tasting Menu).
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      {timeSlots.map(slot => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setTime(slot.time)}
                          className={`p-3 rounded-lg text-center transition-all cursor-pointer border ${
                            time === slot.time
                              ? 'border-[#C5A059] bg-[#C5A059] text-black font-semibold'
                              : 'border-[#27272A] bg-[#18191E] text-[#D4D4D8] hover:border-[#3F3F46]'
                          }`}
                        >
                          <div className="font-mono text-sm">{slot.label}</div>
                          <div className={`text-[10px] mt-0.5 ${time === slot.time ? 'text-black/80' : 'text-[#71717A]'}`}>
                            {slot.availability}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-xs text-[#A1A1AA] hover:text-[#FDFBF7] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Continue to Guest Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Guest Information & Confirmation */}
              {step === 3 && (
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div>
                    <h3 className="text-lg text-[#FDFBF7] font-medium">Guest Information</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      Confirmation code and reminder details will be sent to your email.
                    </p>
                  </div>

                  {/* Summary Callout */}
                  <div className="p-4 bg-[#18191E] border border-[#27272A] rounded-lg flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[#71717A] uppercase tracking-wider block text-[10px]">Reservation</span>
                      <strong className="text-[#FDFBF7]">{guests} Guests · {date} · {time}</strong>
                    </div>
                    <div>
                      <span className="text-[#71717A] uppercase tracking-wider block text-[10px]">Seating Area</span>
                      <strong className="text-[#C5A059]">
                        {seatingAreas.find(a => a.id === seatingArea)?.name}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-[#A1A1AA]">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Eleanor Vance"
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A1A1AA]">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@vance-holdings.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A1A1AA]">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (415) 000-0000"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A1A1AA]">Dining Occasion</label>
                      <select
                        value={occasion}
                        onChange={e => setOccasion(e.target.value)}
                        className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none cursor-pointer"
                      >
                        {occasions.map(occ => (
                          <option key={occ} value={occ}>{occ}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A1A1AA]">Dietary Allergies & Restrictions</label>
                    <input
                      type="text"
                      placeholder="e.g. Shellfish allergy, vegetarian guest, celiac (gluten-free)"
                      value={dietary}
                      onChange={e => setDietary(e.target.value)}
                      className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A1A1AA]">Special Requests / Notes for Chef Elena</label>
                    <textarea
                      rows={2}
                      placeholder="Special table preference, wine pre-order, or celebration details..."
                      value={specialRequests}
                      onChange={e => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#18191E] border border-[#27272A] rounded px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  {/* Pre-selected Wishlist Notice */}
                  {wishlistItems.length > 0 && (
                    <div className="p-3 bg-[#18191E] border border-[#3E3424] rounded text-xs space-y-1">
                      <span className="text-[#C5A059] font-medium">Included Dining Notes ({wishlistItems.length} items):</span>
                      <p className="text-[#A1A1AA] truncate">
                        {wishlistItems.map(i => i.name).join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-xs text-[#A1A1AA] hover:text-[#FDFBF7] flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0E11] text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer shadow active:scale-[0.98]"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 4: Success & Confirmation */}
              {step === 4 && confirmedBooking && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A059]/15 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                      Table Reserved & Confirmed
                    </span>
                    <h3 className="font-editorial text-3xl text-[#FDFBF7] font-medium">
                      We Look Forward to Welcoming You
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto">
                      Your booking has been secured. A confirmation notice has been dispatched to 
                      <strong className="text-[#FDFBF7]"> {confirmedBooking.email}</strong>.
                    </p>
                  </div>

                  {/* Booking Card */}
                  <div className="max-w-md mx-auto bg-[#18191E] border border-[#27272A] rounded-xl p-6 text-left space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                      <span className="text-xs text-[#71717A] uppercase tracking-wider">Reference Code</span>
                      <span className="font-mono text-base font-bold text-[#C5A059] tracking-wider">
                        {confirmedBooking.referenceCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#71717A] block">Guest Name</span>
                        <strong className="text-[#FDFBF7]">{confirmedBooking.guestName}</strong>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">Party Size</span>
                        <strong className="text-[#FDFBF7]">{confirmedBooking.guests} Guests</strong>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">Date</span>
                        <strong className="text-[#FDFBF7]">{confirmedBooking.date}</strong>
                      </div>
                      <div>
                        <span className="text-[#71717A] block">Service Time</span>
                        <strong className="text-[#FDFBF7]">{confirmedBooking.time}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#71717A] block">Seating Area</span>
                        <strong className="text-[#C5A059]">{confirmedBooking.seatingArea}</strong>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-[#71717A] border-t border-[#27272A]">
                      Address: {RESTAURANT_INFO.address} · Valet available upon arrival
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => downloadCalendarEvent(confirmedBooking)}
                      className="px-4 py-2.5 bg-[#18191E] hover:bg-[#202127] border border-[#27272A] hover:border-[#C5A059] text-xs text-[#FDFBF7] rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Add to Calendar (.ics)</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('my-bookings');
                        setStep(1);
                      }}
                      className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold rounded transition-colors cursor-pointer"
                    >
                      View in My Bookings
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 2: Manage My Bookings */}
        {activeTab === 'my-bookings' && (
          <div className="bg-[#14151A] border border-[#27272A] rounded-xl p-6 sm:p-8 space-y-6">
            
            {/* Lookup Form */}
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Enter booking reference (e.g. AUR-12345) or phone number..."
                value={lookupCode}
                onChange={e => setLookupCode(e.target.value)}
                className="flex-1 bg-[#18191E] border border-[#27272A] rounded px-4 py-2.5 text-xs text-[#FDFBF7] focus:border-[#C5A059] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Find Booking
              </button>
            </form>

            {/* Lookup Single Result if requested */}
            {lookupResult === 'not_found' && (
              <div className="p-4 bg-[#1F1414] border border-[#442323] rounded-lg text-xs text-[#F87171] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>No reservation found matching this reference code or phone number.</span>
              </div>
            )}

            {lookupResult && typeof lookupResult === 'object' && (
              <div className="p-4 bg-[#18191E] border border-[#C5A059] rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[#C5A059] font-bold">
                    {lookupResult.referenceCode}
                  </span>
                  <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded ${
                    lookupResult.status === 'confirmed' ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-[#27272A] text-[#71717A]'
                  }`}>
                    {lookupResult.status}
                  </span>
                </div>
                <div className="text-xs text-[#D4D4D8]">
                  {lookupResult.guestName} · {lookupResult.guests} Guests · {lookupResult.date} at {lookupResult.time}
                </div>
                {lookupResult.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancelBooking(lookupResult.id)}
                    className="text-xs text-[#EF4444] hover:underline pt-2 cursor-pointer"
                  >
                    Cancel this reservation
                  </button>
                )}
              </div>
            )}

            {/* List of Stored Reservations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider text-[#71717A] font-medium">
                Active & Past Reservations on this Browser
              </h4>

              {savedBookings.length === 0 ? (
                <div className="p-8 text-center bg-[#18191E] border border-[#27272A] rounded-lg text-xs text-[#71717A]">
                  No reservations booked on this device yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedBookings.map(b => (
                    <div
                      key={b.id}
                      className="p-4 bg-[#18191E] border border-[#27272A] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#C5A059]">{b.referenceCode}</span>
                          <span className="text-[#71717A]">·</span>
                          <span className="text-[#FDFBF7] font-medium">{b.guestName}</span>
                          <span className="text-[#71717A]">·</span>
                          <span className={`text-[10px] uppercase font-semibold ${
                            b.status === 'confirmed' ? 'text-[#C5A059]' : 'text-[#71717A] line-through'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="text-[#A1A1AA]">
                          {b.guests} Guests · {b.date} · {b.time} · {b.seatingArea}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => downloadCalendarEvent(b)}
                            className="p-2 text-[#A1A1AA] hover:text-[#FDFBF7] border border-[#27272A] rounded cursor-pointer"
                            title="Download calendar event"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3 py-1.5 border border-[#3F3F46] hover:border-[#EF4444] text-[#A1A1AA] hover:text-[#EF4444] rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
