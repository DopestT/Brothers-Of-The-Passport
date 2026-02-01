#!/usr/bin/env node

/**
 * Launch Check Script
 * Validates all required environment variables before deployment
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables
config();

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
}

const REQUIRED_ENV_VARS = [
  'PUBLIC_SITE_URL',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PLUS_PRICE_ID',
  'STRIPE_ELITE_PRICE_ID',
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
];

const OPTIONAL_ENV_VARS = [
  'ANALYTICS_PROVIDER',
  'PUBLIC_ANALYTICS_ID',
  'APPLY_WEBHOOK_SECRET',
  'JWT_SECRET',
];

function checkEnvVar(name: string): CheckResult {
  const value = process.env[name];
  
  if (!value) {
    return {
      name,
      status: 'fail',
      message: `Missing required environment variable: ${name}`,
    };
  }

  // Validate format for specific variables
  if (name.includes('URL') && !value.startsWith('http')) {
    return {
      name,
      status: 'fail',
      message: `${name} must be a valid URL starting with http:// or https://`,
    };
  }

  if (name.includes('KEY') && value.length < 10) {
    return {
      name,
      status: 'warn',
      message: `${name} seems too short, please verify`,
    };
  }

  if (name.includes('EMAIL') && !value.includes('@')) {
    return {
      name,
      status: 'fail',
      message: `${name} must be a valid email address`,
    };
  }

  return {
    name,
    status: 'pass',
    message: `${name} is set`,
  };
}

function checkStripeKeys(): CheckResult {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    return {
      name: 'Stripe Keys',
      status: 'fail',
      message: 'STRIPE_SECRET_KEY is not set',
    };
  }

  const isLive = secretKey.startsWith('sk_live_');
  const isTest = secretKey.startsWith('sk_test_');

  if (!isLive && !isTest) {
    return {
      name: 'Stripe Keys',
      status: 'fail',
      message: 'STRIPE_SECRET_KEY must start with sk_live_ or sk_test_',
    };
  }

  return {
    name: 'Stripe Keys',
    status: isLive ? 'pass' : 'warn',
    message: isLive 
      ? 'Using Stripe LIVE mode' 
      : 'Using Stripe TEST mode - switch to live before launch',
  };
}

function checkSupabaseConnection(): CheckResult {
  const url = process.env.SUPABASE_URL;
  
  if (!url) {
    return {
      name: 'Supabase Connection',
      status: 'fail',
      message: 'SUPABASE_URL is not set',
    };
  }

  if (!url.includes('.supabase.co')) {
    return {
      name: 'Supabase Connection',
      status: 'warn',
      message: 'SUPABASE_URL does not look like a standard Supabase URL',
    };
  }

  return {
    name: 'Supabase Connection',
    status: 'pass',
    message: 'Supabase URL looks valid',
  };
}

function checkPackageJson(): CheckResult {
  try {
    const packageJson = JSON.parse(
      readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8')
    );
    
    const hasBuildScript = packageJson.scripts?.build;
    const hasDevScript = packageJson.scripts?.dev;

    if (!hasBuildScript || !hasDevScript) {
      return {
        name: 'package.json',
        status: 'fail',
        message: 'Missing required npm scripts (build, dev)',
      };
    }

    return {
      name: 'package.json',
      status: 'pass',
      message: 'All required scripts present',
    };
  } catch (error) {
    return {
      name: 'package.json',
      status: 'fail',
      message: 'Could not read package.json',
    };
  }
}

function runChecks(): void {
  console.log('\n🔍 Brothers of the Passport - Launch Check\n');
  console.log('=' .repeat(50));

  const results: CheckResult[] = [];

  // Check required environment variables
  console.log('\n📋 Required Environment Variables:\n');
  for (const envVar of REQUIRED_ENV_VARS) {
    const result = checkEnvVar(envVar);
    results.push(result);
    printResult(result);
  }

  // Check optional environment variables
  console.log('\n📋 Optional Environment Variables:\n');
  for (const envVar of OPTIONAL_ENV_VARS) {
    const result = checkEnvVar(envVar);
    results.push(result);
    printResult(result);
  }

  // Special checks
  console.log('\n🔐 Special Checks:\n');
  
  const stripeCheck = checkStripeKeys();
  results.push(stripeCheck);
  printResult(stripeCheck);

  const supabaseCheck = checkSupabaseConnection();
  results.push(supabaseCheck);
  printResult(supabaseCheck);

  const packageCheck = checkPackageJson();
  results.push(packageCheck);
  printResult(packageCheck);

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Summary:\n');

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const warnings = results.filter(r => r.status === 'warn').length;

  console.log(`  ✅ Passed: ${passed}`);
  console.log(`  ⚠️  Warnings: ${warnings}`);
  console.log(`  ❌ Failed: ${failed}`);

  console.log('\n' + '='.repeat(50));

  if (failed > 0) {
    console.log('\n❌ LAUNCH BLOCKED: Fix failed checks before deploying\n');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️  LAUNCH WITH CAUTION: Review warnings before deploying\n');
    process.exit(0);
  } else {
    console.log('\n✅ READY TO LAUNCH: All checks passed!\n');
    process.exit(0);
  }
}

function printResult(result: CheckResult): void {
  const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
  console.log(`  ${icon} ${result.message}`);
}

runChecks();
