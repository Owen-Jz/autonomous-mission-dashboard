import { NextRequest, NextResponse } from 'next/server';
import { createFigmaFile, exportFigmaImage, generateDesignFromTrends, generateSitemapFrames } from '@/lib/figma';

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (!FIGMA_TOKEN) {
      return NextResponse.json(
        { error: 'Figma token not configured' },
        { status: 500 }
      );
    }

    if (action === 'create') {
      const { name, trends, sitemap } = body;

      // Create a new Figma file
      const fileResult = await createFigmaFile(name || 'New Design', FIGMA_TOKEN);
      
      // Generate designs from trends
      const designs = trends 
        ? generateDesignFromTrends(trends, sitemap || [])
        : [];

      return NextResponse.json({
        success: true,
        fileKey: fileResult.key,
        shareUrl: fileResult.shareUrl,
        designs,
        message: 'Figma file created. Note: Full design automation requires Figma Plugin API. This creates the file structure.',
      });
    }

    if (action === 'export') {
      const { fileKey, nodeIds, format, scale } = body;

      if (!fileKey || !nodeIds?.length) {
        return NextResponse.json(
          { error: 'fileKey and nodeIds are required' },
          { status: 400 }
        );
      }

      const result = await exportFigmaImage(
        fileKey,
        nodeIds,
        FIGMA_TOKEN,
        format || 'png',
        scale || 2
      );

      return NextResponse.json({
        success: true,
        images: result.images,
      });
    }

    if (action === 'generatePreview') {
      const { trends, sitemap } = body;

      // Generate design data that can be used to create a preview
      const designs = generateDesignFromTrends(
        trends || {
          colors: ['#0F0F0F', '#1A1A2E', '#6366F1'],
          layouts: ['Bento Grid', 'Hero Centered', 'Card Based'],
          typography: ['Inter', 'Poppins'],
          styles: ['Dark Mode', 'Glassmorphism'],
        },
        sitemap || ['Home', 'Features', 'Pricing', 'Contact']
      );

      return NextResponse.json({
        success: true,
        preview: {
          designs,
          figmaUrl: 'https://www.figma.com/files',
          note: 'To auto-create designs in Figma, we need to build a Figma Plugin. This provides the design data structure.',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Figma API error:', error);
    return NextResponse.json(
      { error: 'Failed to process Figma request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    configured: !!FIGMA_TOKEN,
    message: FIGMA_TOKEN 
      ? 'Figma API is configured and ready'
      : 'Figma token not found in environment',
  });
}
