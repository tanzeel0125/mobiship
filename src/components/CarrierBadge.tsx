interface Props {
  carrier: 'UPS' | 'FedEx' | 'USPS';
  size?: 'sm' | 'md';
}

const colors = {
  UPS: 'bg-amber-800 text-white',
  FedEx: 'bg-purple-700 text-white',
  USPS: 'bg-blue-700 text-white',
};

const CarrierBadge = ({ carrier, size = 'md' }: Props) => (
  <div className={`${colors[carrier]} rounded-lg flex items-center justify-center font-heading font-bold ${
    size === 'sm' ? 'w-8 h-8 text-[10px]' : 'w-10 h-10 text-xs'
  }`}>
    {carrier}
  </div>
);

export default CarrierBadge;
