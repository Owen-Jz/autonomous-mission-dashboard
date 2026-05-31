import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getCollection, COLLECTIONS } from '@/lib/mongodb';

// Timezone: Africa/Lagos (UTC+1)
function getTimestamp(): string {
  return new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
}

interface Session {
  id: string;
  departmentId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  workers: SessionWorker[];
  outputs: {
    worker1?: {
      scrapedDesigns: string[];
      sources: string[];
    };
    worker2?: {
      patterns: {
        colors: string[];
        typography: string[];
        layouts: string[];
        styles: string[];
      };
    };
    worker3?: {
      sitemap: string;
      structure: string;
      files: string[];
    };
    worker4?: {
      generatedPages: string[];
      previewUrl?: string;
    };
    worker5?: {
      issuesFound: string[];
      fixes: string[];
    };
    worker6?: {
      designSystem评估: string;
      features: string[];
    };
  };
  notes: string[];
  emailSent: boolean;
}

interface SessionWorker {
  workerId: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  output?: string;
  logs: string[];
}

// Create a new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, departmentId } = body;

    await connectToDatabase();
    const sessionsCollection = getCollection(COLLECTIONS.SESSIONS);

    if (action === 'create') {
      const sessionId = `session_${Date.now()}`;
      const session: Session = {
        id: sessionId,
        departmentId,
        status: 'running',
        startedAt: new Date(),
        workers: [],
        outputs: {},
        notes: [],
        emailSent: false,
      };
      
      await sessionsCollection.insertOne(session);
      
      return NextResponse.json({ success: true, sessionId });
    }

    if (action === 'update') {
      const { sessionId, workerId, workerName, status, output, logs, workerData } = body;
      
      const updateFields: any = { updatedAt: new Date() };
      
      if (workerId) {
        // Update worker status
        updateFields[`workers.${body.workerIndex}`] = {
          workerId,
          name: workerName,
          status,
          output,
          logs,
        };
        
        // Store worker-specific output
        if (workerData) {
          updateFields[`outputs.${workerId}`] = workerData;
        }
      }
      
      if (status) {
        updateFields.status = status;
      }
      
      if (status === 'completed' || status === 'failed') {
        updateFields.completedAt = new Date();
      }

      await sessionsCollection.updateOne(
        { id: sessionId },
        { $set: updateFields }
      );

      return NextResponse.json({ success: true });
    }

    if (action === 'addNote') {
      const { sessionId, note } = body;
      
      await sessionsCollection.updateOne(
        { id: sessionId },
        { 
          $push: { notes: note },
          $set: { updatedAt: new Date() }
        }
      );

      return NextResponse.json({ success: true });
    }

    if (action === 'deleteAll') {
      const result = await sessionsCollection.deleteMany({});
      return NextResponse.json({ success: true, deletedCount: result.deletedCount });
    }

    if (action === 'delete') {
      const { sessionId } = body;
      if (!sessionId) {
        return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
      }
      const result = await sessionsCollection.deleteOne({ id: sessionId });
      return NextResponse.json({ success: true, deletedCount: result.deletedCount });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in sessions API:', error);
    return NextResponse.json({ error: 'Failed to process session' }, { status: 500 });
  }
}

// Get sessions for a department
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    const sessionId = searchParams.get('sessionId');

    await connectToDatabase();
    const sessionsCollection = getCollection(COLLECTIONS.SESSIONS);

    if (sessionId) {
      const session = await sessionsCollection.findOne({ id: sessionId });
      return NextResponse.json({ session });
    }

    const query = departmentId ? { departmentId } : {};
    const sessions = await sessionsCollection
      .find(query)
      .sort({ startedAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
