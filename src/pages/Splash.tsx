import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import appIcon from '@/assets/app-icon.png';

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
    }, 2500);
    return () => clearTimeout(timer);
  }, [ready, user, navigate]);

  return (
    <div className="shell-top-inset flex min-h-[100dvh] flex-col items-center justify-center bg-navy px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
      <div className="animate-fade-in flex flex-col items-center gap-5">
        <img
          src={appIcon}
          alt="MobiShip"
          className="w-28 h-28 rounded-[24px]"
          style={{ boxShadow: '0 8px 40px rgba(255,255,255,0.15), 0 2px 12px rgba(0,0,0,0.3)' }}
        />
        <div className="flex items-baseline gap-0.5 mt-2">
          <span className="text-white font-heading font-extrabold text-3xl tracking-tight">MOBI</span>
          <span className="text-accent font-heading font-extrabold text-3xl tracking-tight">SHIP</span>
        </div>
        <p className="text-white/50 font-body text-sm tracking-wide">Shipping Made Easy</p>
        <div className="w-7 h-7 border-[3px] border-accent border-t-transparent rounded-full animate-spin mt-6" />
      </div>
    </div>
  );
};

export default Splash;
