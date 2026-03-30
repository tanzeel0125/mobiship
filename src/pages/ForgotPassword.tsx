import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import MobiShipLogo from '@/components/MobiShipLogo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Enter a valid email'); return; }
    setError('');
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-card px-6 py-8 page-enter">
      <div className="flex justify-center mb-8"><MobiShipLogo /></div>
      <h1 className="font-heading text-xl font-bold text-center">Reset your password</h1>
      <p className="text-center text-muted-foreground text-sm mt-1 mb-6">Enter your email and we'll send a reset link</p>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-8 animate-fade-in">
          <CheckCircle2 size={48} className="text-success" />
          <p className="text-center font-medium">Check your email for a reset link</p>
          <Link to="/login" className="text-accent font-semibold text-sm">Back to Login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
              className={`w-full h-12 px-4 rounded-[10px] border bg-card text-sm font-body outline-none transition-colors ${error ? 'border-destructive' : 'border-border focus:border-accent'}`} />
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}
          </div>
          <button type="submit" className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press">
            Send Reset Link
          </button>
          <p className="text-center text-sm"><Link to="/login" className="text-accent font-medium">Back to Login</Link></p>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
