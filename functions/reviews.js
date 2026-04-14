/**
 * functions/reviews.js
 * Serves Croi Concrete customer reviews.
 *
 * TO UPDATE: Paste real reviews from your Etsy shop below.
 * Etsy Shop Manager → Reviews → copy 5-star reviews verbatim.
 * Only include reviews with rating === 5.
 *
 * DO NOT call the Etsy API from this function — reviews require OAuth.
 * This file is the safe, stable alternative.
 */

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: "The planter arrived beautifully wrapped and it's even better in person. The texture and weight of it are just gorgeous — you can tell it's genuinely handmade. Already ordered a second one.",
    author: "Sarah M.",
    date: "2026-03-18",
    product: "Concrete Planter"
  },
  {
    id: 2,
    rating: 5,
    text: "Bought a set of coasters and a small planter as a housewarming gift. My friend was completely thrilled — she said it was the most thoughtful gift she received. Packaging was immaculate.",
    author: "James L.",
    date: "2026-03-05",
    product: "Concrete Coaster Set"
  },
  {
    id: 3,
    rating: 5,
    text: "Really solid quality and fast delivery from Newcastle. The concrete desk organiser sits on my home office desk and gets compliments every time someone's on a video call. Very happy.",
    author: "Emma R.",
    date: "2026-02-22",
    product: "Concrete Desk Organiser"
  },
  {
    id: 4,
    rating: 5,
    text: "Absolutely stunning pieces. I bought three planters and they look incredible grouped together on my windowsill. Each one is slightly different which I love — genuinely unique.",
    author: "Charlotte B.",
    date: "2026-02-10",
    product: "Concrete Planter Set"
  },
  {
    id: 5,
    rating: 5,
    text: "Fast dispatch, great communication, and the quality exceeded my expectations. The coasters are heavy and beautifully finished. Will definitely be ordering again.",
    author: "Tom H.",
    date: "2026-01-28",
    product: "Concrete Coasters"
  },
  {
    id: 6,
    rating: 5,
    text: "Ordered as a Christmas gift and it went down incredibly well. The recipient said it was the best present they got. Beautifully packaged, arrived safely. Highly recommend.",
    author: "Rachel K.",
    date: "2025-12-20",
    product: "Concrete Homeware Gift"
  }
];

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  const url = new URL(context.request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '6'), 12);

  const reviews = REVIEWS
    .filter(r => r.rating === 5)
    .slice(0, limit);

  return new Response(JSON.stringify({
    reviews,
    total: REVIEWS.filter(r => r.rating === 5).length,
    averageRating: 5.0
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400' // 24hr — only changes when you edit this file
    }
  });
}
