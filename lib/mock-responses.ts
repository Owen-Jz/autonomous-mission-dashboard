import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getCollection, COLLECTIONS } from '@/lib/mongodb';

const OPENCLAW_URL = process.env.OPENCLAW_URL || 'http://127.0.0.1:18789';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN;

interface Task {
  id: string;
  workerId: string;
  departmentId: string;
  name: string;
  description: string;
  status: 'Idle' | 'Running' | 'Completed' | 'Failed';
  input?: string;
  output?: string;
  logs: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock responses for each worker - simulating what Picaso would generate
const MOCK_RESPONSES: Record<string, string> = {
  'design_worker_1': `🎨 TOP 10 TRENDING DESIGNS (Dribbble, Behance, Awwwards)

1. **Bento Grid Layouts** - Modular, grid-based designs
2. **Dark Mode Heavy** - Near-black backgrounds with vibrant accents
3. **Glassmorphism** - Frosted glass, blur effects
4. **Large Typography** - Bold, oversized headings
5. **Gradient Blurs** - Soft, colorful background orbs
6. **Micro-interactions** - Subtle hover/click animations
7. **Minimal Navigation** - Hidden hamburger menus
8. **Card-based Content** - Modular card components
9. **Floating Elements** - Elevated shadows
10. **Asymmetrical Layouts** - Breaking the grid

📌 COLOR PALETTE:
- #0F0F0F (near black)
- #1A1A2E (dark navy)
- #6366F1 (indigo)
- #8B5CF6 (purple)
- #10B981 (emerald)
- #F59E0B (amber)

Sources: 20 designs scraped from Dribbble trending, Behance best of month, Awwwards daily.`,

  'design_worker_2': `📋 DESIGN PATTERNS EXPORTED

🎨 COLOR PALETTES:
- Primary: #0F0F0F, #1A1A2E
- Accent: #6366F1, #8B5CF6
- Success: #10B981
- Warning: #F59E0B

🔤 TYPOGRAPHY:
- Headings: Inter Bold, 32-48px
- Body: Inter Regular, 14-16px
- Captions: Inter Medium, 12px

📐 LAYOUT STRUCTURES:
- 12-column grid system
- Bento grid layouts
- Hero sections with centered content
- Feature grids (2-4 columns)

💎 UI STYLES:
- Glassmorphism cards
- Subtle shadows (0 4px 20px rgba(0,0,0,0.1))
- Rounded corners (8-16px)
- Minimal borders`,

  'design_worker_3': `🗺️ SITE MAP GENERATED

📁 PAGES:
- Home (/)
- Features (/features)
- Pricing (/pricing)
- About (/about)
- Contact (/contact)
- Blog (/blog)
- Docs (/docs)

🏗️ COMPONENT STRUCTURE:
/components
  /ui (Button, Card, Input, Badge)
  /layout (Header, Footer, Sidebar)
  /sections (Hero, Features, PricingTable)
  /sections (Testimonials, CTA)

📦 FILE ORGANIZATION:
/app
  /page.tsx
  /features/page.tsx
  /pricing/page.tsx
  /about/page.tsx
  /contact/page.tsx
/lib
  /utils.ts
  /constants.ts
/components
/public

🌐 NAVIGATION FLOW:
Home → Features → Pricing → CTA
     ↘ About → Contact`,

  'design_worker_4': `💻 LANDING PAGE GENERATED

✅ Generated files:
- /app/page.tsx (Hero + Features + CTA)
- /app/globals.css (Tailwind config)
- /components/Hero.tsx
- /components/Features.tsx
- /components/Pricing.tsx
- /components/CTA.tsx
- /components/Footer.tsx

🎯 PREVIEW: http://localhost:3000

The landing page includes:
- Responsive hero with gradient background
- Feature grid with icons
- Pricing table with 3 tiers
- Call-to-action section
- Footer with links`,
};
