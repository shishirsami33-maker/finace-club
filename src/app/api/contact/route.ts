import { NextResponse } from 'next/server';
import { getStore, updateStore } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, isPartnershipInquiry } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, Email, Message).' },
        { status: 400 }
      );
    }

    const store = getStore();
    const inquiryType = isPartnershipInquiry ? 'PARTNERSHIP_INQUIRY' : 'GENERAL_CONTACT';
    const logDetails = `Received message from ${name} (${email}) - Subject: ${subject || 'No Subject'}`;

    const newLog = {
      id: `inquiry-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: `${name} (${email})`,
      action: inquiryType,
      entityType: 'Inquiry',
      entityId: `msg-${Date.now()}`,
      details: `${logDetails} | Content: ${message.slice(0, 120)}...`,
    };

    updateStore('auditLogs', [newLog, ...(store.auditLogs || [])].slice(0, 100));

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to AIUB Students Finance Club. Our team will review your message promptly.',
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please email aiubfinanceclub@gmail.com directly.' },
      { status: 500 }
    );
  }
}

