# IT Ready — Employee Windows 11 self-check

A visual, mobile-friendly troubleshooting assistant for employees. Follow illustrated Windows 11 steps, record results, and prepare a detailed email for IT.

## What it does

- Guides employees through eight checks (uptime, restart, speed test, public IP, website access, Blue/Fiat Wi-Fi, six Blue-only sites, and Windows application performance).
- Tracks completed steps, with an **Unable to test** option.
- Gives tentative guidance on whether a problem looks computer-, network-, or website-related.
- Creates an IT report with optional employee, department, computer, and problem details.
- **Prepare email to IT** opens the employee's email application with a drafted report addressed to `ali.qazaeepour@gmail.com`; the employee must press Send.
- Copy, save, or print the report; answers remain in the device's browser local storage until cleared.

## Employee access — PRIVATE BY DESIGN

**Do not publish via GitHub Pages without proper access control.** A private GitHub repository protects the source code, but GitHub Pages published from an individual account is not an employee-only website. Private GitHub Pages access control requires a qualifying GitHub Enterprise Cloud organization.

To let **only invited employees** use a normal website link, deploy this site from this private repository to a platform with **server-side sign-in restrictions** (for example, Cloudflare Pages protected by Cloudflare Zero Trust Access). Configure an **Allow policy listing approved employee emails**, require email verification, and test with one invited and one uninvited email **before sharing the link**. The default Cloudflare Pages preview access policy alone does **not** protect the production pages.dev URL; the production URL must be covered too. See Cloudflare's official documentation: https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain

Until an access policy is configured and verified, leave the website unpublished.

## Files

- `index.html`: complete self-contained UI, interactive steps and all inline illustrations
- `favicon.svg`, `manifest.webmanifest`: icon and install metadata

No backend, database, tracking scripts, or automatic network collection. The site must not be treated as securely restricted until the hosting authentication policy is active.

## Updating the IT email

In `index.html`, replace `itEmail:'ali.qazaeepour@gmail.com'` with the chosen IT address. Users can also edit the recipient on the report screen.

## Notes

Illustrations are **original Windows-style drawings, not genuine Windows screenshots**. The app does not automatically measure internet speed, IP, or uptime. The employee enters results manually. A configured mail application is needed for the mailto link. For a webmail workflow, employees can copy the report.

For security incidents, skip the checklist and contact IT directly.
