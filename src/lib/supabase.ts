import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types for database tables
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'guest' | 'plus' | 'elite' | 'admin';
  avatar_url: string | null;
  country: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: 'plus' | 'elite';
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused';
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  name: string;
  email: string;
  country_interest: string | null;
  message: string | null;
  source: string;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected' | 'waitlisted';
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AffiliateClick = {
  id: string;
  user_id: string | null;
  link_key: string;
  url: string;
  page: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  created_at: string;
};

// Auth helpers
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return data as Profile;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
  return data;
}

// Profile helpers
export async function updateProfile(profileId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Profile;
}

// Subscription helpers
export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data as Subscription | null;
}

// Role-based access control
export function hasAccess(profile: Profile | null, requiredRole: 'guest' | 'plus' | 'elite' | 'admin'): boolean {
  if (!profile) return requiredRole === 'guest';
  
  const roleHierarchy: Record<string, number> = {
    guest: 0,
    plus: 1,
    elite: 2,
    admin: 3,
  };
  
  return roleHierarchy[profile.role] >= roleHierarchy[requiredRole];
}

export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === 'admin';
}

// Real-time subscription listener
export function onSubscriptionChange(userId: string, callback: (subscription: Subscription) => void) {
  return supabase
    .channel(`subscriptions:user_id=eq.${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'subscriptions',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Subscription);
      }
    )
    .subscribe();
}
