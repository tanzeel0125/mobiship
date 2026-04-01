import { Package, RotateCcw, ClipboardList, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/ship', label: 'Ship', icon: Package },
  { path: '/return', label: 'Return', icon: RotateCcw },
  { path: '/orders', label: 'Orders', icon: ClipboardList },
  { path: '/track', label: 'Track', icon: MapPin },
];

const BottomTabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = tabs.find(t => location.pathname.startsWith(t.path))?.path;

  return (
    <nav
      className="mobile-fixed-bar bottom-0 z-50 bg-card border-t border-border"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex h-16 items-center justify-around gap-0.5 px-1 sm:px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = activeTab === path;
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className={`flex min-w-0 flex-1 max-w-[5.5rem] flex-col items-center justify-center gap-0.5 py-1 px-1 transition-colors ${
                active ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
              <span className="text-[10px] font-medium leading-tight sm:text-[11px]">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
