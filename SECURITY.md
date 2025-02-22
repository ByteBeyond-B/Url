# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
# Prevent XSS Attacks
Header set X-XSS-Protection "1; mode=block"

# Prevent Content Sniffing
Header set X-Content-Type-Options "nosniff"

# Enforce HTTPS
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Clickjacking Protection
Header set X-Frame-Options "DENY"

# Referrer Policy (Hides Referer Info)
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Content Security Policy (CSP)
Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://tinyurl.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; frame-ancestors 'none'; object-src 'none'; form-action 'self';"
