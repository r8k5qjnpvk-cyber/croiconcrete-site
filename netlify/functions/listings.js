exports.handler = async () => {
  const keystring    = process.env.ETSY_API_KEY;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  const shopId       = 56714168;
  const apiKey       = `${keystring}:${sharedSecret}`;
  const headers      = { 'x-api-key': apiKey };

  try {
    const listRes = await fetch(
      `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=100`,
      { headers }
    );
    if (!listRes.ok) throw new Error(`Listings failed ${listRes.status}`);
    const { results: listings } = await listRes.json();

    // Fetch images for all listings concurrently
    await Promise.all(listings.map(async l => {
      try {
        const r = await fetch(
          `https://openapi.etsy.com/v3/application/listings/${l.listing_id}/images`,
          { headers }
        );
        l.images = r.ok ? (await r.json()).results || [] : [];
      } catch { l.images = []; }
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(listings),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
