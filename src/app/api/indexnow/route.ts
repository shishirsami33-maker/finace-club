import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urlList, host = 'aiubfinanceclub.org' } = body;

    const apiKey = process.env.INDEXNOW_API_KEY || 'asfc-indexnow-key-2026';
    const keyLocation = `https://${host}/${apiKey}.txt`;

    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return NextResponse.json({ error: 'urlList must be a non-empty array' }, { status: 400 });
    }

    // Only notify on production or valid domain
    const payload = {
      host,
      key: apiKey,
      keyLocation,
      urlList,
    };

    const endpoint = 'https://api.indexnow.org/indexnow';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      message: 'Submitted URLs to IndexNow network',
      submittedCount: urlList.length,
    });
  } catch (err) {
    console.error('IndexNow submission error:', err);
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}

