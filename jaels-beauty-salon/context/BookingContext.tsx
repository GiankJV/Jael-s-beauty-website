"use client";

import { createContext, useContext, useState } from 'react';

interface BookingContextValue {
  open: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingContext.Provider
      value={{
        open,
        openBooking: () => setOpen(true),
        closeBooking: () => setOpen(false),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

/**
 * Hook to access booking controls from anywhere in the component tree.
 */
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}