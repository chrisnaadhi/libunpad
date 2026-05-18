# Kandaga — Style & Brand Guide

Based on the current implementation in `pages/keanggotaan/index.vue` and `pages/koleksi/repository/`.

---

## Colors

Defined in `unocss.config.ts` as custom theme colors:

| Token     | Hex       | Usage                                            |
| --------- | --------- | ------------------------------------------------ |
| `unpad`   | `#F9B129` | Primary brand — buttons, accents, icons, borders |
| `kandaga` | `#FFA100` | Secondary brand — gradient endpoints, highlights |

These are used alongside UnoCSS's built-in gray scale (`gray-1` through `gray-8`) and standard color palette (`green-*`, `red-*`, `blue-*`, `yellow-*`).

### Common color patterns

```
bg-gradient-to-br from-unpad to-kandaga   → hero banners, faculty cards
bg-unpad text-white                        → primary CTA buttons
bg-unpad/10 text-unpad border-unpad/20    → soft tinted labels/badges
text-unpad                                 → links, icons, accents
border-unpad                               → focus borders, active states
```

---

## Typography

### Font weights

- `font-600` — body emphasis, button labels
- `font-700` — headings, card titles, section labels
- `font-800` — hero headings, large numbers

### Text sizes (page hierarchy)

- `text-4xl sm:text-5xl font-800` — hero page titles
- `text-2xl sm:text-3xl font-800` — section/profile headings
- `text-xl font-700` — card section titles, dialog headings
- `text-base font-700` — card header labels
- `text-sm font-600` — body emphasis, table labels
- `text-sm` — default body text
- `text-xs` — metadata, badges, helper text

### Text color scale

- `text-gray-8` — primary body text (headings, key info)
- `text-gray-7` — secondary headings
- `text-gray-6` — supporting labels, descriptions
- `text-gray-5` — muted text, placeholder text
- `text-gray-4` — disabled text, italic notes
- `text-gray-3` — empty state icons

### Special text styles

```
uppercase tracking-widest text-xs text-white/70   → section label above hero heading
leading-tight                                       → hero/card headings
leading-relaxed                                     → body paragraphs
leading-snug                                        → multi-line card titles
```

---

## Layout & Spacing

### Page containers

```
max-w-7xl ma px-4     → wide content (repository listing)
max-w-5xl ma px-4     → standard content (keanggotaan)
max-w-3xl ma px-4     → narrow/search content
max-w-md ma           → small centered panels (error/logged-out states)
```

`ma` = `margin: auto` (UnoCSS shorthand)

### Section padding

- Hero: `pt-14 pb-24` (extra bottom padding for floating card overlap)
- Page body: `py-8`
- Card header: `px-5 sm:px-6 py-4`
- Card body: `p-5 sm:p-6`

### Gaps

- Between sections: `gap-6`
- Between cards/grid items: `gap-3` or `gap-4`
- Between inline elements: `gap-1.5` or `gap-2`
- Between chips/tags: `gap-1.5`

---

## Border Radius

| Class          | Usage                                           |
| -------------- | ----------------------------------------------- |
| `rounded`      | small elements — buttons (`.btn` default), tags |
| `rounded-lg`   | small cards, code blocks                        |
| `rounded-xl`   | medium cards, inputs, info boxes                |
| `rounded-2xl`  | major cards, modal/overlay panels, search bars  |
| `rounded-full` | badges, chips, pills, avatar images             |

---

## Shadows

| Class       | Usage                                    |
| ----------- | ---------------------------------------- |
| `shadow-sm` | content cards (section-card)             |
| `shadow-md` | modals, dropdowns, logged-out panels     |
| `shadow-lg` | floating elements (search bar over hero) |

---

## Component Patterns

### Hero Banner

Used on: repository index, faculty page, keanggotaan profile area.

```html
<div class="bg-gradient-to-br from-unpad to-kandaga">
  <div class="max-w-7xl ma px-4 pt-14 pb-24 text-center">
    <!-- optional: large MDI icon -->
    <div class="i-mdi-[icon] w-16 h-16 text-white/80 ma mb-4" />
    <h1 class="text-white text-4xl sm:text-5xl font-800 m-0 mb-3 leading-tight">
      Page Title
    </h1>
    <p class="text-white/85 text-base sm:text-lg max-w-2xl ma mt-2 mb-0">
      Subtitle description text
    </p>
  </div>
</div>
```

### Floating Card (overlapping hero)

Always placed directly after the hero banner, creates a "floating on top" effect.

```html
<div class="max-w-3xl ma px-4 -mt-8 relative z-10 mb-8">
  <div class="bg-white rounded-2xl shadow-lg p-4">
    <!-- search bar or status content -->
  </div>
</div>
```

### Section Card (keanggotaan-style)

```html
<div
  class="bg-white rounded-2xl shadow-sm border border-gray-2 overflow-hidden"
>
  <!-- Card Header -->
  <div
    class="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-1 bg-gray-50"
  >
    <div class="i-mdi-[icon] w-5 h-5 text-unpad shrink-0" />
    <h2 class="text-base font-700 text-gray-8 m-0">Section Title</h2>
    <!-- optional: badge or action button on right -->
    <span class="ml-auto ...">badge</span>
  </div>
  <!-- Card Body -->
  <div class="p-5 sm:p-6">...</div>
</div>
```

### Info Row (definition list style)

Used in data grids for key/value pairs.

```html
<dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
  <div class="flex flex-col gap-0.5">
    <dt class="text-xs text-gray-4 uppercase tracking-wide">Label</dt>
    <dd class="text-sm font-600 text-gray-8">Value</dd>
  </div>
</dl>
```

### Info Box (notice/alert strip)

```html
<div
  class="flex items-start gap-2.5 bg-gray-50 border border-gray-2 rounded-xl px-4 py-3"
>
  <div class="i-mdi-[icon] w-4 h-4 shrink-0 text-[color] mt-0.5" />
  <p class="text-sm">Content</p>
</div>
```

Variants: `bg-blue-50 border-blue-2`, `bg-yellow-50 border-yellow-2`

### Empty State

```html
<div class="flex flex-col items-center py-10 px-6 text-center">
  <div class="i-mdi-[icon] w-10 h-10 text-gray-3 ma mb-3" />
  <p class="text-gray-4 italic">Belum ada data.</p>
  <!-- optional CTA -->
  <NuxtLink to="..." class="btn bg-unpad text-white mt-3 text-sm py-1.5 px-5">
    Ajukan Sekarang
  </NuxtLink>
</div>
```

### Collection Grid

```html
<!-- Repository cards grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">...</div>

<!-- Faculty browse grid -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">...</div>

<!-- Turnitin/room booking grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">...</div>
```

---

## Buttons

The `.btn` shortcut is defined in `unocss.config.ts`:

```
btn → px-4 py-2 rounded no-underline
```

### Variants

| Variant           | Classes                                                               |
| ----------------- | --------------------------------------------------------------------- |
| Primary           | `btn bg-unpad text-white hover:opacity-90`                            |
| Secondary/Neutral | `btn bg-gray-2 text-gray-6`                                           |
| Danger            | `btn bg-red-5/80 hover:bg-red-6 text-white`                           |
| Ghost (on dark)   | `btn bg-white/20 hover:bg-white/30 text-white border border-white/30` |
| Disabled          | `btn bg-gray-2 text-gray-4 cursor-not-allowed`                        |
| Small             | Add `text-xs py-1.5 px-4` or `text-sm py-1.5 px-5`                    |
| With icon         | Add `inline-flex items-center gap-1.5` or `gap-2`                     |

---

## Badges & Chips

### Status badges (rounded-full)

```html
<span
  class="px-3 py-0.5 text-sm rounded-full font-semibold bg-green-6 text-white"
  >Selesai</span
>
<span
  class="px-3 py-0.5 text-sm rounded-full font-semibold bg-yellow-4 text-dark"
  >Proses</span
>
<span class="px-3 py-0.5 text-sm rounded-full font-semibold bg-gray text-white"
  >Pengajuan</span
>
<span class="px-3 py-0.5 text-sm rounded-full font-semibold bg-red-6 text-white"
  >Ditolak</span
>
```

### Tinted brand badges

```html
<span
  class="text-xs bg-unpad/10 text-unpad border border-unpad/20 px-2.5 py-0.5 rounded-full font-semibold"
>
  Label
</span>
```

### Identity chips (PAuS)

```html
<span
  class="text-xs bg-white/20 text-white px-3 py-0.5 rounded-full font-semibold"
>
  chip text
</span>
```

### Collection type badges (repository cards)

| Type      | Classes                                     |
| --------- | ------------------------------------------- |
| Disertasi | `bg-purple-1 text-purple-7 border-purple-2` |
| Tesis     | `bg-blue-1 text-blue-7 border-blue-2`       |
| Skripsi   | `bg-green-1 text-green-7 border-green-2`    |
| TA        | `bg-orange-1 text-orange-7 border-orange-2` |
| Default   | `bg-unpad/10 text-unpad border-unpad/20`    |

All: `text-xs px-2.5 py-0.5 rounded-full font-600 border`

---

## Icons

All icons use UnoCSS `@iconify-json/mdi` via `presetIcons`:

```html
<div class="i-mdi-[icon-name] w-5 h-5 text-unpad" />
```

Common icon sizes:

- `w-3.5 h-3.5` — inline with `text-xs`
- `w-4 h-4` — inline with `text-sm`
- `w-5 h-5` — inline with `text-base`, section headers
- `w-10 h-10` — empty state illustrations
- `w-14 h-14` / `w-16 h-16` — hero decorative icons

Common icons used:

- `i-mdi-magnify` — search
- `i-mdi-school` / `i-mdi-school-outline` — faculty
- `i-mdi-book-open-page-variant` — repository/books
- `i-mdi-account-multiple` — login/member
- `i-mdi-certificate-outline` — bebas pustaka
- `i-mdi-loading animate-spin` — loading spinner
- `i-mdi-check-circle` / `i-mdi-close-circle` — pass/fail
- `i-mdi-download` — download actions
- `i-mdi-chevron-left` / `i-mdi-chevron-right` — pagination

---

## Transitions & Animations

```
transition-all-200   → fast micro-interactions (hover state changes)
transition-all-300   → default hover transitions (cards, buttons)
transition-all-500   → slower overlays and drawers
hover:-translate-y-0.5  → subtle card lift on hover
animate-spin         → loading spinner
```

---

## Z-Index Layers

| Layer          | z-index | Element                     |
| -------------- | ------- | --------------------------- |
| Sticky navbar  | `z-6`   | `NavigationBar` wrapper     |
| Floating cards | `z-10`  | search bar overlapping hero |
| Mobile menu    | `z-20`  | `MobileMenu` overlay        |

---

## ⚠️ UnoCSS `--at-apply` Rule

**Never put a space before a class in responsive variants inside `--at-apply`.**

```css
/* ❌ WRONG — Prettier may insert spaces, breaking UnoCSS */
.foo {
  --at-apply: hidden xl: block;
}
/*  xl: is an invalid token, block applies everywhere → always visible */

/* ✅ CORRECT */
.foo {
  --at-apply: hidden xl: block;
}
```

Add `/* prettier-ignore */` before any CSS rule that uses responsive variants in `--at-apply` to prevent Prettier from re-inserting the space:

```css
/* prettier-ignore */
.foo {
  --at-apply: hidden xl:block md:ml-12;
}
```
