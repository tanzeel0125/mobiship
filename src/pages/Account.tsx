import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, CreditCard, Settings, Bell, Gift, LogOut, Pencil, ChevronRight } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import { useAppStore } from '@/store/useAppStore';

const Account = () => {
  const navigate = useNavigate();
  const { user, setUser, notifications, logout } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    if (user) {
      const initials = name.split(' ').map(p => p[0]?.toUpperCase()).join('').slice(0, 2);
      setUser({ ...user, name, email, phone, initials });
    }
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const rows = [
    { icon: Mail, label: 'Email Address', value: user?.email || '', action: () => setEditing(true) },
    { icon: Phone, label: 'Mobile Number', value: user?.phone || '', action: () => setEditing(true) },
    { icon: MapPin, label: 'Shipping Addresses', value: '2 Addresses', action: () => navigate('/account/addresses') },
    { icon: CreditCard, label: 'Billing Information', value: '•••• 5678', action: () => navigate('/account/billing') },
    { icon: Settings, label: 'Shipping Preferences', value: '', action: () => navigate('/account/preferences') },
    { icon: Settings, label: 'App Settings', value: '', action: () => {} },
    { icon: Bell, label: 'Notifications', value: notifications ? 'On' : 'Off', action: () => navigate('/account/notifications'), pill: true },
    { icon: Gift, label: 'Refer & Earn', value: 'Get $5 in shipping credit!', action: () => navigate('/referrals') },
  ];

  return (
    <div className="mobile-shell pb-20 min-h-screen">
      <MobiShipTopNav showBack />
      <div className="px-4 py-6 page-enter">
        {/* Profile header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-3">
            {user?.initials || 'U'}
          </div>
          {editing ? (
            <div className="space-y-3 text-left">
              <input value={name} onChange={e => setName(e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" placeholder="Full Name" />
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" placeholder="Email" />
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border text-sm outline-none focus:border-accent" placeholder="Phone" />
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 h-10 bg-accent text-accent-foreground rounded-lg font-heading font-bold text-sm btn-press">Save</button>
                <button onClick={() => setEditing(false)} className="flex-1 h-10 border border-border rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-heading font-bold text-lg">{user?.name || 'User'}</h2>
              <p className="text-sm text-muted-foreground">Shipping Made Easy</p>
              <button onClick={() => setEditing(true)} className="mt-2 text-xs border border-border rounded-lg px-3 py-1.5 inline-flex items-center gap-1">
                <Pencil size={12} /> Edit
              </button>
            </>
          )}
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {rows.map((row, i) => (
            <button key={i} onClick={row.action} className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-muted transition-colors text-left">
              <row.icon size={18} className="text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{row.label}</p>
                {row.value && (
                  <p className="text-xs text-muted-foreground truncate">{row.value}</p>
                )}
              </div>
              {row.pill && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${notifications ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                  {row.value}
                </span>
              )}
              <ChevronRight size={16} className="text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press mt-6">
          Log Out
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Account;
