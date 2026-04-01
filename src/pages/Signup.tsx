import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import MobiShipLogo from '@/components/MobiShipLogo';
import { useAppStore } from '@/store/useAppStore';

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useAppStore(s => s.setUser);
  const [form, setForm] = useState({ email: '', phone: '', name: '', username: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.phone.length < 7) e.phone = 'Enter a valid phone number';
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.username.trim()) e.username = 'Username is required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!agreed) e.agreed = 'You must agree to the terms';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setTimeout(() => {
      const nameParts = form.name.trim().split(' ');
      const initials = (nameParts[0][0] + (nameParts[1]?.[0] || '')).toUpperCase();
      setUser({
        name: form.name,
        email: form.email,
        username: form.username,
        initials,
        phone: form.phone.startsWith('+1') ? form.phone : `+1 ${form.phone}`,
        location: '10000 Eldorado Drive, San Marcos, CA 92069',
        isLoggedIn: true,
      });
      navigate('/enable-location', { replace: true });
    }, 1000);
  };

  const inputClass = (field: string) =>
    `w-full h-12 px-4 rounded-[10px] border bg-card text-sm font-body outline-none transition-colors ${
      errors[field] ? 'border-destructive' : 'border-border focus:border-accent'
    }`;

  return (
    <div className="mobile-shell shell-top-inset min-h-[100dvh] bg-card px-4 pb-8 page-enter sm:px-6">
      <div className="mb-8 flex justify-center">
        <MobiShipLogo />
      </div>
      <h1 className="font-heading text-xl font-bold text-center">Create your account</h1>
      <p className="text-center text-muted-foreground text-sm mt-1 mb-6">Access shipping discounts and label-free shipping</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="email" placeholder="Email Address" className={inputClass('email')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+1</span>
            <input type="tel" placeholder="Mobile Number" className={`${inputClass('phone')} pl-10`} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <input placeholder="Full Name" className={inputClass('name')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input placeholder="Username" className={inputClass('username')} value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
          {errors.username && <p className="text-destructive text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} placeholder="Password" className={inputClass('password')} value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 accent-accent" />
          <span className="text-xs text-muted-foreground">I agree to the <span className="text-accent font-medium">MobiShip user agreement</span>.</span>
        </label>
        {errors.agreed && <p className="text-destructive text-xs">{errors.agreed}</p>}

        <p className="text-xs text-muted-foreground">View <span className="text-accent font-medium">MobiShip privacy policy</span></p>

        <button type="submit" disabled={loading} className="w-full h-[52px] bg-accent text-accent-foreground rounded-xl font-heading font-bold text-sm btn-press disabled:opacity-60 flex items-center justify-center">
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account? <Link to="/login" className="text-accent font-semibold">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
