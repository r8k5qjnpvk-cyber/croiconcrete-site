exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const squareToken  = process.env.SQUARE_ACCESS_TOKEN;
  const locationId   = process.env.SQUARE_LOCATION_ID;

  if (!squareToken || !locationId) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Square env vars not set' }) };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { sourceId, amount, currency = 'GBP', note, buyerEmail, buyerName } = body;

  if (!sourceId || !amount) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing sourceId or amount' }) };
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
        amount_money: {
          amount: Math.round(amount * 100), // pence
          currency,
        },
        location_id: locationId,
        note: note || 'Croi Concrete order',
        buyer_email_address: buyerEmail || undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data.errors?.[0]?.detail || 'Payment failed' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, paymentId: data.payment?.id }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
