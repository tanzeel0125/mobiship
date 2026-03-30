import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobiShipLogo from '@/components/MobiShipLogo';
import { useAppStore } from '@/store/useAppStore';

const Splash = () => {
  const navigate = useNavigate();
  const user = useAppStore(s => s.user);
  const initFromStorage = useAppStore(s => s.initFromStorage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initFromStorage();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      navigate(user?.isLoggedIn ? '/home' : '/onboarding', { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [ready, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy">
      <div className="animate-fade-in flex flex-col items-center gap-6">
        <MobiShipLogo size="lg" light />
        <p className="text-white/60 font-body text-base">Shipping Made Easy</p>
        <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin-slow mt-4" />
      </div>
    </div>
  );
};

export default Splash;
