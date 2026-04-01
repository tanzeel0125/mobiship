import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobiShipTopNav from '@/components/MobiShipTopNav';

const items = [
  { name: 'Shoes', weight: '~3 lbs', emoji: '👟' },
  { name: 'Box', weight: '~1.5 lbs', emoji: '📦' },
  { name: 'Laptop', weight: '~5 lbs', emoji: '💻' },
  { name: 'Coffee Mug', weight: '~1 lb', emoji: '☕' },
  { name: 'Board Game', weight: '~2.5 lbs', emoji: '🎲' },
  { name: 'Soft Package', weight: '~1 lb', emoji: '📮' },
];

const UseImages = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const handleDone = () => {
    if (selected !== null) {
      sessionStorage.setItem('mobiship_image_weight', items[selected].weight);
    }
    navigate('/ship');
  };

  return (
    <div className="mobile-shell min-h-[100dvh]">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 page-enter">
        <h1 className="font-heading text-lg font-bold mb-1">Use Images</h1>
        <p className="text-sm text-muted-foreground mb-5">
          Take or select images to help estimate your shipment's weight and dimensions.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`bg-card rounded-xl shadow-card p-4 text-center transition-all btn-press ${
                selected === i ? 'ring-2 ring-accent' : ''
              }`}
            >
              <span className="text-3xl block mb-2">{item.emoji}</span>
              <p className="font-heading font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.weight}</p>
            </button>
          ))}
        </div>

        <button className="w-full h-12 border-2 border-border rounded-xl font-heading font-medium text-sm mb-3">
          See More Examples
        </button>
        <button onClick={handleDone} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Done
        </button>
      </div>
    </div>
  );
};

export default UseImages;
