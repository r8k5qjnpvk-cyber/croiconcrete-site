/**
 * functions/shipping.js
 * Serves Croi Concrete shipping rates — matches Etsy shipping profile exactly.
 *
 * UPDATE RATES HERE when you change your Etsy shipping profile:
 * Etsy Shop Manager → Settings → Shipping profiles → [your profile name]
 *
 * Current profile ID on all listings: 288723398598
 * Last updated: April 15, 2026
 */

const SHIPPING_RATES = {
  // ── UK DOMESTIC ──────────────────────────────────────────────────
  GB: [
    {
      id: 'uk_standard',
      label: 'Free UK Standard Delivery',
      carrier: 'Royal Mail 2nd Class',
      description: '3–5 working days',
      price: 0.00,       // FREE UK shipping
      currency: 'GBP',
      is_default: true
    },
    {
      id: 'uk_express',
      label: 'UK Express Delivery',
      carrier: 'Royal Mail 1st Class / Tracked',
      description: '1–2 working days',
      price: 2.50,
      currency: 'GBP'
    }
  ],

  // ── WORLDWIDE (Europe + Rest of World) ───────────────────────────
  INTL: [
    {
      id: 'intl_standard',
      label: 'Worldwide Delivery',
      carrier: 'Royal Mail International Tracked',
      description: '7–14 working days',
      price: 10.00,
      currency: 'GBP',
      is_default: true
    }
  ]
};

// EU country codes (kept for potential future use)
const EU_COUNTRIES = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU',
  'IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'
]);

export async function onRequest(context) {
  // CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (context.request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const url = new URL(context.request.url);
  const country = (url.searchParams.get('country') || 'GB').toUpperCase();

  let rates;
  if (country === 'GB') {
    rates = SHIPPING_RATES.GB;
  } else {
    // All international destinations use same rate
    rates = SHIPPING_RATES.INTL;
  }

  return new Response(JSON.stringify({
    country,
    currency: 'GBP',
    rates,
    note: 'Free UK standard delivery, £2.50 UK express, £10 worldwide',
    last_verified: '2026-04-15'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400' // 24hr cache — rates rarely change
    }
  });
}
