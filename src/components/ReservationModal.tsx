import React from 'react';
import { X } from 'lucide-react';
import { ReservationSystem } from './ReservationSystem';
import { ChefSpecial } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGuests?: number;
  initialDate?: string;
  initialTime?: string;
  preselectedSpecial?: ChefSpecial | null;
  wishlistItems?: { id: string; name: string; price: number }[];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialGuests = 2,
  initialDate,
  initialTime = '19:00',
  preselectedSpecial,
  wishlistItems = []
}) => {
  if (!isOpen) return null;

  const note = preselectedSpecial
    ? `Guest requested Chef Special: ${preselectedSpecial.title} ($${preselectedSpecial.price}).`
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-[#14151A] border border-[#27272A] rounded-2xl max-w-4xl w-full my-8 shadow-2xl overflow-hidden">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 text-[#A1A1AA] hover:text-[#FDFBF7] p-2 rounded-full bg-[#18191E] border border-[#27272A] cursor-pointer transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Reservation System */}
        <div className="pt-2">
          <ReservationSystem
            initialGuests={initialGuests}
            initialDate={initialDate}
            initialTime={initialTime}
            preselectedNote={note}
            wishlistItems={wishlistItems}
            onClose={onClose}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
