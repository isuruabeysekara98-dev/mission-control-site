# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.flex.min-h-screen` | column | — | — | — | 6 |
| `div.flex.flex-col-reverse` | row | space-between | — | 56px | 2 |
| `div.border-t.border-midnight-75` | row | space-between | center | 24px 48px | 2 |
| `div.flex-1.max-w-[63.5rem]` | row | space-between | start | 48px 32px | 5 |
| `div.flex.items-center` | row | space-between | center | normal 48px | 3 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.container.flex` | `305.812px 660.359px 305.828px` | normal 24px | 2 |

## Structural Containers

### `<main>` (`main#main-content.flex-1`)

```
display:          block
children:         12
```

### `<footer>` (`footer.bg-night.text-white`)

```
display:          block
children:         2
```

### `<header>` (`header.relative.top-0`)

```
display:          block
children:         3
```

### `<section>` (`section.bg-foreground.text-background`)

```
display:          block
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          40px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          40px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          80px 0px 40px
children:         1
```

### `<section>` (`section.bg-stone-25.text-foreground`)

```
display:          block
padding:          144px 0px
children:         1
```

### `<section>` (`section.bg-accent.text-white`)

```
display:          block
padding:          80px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          144px 0px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          0px 0px 164px
children:         1
```

### `<section>` (`section.bg-background.text-foreground`)

```
display:          block
padding:          0px 0px 196px
children:         1
```

## Layout Rules

- **Container max-width:** `1416px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

