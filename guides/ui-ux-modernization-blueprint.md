# UI/UX Modernization Blueprint

**Purpose:** Reference guide for achieving modern, polished UI/UX (Assembly-level feel)  
**Target Stack:** Next.js 14+ (App Router) + Tailwind CSS 3.4+ + React 18+  
**Current Application:** crmsvc.com (and future builds)  
**Date:** January 24, 2026

---

## Table of Contents

1. [What Creates the "Modern Feel"](#what-creates-the-modern-feel)
2. [Technology Stack Breakdown](#technology-stack-breakdown)
3. [Performance Considerations](#performance-considerations)
4. [Retrofitting Roadmap](#retrofitting-roadmap)
5. [Implementation Guide](#implementation-guide)
6. [Typography Guidelines](#typography-guidelines)
7. [Color & Theming](#color--theming)
8. [Animation Principles](#animation-principles)
9. [Component Patterns](#component-patterns)
10. [Micro-Details Checklist](#micro-details-checklist)
11. [Performance Optimization](#performance-optimization)
12. [Resources & References](#resources--references)

---

## What Creates the "Modern Feel"

The polished, modern aesthetic of apps like Assembly comes from **layering multiple elements**, not a single technology.

### The Layer Cake

| Layer | What It Provides | Technology |
|-------|------------------|------------|
| **1. Behavior** | Accessible interactions (dropdowns, modals, focus management) | Radix UI |
| **2. Components** | Pre-styled, customizable UI elements | shadcn/ui |
| **3. Styling** | Utility-first CSS, consistent spacing | Tailwind CSS |
| **4. Motion** | Animations, transitions, micro-interactions | Framer Motion |
| **5. Typography** | Clean, modern fonts with proper hierarchy | Inter, Geist, etc. |
| **6. Color** | Subtle palettes, proper contrast, dark mode | CSS Variables |
| **7. Icons** | Consistent stroke weight, modern style | Lucide React |
| **8. Details** | Shadows, borders, loading states, empty states | Custom CSS + Components |

### Contribution Breakdown

```
shadcn/ui + Radix UI = 60% of the way to "modern"
+ Framer Motion      = 80% (this is the big jump)
+ Typography tuning  = 90%
+ Color/spacing work = 95%
+ Micro-details      = 100%
```

**Key insight:** Without Framer Motion, a site can look clean but will feel static. Animations are what make interfaces feel *alive* and *responsive*.

---

## Technology Stack Breakdown

### Radix UI (The Behavior Layer)

**What it is:** Unstyled, accessible UI primitives

**What it provides:**
- Keyboard navigation
- Focus management
- Screen reader support
- WAI-ARIA compliance
- Complex interaction patterns

**Components included:**
- Dialog (modals)
- Dropdown Menu
- Popover
- Tooltip
- Tabs
- Accordion
- Select
- Checkbox, Radio, Switch
- Slider
- Toast
- Navigation Menu
- Context Menu

**Key point:** Radix has **zero visual styling** — it only handles behavior and accessibility. Think of it as the skeleton.

**Bundle impact:** ~2-5KB gzipped per component (tree-shakeable)

---

### shadcn/ui (The Styled Components Layer)

**What it is:** Pre-styled components built on Radix UI + Tailwind CSS

**What makes it different:**
- NOT an npm package — you copy the code into your project
- You own and can modify every component
- Consistent design language out of the box
- Built specifically for Tailwind CSS

**Key components:**
- Button (with variants)
- Input, Textarea, Select
- Card
- Dialog, Sheet, Drawer
- Table, Data Table
- Form (with react-hook-form + zod)
- Command (command palette)
- Dropdown Menu, Context Menu
- Toast (via Sonner)
- Tabs, Accordion
- Avatar, Badge
- Skeleton (loading states)
- And many more...

**Bundle impact:** ~0KB additional (it's just your own Tailwind classes)

---

### Framer Motion (The Animation Layer)

**What it is:** Production-ready animation library for React

**What it provides:**
- Declarative animations
- Gesture support (drag, hover, tap)
- Layout animations
- Page transitions
- Scroll-triggered animations
- AnimatePresence (mount/unmount animations)

**Why it's critical for "feel":**
- Transforms static UI into responsive, living interfaces
- Provides feedback for user actions
- Creates perceived performance (things feel faster)
- Adds delight without being distracting

**Bundle impact:** ~30-40KB gzipped (the heaviest piece)

**Mitigation strategies:**
- Code-split pages with heavy animations
- Use CSS transitions for simple hover states
- Lazy load animated components
- Respect `prefers-reduced-motion`

---

### Supporting Technologies

| Technology | Purpose | Bundle Impact |
|------------|---------|---------------|
| **Tailwind CSS** | Utility-first styling | ~10-15KB (purged) |
| **Lucide React** | Icon library | ~1-2KB per icon |
| **next/font** | Optimized font loading | Minimal |
| **clsx / tailwind-merge** | Class name utilities | ~1KB |
| **Sonner** | Toast notifications | ~5KB |
| **cmdk** | Command palette | ~5KB |
| **Recharts / Tremor** | Charts (if needed) | ~30-50KB |

---

## Performance Considerations

### Bundle Size Summary

| Technology | Gzipped Size | Tree-Shakeable |
|------------|--------------|----------------|
| Radix UI | 2-5KB per component | Yes |
| shadcn/ui | 0KB (your code) | N/A |
| Tailwind CSS | 10-15KB | Auto-purged |
| Framer Motion | 30-40KB | Partial |
| Lucide Icons | 1-2KB per icon | Yes |
| **Typical Total** | **80-150KB initial** | — |

### What Actually Slows Sites Down

These UI libraries are rarely the bottleneck. Real culprits:

| Issue | Impact | Solution |
|-------|--------|----------|
| Unoptimized images | High | Use next/image, WebP, proper sizing |
| Too many fonts | Medium | Limit to 2-3 weights |
| Third-party scripts | High | Defer analytics, lazy load widgets |
| No caching | High | Proper cache headers on Vercel |
| Large JS bundles | Medium | Code-split routes |
| Render-blocking CSS | Medium | Tailwind handles this well |
| Too many animations | Medium | Be purposeful, not decorative |

### Performance Targets

| Metric | Target | Good | Needs Work |
|--------|--------|------|------------|
| Lighthouse Performance | 90-100 | 80-89 | Below 80 |
| First Contentful Paint | < 1.5s | < 2.5s | > 2.5s |
| Largest Contentful Paint | < 2.5s | < 4s | > 4s |
| Time to Interactive | < 3s | < 5s | > 5s |
| Cumulative Layout Shift | < 0.1 | < 0.25 | > 0.25 |

---

## Retrofitting Roadmap

### Current Stack (crmsvc.com)

| Component | Version | Status |
|-----------|---------|--------|
| Next.js | 14.2.35 | Ready |
| Tailwind CSS | 3.4.1 | Ready |
| React | 18.3.1 | Ready |
| TypeScript | 5.x | Ready |
| Router | App Router | Ideal |
| Hosting | Vercel | Optimal |

**Assessment:** Zero blockers. 100% compatible with all modernization technologies.

---

### Phase 1: Foundation Setup (1-2 Hours)

**Step 1: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Configuration options:
- Style: Default (or New York for slightly different aesthetic)
- Base color: Slate (recommended) or Zinc, Neutral, Gray, Stone
- CSS variables: Yes
- Tailwind config: Yes (it will update yours)
- Components location: `@/components/ui`
- Utils location: `@/lib/utils`

**Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

**Step 3: Add a Modern Font**

In your root layout (`app/layout.tsx`):

```tsx
import { Inter } from 'next/font/google'
// OR
import { GeistSans } from 'geist/font/sans'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Step 4: Verify CSS Variables**

shadcn/ui adds these to your `globals.css`. Verify they're present:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

---

### Phase 2: Quick Wins (Days 1-3)

**Add Page Transitions**

Create a transition wrapper component:

```tsx
// components/page-transition.tsx
'use client'

import { motion } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**Add Core shadcn/ui Components**

```bash
# Essential components to add first
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add skeleton
npx shadcn@latest add toast
```

**Replace Existing Buttons**

Before:
```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

After:
```tsx
import { Button } from '@/components/ui/button'

<Button>Click me</Button>
// or with variants
<Button variant="outline">Click me</Button>
<Button variant="ghost">Click me</Button>
<Button variant="destructive">Delete</Button>
```

**Add Toast Notifications**

```bash
npx shadcn@latest add sonner
```

In your layout:
```tsx
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

Usage:
```tsx
import { toast } from 'sonner'

toast.success('Changes saved!')
toast.error('Something went wrong')
```

---

### Phase 3: Component-by-Component (Ongoing)

Replace components as you work on different areas of the site:

| Area | Components to Add |
|------|-------------------|
| **Forms** | Input, Textarea, Select, Checkbox, Label, Form |
| **Navigation** | NavigationMenu, DropdownMenu, Sheet (mobile nav) |
| **Content** | Card, Badge, Avatar, Separator |
| **Feedback** | Dialog, AlertDialog, Toast, Skeleton |
| **Data Display** | Table, DataTable (with TanStack Table) |
| **Utility** | Command (search), Tooltip, Popover |

**Command to add any component:**
```bash
npx shadcn@latest add [component-name]
```

---

### Phase 4: Animation Polish (Week 2+)

**Hover States**

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  <Card>...</Card>
</motion.div>
```

**List Stagger Animation**

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.li key={item.id} variants={item}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

**Skeleton Loading**

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// While loading
<div className="space-y-3">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-4 w-[150px]" />
</div>
```

---

## Implementation Guide

### File Structure (Recommended)

```
app/
├── layout.tsx              # Root layout with font, providers
├── globals.css             # Tailwind + CSS variables
├── page.tsx
└── (routes)/

components/
├── ui/                     # shadcn/ui components (auto-generated)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── layout/                 # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
├── shared/                 # Shared/reusable components
│   ├── page-transition.tsx
│   └── loading-spinner.tsx
└── features/               # Feature-specific components
    ├── contact-form/
    └── service-card/

lib/
├── utils.ts                # shadcn/ui utility (cn function)
└── fonts.ts                # Font configuration

styles/
└── animations.ts           # Framer Motion variants (optional)
```

### Essential Utility: `cn()` Function

shadcn/ui includes this, but here's what it does:

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This lets you merge Tailwind classes safely:

```tsx
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className // passed from props
)} />
```

---

## Typography Guidelines

### Recommended Fonts

| Font | Style | Best For | Source |
|------|-------|----------|--------|
| **Inter** | Clean, neutral | General use, SaaS | Google Fonts |
| **Geist** | Modern, technical | Developer tools, tech | Vercel |
| **Plus Jakarta Sans** | Friendly, rounded | Consumer apps | Google Fonts |
| **DM Sans** | Geometric, clean | Marketing sites | Google Fonts |
| **Manrope** | Modern, versatile | Various | Google Fonts |

### Font Weight Hierarchy

| Element | Weight | Tailwind Class |
|---------|--------|----------------|
| Body text | 400 (Regular) | `font-normal` |
| Emphasized text | 500 (Medium) | `font-medium` |
| Subheadings | 600 (Semibold) | `font-semibold` |
| Headings | 700 (Bold) | `font-bold` |

**Avoid:** Using too many weights. Stick to 3-4 maximum.

### Typography Scale

```css
/* Recommended scale (already in Tailwind) */
text-xs    /* 12px - captions, labels */
text-sm    /* 14px - secondary text */
text-base  /* 16px - body text */
text-lg    /* 18px - large body */
text-xl    /* 20px - small headings */
text-2xl   /* 24px - section headings */
text-3xl   /* 30px - page titles */
text-4xl   /* 36px - hero headings */
```

### Line Height & Letter Spacing

| Element | Line Height | Letter Spacing |
|---------|-------------|----------------|
| Headings | `leading-tight` (1.25) | `tracking-tight` (-0.025em) |
| Body | `leading-relaxed` (1.625) | `tracking-normal` (0) |
| Small text | `leading-normal` (1.5) | `tracking-wide` (0.025em) |

---

## Color & Theming

### shadcn/ui Color System

shadcn/ui uses CSS variables with HSL values (without the `hsl()` wrapper):

```css
:root {
  --background: 0 0% 100%;        /* White */
  --foreground: 222.2 84% 4.9%;   /* Near black */
  
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  --primary: 222.2 47.4% 11.2%;   /* Your brand color */
  --primary-foreground: 210 40% 98%;
  
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  --destructive: 0 84.2% 60.2%;   /* Red for errors */
  --destructive-foreground: 210 40% 98%;
  
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;         /* Focus ring */
  
  --radius: 0.5rem;               /* Border radius */
}
```

### Modern Color Principles

1. **Don't use pure black (#000) or pure white (#FFF)**
   - Background: Use very light gray (slate-50, zinc-50)
   - Text: Use very dark gray (slate-900, zinc-900)

2. **Subtle borders**
   - Use low-contrast borders (slate-200, not slate-400)
   - Consider `border-border/50` for even subtler lines

3. **Single accent color**
   - Pick one primary brand color
   - Use sparingly for CTAs and important elements

4. **Proper dark mode**
   - Not just inverted colors
   - Slightly elevated surfaces (slate-900 bg, slate-800 cards)
   - Reduced contrast for comfort

### Implementing Dark Mode

shadcn/ui includes dark mode variables. Enable with:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Toggle component:
```bash
npx shadcn@latest add dropdown-menu
```

```tsx
// components/theme-toggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## Animation Principles

### When to Animate

| Scenario | Animate? | Example |
|----------|----------|---------|
| Page transitions | Yes | Fade + slight slide |
| Modal/dialog open | Yes | Scale + fade |
| Dropdown menus | Yes | Fade + slide down |
| Hover states | Yes (subtle) | Slight scale, color shift |
| Button press | Yes (subtle) | Scale down slightly |
| Loading states | Yes | Skeleton shimmer, spinners |
| List appearance | Yes | Stagger children |
| Scroll animations | Sparingly | Can feel gimmicky |
| Decorative motion | Avoid | Distracting |

### Animation Timing

| Duration | Use Case |
|----------|----------|
| 100-150ms | Micro-interactions (hover, focus) |
| 200-300ms | Component transitions (dropdowns, tooltips) |
| 300-500ms | Page transitions, modals |
| 500ms+ | Rarely — only for dramatic effect |

### Easing Functions

```tsx
// Recommended easings
transition={{ ease: "easeOut" }}      // Most common, natural deceleration
transition={{ ease: "easeInOut" }}    // Smooth start and end
transition={{ ease: [0.4, 0, 0.2, 1] }} // Custom cubic-bezier (Material Design)
```

### Respecting User Preferences

Always check for reduced motion preference:

```tsx
import { useReducedMotion } from 'framer-motion'

function MyComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.3 
      }}
    />
  )
}
```

---

## Component Patterns

### Card with Hover Effect

```tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ServiceCard({ title, description, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <Icon className="h-10 w-10 text-primary mb-2" />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

### Animated Button

```tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function AnimatedButton({ children, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
```

### Fade-In on Scroll

```tsx
'use client'

import { motion } from 'framer-motion'

export function FadeInSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### Loading Skeleton Pattern

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton for a card
export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

// Usage with Suspense
import { Suspense } from 'react'

<Suspense fallback={<CardSkeleton />}>
  <AsyncCard />
</Suspense>
```

---

## Micro-Details Checklist

### Interactions

- [ ] All interactive elements have visible focus states
- [ ] Buttons have hover AND active (pressed) states
- [ ] Links have underline or color change on hover
- [ ] Form inputs have clear focus rings
- [ ] Disabled states are visually distinct but not harsh
- [ ] Loading states for all async actions
- [ ] Error states are clear and helpful

### Visual Polish

- [ ] Consistent border radius throughout (use `--radius` variable)
- [ ] Subtle shadows for elevation (not harsh drop shadows)
- [ ] Proper contrast ratios (WCAG AA minimum)
- [ ] No pure black (#000) or pure white (#FFF)
- [ ] Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- [ ] Icons match text color or are intentionally different
- [ ] Images have loading placeholders

### Typography

- [ ] Clear hierarchy (heading sizes decrease logically)
- [ ] Body text is readable (16px minimum)
- [ ] Line length is comfortable (50-75 characters)
- [ ] Sufficient line height for body text
- [ ] Tighter line height for headings
- [ ] No orphans/widows in important text (where practical)

### Motion

- [ ] Page transitions feel smooth, not jarring
- [ ] Modals/dialogs animate in and out
- [ ] Dropdowns and tooltips have enter/exit animations
- [ ] Loading spinners or skeletons for async content
- [ ] Reduced motion preference is respected
- [ ] No animation is purely decorative

### Forms

- [ ] Labels are associated with inputs
- [ ] Error messages appear near the relevant field
- [ ] Success feedback on form submission
- [ ] Inline validation where appropriate
- [ ] Required fields are indicated
- [ ] Form submission has loading state

### Empty & Error States

- [ ] Empty states have helpful messaging and CTAs
- [ ] 404 page is branded and helpful
- [ ] Error boundaries catch and display errors gracefully
- [ ] API errors show user-friendly messages

---

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image'

// Always use next/image
<Image
  src="/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // If using local images
/>
```

### Font Optimization

```tsx
// In app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents FOIT
  variable: '--font-inter',
})
```

### Code Splitting

Next.js App Router automatically code-splits by route. For components:

```tsx
import dynamic from 'next/dynamic'

// Heavy component loaded only when needed
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false, // If component doesn't need SSR
})
```

### Animation Performance

```tsx
// Use transform and opacity (GPU-accelerated)
// Good
animate={{ x: 100, opacity: 0.5 }}

// Avoid (causes layout recalculation)
animate={{ width: 100, height: 100 }}
```

### Lighthouse Audit

Run regularly:
```bash
# In Chrome DevTools
Lighthouse > Performance, Accessibility, Best Practices, SEO

# Or via CLI
npm install -g lighthouse
lighthouse https://crmsvc.com --view
```

---

## Resources & References

### Official Documentation

| Resource | URL |
|----------|-----|
| shadcn/ui | https://ui.shadcn.com |
| Radix UI | https://www.radix-ui.com |
| Framer Motion | https://www.framer.com/motion |
| Tailwind CSS | https://tailwindcss.com |
| Next.js | https://nextjs.org/docs |
| Lucide Icons | https://lucide.dev |

### Useful Tools

| Tool | Purpose |
|------|---------|
| v0.dev | AI-powered shadcn/ui component generator |
| Tailwind UI | Premium component examples |
| Heroicons | Alternative icon set |
| Coolors | Color palette generator |
| Type Scale | Typography scale calculator |
| Realtime Colors | Live color palette preview |

### Inspiration Sites

| Site | Why It's Good |
|------|---------------|
| Assembly (assembly.com) | Clean, modern SaaS UI |
| Linear (linear.app) | Exceptional animations |
| Vercel (vercel.com) | Sharp, technical aesthetic |
| Notion (notion.so) | Friendly, approachable |
| Stripe (stripe.com) | Polished, professional |
| Raycast (raycast.com) | macOS-style refinement |

---

## Quick Reference Commands

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add a component
npx shadcn@latest add button
npx shadcn@latest add [component-name]

# Add multiple components
npx shadcn@latest add button card input dialog

# Install Framer Motion
npm install framer-motion

# Install supporting packages
npm install lucide-react
npm install next-themes
npm install clsx tailwind-merge
```

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 24, 2026 | Initial blueprint |

---

*This document serves as a living reference. Update as technologies evolve and new patterns emerge.*
