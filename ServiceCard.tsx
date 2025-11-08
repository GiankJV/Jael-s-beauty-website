"use client";

export interface Service {
  title: string;
  description: string;
  price?: string;
  duration?: string;
}

export interface ServiceCardProps {
  service: Service;
  onOpenBooking?: () => void;
}

/**
 * Card component used on the Services page. Displays a service name,
 * description, optional duration and price, and a booking button.
 */
export default function ServiceCard({ service, onOpenBooking }: ServiceCardProps) {
  return (
    <div className="card flex flex-col justify-between h-full">
      <div>
        <h3 className="font-display text-xl text-rose mb-2">{service.title}</h3>
        <p className="mb-2 text-sm leading-relaxed">{service.description}</p>
        {service.duration && (
          <p className="text-sm"><strong>Duration:</strong> {service.duration}</p>
        )}
        {service.price && (
          <p className="text-sm"><strong>Price:</strong> {service.price}</p>
        )}
      </div>
      <button
        onClick={onOpenBooking}
        className="mt-4 bg-rose text-white px-4 py-2 rounded-full shadow hover:bg-rose/90 transition self-start"
      >
        Book Now
      </button>
    </div>
  );
}