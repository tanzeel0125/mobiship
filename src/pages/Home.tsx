import { useNavigate } from 'react-router-dom';
import {
  Package,
  MapPin,
  Search,
  QrCode,
  FileText,
  RotateCcw,
  Gift,
  Shield,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import BottomTabBar from '@/components/BottomTabBar';
import { useAppStore } from '@/store/useAppStore';

const Home = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);

  return (
    <div className="mobile-shell flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden">
      <MobiShipTopNav />
      <main className="page-enter min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-y-contain px-4 py-4 pb-[calc(6.25rem+env(safe-area-inset-bottom,0px))]">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            placeholder="Track my shipments"
            className="w-full h-12 pl-11 pr-12 rounded-xl border border-border bg-card text-sm font-body outline-none focus:border-accent"
            onFocus={() => navigate('/track')}
            readOnly
          />
          <button
            onClick={() => navigate('/track')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center"
          >
            <QrCode size={16} className="text-accent-foreground" />
          </button>
        </div>

        {/* Hero cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/ship')}
            className="min-w-0 bg-navy rounded-xl p-3 text-left btn-press sm:p-4"
          >
            <Package size={28} className="text-accent mb-3" />
            <p className="text-primary-foreground font-heading font-bold text-sm">Ship a Package</p>
            <ChevronRight size={16} className="text-primary-foreground/60 mt-1" />
          </button>
          <button
            onClick={() => navigate('/track')}
            className="min-w-0 bg-gradient-to-br from-accent to-accent-hover rounded-xl p-3 text-left btn-press sm:p-4"
          >
            <MapPin size={28} className="text-accent-foreground mb-3" />
            <p className="text-accent-foreground font-heading font-bold text-sm">Track</p>
            <ChevronRight size={16} className="text-accent-foreground/60 mt-1" />
          </button>
        </div>

        {/* Ship From */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Ship From</p>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <p className="break-words text-sm font-medium">
              {user?.location || '10000 Eldorado Drive, San Marcos, CA 92069'}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <span className="flex items-center gap-1 text-xs font-medium text-success">
              <CheckCircle2 size={14} /> Delivered Today
            </span>
            <span className="font-heading font-bold text-sm">$31.80</span>
          </div>
        </div>

        {/* Free protection */}
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-3">
          <Shield size={24} className="text-success shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-heading font-semibold text-sm">Free Shipping Protection</p>
              <span className="text-[10px] font-medium bg-success/10 text-success px-2 py-0.5 rounded-full">
                Included
              </span>
            </div>
            <p className="text-xs text-muted-foreground">All shipments are insured up to $100</p>
          </div>
        </div>

        {/* Manage */}
        <div>
          <h2 className="font-heading font-bold text-base mb-3">Manage Your Shipments</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/orders')}
              className="w-full bg-card rounded-xl shadow-card p-4 flex items-center gap-3 btn-press text-left"
            >
              <FileText size={22} className="text-accent shrink-0" />
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm">View Orders</p>
                <p className="text-xs text-muted-foreground">See all your shipments</p>
              </div>
              <span className="text-xs font-medium text-accent flex items-center gap-1">
                Show Orders <ChevronRight size={14} />
              </span>
            </button>
            <button
              onClick={() => navigate('/return')}
              className="w-full bg-card rounded-xl shadow-card p-4 flex items-center gap-3 btn-press text-left"
            >
              <RotateCcw size={22} className="text-accent shrink-0" />
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm">Create Return</p>
                <p className="text-xs text-muted-foreground">Start a return or exchange</p>
              </div>
              <span className="text-xs font-medium text-accent flex items-center gap-1">
                Start a Return <ChevronRight size={14} />
              </span>
            </button>
          </div>
        </div>

        {/* Refer */}
        <button
          onClick={() => navigate('/referrals')}
          className="w-full bg-navy rounded-xl p-4 flex items-center gap-3 btn-press text-left"
        >
          <Gift size={24} className="text-accent shrink-0" />
          <div className="flex-1">
            <p className="text-primary-foreground font-heading font-bold text-sm">Refer & Earn</p>
            <p className="text-primary-foreground/60 text-xs">
              Invite friends and get $5 in shipping credit!
            </p>
          </div>
          <ChevronRight size={18} className="text-accent" />
        </button>
      </main>
      <BottomTabBar />
    </div>
  );
};

export default Home;
