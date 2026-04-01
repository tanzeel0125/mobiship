import { useState } from 'react';
import { Plus, Trash2, MapPin } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import { useAppStore } from '@/store/useAppStore';

const Addresses = () => {
  const { savedAddresses, addAddress, removeAddress } = useAppStore();
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = () => {
    if (!label || !name || !address) return;
    addAddress({ id: Date.now().toString(), label, name, address });
    setAdding(false);
    setLabel(''); setName(''); setAddress('');
  };

  return (
    <div className="mobile-shell min-h-[100dvh]">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 page-enter">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading text-lg font-bold">Saved Addresses</h1>
          <button onClick={() => setAdding(!adding)} className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <Plus size={18} className="text-accent-foreground" />
          </button>
        </div>

        {adding && (
          <div className="bg-card rounded-xl shadow-card p-4 mb-4 space-y-3 animate-fade-in">
            <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Label (e.g. Home)" className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" />
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Full Address" className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" />
            <button onClick={handleAdd} className="w-full h-10 bg-accent text-accent-foreground rounded-lg font-heading font-bold text-sm btn-press">Add Address</button>
          </div>
        )}

        <div className="space-y-3">
          {savedAddresses.map(addr => (
            <div key={addr.id} className="bg-card rounded-xl shadow-card p-4 flex items-start gap-3">
              <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-sm">{addr.label}</span>
                  {addr.isDefault && <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">Default</span>}
                </div>
                <p className="text-sm">{addr.name}</p>
                <p className="text-xs text-muted-foreground">{addr.address}</p>
              </div>
              <button onClick={() => removeAddress(addr.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
