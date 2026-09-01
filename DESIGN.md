# Design

The visual system for michaelbonner.dev. `src/app.css` is the implementation;
this file is the reasoning, so a future change can either follow it or knowingly
depart from it.

## Register

Brand. The site is a personal portfolio: the design _is_ the product, and a
visitor's impression is the thing being made. It is not an app UI.

Voice, from `PRODUCT.md`: personal, practical, opinionated. It should read like a
recommendation from someone who has actually done the work, not like agency
marketing.

## Theme

**Light only.** The scene: someone who just got Michael's name from a friend,
opening the site on a laptop mid-afternoon to decide whether he's worth emailing.
Daylight, skim-reading, deciding. That forces light.

`color-scheme` is pinned to `light` and there are no `dark:` variants. A page
must not define a color only inside a media query.

## Color

Strategy: **restrained, with one committed accent.** Tinted neutrals carry the
surface; copper appears at full strength on links, active nav, eyebrows, and
focus rings.

Restrained rather than drenched for one specific reason: the homepage carries
40+ real project screenshots, all with their own palettes. Those are the content.
A saturated ground would fight every one of them, so the page stays calm and lets
the work be the loudest thing on it.

**Why copper, and not blue.** "Developer portfolio" reflexively means blue, which
is exactly why it isn't. Copper is local and specific: the Wasatch at golden
hour, and Kennecott, the open-pit copper mine in the valley Michael lives in. It
also reads warm and human rather than cold and corporate, which matches the
voice.

Every neutral is tinted toward the copper hue (hue 55–70 at chroma 0.005–0.012),
so the greys and the accent read as one family instead of a grey page with an
orange sticker on it. There is no `#fff` or `#000` anywhere.

| Token                      | Role                                                     |
| -------------------------- | -------------------------------------------------------- |
| `--ground`                 | Page background                                          |
| `--ground-sunken`          | Recessed areas: footer, gallery wells, code blocks       |
| `--surface`                | Raised panels: cards, form, filter bar                   |
| `--ink`                    | Primary text                                             |
| `--ink-muted`              | Body copy, secondary text                                |
| `--ink-faint`              | Small labels and metadata. **The floor for small text.** |
| `--rule` / `--rule-strong` | Hairlines and stronger dividers                          |
| `--accent`                 | Copper, contrast-checked for text                        |
| `--accent-bright`          | Copper for fills, underlines, focus rings                |
| `--accent-soft`            | Tint background for active rows and badges               |

### Accessibility

Every text color must clear WCAG AA: 4.5:1, or 3:1 for large text. This is a
hard constraint from `PRODUCT.md`, not an aspiration.

`--ink-faint` is set at the _darkest_ value the system needs, solved against the
darkest background it appears on (`--ground-sunken` and `--accent-soft`, not just
`--ground`). Anything lighter fails on 13px labels. It was originally too light
and broke AA in 114 places across the site; that is the failure mode to watch
for when adding a new grey.

Syntax highlighting has its own tokens (`--code-*`). `github.css` ships colors
tuned for a pure white page, and several fall under 4.5:1 on the warmer sunken
surface, so every token class is re-pointed at checked values.

Map pins separate on lightness as well as hue, so they hold up in greyscale, and
each pin prints its own rating. Nothing depends on color alone.

## Typography

Two families, each with a job. Mixing them inside one paragraph is the mistake;
giving each a role is the point.

- **Newsreader** — display type and long-form prose. Already the site's voice,
  and genuinely good at reading sizes. Kept deliberately.
- **Public Sans** — interface chrome: nav, buttons, form labels, table headers,
  metadata, filters, breadcrumbs.

Before this pass, Newsreader set _everything_, including form labels and table
headers. Serif UI chrome was the single largest thing making the site read dated.
Public Sans is a plainspoken government-issue workhorse, which suits "practical
and opinionated" better than a fashionable geometric sans.

Scale is fluid via `clamp()`, with at least a 1.25 ratio between steps at both
ends, so hierarchy never flattens on small screens. Body measure is capped at
65–75ch.

## Layout

- Sections share one shape: hairline rule, eyebrow, heading, optional count,
  content (`Section.svelte`). The rules are what give long pages rhythm; the old
  version separated sections with nothing but a large top margin.
- The header is sticky with a hairline under it. Previously the wordmark and nav
  floated on the same undifferentiated field as the content.
- **The sticky header has consequences.** Its height lives in `--header-height`
  (taller below `sm`, where the row wraps). Anything that must clear it reads
  that token: `html` sets `scroll-padding-top` from it so in-page anchors like
  `/#projects` do not land under the header, and the restaurants map offsets its
  own `xl:sticky` position from it. Do not hard-code an offset.
- **Only one sticky layer may compete with the header.** The map is given
  `isolate` so its `z-500` legend and Leaflet's high-z popup panes stay in their
  own stacking context instead of painting over the header. Any future
  high-`z-index` island needs the same treatment.
- Asymmetric where it helps: the hero gives the sentence the wide column and the
  photo the narrow one, with a facts list filling what used to be a tall empty
  gap.
- Cards are used where a screenshot is the reason to stop (projects, blog index)
  and avoided elsewhere. Three card grids in a row would flatten the homepage
  into one texture, so the archive and writing lists are ruled lists instead.
- **The project grids have no panel.** Every screenshot already carries its own
  browser chrome, so a bordered, shadowed, rounded card framed a frame, and the
  repeated furniture read louder than the work inside it. `ProjectCard` now sets
  the screenshot directly on the ground behind a hairline, with the type as a
  quiet caption underneath. The hairline and the sunken well behind it stay:
  these screenshots are mostly near-white at the edges and would otherwise bleed
  into the page with no telling where the image stops. The blog index still uses
  `surfaceInteractive`, and is the obvious next thing to bring across.
- Client work runs two to a row; side projects run four, clamp their teaser to
  three lines, and show two rows behind a "Show all" toggle. The density is the
  point: a paying client keeps the wide card you stop on, weekend projects read
  as a contact sheet you scan. The toggle hides cards with CSS rather than
  removing them, so the section stays crawlable, and it pins its own button in
  place on collapse so the reader is not dumped near the footer.
- Nothing may scroll the page horizontally. Wide content (tables, code, the
  Turnstile widget) scrolls inside its own container.

## Motion

Short, ease-out, and never on a layout property.

- `--ease-out-quart` is the curve. No bounce, no elastic.
- Hover states on text, links, and interactive chrome change color, border,
  shadow, or `translate` only. Never `scale` or `rotate` on anything containing
  text: that is what blurred type mid-transition in the old design.
- A card may scale its **image** slightly (`group-hover:scale-[1.02]`) inside an
  `overflow-hidden` container. The image carries no text and the parent clips it,
  so nothing blurs and nothing reflows.
- The nav underline animates a `scaleX` transform on a positioned
  pseudo-element, not `width`, so hovering never relayouts the nav.
- `prefers-reduced-motion: reduce` is honored globally.

**Removed on purpose:** `hover:scale-105 hover:rotate-1` was on nearly every link
and card, text included. It tilted and blurred type mid-transition, shifted
layout, and was the most dated thing on the site. Do not reintroduce it.

## Links

- **In running text:** real underline, 1px, 3px offset, copper at 40% that
  saturates on hover. Replaces a 2px bottom border that stacked heavy rules under
  every phrase in a paragraph.
- **Nav and footer:** no rule at rest, copper underline wipes in on hover, and
  stays put for the current section via `aria-current="page"`.
- **Titles in a link list:** quiet at rest, underline on hover. An underline
  beneath every serif title turns a list into stripes.

## Bans

- No `dark:` variants, and no `dark:prose-invert`.
- No raw palette utilities (`bg-gray-200`, `text-blue-800`). Use the tokens.
- No `hover:scale-*` / `hover:rotate-*` on text or interactive chrome. A
  contained image scale inside `overflow-hidden` is the one exception.
- No gradient text, no glassmorphism as decoration, no colored side-stripe
  borders, no nested cards.
- No em dashes in copy.
