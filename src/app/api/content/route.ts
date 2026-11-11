import { NextResponse } from 'next/server';
import { getStore, updateStore } from '@/lib/storage';
import { AppStore } from '@/types';

export async function GET() {
  try {
    const store = getStore();
    return NextResponse.json(store);
  } catch (err) {
    console.error('Failed to get store data:', err);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, data, user = 'Administrator', details = 'Updated via CMS' } = body;

    if (!key || data === undefined) {
      return NextResponse.json({ error: 'Missing key or data' }, { status: 400 });
    }

    const updated = updateStore(key as keyof AppStore, data, user, details);
    return NextResponse.json({ success: true, store: updated });
  } catch (err) {
    console.error('Failed to update store data:', err);
    return NextResponse.json({ error: 'Failed to update store' }, { status: 500 });
  }
}

