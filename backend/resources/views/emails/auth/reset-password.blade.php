<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    /* ── Reset ── */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #080814;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      padding: 40px 16px 60px;
    }

    /* ── Outer wrapper ── */
    .wrapper {
      max-width: 580px;
      margin: 0 auto;
    }

    /* ── Logo bar ── */
    .logo-bar {
      text-align: center;
      padding-bottom: 28px;
    }

    .logo-inner {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    /* SVG stack icon — mirrors bi-layers-fill */
    .logo-icon {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .logo-text {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Card ── */
    .card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      overflow: hidden;
    }

    /* ── Card header ── */
    .card-header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      padding: 40px 40px 36px;
      text-align: center;
      position: relative;
    }

    /* subtle grid overlay */
    .card-header::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    .header-icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 50%;
      margin-bottom: 16px;
    }

    .header-icon-wrap svg {
      width: 28px;
      height: 28px;
      fill: #ffffff;
    }

    .card-header h1 {
      position: relative;
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.3px;
      margin: 0;
    }

    .card-header p {
      position: relative;
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      margin-top: 6px;
    }

    /* ── Card body ── */
    .card-body {
      padding: 36px 40px;
      background: #0d0d1f;
    }

    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #f1f5f9;
      margin-bottom: 12px;
    }

    .card-body p {
      font-size: 14px;
      line-height: 1.7;
      color: #94a3b8;
      margin-bottom: 0;
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 1px solid rgba(255,255,255,0.07);
      margin: 28px 0;
    }

    /* ── CTA button ── */
    .btn-wrap {
      text-align: center;
      margin: 28px 0;
    }

    .btn {
      display: inline-block;
      padding: 14px 40px;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.2px;
      /* box-shadow removed for email client compat — inline style handles it */
    }

    /* ── Expiry notice ── */
    .notice-box {
      background: rgba(245,158,11,0.1);
      border: 1px solid rgba(245,158,11,0.25);
      border-radius: 10px;
      padding: 14px 18px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .notice-icon {
      flex-shrink: 0;
      margin-top: 1px;
    }

    .notice-icon svg {
      width: 18px;
      height: 18px;
      fill: #f59e0b;
    }

    .notice-text {
      font-size: 13px;
      line-height: 1.6;
      color: #fbbf24;
    }

    .notice-text strong { color: #fde68a; }

    /* ── Fallback URL box ── */
    .url-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .url-box {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 12px 16px;
      word-break: break-all;
      font-size: 12px;
      color: #a78bfa;
      line-height: 1.6;
    }

    /* ── Footer ── */
    .card-footer {
      background: #080814;
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 20px 40px;
      text-align: center;
    }

    .card-footer p {
      font-size: 12px;
      color: #475569;
      line-height: 1.6;
    }

    .card-footer a {
      color: #7c3aed;
      text-decoration: none;
    }

    /* ── Below-card note ── */
    .below-card {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Logo -->
    <div class="logo-bar">
      <span class="logo-inner">
        <!-- bi-layers-fill equivalent in inline SVG -->
        <svg class="logo-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#7c3aed"/>
              <stop offset="100%" stop-color="#a855f7"/>
            </linearGradient>
          </defs>
          <path fill="url(#lg)" d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882z"/>
        </svg>
        <span class="logo-text">Postify</span>
      </span>
    </div>

    <!-- Card -->
    <div class="card">

      <!-- Header -->
      <div class="card-header">
        <div class="header-icon-wrap">
          <!-- bi-key-fill -->
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </div>
        <h1>Reset Your Password</h1>
        <p>Secure password reset for your Postify account</p>
      </div>

      <!-- Body -->
      <div class="card-body">
        <p class="greeting">Hi {{ $user->name }},</p>

        <hr class="divider">

        <p>We received a request to reset the password on your account. Click the button below to create a new password. This link is valid for a single use only.</p>

        <!-- CTA -->
        <div class="btn-wrap">
          <a href="{{ $resetUrl }}" class="btn">Reset My Password</a>
        </div>

        <!-- Expiry notice -->
        <div class="notice-box">
          <span class="notice-icon">
            <!-- bi-clock-fill -->
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
            </svg>
          </span>
          <span class="notice-text">
            This link will expire in <strong>60 minutes</strong>.
            If you didn't request a password reset, no action is needed — your account remains secure.
          </span>
        </div>

        <hr class="divider">

        <!-- Fallback URL -->
        <p class="url-label">Or copy this link into your browser</p>
        <div class="url-box">{{ $resetUrl }}</div>
      </div>

      <!-- Footer -->
      <div class="card-footer">
        <p>
          &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.<br>
          You're receiving this because a password reset was requested for your account.
        </p>
      </div>

    </div>

    <!-- Below card -->
    <p class="below-card">
      If you have trouble, contact support or visit your account settings.
    </p>

  </div>
</body>
</html>
