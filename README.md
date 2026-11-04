# IT Ready — visual Windows 11 self-check

An interactive, mobile-friendly employee troubleshooting guide. Follow illustrated Windows 11 steps, open test websites directly, tap results, and copy a structured report for IT.

## Features
- Eight guided checks: Windows uptime, restart, internet speed, public IP, general websites, Wi-Fi (Blue / Fiat), six websites on Blue only, and Windows app responsiveness.
- Direct test links where a browser can perform the check. Windows-only actions must be performed on the affected PC.
- Clear visual instructions, large touch buttons, auto-skip of Blue-only tests when not connected to Blue, and ability to mark tests unable to complete.
- Final report can be **copied**, **saved as text**, or **printed**. There is no email form, email destination, automatic upload, tracking script, or backend.
- Results remain in the browser's local storage until cleared.

## Important: private access before publishing
This repository is private, but a typical GitHub Pages website would still be public. Do **not** publish it as a publicly accessible site if only approved employees should be able to see it. Use an authenticated hosting service with a verified allowlist of employee email accounts, e.g. Cloudflare Pages with Cloudflare Access protecting the **production** URL, not just previews.

After deployment to Cloudflare Pages, the initial address would usually resemble `https://it-ready.pages.dev` if that project name is available. The final address is assigned during setup; this is not an active link yet.

## Source
- `index.html`: complete self-contained application with embedded illustrations
- `favicon.svg`, `manifest.webmanifest`: app icon and metadata

The visuals are Windows 11-style illustrations, **not actual screenshots**. Uptime, IP, internet speed, and Windows app behavior are not automatically measured: employees record their observed results. To measure a Windows PC, open the relevant links on that PC rather than on a phone.
