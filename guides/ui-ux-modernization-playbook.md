# UI/UX Modernization Playbook
## Modern Component Stack + Performance Guardrails for Next.js Projects

---

**Version:** 1.0  
**Created:** 2026-01-25  
**Status:** ✅ Accepted  
**Applies To:** All Next.js + Tailwind CSS projects  
**Authors:** Claude (Technical Partner), Johnny Boy (Founder)

---

## Table of Contents

1. [Decision Summary](#1-decision-summary)
2. [The "Modern" Aesthetic Defined](#2-the-modern-aesthetic-defined)
3. [Tech Stack Specification](#3-tech-stack-specification)
4. [Performance Guardrails](#4-performance-guardrails)
5. [Retrofitting Existing Sites](#5-retrofitting-existing-sites)
6. [Animation Patterns & Libraries](#6-animation-patterns--libraries)
7. [Component Implementation Guide](#7-component-implementation-guide)
8. [Pre-Deployment Checklist](#8-pre-deployment-checklist)
9. [Reference Sites & Resources](#9-reference-sites--resources)

---

## 1. Decision Summary

### The Question
What UI component stack should be standardized across projects to achieve modern, polished interfaces while maintaining performance?

### The Decision
**Standardize on: shadcn/ui + Radix UI + Tailwind CSS + Framer Motion**

This stack provides:
- Assembly/Linear-level visual polish
- Full accessibility (WCAG 2.1 AA) out of the box
- Excellent performance characteristics (tree-shakeable, lightweight)
- Complete ownership of code (copy-paste, not npm dependency)
- Works seamlessly with existing Next.js + Tailwind infrastructure

### Why Not Alternatives?

| Alternative | Why Not |
|-------------|---------|
| Material UI | Opinionated design system, harder to customize, heavier bundle |
| Chakra UI | Good but less modern aesthetic, component library dependency |
| Ant Design | Enterprise-focused, distinct visual style, heavy |
| Custom from scratch | Time-intensive, accessibility gaps, maintenance burden |

---

## 2. The "Modern" Aesthetic Defined

### Gold Standard Sites to Reference

| Site | What Makes It Great |
|------|---------------------|
| [linear.app](https://linear.app) | THE benchmark — smooth animations, perfect spacing, minimal |
| [vercel.com](https://vercel.com) | Subtle micro-interactions, clean typography, professional |
| [resend.com](https://resend.com) | Modern developer aesthetic, great dark mode |
| [cal.com](https://cal.com) | shadcn/ui in production, scheduling app |
| [dub.co](https://dub.co) | Clean, modern, open source |

### What Creates the "Template" Feel (Avoid These)

| Template Symptom | Modern Alternative |
|------------------|-------------------|
| Generic stock photos | Custom photography, abstract illustrations, or none |
| Cookie-cutter layout (hero → 3-col → testimonials → CTA) | Unexpected layouts, bento grids, asymmetry |
| Static everything | Purposeful animation on key elements |
| Safe color palette (blue/gray) | Bold but cohesive brand colors |
| System fonts or Google Fonts defaults | Custom typography (Inter, Geist, Plus Jakarta Sans) |
| No whitespace, cramped | Generous padding, breathing room |
| Zero micro-details | Consistent corners, subtle shadows, intentional hover states |

### The Formula

```
Modern = (Strong Brand Identity) + (Unexpected Layout) + (Purposeful Animation) + (Quality Photography)
```

### Critical Differentiators

**1. Animation/Motion (THE #1 differentiator)**
- Page transitions (fade/slide between routes)
- Component mount/unmount animations
- Hover states beyond color change
- Skeleton shimmer loading states
- List item stagger animations

**2. Typography**
- Modern sans-serif: Inter, Geist, SF Pro, Plus Jakarta Sans
- Weight hierarchy: 400 (body), 500 (emphasis), 600 (headings)
- Tight letter-spacing on headings (-0.02em to -0.05em)
- Generous line-height (1.5-1.7 for body)

**3. Color System**
- Subtle gray palette (not pure #000/#FFF)
- Low-contrast borders (gray-200, not black)
- Single accent color used sparingly
- Proper dark mode (not just inverted)

**4. Spacing & Density**
- Generous padding (not cramming content)
- Consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Strategic use of dividers (less is more)
- Whitespace as design element

**5. Micro-Details**
- Consistent border-radius (pick one: 6px, 8px, or 12px)
- Subtle hover states (opacity, scale, or translate)
- Intentional focus rings (visible, on-brand)
- Smooth scroll behavior
- Cursor changes on interactive elements

---

## 3. Tech Stack Specification

### Required Dependencies

```bash
# Core UI
npx shadcn@latest init
npm install @radix-ui/react-icons

# Animation (THE critical differentiator)
npm install framer-motion

# Icons
npm install lucide-react

# Toast notifications
npm install sonner

# Command palette (optional but recommended)
npm install cmdk
```

### Stack Breakdown

| Layer | Technology | Purpose | Bundle Impact |
|-------|------------|---------|---------------|
| **Primitives** | Radix UI | Accessible, unstyled behavior | ~2-5KB per component |
| **Components** | shadcn/ui | Pre-styled, copy-paste ownership | ~0KB (just Tailwind classes) |
| **Styling** | Tailwind CSS | Utility-first CSS | ~10-15KB purged |
| **Animation** | Framer Motion | Production-grade motion | ~30-40KB (tree-shakeable) |
| **Icons** | Lucide React | Consistent icon set | ~1-2KB per icon used |

### Font Configuration (next/font)

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
// OR for Geist (Vercel's font):
import { GeistSans } from 'geist/font/sans'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

```css
/* tailwind.config.ts */
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
}
```

### CSS Variables Setup

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode values */
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Performance Guardrails

### ⚠️ NON-NEGOTIABLE REQUIREMENT
Performance is a constraint, not a "nice to have." Every feature addition must be evaluated against these targets.

### Core Targets

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **Lighthouse Performance** | 90+ | Never below 85 |
| **First Contentful Paint (FCP)** | < 1.8s | Never above 2.5s |
| **Largest Contentful Paint (LCP)** | < 2.5s | Never above 4.0s |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Never above 0.25 |
| **Time to Interactive (TTI)** | < 3.5s | Never above 5.0s |
| **Total Bundle Size** | < 150KB gzipped | Never above 200KB |

### Image Optimization Checklist

- ✅ **WebP format** for all photographs
- ✅ **SVG format** for logos, icons, simple graphics
- ✅ **Lazy loading** on all below-fold images
- ✅ **Explicit dimensions** (`width` and `height` attributes)
- ✅ **Next.js `<Image>`** component (automatic optimization)
- ✅ **Responsive `srcset`** for different screen sizes
- ⚠️ **Flag any image over 200KB** before optimization

```tsx
// ALWAYS use Next.js Image component
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  priority // Only for above-fold images
  className="object-cover"
/>

// For below-fold images
<Image
  src="/gallery-1.webp"
  alt="Project photo"
  width={600}
  height={400}
  loading="lazy" // Default, but explicit is good
/>
```

### Third-Party Script Audit

| Script Type | Approach |
|-------------|----------|
| **Analytics (GA4)** | Load async, consider `afterInteractive` strategy |
| **Facebook Pixel** | Load after initial render |
| **Google Fonts** | Use `next/font` for self-hosting (eliminates external request) |
| **Embeds (Matterport, YouTube)** | Lazy load with facade/placeholder |
| **Chat widgets** | Load on user interaction, not page load |
| **Maps** | Static image placeholder → load on click |

**Red Flag Triggers:**
- ❌ More than 3 third-party scripts on initial load
- ❌ Any render-blocking script
- ❌ Total third-party weight > 100KB
- ❌ Scripts loading before LCP

```tsx
// next/script strategies
import Script from 'next/script'

// Analytics - load after page is interactive
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>

// Non-critical - load when browser is idle
<Script
  src="https://some-widget.js"
  strategy="lazyOnload"
/>
```

### Animation Performance Rules

| ✅ DO | ❌ DON'T |
|-------|---------|
| Animate `transform` and `opacity` | Animate `width`, `height`, `margin`, `padding` |
| Use `will-change` sparingly and remove after | Overuse `will-change` (causes memory bloat) |
| Respect `prefers-reduced-motion` | Force animations on users who disabled them |
| Lazy load Framer Motion per-page | Import entire library on every page |
| Use CSS transitions for simple hovers | Use JS animation for things CSS handles |
| Keep animations under 300ms for UI feedback | Long animations that feel sluggish |

```tsx
// Respect reduced motion
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

### Pre-Deployment Performance Checklist

```
□ Lighthouse audit run (Performance score recorded)
□ No new third-party scripts without explicit discussion
□ All images optimized (WebP/SVG, lazy loaded, sized)
□ Bundle analyzer checked (no surprise bloat)
□ Mobile tested on real device (not just DevTools)
□ Core Web Vitals in green (PageSpeed Insights)
□ Framer Motion only imported where used
□ No layout shift on page load
```

### Performance Budget

> **Hard Rule:** CRM Services (and all projects) will maintain a total page weight under 1MB and load in under 3 seconds on 3G connections. Any feature that would push over this budget requires explicit approval and documented justification.

---

## 5. Retrofitting Existing Sites

### Difficulty Assessment

| Current Stack | Difficulty | Timeline |
|---------------|------------|----------|
| Next.js + Tailwind (App Router) | ✅ EASY | 1-2 days setup, then incremental |
| Next.js + Tailwind (Pages Router) | ✅ EASY | Same as above, minor pattern differences |
| Next.js without Tailwind | 🟡 MEDIUM | Add Tailwind first (1-2 days), then proceed |
| Plain React (no Next.js) | 🟠 MEDIUM-HIGH | Consider Next.js migration |
| WordPress/Static HTML | 🔴 HIGH | Near-complete rebuild |
| Website builders (Wix/Squarespace) | ❌ NOT POSSIBLE | Full rebuild required |

### Phase 1: Foundation (1-2 hours)

#### Step 1: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Choose options:
- TypeScript: Yes
- Style: Default
- Base color: Slate (or your preference)
- CSS variables: Yes
- React Server Components: Yes (for App Router)
- Tailwind config: tailwind.config.ts
- Components directory: @/components
- Utils: @/lib/utils

#### Step 2: Install Framer Motion

```bash
npm install framer-motion
```

#### Step 3: Add Modern Font

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
```

#### Step 4: Update Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... rest of shadcn colors
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### Phase 2: Quick Wins (Days 1-2)

#### Add Page Transitions

```tsx
// components/PageTransition.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Usage in page.tsx
export default function Page() {
  return (
    <PageTransition>
      {/* page content */}
    </PageTransition>
  )
}
```

#### Add shadcn/ui Button

```bash
npx shadcn@latest add button
```

```tsx
// Replace existing buttons
import { Button } from '@/components/ui/button'

// Before
<button className="bg-red-600 text-white px-4 py-2 rounded">
  Request Estimate
</button>

// After
<Button variant="default" size="lg">
  Request Estimate
</Button>
```

#### Add Toast Notifications

```bash
npm install sonner
```

```tsx
// app/layout.tsx
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}

// Usage
import { toast } from 'sonner'

toast.success('Form submitted successfully!')
toast.error('Something went wrong')
```

### Phase 3: Incremental Enhancement (Ongoing)

Replace components one at a time as you touch each area:

1. **Forms** → shadcn/ui Input, Textarea, Select
2. **Navigation** → Add hover animations
3. **Cards** → shadcn/ui Card with hover effects
4. **Modals/Dialogs** → shadcn/ui Dialog
5. **Dropdowns** → shadcn/ui DropdownMenu
6. **Loading states** → Skeleton components

---

## 6. Animation Patterns & Libraries

### Framer Motion Essentials

#### Fade In on Mount

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

#### Slide Up on Mount

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  Content
</motion.div>
```

#### Staggered List Items

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
  {items.map(i => (
    <motion.li key={i} variants={item}>
      {i}
    </motion.li>
  ))}
</motion.ul>
```

#### Hover Scale Effect

```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

#### Scroll-Triggered Animation

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimateOnScroll({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

### Effect Libraries (Copy-Paste Components)

| Library | Best For | URL |
|---------|----------|-----|
| **Aceternity UI** | Dramatic effects (glowing borders, parallax, text effects) | [ui.aceternity.com](https://ui.aceternity.com) |
| **Magic UI** | 3D effects, scratch reveals, animated gradients | [magicui.design](https://magicui.design) |
| **shadcn/ui** | Base components, clean and accessible | [ui.shadcn.com](https://ui.shadcn.com) |
| **hover.dev** | Hover effects specifically | [hover.dev](https://hover.dev) |

### Effect Intensity Levels

**Conservative (Recommended for most business sites):**
- Page transitions (fade)
- Button hover states (subtle scale)
- Form submission feedback (toast)
- Loading skeletons

**Moderate:**
- Scroll-triggered section reveals
- Staggered list animations
- Card hover lift effects
- Active tab indicator slides

**Bold (Use sparingly, marketing sites):**
- Background gradient animations
- Parallax scroll effects
- Text reveal animations
- Glowing borders
- 3D card tilts

---

## 7. Component Implementation Guide

### Button with Loading State

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps {
  loading?: boolean
  children: React.ReactNode
  [key: string]: any
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
```

### Card with Hover Effect

```tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HoverCard({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}
```

### Animated Navigation Tab Indicator

```tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Home', 'Services', 'About', 'Contact']

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <div className="relative flex gap-2 p-1 bg-muted rounded-lg">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActiveTab(i)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === i ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {activeTab === i && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-background rounded-md shadow-sm"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  )
}
```

### Skeleton Loading Component

```tsx
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

// Usage
function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
```

---

## 8. Pre-Deployment Checklist

### Performance

```
□ Lighthouse Performance score: _____ (target: 90+)
□ LCP: _____ (target: < 2.5s)
□ FCP: _____ (target: < 1.8s)
□ CLS: _____ (target: < 0.1)
□ Total page weight: _____ (target: < 1MB)
□ JS bundle size: _____ (target: < 150KB gzipped)
```

### Images

```
□ All images in WebP format
□ All images have explicit width/height
□ Below-fold images are lazy loaded
□ No image over 200KB
□ SVGs used for logos/icons
```

### Animations

```
□ prefers-reduced-motion respected
□ No animations on layout properties (width, height, margin)
□ Framer Motion only imported where used
□ Animation durations under 300ms for UI feedback
```

### Accessibility

```
□ Focus states visible on all interactive elements
□ Color contrast meets WCAG AA (4.5:1 for text)
□ All images have alt text
□ Keyboard navigation works
□ No motion that could trigger vestibular issues
```

### Mobile

```
□ Touch targets minimum 44x44px
□ No horizontal scroll
□ Tested on real mobile device
□ Font sizes readable without zoom
```

---

## 9. Reference Sites & Resources

### Design Inspiration

| Site | Why Reference It |
|------|------------------|
| [linear.app](https://linear.app) | Overall polish benchmark |
| [vercel.com](https://vercel.com) | Subtle animations, professional |
| [stripe.com](https://stripe.com) | Gradient usage, documentation style |
| [raycast.com](https://raycast.com) | Command palette, keyboard-first |
| [notion.so](https://notion.so) | Clean product UI |

### Component Libraries

| Resource | URL |
|----------|-----|
| shadcn/ui | [ui.shadcn.com](https://ui.shadcn.com) |
| Aceternity UI | [ui.aceternity.com](https://ui.aceternity.com) |
| Magic UI | [magicui.design](https://magicui.design) |
| Radix UI | [radix-ui.com](https://radix-ui.com) |

### Learning Resources

| Topic | Resource |
|-------|----------|
| Framer Motion | [framer.com/motion](https://www.framer.com/motion/) |
| Tailwind CSS | [tailwindcss.com](https://tailwindcss.com) |
| Next.js | [nextjs.org](https://nextjs.org) |
| Web Vitals | [web.dev/vitals](https://web.dev/vitals/) |

### Tools

| Tool | Purpose |
|------|---------|
| [PageSpeed Insights](https://pagespeed.web.dev/) | Performance testing |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/) | Comprehensive audit |
| [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) | JS bundle inspection |
| [Squoosh](https://squoosh.app/) | Image compression |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | SVG optimization |

---

## Appendix: Quick Reference Cards

### Animation Timing Cheat Sheet

| Action | Duration | Easing |
|--------|----------|--------|
| Button hover | 150ms | ease-out |
| Page transition | 300ms | ease-out |
| Modal open | 200ms | ease-out |
| Modal close | 150ms | ease-in |
| Toast appear | 300ms | spring |
| Scroll reveal | 500ms | ease-out |

### Spacing Scale

```
4px  - gap-1  - Tight element spacing
8px  - gap-2  - Related element groups
12px - gap-3  - Form fields
16px - gap-4  - Section padding (mobile)
24px - gap-6  - Card padding
32px - gap-8  - Section padding (desktop)
48px - gap-12 - Major section breaks
64px - gap-16 - Page section dividers
```

### Color Usage

```
text-foreground     - Primary text
text-muted-foreground - Secondary text, labels
bg-background       - Page background
bg-card             - Card/elevated surfaces
bg-muted            - Subtle backgrounds, hover states
border-border       - Borders, dividers
ring-ring           - Focus rings
bg-primary          - Primary buttons, CTAs
bg-destructive      - Error states, delete actions
```

---

**Document Owner:** Johnny Boy (Founder)  
**Technical Partner:** Claude  
**Last Updated:** 2026-01-25  
**Next Review:** After first implementation

---

*This playbook is a living document. Update it as patterns evolve and new learnings emerge.*
