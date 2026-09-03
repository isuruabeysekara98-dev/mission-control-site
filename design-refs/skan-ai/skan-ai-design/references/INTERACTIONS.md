# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: all;
transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Dismiss announcement`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ color: rgb(255, 255, 255);
/* border-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ border-color: rgb(255, 255, 255);
/* outline: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) none 3px → */ outline: rgb(255, 255, 255) none 3px;
/* outline-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ outline-color: rgb(255, 255, 255);
```

**On focus:**

```css
/* outline: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: oklab(0.999994 0.0000455677 0.0000200868 / 0.6) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 2 — `Solutions`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(22, 23, 20) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(22, 23, 20);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 3 — `AI WITHOUT SKAN`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On focus:**

```css
/* outline: rgb(22, 23, 20) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(22, 23, 20) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `all`

## Link Interactions

### Link 1 — `Learn more`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `all`

### Link 2 — `a`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On focus:**

```css
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1)`

### Link 3 — `Platform`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(22, 23, 20) none 3px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(22, 23, 20);
```

**On focus:**

```css
/* color: rgb(255, 255, 255) → */ color: rgb(22, 23, 20);
/* border-color: rgb(255, 255, 255) → */ border-color: rgb(22, 23, 20);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(150, 119, 255) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(150, 119, 255);
```

**Transition:** `opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## Interaction Rules

- Accent color `#007aff` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.25s`, `0.3s`, `0.15s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

