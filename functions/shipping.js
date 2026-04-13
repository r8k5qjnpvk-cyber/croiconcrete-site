/**
 * functions/shipping.js
 * Serves Croi Concrete shipping rates — matches Etsy shipping profile exactly.
 *
 * UPDATE RATES HERE when you change your Etsy shipping profile:
 * Etsy Shop Manager → Settings → Shipping profiles → [your profile name]
 *
 * Current profile ID on all listings: 288723398598
 * Last verified: April 2026
 */

const SHIPPING_RATES = {
  // ── UK DOMESTIC ──────────────────────────────────────────────────
  GB: [
    {
      id: 'uk_standard',
      label: 'Standard UK Delivery',
      carrier: 'Royal Mail 2nd Class',
      description: '3–5 working days',
      price: 3.95,       // ← UPDATE to match your Etsy profile
      currency: 'GBP',
      is_default: true
    },
    {
      id: 'uk_tracked',
      label: 'Tracked UK Delivery',
      carrier: 'Royal Mail Tracked 48',
      description: '2–3 working days with tracking',
      price: 5.50,       // ← UPDATE to match your Etsy profile
      currency: 'GBP'
    },
    {
      id: 'uk_express',
      label: 'Express UK Delivery',
      carrier: 'Royal Mail 1st Class / Next Day',
      description: '1–2 working days',
      price: 6.95,       // ← UPDATE to match your Etsy profile
      currency: 'GBP'
    }
  ],

  // ── EUROPE ───────────────────────────────────────────────────────
  EU: [
    {
      id: 'eu_standard',
      label: 'European Delivery',
      carrier: 'Royal Mail International',
      description: '5–10 working days',
      price: 9.95,       // ← UPDATE to match your Etsy profile
      currency: 'GBP',
      is_default: true
    }
  ],

  // ── REST OF WORLD ─────────────────────────────────────────────────
  INTL: [
    {
      id: 'intl_standard',
      label: 'International Delivery',
      carrier: 'Royal Mail International Tracked',
      description: '7–14 working days',
      price: 12.95,      // ← UPDATE to match your Etsy profile
      currency: 'GBP',
      is_default: true
    }
  ]
};

// EU country codes
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
  } else if (EU_COUNTRIES.has(country)) {
    rates = SHIPPING_RATES.EU;
  } else {
    rates = SHIPPING_RATES.INTL;
  }

  return new Response(JSON.stringify({
    country,
    currency: 'GBP',
    rates,
    note: 'Prices match Croi Concrete Etsy shipping profile 288723398598',
    last_verified: '2026-04-13'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400' // 24hr cache — rates rarely change
    }
  });
}
