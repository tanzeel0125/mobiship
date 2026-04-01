import MobiShipTopNav from '@/components/MobiShipTopNav';
import { useAppStore } from '@/store/useAppStore';

const Notifications = () => {
  const { notifications, setNotifications } = useAppStore();

  const toggles = [
    { label: 'Push Notifications', desc: 'Get push alerts for shipment updates', key: 'push' },
    { label: 'Email Notifications', desc: 'Receive email updates for orders', key: 'email' },
    { label: 'SMS Notifications', desc: 'Get text messages for delivery updates', key: 'sms' },
    { label: 'Promotional Offers', desc: 'Receive special deals and discounts', key: 'promo' },
  ];

  return (
    <div className="mobile-shell min-h-[100dvh]">
      <MobiShipTopNav showBack />
      <div className="px-4 py-4 page-enter">
        <h1 className="font-heading text-lg font-bold mb-4">Notification Settings</h1>
        <div className="space-y-3">
          {toggles.map((t, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-4 flex items-center justify-between">
              <div>
                <p className="font-heading font-semibold text-sm">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? 'bg-accent' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 bg-card rounded-full absolute top-0.5 transition-transform shadow ${notifications ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
