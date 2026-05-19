# Landing Page — Style Guide

Documents the visual design system implemented across the homepage components:
`Hero/Section.vue`, `Home/Platforms.vue`, `Home/Tools.vue`, `Home/News.vue`,
`Home/Collection.vue`, `Generic/ArticleCard.vue`, `Generic/MainSearch.vue`,
`Generic/Search.vue`.

---

## Design Theme

The landing page uses a **dark editorial hero + clean light body** contrast strategy:

- **Hero** — near-black background with layered overlays, gold (`#F9B129`) as the sole accent color, glassmorphism on the search widget, serif display font
- **Body sections** — white or off-white (`#fafafa`, `#f5f5f7`) backgrounds, dark card text, gold reappears only as hover state / CTA accent
- **Interaction language** — cards lift on hover (`translateY(-4px)` to `-6px`), borders appear or turn gold, arrow icons slide right

---

## Color Tokens

| Token          | Value                   | Usage                                         |
| -------------- | ----------------------- | --------------------------------------------- |
| `#F9B129`      | Brand gold (≈ `unpad`)  | Title gradient, active tabs, CTAs, icon fills |
| `#FFA100`      | Deep gold (≈ `kandaga`) | Gradient endpoint in title / tool icon strip  |
| `#FFD060`      | Light gold              | Gradient midpoint in `.tool-icon-strip`       |
| `#FFE08A`      | Pale gold               | Gradient midpoint in `.hero-title`            |
| `#1A0F00`      | Warm near-black         | Text on gold backgrounds (buttons, strip)     |
| `#1A1A2E`      | Cool near-black (navy)  | "See more" buttons; `extra-card` hover fill   |
| `#1A1A1A`      | Neutral near-black      | Section headings, card titles                 |
| `rgba(6,6,18)` | Deep dark blue-black    | Hero overlay color stops                      |

---

## Typography

### Hero title

```css
font-family: "Cormorant Garamond", Georgia, serif;
font-size: clamp(4.5rem, 14vw, 11rem);
font-weight: 900;
letter-spacing: -0.02em;
line-height: 1;
background: linear-gradient(135deg, #f9b129 0%, #ffe08a 40%, #f9b129 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
filter: drop-shadow(0 0 48px rgba(249, 177, 41, 0.45));
```

### Section headings (body)

```css
font-size: clamp(1.75rem, 4vw, 2.5rem);
font-weight: 800;
color: #1a1a1a;
```

### Card titles

```css
font-size: 1rem–1.1rem;
font-weight: 700;
color: #1a1a1a;
```

### Body / descriptor text

```css
font-size: 0.75rem–0.875rem;
color: #888 or rgba(255, 255, 255, 0.48); /* hero context */
line-height: 1.6–1.7;
```

### Section badge label (universal)

```css
display: inline-flex;
align-items: center;
gap: 0.5rem;
font-size: 0.7rem;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
color: #f9b129;
background: rgba(249, 177, 41, 0.1);
padding: 0.4rem 1rem;
border-radius: 9999px;
margin-bottom: 0.75rem–1rem;
```

Used identically in every body section as the eyebrow label above the section title.

---

## Animations

### `fadeUp` keyframe

Defined in `Hero/Section.vue`, used on every child of `.hero-content` with staggered `animation-delay`.

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

| Element             | Delay |
| ------------------- | ----- |
| `.hero-content`     | 0s    |
| `.hero-badge`       | 0.10s |
| `.hero-greeting`    | 0.15s |
| `.hero-title`       | 0.20s |
| `.hero-tagline`     | 0.25s |
| `.hero-search-wrap` | 0.35s |
| `.hero-stats`       | 0.45s |

All use `animation: fadeUp 0.8s <delay> ease-out both`.

### Card hover lift

```css
transition:
  transform 0.25s–0.3s ease,
  box-shadow 0.25s–0.3s ease,
  border-color 0.25s ease;
/* hover */
transform: translateY(-4px); /* platform / article cards */
transform: translateY(-6px); /* tool cards */
box-shadow: 0 12px 40px rgba(249, 177, 41, 0.18–0.20);
border-color: #f9b129;
```

### Image zoom on hover

```css
.img {
  transition: transform 0.5s ease;
}
.card:hover .img {
  transform: scale(1.05–1.06);
}
```

Used in `.article-img` and `.collection-img`.

### Search tab transition (`slide-up`)

```css
.slide-up-enter-active {
  transition:
    opacity 0.18s ease-out,
    transform 0.18s ease-out;
  transition-delay: 0.05s;
}
.slide-up-leave-active {
  transition:
    opacity 0.12s ease-in,
    transform 0.12s ease-in;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
```

---

## Hero Section (`Hero/Section.vue`)

### Background layering

```
z-0  .hero-bg        — background-image, scale(1.06)
z-1  .hero-overlay   — linear-gradient 160deg dark overlay
z-1  .hero-glow-tl   — radial gold glow, top-left, 40rem circle, opacity 0.2
z-1  .hero-glow-br   — radial gold glow, bottom-right, 32rem circle, opacity 0.12
z-10 .hero-content   — main content column (raises above news-strip at z-2)
z-2  .news-strip     — gold ticker strip, bottom of flex column
```

The whole section is `min-height: 95vh`, `display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden`.

### `.hero-content`

```css
position: relative;
z-index: 10;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: 100%;
max-width: 56rem;
padding: 6rem 1.5rem;
```

### `.hero-search-wrap`

```css
width: 100%;
max-width: 42rem;
position: relative;
z-index: 20; /* above hero-stats siblings */
```

### Hero stats row

Four statistics separated by 1px hairline dividers. On ≤480px the dividers hide.

```css
.stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #f9b129;
}
.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.38);
}
.stat-sep {
  width: 1px;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.12);
}
```

### CTA buttons

```css
/* Primary — gold pill */
.cta-primary {
  background: #f9b129;
  color: #1a0f00;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
}
.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(249, 177, 41, 0.45);
}

/* Secondary — ghost glass pill */
.cta-secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(8px);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
}
.cta-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}
```

### News ticker strip

```css
background: rgba(249, 177, 41, 0.95);
backdrop-filter: blur(10px);
padding: 0.875rem 1.5rem;
color: #1a0f00;
```

---

## Search Widget (`Generic/MainSearch.vue` + `Generic/Search.vue`)

### Glassmorphism container

```css
.search-container {
  position: relative;
  z-index: 50;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
}
```

`z-index: 50` is critical — it promotes the container above sibling CTA buttons within `.hero-search-wrap`.

### Tab pills

```css
/* Active */
background: rgba(249, 177, 41, 0.92);
color: #1a0f00;
/* Inactive */
background: transparent;
color: rgba(255, 255, 255, 0.5);
/* Inactive hover */
background: rgba(255, 255, 255, 0.1);
color: rgba(255, 255, 255, 0.85);
```

Tab bar has `overflow-x: auto; scrollbar-width: none` for mobile scrollability.

### Input overrides (`:deep()`)

```css
:deep(.input-form) {
  background: rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: white;
}
:deep(.input-form::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}
:deep(.input-form:focus) {
  background: rgba(255, 255, 255, 0.15);
  border-color: #f9b129;
  box-shadow: 0 0 0 3px rgba(249, 177, 41, 0.18);
}
:deep(button[type="submit"]) {
  background: #f9b129;
  color: #1a0f00;
  font-weight: 700;
}
```

### Dropdown positioning (`Generic/Search.vue`)

```css
.search-result {
  position: absolute;
  width: 100%;
  top: 3.75rem;
  left: 0;
  z-index: 50;
  margin-top: 0.25rem;
}
.content-result {
  background: rgba(14, 12, 6, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(249, 177, 41, 0.2);
  color: rgba(255, 255, 255, 0.85);
  border-radius: 0.75rem;
  max-height: 18.75rem;
  overflow-y: auto;
}
```

### Stacking context chain (hero)

```
.hero-wrap            position: relative (no z-index → no stacking ctx)
  .hero-content       position: relative; z-index: 10  → stacking ctx
    .hero-search-wrap position: relative; z-index: 20  → stacking ctx
      .search-container (backdrop-filter + z-index: 50) → stacking ctx
        .search-result  position: absolute; z-index: 50  ← visible above all
  .news-strip         position: relative; z-index: 2   ← below hero-content
```

---

## Platforms Section (`Home/Platforms.vue`)

### Section wrapper

`background: #fafafa` with a background image texture at `opacity: 0.04`. `padding: 5rem 0`.

### Platform card

```css
.platform-card {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.platform-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(249, 177, 41, 0.18);
  border-color: #f9b129;
}
```

Icon background transitions from gold-tint to solid gold on hover:

```css
.platform-icon-bg {
  background: rgba(249, 177, 41, 0.1);
  color: #f9b129;
}
.platform-card:hover .platform-icon-bg {
  background: #f9b129;
  color: white;
}
```

Absolute arrow indicator in top-right slides 3px right on hover.

### Secondary (extra) cards

```css
.extra-card {
  background: white;
  border: 1.5px solid #ebebeb;
  border-radius: 0.875rem;
}
.extra-card:hover {
  background: #1a1a2e;
  color: white;
  border-color: #1a1a2e;
  transform: translateY(-2px);
}
```

### Admin banner

```css
.admin-banner {
  background: #1a1a2e;
  color: white;
  border-radius: 1.25rem;
  padding: 1.25rem 1.5rem;
}
.admin-banner:hover {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}
```

---

## Tools Section (`Home/Tools.vue`)

Constrained to `max-w-7xl`, `py-16`. Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.

### Tool card

```css
.tool-card {
  background: white;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
}
.tool-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(249, 177, 41, 0.2);
  border-color: #f9b129;
}
```

### Icon strip (header band)

```css
.tool-icon-strip {
  background: linear-gradient(135deg, #f9b129 0%, #ffd060 100%);
  color: #1a0f00;
  height: 4rem;
}
```

### CTA label

```css
.tool-cta {
  color: #f9b129;
  font-size: 0.75rem;
  font-weight: 700;
  gap: 0.25rem;
}
.tool-card:hover .tool-cta {
  gap: 0.4rem;
} /* subtle arrow slide */
```

---

## Collection Grid (`Home/Collection.vue`)

`background: #f5f5f7`, `padding: 4rem 0 5rem`. Grid: `grid-cols-1 sm:grid-cols-2`.

### Cards with image overlays

Each card is `position: relative; height: 16rem (sm: 18rem); border-radius: 1.125rem; overflow: hidden`.

Four overlay variants using distinct tint colors:

| Variant | Tint base                                    |
| ------- | -------------------------------------------- |
| `-1`    | Warm gold — `rgba(249,177,41,0.12)` midpoint |
| `-2`    | Cool blue — `rgba(10,40,80,0.1)` midpoint    |
| `-3`    | Deep red — `rgba(60,10,10,0.1)` midpoint     |
| `-4`    | Forest green — `rgba(10,50,10,0.1)` midpoint |

On hover, all variants collapse to a unified warm gold gradient:

```css
background: linear-gradient(
  160deg,
  rgba(249, 177, 41, 0.35) 0%,
  rgba(8, 6, 2, 0.88) 100%
);
```

### Reveal CTA label

The "Jelajahi →" label is hidden by default and reveals on card hover:

```css
.collection-cta-label {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.collection-card:hover .collection-cta-label {
  opacity: 1;
  transform: translateY(0);
}
```

---

## News Section (`Home/News.vue`)

`max-w-7xl`, `py-16`. Grid: `grid-cols-1 md:grid-cols-3 gap-6`.

### "See more" button (universal pattern)

Used in News, Collection, Tools:

```css
background: #1a1a2e;
color: white;
font-weight: 600;
padding: 0.625rem 1.75rem;
border-radius: 9999px;
/* hover */
background: #f9b129;
color: #1a0f00;
transform: translateY(-2px);
```

---

## Article Card (`Generic/ArticleCard.vue`)

```css
.article-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  border-color: #f5f5f5;
}
```

- Image area: `height: 12rem`, image zooms to `scale(1.05)` on hover
- Title: 2-line clamp, `color: #1a1a1a`, turns `#f9b129` on hover
- Excerpt: 3-line clamp, `color: #888`, `font-size: 0.8rem`
- Footer: separated by `border-top: 1px solid #f0f0f0`; date in italic gray, "Baca selengkapnya →" in gold

---

## Reusable Patterns Summary

### Section header block

Every body section uses an identical 3-part header:

```html
<div class="section-badge">
  <div class="i-mdi-[icon] w-3.5 h-3.5" />
  Eyebrow Label
</div>
<h2 class="section-title">Main Heading</h2>
<p class="text-gray-500 text-sm sm:text-base">Supporting description</p>
```

### Gold accent pill (reused badge CSS)

```css
display: inline-flex;
align-items: center;
gap: 0.5rem;
font-size: 0.7rem;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
color: #f9b129;
background: rgba(249, 177, 41, 0.1);
padding: 0.4rem 1rem;
border-radius: 9999px;
```

### Line-clamp text

```css
display: -webkit-box;
-webkit-line-clamp: 2; /* or 3 */
-webkit-box-orient: vertical;
overflow: hidden;
```

Used on card titles (2 lines) and excerpts/descriptions (3 lines) throughout.

### Arrow CTA micro-animation

```css
.cta {
  gap: 0.25rem;
  transition: gap 0.2s ease;
}
.card:hover .cta {
  gap: 0.4rem;
}
```

Applied to tool CTAs and "read more" links — the arrow slides right without moving text.
