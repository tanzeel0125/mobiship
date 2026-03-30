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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = activeTab === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 transition-colors ${
                active ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
