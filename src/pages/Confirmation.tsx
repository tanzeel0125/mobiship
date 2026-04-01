import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Wallet, MapPin } from 'lucide-react';
import BottomTabBar from '@/components/BottomTabBar';

const Confirmation = () => {
  const navigate = useNavigate();
  const orderId = sessionStorage.getItem('mobiship_last_order_id') || '102334';

  return (
    <div className="mobile-shell min-h-[100dvh] bg-gradient-to-b from-blue-50 via-background to-background pb-20">
      <div className="page-enter px-4 pb-8 pt-10 sm:px-6 sm:pt-12">
        <div className="mb-8 text-center">
          <h1 className="mb-6 font-heading text-xl font-bold sm:text-2xl">Thank you!</h1>
          <div className="inline-block max-w-full rounded-2xl bg-card p-4 shadow-card sm:p-6">
            <QRCodeSVG value={`mobiship://order/${orderId}`} size={168} className="mx-auto h-auto w-full max-w-[168px]" bgColor="transparent" fgColor="#0B1F3A" />
          </div>
          <p className="font-mono text-sm text-muted-foreground mt-4">Order #{orderId}</p>
        </div>

        <div className="bg-card rounded-xl shadow-card p-4 mb-6">
          <h2 className="font-heading font-bold text-sm mb-3">Next Steps</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <p className="text-sm">Add QR code to your <strong>Apple Wallet</strong> (also access from "Orders")</p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <div>
                <p className="text-sm">Find store to drop-off order</p>
                <button onClick={() => navigate('/find-location')} className="text-xs text-accent font-medium mt-1">Find location ▼</button>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <p className="text-sm">Present your item and the QR code to scan at the store.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            See full instructions for each location, as some locations may require drop-off return barcode.
          </p>
        </div>

        <div className="space-y-3">
          <button onClick={() => navigate('/ship/add-to-wallet')} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press flex items-center justify-center gap-2">
            <Wallet size={18} /> Add QR Code to Wallet
          </button>
          <button onClick={() => navigate('/find-location')} className="w-full h-[52px] border-2 border-navy text-foreground rounded-xl font-heading font-bold text-sm btn-press flex items-center justify-center gap-2">
            <MapPin size={18} /> Find Drop-Off Location
          </button>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Confirmation;
