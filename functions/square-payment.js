export async function onRequest(context) {
  // CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const squareToken  = context.env.SQUARE_ACCESS_TOKEN;
  const locationId   = context.env.SQUARE_LOCATION_ID;

  let body;
  try { body = await context.request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 }); }

  const { sourceId, amount, currency = 'GBP', note, buyerEmail } = body;

  // Guard: reject zero or missing amounts
  if (!sourceId || !amount || amount <= 0) {
    return new Response(JSON.stringify({ error: 'Invalid payment details' }), { status: 400 });
  }

  try {
    const res = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${squareToken}`,
        'Square-Version': '2024-11-20',
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: crypto.randomUUID(),
        amount_money: { amount: Math.round(amount * 100), currency },
        location_id: locationId,
        note: note || 'Croi Concrete order',
        buyer_email_address: buyerEmail || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.errors?.[0]?.detail || 'Payment failed');

    return new Response(JSON.stringify({ success: true, paymentId: data.payment?.id }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
