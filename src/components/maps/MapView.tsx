import { MockMap } from '@/components/MockMap';

interface MapViewProps {
  label?: string;
}

export function MapView({ label = 'Kabankalan City service map' }: MapViewProps) {
  const hasGoogleMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  if (!hasGoogleMapsKey) {
    return <MockMap label={`${label}. Mock map fallback is active because no Google Maps API key is configured.`} />;
  }

  return <MockMap label={`${label}. Google Maps adapter placeholder is using mock map until the API integration is enabled.`} />;
}
