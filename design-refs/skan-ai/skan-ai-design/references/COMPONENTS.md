# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Overflow X Clip** | unknown | 14× | `.overflow-x-clip`, `.relative`, `.z-1` |
| **Button Label** | button | 13× | `.button-label`, `.relative`, `.whitespace-nowrap` |
| **Container** | unknown | 13× | `.container` |
| **Not First:Mt 14** | unknown | 10× | `.not-first:mt-14` |
| **Div** | unknown | 8× |  |
| **[& .Button Caret]:Group Hover:Text White** | button | 7× | `.[&_.button-caret]:group-hover:text-white`, `.cursor-pointer`, `.focus-visible:outline-2` |
| **Flex** | card | 5× | `.flex`, `.gap-x-8`, `.items-start` |
| **[& Span]:Text Stone 100** | unknown | 5× | `.[&_span]:text-stone-100`, `.block`, `.heading-span` |
| **Bg White** | unknown | 3× | `.bg-white`, `.border`, `.border-border` |
| **Border Stone 50** | list-item | 3× | `.border-stone-50`, `.border-y`, `.flex` |
| **[& .Corner Border]:Text Gray** | unknown | 3× | `.[&_.corner-border]:text-gray`, `.corner-border-1_5`, `.flex` |
| **Px 3.5** | unknown | 3× | `.px-3.5` |
| **Div** | unknown | 3× |  |
| **Scan Blur Layer** | unknown | 3× | `.scan-blur-layer`, `.text-black`, `.text-stat-40` |
| **Scan Clear Layer** | unknown | 3× | `.scan-clear-layer`, `.text-black`, `.text-stat-40` |
| **Flex** | unknown | 3× | `.flex`, `.flex-col`, `.gap-y-5` |
| **Text Accent** | unknown | 3× | `.text-accent`, `.text-heading-34` |
| **Text Heading 34** | unknown | 3× | `.text-heading-34`, `.text-night` |
| **Text Body 20** | unknown | 3× | `.text-body-20`, `.text-midnight-25` |
| **H 10** | unknown | 3× | `.h-10`, `.mb-6`, `.shrink-0` |

## Cards

### Flex

**Instances found:** 5

**CSS classes:** `.flex` `.gap-x-8` `.items-start` `.justify-between`

**HTML structure:**

```html
<div class="flex gap-x-8 justify-between items-start"><div class="text-card flex flex-col size-full text-left mr-auto text-card-body-20"><h1 class="text-heading-58 max-xl:[&amp;_br]:hidden text-white [&amp;_.heading-span&gt;span]:text-white/70!"><span class="heading-span [&amp;_span]:text-stone-100 block"><span>Give AI the context to</span> transform high-impact work</span></h1><div class="first:pt-0 pt-3.5 sm:pt-5 lg:pt-7 first:pt-0 text-white/70 text-white!"><p>Skan AI observes how work actually gets …</p></div><div class="flex flex-wrap items-center gap-3 justify-start pt-7 sm:pt-10 lg:pt-1
```

**Base styles (from design tokens):**

```css
.flex {
  background: #e5f8ff;
  border: 1px solid #252622;
  border-radius: 2px;
  padding: 8px;
}```

## List Items

### Border Stone 50

**Instances found:** 3

**CSS classes:** `.border-stone-50` `.border-y` `.flex` `.flex-nowrap` `.flex-row` `.gap-x-6`

**HTML structure:**

```html
<li class="flex min-w-0 flex-row flex-nowrap items-center gap-x-6 justify-between border-y py-8 border-stone-50 lg:justify-start lg:border-0 lg:py-0 lg:gap-x-6"><div class="relative flex flex-col justify-between corner-border-1_5 shrink-0 [&amp;_.corner-border]:text-gray"><div class="corner-border corner-border-t corner-size-md"><div class="corner-tl"></div><div class="corner-tr"></div></div><div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-s
```

**Base styles (from design tokens):**

```css
.border-stone-50 {
  padding: 4px 0;
  border-bottom: 1px solid #252622;
}```

## Buttons

### Button Label

**Instances found:** 13

**CSS classes:** `.button-label` `.relative` `.whitespace-nowrap` `.z-10`

**HTML structure:**

```html
<span class="button-label relative z-10 whitespace-nowrap">Learn more</span>
```

**Base styles (from design tokens):**

```css
.button-label {
  background: #007aff;
  color: #1b1c17;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
}```

### [& .Button Caret]:Group Hover:Text White

**Instances found:** 7

**CSS classes:** `.[&_.button-caret]:group-hover:text-white` `.cursor-pointer` `.focus-visible:outline-2` `.focus-visible:outline-accent` `.focus-visible:outline-offset-2` `.font-semibold`

**HTML structure:**

```html
<a class="cursor-pointer relative group inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent overflow-hidden text-btn-16 font-semibold gap-x-4 sm:gap-x-5.5 shrink-0 max-md:gap-x-2 [&amp;_.button-caret]:group-hover:text-white" href="/skan-ai-raises-series-c"><span class="button-caret w-1.5 shrink-0 group-hover:text-grape transition-[translate,color] group-hover:translate-x-0.5 will-change-transform"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 6 8" fill="none" aria-hidden="true"><path d="M1
```

**Base styles (from design tokens):**

```css
.[&_.button-caret]:group-hover:text-white {
  background: #007aff;
  color: #1b1c17;
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
}```

## Other Components

### Overflow X Clip

**Instances found:** 14

**CSS classes:** `.overflow-x-clip` `.relative` `.z-1`

**HTML structure:**

```html
<div class="relative z-1 overflow-x-clip"><div class=""><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k
```

**Base styles (from design tokens):**

```css
.overflow-x-clip {
  background: #e5f8ff;
  padding: 4px;
}```

### Container

**Instances found:** 13

**CSS classes:** `.container`

**HTML structure:**

```html
<div class="container"><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="flex flex-col gap-8 sm:gap-10"><span class="inline-flex items-center gap-x-3.5 sm:gap-x-6 md:gap-x-10.5 not-prose"><span class="size-2 bg-accent" aria-hidden="true"></span><p class="not-prose text-eyebrow-14">Trusted by</p></span><ul class="m-0 grid list-none p-0 max-lg:-space-y-px lg:border-y lg:gap-x-12 lg:py-11 border-stone-50 lg:grid-cols-3"><li class="flex min-w-0 flex-row flex-nowrap items-center gap-x-6 justify-between border-y py-8 border-stone-50 lg:justify-start lg:border-0 lg:py-0 l
```

**Base styles (from design tokens):**

```css
.container {
  background: #e5f8ff;
  padding: 4px;
}```

### Not First:Mt 14

**Instances found:** 10

**CSS classes:** `.not-first:mt-14`

**HTML structure:**

```html
<div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee65553acc80105d.mp4
```

**Base styles (from design tokens):**

```css
.not-first:mt-14 {
  background: #e5f8ff;
  padding: 4px;
}```

### Div

**Instances found:** 8

**HTML structure:**

```html
<div class=""><div class="not-first:mt-14 md:not-first:mt-16 lg:not-first:mt-24"><div class="relative isolate overflow-hidden w-full mx-auto max-w-[138.75rem] flex flex-col-reverse md:flex-col md:min-h-[min(90dvh,55.9375rem)] 3xl:min-h-[min(90dvh,60rem)]"><div class="relative md:absolute md:inset-y-0 md:left-0 right-0 md:right-[-30%] xl:right-0 md:-z-1 max-sm:overflow-hidden"><div class="absolute inset-0 size-full min-h-96 sm:min-h-80 md:min-h-0 max-md:relative! max-sm:w-[150%] max-sm:-translate-x-[28%]"><video src="https://cdn.sanity.io/files/3xg3qj5k/production/a6922608b6894fed0f02a1caee6555
```

**Base styles (from design tokens):**

```css
.div {
  background: #e5f8ff;
  padding: 4px;
}```

### [& Span]:Text Stone 100

**Instances found:** 5

**CSS classes:** `.[&_span]:text-stone-100` `.block` `.heading-span`

**HTML structure:**

```html
<span class="heading-span [&amp;_span]:text-stone-100 block">Introducing the Context Graph of Work. Everything your AI needs to execute.</span>
```

**Base styles (from design tokens):**

```css
.[&_span]:text-stone-100 {
  background: #e5f8ff;
  padding: 4px;
}```

### Bg White

**Instances found:** 3

**CSS classes:** `.bg-white` `.border` `.border-border` `.cursor-pointer` `.focus-visible:outline-2` `.focus-visible:outline-accent`

**HTML structure:**

```html
<a class="cursor-pointer relative group inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent overflow-hidden gap-x-2 sm:gap-x-2.5 rounded-md transition-colors border border-border bg-white text-foreground text-btn-18 px-4.5 md:px-5.5 py-[0.5625rem] md:py-3" href="/request-demo"><span class="relative z-10 size-1.5 shrink-0 transition-colors bg-grape" aria-hidden="true"></span><span class="button-label relative z-10 whitespace-nowrap">Request a demo</span></a>
```

**Base styles (from design tokens):**

```css
.bg-white {
  background: #e5f8ff;
  padding: 4px;
}```

### [& .Corner Border]:Text Gray

**Instances found:** 3

**CSS classes:** `.[&_.corner-border]:text-gray` `.corner-border-1_5` `.flex` `.flex-col` `.justify-between` `.relative`

**HTML structure:**

```html
<div class="relative flex flex-col justify-between corner-border-1_5 shrink-0 [&amp;_.corner-border]:text-gray"><div class="corner-border corner-border-t corner-size-md"><div class="corner-tl"></div><div class="corner-tr"></div></div><div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span><
```

**Base styles (from design tokens):**

```css
.[&_.corner-border]:text-gray {
  background: #e5f8ff;
  padding: 4px;
}```

### Px 3.5

**Instances found:** 3

**CSS classes:** `.px-3.5`

**HTML structure:**

```html
<div class="px-3.5"><div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></
```

**Base styles (from design tokens):**

```css
.px-3.5 {
  background: #e5f8ff;
  padding: 4px;
}```

### Div

**Instances found:** 3

**HTML structure:**

```html
<div class="" style="position:relative;width:fit-content;max-width:100%"><div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div><div aria-hidden
```

**Base styles (from design tokens):**

```css
.div {
  background: #e5f8ff;
  padding: 4px;
}```

### Scan Blur Layer

**Instances found:** 3

**CSS classes:** `.scan-blur-layer` `.text-black` `.text-stat-40` `.whitespace-nowrap`

**HTML structure:**

```html
<div aria-hidden="true" style="position:absolute;inset:0;filter:blur(4px);opacity:0.3;pointer-events:none;user-select:none;will-change:clip-path;overflow:visible" class="scan-blur-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div>
```

**Base styles (from design tokens):**

```css
.scan-blur-layer {
  background: #e5f8ff;
  padding: 4px;
}```

### Scan Clear Layer

**Instances found:** 3

**CSS classes:** `.scan-clear-layer` `.text-black` `.text-stat-40` `.whitespace-nowrap`

**HTML structure:**

```html
<div style="position:relative;z-index:1;clip-path:inset(0 100% 0 0);will-change:clip-path" class="scan-clear-layer text-stat-40 whitespace-nowrap text-black"><div><span></span><span>1 in 4</span><span></span></div></div>
```

**Base styles (from design tokens):**

```css
.scan-clear-layer {
  background: #e5f8ff;
  padding: 4px;
}```

### Flex

**Instances found:** 3

**CSS classes:** `.flex` `.flex-col` `.gap-y-5` `.py-10`

**HTML structure:**

```html
<div class="flex flex-col gap-y-5 py-10 md:gap-y-9 md:px-12 md:py-14 lg:first:pl-0 lg:last:pr-0"><p class="text-heading-34 text-accent">01</p><h3 class="text-heading-34 text-night">Agents that act on reality</h3><p class="text-body-20 text-midnight-25">Enterprise AI doesn't stall because the …</p></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Accent

**Instances found:** 3

**CSS classes:** `.text-accent` `.text-heading-34`

**HTML structure:**

```html
<p class="text-heading-34 text-accent">01</p>
```

**Base styles (from design tokens):**

```css
.text-accent {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Heading 34

**Instances found:** 3

**CSS classes:** `.text-heading-34` `.text-night`

**HTML structure:**

```html
<h3 class="text-heading-34 text-night">Agents that act on reality</h3>
```

**Base styles (from design tokens):**

```css
.text-heading-34 {
  background: #e5f8ff;
  padding: 4px;
}```

### Text Body 20

**Instances found:** 3

**CSS classes:** `.text-body-20` `.text-midnight-25`

**HTML structure:**

```html
<p class="text-body-20 text-midnight-25">Enterprise AI doesn't stall because the models aren't smart enough. It stalls because it doesn't understand how your work actually runs.</p>
```

**Base styles (from design tokens):**

```css
.text-body-20 {
  background: #e5f8ff;
  padding: 4px;
}```

### H 10

**Instances found:** 3

**CSS classes:** `.h-10` `.mb-6` `.shrink-0` `.w-10`

**HTML structure:**

```html
<div class="mb-6 h-10 w-10 shrink-0"><img alt="icon" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" class="h-full w-full object-contain" style="color: transparent;" srcset="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F3xg3qj5k%2Fproduction%2Fd2b36450d307b73af819cb4fb3a5380072a85787-78x78.png%3Fw%3D40%26h%3D40%26q%3D80%26fit%3Dmax%26auto%3Dformat&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F3xg3qj5k%2Fproduction%2Fd2b36450d307b73af819cb4fb3a5380072a85787-78x78.png%3Fw%3D40%26h%3D40%26q%3D80%26fit%3Dmax%26auto%3Dformat&amp;w=96&am
```

**Base styles (from design tokens):**

```css
.h-10 {
  background: #e5f8ff;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#252622` for all dividers within components
- Use `#007aff` for all interactive/active states

