import MobiShipTopNav from '@/components/MobiShipTopNav';
import { CreditCard } from 'lucide-react';

const Billing = () => (
  <div className="mobile-shell min-h-screen">
    <MobiShipTopNav showBack />
    <div className="px-4 py-4 page-enter">
      <h1 className="font-heading text-lg font-bold mb-4">Billing Information</h1>
      <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-3">
        <CreditCard size={22} className="text-accent" />
        <div className="flex-1">
          <p className="font-heading font-semibold text-sm">Visa ending in 5678</p>
          <p className="text-xs text-muted-foreground">Expires 12/27</p>
        </div>
        <span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full">Default</span>
      </div>
    </div>
  </div>
);

export default Billing;
