import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log(`[Mock Newsletter Subscription] Email: ${email}`);
      console.log("No RESEND_API_KEY configured. Mocking email delivery.");
      return NextResponse.json({ success: true, mock: true });
    }

    const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #faf8f6;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border: 1px solid #e8e3df;
      padding: 40px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .brand {
      font-family: Georgia, serif;
      font-size: 28px;
      letter-spacing: 2px;
      font-weight: bold;
      text-transform: uppercase;
      color: #1a1a1a;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background-color: #e8e3df;
      margin: 24px 0;
    }
    .title {
      font-family: Georgia, serif;
      font-size: 22px;
      color: #1a1a1a;
      margin-bottom: 16px;
      text-align: center;
    }
    .message {
      font-size: 15px;
      line-height: 1.6;
      color: #4a4a4a;
      margin-bottom: 24px;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .button {
      background-color: #1a1a1a;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 32px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 500;
      display: inline-block;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #9b9b9b;
      margin-top: 40px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://thebeautyvault.vercel.app" class="brand">The Beauty Vault</a>
    </div>
    <div class="divider"></div>
    <h2 class="title">Welcome to Our Journal</h2>
    <p class="message">
      Thank you for subscribing to The Beauty Vault Journal. You are now part of our inner circle.
    </p>
    <p class="message">
      Moving forward, you will be the first to receive updates on our latest product formulations, exclusive brand stories, and invitations to private events.
    </p>
    <div class="button-container">
      <a href="https://thebeautyvault.vercel.app/shop" class="button">Explore Skincare</a>
    </div>
    <div class="divider"></div>
    <p class="footer">
      © 2026 The Beauty Vault. All rights reserved.<br>
      You are receiving this email because you subscribed to our newsletter.<br>
      If you wish to unsubscribe, you can click <a href="#" style="color: #9b9b9b; text-decoration: underline;">here</a>.
    </p>
  </div>
</body>
</html>`;

    // Resend requires verified sender domain. For testing/onboarding, it allows onboarding@resend.dev.
    const sender = process.env.SENDER_EMAIL || "onboarding@resend.dev";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `The Beauty Vault <${sender}>`,
        to: [email],
        subject: "Welcome to The Beauty Vault Journal",
        html: emailHtml,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("Resend API returned an error:", resData);
      return NextResponse.json(
        { error: resData.message || "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: resData });
  } catch (err: any) {
    console.error("Subscription route failed:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
