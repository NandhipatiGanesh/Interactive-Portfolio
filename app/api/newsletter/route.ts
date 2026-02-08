import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source_url } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const wpApiUrl = process.env.NEWSLETTER_API_URL;
    if (!wpApiUrl) {
      console.error('NEWSLETTER_API_URL environment variable is not set');
      return NextResponse.json(
        { success: false, error: 'Newsletter service is not configured' },
        { status: 500 }
      );
    }

    const sourceUrl = source_url || 'https://laatui.com';

    const response = await fetch(wpApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, source_url: sourceUrl }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json(
        {
          success: true,
          message: data.message || 'Successfully subscribed to newsletter',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: data.message || 'Failed to subscribe',
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
