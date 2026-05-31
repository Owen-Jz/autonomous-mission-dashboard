import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getCollection, COLLECTIONS } from '@/lib/mongodb';

interface Department {
  id: string;
  title: string;
  botName: string;
  role: string;
  href: string;
  status: 'Running' | 'Completed' | 'Idle';
  workers: Worker[];
  createdAt: Date;
  updatedAt: Date;
}

interface Worker {
  id: string;
  departmentId: string;
  name: string;
  description: string;
  status: 'Idle' | 'Running' | 'Completed' | 'Failed';
  order: number;
  promptTemplate?: string;
  expectedOutput?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Seed data for Design department (Picaso) with full workflow
const DESIGN_DEPARTMENT_SEED: Department = {
  id: 'design',
  title: 'Designs',
  botName: 'P.I.C.A.S.O👨🎨',
  role: 'Design Engineer',
  href: '/design',
  status: 'Idle',
  workers: [
    {
      id: 'design_worker_1',
      departmentId: 'design',
      name: 'Scrape Top Designs',
      description: 'Scrape top Designs from Dribbble, Behance, Awwwards',
      status: 'Idle',
      order: 1,
      promptTemplate: 'Search and scrape the top trending designs from Dribbble, Behance, and Awwwards. Focus on recent popular projects in the last 30 days. Return a list of the top 20 designs with their colors, layouts, and style characteristics. Store the URLs and key design elements.',
      expectedOutput: 'List of scraped designs with URLs, colors, and design elements',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'design_worker_2',
      departmentId: 'design',
      name: 'Export Patterns',
      description: 'Export Patterns - Layout, Colors, Typography, Styles',
      status: 'Idle',
      order: 2,
      promptTemplate: 'Based on the scraped designs from the previous task, extract and export the design patterns. Create a structured pattern library including: 1) Color palettes (hex codes), 2) Typography choices (fonts, sizes, weights), 3) Layout structures (grids, spacing), 4) Common UI styles. Format as structured data.',
      expectedOutput: 'Structured pattern library with colors, typography, layouts, styles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'design_worker_3',
      departmentId: 'design',
      name: 'Generate Sitemap & Structure',
      description: 'Generate Similar Project, Sitemap, Structure Etc',
      status: 'Idle',
      order: 3,
      promptTemplate: 'Using the pattern library created previously, generate a complete project sitemap and structure. Create: 1) A detailed sitemap showing all pages, 2) Component structure breakdown, 3) Navigation flow, 4) File organization for a Next.js project. Output as HTML/Tailwind project structure.',
      expectedOutput: 'Sitemap, component structure, file organization',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'design_worker_4',
      departmentId: 'design',
      name: 'Generate Landing Page',
      description: 'Generate Landing Page - Dashboard, Startup website',
      status: 'Idle',
      order: 4,
      promptTemplate: 'Using the sitemap and structure from the previous worker, generate a complete landing page. Create a modern, responsive landing page using Next.js, React, and Tailwind CSS. Include: Hero section, features, pricing, about, contact, and footer. Make it production-ready.',
      expectedOutput: 'Complete landing page code with preview link',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'design_worker_5',
      departmentId: 'design',
      name: 'Re-evaluate and Fix',
      description: 'Re-evaluate Generated Design, Find Flaws and Fix',
      status: 'Idle',
      order: 5,
      promptTemplate: 'Review the generated landing page for design flaws, inconsistencies, and areas for improvement. Check for: 1) Color contrast issues, 2) Spacing inconsistencies, 3) Typography problems, 4) Responsiveness issues, 5) Accessibility concerns. Provide a detailed report and fix all identified issues.',
      expectedOutput: 'List of issues found and fixes applied',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'design_worker_6',
      departmentId: 'design',
      name: 'Evaluate Design System',
      description: 'Evaluate Design System and Integrate features',
      status: 'Idle',
      order: 6,
      promptTemplate: 'Evaluate the overall design system created. Check for consistency across all components. Review: 1) Button styles, 2) Form elements, 3) Card designs, 4) Navigation patterns, 5) Animation consistency. Integrate any missing features and ensure the design system is complete and ready for development handoff.',
      expectedOutput: 'Final design system evaluation and feature integration report',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function GET() {
  try {
    await connectToDatabase();
    const departmentsCollection = getCollection(COLLECTIONS.DEPARTMENTS);

    // Check if departments exist
    const count = await departmentsCollection.countDocuments();
    
    if (count === 0) {
      // Seed the Design department
      await departmentsCollection.insertOne(DESIGN_DEPARTMENT_SEED);
      console.log('Seeded Design department');
    }

    const departments = await departmentsCollection.find({}).toArray();

    return NextResponse.json({ departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, departmentId, workerId, status } = body;

    await connectToDatabase();
    const departmentsCollection = getCollection(COLLECTIONS.DEPARTMENTS);

    if (action === 'updateStatus') {
      await departmentsCollection.updateOne(
        { id: departmentId },
        { $set: { status, updatedAt: new Date() } }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'updateWorkerStatus') {
      const { workerId: wId, status: workerStatus } = body;
      await departmentsCollection.updateOne(
        { id: departmentId, 'workers.id': wId },
        { $set: { 'workers.$.status': workerStatus, updatedAt: new Date() } }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'reset') {
      // Reset department to initial state
      await departmentsCollection.updateOne(
        { id: departmentId },
        { 
          $set: { 
            status: 'Idle',
            workers: DESIGN_DEPARTMENT_SEED.workers,
            updatedAt: new Date() 
          } 
        }
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 500 }
    );
  }
}
