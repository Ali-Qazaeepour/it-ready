# IT Ready — Windows 11 Pre-Support Checklist

A visual, mobile-friendly troubleshooting checklist for employees to complete before calling IT.

## Checks, in order

1. Check uptime in Task Manager → Performance → CPU.
2. Restart **only if uptime is several days** (the app skips the restart step otherwise).
3. Check the connected Wi-Fi name: Blue / Fiat / other.
4. Check VPN status without changing it.
5. Test **all six international websites** in Chrome: YouTube, Facebook, Gmail, Telegram Web, WhatsApp Web and OpenAI.
6. Test **all three Iranian websites** in Chrome, regardless of international-site results: Digikala, Divar and Varzesh3.
7. Run Speedtest; record ping, download and upload.
8. Check public IP via a direct IP lookup link.
9. Open CMD and run `ipconfig /all`; look for DNS Servers (no changes).
10. Run `ping 8.8.8.8`; note reply or timeout.
11. Run `nslookup google.com`; note addresses or DNS error.
12. **Copy Report**; the app does not send email or upload anything.

The only external hyperlinks in the app open websites that employees are explicitly asked to test: the international and Iranian sites, Speedtest, and public-IP lookup. Windows command buttons copy exact commands. Brand marks are included for YouTube, Facebook, Telegram, WhatsApp, Google, and Chrome. Some website icons require internet.

## Screenshot policy

Relevant **real screenshot references** now display inline (not as clickable source links) and require an internet connection to load. If an external image host blocks access, the guide shows a non-interactive fallback instead of fabricating a screenshot. The actual image files have not been bundled, so this is not yet a reliable offline screenshot experience. Users' Windows version, network names and results may differ from the reference.

## Private access

The repository is private, and the site is **not published**. A private GitHub repository does NOT mean a published GitHub Pages site is employee-only. Configure **authenticated hosting** with an approved-employee allowlist before sharing any production website link. The final URL will depend on the chosen platform and domain setup.

## Technical notes

- Static `index.html` (no server needed to run the file locally).
- Responses are saved in browser local storage, not transmitted to IT.
- The user must explicitly copy/paste or save the report.
- The site links open separately; employees should run Windows checks on the *affected computer*, not their phone.
- Do not ask employees to change DNS settings, reset adapters, or run administrative commands.
