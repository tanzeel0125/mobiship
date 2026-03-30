import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const EnableLocation = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const setUser = useAppStore(s => s.setUser);

  const handleAllow = () => {
    if (user) {
      setUser({ ...user, location: '10000 Eldorado Drive, San Marcos, CA 92069' });
    }
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex flex-col items-center justify-center px-6 page-enter">
      <div className="bg-card rounded-2xl shadow-card p-8 w-full max-w-sm text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <MapPin size={40} className="text-accent" />
        </div>
        <h1 className="font-heading text-xl font-bold mb-2">Enable Location for Ship From Address</h1>
        <p className="text-sm text-muted-foreground mb-6">
          MobiShip uses your location to confirm your shipping address and show nearby drop-off locations.
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-accent" />
            <span className="text-xs font-medium text-foreground">Current Location</span>
          </div>
          <div className="bg-muted rounded-lg h-24 mb-2 flex items-center justify-center">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <MapPin size={24} className="text-accent" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{user?.location || '10000 Eldorado Drive, San Marcos, CA 92069'}</p>
        </div>

        <button onClick={handleAllow} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press mb-3">
          Allow Location Access
        </button>
        <button onClick={handleAllow} className="w-full h-[52px] border-2 border-navy text-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Allow While Using App
        </button>

        <p className="text-xs text-muted-foreground mt-4">You can change this anytime in Settings.</p>
      </div>
    </div>
  );
};

export default EnableLocation;
