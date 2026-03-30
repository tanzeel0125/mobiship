interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
}

const MobiShipLogo = ({ size = 'md', light }: LogoProps) => {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };
  const iconSizes = { sm: 20, md: 28, lg: 40 };
  const s = iconSizes[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative" style={{ width: s, height: s }}>
        <svg viewBox="0 0 40 40" width={s} height={s} fill="none">
          <rect x="4" y="8" width="24" height="24" rx="4" fill={light ? '#fff' : '#0B1F3A'} />
          <path d="M32 12c4 0 6 2 6 6v4c0 4-2 6-6 6h-2" stroke="#F97316" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M30 28l3 3 3-3" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <span className={`font-heading font-extrabold tracking-tight ${sizes[size]}`}>
        <span className={light ? 'text-white' : 'text-foreground'}>MOBI</span>
        <span className="text-accent">SHIP</span>
      </span>
    </div>
  );
};

export default MobiShipLogo;
