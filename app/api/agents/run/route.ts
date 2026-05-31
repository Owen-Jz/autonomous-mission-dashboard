import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getCollection, COLLECTIONS } from '@/lib/mongodb';

const OPENCLAW_URL = process.env.OPENCLAW_URL || 'http://127.0.0.1:18789';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN;

// Timezone: Africa/Lagos (UTC+1)
function getTimestamp(): string {
  return new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
}

// Set to true to use mock responses instead of real agent calls
const USE_MOCK_MODE = true;

// Detailed mock responses for each worker
const MOCK_RESPONSES: Record<string, string> = {
  'design_worker_1': `🎨 SCRAPED DESIGNS FROM DRIBBLE, BEHANCE, AWWWARDS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ANALYSIS COMPLETE - Top 20 Designs Analyzed

🏆 TOP 10 TRENDING DESIGNS:

1. BENTO GRID LAYOUTS
   - Description: Modular, grid-based designs popular for SaaS dashboards
   - Frequency: 18/20 designs use this pattern
   - Best For: Dashboard interfaces, data visualization panels

2. DARK MODE HEAVY
   - Description: Near-black backgrounds (#0F0F0F, #1A1A2E) with vibrant accent colors
   - Frequency: 16/20 designs
   - Key Colors: #0F0F0F, #1A1A2E, #2D2D2D

3. GLASSMORPHISM
   - Description: Frosted glass effects with backdrop-blur
   - Frequency: 14/20 designs
   - Properties: backdrop-filter: blur(10px), rgba backgrounds

4. LARGE TYPOGRAPHY
   - Description: Bold, oversized headings (48-72px)
   - Frequency: 15/20 designs
   - Font: Inter Bold, Playfair Display

5. GRADIENT BLURS
   - Description: Soft, colorful background orbs
   - Frequency: 12/20 designs
   - Effect: blur(80px) with vibrant gradients

6. MICRO-INTERACTIONS
   - Description: Subtle hover/click animations
   - Frequency: 17/20 designs
   - Duration: 200-300ms ease-out

7. MINIMAL NAVIGATION
   - Description: Hidden hamburger menus, minimal headers
   - Frequency: 11/20 designs
   - Pattern: Slide-out menus on mobile

8. CARD-BASED CONTENT
   - Description: Modular card components
   - Frequency: 19/20 designs
   - Structure: Rounded corners (12-16px), subtle shadows

9. FLOATING ELEMENTS
   - Description: Elevated shadows, floating cards
   - Frequency: 13/20 designs
   - Shadow: 0 8px 32px rgba(0,0,0,0.12)

10. ASYMMETRICAL LAYOUTS
    - Description: Breaking the grid, intentional imbalance
    - Frequency: 8/20 designs
    - Trend: Creative, editorial-style layouts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 EXTRACTED COLOR PALETTE:

PRIMARY COLORS:
- #0F0F0F (Rich Black)
- #1A1A2E (Dark Navy)
- #2D2D2D (Charcoal)

ACCENT COLORS:
- #6366F1 (Indigo)
- #8B5CF6 (Purple)
- #EC4899 (Pink)
- #10B981 (Emerald)
- #F59E0B (Amber)

SUPPORTING:
- #6B7280 (Gray 500)
- #9CA3AF (Gray 400)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 DESIGN TRENDS SUMMARY:
- Dark themes dominate (85%)
- Gradient usage increased 40% YoY
- Card-based layouts are universal
- Typography is getting bolder
- Micro-interactions are expected, not optional

Sources: Dribbble (trending), Behance (best of month), Awwwards (daily)`,

  'design_worker_2': `📋 DESIGN PATTERNS EXPORTED - COMPREHENSIVE LIBRARY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 COLOR PALETTES (Complete System):

PRIMARY COLORS:
- #0F0F0F (Rich Black) - Main background
- #1A1A2E (Dark Navy) - Secondary background
- #2D2D2D (Charcoal) - Cards/elevated surfaces

ACCENT COLORS:
- #6366F1 (Indigo) - Primary actions
- #8B5CF6 (Purple) - Secondary highlights
- #EC4899 (Pink) - Accent/badges
- #10B981 (Emerald) - Success states
- #F59E0B (Amber) - Warnings
- #EF4444 (Red) - Errors/destructive

SEMANTIC:
- #3B82F6 (Blue) - Information
- #22C55E (Green) - Positive
- #EAB308 (Yellow) - Caution

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔤 TYPOGRAPHY SYSTEM:

HEADINGS (Display):
- H1: Inter Bold, 72px, -0.02em tracking
- H2: Inter Bold, 48px, -0.01em tracking
- H3: Inter Semibold, 36px
- H4: Inter Semibold, 24px

BODY:
- Large: Inter Regular, 18px, 1.6 line-height
- Base: Inter Regular, 16px, 1.5 line-height
- Small: Inter Regular, 14px, 1.5 line-height

CAPTIONS:
- Caption: Inter Medium, 12px, 1.4 line-height
- Overline: Inter Bold, 10px, 0.1em tracking, UPPERCASE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📐 LAYOUT STRUCTURES:

GRID SYSTEM:
- 12-column grid
- Gutter: 24px
- Margin: 80px (desktop), 24px (mobile)
- Max-width: 1440px

BENTO GRID:
- Card sizes: 1x1, 2x1, 2x2, 3x2
- Gap: 16px
- Border-radius: 16px

SPACING SCALE:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 48px
- 2xl: 80px
- 3xl: 120px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💎 UI COMPONENT STYLES:

BUTTONS:
- Primary: #6366F1 bg, white text, 12px 24px padding, 8px radius
- Secondary: transparent, #6366F1 border, 12px 24px padding
- Ghost: transparent, hover: rgba(255,255,255,0.05)

CARDS:
- Background: #1A1A2E
- Border: 1px solid rgba(255,255,255,0.08)
- Shadow: 0 4px 24px rgba(0,0,0,0.12)
- Border-radius: 16px

INPUTS:
- Background: #0F0F0F
- Border: 1px solid #2D2D2D
- Focus: #6366F1 border
- Border-radius: 8px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ ANIMATION SPECS:

TRANSITIONS:
- Fast: 150ms ease-out
- Base: 200ms ease-out
- Slow: 300ms ease-out
- Page: 500ms ease-in-out

HOVER EFFECTS:
- Scale: 1.02
- Shadow: translateY(-2px)
- Background: opacity shift

LOADING:
- Skeleton shimmer: 1.5s infinite
- Spinner: 0.8s linear infinite`,

  'design_worker_3': `🗺️ SITEMAP & PROJECT STRUCTURE GENERATED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 PAGES STRUCTURE:

/
├── Home (Landing Page)
│   ├── Hero Section
│   ├── Features Grid
│   ├── Social Proof
│   ├── Pricing Table
│   ├── FAQ
│   └── CTA Section
│
├── /features
│   ├── Feature Overview
│   ├── Use Cases
│   └── Integration Docs
│
├── /pricing
│   ├── Pricing Tiers
│   ├── Comparison Table
│   ├── FAQ
│   └── Custom Quote Request
│
├── /about
│   ├── Company Story
│   ├── Team
│   ├── Careers
│   └── Contact
│
├── /contact
│   ├── Contact Form
│   ├── Office Locations
│   └── Support Options
│
├── /blog
│   ├── Blog Index
│   ├── Blog Post Template
│   ├── Categories
│   └── Search
│
└── /dashboard (Authenticated)
    ├── Overview
    ├── Settings
    ├── Profile
    └── [User Content]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️ COMPONENT STRUCTURE:

/src/components
├── /ui (Base Components)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Toggle.tsx
│   ├── Select.tsx
│   └── Modal.tsx
│
├── /layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   └── Container.tsx
│
├── /sections (Page Sections)
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── CTASection.tsx
│   ├── FAQ.tsx
│   └── BlogCard.tsx
│
└── /forms
    ├── ContactForm.tsx
    ├── LoginForm.tsx
    └── SubscribeForm.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 FILE ORGANIZATION:

/project-root
├── /app (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── /features
│   ├── /pricing
│   ├── /about
│   ├── /contact
│   ├── /blog
│   └── /dashboard
│
├── /src
│   ├── /components
│   ├── /lib
│   ├── /hooks
│   └── /types
│
├── /public
│   ├── /images
│   ├── /icons
│   └── /fonts
│
├── tailwind.config.ts
├── next.config.js
└── package.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 NAVIGATION FLOW:

LANDING → Features → Pricing → Sign Up
    ↓                    ↓
  About              Contact
    ↓
  Careers

USER FLOW:
Landing → Register → Dashboard → Create Project → View Analytics`,

  'design_worker_4': `💻 LANDING PAGE CODE GENERATED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FILES GENERATED:

1. /src/app/page.tsx (Main Landing Page)
   - Complete Hero with gradient background
   - Features grid (6 items)
   - Social proof section
   - Pricing preview
   - FAQ accordion
   - CTA section
   - Footer

2. /src/components/sections/Hero.tsx
   - Animated headline
   - Subheadline with typewriter effect
   - CTA buttons
   - Background gradient orbs

3. /src/components/sections/Features.tsx
   - 6 feature cards
   - Icon integration
   - Hover effects

4. /src/components/sections/Pricing.tsx
   - 3 pricing tiers
   - Toggle (monthly/yearly)
   - Feature comparison
   - CTA buttons

5. /src/components/sections/CTA.tsx
   - Email capture form
   - Social links

6. /src/components/ui/Button.tsx
   - Multiple variants
   - Size options
   - Loading states

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 COMPONENT PREVIEW:

Hero Section:
- Full viewport height on load
- Gradient background: radial-gradient from #6366F1/20 to transparent
- Headline: "Transform Your Business"
- Subheadline: Animated text cycling through values
- Two CTAs: "Get Started" + "Watch Demo"

Features Grid:
- 3x2 grid on desktop, stack on mobile
- Icons from Lucide React
- Hover: scale(1.02) + shadow increase

Pricing Cards:
- Highlighted "Popular" badge on middle tier
- Feature checkmarks
- Monthly/Yearly toggle saves 20%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 TECHNICAL IMPLEMENTATION:

Dependencies Used:
- React 19
- Tailwind CSS 4
- Framer Motion (animations)
- Lucide React (icons)
- GSAP (advanced animations)

Responsive Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Performance:
- Lazy loading for below-fold content
- Optimized images with next/image
- Code splitting per route

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN TOKENS APPLIED:

Colors from worker 2:
- Primary: #0F0F0F, #1A1A2E
- Accent: #6366F1, #8B5CF6

Spacing from worker 2:
- Section padding: 80px (desktop)
- Component gap: 24px

Typography:
- Headings: Inter Bold
- Body: Inter Regular

Animations:
- Page transitions: 300ms ease-out
- Hover effects: 200ms ease-out
- Scroll reveals: staggered 100ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 PREVIEW AVAILABLE AT: http://localhost:3000`,

  'design_worker_5': `🔍 DESIGN EVALUATION & FIXES COMPLETE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUES FOUND & FIXED:

1. ✅ COLOR CONTRAST (Fixed)
   - Issue: Some text on #1A1A2E background was 3.8:1 ratio
   - Fix: Changed to #E5E5E5 for better contrast (7.2:1)
   - Files: Hero.tsx, Features.tsx

2. ✅ SPACING INCONSISTENCY (Fixed)
   - Issue: Mixed spacing values (16px, 24px, 32px)
   - Fix:ized to 8 Standardpx grid (8, 16, 24, 48, 80)
   - Files: All section components

3. ✅ TYPOGRAPHY HIERARCHY (Fixed)
   - Issue: H2 and H3 too similar (32px vs 28px)
   - Fix: H2 = 48px, H3 = 32px
   - Files: All heading components

4. ✅ BUTTON INCONSISTENCY (Fixed)
   - Issue: Some buttons 8px radius, others 12px
   - Fix: Standardized to 8px radius
   - Files: Button.tsx, CTA.tsx

5. ✅ RESPONSIVE GUTTER (Fixed)
   - Issue: Mobile had no side margins
   - Fix: Added 24px padding on mobile
   - Files: Container.tsx, all sections

6. ✅ CARD HOVER STATES (Fixed)
   - Issue: Inconsistent hover behavior
   - Fix: Standardized to scale(1.02) + shadow
   - Files: Card.tsx, FeatureCard.tsx

7. ✅ IMAGE ASPECT RATIOS (Fixed)
   - Issue: Different aspect ratios in gallery
   - Fix: Standardized to 16:9 for all images
   - Files: Testimonials.tsx, Gallery.tsx

8. ✅ ACCESSIBILITY - FOCUS STATES (Fixed)
   - Issue: No visible focus indicators
   - Fix: Added 2px #6366F1 outline on focus
   - Files: All interactive components

9. ✅ LOADING STATES (Added)
   - Issue: No skeleton states during load
   - Fix: Added skeleton components
   - Files: All data-fetching components

10. ✅ FORM VALIDATION (Enhanced)
    - Issue: Basic validation only
    - Fix: Added real-time validation + error messages
    - Files: ContactForm.tsx, LoginForm.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 PERFORMANCE IMPROVEMENTS:

- Reduced bundle size by 23%
- Improved LCP (Largest Contentful Paint) by 40%
- Fixed CLS (Cumulative Layout Shift) issues
- Added proper image optimization
- Implemented code splitting

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ALL ISSUES RESOLVED - DESIGN READY FOR PRODUCTION`,

  'design_worker_6': `🎨 DESIGN SYSTEM EVALUATION & INTEGRATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN SYSTEM AUDIT COMPLETE:

📦 COMPONENTS INVENTORY:

CORE (12 components):
- Button (4 variants: primary, secondary, ghost, danger)
- Card (3 variants: default, elevated, interactive)
- Input (text, email, password, textarea, select)
- Badge (4 variants: default, success, warning, error)
- Avatar (image, initials, with status)
- Toggle (switch, checkbox style)
- Modal (dialog, confirm, fullscreen)
- Dropdown (single select, multi select)
- Tabs (horizontal, vertical, pill)
- Tooltip (light, dark, arrow)
- Toast (success, error, warning, info)
- Skeleton (text, avatar, card, table)

LAYOUT (6 components):
- Container (fluid, fixed, centered)
- Grid (12-column, responsive)
- Stack (flex column with gap)
- Divider (horizontal, vertical, with label)
- Section (with padding variants)
- AspectRatio (16:9, 4:3, 1:1, auto)

COMPOSED (8 components):
- Header (with nav, actions, user menu)
- Footer (with links, social, newsletter)
- Sidebar (collapsible, with groups)
- CardGroup (grid, masonry, carousel)
- FormField (label, input, error, hint)
- PricingCard (with feature list, CTA)
- TestimonialCard (quote, author, avatar)
- BlogCard (image, title, excerpt, meta)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CONSISTENCY CHECKS:

COLOR SYSTEM:
- All components use design tokens ✅
- No hardcoded colors found ✅
- Dark mode fully supported ✅

TYPOGRAPHY:
- Font weights: 400, 500, 600, 700 ✅
- Line heights: 1.2, 1.4, 1.5, 1.6 ✅
- Responsive font scaling applied ✅

SPACING:
- 8px grid system ✅
- Consistent margins/padding ✅
- No arbitrary values ✅

BORDERS:
- Standardized border-radius (4, 8, 12, 16) ✅
- Border colors use design tokens ✅

ANIMATIONS:
- Transition durations consistent ✅
- Easing curves standardized ✅
- Respect user prefers-reduced-motion ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 FEATURE INTEGRATIONS COMPLETE:

1. Theme Toggle
   - Light/Dark mode switch
   - System preference detection
   - Persisted to localStorage

2. Responsive Navigation
   - Mobile hamburger menu
   - Desktop horizontal nav
   - Active state indicators

3. Loading States
   - Skeleton screens
   - Spinner components
   - Progress indicators

4. Error Handling
   - Toast notifications
   - Error boundaries
   - Retry mechanisms

5. Form System
   - Validation schemas
   - Error messages
   - Success feedback

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DELIVERABLES SUMMARY:

✅ Design Patterns Library (Worker 2)
✅ Project Sitemap & Structure (Worker 3)
✅ Landing Page Code (Worker 4)
✅ QA & Bug Fixes (Worker 5)
✅ Design System Integration (Worker 6)

🎉 FULL DESIGN WORKFLOW COMPLETE!

The design system is now production-ready with:
- 26 documented components
- Responsive across all breakpoints
- Accessibility compliant (WCAG 2.1 AA)
- Performance optimized
- Dark mode support`,

};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, prompt, workerId, departmentId } = body;

    if (!agentId || !prompt) {
      return NextResponse.json(
        { error: 'agentId and prompt are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();
    const tasksCollection = getCollection(COLLECTIONS.TASKS);
    const departmentsCollection = getCollection(COLLECTIONS.DEPARTMENTS);

    // Create task record
    const taskId = `task_${Date.now()}`;
    const timestamp = getTimestamp();
    
    const task = {
      id: taskId,
      workerId,
      departmentId,
      name: workerId,
      status: 'Running',
      input: prompt,
      logs: [`[${timestamp}] Starting task with ${agentId}...`],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await tasksCollection.insertOne(task);

    let agentResponse = '';

    if (USE_MOCK_MODE) {
      agentResponse = MOCK_RESPONSES[workerId] || `Mock response for ${workerId}. This is a simulated agent output.`;
      console.log(`[MOCK] Using mock response for ${workerId}`);
    } else {
      agentResponse = `Agent integration not configured.`;
    }

    // Update task with response - mark as Completed
    await tasksCollection.updateOne(
      { id: taskId },
      { 
        $set: {
          status: 'Completed',
          output: agentResponse,
          logs: [...task.logs, `[${getTimestamp()}] Task completed successfully`],
          updatedAt: new Date(),
        }
      }
    );

    // Update department worker status in MongoDB - mark as Completed
    if (departmentId && workerId) {
      await departmentsCollection.updateOne(
        { id: departmentId, 'workers.id': workerId },
        { 
          $set: {
            'workers.$.status': 'Completed',
            'workers.$.output': agentResponse,
            'workers.$.logs': [
              `[${timestamp}] Starting...`,
              `[${getTimestamp()}] Task completed`,
              `✅ Worker completed successfully`
            ],
            updatedAt: new Date(),
          }
        }
      );
    }

    return NextResponse.json({
      success: true,
      taskId,
      response: agentResponse,
    });
  } catch (error) {
    console.error('Error running agent:', error);
    return NextResponse.json(
      { error: 'Failed to run agent' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    const workerId = searchParams.get('workerId');

    await connectToDatabase();
    const tasksCollection = getCollection(COLLECTIONS.TASKS);

    const query: Record<string, string> = {};
    if (departmentId) query.departmentId = departmentId;
    if (workerId) query.workerId = workerId;

    const tasks = await tasksCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
