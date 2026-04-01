import { useState } from 'react';
import { Search, MapPin, Clock, Navigation } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import CarrierBadge from '@/components/CarrierBadge';

const locations = [
  {
    name: 'UPS Store #1442',
    carrier: 'UPS' as const,
    address: '1201 Las Vegas Ave, San Diego, CA 92101',
    distance: '1.1 mi',
    hours: 'Open until 6:30 PM',
    open: true,
  },
  {
    name: 'Mail USPS Counter',
    carrier: 'USPS' as const,
    address: '3050 Plaza Bonita Rd, National City, CA 91955',
    distance: '1.6 mi',
    hours: 'Open until 5:00 PM',
    open: true,
  },
  {
    name: 'FedEx Office',
    carrier: 'FedEx' as const,
    address: '4545 La Jolla Village Dr, San Diego, CA 92122',
    distance: '2.3 mi',
    hours: 'Open until 8:00 PM',
    open: true,
  },
];

const FindLocation = () => {
  const [zip, setZip] = useState('');
  const [selected, setSelected] = useState(0);

  const openDirections = (address: string) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="mobile-shell min-h-[100dvh] pb-20">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 page-enter">
        <h1 className="font-heading text-lg font-bold mb-1">Find a Drop-Off Location</h1>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Enter ZIP Code or Address"
            value={zip}
            onChange={e => setZip(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent"
          />
        </div>
        <p className="text-xs text-muted-foreground mb-4">Most carriers accept drop-off within three days after purchase. Scan your QR code at selected location.</p>

        {/* Map placeholder */}
        <div className="w-full h-44 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute bg-border" style={{
                width: i % 2 === 0 ? '100%' : '2px',
                height: i % 2 === 0 ? '1px' : '100%',
                top: i % 2 === 0 ? `${(i + 1) * 20}%` : 0,
                left: i % 2 !== 0 ? `${(i) * 18}%` : 0,
              }} />
            ))}
          </div>
          {locations.map((loc, i) => (
            <div
              key={i}
              className={`absolute cursor-pointer transition-transform ${i === selected ? 'scale-125 z-10' : ''}`}
              style={{ top: `${30 + i * 15}%`, left: `${20 + i * 25}%` }}
              onClick={() => setSelected(i)}
            >
              <MapPin size={24} className={i === selected ? 'text-accent' : 'text-navy'} fill={i === selected ? '#F97316' : '#0B1F3A'} />
            </div>
          ))}
        </div>

        {/* Location list */}
        <div className="space-y-3">
          {locations.map((loc, i) => (
            <div key={i} className={`bg-card rounded-xl shadow-card p-4 transition-all ${i === selected ? 'ring-2 ring-accent' : ''}`}>
              <div className="flex items-start gap-3">
                <CarrierBadge carrier={loc.carrier} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-heading font-semibold text-sm">{loc.name}</p>
                    <span className="text-xs text-muted-foreground">{loc.distance}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{loc.address}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock size={12} className="text-success" />
                    <span className="text-xs text-success font-medium">{loc.hours}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => openDirections(loc.address)}
                className={`w-full h-10 rounded-lg font-heading font-bold text-xs mt-3 btn-press flex items-center justify-center gap-1 ${
                  i === 0 ? 'bg-accent text-accent-foreground' : 'border-2 border-navy text-foreground'
                }`}
              >
                <Navigation size={14} /> {i === 0 ? 'Get Directions' : 'Select Location'}
              </button>
            </div>
          ))}
        </div>

        <button onClick={() => window.history.back()} className="w-full text-center text-sm text-accent font-medium mt-4 py-2">
          ← Back to Shipping Options
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default FindLocation;
