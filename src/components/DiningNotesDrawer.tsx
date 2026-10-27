import React from 'react';
import { X, Trash2, Calendar, ArrowRight, Utensils } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
}

interface DiningNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onProceedToBooking: () => void;
}

export const DiningNotesDrawer: React.FC<DiningNotesDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onProceedToBooking
}) => {
  if (!isOpen) return null;

  const totalEstimated = items.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#14151A] border-l border-[#27272A] h-full flex flex-col justify-between shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="space-y-3 pb-4 border-b border-[#27272A]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059] font-medium">
              <Utensils className="w-4 h-4" />
              <span>Your Dining Notes & Wishlist</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#A1A1AA] hover:text-[#FDFBF7] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="font-editorial text-2xl text-[#FDFBF7]">
            Saved Culinary Selections
          </h3>
          <p className="text-xs text-[#A1A1AA]">
            Dishes and pairings you would like our kitchen and sommelier to prepare for your evening.
          </p>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#71717A] space-y-2">
              <p>Your dining notes are currently empty.</p>
              <p>Browse our digital menu or chef specials to bookmark items.</p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="p-3.5 bg-[#18191E] border border-[#27272A] rounded-lg flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="text-[#FDFBF7] font-medium">{item.name}</div>
                  <div className="font-mono text-[#C5A059]">${item.price}</div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-[#71717A] hover:text-[#EF4444] transition-colors cursor-pointer"
                  title="Remove from notes"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#27272A] space-y-4">
          {items.length > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A1A1AA]">Estimated Course Total:</span>
              <span className="font-mono text-base font-semibold text-[#FDFBF7]">
                ${totalEstimated}
              </span>
            </div>
          )}

          <div className="space-y-2">
            <button
              disabled={items.length === 0}
              onClick={onProceedToBooking}
              className="w-full py-3 bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table with these Notes</span>
            </button>

            {items.length > 0 && (
              <button
                onClick={onClearAll}
                className="w-full py-2 text-[11px] text-[#71717A] hover:text-[#A1A1AA] transition-colors cursor-pointer text-center"
              >
                Clear all saved dishes
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
