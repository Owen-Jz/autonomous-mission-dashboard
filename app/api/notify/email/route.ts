import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_AXqtNPNq_75nHx9rzHKhVVu4ADCwbJ5eU';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, departmentId, sessionId, subject, message, to } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Autonomous Dashboard <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a;">${subject}</h1>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #333; font-size: 16px; line-height: 1.6;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              Department: ${departmentId || 'N/A'}<br>
              Session: ${sessionId || 'N/A'}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 11px;">
              Sent from Autonomous Mission Dashboard
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ error: data.message || 'Failed to send email' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
