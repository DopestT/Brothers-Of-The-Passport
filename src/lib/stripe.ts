import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (public)
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

// Price IDs from environment
const PLUS_PRICE_ID = import.meta.env.VITE_STRIPE_PLUS_PRICE_ID || '';
const ELITE_PRICE_ID = import.meta.env.VITE_STRIPE_ELITE_PRICE_ID || '';

// Create checkout session via API
export async function createCheckoutSession(priceId: string, customerEmail?: string) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerEmail,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/join?canceled=true`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

// Redirect to checkout
export async function redirectToCheckout(priceId: string, customerEmail?: string) {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const sessionId = await createCheckoutSession(priceId, customerEmail);
  
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
}

// Open customer portal
export async function openCustomerPortal() {
  try {
    const response = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create portal session');
    }

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Portal error:', error);
    throw error;
  }
}

// Checkout helpers for specific plans
export async function checkoutPlus(customerEmail?: string) {
  return redirectToCheckout(PLUS_PRICE_ID, customerEmail);
}

export async function checkoutElite(customerEmail?: string) {
  return redirectToCheckout(ELITE_PRICE_ID, customerEmail);
}

// Get price ID for plan
export function getPriceIdForPlan(plan: 'plus' | 'elite'): string {
  return plan === 'plus' ? PLUS_PRICE_ID : ELITE_PRICE_ID;
}

// Format price for display
export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

// Subscription status helpers
export function isActiveSubscription(status: string): boolean {
  return ['active', 'trialing'].includes(status);
}

export function isCanceledSubscription(status: string): boolean {
  return ['canceled', 'incomplete_expired', 'unpaid'].includes(status);
}

export function getSubscriptionStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'Active',
    trialing: 'Trial',
    past_due: 'Past Due',
    canceled: 'Canceled',
    incomplete: 'Incomplete',
    incomplete_expired: 'Expired',
    unpaid: 'Unpaid',
    paused: 'Paused',
  };
  return statusMap[status] || status;
}
