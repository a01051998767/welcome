# Wedding invitation — editing instructions

- The sole main page is `index.html`. Legacy DC files and the generated handoff ZIP were removed at the user’s request. Do not recreate them. The user will zip this final project folder.
- Vanilla HTML/CSS/JavaScript only. Do not introduce DC markup, support.js, React, package managers or build tooling.
- Companion styles and behavior are in `assets/invitation.css` and `assets/invitation.js`. All runtime assets use relative paths.
- Preserve the green/cream design, supplied portraits, traditional patterns, and unspecified Korean copy.
- Update the `EN` dictionary whenever Korean copy changes. Keep lyrics in their original Korean even in English mode.
- Keep CONFIG values centralized. Never reuse the reference homecoming RSVP endpoint or Kakao app credentials.
- RSVP requires name and exactly one of groom/bride. Phone is optional. Vegan/parts 1–3 are independent booleans; all parts may be unchecked.
- Never claim submission success without a valid server receipt. Preserve error feedback, double-click guard, retry request ID, server validation and locking.
- Do not invent accounts, gallery photos, venue accessibility, parking arrangements or deployed URLs.
- Use rem for scalable text; preserve 100%/125%/150% controls, accessible names, modal focus return and Escape handling.
- If names/dates change, update text, translations, OG metadata and the rendered sharing card together.
- Read readme.md for setup and handoff. Check JavaScript syntax and applicable RSVP tests; inspect mobile layout after functional/layout changes.
