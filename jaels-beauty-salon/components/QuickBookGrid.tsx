"use client";

export interface QuickBookGridProps {
  onOpenBooking?: () => void;
}

interface Category {
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    title: 'Hair',
    description: 'Cuts, colour, extensions and styling for every hair type.',
  },
  {
    title: 'Spa',
    description: 'Facials, waxing, brows and relaxing spa treatments.',
  },
  {
    title: 'Packages',
    description: 'Bridal, prom and curated beauty packages for special moments.',
  },
];

/**
 * Display a grid of key service categories for quick booking. Each card
 * contains a brief description and triggers the booking modal when clicked.
 */
export default function QuickBookGrid({ onOpenBooking }: QuickBookGridProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-6 mt-8">
      {categories.map((cat) => (
        <div key={cat.title} className="card flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl mb-2 text-rose">{cat.title}</h3>
            <p className="text-sm mb-4">{cat.description}</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="self-start mt-auto bg-rose text-white px-4 py-2 rounded-full shadow hover:bg-rose/90 transition"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}