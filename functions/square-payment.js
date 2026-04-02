export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const squareToken  = context.env.SQUARE_ACCESS_TOKEN;
  const locationId   = context.env.SQUARE_LOCATION_ID;

  let body;
  try { body = await context.request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 }); }

  const { sourceId, amount, currency = 'GBP', note, buyerEmail } = body;

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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
