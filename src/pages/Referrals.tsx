import { useState } from 'react';
import { Copy, Share2, Users, MoreHorizontal, Gift } from 'lucide-react';
import MobiShipTopNav from '@/components/MobiShipTopNav';
import { toast } from 'sonner';

const milestones = [
  { friends: 1, bonus: '$5', total: '$5', achieved: true },
  { friends: 3, bonus: '$10', total: '$15', achieved: true },
  { friends: 6, bonus: '$20', total: '$35', achieved: false },
];

const Referrals = () => {
  const refLink = 'mobiship.app/ref5';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${refLink}`);
      toast.success('Copied to clipboard!');
    } catch {
      toast.success('Copied!');
    }
  };

  return (
    <div className="mobile-shell min-h-[100dvh]">
      <MobiShipTopNav showBack />
      <div className="page-enter">
        {/* Hero */}
        <div className="bg-gradient-to-br from-navy to-navy-mid p-4 text-center sm:p-6">
          <div className="mb-4 text-5xl">🎁</div>
          <h1 className="mb-2 font-heading text-lg font-bold text-primary-foreground sm:text-xl">Invite Friends & Earn Rewards!</h1>
          <p className="text-sm text-primary-foreground/70">
            Invite your friends and earn $5 in shipping credit for each referral when they sign up and ship a package. Your friends also get $5 off their first shipment!
          </p>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Referral link */}
          <div className="bg-card rounded-xl shadow-card p-4">
            <label className="font-heading font-bold text-sm block mb-2">Your Referral Link</label>
            <div className="flex gap-2">
              <div className="flex-1 h-10 px-3 rounded-lg bg-muted flex items-center">
                <span className="text-sm font-mono truncate">{refLink}</span>
              </div>
              <button onClick={handleCopy} className="h-10 px-4 bg-accent text-accent-foreground rounded-lg font-heading font-bold text-xs btn-press flex items-center gap-1">
                <Copy size={14} /> Copy
              </button>
            </div>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">You have <strong>2 pending referrals</strong></p>
              <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-accent rounded-full animate-fill-bar" style={{ '--fill-width': '33%' } as React.CSSProperties} />
              </div>
              <p className="text-xs text-accent font-medium mt-1">$5 Earned</p>
            </div>
          </div>

          {/* Share */}
          <div className="grid grid-cols-3 gap-2">
            <button type="button" className="btn-press flex h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl bg-card px-1 text-[10px] font-medium leading-tight shadow-card sm:flex-row sm:gap-1.5 sm:text-xs">
              <Share2 size={16} className="shrink-0 text-accent" />
              <span className="text-center">Share</span>
            </button>
            <button type="button" className="btn-press flex h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl bg-card px-1 text-[10px] font-medium leading-tight shadow-card sm:flex-row sm:gap-1.5 sm:text-xs">
              <Users size={16} className="shrink-0 text-accent" />
              <span className="text-center">Invite</span>
            </button>
            <button type="button" className="btn-press flex h-12 items-center justify-center rounded-xl bg-card shadow-card" aria-label="More options">
              <MoreHorizontal size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Milestones */}
          <div>
            <h2 className="font-heading font-bold text-sm mb-3">Referral Bonuses</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {milestones.map((m, i) => (
                <div key={i} className="min-w-[140px] bg-card rounded-xl shadow-card p-4 text-center flex-shrink-0">
                  <p className="font-heading font-bold text-lg">{m.friends} {m.friends === 1 ? 'Friend' : 'Friends'}</p>
                  <p className="text-xs text-muted-foreground mt-1">+{m.bonus} shipping credit</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${m.achieved ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {m.total} Earned
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground">
            * Your friend must sign up through your link and ship a package in order for both of you to receive the $5 bonus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
