import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmail, signInWithMagicLink } from '@/lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLink, setMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (magicLink) {
        await signInWithMagicLink(email);
        setMessage('Check your email for the magic link!');
      } else {
        await signInWithEmail(email, password);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-gold tracking-wider">BROTHERS</h1>
          <p className="text-ivory/60 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="card-dark p-8">
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('Check your email') 
                ? 'bg-green-900/20 border border-green-500/30 text-green-400'
                : 'bg-red-900/20 border border-red-500/30 text-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-ivory/70 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-charcoal border border-white/10 rounded pl-12 pr-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password (only if not using magic link) */}
            {!magicLink && (
              <div>
                <label className="block text-sm text-ivory/70 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
                  <input
                    type="password"
                    required={!magicLink}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-charcoal border border-white/10 rounded pl-12 pr-4 py-3 text-ivory focus:border-gold focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  {magicLink ? 'Send Magic Link' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setMagicLink(!magicLink)}
              className="text-gold text-sm hover:underline"
            >
              {magicLink ? 'Use password instead' : 'Sign in with magic link'}
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm">
            <a href="/forgot-password" className="text-ivory/60 hover:text-gold transition-colors">
              Forgot password?
            </a>
            <a href="/join" className="text-gold hover:underline">
              Not a member?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
