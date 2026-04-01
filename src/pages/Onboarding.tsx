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
    <div className="mobile-shell shell-top-inset flex min-h-[100dvh] flex-col bg-card">
      <div className="flex justify-end px-3 pb-3 pt-0 sm:px-4 sm:pb-4">
        <button onClick={() => navigate('/login')} className="text-sm font-medium text-muted-foreground">
          Skip
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-5 animate-fade-in sm:px-8" key={current}>
        <div className={`mb-6 flex h-36 w-36 items-center justify-center rounded-full sm:mb-8 sm:h-40 sm:w-40 ${slides[current].color}`}>
          {(() => { const Icon = slides[current].icon; return <Icon className="h-14 w-14 text-accent sm:h-16 sm:w-16" strokeWidth={1.75} />; })()}
        </div>
        <h1 className="mb-3 max-w-[20rem] px-1 text-center font-heading text-xl font-bold sm:text-2xl">{slides[current].title}</h1>
        <p className="max-w-xs px-1 text-center text-sm text-muted-foreground">{slides[current].subtitle}</p>
      </div>

      <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
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
