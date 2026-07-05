import { MapPin, Navigation } from 'lucide-react';

interface MockMapProps {
  label?: string;
}

export function MockMap({ label = 'Mock Kabankalan City map' }: MockMapProps) {
  return (
    <div className="map-grid relative min-h-64 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50" aria-label={label} role="img">
      <div className="absolute left-8 top-10 rounded-full bg-white px-3 py-2 text-xs shadow">Kabankalan Plaza</div>
      <MapPin className="absolute left-28 top-24 text-green-600" aria-hidden="true" />
      <Navigation className="absolute bottom-16 right-20 text-blue-600" aria-hidden="true" />
      <div className="absolute inset-x-8 bottom-8 h-2 rounded-full bg-green-500/60" />
    </div>
  );
}
