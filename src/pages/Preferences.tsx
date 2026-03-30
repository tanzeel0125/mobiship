import { useState } from 'react';
import MobiShipTopNav from '@/components/MobiShipTopNav';

const Preferences = () => {
  const [defaultCarrier, setDefaultCarrier] = useState('UPS');
  const [defaultPackage, setDefaultPackage] = useState('Custom');
  const [insurance, setInsurance] = useState(true);

  const selectClass = "w-full h-12 px-4 rounded-[10px] border border-border bg-card text-sm outline-none focus:border-accent";

  return (
    <div className="mobile-shell min-h-screen">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 space-y-5 page-enter">
        <h1 className="font-heading text-lg font-bold">Shipping Preferences</h1>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Preferred Carrier</label>
          <select value={defaultCarrier} onChange={e => setDefaultCarrier(e.target.value)} className={selectClass}>
            <option>UPS</option><option>FedEx</option><option>USPS</option>
          </select>
        </div>

        <div>
          <label className="font-heading font-bold text-sm block mb-2">Default Package Type</label>
          <select value={defaultPackage} onChange={e => setDefaultPackage(e.target.value)} className={selectClass}>
            <option>Custom</option><option>Small Box</option><option>Medium Box</option><option>Large Box</option>
          </select>
        </div>

        <label className="flex items-center justify-between bg-card rounded-xl shadow-card p-4 cursor-pointer">
          <div>
            <p className="font-heading font-semibold text-sm">Shipping Insurance</p>
            <p className="text-xs text-muted-foreground">Auto-add insurance up to $100</p>
          </div>
          <div className={`w-11 h-6 rounded-full transition-colors relative ${insurance ? 'bg-accent' : 'bg-border'}`} onClick={() => setInsurance(!insurance)}>
            <div className={`w-5 h-5 bg-card rounded-full absolute top-0.5 transition-transform shadow ${insurance ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default Preferences;
