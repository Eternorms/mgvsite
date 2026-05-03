# AGENTS.md

Guidance for Codex agents working in this repository.

## Project

- Path: `/Users/admin/mgvsite`
- Stack: Astro 6, Tailwind CSS via PostCSS, React 19, TypeScript
- Branch: `master`
- Primary commands:
  - `npm install`
  - `npm run dev`
  - `npm run build`
  - `npm audit --audit-level=moderate`

## Required Local Standards

- Read `DESIGN.md` before visual/design changes.
- Read `README.md` before changing setup, scripts, or content structure.
- Keep the site static, fast, responsive, and visually consistent.
- Preserve MGV's premium coastal real estate positioning.
- Do not reintroduce placeholder-only property visuals on public pages.

## Skills To Use

- `qa-audit`: before delivery or when asked to verify the site.
- `code-review`: when reviewing diffs, commits, or PR-like changes.
- `real-estate-design-improvement`: for real estate UX, visual polish, image generation, and design JSON extraction.
- `tech-debt-audit`: for architecture, dependency, and maintainability cleanup.
- `google-design-patterns`: when updating `DESIGN.md` from current web/Google design references.

## Verification Checklist

Before final delivery:

1. Run `npm run build`.
2. Run `npm audit --audit-level=moderate`.
3. Inspect `/`, `/imoveis`, one `/imoveis/[slug]`, `/blog`, one `/blog/[slug]`, `/sobre`, and `/contato`.
4. Check mobile and desktop layouts.
5. Confirm no broken internal links were introduced.
6. Commit locally when requested. Ask before push unless the user explicitly requests push.

## Git Notes

- Do not revert user changes.
- Prefer scoped commits with clear messages.
- Current known GitHub limitation from prior push attempt: account `CitadelAgency` received HTTP 403 for `Eternorms/mgvsite`. Confirm permissions before retrying push.
