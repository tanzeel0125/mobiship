import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';
import MobiShipLogo from './MobiShipLogo';

interface TopNavProps {
  title?: string;
  showBack?: boolean;
}

const MobiShipTopNav = ({ showBack }: TopNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppStore(s => s.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Ship a Package', path: '/ship' },
    { label: 'Track', path: '/track' },
    { label: 'Orders', path: '/orders' },
    { label: 'Returns', path: '/return' },
    { label: 'Account', path: '/account' },
    { label: 'Refer & Earn', path: '/referrals' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          {showBack ? (
            <button onClick={() => navigate(-1)} className="p-1 text-foreground">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          ) : (
            <button onClick={() => setDrawerOpen(true)} className="p-1 text-foreground">
              <Menu size={24} />
            </button>
          )}
          <MobiShipLogo size="sm" />
          <button
            onClick={() => navigate('/account')}
            className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-heading font-bold text-sm"
          >
            {user?.initials || 'U'}
          </button>
        </div>
      </header>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-card shadow-xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <MobiShipLogo size="sm" />
              <button onClick={() => setDrawerOpen(false)}><X size={24} /></button>
            </div>
            <nav className="p-2">
              {menuItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setDrawerOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobiShipTopNav;
