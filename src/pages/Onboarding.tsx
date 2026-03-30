import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, QrCode, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    icon: Package,
    title: 'Ship From Anywhere',
    subtitle: 'Create a shipment in seconds, right from your phone. No printer needed.',
    color: 'bg-accent/10',
  },
  {
    icon: QrCode,
    title: 'Label-Free Drop-Off',
    subtitle: 'Get a QR code and scan it at any USPS location. Fast and paperless.',
    color: 'bg-blue-50',
  },
  {
    icon: MapPin,
    title: 'Track Every Package',
    subtitle: 'Real-time tracking updates so you always know where your package is.',
    color: 'bg-green-50',
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-card">
      <div className="flex justify-end p-4">
        <button onClick={() => navigate('/login')} className="text-sm font-medium text-muted-foreground">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-fade-in" key={current}>
        <div className={`w-40 h-40 rounded-full ${slides[current].color} flex items-center justify-center mb-8`}>
          {(() => { const Icon = slides[current].icon; return <Icon size={64} className="text-accent" />; })()}
        </div>
        <h1 className="font-heading text-2xl font-bold text-center mb-3">{slides[current].title}</h1>
        <p className="text-center text-muted-foreground text-sm max-w-xs">{slides[current].subtitle}</p>
      </div>

      <div className="px-8 pb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-border'}`} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {current > 0 && (
            <button
              onClick={() => setCurrent(c => c - 1)}
              className="w-12 h-12 rounded-xl border border-border flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {current < slides.length - 1 ? (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="flex-1 h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press flex items-center justify-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
