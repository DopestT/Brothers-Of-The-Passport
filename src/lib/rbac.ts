import type { Profile } from './supabase';

// Role hierarchy (higher number = more access)
export const ROLE_HIERARCHY: Record<string, number> = {
  guest: 0,
  plus: 1,
  elite: 2,
  admin: 3,
};

// Feature access matrix
export const FEATURE_ACCESS: Record<string, ('guest' | 'plus' | 'elite' | 'admin')[]> = {
  // Public pages
  'home': ['guest', 'plus', 'elite', 'admin'],
  'about': ['guest', 'plus', 'elite', 'admin'],
  'join': ['guest', 'plus', 'elite', 'admin'],
  'apply': ['guest', 'plus', 'elite', 'admin'],
  
  // Basic member features
  'dashboard': ['plus', 'elite', 'admin'],
  'profile': ['plus', 'elite', 'admin'],
  'account': ['plus', 'elite', 'admin'],
  'community': ['plus', 'elite', 'admin'],
  
  // Content features
  'city-guides': ['plus', 'elite', 'admin'],
  'city-guides-full': ['elite', 'admin'], // Full guides with verified resources
  'tools-perks': ['plus', 'elite', 'admin'],
  'tools-perks-elite': ['elite', 'admin'], // Elite-only tools
  
  // Premium features
  'verified-resources': ['elite', 'admin'],
  'consultation': ['elite', 'admin'],
  'vip-events': ['elite', 'admin'],
  
  // Admin features
  'admin': ['admin'],
  'admin-applications': ['admin'],
  'admin-members': ['admin'],
  'admin-analytics': ['admin'],
};

/**
 * Check if a profile has access to a specific feature
 */
export function hasAccess(
  profile: Profile | null,
  feature: string
): boolean {
  if (!profile) {
    return FEATURE_ACCESS[feature]?.includes('guest') ?? false;
  }
  
  const allowedRoles = FEATURE_ACCESS[feature];
  if (!allowedRoles) return false;
  
  return allowedRoles.includes(profile.role);
}

/**
 * Check if profile has required role level
 */
export function hasRole(
  profile: Profile | null,
  minRole: 'guest' | 'plus' | 'elite' | 'admin'
): boolean {
  if (!profile) return minRole === 'guest';
  
  return ROLE_HIERARCHY[profile.role] >= ROLE_HIERARCHY[minRole];
}

/**
 * Check if user is admin
 */
export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === 'admin';
}

/**
 * Get readable role name
 */
export function getRoleDisplayName(role: string): string {
  const displayNames: Record<string, string> = {
    guest: 'Guest',
    plus: 'PLUS Member',
    elite: 'ELITE Member',
    admin: 'Administrator',
  };
  return displayNames[role] || role;
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(role: string): string {
  const colors: Record<string, string> = {
    guest: 'bg-gray-600',
    plus: 'bg-gold/80 text-charcoal',
    elite: 'bg-gold text-charcoal',
    admin: 'bg-red-600',
  };
  return colors[role] || 'bg-gray-600';
}

/**
 * Middleware helper to check access and redirect
 */
export function checkAccessAndRedirect(
  profile: Profile | null,
  feature: string,
  redirectUrl: string = '/join'
): { allowed: boolean; redirect?: string } {
  if (!hasAccess(profile, feature)) {
    return { allowed: false, redirect: redirectUrl };
  }
  return { allowed: true };
}

/**
 * Get all features accessible by role
 */
export function getFeaturesForRole(role: string): string[] {
  return Object.entries(FEATURE_ACCESS)
    .filter(([_, roles]) => roles.includes(role as any))
    .map(([feature]) => feature);
}

/**
 * Content gating helper - returns content level
 */
export function getContentLevel(profile: Profile | null): 'none' | 'basic' | 'full' | 'admin' {
  if (!profile) return 'none';
  if (profile.role === 'admin') return 'admin';
  if (profile.role === 'elite') return 'full';
  if (profile.role === 'plus') return 'basic';
  return 'none';
}

/**
 * Check if content should be gated
 */
export function isContentGated(
  contentLevel: 'basic' | 'full' | 'elite',
  userLevel: 'none' | 'basic' | 'full' | 'admin'
): boolean {
  const levelValues: Record<string, number> = {
    none: 0,
    basic: 1,
    full: 2,
    elite: 2,
    admin: 3,
  };
  
  return levelValues[userLevel] < levelValues[contentLevel];
}
