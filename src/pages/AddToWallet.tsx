import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone } from 'lucide-react';

const AddToWallet = () => {
  const navigate = useNavigate();
  const orderId = sessionStorage.getItem('mobiship_last_order_id') || '102334';

  return (
    <div className="mobile-shell min-h-screen flex flex-col items-center justify-center px-6 page-enter">
      <div className="bg-card rounded-2xl shadow-card p-8 w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-2xl flex items-center justify-center">
          <Smartphone size={40} className="text-accent" />
        </div>
        <div className="bg-navy rounded-xl p-6 mb-6 inline-block">
          <QRCodeSVG value={`mobiship://order/${orderId}`} size={120} bgColor="transparent" fgColor="#ffffff" />
        </div>
        <h1 className="font-heading text-lg font-bold mb-2">Add QR Code to Wallet</h1>
        <p className="text-sm text-muted-foreground mb-6">You can now access this QR code for easy scanning from your Apple Wallet.</p>
        <button onClick={() => navigate('/find-location')} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press">
          Done
        </button>
      </div>
    </div>
  );
};

export default AddToWallet;
