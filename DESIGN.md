# MGV Imóveis Design Standard

This file is the design contract for agents working on the MGV Imóveis site.

## Brand Position

MGV is a premium coastal real estate brand. The interface should feel consultative, trustworthy, quiet, and high-value. It should not feel like a generic marketplace, decorative landing page, or loud SaaS dashboard.

## Visual Language

- Primary palette: deep navy, off-white, graphite, restrained gold.
- Use gold as an accent for hierarchy, badges, dividers, and primary CTAs.
- Keep text contrast high. Avoid low-opacity text below readable contrast, especially in the footer and hero overlays.
- Use real property, coastal, neighborhood, or lifestyle imagery. Avoid blank gradient placeholders for final surfaces.
- Cards should use modest radius, clear image hierarchy, and predictable spacing.
- Avoid decorative blobs, excessive gradients, and purely atmospheric imagery when users need to inspect properties.

## Layout Rules

- Home first viewport must communicate brand, region, and property search immediately.
- Listing pages should prioritize search/filter ergonomics and comparison.
- Detail pages should prioritize gallery, price, specs, description, consultant contact, and related properties.
- Footer must preserve trust signals: CRECI, address, phone, email, social links, privacy, terms.

## Component Standards

### Header

- Desktop: logo, core nav, contact CTA, solid state after scroll.
- Mobile: hamburger opens a full navigation panel with links and WhatsApp CTA.
- Header must never overlap primary text or hide content on initial load.

### Property Card

Each card should include:

- image
- badge when applicable
- price
- title
- location
- beds/baths/area when applicable
- property type
- detail CTA
- WhatsApp/contact CTA

### Search and Filters

- Home: simple search for location, type, and max price.
- Listings: visible filters, result count, clear empty state, clear filters action.
- Query-string filters must initialize the UI and result count correctly.

### Blog

- Blog index cards must link to real pages.
- Article pages need title, category, date, read time, content, CTA, and related articles.

## Responsive Rules

- Mobile pages use a single-column reading and listing flow.
- Buttons must remain thumb-friendly and text must not clip.
- Avoid fixed overlays that block primary actions.
- Images should crop intentionally with `object-fit: cover`.

## Accessibility and QA

- Use semantic links/buttons for navigation and actions.
- Preserve accessible labels on icon-only controls.
- Forms need visible labels and focus states.
- Validate with `npm run build`.
- Inspect desktop and mobile screenshots before final delivery.
- Run `npm audit --audit-level=moderate` before release.

## Performance Rules

- Keep image-heavy pages static and simple.
- Prefer optimized remote image URLs or local optimized assets.
- Avoid adding heavy client-side libraries for behavior that can be handled by Astro/vanilla JS.
- Do not add third-party scripts unless they are required for the business goal.

## References

- Google Material Design cards and search patterns: https://m1.material.io/components/cards.html and https://m1.material.io/patterns/search.html
- Google Core Web Vitals/Search UX considerations: https://web.dev/vitals/
- Real estate UX research should emphasize prominent search, filter clarity, scannable cards, and mobile inquiry flows.
