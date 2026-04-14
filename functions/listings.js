export async function onRequest(context) {
  const keystring    = context.env.ETSY_API_KEY;
  const sharedSecret = context.env.ETSY_SHARED_SECRET;
  const shopId       = 56714168;

  // Validate env vars are present
  if (!keystring || !sharedSecret) {
    return new Response(JSON.stringify({ 
      error: 'API credentials not configured',
      detail: 'ETSY_API_KEY or ETSY_SHARED_SECRET missing from environment'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // Etsy v3 requires keystring:sharedSecret format
  const apiKey  = `${keystring}:${sharedSecret}`;
  const headers = { 'x-api-key': apiKey };
  const CACHE_TTL = 1200; // 20 minutes — reduces Etsy API calls without stale data risk

  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    // Use findAllActiveListingsByShop endpoint (public, no OAuth needed)
    const listUrl = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=100`;
    const listRes = await fetch(listUrl, { headers });

    if (!listRes.ok) {
      const errBody = await listRes.text();
      console.error(`Etsy listings API error: ${listRes.status}`, errBody);
      throw new Error(`Etsy API returned ${listRes.status}: ${errBody.substring(0, 200)}`);
    }

    const { results: listings } = await listRes.json();

    if (!listings || !listings.length) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Fetch images concurrently (with timeout protection)
    await Promise.all(listings.map(async (l) => {
      try {
        const imgUrl = `https://openapi.etsy.com/v3/application/listings/${l.listing_id}/images`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const r = await fetch(imgUrl, { headers, signal: controller.signal });
        clearTimeout(timeout);
        l.images = r.ok ? (await r.json()).results || [] : [];
      } catch {
        l.images = [];
      }
    }));

    return new Response(JSON.stringify(listings), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'CDN-Cache-Control': `max-age=${CACHE_TTL}`
      }
    });
  } catch (err) {
    console.error('Listings function error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
