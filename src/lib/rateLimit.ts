// Rate limiting utility for client-side usage
// For server-side, use a proper rate limiting service like Upstash Redis

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (clears on page refresh)
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string; // Prefix for the key
}

/**
 * Create rate limit key
 */
function createKey(identifier: string, prefix?: string): string {
  return prefix ? `${prefix}:${identifier}` : identifier;
}

/**
 * Check if request is rate limited
 */
export function isRateLimited(
  identifier: string,
  options: RateLimitOptions
): { limited: boolean; remaining: number; resetTime: number } {
  const key = createKey(identifier, options.keyPrefix);
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  // Clean up expired entries
  if (entry && entry.resetTime < now) {
    rateLimitStore.delete(key);
  }

  const currentEntry = rateLimitStore.get(key);

  if (!currentEntry) {
    // First request in window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      limited: false,
      remaining: options.maxRequests - 1,
      resetTime: now + options.windowMs,
    };
  }

  if (currentEntry.count >= options.maxRequests) {
    // Rate limit exceeded
    return {
      limited: true,
      remaining: 0,
      resetTime: currentEntry.resetTime,
    };
  }

  // Increment count
  currentEntry.count++;
  rateLimitStore.set(key, currentEntry);

  return {
    limited: false,
    remaining: options.maxRequests - currentEntry.count,
    resetTime: currentEntry.resetTime,
  };
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Stripe checkout - strict limit
  stripeCheckout: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    keyPrefix: 'stripe:checkout',
  },
  
  // Application submission
  applyIngest: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    keyPrefix: 'apply:ingest',
  },
  
  // Click tracking - generous limit
  clickTrack: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    keyPrefix: 'track:click',
  },
  
  // Email sending
  emailSend: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyPrefix: 'email:send',
  },
  
  // Login attempts
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    keyPrefix: 'auth:login',
  },
  
  // Password reset
  passwordReset: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    keyPrefix: 'auth:reset',
  },
  
  // General API
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,
    keyPrefix: 'api:general',
  },
};

/**
 * Clean up expired rate limit entries (call periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Auto-cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
