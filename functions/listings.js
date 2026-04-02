export async function onRequest(context) {
  const keystring    = context.env.ETSY_API_KEY;
  const sharedSecret = context.env.ETSY_SHARED_SECRET;
  const shopId       = 56714168;
  const apiKey       = `${keystring}:${sharedSecret}`;
  const headers      = { 'x-api-key': apiKey };
  
  const CACHE_TTL = 300; // 5 minutes

  try {
    const listRes = await fetch(
      `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=100`,
      { headers }
    );
    if (!listRes.ok) throw new Error(`Listings failed ${listRes.status}`);
    const { results: listings } = await listRes.json();

    // Fetch images concurrently for all listings
    await Promise.all(listings.map(async l => {
      try {
        const r = await fetch(
          `https://openapi.etsy.com/v3/application/listings/${l.listing_id}/images`,
          { headers }
        );
        l.images = r.ok ? (await r.json()).results || [] : [];
      } catch { l.images = []; }
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
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
